import "../../support/hook"
import { User, Ico } from "../../../init/mongoose"

const url = '/v1/icoes'

describe(__filename, () => {

  describe("valid params given", () => {

    describe('role user', () => {
      it("should delete current user", async () => {
        let user = await factory.create("user", { role: "user"})
        let ico = await factory.create("ico")
        ico.user = user.id
        await ico.save()

        let res = await request(`${url}/${ico.id}`, {
          user: user,
          method: "delete",
        })

        expect(res.body.data).to.containSubset({ id: ico.id })
        expect(await Ico.find({ id: ico.id })).to.be.empty
      })

      it("should not delete other ico", async () => {
        let currentUser = await factory.create("user", { role: "user"})
        let user = await factory.create("user", { role: "user"})
        let ico = await factory.create("ico")
        ico.user = user.id
        await ico.save()

        let res = await request(`${url}/${ico.id}`, {
          method: "delete",
          user: currentUser
        })

        expect(res.body).to.property("error")
        expect(await User.find({ id: user.id })).to.be.exist
      })
    })

    describe('role admin', () => {
      it("should delete current user", async () => {
        let user = await factory.create("user", { role: "admin"})
        let ico = await factory.create("ico")
        ico.user = user.id
        await ico.save()

        let res = await request(`${url}/${ico.id}`, {
          user: user,
          method: "delete",
        })

        expect(res.body.data).to.containSubset({ id: ico.id })
        expect(await Ico.find({ id: ico.id })).to.be.empty
      })

      it("should delete other ico", async () => {
        let currentUser = await factory.create("user", { role: "admin"})

        let user = await factory.create("user", { role: "user"})
        let ico = await factory.create("ico")
        ico.user = user.id
        await ico.save()

        let res = await request(`${url}/${ico.id}`, {
          method: "delete",
          user: currentUser
        })

        expect(res.body.data).to.containSubset({ id: ico.id })
        expect(await Ico.find({ id: ico.id })).to.be.empty
      })
    })

    describe('role superAdmin', () => {
      it("should delete current user", async () => {
        let user = await factory.create("user", { role: "superAdmin"})
        let ico = await factory.create("ico")
        ico.user = user.id
        await ico.save()

        let res = await request(`${url}/${ico.id}`, {
          user: user,
          method: "delete",
        })

        expect(res.body.data).to.containSubset({ id: ico.id })
        expect(await Ico.find({ id: ico.id })).to.be.empty
      })

      it("should not delete other ico", async () => {
        let currentUser = await factory.create("user", { role: "superAdmin"})

        let user = await factory.create("user", { role: "user"})
        let ico = await factory.create("ico")
        ico.user = user.id
        await ico.save()

        let res = await request(`${url}/${ico.id}`, {
          method: "delete",
          user: currentUser
        })

        expect(res.body.data).to.containSubset({ id: ico.id })
        expect(await Ico.find({ id: ico.id })).to.be.empty
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

        expect(res.body).to.have.property('error')
      })
    })
  })

})
