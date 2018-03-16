import "../../support/hook"
import { User } from "../../../init/mongoose"

const url = '/v1/users'

describe(__filename, () => {

  describe("valid params given", () => {

    describe('role user', () => {
      it("should delete current user", async () => {
        let user = await factory.create("user", { role: "user"})
        let res = await request(`${url}/${user.id}`, {
          user: user,
          method: "delete",
        })

        expect(res.body.data).to.containSubset({ id: user.id })
        expect(await User.find({})).to.be.empty
      })

      it("should not delete other user", async () => {
        let currentUser = await factory.create("user", { role: "user"})
        let user = await factory.create("user", { role: "user"})
        let res = await request(`${url}/${user.id}`, {
          method: "delete",
          user: currentUser
        })

        expect(res.status).to.eql(401)
        expect(res.body).to.property("error")
        expect(await User.find({ id: user.id })).to.be.exist
      })
    })

    describe('role admin', () => {
      it("should delete current user", async () => {
        let user = await factory.create("user", { role: "admin"})
        let res = await request(`${url}/${user.id}`, {
          user: user,
          method: "delete",
        })

        expect(res.body.data).to.containSubset({ id: user.id })
        expect(await User.find({ id: user.id })).to.be.empty
      })
      it("should not delete other user", async () => {
        let currentUser = await factory.create("user", { role: "admin"})
        let user = await factory.create("user", { role: "user"})
        let res = await request(`${url}/${user.id}`, {
          user: currentUser,
          method: "delete",
        })

        expect(res.body).to.property("error")
        expect(await User.find({ id: user.id })).to.be.exist
      })
    })

    describe('role superAdmin', () => {
      it("should delete current user", async () => {
        let user = await factory.create("user", { role: "superAdmin"})
        let res = await request(`${url}/${user.id}`, {
          user: user,
          method: "delete",
        })

        expect(res.body.data).to.containSubset({ id: user.id })
        expect(await User.find({ id: user.id })).to.be.empty
      })
      it("should not delete other user", async () => {
        let currentUser = await factory.create("user", { role: "superAdmin"})
        let user = await factory.create("user", { role: "user"})
        let res = await request(`${url}/${user.id}`, {
          user: currentUser,
          method: "delete",
        })

        expect(res.body.data).to.containSubset({ id: user.id })
        expect(await User.find({ id: user.id })).to.be.empty
      })
    })

  })

  describe("wrong params given", () => {
    describe("role guest", () => {
      it("should return error with other id", async () => {
        let res = await request(`${url}/test`, {
          method: "delete",
          unauth: true,
        })

        expect(res.status).to.eql(401)
        expect(res.body).to.have.property('error')
      })

      it("should return error with other id", async () => {
        let user = await factory.create("user", { role: "user"})
        let res = await request(`${url}/${user.id}`, {
          method: "delete",
          unauth: true,
        })

        expect(res.status).to.eql(401)
        expect(res.body).to.have.property('error')
      })
    })
  })

})
