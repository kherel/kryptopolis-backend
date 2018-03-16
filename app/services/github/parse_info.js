import request from 'superagent'
import { mergeAll, range } from 'ramda'
import settings from '../../../settings/settings'
import { timeout } from '../helpers'

const token = settings.githubToken
const COMMIT_PER_PAGE = 100
const COMMIT_LIMIT = 2

export default async (path) => {
  try {
    const commits = await getCommit(await fetchCommitInfo(path))
    await timeout(1000)

    const info = await getInfo(await fetchRepoInfo(path))
    await timeout(1000)

    const contributors = await getContributors(await fetchContributors(path))
    await timeout(1000)

    const commitCount = await getCountCommit(await fetchCountCommit(path))

    const result = mergeAll([
      commits,
      info,
      contributors,
      commitCount,
    ])

    return result
  } catch (err) {
    if (err.response) {
      console.log("ERROR", path, err.response.body.message)
    } else {
      console.log(err)
    }
  }
}

const fetchCountCommit = async (path) => {
  const url = `https://api.github.com/repos/${path}/stats/participation`

  const res = await request
    .get(url)
    .set('Accept', "application/vnd.github.v3+json")
    .set('Authorization', `token ${token}`)

  return res
}

const fetchContributors = async (path) => {
  const url = `https://api.github.com/repos/${path}/contributors`

  const res = await request
    .get(url)
    .set('Accept', "application/vnd.github.v3+json")
    .set('Authorization', `token ${token}`)

  return res
}

const fetchRepoInfo = async (path) => {
  let url = `http://api.github.com/repos/${path}`

  const res = await request
    .get(url)
    .set('Accept', "application/vnd.github.v3+json")
    .set('Authorization', `token ${token}`)

  return res
}

const fetchCommitInfo = async (path) => {
  let body = []

  await Promise.all(
    range(1, COMMIT_LIMIT + 1).map(async (page) => {
      let result = await fetchCommitInfoPage(path, page)
      await timeout(1000)
      body = body.concat(result)
    })
  )

  return body
}

const fetchCommitInfoPage = async (path, page) => {
  let url = `http://api.github.com/repos/${path}/commits?page=${page}&per_page=${COMMIT_PER_PAGE}`

  let res = await request
    .get(url)
    .set('Accept', "application/vnd.github.v3+json")
    .set('Authorization', `token ${token}`)

  if (!res.body) return

  return res.body.map((object) => {
    return object
  })
}

const getCommit = async (res) => {
  const data = await res.map((object) => {
    return object.commit.committer.date
  })

  return { commitsData: data }
}

const getContributors = async (res) => {
  return { contributorsCount: res.body.length }
}

const getInfo = async (res) => {
  const body = res.body

  return {
    watchersCount: body.watchers_count,
    stargazersCount: body.stargazers_count,
    forksCount: body.forks_count,
    openIssues: body.open_issues,
  }
}

const getCountCommit = async (res) => {
  let result = 0
  const all = res.body.all

  if (all) {
    result = all.reduce((a, b) => { return a + b }, 0)
  }

  return { commitsCount: result}
}
