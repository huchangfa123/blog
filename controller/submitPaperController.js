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
  const paperlist = await PaperModel.find({ isDraft: false })
  console.log(paperlist)
  ctx.body = {
    success: true,
    data: paperlist
  }
}
// get appointed paper
exports.getPaper = async(ctx, next) => {
  const id = ctx.request.body._id
  const paperdata = await PaperModel.find({_id: id})
  const title = paperdata.title
  const content = paperdata.content
  ctx.body = {
    success: true,
    data: {
      title: title,
      content: content
    }
  }
  await ctx.redirect('reading')
}

