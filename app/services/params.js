import { pick, merge, path } from "ramda"
import { regExpGithub } from "./github/helpers"

export const params = (req, keys) => {
  let res = req.body

  Object.keys(res)
    .filter(key => !keys.includes(key))
    .forEach(key => delete res[key])

  return res
}

export const createFilterAttributes = (attrs) => {
  return pick(attrs)
}

export const getAttributes = (req) => {
  return path(["body", 'data', "attributes"], req) || {}
}

export const getId = (req) => {
  return path(["body", 'data', "id"], req)
}

export const getOptionsFind = (req) => {
  const skip = parseInt(path(["query", 'page', "offset"], req)) || 0
  const limit = parseInt(path(["query", 'page', "limit"], req)) || 15
  let sort = path(["query", "sort"], req)

  if (sort) sort = sort.replace(/followers/, "followersCount")

  return { skip, limit, sort }
}

export const getFields = (req, model) => {
  let res = path(["query", 'fields', model], req)

  if (res) return res.replace(/,/g, " ")
  return null
}

export const getInclude = (req) => {
  let included = req.query.include

  if (!included) return

  const options = included.split(",").reduce((acc, object) => {
    acc[object] = true
    return acc
  }, {})

  return options
}

export const getOptionsSerializer = (req, total) => {
  let options
  let attributes = {}
  let included = req.query.include

  if (included) {
    options = included.split(",").reduce((acc, object) => {
      acc[object] = true
      return acc
    }, {})
  }

  let ico = path(["query", "fields", "ico"], req)
  if (ico) attributes.ico = ico.split(",")

  let user = path(["query", "fields", "user"], req)
  if (user) attributes.user = user.split(",")

  return merge(options, { total, attributes })
}

export const getFilterIco = (req) => {
  let filter = path(['query', "filter"], req) || {}

  return Object.keys(filter).reduce((acc, object) => {
    if (object == "data") {
      if (filter.data == "now") {
        acc = merge(acc, {
          "overview.tokenSaleOpeningDate": { "$lt": new Date() },
          "overview.tokenSaleClosingDate": { "$gt": new Date() },
        })
      }

      if (filter[object] == "upcoming") {
        acc = merge(acc, {
          "overview.tokenSaleOpeningDate": { "$gt": new Date() },
          "overview.tokenSaleClosingDate": { "$gt": new Date() },
        })
      }
    }

    if (object == "title") {
      acc = merge(acc, {
        title: new RegExp(filter.title, "i")
      })
    }

    if (object == "visibleAdmin") {
      acc = merge(acc, { visibleAdmin: filter[object] })
    }

    if (object == "approve") {
      acc = merge(acc, { approve: filter[object] })
    }

    if (object == "github" && filter[object]) {
      acc = merge(acc, { github: regExpGithub })
    }

    return acc
  }, {})
}

export const getFilterUser = (req) => {
  let filter = path(['query', "filter"], req) || {}

  return Object.keys(filter).reduce((acc, object) => {
    if (object == "name") {
      acc = merge(acc, {
        name: new RegExp(filter.name, "i")
      })
    }

    if (object == "email") {
      acc = merge(acc, {
        email: new RegExp(filter.email, "i")
      })
    }

    return acc
  }, {})
}
