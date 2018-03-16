import { Facebook } from 'fb'
import settings from '../settings/settings'

if (!settings.facebook.clientID || !settings.facebook.clientSecret) {
  throw new Error("settings.facebook should be present")
}

const fb = new Facebook({
  accessToken: `${settings.facebook.clientID}|${settings.facebook.clientSecret}`,
  version: 'v2.11',
})

export default fb
