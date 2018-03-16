import "../support/hook"
import { Ico } from "../../init/mongoose"
import { defineAbilitiesFor } from '../../app/policy'

describe(__filename, () => {

  describe("role user", () => {
    describe("read icoes", () => {
      it("should return true", async () => {
        const user = await factory.create('user')
        const ability = await defineAbilitiesFor(user)

        let ico = await Ico.createObject({ title: "title" })
        await user.addIco(ico)

        ico = await Ico.findById(ico.id)

        let res = ability.can("read", ico)

        expect(res).to.be.true
      })
    })
  })

})
