import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import appConfig from '../app.config'						// 系统全局配置

Vue.use(Router);

/**
 * 空路由页面, 为了调整路由层级结构承上启下的过渡页面
 */
import empty_route from '@/views/empty_route.vue'

/**
 * 动态生成路由地址
 */
{{each addressList item idx}} {{ if item.lazy }}
// {{ item.note }}
const {{ item.name }} = () => import('{{ item.filePath }}')
{{ else }}
// {{ item.display }}
import {{ item.name }} from '{{ item.filePath }}'
{{ /if }} {{ /each }}

/**
 * 动态生成路由表
 */
const router = new Router({{@ routerTable }});

// 被忽略的路由地址
const ignore = [
	'/', 'login', 'exception_404', 'exception_403', 'exception_500'
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
	if (appConfig.permission) {
    // @特殊处理, 过滤无关路由, 可以显示的路由, 权限内的路由
    let permission = store.getters.permission;
    let per = permission[to.name]
    if (ignore.indexOf(to.name) !== -1 || to.meta.show || per && per.query) {
      next();
    } else {
      if (!to.name) {
        router.push({name: 'exception_404'});
      } else {
        router.push({name: 'exception_403'});
      }
    }
  } else {
    next()
  }
});

export default router
