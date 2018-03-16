import "../../support/hook"
import mailgun from "../../../init/mailgun"

const url = '/v1/users'

describe(__filename, () => {
  describe(`POST ${url}`, () => {

    describe('valid params given', () => {
      let data

      beforeEach(async () => {
        data = sinon.spy()
        sinon.stub(mailgun, 'messages').returns({ send: data })
      })

      afterEach(() => {
        mailgun.messages.restore()
      })

      it("shoud create user", async () => {
        const user = await factory.build("user")

        const params = {
          data: {
            attributes: {
              name: user.name,
              email: user.email,
              password: 'password'
            }
          }
        }

        const res = await request(url, {
          method: "post",
          params: params,
          unauth: true,
        })

        const response = {
          type: "user",
          attributes: {
            name: user.name,
            email: user.email,
            role: "user",
            editor: false,
          }
        }

        expect(res.body.data).to.containSubset(response)
      })

      it("shoud send email", async () => {
        const user = await factory.build("user")

        const params = {
          data: {
            attributes: {
              name: user.name,
              email: user.email,
              password: 'password'
            }
          }
        }

        await request(url, {
          method: "post",
          params: params,
          unauth: true,
        })

        const result = data.args[0][0]

        expect(result.from).to.be.a("string")
        expect(result.to).to.eql(user.email)
        expect(result.subject).to.be.a("string")
        expect(result.html).to.be.a("string")
      })

    })

    describe('wrong params given', () => {
      it("invalid email", async () => {
        const params = {
          data: {
            attributes: {
              email: 'test',
              password: 'cat'
            }
          }
        }

        let res = await request(url, {
          method: "post",
          params: params,
        })

        expect(res.body).to.have.property('error')
      })

      it("invalid password", async () => {
        const params = {
          data: {
            attributes: {
              email: 'test@test.com',
              password: ''
            }
          }
        }

        let res = await request(url, {
          method: "post",
          params: params,
        })

        expect(res.body).to.have.property('error')
      })

      it("user already exist", async () => {
        let user = await factory.create("user")

        let params = {
          data: {
            attributes: {
              email: user.email,
              password: 'password',
            }
          }
        }

        let res = await request(url, {
          method: "post",
          params: params,
          unauth: true,
        })

        expect(res.body).to.have.property('error')
      })
    })

  })
})
