'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // app.resources('users', '/users', app.controller.users);
  app.router.resources('users', '/api/v1/users', app.controller.v1.users)
};
