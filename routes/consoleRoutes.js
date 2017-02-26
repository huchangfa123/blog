const Router = require('koa-router')
const submitController = require('../controller/submitPaperController')

const router = new Router()

router.get('/', async function (ctx, next) {
  const title = '123'
  const content = 'huchangfa'
  await ctx.render('index', { title, content })
})

router.post('write', submitController.create)

router.get('getPaper', submitController.getlist)

module.exports = router
