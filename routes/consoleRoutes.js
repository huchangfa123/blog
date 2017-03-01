const Router = require('koa-router')
const submitController = require('../controller/submitPaperController')
// const Token = require('../middleware/hashToken')
const router = new Router()

router.post('write', submitController.create)

router.get('getPaperlist', submitController.getlist)

router.post('getPaper', submitController.getPaper)

router.get('first', async (ctx, next) => {
  await ctx.render('consoleFirst')
})

router.get('write', async (ctx, next) => {
  await ctx.render('write')
})

router.get('set', async (ctx, next) => {
  await ctx.render('set')
})

router.get('reading', async(ctx, next) => {
  await ctx.render('reading')
})

module.exports = router
