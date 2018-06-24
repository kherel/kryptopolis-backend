import { merge, pick } from "ramda"
import { Portfolio, Ticker } from "../../init/mongoose"
import { portfolioSerializer } from "../serializers"
import { getAttributes, getOptionsFind } from "../services/params"

const filterAttributes = pick([
  "publish",
])

const tickerPopulateAttributes = ["name", "symbol", "priceUSD", "volume24h",
  "marketCap", "percentChange1h", "percentChange24h", "percentChange7d", "lastUpdated"]

export default {

  index: async (req, res, next) => {
    try {
      let options = {};

      if (!req.user || req.user.role == "user")
        options = { publish: true }

      let requestOptions = getOptionsFind(req)

      let portfolios = await Portfolio.find(options, null, requestOptions).
        populate("user", "name").
        populate("forecast.balanced", tickerPopulateAttributes).
        populate("forecast.growth", tickerPopulateAttributes).
        populate("forecast.aggressive", tickerPopulateAttributes)
      let total = await Portfolio.count(options)

      let response = portfolioSerializer(portfolios, { total: total })

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  show: async (req, res, next) => {
    const { id } = req.params

    try {
      const portfolio = await Portfolio.findById(id).
        populate("user", "name").
        populate("forecast.balanced", tickerPopulateAttributes).
        populate("forecast.growth", tickerPopulateAttributes).
        populate("forecast.aggressive", tickerPopulateAttributes)

      if ((!req.user || req.user.role == "user")
        && portfolio && portfolio.publish === false) {
        res.status(401)
        return next(new Error("forbidden"))
      }

      const response = portfolioSerializer(portfolio)

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  create: async (req, res, next) => {
    try {
      req.ability.throwUnlessCan('create', new Portfolio)

      const body = merge(
        filterAttributes(getAttributes(req)),
        { user: req.user_id }
      )

      const portfolio = await Portfolio.createObject(body)
      const response = portfolioSerializer(portfolio)

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params

    try {
      req.ability.throwUnlessCan('update', new Portfolio)

      let portfolio = await Portfolio.findById(id)

      portfolio.set(filterAttributes(getAttributes(req)))

      await portfolio.save()
      let response = portfolioSerializer(portfolio)

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params

    try {
      req.ability.throwUnlessCan('delete', new Portfolio)

      const portfolio = await Portfolio.findById(id)

      if (!portfolio) {
        res.status(422)
        return next(new Error("news not found"))
      }

      await portfolio.remove()
      let response = portfolioSerializer(portfolio)

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

}
