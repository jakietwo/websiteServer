'use strict';

const Service = require('egg').Service;

class User extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('users', {id: 1})
    return {user}
  }
  async list () {
    console.log(this.ctx.model)
    return this.ctx.model.User.findAll()
  }
}
module.exports = User