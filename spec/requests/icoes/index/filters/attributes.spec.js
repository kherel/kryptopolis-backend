import "../../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {
  describe('filter[visibleAdmin]=true', () => {
    it("should return ico", async () => {
      const path = `${url}?filter[visibleAdmin]=true`
      const options = { visibleAdmin: true }
      const ico = await factory.create("icoVisible", options)

      let res = await request(path, { unauth: true })

      expect(res.body.data).to.containSubset([{ id: ico.id }])
    })

    it("should return ico, bacause casl", async () => {
      const path = `${url}?filter[visibleAdmin]=false`
      const options = { visibleAdmin: false }
      await factory.create("icoVisible", options)

      let res = await request(path, { unauth: true })

      expect(res.body.data).to.be.empty
    })

    describe('superAdmin', () => {
      it("should not return ico", async () => {
        const path = `${url}?filter[visibleAdmin]=false`
        const options = { visibleAdmin: true }
        const user = await factory.create("user", { role: "superAdmin" })
        await factory.create("icoVisible", options)

        let res = await request(path, { user: user })

        expect(res.body.data).to.be.empty
      })
    })

  })
})
