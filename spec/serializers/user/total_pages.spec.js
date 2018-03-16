import "../../support/hook"
import { User } from "../../../init/mongoose"
import { userSerializer } from "../../../app/serializers"

describe(__filename, () => {
  let user

  beforeEach(async () => {
    user = await factory.create('userWithFollowers')
    await User.populate(user, "followers")
  })

  it("should total pages", async () => {
    const total = 10
    let res = await userSerializer([user], { total: total })

    const meta = {
      "total-pages": total,
    }

    expect(res.meta).to.containSubset(meta)
  })

})
