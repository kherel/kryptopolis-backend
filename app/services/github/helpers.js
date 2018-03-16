export const regExpGithub = new RegExp(/(^https:\/\/github\.com\/)([\w-]+[\/][\w-]+)/)

export const parseUrl =  (url) => {
  let match = url.match(regExpGithub)

  if (match && match[2]) {
    return match[2]
  } else {
    return null
  }
}
