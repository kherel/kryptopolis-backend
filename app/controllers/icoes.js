import { toMongoQuery } from "casl"
import { mergeAll, pick } from "ramda"
import { Ico } from "../../init/mongoose"
import { icoSerializer } from "../serializers"
import {
  getOptionsSerializer,
  getAttributes,
  getOptionsFind,
  getFilterIco,
  getFields
} from "../services/params"

const filterAttributes = pick([
  "source",
  "title",
  "logo",
  "video",
  "description",
  "overview",
  "articles",
  "team",
  "technology",
  "legal",
  "github",
  "links",
  "local",

  "approve",
  "visibleUser",
  "visibleAdmin",

  "projectName",
  "tokenName",
  "tickerSymbol",
  "blockchain",
  "catchPhrase",
  "description",
  "differs",
  "country",
  "websiteLink",
  "teamNames",
  "nameLegalCounsellor",
  "nameLawFirm",
  "tokenSaleStartDate",
  "tokenSaleStartTime",
  "tokenSaleEndDate",
  "tokenSaleEndTime",
  "totalSupply",
  "icoPrice",
  "whitepaperLink",
  "companyStructure",
  "blogLink",
  "rssFeed",
  "slackInvitationLink",
  "githubCodeRepository",
  "bitcoinTalkLink",
  "redditLink",
  "twitterProfile",
  "facebookProductPage",
  "linkedinCompanyLink",
  "telegramChannel",
  "chatRoomLink",
  "discussionForumLink",
  "youtubeIntroVideoLink",
  "youtubeChannelLink",
  "linksInterviews",
  "linksArticles",
  "smartContractAddress",
])

export default {

  index: async (req, res, next) => {
    try {
      const query = mergeAll([
        getFilterIco(req),
        toMongoQuery(req.ability.rulesFor('read', 'icoes')),
      ])

      const icoes = await Ico.find(query, getFields(req, "ico"), getOptionsFind(req))
      const total = await Ico.count(query)
      const response = await icoSerializer(icoes, getOptionsSerializer(req, total))

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  create: async (req, res, next) => {
    try {
      const { user } = req
      const body = filterAttributes(getAttributes(req))
      const ico = await Ico.createObject(body)
      await user.addIco(ico)

      const response = await icoSerializer(ico)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  show: async (req, res, next) => {
    const { titleUrl } = req.params

    try {
      const ico = await Ico.findOne({ titleUrl })

      if (!ico) {
        res.status(404)
        return next(new Error("ico not found"))
      }

      try {
        req.ability.throwUnlessCan('read', ico)
      } catch (err) {
        res.status(401)
        return next(err)
      }

      const response = await icoSerializer(ico)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params

    try {
      const ico = await Ico.findById(id)
      const body = filterAttributes(getAttributes(req))

      await ico.set(body)

      try {
        req.ability.throwUnlessCan('update', ico)
      } catch (err) {
        res.status(401)
        return next(err)
      }

      if (ico.isModified("visibleAdmin")) {
        try {
          req.ability.throwUnlessCan('access', "icoVisibleAdmin")
        } catch (err) {
          res.status(401)
          return next(err)
        }
      }

      await ico.save()

      if (req.user.role == "user" && ico.approve == true) {
        ico.set({ approve: false })
        await ico.save()
      }

      const response = await icoSerializer(ico)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params

    try {
      const ico = await Ico.findById(id)

      if (!ico) {
        res.status(422)
        return next(new Error("ico not found"))
      }

      try {
        req.ability.throwUnlessCan('delete', ico)
      } catch (err) {
        res.status(401)
        return next(err)
      }

      await ico.remove()

      const response = await icoSerializer(ico)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

}
