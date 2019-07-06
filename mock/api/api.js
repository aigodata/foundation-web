const Router = require("koa-router");
const router = Router();

// 测试接口
const test = require('./test/test');
router.use('/test', test.routes());

// 七巧板
router.post('/action', function (ctx, next) {
	ctx.set('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data: {}
	};
	ctx.body = JSON.stringify(data);
});

exports = module.exports = router;


