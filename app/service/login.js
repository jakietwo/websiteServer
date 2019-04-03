const Service = require('egg').Service;

class login extends Service {
    async login(userobj) {
        const ctx = this.ctx
        const { username, password } = userobj
        console.log(userobj)
        let user = await ctx.model.User.findOne({
            where : {
                username: username,
                password: password
            }
        })
        return user
    }
}

module.exports = login