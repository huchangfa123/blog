const PaperModel = require('../../models/paper')

exports.create = async(ctx, next) => {
  const { title, content } = ctx.request.body
  const paperEntity = new PaperModel({
    title,
    content
  })

  await paperEntity.save()

  console.log(paperEntity.content)
  ctx.status = 200
}

