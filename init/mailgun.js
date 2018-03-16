import Mailgun from "mailgun-js"
import settings from "../settings/settings"

if (!settings.mailgun.apiKey || !settings.mailgun.domain) {
  throw new Error("mailgun apiKey and domain should be present")
}

const mailgun = Mailgun({
  apiKey: settings.mailgun.apiKey,
  domain: settings.mailgun.domain,
})

export default mailgun
