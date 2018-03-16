import "../../../support/hook"

const url = '/v1/users'

describe(__filename, () => {

  describe('valid params given', () => {
    describe('role guest', () => {
      it("should return only approved", async () => {
        let res = await request(url, { unauth: true })

        expect(res.body).to.have.property("error")
      })
    })

    describe('role user', () => {
      it("should return current user", async () => {
        let user = await factory.create("user", { role: "user"})
        let res = await request(url, {
          user: user
        })

        const response = [{
          type: "user",
          id: user.id
        }]

        expect(res.body.data).to.containSubset(response)
      })

      it("should not return not approved user", async () => {
        let user = await factory.create("user", { role: "user"})
        let res = await request(url)

        const response = [
          {
            type: "user",
            id: user.id
          }
        ]
        expect(res.body.data).to.not.containSubset(response)
      })

      describe('attributes', () => {
        it("should have attributes", async () => {
          let user = await factory.create("user", { role: "user"})
          let res = await request(url, { user: user })

          const attrs = [
            "name",
            "email",
            "role",
          ]

          attrs.map((attr) => {
            expect(res.body.data[0].attributes).to.property(attr)
          })
        })

        it("should not have attributes", async () => {
          let user = await factory.create("user", { role: "user"})
          let res = await request(url, {
            user: user
          })

          const attrs = [
            "password",
            "cofirmCode",
            "resetPasswordToken",
            "resetPasswordToken",
          ]

          attrs.map((attr) => {
            expect(res.body.data[0].attributes).to.not.property(attr)
          })
        })
      })

    })

    describe('role admin', () => {
      it("should return approved, hidden, archive", async () => {
        let user = await factory.create("user", { role: "admin"})
        let user1 = await factory.create("user", { role: "user"})
        let user2 = await factory.create("user", { role: "admin"})

        let res = await request(url, {
          user: user
        })

        expect(res.body.data).to.containSubset([{ id: user1.id }])
        expect(res.body.data).to.not.containSubset([{ id: user2.id }])
      })
    })

    describe('role superAdmin', () => {
      it("should return approved, hidden, archive", async () => {
        let user = await factory.create("user", { role: "superAdmin"})
        let user1 = await factory.create("user", { role: "user"})
        let user2 = await factory.create("user", { role: "admin"})

        let res = await request(url, { user: user })

        expect(res.body.data).to.containSubset([{ id: user.id }])
        expect(res.body.data).to.containSubset([{ id: user1.id }])
        expect(res.body.data).to.containSubset([{ id: user2.id }])
      })
    })

  })
})
