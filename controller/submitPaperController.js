const PaperModel = require('../models/paper')
const mongoose = require('mongoose')
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
  ctx.body = {
    success: true,
    data: {
      title,
      content
    }
  }
}
// get paper list
exports.getlist = async(ctx, next) => {
  const paperlist = await PaperModel.find({ isDraft: false })
  ctx.body = {
    success: true,
    data: paperlist
  }
}
// get appointed paper
exports.getPaper = async(ctx, next) => {
  var id = ctx.request.body._id
  var paperId = mongoose.Types.ObjectId(id)
  // paperdata是一个数组，要获取具体内容就要从paperdata[0]获取
  const paperdata = await PaperModel.find({ _id: paperId })
  if (paperdata) {
    ctx.body = {
      success: true,
      data: {
        title: paperdata[0].title,
        content: paperdata[0].content
      }
    }
    return ctx.body
  }
}

