import bunyan from 'bunyan'
import settings from '../../settings/settings'

const buildLogger = () => {
  if (settings.isEnvTest) {
    return {
      info: () => {},
      error: () => {},
    }
  }

  return bunyan.createLogger({
    name: settings.name,
    level: 'trace',
    serializers: {
      req: bunyan.stdSerializers.req,
      res: bunyan.stdSerializers.res
    },
  })
}

export default buildLogger()
