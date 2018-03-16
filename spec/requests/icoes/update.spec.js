import "../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('valid params given', () => {

    describe('role guest', () => {
      it("should return error", async () => {
        const ico = await factory.create('ico')
        const newIco = await factory.build('ico')
        const params = {
          data: {
            attributes: {
              title: newIco.title,
              projectName: newIco.projectName,
              source: newIco.source,
            }
          }
        }

        let res = await request(`${url}/${ico.id}`, {
          method: "put",
          unauth: true,
          params,
        })

        expect(res.body).to.have.property("error")
      })
    })

    describe('role user', () => {
      describe('update', () => {
        it("should edit owner ico", async () => {
          let user = await factory.create('user', { role: "user"})
          let ico = await factory.create('ico')
          const projectName = "projectName"
          ico.user = user.id
          await ico.save()

          const params = {
            data: {
              attributes: {
                projectName: projectName,
              }
            }
          }

          let res = await request(`${url}/${ico.id}`, {
            method: "put",
            user,
            params,
          })

          const attr = {
            projectName: projectName,
          }

          expect(res.body.data.id).to.eql(ico.id)
          expect(res.body.data.attributes).to.containSubset(attr)
        })

        it("should not edit other ico", async () => {
          let user = await factory.create('user', { role: "user" })
          let ico = await factory.create('icoWithUser')

          const params = {
            data: {
              attributes: {
                projectName: "projectName",
              }
            }
          }

          let res = await request(`${url}/${ico.id}`, {
            method: "put",
            user,
            params,
          })

          expect(res.body).to.have.property("error")
        })
      })

      describe('approve', () => {
        it("should set approve to false", async () => {
          let user = await factory.create('user', { role: "user" })
          let ico = await factory.create('ico', { approve: true })
          const projectName = "projectName"
          await user.addIco(ico)

          const params = {
            data: {
              attributes: {
                projectName,
              }
            }
          }

          let res = await request(`${url}/${ico.id}`, {
            method: "put",
            user,
            params,
          })

          const attr = {
            id: ico.id,
            attributes: {
              projectName: projectName,
              approve: false,
            },
          }

          expect(res.body.data).to.containSubset(attr)
        })

      })

      describe('visibleAdmin', () => {
        it("should not update visibleAdmin", async () => {
          let user = await factory.create('user', { role: "user" })
          let ico = await factory.create('ico', { visibleAdmin: false })
          ico.user = user.id
          await ico.save()

          const params = {
            data: {
              attributes: {
                visibleAdmin: true
              }
            }
          }

          let res = await request(`${url}/${ico.id}`, {
            method: "put",
            user,
            params,
          })

          expect(res.body).to.have.property("error")
        })
      })

    })

    describe('role admin', () => {
      describe('approve', () => {
        it("should not set approve to false", async () => {
          let user = await factory.create('user', { role: "admin" })
          let ico = await factory.create('ico')

          const params = {
            data: {
              attributes: {
                approve: true,
                projectName: "projectName",
              }
            }
          }

          let res = await request(`${url}/${ico.id}`, {
            method: "put",
            user,
            params,
          })

          expect(res.status).to.eql(200)
          expect(res.body.data.id).to.eql(ico.id)
          expect(res.body).to.containSubset(params)
        })
      })

      describe('visibleAdmin', () => {
        it("should not update visibleAdmin", async () => {
          let user = await factory.create('user', { role: "admin" })
          let ico = await factory.create('ico', { visibleAdmin: false })
          ico.user = user.id
          await ico.save()

          const params = {
            data: {
              attributes: {
                visibleAdmin: true
              }
            }
          }

          let res = await request(`${url}/${ico.id}`, {
            method: "put",
            user,
            params,
          })

          const attr = {
            visibleAdmin: true,
          }

          expect(res.body.data.id).to.eql(ico.id)
          expect(res.body.data.attributes).to.containSubset(attr)
        })
      })
    })

    describe('role superAdmin', () => {
      describe('approve', () => {
        it("should not set approve to false", async () => {
          let user = await factory.create('user', { role: "superAdmin" })
          let ico = await factory.create('ico')

          const params = {
            data: {
              attributes: {
                approve: true,
                projectName: "projectName",
              }
            }
          }

          let res = await request(`${url}/${ico.id}`, {
            method: "put",
            user,
            params,
          })

          expect(res.status).to.eql(200)
          expect(res.body.data.id).to.eql(ico.id)
          expect(res.body).to.containSubset(params)
        })
      })

      describe('visibleAdmin', () => {
        it("should not update visibleAdmin", async () => {
          let user = await factory.create('user', { role: "superAdmin" })
          let ico = await factory.create('ico', { visibleAdmin: false })
          ico.user = user.id
          await ico.save()

          const params = {
            data: {
              attributes: {
                visibleAdmin: true,
              }
            }
          }

          let res = await request(`${url}/${ico.id}`, {
            method: "put",
            user,
            params,
          })

          expect(res.status).to.eql(200)
          expect(res.body.data.id).to.eql(ico.id)
          expect(res.body).to.containSubset(params)
        })
      })
    })

  })

})
