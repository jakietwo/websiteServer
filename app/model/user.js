'use strict' ;

module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize ; 
    const User = app.model.define('users', {
        id: {
            type: STRING,
            primaryKey: true,     
        },
        username: STRING(45), 
        password: STRING(255),
        auth: INTEGER,
        createTime: DATE,
        updateTime: DATE
    },{
        timestamps: false, // 取消sequelize 自动添加created_at 实属恶心
    })
    return User;
}