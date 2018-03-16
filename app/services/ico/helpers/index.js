import { prop, find, propEq } from "ramda"
import replaceTeam from "./replace_team"
import replaceOverview from "./replace_overview"

export const replaceTechnology = (object) => {
  object.technology.blockchain = object.technology.Blockchain

  return object
}

export const addGithub = (object) => {
  const url = object.github || ""
  object.github = { url }

  return object
}

export const addFacebook = (object) => {
  const url = prop("url", find(
    propEq('title', "Facebook"),
    object.links
  )) || ""

  object.facebook = { url }

  return object
}

export const addTwitter = (object) => {
  const url = prop("url", find(
    propEq('title', "Twitter"),
    object.links
  )) || ""

  object.twitter = { url }

  return object
}

export {
  replaceTeam,
  replaceOverview,
}
