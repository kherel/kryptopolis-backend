import { User } from "../../../init/mongoose"
import mailgun from "../../../init/mailgun"
import settings from "../../../settings/settings"

export default async (email) => {
  if (!email) throw new Error("email should be exist")

  const user = await User.findOne({ email: email })

  if (!user) throw new Error("user by email not found")

  let link = `${settings.emailUrl.confirm}?code=${user.cofirmCode}`

  const data = {
    from: settings.mailgun.from_who,
    to: email,
    subject: `Please confirm your Email account for ${settings.host}`,
    html: `
      Hello,
      <br>
      Please Click on the link to verify your email.
      <br>
      <a href=${link}>
        Click here to verify
      </a>
    `
  }

  return await mailgun.messages().send(data)
}
