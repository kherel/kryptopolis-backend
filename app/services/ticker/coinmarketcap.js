import request from 'superagent'
import { Ticker } from '../../../init/mongoose'

export const getTickers = async (path) => {
  let tickers = await request
    .get('https://api.coinmarketcap.com/v2/ticker/')

  tickers = JSON.parse(tickers.text)

  if (!tickers["metadata"]["error"]) {

    for (var k in tickers["data"]) {
      const name = tickers["data"][k]["name"]
      const ticker = await Ticker.findOne({ name })

      try {
        if (ticker) {
          let tmp = {}

          tmp.name = tickers["data"][k]["name"]
          tmp.symbol = tickers["data"][k]["symbol"]
          tmp.priceUSD = tickers["data"][k]["quotes"]["USD"]["price"]
          tmp.volume24h = tickers["data"][k]["quotes"]["USD"]["volume_24h"]
          tmp.marketCap = tickers["data"][k]["quotes"]["USD"]["market_cap"]
          tmp.percentChange1h = tickers["data"][k]["quotes"]["USD"]["percent_change_1h"]
          tmp.percentChange24h = tickers["data"][k]["quotes"]["USD"]["percent_change_24h"]
          tmp.percentChange7d = tickers["data"][k]["quotes"]["USD"]["percent_change_7d"]
          tmp.lastUpdated = tickers["data"][k]["last_updated"]

          await Ticker.createObject(tmp)
        } else {
          ticker.priceUSD = tickers["data"][k]["quotes"]["USD"]["price"]
          ticker.volume24h = tickers["data"][k]["quotes"]["USD"]["volume_24h"]
          ticker.marketCap = tickers["data"][k]["quotes"]["USD"]["market_cap"]
          ticker.percentChange1h = tickers["data"][k]["quotes"]["USD"]["percent_change_1h"]
          ticker.percentChange24h = tickers["data"][k]["quotes"]["USD"]["percent_change_24h"]
          ticker.percentChange7d = tickers["data"][k]["quotes"]["USD"]["percent_change_7d"]
          ticker.lastUpdated = tickers["data"][k]["last_updated"]

          await ticker.save()
        }
      } catch (err) {
        continue
      }
    }
  }
}