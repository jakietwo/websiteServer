'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/v1/users/login', controller.v1.login.login)
  router.post('/api/v1/users/sign', controller.v1.users.create)
  // app.resources('users', '/users', app.controller.users);
  app.router.resources('users', '/api/v1/users', app.controller.v1.users)
};
