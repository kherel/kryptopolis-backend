import "../../../support/hook"
import { User } from "../../../../init/mongoose"

const url = '/v1/me'

describe(__filename, () => {
  describe("valid params given", () => {

    describe("role user", () => {
      describe("user with params with name", () => {
        it("should update name", async () => {
          let user = await factory.create('user')
          let newUser = await factory.build('user')

          const params = {
            data: {
              attributes: {
                name: newUser.name
              }
            }
          }

          let res = await request(url, {
            method: "put",
            user,
            params,
          })

          expect(res.body.data.attributes.name).to.eql(newUser.name)
        })
      })

      describe("user with params with email", () => {
        it("should update name", async () => {
          let user = await factory.create('user', { cofirmEmail: true })
          let newUser = await factory.build('user')

          const params = {
            data: {
              attributes: {
                email: newUser.email
              }
            }
          }

          let res = await request(url, {
            method: "put",
            user,
            params,
          })

          user = await User.findById(user.id)

          expect(user.cofirmEmail).to.be.false
          expect(res.status).to.eql(200)
          expect(res.body.data.attributes.email).to.eql(newUser.email)
        })
      })
    })

  })
})
