import Vue from 'vue'
import store from './store'
import Router from 'vue-router'

Vue.use(Router);

// 根页面
import main from '@/views/main.vue'
import empty from '@/views/empty.vue'

// 登录
const login = resolve => require(['@/views/login/login.vue'], resolve);

// 错误页面
const page404 = resolve => require(['@/views/common/page-404.vue'], resolve);
const page403 = resolve => require(['@/views/common/page-403.vue'], resolve);
const page500 = resolve => require(['@/views/common/page-500.vue'], resolve);

/**
 * 仪表盘 dashboard --------------------
 */
const dashboard = resolve => require(['@/views/dashboard/dashboard.vue'], resolve);

/**
 * 系统管理 sys_manage --------------------
 */
// 角色管理
const sys_role = resolve => require(['@/views/sys_manage/sys_role.vue'], resolve);
// 组织机构管理
const sys_organization_manage = resolve => require(['@/views/sys_manage/sys_organization_manage.vue'], resolve);
// 用户管理
const sys_user = resolve => require(['@/views/sys_manage/sys_user.vue'], resolve);

/**
 * 系统日志 sys_log --------------------
 */
// 操作日志
const sys_log_operate = resolve => require(['@/views/sys_log/sys_log_operate.vue'], resolve);
// 登录日志
const sys_log_login = resolve => require(['@/views/sys_log/sys_log_login.vue'], resolve);
// 运行日志
const sys_log_running = resolve => require(['@/views/sys_log/sys_log_running.vue'], resolve);

const router = new Router({
	routes: [
		{
			path: '/', redirect: '/login', name: '/'
		},
		{
			path: '/main', name: 'main', component: main,
			children: [
				{
					path: '/', redirect: 'dashboard',
				},
				{
					path: "dashboard", name: "dashboard", component: dashboard, meta: {name: '仪表盘'},
				},
				{
					path: 'sys_manage', name: 'sys_manage', component: empty, meta: {name: '系统管理'},
					children: [
						{
							path: '/',
							redirect: 'sys_user',
						},
						{
							path: 'sys_user', name: 'sys_user', component: sys_user, meta: {name: '用户管理'},
						},
						{
							path: 'sys_role', name: 'sys_role', component: sys_role, meta: {name: '角色管理'},
						},
						{
							path: 'sys_organization_manage',
							name: 'sys_organization_manage',
							component: sys_organization_manage,
							meta: {name: '组织机构管理'},
						},
					]
				},
				{
					path: "sys_log", name: "sys_log", component: empty, meta: {name: '系统日志'},
					children: [
						{
							path: '/', redirect: 'sys_log_operate'
						},
						{
							path: "sys_log_operate", name: "sys_log_operate", component: sys_log_operate, meta: {name: "操作日志"}
						},
						{
							path: "sys_log_login", name: "sys_log_login", component: sys_log_login, meta: {name: "登录日志"}
						},
						{
							path: "sys_log_running", name: "sys_log_running", component: sys_log_running, meta: {name: "运行日志"}
						}
					]
				}
			]
		},
		{
			path: '*', component: page404
		},
		{
			path: '/login', name: 'login', component: login
		},
		{
			path: '/404', name: 'page-404', component: page404
		},
		{
			path: '/403', name: 'page-403', component: page403
		},
		{
			path: '/500', name: 'page-500', component: page500
		}
	]
});

// 被忽略的路由地址
const ignore = [
	'/', 'login', 'page-404', 'page-403', 'page-500'
]

/**
 * 主要用来拦截路由的钩子
 * @param to Route: 即将要进入的目标 路由对象
 * @param from: Route: 当前导航正要离开的路由
 * @param next: Function: 一定要调用该方法来 resolve 这个钩子
 */
router.beforeEach((to, from, next) => {
	let path = to.path === '/' ? to.path : to.path.substring(1);
	let index = path.indexOf('/');
	// 控制菜单显示
	store.commit('sidebarShow', {sidebarShow: true});
	// 控制导航菜单
	store.commit('navName', {navName: index === -1 ? path : path.substring(0, index)});
	// 控制页面权限
	// @特殊处理, 过滤无关路由, 可以显示的路由, 权限内的路由
	let permission = store.getters.permission;
	let per = permission[to.name]
	if (ignore.indexOf(to.name) !== -1 || to.meta.show || per && per.query) {
		next();
	} else {
		if (!to.name) {
			router.push({name: 'page-404'});
		} else {
			router.push({name: 'page-403'});
		}
	}
});

export default router
