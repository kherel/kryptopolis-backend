import { Serializer } from 'jsonapi-serializer'
import { path } from "ramda"
import { User, Ico } from "../../init/mongoose"

const userAttributes = [
  "name",
  "email",
  "role",
  "editor",
  "provider",
  "cofirmEmail",

  "icoes",
  "articles",
  "followers",
  "updatedAt",
  "createdAt",
]

const icoAttributes = [
  "source",
  "title",
  "titleUrl",
  "video",
  "description",
  "overview",
  "articles",
  "team",
  "technology",
  "legal",
  "links",
  "local",
  "approve",
  "visibleUser",
  "visibleAdmin",
  "user",
  "projectName",
  "logo",

  "status",

  "github",
  "facebook",
  "twitter",

  "followers",
  "icoes",
  "updatedAt",
  "createdAt",
]

const atricleAttributes = [
  "title",
  "metaTags",
  "keywords",
  "summary",
  "text",
  "draft",
  "image",
  "publish",
  "publishAt",

  "user",
  "updatedAt",
  "createdAt",
]

const newsAttributes = [
  "title",
  "text",
  "draft",
  "image",
  "publish",
  "publishAt",

  "user",
  "updatedAt",
  "createdAt",
]

const videoAttributes = [
  "title",
  "text",
  "image",

  "user",
  "updatedAt",
  "createdAt",
]

export const userSerializer = async (data, meta = {}) => {
  const attributes = path(["attributes", "user"], meta) || userAttributes

  if (meta.followers) await User.populate(data, "followers")
  if (meta.icoes) await User.populate(data, "icoes")

  return new Serializer('user', {
    id: "id",
    attributes: attributes,
    keyForAttribute: "camelCase",
    icoes: {
      ref: (user, object) => {
        return meta.icoes ? object.id : object
      },
      included: meta.icoes || false,
      attributes: icoAttributes,
    },
    followers: {
      ref: (user, object) => {
        return meta.followers ? object.id : object
      },
      included: meta.followers || false,
      attributes: icoAttributes,
    },
    typeForAttribute: (attribute, record) => {
      return (record && record.type) ? record.type : attribute
    },
    meta: {
      "total-pages": meta.total,
    }
  }).serialize(data)
}

export const icoSerializer = async (data, meta = {}) => {
  const attributes = path(["attributes", "ico"], meta) || icoAttributes

  if (meta.user) await Ico.populate(data, "user")
  if (meta.followers) await Ico.populate(data, "followers")

  return new Serializer('ico', {
    id: "id",
    attributes: attributes,
    keyForAttribute: "camelCase",
    user: {
      ref: (_, object = {}) => {
        return meta.user ? object.id : object
      },
      included: meta.user || false,
      attributes: userAttributes,
    },
    followers: {
      ref: (user, object) => {
        return meta.followers ? object.id : object
      },
      included: meta.followers || false,
      attributes: userAttributes,
    },
    typeForAttribute: (attribute, record) => {
      return (record && record.type) ? record.type : attribute
    },
    meta: {
      "total-pages": meta.total,
    },
  }).serialize(data)
}

export const articleSerializer = (data, meta = {}) => {
  return new Serializer('article', {
    id: "id",
    attributes: atricleAttributes,
    keyForAttribute: "camelCase",
    typeForAttribute: (attribute, record) => {
      return (record && record.type) ? record.type : attribute
    },
    meta: {
      "total-pages": meta.total,
    },
  }).serialize(data)
}

export const newsSerializer = (data, meta = {}) => {
  return new Serializer('news', {
    id: "id",
    attributes: newsAttributes,
    keyForAttribute: "camelCase",
    typeForAttribute: (attribute, record) => {
      return (record && record.type) ? record.type : attribute
    },
    meta: {
      "total-pages": meta.total,
    },
  }).serialize(data)
}

export const videoSerializer = (data, meta = {}) => {
  return new Serializer('news', {
    id: "id",
    attributes: videoAttributes,
    keyForAttribute: "camelCase",
    typeForAttribute: (attribute, record) => {
      return (record && record.type) ? record.type : attribute
    },
    meta: {
      "total-pages": meta.total,
    },
  }).serialize(data)
}

export const messageSerializer = (value) => {
  return new Serializer('message', {
    id: "id",
    attributes: ["value"],
    keyForAttribute: "camelCase",
    typeForAttribute: (attribute, record) => {
      return (record && record.type) ? record.type : attribute
    },
  }).serialize({ value })
}

export const tokenSerializer = (value, role) => {
  return new Serializer('token', {
    id: "id",
    attributes: ["value", "role"],
    keyForAttribute: "camelCase",
    typeForAttribute: (attribute, record) => {
      return (record && record.type) ? record.type : attribute
    },
  }).serialize({ value, role })
}

export const checkTokenSerializer = (value) => {
  return new Serializer('role', {
    id: "id",
    attributes: ["value"],
    keyForAttribute: "camelCase",
    typeForAttribute: (attribute, record) => {
      return (record && record.type) ? record.type : attribute
    },
  }).serialize({ value })
}
