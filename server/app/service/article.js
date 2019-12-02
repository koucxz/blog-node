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
                      a.update_time as update_time,
                      a.view_count as view_count,
                      t.typeName as type
                FROM article a
                LEFT JOIN type t ON a.type_id = t.id`;
    const results = await this.app.mysql.query(sql)
    results.forEach(el => {
      el.create_time = moment(el.create_time).format('YYYY-MM-DD HH:mm')
      el.update_time = moment(el.update_time).format('YYYY-MM-DD HH:mm')
    })
    return results;
  }

  async find (id) {
    const sql = `SELECT a.id as id,
                      a.title as title,
                      a.introduce as introduce,
                      a.content as content,
                      a.create_time as create_time,
                      a.update_time as update_time,
                      a.view_count as view_count,
                      t.typeName as type
                  FROM article a
                  LEFT JOIN type t ON a.type_id = t.id
                  WHERE a.id=${id}`
    const result = await this.app.mysql.query(sql)
    result.create_time = moment(result.create_time).format('YYYY-MM-DD HH:mm')
    result.update_time = moment(result.update_time).format('YYYY-MM-DD HH:mm')
    return result
  }
}

module.exports = ArticleService
