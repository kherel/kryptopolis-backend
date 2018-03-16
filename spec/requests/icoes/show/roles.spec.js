import "../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('role guest', () => {
    it("should return other ico", async () => {
      const ico = await factory.create("icoVisible")
      const path = `${url}/${ico.titleUrl}`
      const res = await request(path, { unauth: true })

      expect(res.body.data).to.containSubset({ id: ico.id })
    })

    it("should not return ico", async () => {
      const ico = await factory.create("ico", { approve: false, visibleUser: true,  visibleAdmin: true })
      const path = `${url}/${ico.titleUrl}`
      const res = await request(path)

      expect(res.status).to.eql(401)
      expect(res.body).to.have.property("error")
    })
  })

  describe('role user', () => {
    it("should return only visible, approve, approveAdmin", async () => {
      const user = await factory.create("user", { role: "user"})
      const ico = await factory.create("ico", { approve: true, visibleUser: true,  visibleAdmin: true })
      const path = `${url}/${ico.titleUrl}`
      const res = await request(path, { user: user })

      expect(res.body.data).to.containSubset({ id: ico.id })
    })

    it("should return only ico current user", async () => {
      const user = await factory.create("user", { role: "user"})
      const ico = await factory.create("ico", { approve: false, visibleUser: false, visibleAdmin: false, user: user.id })
      const path = `${url}/${ico.titleUrl}`
      const res = await request(path, { user: user })

      expect(res.body.data).to.containSubset({ id: ico.id })
    })

    it("should not return ico other user", async () => {
      const user = await factory.create("user", { role: "user"})
      const otherUser = await factory.create("user", { role: "user"})
      const ico = await factory.create("ico", { approve: false, visibleUser: false, visibleAdmin: false, user: otherUser.id })
      const path = `${url}/${ico.titleUrl}`
      const res = await request(path, { user: user })

      expect(res.status).to.eql(401)
      expect(res.body).to.have.property("error")
    })

  })

  describe('role admin', () => {
    it("should return ico other user", async () => {
      const userAdmin = await factory.create("user", { role: "admin"})
      const user = await factory.create("user", { role: "user"})
      const ico = await factory.create("ico", { approve: false, visibleUser: false, visibleAdmin: false, user: user.id })
      const path = `${url}/${ico.titleUrl}`
      const res = await request(path, { user: userAdmin })

      expect(res.body.data).to.containSubset({ id: ico.id })
    })
  })

  describe('role superAdmin', () => {
    it("should return ico other user", async () => {
      const superAdmin = await factory.create("user", { role: "superAdmin"})
      const user = await factory.create("user", { role: "user"})
      const ico = await factory.create("ico", { approve: false, visibleUser: false, visibleAdmin: false, user: user.id })
      const path = `${url}/${ico.titleUrl}`
      const res = await request(path, { user: superAdmin })

      expect(res.body.data).to.containSubset({ id: ico.id })
    })
  })

})
