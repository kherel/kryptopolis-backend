import "../../support/hook"
import { User } from "../../../init/mongoose"

describe(__filename, () => {

  it('attributes', async () => {
    let user = await factory.build('user')

    const attributes = [
      "_id",
      "email",
      "password",
      "cofirmEmail",
      "cofirmCode",
    ]

    attributes.map((attrubute) => {
      expect(user).to.have.property(attrubute)
    })
    expect(user).to.have.property('cofirmEmail').eql(false)
  })

  it('create', async () => {
    expect(await User.find({})).to.be.empty

    let user = await factory.build('user')

    expect(user).to.have.property('_id')
    expect(await User.find({})).to.exist
  })

  it('update', async () => {
    let user = await factory.create('user')

    let attributes = {
      email: "new_email@test.com",
    }

    let newUser = await User.updateObject(user.id, attributes)

    expect(newUser.email).to.eql(attributes.email)
  })

  it('destroy', async () => {
    let user = await factory.create('user')

    expect(await User.find({})).to.be.exist
    await User.destroyObject(user._id)
    expect(await User.find({})).to.be.empty
  })

})
