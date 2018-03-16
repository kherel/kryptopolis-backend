import { User } from "../../../init/mongoose"
import mailgun from "../../../init/mailgun"
import settings from "../../../settings/settings"

export default async (email) => {
  if (!email) throw new Error("email should be exist")

  const user = await User.findOne({ email: email })

  if (!user) throw new Error("user by email not found")

  const resetPasswordToken = user.generateResetPasswordToken()

  let link = `${settings.emailUrl.reset}?code=${resetPasswordToken}`

  const data = {
    from: settings.mailgun.from_who,
    to: email,
    subject: `Reset password account for ${settings.host}`,
    html: `
      Hello,
      <br>
      You may change password by link.
      <br>
      <a href=${link}>
        Click here to verify
      </a>
    `
  }

  return await mailgun.messages().send(data)
}
