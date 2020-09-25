import AbstractRouter from "./abstract_router.js"
export default class RoutersInit extends AbstractRouter {
  constructor(routers){
    super()
    this.routers = routers
  }
  init() {
    this.routers.forEach(router => {
      router.init()
    })
  }
}