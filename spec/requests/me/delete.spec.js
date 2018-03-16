import "../../support/hook"
import { User } from "../../../init/mongoose"

const url = '/v1/me'

describe(__filename, () => {

  describe("valid params given", () => {
    it("should delete current user", async () => {
      const password = "password"
      const user = await factory.create("user", { password })
      const params = {
        data: {
          attributes: {
            password
          }
        }
      }

      let res = await request(url, {
        method: "delete",
        user,
        params,
      })

      expect(res.body.data).to.containSubset({ id: user.id })
      expect(await User.find({})).to.be.empty
    })
  })

  describe("wrong params given", () => {
    describe("user unathorized", () => {
      it("should return error", async () => {
        let res = await request(url, {
          method: "delete",
          unauth: true,
        })

        expect(res.status).to.eql(401)
        expect(res.body).to.have.property('error')
      })
    })

    describe("wrong password", () => {
      it("should return error", async () => {
        const user = await factory.create("user", { password: "test" })
        const params = {
          data: {
            attributes: {
              password: "password"
            }
          }
        }

        let res = await request(url, {
          method: "delete",
          user,
          params,
        })

        expect(res.status).to.eql(422)
        expect(res.body).to.have.property('error').eql("password not valid")
      })
    })
  })

})
