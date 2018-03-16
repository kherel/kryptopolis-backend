import md5 from "md5"
import request from 'superagent'
import { find, propEq, prop } from 'ramda'
import snake from 'to-snake-case'
import settings from '../../../settings/settings'

let { apiKey, listSubscribe, listInstance } = settings.mailchimp
const token = 'Basic ' + Buffer.from('any:' + apiKey).toString('base64')
const mailchimpUrl = `https://${listInstance}.api.mailchimp.com/3.0`
const listsUrl = `${mailchimpUrl}/lists`

export const fetchLists = async () => {
  let url = `${mailchimpUrl}/lists?count=1000`

  let res = await request
    .get(url)
    .set('Authorization', token)

  if (!res.body.lists) throw new Error(res.body)

  return res.body.lists
}

export const getListId = async (lists, name) => {
  const list = find(
    propEq('name', snake(name))
  )(lists)

  let id = prop("id", list)

  if (!id) { id = await createList(name) }

  return id
}

export const createList = async (name) => {
  let url = `${mailchimpUrl}/lists`

  const contact = {
    company: "company",
    address1: "test",
    city: "MCK",
    state: "state",
    zip: "6300",
    country: "RUSSIA",
  }

  const permission_reminder = "permission_reminder"
  const email_type_option = true

  const campaign_defaults = {
    from_name: "from_name",
    from_email: "test@yandex.ru",
    subject: "hi",
    language: "en",
  }

  const params = {
    name: snake(name),
    contact,
    permission_reminder,
    email_type_option,
    campaign_defaults,
  }

  let res = await request
    .post(url)
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', token)
    .send(params)

  console.log("create new list", res.body.id, snake(name))

  return res.body.id
}

export const fetchListMembersEmail = async (listId) => {
  let url = `${mailchimpUrl}/lists/${listId}/members?count=1000`

  let res = await request
    .get(url)
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', token)

  if (!res.body.members) throw new Error(res.body)

  let emails = res.body.members.map((list) => { return list.email_address })

  return emails
}

export const subscribe = async (email, listId) => {
  const url = `${listsUrl}/${listId}/members/`

  const params = {
    email_address: email,
    status: 'subscribed',
  }

  await request
    .post(url)
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', token)
    .send(params)

  console.log(`add ${email} in ${listId}`)
}

export const subscribeNewsLetter = async (email) => {
  try {
    await subscribe(email, listSubscribe)
  } catch (err) {
    throw new Error(err.response.body.detail)
  }
}

export const unsubscribe = async (email, listId) => {
  const url = `${listsUrl}/${listId}/members/${md5(email)}`

  await request
    .delete(url)
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', token)

  console.log(`remove ${email} in ${listId}`)
}
