import request from 'superagent'
import { Ticker } from '../../../init/mongoose'

export const getCoinlist = async (path) => {
  let coinlist = await request
    .get('https://min-api.cryptocompare.com/data/all/coinlist')

  coinlist = JSON.parse(coinlist.text)

  if (coinlist["Response"] == "Success") {

    for (var k in coinlist["Data"]) {
      const name = coinlist["Data"][k]["Name"]
      const ticker = await Ticker.findOne({ name })

      if (ticker)
        continue

      console.log(name + '\n');
      
      let tmp = {}

      tmp.name = coinlist["Data"][k]["Name"]
      tmp.symbol = coinlist["Data"][k]["Symbol"]
      tmp.coinName = coinlist["Data"][k]["CoinName"]
      tmp.fullName = coinlist["Data"][k]["FullName"]
      tmp.isTrading = coinlist["Data"][k]["IsTrading"]

      await Ticker.createObject(tmp)
    }
  }
}