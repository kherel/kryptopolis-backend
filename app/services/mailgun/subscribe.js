import mailgun from "../../../init/mailgun"
import settings from "../../../settings/settings"

export default async (email) => {
  if (!email) throw new Error("email should be exist")

  const data = {
    from: settings.mailgun.from_who,
    to: email,
    subject: `You subscribe email for ${settings.host}`,
    html: `
      Hello,
      <br>
      You are subscribed to the newsletter.
      <br>
    `
  }

  return await mailgun.messages().send(data)
}
