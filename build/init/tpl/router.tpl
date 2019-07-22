import Vue from 'vue'
import store from './store'
import Router from 'vue-router'

Vue.use(Router);

// 根页面
import main from '@/views/main.vue'
import empty from '@/views/empty.vue'

/**
 * 动态生成路由地址
 */
{{each addressList item idx}} {{ if item.lazy }}
// {{ item.display }}
const {{ item.name }} = () => import('{{ item.path }}')
{{ else }}
// {{ item.display }}
import {{ item.name }} from '{{ item.path }}'
{{ /if }} {{ /each }}

/**
 * 动态生成路由表
 */
const router = new Router({
	routes: [
		{
			path: '/', redirect: '/login', name: '/'
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
		}
	]
});

export default router
