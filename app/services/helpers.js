import settings from '../../settings/settings'

const timeout = (ms) => {
  if (settings.isEnvTest) return
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default timeout
