import { merge, pick } from "ramda"
import { Ticker } from "../../init/mongoose"
import { tickerSerializer } from "../serializers"
import { getAttributes, getOptionsFind } from "../services/params"

const filterAttributes = pick([
  "name",
  "symbol",
  "coinName",
  "fullName",
  "isTrading"
])

export default {

  index: async (req, res, next) => {
    try {
      let tickers = await Ticker.find({}, null, getOptionsFind(req))
      let total = await Ticker.count()

      let response = tickerSerializer(tickers, { total: total })

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  }

}
