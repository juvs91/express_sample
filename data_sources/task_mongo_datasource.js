import AbstractDataSource from "./abstract_datasource.js"
import mongoose from 'mongoose'
import {
  MONGO_DB_URL,
  MONGO_DB_USER,
  MONGO_DB_PASS
} from '../confs.js'

let get_mongoose_connection = () => {
  return mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    auth: {
      "authSource": "admin"
    },
    user: MONGO_DB_USER,
    pass: MONGO_DB_PASS
  })
}

export default class TaskMongoDataSource extends AbstractDataSource{
  // not sure if default value or optional are lazy loading
  constructor(mongoose) {
    super()
    if (!mongoose) {
      mongoose = get_mongoose_connection()
      this.TaskPromise = mongoose.then(actual_connection => {
        // let task_schema = new actual_connection.Schema( { name: String }, { strict: false })
        let task_schema = new actual_connection.Schema( { name: String })
        return Promise.resolve(actual_connection.model('Task', task_schema))
      })
    }
  }


  get({id, filter}) {
    let query = Object.assign({}, {_id: id}, filter)
    return this.TaskPromise.then(Task => {
      return Task.findOne(query)
    })
  }

  getAll(filter) {
    return this.TaskPromise.then(Task => {
      return Task.find(filter)    
    })
  }

  update({id, data}) {
    return this.TaskPromise.then(Task => {
      return Task.updateOne({_id: id}, data)
    })
  }
  create(data) {
    return this.TaskPromise.then(Task => {
      return Task(data).save()
    })
  }

  delete({id, filter}){
    let query = Object.assign({}, {_id: id}, filter)
    return this.TaskPromise.then(Task => {
      return Task(data).deleteOne(query)
    })
  }

  join(_) {
    throw new Error('needs to implement it');
  }

}