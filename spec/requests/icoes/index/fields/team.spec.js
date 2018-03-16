import "../../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {
  const path = `${url}?fields[ico]=team`

  describe('fields[ico]=members', () => {
    it("should return ico", async () => {
      const options = { visibleAdmin: true }
      const ico = await factory.create("icoVisible", options)

      let res = await request(path, { unauth: true })

      expect(res.body.data[0].attributes).to.have.property("team")
      expect(res.body.data).to.containSubset([{ id: ico.id }])
    })

  })
})
