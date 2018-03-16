import "../../../support/hook"
import { User } from "../../../../init/mongoose"

const url = '/v1/me'

describe(__filename, () => {

  describe("wrong params given", () => {

    describe("user unathorized", () => {
      it("should not req unauth", async () => {
        let res = await request(url, {
          method: "put",
          unauth: true,
        })

        expect(res.status).to.eql(401)
        expect(res.body).to.have.property('error')
      })
    })

    describe("params with password", () => {
      const password = "password"

      it("should not change password", async () => {
        let user = await factory.create('user', { password })
        const params = {
          data: {
            attributes: {
              password: "new password"
            }
          }
        }

        let res = await request(url, {
          method: "put",
          user,
          params,
        })

        user = await User.findById(user.id)

        expect(await user.comparePassword(password)).to.be.true
        expect(res.status).to.eql(200)
      })
    })

    describe("user with params with editor", () => {
      const password = "password"

      it("should not change password", async () => {
        let user = await factory.create('user', { password })
        const params = {
          data: {
            attributes: {
              editor: true
            }
          }
        }

        let res = await request(url, {
          method: "put",
          user,
          params,
        })

        expect(res.status).to.eql(401)
        expect(res.body).to.have.property('error').eql('Cannot execute "access" on "editor"')
      })
    })

  })

})
