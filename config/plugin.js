'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
  client: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'wjg19940802.',
    database: 'mywebsite'
  },
  app: true,
  agent: false
};
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
exports.validate = {
  enable: true,
  package: 'egg-validate'
}
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
}
exports.redis = {
  enable: true,
  package: 'egg-redis'
}
// exports.security = {
//   enable: false
// }