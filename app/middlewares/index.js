import cors from 'cors'
import bodyParser from 'body-parser'
import logger from "../services/logger"
import loggerMiddleware from './access_logger'
import passport from './passport'

export default (app) => {
  app.use(cors())

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use((req, res, next) => {
    req.log = logger
    next()
  })

  app.use(loggerMiddleware())
  app.use(passport.initialize())
}
