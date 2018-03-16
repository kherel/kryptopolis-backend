import "../../support/hook"
import mailgun from "../../../init/mailgun"

const url = "/v1/auth/send_confirm"

describe(__filename, () => {

  describe(`PUT ${url}`, () => {
    describe("valid params given", () => {
      let user
      let data = sinon.spy()

      beforeEach(async () => {
        sinon.stub(mailgun, 'messages').onCall(0).returns({ send: data })
        user = await factory.create('user')
      })

      afterEach(() => {
        mailgun.messages.restore()
      })

      it("should return error", async () => {
        let res = await request(url, {
          method: "put",
          user,
        })

        const result = data.args[0][0]

        expect(result.from).to.be.a("string")
        expect(result.to).to.eql(user.email)
        expect(result.subject).to.be.a("string")
        expect(result.html).to.be.a("string")

        expect(res.body.data.attributes).to.have.property('value').eql("ok")
      })
    })

    describe("wrong params given", () => {
      describe("user not authorization", () => {
        let stub
        let data = sinon.spy()

        beforeEach(async () => {
          stub = sinon.stub(mailgun, 'messages').onCall(0).returns({ send: data })
        })

        afterEach(() => {
          mailgun.messages.restore()
        })

        it("should return error", async () => {
          let res = await request(url, {
            method: "put",
            unauth: true,
          })

          expect(stub.called).to.be.false
          expect(res.body).to.have.property('error')
        })
      })
    })

  })
})
