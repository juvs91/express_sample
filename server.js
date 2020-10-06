import express from 'express'
import {PORT} from './confs.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import RouterInit from './router/index.js'
import TaskRouter from './router/task_router.js'
import UserRouter from './router/user_router.js'// both TaskRouter can be put in same module and can beeen unpacked {TaskRouter, UserRouter}
import {TaskController, UserController} from './modules/task/index.js'
import UserService from './modules/service/jwt/user-service.js'
import BcryptHasher from './modules/service/jwt/password_hasher.js'
import JWTService from './modules/service/jwt/jwt_service.js'
import JWTMetadata from './modules/service/jwt/jwt_metadata.js'
import JWTAuth from './modules/auth_strategies/jwt.js'
import UserMongoDataSource from './data_sources/user_mongo_datasource.js'

export class Server {
  constructor({data_source}){
    let app = express()

    let jwtMetadata = new JWTMetadata(1000000)
    let jwtService = new JWTService('secret-value', jwtMetadata)
    let userDataSource = new UserMongoDataSource()
    let jwtAuth = JWTAuth(jwtService, {
      '/signup': '/signup'
    })
    let passwordHasher = new BcryptHasher(10)
    app.use(cors())
    app.use(bodyParser.urlencoded({
      extended: true
    }))
    app.use(bodyParser.json());
    app.use(jwtAuth)
    // all the routers can be build inside the router module with a builder or factory, more like builder
    // and can be pass here thru the contructor specially the TaskController for dependency inversion
    let router = new RouterInit([
      new TaskRouter({
        app, 
        task_controller: new TaskController(data_source)
      }),
      new UserRouter({
        app,
        user_controller: new UserController(
          userDataSource, 
          new UserService(userDataSource, passwordHasher),
          new JWTService('secret-value', jwtMetadata),
          passwordHasher
        )
      }) 
    ])
    
    router.init()
    
    app.listen(PORT)
  }
}