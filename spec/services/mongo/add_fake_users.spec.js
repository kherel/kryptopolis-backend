import { User, Ico } from "../../../init/mongoose"
import "../../support/hook"
import addFakeUsers from "../../../app/services/mongo/add_fake_users"

describe(__filename, () => {

  beforeEach(async () => {
    await factory.create('ico')
    await factory.create('ico')
    await factory.create('ico')
    await addFakeUsers()
  })

  it("should have users with email fake", async () => {
    const users = await User.find()

    users.map((user) => {
      expect(user.email.includes("fake")).to.be.true
    })
  })

  it("should have ico", async () => {
    const icoes = await Ico.find()

    expect(icoes).to.be.exist
  })

})
