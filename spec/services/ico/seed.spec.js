import "../../support/hook"
import { Ico } from "../../../init/mongoose"
import icoSeed from "../../../app/services/ico/seed"

describe(__filename, () => {
  const fixture_path = "spec/fixtures/icoes.json"

  it("should return valid response", async () => {
    await icoSeed(fixture_path)

    const ico = await Ico.findOne({ title: "AMLT by Coinfirm" })

    const attr = {
      logo: "https://tokenmarket.net/blockchain/ethereum/assets/amlt-by-coinfirm/logo_big.png",
        technology: {
        blockchain: "Ethereum",
      },
      github: {
        url: "https://github.com/300cubits",
      },
      facebook: {
        url: "https://www.facebook.com/300cubits.tech",
      },
      twitter: {
        url: "https://twitter.com/300cubits_tech",
      },
    }

    expect(ico).to.containSubset(attr)
  })

})
