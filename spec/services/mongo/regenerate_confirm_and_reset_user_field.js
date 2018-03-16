import { User } from "../../../init/mongoose"
import "../../support/hook"
import regenerateConfirmAndResetUserField from "../../../app/services/mongo/regenerate_confirm_and_reset_user_field"

describe(__filename, () => {

  it("should have different cofirmCode", async () => {
    let user = await factory.create('user')
    const cofirmCode = user.cofirmCode

    await regenerateConfirmAndResetUserField()

    user = await User.findById(user.id)

    expect(user.cofirmCode).to.not.eq(cofirmCode)
  })

  it("should have different cofirmCode", async () => {
    let user = await factory.create('user')
    const resetPasswordToken = user.resetPasswordToken

    await regenerateConfirmAndResetUserField()

    user = await User.findById(user.id)

    expect(user.resetPasswordToken).to.not.eq(resetPasswordToken)
  })

})
