import { icoSerializer } from "../../../app/serializers"

describe(__filename, () => {
  let ico

  beforeEach(async () => {
    ico = await factory.build('ico')
  })

  it("should total pages", async () => {
    const total = 10
    let res = await icoSerializer([ico], { total: total })

    const meta = {
      "total-pages": total,
    }

    expect(res.meta).to.containSubset(meta)
  })

})
