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
        created_at: DATE,
        updated_at: DATE
    })
    return User;
}