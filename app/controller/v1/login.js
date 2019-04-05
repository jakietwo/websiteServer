const Controller = require('egg').Controller;

class loginController extends Controller {
    async login() {
        const {ctx,app} = this
        const { username, password } = ctx.request.body
        if (!username || !password) {
            ctx.response.body = { success: false, message: '参数不合法' }
            ctx.status = 400
            return
        }
        const user = await ctx.service.login.login({ username, password })
        // 找到用户 生成token
        if(user.id) {
            const token = this.app.jwt.sign({
                username: user.username,
                id: user.id,
                exp: new Date().getTime()/1000 +  60 * 60 * 24
            },app.config.secret, {
                    algorithm: 'HS256'
                }
            )
            // 将token 保存redis
            await app.redis.set(user.username, token)
            ctx.response.body = token
        } else {
            ctx.response.body = {
                success: false,
                message: '用户名或者密码错误!'
            }
        }
    }
}
module.exports = loginController