import request from 'superagent'
import { JSDOM } from 'jsdom'
import URL from 'url-parse'
import { Ico } from '../../../init/mongoose'
import { upload } from '../cloudinary'
import factory from '../../../spec/factory'

const trim = (obj) => {
  for (let k in obj)
    if (typeof obj[k] === 'string')
    obj[k] = obj[k].trim()
    else if (typeof obj[k] === 'object')
      trim(obj[k])
  return obj
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getElement = (element, selector) => element.querySelector(selector)
const getElements = (element, selector) => element.querySelectorAll(selector)

const getTextContent = (element, selector) => {
  let textContent
  try {
    if (selector)
      textContent = getElement(element, selector).textContent.trim()
    else
      textContent = element.textContent
  } catch (error) {
    console.log(error)
  }
  return textContent
}

const getAttribute = (element, selector, name) => {
  let attribute
  try {
    if (selector)
      attribute = getElement(element, selector).getAttribute(name)
    else 
      attribute = element.getAttribute(name)
  } catch (error) {
    console.log(error)
  }
  return attribute
}

export default async () => {

  let icoCalendar = await request
    .get('https://cointelegraph.com/ico-calendar')

  const dom = new JSDOM(icoCalendar.text)

  const items = dom.window.document.querySelectorAll('#ico-ongoing .table-companies__item.j-item')

  for (let i = 0; i < items.length; ++i) {
    const title = getTextContent(items[i], '.table-companies__item-ttl')

    const ico = await Ico.findOne({ title })

    if (ico)
      continue

    console.log(title)

    let detailsUrl = getAttribute(items[i], '.j-link', 'href')
    detailsUrl = (detailsUrl && detailsUrl.indexOf('http') !== 0)
      ? 'https://cointelegraph.com' + detailsUrl : detailsUrl

    let details = await request.get(detailsUrl)

    const dc = new JSDOM(details.text).window.document

    let tmp = {}
    
    tmp.source = detailsUrl
    tmp.logo = getAttribute(dc, '.ico-card-about__img', 'src')
    tmp.title = getTextContent(dc, '.ico-card-about__name')
    tmp.video = getAttribute(dc, '.ico-card__video>iframe', 'src')

    tmp.description = getTextContent(dc, '#ico-description')

    tmp.overview = {}
    tmp.overview.concept = getTextContent(items[i], '.table-companies__item-desc')

    const dates = getElements(dc, '.ico-card-about__date-item-val')
    tmp.overview.tokenSaleOpeningDate = getTextContent(dates[0])
    tmp.overview.tokenSaleClosingDate = (getTextContent(dates[1]).trim() == 'TBD' ? '' : getTextContent(dates[1]))

    try {
      tmp.overview.symbol = getElement(dc, '.ico-card-tabs__content-item-ttl')
        .nextElementSibling.textContent.replace(/.*\s/g, '')
    } catch (error) {
      console.log(error)
    }

    tmp.articles = []
    tmp.team = {}
    tmp.team.members = []

    const members = getElements(dc, '.ico-card-team__item:first-child .ico-card-team__item-user')

    for (let i = 0; i < members.length; ++i) {
      let member = {}
      member.name = getTextContent(members[i], '.ico-team-user__name')
      member.position = getTextContent(members[i], '.ico-team-user__job')
      member.socialLinks = []
      const links = getElements(members[i], '.social-box__link')
      for (let j = 0; j < links.length; ++j) {
        const link = getAttribute(links[j], null, 'href')
        member.socialLinks.push(link)
      }
      tmp.team.members.push(member)
    }

    tmp.technology = {}
    tmp.legal = {}
    tmp.links = []

    const links = getElements(dc, '.ico-card-about__link')
    for (let j = 0; j < links.length; ++j) {
      let link = {}
      link.title = getTextContent(links[j])
      link.url = getAttribute(links[j], null, 'href')
      tmp.links.push(link)
    }

    const socialLinks = getElements(dc, '.ico-card__about .social-box__link')
    for (let j = 0; j < socialLinks.length; ++j) {
      let link = {}
      link.url = getAttribute(socialLinks[j], null, 'href')
      const url = new URL(link.url)
      var split = url.hostname.split('.')
      if (split.length === 2)
        link.title = split[0]
      else if (split.length === 3)
        link.title = split[1]
      else
        continue
      link.title = capitalizeFirstLetter(link.title == 't' ? 'telegram' : link.title)
      tmp.links.push(link)
    }

    tmp.visibleAdmin = true

    tmp.logo = await upload(tmp.logo, tmp.title)

    tmp = trim(tmp)

    await Ico.createObject(tmp)
  }
}
