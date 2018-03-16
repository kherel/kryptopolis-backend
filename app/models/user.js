import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import uniqueValidator from 'mongoose-unique-validator'
import settings from '../../settings/settings'
import crudModel from '../../app/services/crud_model'

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const buildCode = () => {
  return crypto.randomBytes(20).toString('hex')
}

const schema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },

  password: {
    type: String,
    required: 'Password is required',
  },

  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "superAdmin"],
  },

  editor: {
    type: Boolean,
    default: false,
  },

  cofirmEmail: {
    type: Boolean,
    default: false,
  },

  cofirmCode: {
    type: String,
    required: true,
    auto: true,
    unique: true,
    default: buildCode,
  },

  resetPasswordToken: {
    type: String,
    required: true,
    auto: true,
    unique: true,
    default: buildCode,
  },

  google: Object,
  facebook: Object,
  twitter: Object,

  provider: {
    type: String,
    default: null,
    enum: [null, "google", "facebook", "twitter"]
  },

  icoes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'icoes'
  }],

  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'icoes'
  }],

  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'articles'
  }],

}, {
  timestamps: true,
  autoIndex: settings.isEnvDev,
})

schema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  return next()
})

schema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

schema.methods.generateResetPasswordToken = async function() {
  const resetPasswordToken = mongoose.Types.ObjectId()
  await this.update({ resetPasswordToken: resetPasswordToken })
  return resetPasswordToken
}

schema.methods.addIco = async function(ico) {
  if (!ico) throw new Error("ico not found")

  await this.icoes.addToSet(ico)
  await this.save()

  await ico.set({ user: this.id })
  await ico.save()

  return this
}

schema.methods.addFollowers = async function(ico) {
  if (!ico) throw new Error("ico not found")

  this.followers.addToSet(ico.id)
  await this.save()

  ico.followers.addToSet(this.id)
  await ico.save()

  return this
}

schema.methods.removeFollowers = async function(ico) {
  if (!ico) throw new Error("ico not found")

  this.followers.remove(ico.id)
  await this.save()

  ico.followers.remove(this.id)
  await ico.save()

  return this
}

schema.plugin(uniqueValidator)

export default mongoose.model('users', crudModel(schema))
