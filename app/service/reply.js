'use strict';

const Service = require('egg').Service;
const dayjs  = require('dayjs')
const uuidv1 = require('uuid/v1')
class Reply extends Service{
    async index() {
        const ctx = this.ctx 
        return await ctx.model.Reply.findAll()
    }
    async show(id) {
        const ctx = this.ctx
        return await ctx.model.Reply.findByPk(id)
    }
    async update(id, content) {
        const ctx = this.ctx
        const updateTime = dayjs().toISOString()
        const reply = await ctx.model.Reply.update({content, updateTime}, {
            where: {
                id
            }
        })
        return reply
    }
    async destroy(id) {
        const ctx = this.ctx 
        return await ctx.model.Reply.destroy({
            where: {
                id
            }
        })
    }
    async create(obj){
        const ctx = this.ctx
        const {commentId, articleId, userId, content} = obj
        const comment = await ctx.model.Comment.findByPk(commentId)
        const user = await ctx.model.User.findByPk(userId)
        const article = await ctx.model.Article.findByPk(articleId)
        if(!comment) {
            return {
                success: false,
                msg: 'commentId不存在!'
            }
        }
        if (!user){
            return {
                success: false,
                msg: 'userId不存在!'
            }
        }
        if(!article) {
            return {
                success: false,
                msg: 'articleId不存在!'
            }
        }
        const id = uuidv1()
        const createTime = dayjs().toISOString()
        const reply = await ctx.model.Reply.create({
            content, id, userId, articleId, commentId,createTime
        })
        return reply.id
    }
}

module.exports = Reply