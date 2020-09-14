export class Router {
  constructor({app}) {
    this.app = app // Type express
    this.init() // on construction add all route functions
  }
  processParams (req) {
    return Object.assign({}, req.body, req.params, req.query)
  }
  init () {
    this.app.get('/tasks', (req, res, next) => {
      try {
        let params = this.processParams(req)
        res.send({
          message: "task sent in get all",
          params
        })
      } catch(err) {
        next(err)
      }
    })
    this.app.get('/tasks/:id', (req, res, next) => {
      try {
        let params = this.processParams(req)
        res.send({
          message: "task sent in get single task",
          params
        })
      } catch(err) {
        next(err)
      }
    })
    this.app.post('/tasks', (req, res, next) => {
      try {
        let params = this.processParams(req)
        res.send({
          message: "create a new task",
          params
        })
      } catch(err) {
        next(err)
      }
    })
    this.app.put('/tasks/:id', (req, res, next) => {
      try {
        let params = this.processParams(req)
        res.send({
          message: "update a single task with all new data",
          params
        })
      } catch(err) {
        next(err)
      }
    })
    this.app.patch('/tasks/:id', (req, res, next) => {
      try {
        let params = this.processParams(req)
        res.send({
          message: "update a single task with the sent data",
          params
        })
      } catch(err) {
        next(err)
      }
    })
    this.app.delete('/tasks/:id', (req, res, next) => {
      try {
        let params = this.processParams(req)
        res.send({
          message: "delete the task",
          params
        })
      } catch(err) {
        next(err)
      }
    })
  }
}