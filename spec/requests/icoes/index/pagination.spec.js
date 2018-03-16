import "../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('pagination', () => {
    const path = `${url}?page[offset]=1&page[limit]=1`

    it("should return with page[offset]", async () => {
      await factory.create("ico", { approve: true, visibleUser: true,  visibleAdmin: true })
      await factory.create("ico", { approve: true, visibleUser: true,  visibleAdmin: true })

      let res = await request(path, {
        unauth: true
      })

      expect(res.body.data.length).to.eql(1)
    })
  })

})
