const Router = require("koa-router");
const router = Router();

router.get('/demo', function (ctx, next) {
	ctx.set('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data: {}
	};
	ctx.body = JSON.stringify(data);
});

router.put('/demo', function (ctx, next) {
	ctx.set('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data: {}
	};
	ctx.body = JSON.stringify(data);
});

router.post('/demo', function (ctx, next) {
	ctx.set('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data: {}
	};
	ctx.body = JSON.stringify(data);
});

router.get('/demo', function (ctx, next) {
	ctx.delete('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data: {}
	};
	ctx.body = JSON.stringify(data);
});


exports = module.exports = router;
