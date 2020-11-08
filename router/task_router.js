import AbstractRouter from "./abstract_router.js"

export default class TaskRouter extends AbstractRouter{
  constructor({app, task_controller, auth}) {
    super()
    this.app = app // Type express
    this.task_controller = task_controller
    this.auth = auth
    this.init() // on construction add all route functions
  }
  processParams (req) {
    return Object.assign({}, req.body, req.params, req.query)
  }
  init () {
    this.app.get('/tasks', this.auth, (req, res, next) => {
      try {
        let params = this.processParams(req)
        this.task_controller.getAll(params)
        .then(tasks => {
          res.send(tasks)          
        })
      } catch(err) {
        next(err)
      }
    })
    this.app.get('/tasks/:id', (req, res, next) => {
      try {
        let params = this.processParams(req)
        this.task_controller.get(params)
        .then(task => {
          res.send(task)          
        })
      } catch(err) {
        next(err)
      }
    })
    this.app.post('/tasks', (req, res, next) => {
      try {
        let params = this.processParams(req)
        this.task_controller.create(params)
        .then(task => {
          res.send(task)          
        })
      } catch(err) {
        next(err)
      }
    })
    this.app.put('/tasks/:id', (req, res, next) => {
      try {
        let params = this.processParams(req)
        this.task_controller.update(params)
        .then(task => {
          res.send(task)          
        })
      } catch(err) {
        next(err)
      }
    })
    this.app.patch('/tasks/:id', (req, res, next) => {
      try {
        let params = this.processParams(req)
        this.task_controller.update(params)
        .then(task => {
          res.send(task)          
        })
      } catch(err) {
        next(err)
      }
    })
    this.app.delete('/tasks/:id', (req, res, next) => {
      try {
        let params = this.processParams(req)
        this.task_controller.delete(params)
        .then(task => {
          res.send(task)          
        })
      } catch(err) {
        next(err)
      }
    })
  }
}