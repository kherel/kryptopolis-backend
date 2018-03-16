import mongoose from 'mongoose'
import crudModel from '../../app/services/crud_model'
import settings from '../../settings/settings'

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  metaTags: {
    type: Array,
  },
  keywords: {
    type: Array,
  },
  summary: {
    type: String,
  },
  text: {
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

export default mongoose.model('articles', crudModel(schema))
