import { path, isEmpty } from 'ramda'
import { Ico } from "../../../init/mongoose"
import { timeout } from '../helpers'
import {
  fetchLists,
  getListId,
  fetchListMembersEmail,
  subscribe,
  unsubscribe,
} from "../../../app/services/mailchimp/api"

export default async () => {
  const icoes = await Ico.find({ followers: { $exists: true, $ne: [] } }).populate("followers")

  if (isEmpty(icoes)) {
    console.log("icoes not found")
    return null
  }

  let lists = await fetchLists()
  await timeout(1000)

  await Promise.all(
    icoes.map(async (ico) => {
      try {
        const emails = ico.followers.map((follower) => { return follower.email })
        const listId = await getListId(lists, ico.title)

        const listEmails = await fetchListMembersEmail(listId)
        await timeout(1000)

        await subscribeEmails(emails, listEmails, listId)
        await unsubscribeEmails(emails, listEmails, listId)
      } catch (err) {
        let error = path(["response", "body"], err) || err.message
        console.log(error)
      }
    })
  )
}

const subscribeEmails = async (emails, listEmails, listId) => {
  await Promise.all(
    emails.map(async (email) => {
      if (listEmails.includes(email)) return null
      if (email.includes("fake")) return null

      await subscribe(email, listId)
      await timeout(1000)
    })
  )
}

const unsubscribeEmails = async (emails, listEmails, listId) => {
  await Promise.all(
    listEmails.map(async(email) => {
      if (emails.includes(email)) return null

      await unsubscribe(email, listId)
      await timeout(1000)
    })
  )
}
