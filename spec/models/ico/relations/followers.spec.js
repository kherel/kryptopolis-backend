import "../../../support/hook"
import { User } from "../../../../init/mongoose"

describe(__filename, () => {

  it('should add follow', async () => {
    let ico = await factory.create('ico')
    let user = await factory.create('user')

    user.followers.addToSet(ico.id)

    await user.save()

    user = await User.findById(user.id).populate("followers")

    expect(user.followers[0].id).eql(ico.id)
  })

  it('should remove follow', async () => {
    let ico = await factory.create('ico')
    let user = await factory.create('user')

    user.set({ followers: [ico] })
    await user.update()

    expect(user.followers[0]).eql(ico)

    user.followers.remove(ico)

    await user.save()

    user = await User.findById(user.id).populate("followers")

    expect(user.followers).to.be.empty
  })

})
