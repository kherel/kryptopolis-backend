import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'

const swaggerDocument = yaml.load('settings/swagger.yaml')
const swaggerUiSetup = swaggerUi.setup(swaggerDocument)
const swaggerUiServe = swaggerUi.serve

export {
  swaggerUiServe,
  swaggerUiSetup,
}
