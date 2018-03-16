import "../../support/hook"
import { Ico } from "../../../init/mongoose"

describe(__filename, () => {

  describe('get icoes', () => {
    it('should return icoes', async () => {
      let ico = await factory.create('ico')
      let user = await factory.create('user')

      await ico.update({ user: user.id })

      const icoWithUser = await Ico.findById(ico.id).populate("user")

      expect(icoWithUser.user.id).to.eql(user.id)
    })
  })

})
