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
  draft: {
    type: String,
  },
  summary: {
    type: String,
  },
  image: {
    type: String,
  },
  publish: {
    type: Boolean,
  },
  publishAt: {
    type: Date,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },

}, {
  timestamps: true,
  autoIndex: settings.isEnvDev,
})

export default mongoose.model('news', crudModel(schema))
