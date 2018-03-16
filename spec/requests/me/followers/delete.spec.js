import "../../../support/hook"
import { User, Ico } from "../../../../init/mongoose"

const url = "/v1/me/followers?include=followers,icoes"

describe(__filename, () => {

  describe('valid params given', () => {
    let ico, user, res

    beforeEach(async () => {
      ico = await factory.create("ico")
      user = await factory.create("user")

      await user.addFollowers(ico)
    })

    beforeEach(async () => {
      const params = {
        data: {
          id: ico.id,
          type: "ico",
        }
      }

      res = await request(url, {
        method: "delete",
        user,
        params,
      })
    })

    it("should return valid status", async () => {
      expect(res.status).to.eql(200)
    })

    it("should return valid response", async () => {
      const response = {
        data: {
          id: user.id,
          type: "user",
          attributes: {
            name: user.name,
            email: user.email,
          }
        }
      }

      expect(res.body).to.containSubset(response)
    })

    it("should remove follower", async () => {
      const newUser = await User.findById(user.id).populate("followers")

      expect(newUser.followers).to.be.empty
    })

    it("should remove ico follower", async () => {
      ico = await Ico.findById(ico.id).populate("followers")

      expect(ico.followers).to.be.empty
    })

    it("should not return follower", async () => {
      expect(res.body.included).be.a.undefined
    })

  })

  describe('wrong params given', () => {
    describe('ico not exist', () => {
      it("should return error", async () => {

        let res = await request(url, {
          method: "delete",
        })

        expect(res.body).to.have.property("error")
        expect(res.status).to.eql(422)
      })
    })

    describe('ico id not valid', () => {
      it("should return error", async () => {
        const params = {
          data: {
            id: "123456"
          }
        }

        let res = await request(url, {
          method: "delete",
          params: params,
        })

        expect(res.body).to.have.property("error")
        expect(res.status).to.eql(422)
      })
    })
  })

})
