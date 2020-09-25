import env from 'dotenv' // to know exactly why it takes the .env or to take another one, read https://github.com/motdotla/dotenv

env.config({path: './.env'})
if (env.error) {
  console.log('No .env file found, reading from ENVIRONMENT')
}

const PORT = process.env.PORT || 8000
const MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost:27017/test"
const DB_TO_USE = process.env.DB_TO_USE || "TaskMongoDataSource"
const MONGO_DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME || ""
const MONGO_DB_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD || ""
export {
  PORT,
  MONGO_DB_URL,
  DB_TO_USE,
  MONGO_DB_USER,
  MONGO_DB_PASS
}