import { tokenSerializer } from "../../app/serializers"

describe(__filename, () => {
  it("should return id, type", async () => {
    let res = tokenSerializer("ok")

    expect(res.data.attributes).be.have.property("value").eql("ok")
  })
})
