import "../../support/hook"

const url = '/v1/users'

describe(__filename, () => {
  describe(`PUT ${url}`, () => {

    describe("valid params given", () => {

      describe("role user", () => {
        it("should not update other user", async () => {
          let user = await factory.create('user')
          let newUser = await factory.build('user')
          const params = {
            data: {
              attributes: {
                email: newUser.email
              }
            }
          }

          let res = await request(`${url}/${user.id}`, {
            method: "put",
            user: user,
            params,
          })

          expect(res.status).to.eql(401)
          expect(res.body).to.have.property('error')
        })

        it("should not update role", async () => {
          const role = "admin"
          let user = await factory.create('user', { role: "user" })
          const params = {
            data: {
              attributes: {
                role: role,
              }
            }
          }

          let res = await request(`${url}/${user.id}`, {
            method: "put",
            user,
            params,
          })

          expect(res.status).to.eql(401)
          expect(res.body).to.have.property('error')
        })

        it("should not update editor", async () => {
          let user = await factory.create('user', {
            role: "user",
            editor: false
          })

          const params = {
            data: {
              attributes: {
                editor: true,
              }
            }
          }

          let res = await request(`${url}/${user.id}`, {
            method: "put",
            user: user,
            params,
          })

          expect(res.status).to.eql(401)
          expect(res.body).to.have.property('error')
        })
      })

      describe("role admin", () => {
        it("should update editor", async () => {
          let user = await factory.create('user', { role: "admin" })
          let otherUser = await factory.create('user', { role: "user", editor: false })
          const params = {
            data: {
              attributes: {
                editor: true,
              }
            }
          }

          let res = await request(`${url}/${otherUser.id}`, {
            method: "put",
            user,
            params,
          })

          expect(res.body).to.have.property('error')
        })
      })

      describe("role superAdmin", () => {
        it("should update email", async () => {
          let user = await factory.create('user', { role: "superAdmin" })
          let newUser = await factory.build('user')
          const params = {
            data: {
              attributes: {
                email: newUser.email,
              }
            }
          }

          let res = await request(`${url}/${user.id}`, {
            method: "put",
            user,
            params,
          })

          expect(res.body.data.attributes).to.have.property('email').to.eql(newUser.email)
        })
        it("should update current role", async () => {
          let user = await factory.create('user', { role: "superAdmin" })
          let newUser = await factory.build('user', { role: "admin" })
          const params = {
            data: {
              attributes: {
                role: newUser.role
              }
            }
          }

          let res = await request(`${url}/${user.id}`, {
            method: "put",
            user,
            params,
          })

          expect(res.body.data.attributes).to.have.property('role').to.eql(newUser.role)
        })

        it("should update other role", async () => {
          const role = "admin"
          let superAdmin = await factory.create('user', { role: "superAdmin" })
          let user = await factory.create('user', { role: "admin" })

          let res = await request(`${url}/${user.id}`, {
            method: "put",
            user: superAdmin,
            params: { role: role }
          })

          expect(res.body.data.attributes).to.have.property('role').to.eql(role)
        })

        it("should update editor", async () => {
          let user = await factory.create('user', { role: "superAdmin" })
          let otherUser = await factory.create('user', { role: "user", editor: false })
          const params = {
            data: {
              attributes: {
                editor: true,
              }
            }
          }

          let res = await request(`${url}/${otherUser.id}`, {
            method: "put",
            user: user,
            params,
          })

          expect(res.body.data.attributes).to.have.property('editor').eql(true)
        })
      })

    })

    describe("wrong params given", () => {
      it("should not req unauth", async () => {
        let res = await request(url + "/test", {
          method: "put",
          unauth: true,
        })

        expect(res.status).to.eql(401)
        expect(res.body).to.have.property('error')
      })
    })

  })

})

