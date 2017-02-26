const PaperModel = require('../models/paper')

// save paper in db
exports.create = async(ctx, next) => {
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
}

// get paper list
exports.getlist = async(ctx, next) => {
  let paperlist = await PaperModel.find({ isDraft: false })
  ctx.body = {
    success: true,
    data: paperlist
  }
}

