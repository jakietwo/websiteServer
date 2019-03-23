'use strict'

module.exports = app => {
  const {STRING ,INTEGER, DATE}  = app.Sequelize ;
  const Users = app.model.define('user', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(45),
    password: STRING(255),
    auth: INTEGER,
    createTime: DATE,
    updateTime: DATE
  })
  return Users
}