import "../../../support/hook"
import { Ico } from "../../../../init/mongoose"

describe(__filename, () => {

  describe('valid params given', () => {
    let user, ico, res, params

    describe('with include', () => {
      const url = "/v1/me/followers?include=followers,icoes"

      beforeEach(async () => {
        ico = await factory.create("ico")
        user = await factory.create("user")
      })

      beforeEach(async () => {
        params = {
          data: {
            id: ico.id,
            type: "ico",
          }
        }

        res = await request(url, {
          method: "post",
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

      it("should return valid included", async () => {
        expect(res.body.included[0].id).to.eql(ico.id)
      })

      it("should add ico.follower ", async () => {
        ico = await Ico.findById(ico.id)

        expect(ico.followers[0]).to.eql(user._id)
      })
    })

    describe('without include', () => {
      const url = "/v1/me/followers"

      beforeEach(async () => {
        ico = await factory.create("ico")
        user = await factory.create("user")
      })

      beforeEach(async () => {

        params = {
          data: {
            id: ico.id,
            type: "ico",
          }
        }

        res = await request(url, {
          method: "post",
          user,
          params,
        })
      })

      it("should return valid relationships", async () => {
        const userFollowerId = res.body.data.relationships.followers.data[0].id

        expect(userFollowerId).to.containSubset(ico.id)
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
    })

  })

  describe('wrong params given', () => {
    const url = "/v1/me/followers?include=followers,icoes"

    describe('ico not exist', () => {
      it("should return error", async () => {

        let res = await request(url, {
          method: "post",
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
          method: "post",
          params: params,
        })

        expect(res.body).to.have.property("error")
        expect(res.status).to.eql(422)
      })
    })
  })

})
