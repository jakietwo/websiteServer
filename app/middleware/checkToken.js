'use strict' ;



module.exports = (options , app) => {
    return async function checkToken(ctx , next) {
        let authToken = ctx.header.authorization // 获取header 里面的token
        console.log('token=================', authToken)
        if(authToken){
            authToken = authToken.substring(7)
            const res = verifyToken(authToken)
            if(res.username && res.id){
                const redis_token = await app.redis.get('loginToken').get(res.id + res.username)
                if(authToken === redis_token){
                    ctx.locals.username = res.username
                    ctx.locals.id = res.id
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
function verifyToken(token){
    let res = ''
    try {
        let result = app.jwt.verify(token, 'jakietwo')
        let {exp} = result 
        let currentTime = Math.floor(Date.now()/1000)
        if (currentTime <= exp){
            res = result.data || {}
        }
    } catch (e){
        console.log('验证失败', e)
    }
    return res ;
}