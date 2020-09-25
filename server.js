import express from 'express'
import {PORT} from './confs.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import RouterInit from './router/index.js'
import TaskRouter from './router/task_router.js'
import {TaskController} from './modules/task/index.js'

export class Server {
  constructor({data_source}){
    let app = express()

    let auth_middle_ware = (req, res, next) => {
      // do auth, if no auth handle the error
      next()
    }
    
    app.use(auth_middle_ware)
    app.use(cors())
    app.use(bodyParser.urlencoded({
      extended: true
    }))
    app.use(bodyParser.json());
    // all the routers can be build inside the router module with a builder or factory, more like builder
    // and can be pass here thru the contructor specially the TaskController for dependency inversion
    let router = new RouterInit([
      new TaskRouter({
        app, 
        task_controller: new TaskController(data_source)
      })
    ])
    
    router.init()
    
    app.listen(PORT)
  }
}