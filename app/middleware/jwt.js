'use strict' ;
const fs = require('fs')
const path = require('path')
const jwt = require('egg-jwt')

module.exports = (options , app) => {
    return async function userInterceptor(ctx , next) {
        let authToken = ctx.header.authorization // 获取header 里面的token
        if(authToken){
            authToken = authToken.substring(7)
            const res = verifyToken(authToken)
            if(res.corpid && res.userid){
                const redis_token = await app.redis.get('loginToken').get(res.corpid + res.userid)
                if(authToken === redis_token){
                    ctx.locals,corpid = res.corpid
                    ctx.locals.userid = res.userid
                    await next()
                } else {
                    ctx.body = {code: 50012, msg: "你的账号已在其他地方登录"}

                }
            }else {
                ctx.body = {code: 50012, msg: '登录状态已过期'}
            }
        }else {
            ctx.body = { code: 50008, msg: '清登录后再进行操作'}
        }
    }
}