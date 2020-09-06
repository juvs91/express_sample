import env from 'dotenv' // to know exactly why it takes the .env or to take another one, read https://github.com/motdotla/dotenv

env.config({path: './.env'})
if (env.error) {
  console.log('No .env file found, reading from ENVIRONMENT')
}

const PORT = process.env.PORT || 8000

export {
  PORT
}