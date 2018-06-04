import mongoose from 'mongoose'
import crudModel from '../../app/services/crud_model'
import settings from '../../settings/settings'

const schema = new mongoose.Schema({

  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  priceUSD: {
    type: Number,
  },
  volume24h: {
    type: Number,
  },
  marketCap: {
    type: Number,
  },
  percentChange1h: {
    type: Number,
  },
  percentChange24h: {
    type: Number,
  },
  percentChange7d: {
    type: Number,
  },
  lastUpdated: {
    type: Number,
  }

}, {
  timestamps: true,
  autoIndex: settings.isEnvDev,
})

export default mongoose.model('tickers', crudModel(schema))
