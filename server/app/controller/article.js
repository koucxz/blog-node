'use strict';

const Controller = require('egg').Controller
const moment = require('moment')

class HomeController extends Controller {
  async createArticle () {
    const { ctx } = this
    const {
      type, title, content, introduce,
    } = ctx.request.body

    const id = await ctx.service.article.create({ type, title, content, introduce, })

    this.ctx.body = {
      data: { id },
    }
  }

  async updateArticle () {
    const {
      id, type, title, content, introduce,
    } = this.ctx.request.body

    await ctx.service.article.update({ id, type, title, content, introduce, })

    this.ctx.body = { data: null }
  }

  async getArticleList () {
    const results = await this.ctx.service.article.list()

    this.ctx.body = { data: results }
  }

  async getArticleById () {
    const id = this.ctx.params.id
    
    const result = await  this.ctx.service.article.find(id)

    this.ctx.body = { data: result }
  }
}

module.exports = HomeController
