const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const url = require('url');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

// const login = require('./login/login');							// 登录
const api = require('./api/api');												// api

const router = Router();
const app = new Koa();

router.use('*', function (ctx, next) {
	ctx.set('Cache-Control', 'no-cache');
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	next();
});

app.use(bodyParser());

// router.use('/api/loginuser',loginUser.routes());		// 登录
router.use('/api/v1', api.routes());								 	// api

app.use(router['routes']());

app.listen(3001);

console.log('mock服务已启动 :) 端口[3001]');

