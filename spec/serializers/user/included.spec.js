import "../../support/hook"
import { User } from "../../../init/mongoose"
import { userSerializer } from "../../../app/serializers"

describe(__filename, () => {
  let user

  beforeEach(async () => {
    user = await factory.create('userWithFollowers')
    await User.populate(user, "followers")
  })

  describe("includes", () => {
    it("should return id, type", async () => {
      user = await factory.create('userWithFollowers')
      user = await User.findById(user.id).populate("followers")

      let res = await userSerializer([user], { total: 111, followers: true })
      expect(user.followers[0].id).to.eql(res.included[0].id)
    })
  })

})
