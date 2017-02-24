const PaperModel = require('../../models/paper')

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

