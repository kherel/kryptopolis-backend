import "../../support/hook"
import { Ico } from "../../../init/mongoose"
import { upload, updateUrlOnCloudinary } from "../../../app/services/cloudinary"

describe(__filename, () => {
  const secure_url = "secure_url"
  const logo = "http://tokenmarket.net/image"

  beforeEach(() => {
    nock(/[\w\:\/\.]+/).post(/[\w\:\/\.]+/).reply(200, { secure_url: secure_url })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe("upload", () => {
    it("should return secure_url", async () => {
      const url = "http://url.com/image"
      const public_id = "public_id"

      let result = await upload(url, public_id)

      expect(result).to.eql(secure_url)
    })
  })

  describe("updateUrlOnCloudinary", () => {
    it("should return ", async () => {
      let ico = await factory.create("ico", { title: "title", logo: logo })

      await updateUrlOnCloudinary()

      ico = await Ico.findById(ico.id)

      expect(ico.logo).to.eql(secure_url)
    })
  })

})
