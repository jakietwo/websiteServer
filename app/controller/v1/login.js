const Controller = require('egg').Controller;

class loginController extends Controller {
    async login() {
        const ctx = this.ctx
        const { username, password } = ctx.request.body
        if (!username || !password) {
            ctx.response.body = { success: false, message: '参数不合法' }
            ctx.status = 400
            return
        }
        const user = await ctx.service.login.login({ username, password })
        ctx.response.body = user
       
    }
}
module.exports = loginController