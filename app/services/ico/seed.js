import fs from 'fs'
import mongoose from '../../../init/mongoose'
import factory from '../../../spec/factory'
import {
  replaceTeam,
  replaceOverview,
  replaceTechnology,
  addGithub,
  addFacebook,
  addTwitter,
} from './helpers'

mongoose.set('debug', false)

const run = async (path) => {
  let count = 0

  const objects = JSON.parse(await fs.readFileSync(path, 'utf8'))

  await Promise.all(
    objects.map(async (object) => {
      object = await replaceTeam(object)
      object = await replaceOverview(object)
      object = await replaceTechnology(object)

      object = await addGithub(object)
      object = await addFacebook(object)
      object = await addTwitter(object)

      await factory.create('icoVisible', object)

      count += 1
    })
  )

  return count
}


export default run
