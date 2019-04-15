'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs')
const uuidv1 = require('uuid/v1')

class Comment extends Service {
    async index() {
        const ctx = this.ctx
        return await ctx.model.Comment.findAll()
    }
    async show(id) {
        const ctx = this.ctx
        return await ctx.model.Comment.findAll({
            where: {
                articleId: id
            }
        })
    }
    async update(id, data) {
        const ctx = this.ctx
        const updateTime = dayjs().toISOString()
        return await ctx.model.Comment.update({data,updateTime}, {
            where: {
                id
            }
        })
    }
    async destroy(id) {
        const ctx = this.ctx
        return await ctx.model.Comment.destroy({
            where: {
                id
            }
        })
    }
    async create(obj) {
        const ctx = this.ctx
        const { content, articleId, userId } = obj
        const id = uuidv1()
        const createTime = dayjs().toISOString()
        const Comment = await ctx.model.Comment.create({ id, articleId, content, userId, createTime })
        if (Comment.id) {
            return Comment.id
        } else {
            return { success: false, msg: '创建不成功!' }
        }

    }
    // 动态获取key
    async getCommentByID( articleId) {
        const ctx = this.ctx
        const comment = await ctx.model.Comment.findAll({
            where: {
                  articleId
            }
        })
        return comment
    }
    async getCommentByUserId(userId){
        const ctx = this.ctx
        const comment = await ctx.model.Comment.findAll({
            where: {
                userId
            }
        })
        return comment
    }
}
module.exports = Comment