import express from 'express'
import {PORT} from './confs.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import {Router} from './router.js'

export class Server {
  constructor(){
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
    new Router({app})
    
    app.listen(PORT)
  }
}