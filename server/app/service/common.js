const Service = require('egg').Service

class CommonService extends Service {
  async getLastInsertId () {
    const sql = 'SELECT LAST_INSERT_ID();'
    const idPacket = await this.app.mysql.query(sql)
    // idPacket: [{ "LAST_INSERT_ID()": id }]
    const id = Object.values(idPacket[0])[0] || null

    return id
  }
}

module.exports = CommonService
