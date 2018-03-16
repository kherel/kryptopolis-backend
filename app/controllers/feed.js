import RssToJson from 'rss-to-json'
import settings from '../../settings/settings'

export default {

  index: async (req, res, next) => {
    RssToJson.load(settings.rssFeed, (err, rss) => {
      if (err) {
        res.status(500)
        return next(err)
      }

      res.status(200).json(rss)
    })
  }

}
