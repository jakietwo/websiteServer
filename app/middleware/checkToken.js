'use strict' ;



module.exports = (options , app) => {
    return async function checkToken(ctx , next) {
        let authToken = ctx.header.authorization // 获取header 里面的token
        if(authToken){
            authToken = authToken.substring(7)
            const res = verifyToken( app,authToken)
            if(res.username){
                const redis_token = await app.redis.get(res.username)
               console.log('redis_token', redis_token)
                if(authToken === redis_token){
                    ctx.locals.username = res.username
                    await next()
                } else {
                    ctx.status = 400
                    ctx.body = {code: 50012, suceess: false, message: "你的账号已在其他地方登录"}
                }
            }else {
                ctx.status = 400
                ctx.body = {code: 50010, suceess: false, message: '登录状态已过期'}
            }
        }else {
            ctx.status = 400
            ctx.body = { code: 50008, suceess: false, message: '请登录后再进行操作'}
        }
    }
}

// 验证token的方法
function verifyToken(app,token){
    let res = ''
    try {
        let result = app.jwt.verify(token, 'jakietwo', {algorithm: 'HS256'})
        let {exp} = result 
        let currentTime = Math.floor(Date.now()/1000)
        if (currentTime <= exp){
            res = result || {}
        }
    } catch (e){
        console.log('验证失败')
    }
    return res ;
}