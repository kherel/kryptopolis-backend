import "../../support/hook"
import { Ico, User } from "../../../init/mongoose"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('valid params given', () => {
    let user, ico, res

    beforeEach(async () => {
      user = await factory.create('user')
      ico = await factory.build('ico')

      const params = {
        data: {
          attributes: {
            title: ico.title,
            projectName: ico.projectName,
            source: ico.source,
            logo: ico.logo,
          }
        }
      }

      res = await request(url, {
        method: "post",
        params,
        user,
      })
    })

    it(`should return object`, async () => {
      const attr = {
        data: {
          attributes: {
            title: ico.title,
            projectName: ico.projectName,
            source: ico.source,
            logo: ico.logo,
          }
        }
      }

      expect(res.body).to.containSubset(attr)
    })

    it(`should return valid status`, async () => {
      expect(res.status).to.eql(200)
    })

    it(`ico should have user`, async () => {
      ico = await Ico.findOne().populate("user")

      expect(ico.user.id).to.eql(user.id)
    })

    it(`user should have ico`, async () => {
      user = await User.findById(user.id).populate("icoes")
      ico = await Ico.findOne().populate("user")
      expect(user.icoes[0].id).to.eql(ico.id)
    })

  })

  describe("wrong params given", () => {
    describe("role guest", () => {
      it("should return error", async () => {
        let res = await request(url, {
          method: "post",
          unauth: true,
        })

        expect(res.body).to.have.property('error')
      })
    })
  })

})
