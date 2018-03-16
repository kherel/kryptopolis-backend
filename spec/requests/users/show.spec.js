import "../../support/hook"

const url = '/v1/users'

describe(__filename, () => {

  describe('valid params given', () => {
    describe('role user', () => {
      it("should return current user", async () => {
        const user = await factory.create("user", { role: "user"})
        const path = `${url}/${user.id}`
        const res = await request(path, {
          user: user
        })

        expect(res.body.data).to.containSubset({ id: user.id })
      })

      it("should not return other user", async () => {
        let currentUser = await factory.create("user", { role: "user"})
        let user = await factory.create("user", { role: "user"})
        const path = `${url}/${user.id}`
        let res = await request(path, {
          user: currentUser
        })

        expect(res.body).to.property("error")
      })

      describe('attributes', () => {
        it("should have attributes", async () => {
          let user = await factory.create("user", { role: "user"})
          const path = `${url}/${user.id}`
          let res = await request(path, {
            user: user
          })

          const attrs = [
            "name",
            "email",
            "role",
          ]

          attrs.map((attr) => {
            expect(res.body.data.attributes).to.property(attr)
          })
        })

        it("should not have attributes", async () => {
          let user = await factory.create("user", { role: "user"})
          const path = `${url}/${user.id}`
          let res = await request(path, {
            user: user
          })

          const attrs = [
            "password",
            "cofirmCode",
            "resetPasswordToken",
            "resetPasswordToken",
          ]

          attrs.map((attr) => {
            expect(res.body.data.attributes).to.not.property(attr)
          })
        })

      })

    })

    describe('role admin', () => {
      it("should return other user", async () => {
        let currentUser = await factory.create("user", { role: "admin"})
        let user = await factory.create("user", { role: "user"})
        let res = await request(`${url}/${user.id}`, { user: currentUser })

        expect(res.body.data).to.containSubset({ id: user.id })
      })
    })

    describe('role superAdmin', () => {
      it("should return other user", async () => {
        let currentUser = await factory.create("user", { role: "superAdmin"})
        let user = await factory.create("user", { role: "user"})
        let res = await request(`${url}/${user.id}`, { user: currentUser })

        expect(res.body.data).to.containSubset({ id: user.id })
      })
    })
  })

  describe('wrong params given', () => {
    describe('role guest', () => {
      it("should return other ico", async () => {
        let user = await factory.create("user")
        let res = await request(`${url}/${user.id}`, { unauth: true })

        expect(res.body).to.property("error")
      })
    })
  })

})
