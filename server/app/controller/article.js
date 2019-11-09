'use strict';

const moment = require('moment')
const Controller = require('egg').Controller

class HomeController extends Controller {
  async createArticle () {
    const {
      type, title, content, introduce,
    } = this.ctx.request.body
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    await this.app.mysql.insert('article', {
      title, content, introduce,
      type_id: type,
      create_time: now,
      update_time: now,
      view_count: 0,
    })
    const sqlToGetId = 'SELECT LAST_INSERT_ID();'
    const idPacket = await this.app.mysql.query(sqlToGetId)
    const id = Object.values(idPacket[0])[0] || null

    this.ctx.body = {
      data: { id },
    }
  }

  async updateArticle () {
    const {
      id, type, title, content, introduce,
    } = this.ctx.request.body
    await this.app.mysql.update({
      id, title, content, introduce,
      type_id: type,
      update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    this.ctx.body = { data: null }
  }

  async getArticleList () {
    const sql = `SELECT a.id as id,
                      a.title as title,
                      a.introduce as introduce,
                      a.content as content,
                      a.create_time as create_time,
                      a.view_count as view_count,
                      t.typeName as type
                FROM article a
                LEFT JOIN type t ON a.type_id = t.id`;
    const results = await this.app.mysql.query(sql)
    this.ctx.body = { data: results }
  }

  async getArticleById () {
    const id = this.ctx.params.id
    const sql = `SELECT a.id as id,
                      a.title as title,
                      a.introduce as introduce,
                      a.content as content,
                      a.create_time as create_time,
                      a.view_count as view_count,
                      t.typeName as type
                  FROM article a
                  LEFT JOIN type t ON a.type_id = t.id
                  WHERE a.id=${id}`
    const result = await this.app.mysql.query(sql)

    this.ctx.body = { data: result }
  }
}

module.exports = HomeController
