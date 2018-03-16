import "../../support/hook"
import * as mailgun from "../../../app/services/mailgun"

const url = "/v1/subscribe"

describe(__filename, () => {
  const email = "test@test.com"

  describe('valid params given', () => {
    describe('call subscribe', () => {
      let maigunSubscribe

      beforeEach(() => {
        nock(/mailchimp/).post(/[\w\:\/\.]+/).reply(200, {})
      })

      afterEach(() => {
        nock.cleanAll()
      })

      beforeEach(async () => {
        maigunSubscribe = sinon.stub(mailgun, 'subscribe')
      })

      afterEach(() => {
        mailgun.subscribe.restore()
      })

      const params = {
        data: {
          attributes: { email }
        }
      }

      it("should return valid status", async () => {
        let res = await request(url, {
          method: "post",
          unauth: true,
          params,
        })

        expect(res.status).to.eql(200)
      })

      it("should return valid response", async () => {
        let res = await request(url, {
          method: "post",
          unauth: true,
          params,
        })

        expect(res.body.data).to.have.property("type").eql("message")
        expect(res.body.data.attributes).to.have.property("value").eql("ok")
      })

      it("should return add subscribe", async () => {
        await request(url, {
          method: "post",
          unauth: true,
          params,
        })

        const res = maigunSubscribe.args[0][0]
        expect(email).to.eql(res)
      })

    })
  })

  describe('wrong params given', () => {
    describe('email empty', () => {
      it("should return error", async () => {
        await factory.create("user")

        let res = await request(url, {
          method: "post",
          unauth: true,
        })

        expect(res.body).to.have.property("error").eql("email not found")
        expect(res.status).to.eql(422)
      })
    })
  })

})
