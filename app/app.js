import { connectDb } from "../init/mongoose"
import settings from '../settings/settings'
import initRoutes from '../routes/routes'
import initMiddlewares from './middlewares'
import logger from "./services/logger"

export const initApp = async (app) => {
  initMiddlewares(app)
  initRoutes(app)

  if (!settings.isEnvTest) {
    logger.info(`App ${settings.name}, running on port ${settings.port}, NODE_ENV ${settings.env}`)
  }
}

export const listen = async (app) => {
  try {
    await connectDb()
    await initApp(app)
    await app.listen(settings.port)
  } catch(err) {
    logger.error(err.message)
  }
}

