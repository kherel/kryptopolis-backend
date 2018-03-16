import "../../../support/hook"
import { User } from "../../../../init/mongoose"

const url = '/v1/me/password'

describe(__filename, () => {
  describe(`PUT ${url}`, () => {
    let res, user

    describe("valid params given", () => {
      const oldPassword = "oldPassword"
      const newPassword = "newPassword"

      beforeEach(async () => {
        user = await factory.create('user', { password: oldPassword })

        const params = {
          data: {
            attributes: {
              oldPassword,
              newPassword,
            }
          }
        }

        res = await request(url, {
          method: "put",
          user,
          params,
        })
      })

      it("should replace oldPassword", async () => {
        user = await User.findById(user.id)
        expect(await user.comparePassword(oldPassword)).to.be.false
      })

      it("should update newPassword", async () => {
        user = await User.findById(user.id)
        expect(await user.comparePassword(newPassword)).to.be.true
      })

      it("should return valid status", async () => {
        expect(res.status).to.eql(200)
      })

      it("should include user", async () => {
        expect(res.body.data).to.containSubset({ id: user.id })
      })
    })

    describe("wrong params given", () => {
      it("should not req unauth", async () => {
        res = await request(url, {
          method: "put",
          unauth: true,
        })

        expect(res.status).to.eql(401)
        expect(res.body).to.have.property('error')
      })

      describe("with user", () => {
        const password = "password"

        beforeEach(async () => {
          user = await factory.create('user')

          const params = {
            data: {
              attributes: {
                oldPassword: password,
                newPassword: "test",
              }
            }
          }

          res = await request(url, {
            method: "put",
            user,
            params,
          })
        })

        it("should return status 422", async () => {
          expect(res.status).to.eql(422)
        })

        it("should return error", async () => {
          expect(res.body).to.have.property('error')
        })
      })
    })
  })

})
