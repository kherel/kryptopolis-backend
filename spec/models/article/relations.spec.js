import "../../support/hook"
import { Article } from "../../../init/mongoose"

describe(__filename, () => {

  describe('get articles', () => {
    it('should return articleWithUser', async () => {
      let article = await factory.create('article')
      let user = await factory.create('user')

      await article.update({ user: user.id })

      const articleWithUser = await Article.findById(article.id).populate("user")

      expect(articleWithUser.user.id).to.eql(user.id)
    })
  })

})
