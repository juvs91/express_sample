import {Server} from './server.js'
import {DB_TO_USE} from './confs.js'
import data_sources from './data_sources/index.js'

let data_source = data_sources[DB_TO_USE] || data_sources["TaskMongoDataSource"]

new Server({
  data_source: new data_source()
})
// load other stuff needed in app, custom queue handlers like kafka, rabbit mq, celery, etc