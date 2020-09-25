import AbstractDataSource from "./abstract_datasource.js"


export default class TaskMemoryDataSource extends AbstractDataSource{

  constructor() {
    super()
    this.data = {}
  }


  get({id, _}) {
    return Promise.resolve(this.data[id])
  }

  getAll(_) {
    return Promise.resolve(this.data)
  }

  update(data) {
    this.data[data.id] = data
    return Promise.resolve(this.data[data.id])
  }
  // check above it's the same, can pass to a funct
  create(data) {
    this.data[data.id] = data
    return Promise.resolve(this.data[data.id])
  }
  
  delete({id, _}){
    data = this.data[id]
    delete this.data[id]
    return Promise.resolve(data)
  }

  join(collection_to_join) {
    throw new Error('needs to implement it');
  }
  
}