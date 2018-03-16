import "../../../support/hook"
import { Ico, User } from "../../../../init/mongoose"

describe(__filename, () => {

  describe("#addFollowers", () => {
    it('should add ico', async () => {
      let ico = await factory.create('ico')
      let user = await factory.create('user')

      await user.addFollowers(ico)

      ico = await Ico.findOne()

      expect(ico.followers[0]).to.eql(user._id)
    })
  })

  it('should add followes', async () => {
    let ico = await factory.create('ico')
    let user = await factory.create('user')

    user.followers.addToSet(ico.id)
    await user.save()

    user.followers.addToSet(ico.id)
    await user.save()

    await User.populate(user, 'followers')

    expect(user.followers[0].id).eql(ico.id)
    expect(user.followers.length).eql(1)
  })


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
