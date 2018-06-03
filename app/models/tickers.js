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
  coinName: {
    type: String,
  },
  fullName: {
    type: String,
  },
  isTrading: {
    type: Boolean,
  }

}, {
  timestamps: true,
  autoIndex: settings.isEnvDev,
})

export default mongoose.model('tickers', crudModel(schema))
