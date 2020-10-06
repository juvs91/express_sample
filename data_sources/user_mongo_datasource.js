import mongoose from 'mongoose'
import {
  MONGO_DB_URL,
  MONGO_DB_USER,
  MONGO_DB_PASS
} from '../confs.js'

// pass mongo connection to a util
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

export default class UserMongoDataSource {
  // not sure if default value or optional are lazy loading
  constructor(mongoose) {
    if (!mongoose) {
      mongoose = get_mongoose_connection()
      this.UserPromise = mongoose.then(actual_connection => {
        let user_schema = new actual_connection.Schema( { name: String }, { strict: false })
        // let user_schema = new actual_connection.Schema( { name: String })
        return Promise.resolve(actual_connection.model('User', user_schema))
      })
    }
  }


  get({id, filter}) {
    let id_obj = id === undefined ? {} : {_id: id}
    let query = Object.assign({}, id_obj, filter)
    query = Object.keys(query).length === 0 ? {invalid_field: ""} : query
    return this.UserPromise.then(User => {
      return User.findOne(query)
    })
  }

  create(data) {
    return this.UserPromise.then(User => {
      return User(data).save()
    })
  }

  delete({id, filter}){
    let query = Object.assign({}, {_id: id}, filter)
    return this.UserPromise.then(User => {
      return User(data).deleteOne(query)
    })
  }

}