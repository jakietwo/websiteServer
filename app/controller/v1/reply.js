'use strict';
const Controller = require('egg').Controller;
class replyController extends Controller {
    async index() {
        const ctx = this.ctx
        const replys = await ctx.service.reply.index()
        ctx.response.body = replys
        ctx.status = 200
    }

    async show() {
        const ctx = this.ctx
        const { id } = ctx.params
        const reply = await ctx.service.reply.show(id)
        ctx.response.body = reply
        ctx.state = 200
    }

    async create() {
        const ctx = this.ctx
        const { content, commentId, articleId, userId } = ctx.request.body
        if (!content || !commentId || !articleId || !userId) {
            ctx.response.body = {
                success: false,
                msg: '参数不合法!'
            }
            ctx.status = 400
            return
        }
        let options = {
            content, commentId, articleId, userId
        }
        const reply = await ctx.service.reply.create(options)
        ctx.response.body = reply
        ctx.status = 201
    }

    async update() {
        const ctx = this.ctx
        const { id } = ctx.params
        const { content } = ctx.request.body
        if (!content) {
            ctx.response.body = {
                success: false,
                msg: '参数不合法!'
            }
            ctx.status = 400
            return
        }
        const reply = await ctx.service.reply.update(id, content)
        if (Array.isArray(reply) && reply[0]) {
            ctx.response.body = {
                success: true,
                msg: '更新成功!'
            }
            ctx.status = 200
            return
        } else {
            ctx.response.body = {
                success: false,
                msg: '更新失败!'
            }
            ctx.status = 400
            return
        }
    }

    async destroy() {
        const ctx = this.ctx
        const {id} = ctx.params
        console.log('id', id)
        const replys = await ctx.service.reply.destroy(id)
        if (replys) {
            ctx.response.body = {
                success: true,
                msg: '删除成功!'
            }
            ctx.status = 200
        } else {
            ctx.response.body = {
                success: false,
                msg: '删除失败!'
            }
            ctx.status = 400
        }
    }

    // 其他方法比如查找通过userId查找 或者是其他查找方法

}

module.exports = replyController