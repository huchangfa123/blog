const PaperModel = require('../models/paper')
const checkToken = require('../middleware/hashToken')
// save paper in db
exports.create = async(ctx, next) => {
  const Permission = checkToken.checkToken
  if (Permission) {
    const { title, content } = ctx.request.body
    const isDraft = ctx.request.body.draft
    const paperEntity = new PaperModel({
      title,
      content,
      isDraft
    })
    await paperEntity.save()
    console.log(paperEntity.content)
    ctx.status = 200
  } else {
    ctx.render('login')
  }
}

// get paper list
exports.getlist = async(ctx, next) => {
  const Permission = checkToken.checkToken
  if (Permission) {
    let paperlist = await PaperModel.find({ isDraft: false })
    ctx.body = {
      success: true,
      data: paperlist
    }
  } else {
    ctx.render('login')
  }
}

