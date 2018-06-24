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
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },

}, {
  timestamps: true,
  autoIndex: settings.isEnvDev,
})

schema.methods.addForecast = async function(where, ticker) {
  if (!['balanced', 'growth', 'aggressive'].includes(where))
    throw new Error("where is not correct")

  if (!ticker) 
    throw new Error("ticker not found")

  this.forecast[where].addToSet(ticker.id)
  await this.save()

  return this
}

schema.methods.removeForecast = async function(where, ticker) {
  if (!['balanced', 'growth', 'aggressive'].includes(where))
    throw new Error("where is not correct")

  if (!ticker) 
    throw new Error("ticker not found")

  this.forecast[where].remove(ico.id)
  await this.save()

  return this
}

export default mongoose.model('portfolios', crudModel(schema))
