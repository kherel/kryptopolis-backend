import "../../support/hook"
import { icoSerializer } from "../../../app/serializers"

describe(__filename, () => {
  let ico

  beforeEach(async () => {
    ico = await factory.create('ico')
  })

  it("should return id, type", async () => {
    let res = await icoSerializer(ico)

    expect(res.data).have.property("id").eql(ico.id)
    expect(res.data).have.property("type").eql("ico")
  })

  it("should return valid params", async () => {
    let res = await icoSerializer(ico)

    const whitelist = {
      title: ico.title,
      createdAt: ico.createdAt,
      updatedAt: ico.updatedAt,
      logo: ico.logo,
    }

    expect(res.data.attributes).to.containSubset(whitelist)
  })

})
