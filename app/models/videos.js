import mongoose from 'mongoose'
import crudModel from '../../app/services/crud_model'
import settings from '../../settings/settings'

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  video: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },

}, {
  timestamps: true,
  autoIndex: settings.isEnvDev,
})

export default mongoose.model('videos', crudModel(schema))
