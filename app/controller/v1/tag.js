'use strict';
const Controller = require('egg').Controller;

class tagController extends Controller{
    async index () {
        const ctx = this.ctx
        const tags = await ctx.service.tag.index()
        ctx.response.body = tags
        ctx.status = 200
    }
    // id是articleId
    async show() {
        const ctx = this.ctx
        const {id} = ctx.params
        if(!id){
            ctx.response.body = {
                success: false,
                msg: '参数不合法'
            }
            ctx.status = 400
            return
        }
        const tag = await ctx.service.tag.show(id)
        ctx.response.body = tag
        ctx.status = 200
    }
    
    async create() {
        const ctx = this.ctx 
        const {articleId, name} = ctx.request.body
        if(!articleId || !name) {
            ctx.response.body = {
                success: false,
                msg: '参数不合法!'
            }
            ctx.status = 400
            return 
        }
        const tag = await ctx.service.tag.create({name, articleId})
        ctx.body = tag
        ctx.status = 201
    }

    async update() {
        const ctx = this.ctx
        const {id} = ctx.params
        const data = ctx.request.body
        const tag = await ctx.service.tag.update(id, data)
        if(Array.isArray(tag) && tag[0]){
            ctx.response.body = {
                success: true,
                msg: '更新成功!'
            }
            ctx.status = 200
        }else {
            ctx.response.body = {
                success: false,
                msg: '更新失败!'
            }
            ctx.status = 400
        }

    }
    
    async destroy() {
        const ctx = this.ctx
        const {id} = ctx.params
        const tag = await ctx.service.tag.destroy(id)
        if(tag){
            ctx.response.body = {
                success: true,
                msg: '删除成功!'
            }
            ctx.status = 200
        }else {
            ctx.response.body = {
                success: false,
                msg: '删除失败!'
            }
            ctx.status = 400
        }
    }
}
module.exports = tagController