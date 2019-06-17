'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');
const uuidv1 = require('uuid/v1');
class User extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('users', { id: 1 });
    return { user };
  }
  async list() {
    const ctx = this.ctx;
    return await ctx.model.User.findAll({
      attributes: ['id', 'username', 'auth', 'createTime', 'updateTime']
    });
  }
  async show(id) {
    const ctx = this.ctx;
    return await ctx.model.User.findByPk(id, {
      attributes: ['id', 'username', 'auth', 'createTime', 'updateTime']
    });
  }
  async destroy(id) {
    const ctx = this.ctx;
    return await ctx.model.User.destroy({
      where: {
        id: id
      }
    });
  }
  async update(id, data) {
    const ctx = this.ctx;
    const updateTime = dayjs().toISOString();
    const user = await ctx.model.User.findByPk(id);
    const data1 = Object.assign(data, { updateTime });
    if (!user) {
      ctx.status = 200;
      ctx.response.body = {
        success: false,
        msg: '更新失败,没有找到userId'
      };
      return;
    }
    const res = await user.update(data1);
    ctx.status = 200;
    return {
      success: true,
      msg: '更新成功！'
    };
  }
  // 创建用户
  async create(obj) {
    const ctx = this.ctx;
    // 创建的时候先查询数据库是否已经存在对应的username
    const user = await ctx.model.User.findOne({
      where: {
        username: obj.username
      }
    });
    if (user) {
      return {
        success: false,
        message: '用户名已被注册!'
      };
    }

    const id = uuidv1();
    const createTime = dayjs().toISOString();
    const { username, password, isAdmin } = obj;
    let auth = isAdmin;
    let result = await ctx.model.User.create({ id, username, password, auth, createTime });
    return {
      success: true,
      userId: result.id
    };
  }
}
module.exports = User;
