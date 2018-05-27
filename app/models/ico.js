import mongoose from 'mongoose'
import moment from 'moment'
import snake from 'to-snake-case'
import crudModel from '../../app/services/crud_model'
import settings from '../../settings/settings'

const schema = new mongoose.Schema({

  source: String,
  logo: String,
  title: String,
  titleUrl: String,
  video: String,
  description: String,

  overview: {
    tokenSaleOpeningDate: {
      type: Date,
      default: null,
    },
    tokenSaleClosingDate: {
      type: Date,
      default: null,
    },
    status: String,
    concept: String,
    symbol: String,
  },

  articles: [{
    title: String,
    url: String,
  }],

  team: {
    members: [{
      name: String,
      position: String,
      socialLinks: [String]
    }],
    countryOfOrigin: String,
  },

  technology: {
    blockchain: String,
  },

  legal: Object,

  links: [{
    title: String,
    url: String,
  }],

  local: String,

  // NOTE statictics
  github: {
    url: String,
    commitsData: [String],
    commitsCount: Number,
    contributorsCount: Number,
    watchersCount: Number,
    stargazersCount: Number,
    forksCount: Number,
    openIssues: Number,
  },

  twitter: {
    url: String,
    followers: [{
      data: Date,
      count: Number,
    }]
  },

  facebook: {
    url: String,
    likes: [{
      data: Date,
      count: Number,
    }]
  },

  // NOTE need for visible
  approve: {
    type: Boolean,
    default: false,
  },

  // NOTE need for visible
  visibleUser: {
    type: Boolean,
    default: false,
  },

  // NOTE need for visible
  visibleAdmin: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },

  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],

  followersCount: {
    type: Number,
    default: 0,
  },

  projectName: {
    type: String,
  },
  tokenName: {
    type: String,
  },
  tickerSymbol: {
    type: String,
  },
  blockchain: {
    type: String,
  },
  catchPhrase: {
    type: String,
  },
  differs: {
    type: String,
  },
  country: {
    type: String,
  },
  websiteLink: {
    type: String,
  },
  teamNames: {
    type: Array,
  },
  nameLegalCounsellor: {
    type: String,
  },
  nameLawFirm: {
    type: String,
  },
  tokenSaleStartDate: {
    type: Date,
  },
  tokenSaleStartTime: {
    type: Date,
  },
  tokenSaleEndDate: {
    type: Date,
  },
  tokenSaleEndTime: {
    type: Date,
  },
  totalSupply: {
    type: String,
  },
  icoPrice: {
    type: Number,
  },
  whitepaperLink: {
    type: String,
  },
  companyStructure: {
    type: String,
  },
  blogLink: {
    type: String,
  },
  rssFeed: {
    type: String,
  },
  slackInvitationLink: {
    type: String,
  },
  githubCodeRepository: {
    type: String,
  },
  bitcoinTalkLink: {
    type: String,
  },
  redditLink: {
    type: String,
  },
  facebookProductPage: {
    type: String,
  },
  linkedinCompanyLink: {
    type: String,
  },
  telegramChannel: {
    type: String,
  },
  chatRoomLink: {
    type: String,
  },
  discussionForumLink: {
    type: String,
  },
  youtubeIntroVideoLink: {
    type: String,
  },
  youtubeChannelLink: {
    type: String,
  },
  linksInterviews: {
    type: Array,
  },
  linksArticles: {
    type: Array,
  },
  smartContractAddress: {
    type: String,
  },

}, {
  timestamps: true,
  autoIndex: settings.isEnvDev,
})

schema.pre('save', async function(next) {
  if (!this.isModified('title')) return next()
  this.titleUrl = snake(this.title)
  return next()
})

schema.pre('save', async function(next) {
  if (!this.isModified('followers')) return next()
  this.followersCount = this.followers.length
  return next()
})

schema.virtual('status').get(function () {
  let { tokenSaleOpeningDate, tokenSaleClosingDate, status } = this.overview

  if (!tokenSaleOpeningDate || !tokenSaleClosingDate) { return status || null }

  tokenSaleOpeningDate = moment(tokenSaleOpeningDate)
  tokenSaleClosingDate = moment(tokenSaleClosingDate)

  if (tokenSaleOpeningDate.isBefore(moment()) && tokenSaleClosingDate.isAfter(moment())) {
    return "ICO running"
  }

  if (tokenSaleOpeningDate.isBefore(moment()) && tokenSaleClosingDate.isBefore(moment())) {
    if (status == "Trading") return  "Trading"
    return "ICO over"
  }

  if (tokenSaleOpeningDate.isAfter(moment()) && tokenSaleClosingDate.isAfter(moment())) {
    return "ICO coming"
  }

  return null
})

export default mongoose.model('icoes', crudModel(schema))
