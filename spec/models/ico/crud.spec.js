import "../../support/hook"
import { Ico } from "../../../init/mongoose"

describe(__filename, () => {

  it('create', async () => {
    expect(await Ico.find({})).to.be.empty

    let object = await factory.build("ico")

    expect(object).to.have.property('_id')
    expect(await Ico.find({})).to.exist
  })

  it('update', async () => {
    let object = await factory.create("ico")

    let attributes = {
      projectName: "projectName",
    }

    let newObject = await Ico.updateObject(object.id, attributes)

    Object.keys(attributes).map((key) => {
      expect(newObject).to.have.property(key)
    })
  })

  it('destroy', async () => {
    let object = await factory.create("ico")

    expect(await Ico.find({})).to.be.exist
    await Ico.destroyObject(object.id)
    expect(await Ico.find({})).to.be.empty
  })

})
