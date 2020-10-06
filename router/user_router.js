import AbstractRouter from "./abstract_router.js"

export default class UserRouter extends AbstractRouter{
  constructor({app, user_controller}) {
    super()
    this.app = app // Type express
    this.user_controller = user_controller
    this.init() // on construction add all route functions
  }
  // pass processParams to a common util
  processParams (req) {
    return Object.assign({}, req.body, req.params, req.query)
  }
  init() {
    this.app.post('/login', async (req, res, next) => {
      try {
        let params = this.processParams(req)
        let token = await this.user_controller.login(params)
        res.send(token) 
      } catch(err) {
        next(err)
      }
    })
    this.app.post('/signup', async (req, res, next) => {
      try {
        let params = this.processParams(req)
        let user = await this.user_controller.signup(params)
        res.send(user) 
      } catch(err) {
        next(err)
      }
    })
  }
}