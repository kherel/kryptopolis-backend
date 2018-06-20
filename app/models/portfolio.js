import mongoose from 'mongoose'
import crudModel from '../../app/services/crud_model'
import settings from '../../settings/settings'

const schema = new mongoose.Schema({

  publish: {
    type: Boolean,
  },

  forecast: {
    balanced: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tickers'
    }],
    growth: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tickers'
    }],
    aggressive: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tickers'
    }]
  }

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },

}, {
  timestamps: true,
  autoIndex: settings.isEnvDev,
})

export default mongoose.model('portfolios', crudModel(schema))
