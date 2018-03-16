import "../../support/hook"
import { User } from "../../../init/mongoose"

const url = "/v1/auth/reset_password"

describe(__filename, () => {

  describe(`POST ${url}`, () => {

    describe('valid params given', () => {
      describe('valid code and new_password', () => {
        it("should return empty", async () => {
          let user = await factory.create('user')

          const params = {
            data: {
              attributes: {
                code: user.resetPasswordToken,
                new_password: "password",
              }
            }
          }

          let res = await request(url, {
            method: "post",
            unauth: true,
            params,
          })

          expect(res.status).to.eql(200)
          expect(res.body.data.attributes).to.have.property("value").eql("ok")
        })
      })
    })

    describe('wrong params given', () => {
      describe('empty params', () => {
        it("should return empty", async () => {
          await factory.create('user')

          expect(await User.find({})).to.exist

          let res = await request(url, {
            method: "post",
            unauth: true,
          })

          expect(res.body).to.have.property("error")
          expect(res.status).to.eql(422)
        })
      })

      describe('wrong code', () => {
        it("should return error", async () => {
          const params = {
            data: {
              attributes: {
                code: "test",
                new_password: "password"
              }
            }
          }

          let res = await request(url, {
            method: "post",
            params,
          })

          expect(res.body).to.have.property("error")
          expect(res.status).to.eql(422)
        })
      })
    })

  })

})
