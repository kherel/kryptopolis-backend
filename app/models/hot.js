import mongoose from 'mongoose'
import crudModel from '../../app/services/crud_model'
import settings from '../../settings/settings'

const schema = new mongoose.Schema({

  news: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'news'
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'videos'
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'articles'
  },

}, {
  timestamps: true,
  autoIndex: settings.isEnvDev,
})

export default mongoose.model('hot', crudModel(schema))
