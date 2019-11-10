const Service = require('egg').Service
const moment = require('moment')

class ArticleService extends Service {
  async create ({ type: type_id, title, content, introduce, }) {
    const { app, ctx } = this
    const now = moment().format('YYYY-MM-DD HH:mm:ss')

    await app.mysql.insert('article', {
      type_id, title, content, introduce,
      create_time: now,
      update_time: now,
      view_count: 0,
    })

    const id = await ctx.service.common.getLastInsertId()

    return id
  }

  async update ({ id, type: type_id, title, content, introduce, }) {
    const now = moment().format('YYYY-MM-DD HH:mm:ss')

    await this.app.mysql.update({
      id, type_id, title, content, introduce,
      update_time: now,
    })
  }

  async list () {
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
    return results;
  }

  async find (id) {
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
    return result
  }
}

module.exports = ArticleService
