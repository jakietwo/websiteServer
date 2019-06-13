'use strict';
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  accesstoken: 'string'
};

class UserController extends Controller {
  async findById() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    const user = await ctx.model.User.findById(userId);
    ctx.status = 200;
    ctx.body = user;
  }
  async create() {
    const ctx = this.ctx;
    // // 验证是否具有权限
    // let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    // let res = await MyCheckToken(ctx);
    // if (!res.success) {
    //   ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
    //   return;
    // }
    // // 上节代码
    let isAdmin;
    const { username, password, auth } = ctx.request.body;
    isAdmin = auth ? auth : 0;
    if (!username || !password) {
      ctx.response.body = {
        success: false,
        msg: '参数不合法!'
      };
      ctx.status = 400;
      return;
    }
    const user = await ctx.service.user.create({ username, password, isAdmin });
    ctx.status = 201;
    ctx.body = user;
  }
  async index() {
    const ctx = this.ctx;
    // // 验证是否具有权限
    // let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    // let res = await MyCheckToken(ctx);
    // if (!res.success) {
    //   ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
    //   return;
    // }
    // // 上节代码
    const users = await ctx.service.user.list();

    // 将密码也拉下来了
    // 将密码去掉

    ctx.response.body = users;
    ctx.status = 200;
  }
  async show() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const user = await ctx.service.user.show(id);
    ctx.response.body = user;
    ctx.status = 200;
  }
  async update() {
    const ctx = this.ctx;
    // 验证是否具有权限
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      return;
    }
    // 上节代码
    const { id } = ctx.params;
    const data = ctx.request.body;
    const user = await ctx.service.user.update(id, data);
    // 成功返回的数据是[1] 错误返回的数据是[0]
    if (user.length && user[0]) {
      ctx.response.body = {
        success: true,
        msg: '更新成功!'
      };
      ctx.status = 200;
    } else {
      ctx.response.body = {
        success: false,
        msg: '更新失败!'
      };
      ctx.status = 400;
    }
  }
  async destroy() {
    const ctx = this.ctx;
    // 验证是否具有权限
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      return;
    }
    // 上节代码
    const id = ctx.request.url.split('/')[4];
    const user = await ctx.service.user.destroy(id);
    // 返回的user 成功竟然是1 不成功则是0
    if (user) {
      ctx.response.body = {
        success: true,
        msg: '删除成功'
      };
      ctx.status = 201;
    } else {
      ctx.response.body = {
        success: false,
        msg: '删除不成功!'
      };
      ctx.status = 400;
    }
  }
}
module.exports = UserController;
