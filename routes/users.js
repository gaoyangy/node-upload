var router = require('koa-router')();

router.get('/user', function (ctx, next) {
  ctx.body = 'this a users response!';
});

module.exports = router;
