'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: STRING(45),
    password: STRING(255),
    auth: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Post, { as: 'posts' });
  };

  return User;
};