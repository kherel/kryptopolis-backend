import "../../support/hook"
import { User } from "../../../init/mongoose"

const url = "/v1/auth/confirm"

describe(__filename, () => {

  describe(`GET ${url}`, () => {

    describe("valid params given", () => {
      describe("user exist", async () => {
        it("should return success", async () => {
          let user = await factory.create('user')

          const params = {
            data: {
              attributes: {
                code: user.cofirmCode,
              }
            }
          }

          let res = await request(url, {
            method: "post",
            unauth: true,
            params,
          })

          let updateUser = await User.findById(user.id)

          expect(updateUser.cofirmEmail).to.eql(true)
          expect(res.status).to.eql(200)
        })
      })
    })

    describe("wrong params given", () => {
      describe("user unathorize", () => {
        it("should return bas request", async () => {
          let res = await request(url, {
            method: "post",
            unauth: true,
          })

          expect(res.status).to.eql(422)
          expect(res.body).to.have.property("error")
        })
      })
    })

  })
})
