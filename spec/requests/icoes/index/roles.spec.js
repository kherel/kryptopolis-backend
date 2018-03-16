import "../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('roles', () => {
    describe('role guest', () => {
      it("should return only visible, approve, approveAdmin", async () => {
        let ico = await factory.create("ico", { approve: true, visibleUser: true,  visibleAdmin: true })
        let res = await request(url, { unauth: true })

        expect(res.body.data).to.containSubset([{ id: ico.id }])
      })
      it("should return not return ico", async () => {
        await factory.create("ico", { visible: false })
        await factory.create("ico", { approve: true })
        await factory.create("ico", { approveAdmin: true })

        let res = await request(url, { unauth: true })

        expect(res.body.data).to.be.empty
      })
    })

    describe('role user', () => {
      let user

      beforeEach(async () => {
        user = await factory.create("user", { role: "user"})
      })

      it("should return ico", async () => {
        let ico = await factory.create("ico", { approve: true, visibleUser: true,  visibleAdmin: true })
        let res = await request(url, { user: user })

        expect(res.body.data).to.containSubset([{ id: ico.id }])
      })

      it("should not return ico", async () => {
        let ico = await factory.create("ico", { approve: true })
        let res = await request(url, { user: user })

        expect(res.body.data).to.not.containSubset([{ id: ico.id }])
      })

      it("should return ico current user", async () => {
        let user = await factory.create("user", { role: "user"})
        let ico = await factory.create("ico", { approve: false, visibleUser: false, visibleAdmin: false, user: user.id })
        let res = await request(url, { user: user })

        expect(res.body.data).to.containSubset([{ id: ico.id }])
      })

      it("should not return ico other user", async () => {
        let user = await factory.create("user", { role: "user"})
        let otherUser = await factory.create("user", { role: "user"})
        let ico = await factory.create("ico", { approve: false, visibleUser: false, visibleAdmin: false, user: otherUser.id })
        let res = await request(url, { user: user })

        expect(res.body.data).to.not.containSubset([{ id: ico.id }])
      })
    })

    describe('role admin', () => {
      it("should return ico other user", async () => {
        let userAdmin = await factory.create("user", { role: "admin"})
        let user = await factory.create("user", { role: "user"})
        let ico = await factory.create("ico", { approve: false, visibleUser: false, visibleAdmin: false, user: user.id })
        let res = await request(url, { user: userAdmin })

        expect(res.body.data).to.containSubset([{ id: ico.id }])
      })
    })

    describe('role superAdmin', () => {
      it("should return ico other user", async () => {
        let userAdmin = await factory.create("user", { role: "superAdmin"})
        let user = await factory.create("user", { role: "user"})
        let ico = await factory.create("ico", { approve: false, visibleUser: false, visibleAdmin: false, user: user.id })
        let res = await request(url, { user: userAdmin })

        expect(res.body.data).to.containSubset([{ id: ico.id }])
      })
    })
  })

})
