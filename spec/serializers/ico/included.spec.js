import "../../support/hook"
import { icoSerializer } from "../../../app/serializers"

describe(__filename, () => {
  let ico, user

  beforeEach(async () => {
    ico = await factory.create('ico')
    user = await factory.create('user')

    await user.addFollowers(ico)
  })

  it("should return included", async () => {
    let res = await icoSerializer(ico, { followers: true })

    expect(res.included[0]).have.property("id").eql(user.id)
  })

  it("should not return included", async () => {
    let res = await icoSerializer(ico, { followers: undefined })

    expect(res.included).to.be.undefined
  })

  it("should not return included", async () => {
    let res = await icoSerializer(ico, { followers: null })

    expect(res.included).to.be.undefined
  })

  it("should not return included", async () => {
    let res = await icoSerializer(ico, { followers: false })

    expect(res.included).to.be.undefined
  })

})
