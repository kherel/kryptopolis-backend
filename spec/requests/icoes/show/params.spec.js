import "../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('valid params given', () => {
    it("should return ico", async () => {
      const ico = await factory.create("icoVisible")
      const path = `${url}/${ico.titleUrl}`

      let res = await request(path, { unauth: true })

      expect(res.status).to.eql(200)
      expect(res.body.data).to.containSubset({
        id: ico.id,
        attributes: {
          titleUrl: ico.titleUrl,
        }
      })
    })
  })

  describe('wrong params given', () => {
    it("should return not found", async () => {
      const path = `${url}/not_found_title`
      let res = await request(path, { unauth: true })

      expect(res.status).to.eql(404)
      expect(res.body.error).to.eql("ico not found")
    })
  })

})
