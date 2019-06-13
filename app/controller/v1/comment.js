'use strict';
const Controller = require('egg').Controller;
// 动态路由ID白名单
const IdWhiteList = {
  articleId: 1,
  userTd: 1
};
class commentController extends Controller {
  async index() {
    const ctx = this.ctx;
    const comment = await ctx.service.comment.index();
    ctx.response.body = comment;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    // 验证是否具有权限
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      return;
    }
    // END
    // id 是articleId
    const { id } = ctx.params;
    const comment = await ctx.service.comment.show(id);
    ctx.response.body = comment;
    ctx.status = 200;
  }

  async create() {
    const ctx = this.ctx;
    // 验证是否具有权限
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      ctx.status = 200;
      return;
    }
    // END
    const { articleId, content, userId } = ctx.request.body;
    if (!articleId || !content || !userId) {
      ctx.response.body = {
        success: false,
        msg: '参数不合法!'
      };
      ctx.status = 400;
      return;
    }
    const comment = await ctx.service.comment.create({ articleId, content, userId });
    ctx.response.body = comment;
    ctx.status = 201;
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
    // END
    const { id } = ctx.params;
    const data = ctx.request.body;
    const comment = await ctx.service.comment.update(id, data);
    if (Array.isArray(comment) && comment[0]) {
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
    // END
    const { id } = ctx.params;
    const comment = await ctx.service.comment.destroy(id);
    // 返回成功为1
    if (comment) {
      ctx.response.body = {
        success: true,
        msg: '删除成功!'
      };
      ctx.status = 200;
    } else {
      ctx.response.body = {
        success: false,
        msg: '删除失败!'
      };
      ctx.status = 400;
    }
  }

  // 动态获取信息ByArticleId
  async getById() {
    const ctx = this.ctx;
    const { articleId } = ctx.request.body;
    if (!articleId) {
      ctx.response.body = {
        success: false,
        msg: '参数不合法!'
      };
      ctx.status = 400;
      return;
    }
    const comment = await ctx.service.comment.getCommentByID(articleId);
    ctx.response.body = comment;
    ctx.status = 200;
  }
  // 动态获取信息byuserId
  async getByUserId() {
    const ctx = this.ctx;
    const { userId } = ctx.request.body;
    if (!userId) {
      ctx.response.body = {
        success: false,
        msg: '参数不合法!'
      };
      ctx.status = 400;
      return;
    }
    const comment = await ctx.service.comment.getCommentByUserId(userId);
    ctx.response.body = comment;
    ctx.status = 200;
  }
}

module.exports = commentController;
