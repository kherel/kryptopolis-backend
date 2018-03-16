import { Ico } from "../../../../init/mongoose"
import "../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('total-pages', () => {
    it("should return only visible, approve, approveAdmin", async () => {
      await factory.create("ico", { approve: true, visibleUser: true,  visibleAdmin: true })
      await factory.create("ico", { approve: true, visibleUser: true,  visibleAdmin: true })
      let res = await request(url, { unauth: true })

      expect(res.body.meta).to.have.property("total-pages").eql(2)
    })

    it("should return with total pages", async () => {
      await factory.create("ico", { approve: true, visibleUser: true,  visibleAdmin: true })
      await factory.create("ico", { approve: true, visibleUser: true,  visibleAdmin: true })

      let res = await request(url, {
        unauth: true
      })

      expect(res.body.meta["total-pages"]).to.eql(await Ico.count())
    })

  })

})
