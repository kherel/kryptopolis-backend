import "../../support/hook"
import { User } from "../../../init/mongoose"
import { userSerializer } from "../../../app/serializers"

describe(__filename, () => {
  let user

  beforeEach(async () => {
    user = await factory.create('userWithFollowers')
    await User.populate(user, "followers")
  })

  it("should return id, type", async () => {
    let res = await userSerializer(user)

    expect(res.data).be.have.property("id").eql(user.id)
    expect(res.data).be.have.property("type").eql("user")
  })

  it("should return valid params", async () => {
    let res = await userSerializer(user)

    const whitelist = {
      "name": user.name,
      "email": user.email,
      "role": user.role,
    }

    expect(res.data.attributes).to.containSubset(whitelist)
  })

  it("should not return params", async () => {
    let res = await userSerializer(user)

    const blacklist = {
      "password": user.password,
      "cofirmEmail": user.cofirmEmail,
      "cofirmCode": user.cofirmCode,
      "resetPasswordToken": user.resetPasswordToken,
    }

    expect(res.data.attributes).to.not.containSubset(blacklist)
  })

})
