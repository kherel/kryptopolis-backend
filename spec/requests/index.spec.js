import "../support/hook"
import settings from '../../settings/settings'

describe(__filename, () => {

  it("GET /", async () => {
    let res = await request("/")

    expect(res.status).to.eql(200)
    expect(res.body).to.have.property('servise').to.eql(settings.name)
    expect(res.body).to.have.property('current_version').to.eql("/v1")
  })

  it("GET /not-found-url", async () => {
    let res = await request("/not-found-url")

    expect(res.status).to.eql(404)
    expect(res.body).to.have.property('error').to.eql("not found url")
  })

})
