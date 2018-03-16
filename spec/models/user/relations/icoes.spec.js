import "../../../support/hook"
import { User, Ico } from "../../../../init/mongoose"

describe(__filename, () => {
  let ico, user

  beforeEach(async () => {
    ico = await factory.create('ico')
    user = await factory.create('user')

    await user.addIco(ico)
  })

  it('user should have ico', async () => {
    user = await User.findById(user.id)

    expect(user.icoes[0]).to.eql(ico._id)
  })

  it('ico should have user', async () => {
    ico = await Ico.findById(ico.id)

    expect(ico.user).to.eql(user._id)
  })

})
