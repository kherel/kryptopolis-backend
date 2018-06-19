import { merge, pick } from "ramda";
import { Ticker } from "../../init/mongoose";
import { tickerSerializer } from "../serializers";
import { getAttributes, getOptionsFind } from "../services/params";
import mongoose from 'mongoose'

const filterAttributes = pick([
  "name",
  "symbol",
  "priceUSD",
  "volume24h",
  "marketCap",
  "percentChange1h",
  "percentChange24h",
  "percentChange7d",
  "lastUpdated"
]);

export default {
  index: async (req, res, next) => {
    try {
      let tickers = await Ticker.find({}, null, getOptionsFind(req));
      let total = await Ticker.count();

      let response = tickerSerializer(tickers, { total: total });

      res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  },

  special: async (req, res, next) => {
    try {
      let down = await Ticker.$where("this.percentChange24h !== null")
        .sort("percentChange24h")
        .limit(10);

      let up = await Ticker.$where("this.percentChange24h !== null")
        .sort("-percentChange24h")
        .limit(10);

      let widget = await Ticker.find({
        'name': ['Bitcoin', 'Ethereum', 'Ripple']
      })

      res.status(200).json(nomalizeSerializer({up, down, widget}));
    } catch (err) {
      return next(err);
    }
  }
};


function nomalizeSerializer(obj) {
  const res = {
    entities: {}
  }

  Object.keys(obj).map(key => {
    res[key] = []
    obj[key].map(item => {
      const id = item._id
      res.entities[id] = item
      res[key].push(id)
    })

  })
  return res
}