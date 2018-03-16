import "../support/hook"
import { User, Ico } from "../../init/mongoose"
import { defineAbilitiesFor } from '../../app/policy'

describe(__filename, () => {

  describe("role guest", () => {
    describe("read icoes", () => {
      it("should return true", async () => {
        let ability = await defineAbilitiesFor()
        const ico = new Ico({ approve: true, visibleUser: true,  visibleAdmin: true })
        const res = ability.can("read", ico)

        expect(res).to.be.true
      })
    })
  })

  describe("role user", () => {
    describe("change role", () => {
      it("should not update", async () => {
        let user = await factory.build('user')
        let ability = await defineAbilitiesFor(user)

        user.set({ role: "admin" })

        let res = ability.can("update", user)

        expect(res).to.be.false
      })
    })

    describe("update icoes", () => {

      it("should update", async () => {
        let ico = await factory.create('icoWithUser')
        let user = await User.findById(ico.user)
        let ability = await defineAbilitiesFor(user)

        let res = ability.can("update", ico)

        expect(res).to.be.true
      })

      it("should not update", async () => {
        let user = await factory.create('user')
        let ico = await factory.create('icoWithUser')
        let ability = await defineAbilitiesFor(user)
        let res = ability.can("update", ico)

        expect(res).to.be.false
      })
    })
    describe("delete icoes", () => {
      it("should update", async () => {
        let ico = await factory.create('icoWithUser')
        let user = await User.findById(ico.user)
        let ability = await defineAbilitiesFor(user)
        let res = ability.can("delete", ico)

        expect(res).to.be.true
      })
      it("should not update", async () => {
        let user = await factory.build('user')
        let ico = await factory.build('icoWithUser')
        let ability = await defineAbilitiesFor(user)
        let res = ability.can("delete", ico)

        expect(res).to.be.false
      })
    })

    describe("access icoVisibleAdmin", () => {
      it("should return false", async () => {
        let user = await factory.build("user", { role: "user" })
        let ability = await defineAbilitiesFor(user)
        let res = ability.can("access", "icoVisibleAdmin")

        expect(res).to.be.false
      })
    })

  })

  describe("role admin", () => {
    describe("access icoVisibleAdmin", () => {
      it("should return true", async () => {
        let user = await factory.build("user", { role: "admin" })
        let ability = await defineAbilitiesFor(user)
        let res = ability.can("access", "icoVisibleAdmin")

        expect(res).to.be.true
      })
    })
  })

})
