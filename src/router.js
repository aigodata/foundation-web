import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import appConfig from '../app.config.js'						// 系统全局配置

Vue.use(Router);

/**
 * 空路由页面, 为了调整路由层级结构承上启下的过渡页面
 */
import empty_route from '@/views/empty_route.vue'

/**
 * 动态生成路由地址
 */

// 登录
const login = () => import('@/views/login/login.vue')

// 页面不存在
const exception_404 = () => import('@/views/exception/exception_404.vue')

// 无访问权限
const exception_403 = () => import('@/views/exception/exception_403.vue')

// 服务器错误
const exception_500 = () => import('@/views/exception/exception_500.vue')

// 主页面
import main from '@/views/main.vue'

// 主页面 | 仪表盘
const dashboard = () => import('@/views/dashboard/dashboard.vue')

// 主页面 | 页面1
const page1 = () => import('@/views/page1/page1.vue')

// 主页面 | 页面1 | 页面1_1
const page1_1 = () => import('@/views/page1/page1_1/page1_1.vue')

// 主页面 | 页面1 | 页面1_2 | 页面1_2_1
const page1_2_1 = () => import('@/views/page1/page1_2/page1_2_1/page1_2_1.vue')

// 主页面 | 页面1 | 页面1_2 | 页面1_2_2 | 页面1_2_2_1
const page1_2_2_1 = () => import('@/views/page1/page1_2/page1_2_2/page1_2_2_1/page1_2_2_1.vue')

// 主页面 | 页面1 | 页面1_2 | 页面1_2_2 | 页面1_2_2_2
const page1_2_2_2 = () => import('@/views/page1/page1_2/page1_2_2/page1_2_2_2/page1_2_2_2.vue')

// 主页面 | 页面2
const page2 = () => import('@/views/page2/page2.vue')


/**
 * 动态生成路由表
 */
const router = new Router({
  "routes": [
    {
      "path": "/",
      "redirect": "/login",
      "name": "/"
    },
    {
      "path": "*",
      "component": exception_404
    },
    {
      "path": "/login",
      "name": "login",
      "component": login,
      "meta": {
        "name": "登录"
      }
    },
    {
      "path": "/exception_404",
      "name": "exception_404",
      "component": exception_404,
      "meta": {
        "name": "页面不存在"
      }
    },
    {
      "path": "/exception_403",
      "name": "exception_403",
      "component": exception_403,
      "meta": {
        "name": "无访问权限"
      }
    },
    {
      "path": "/exception_500",
      "name": "exception_500",
      "component": exception_500,
      "meta": {
        "name": "服务器错误"
      }
    },
    {
      "path": "/main",
      "name": "main",
      "component": main,
      "meta": {
        "name": "主页面"
      },
      "children": [
        {
          "path": "/",
          "redirect": "dashboard"
        },
        {
          "path": "dashboard",
          "name": "dashboard",
          "component": dashboard,
          "meta": {
            "name": "仪表盘"
          }
        },
        {
          "path": "page1",
          "name": "page1",
          "component": empty_route,
          "meta": {
            "name": "页面1"
          },
          "children": [
            {
              "path": "/",
              "redirect": "page1_1"
            },
            {
              "path": "page1_1",
              "name": "page1_1",
              "component": page1_1,
              "meta": {
                "name": "页面1_1"
              }
            },
            {
              "path": "page1_2",
              "name": "page1_2",
              "component": empty_route,
              "meta": {
                "name": "页面1_2"
              },
              "children": [
                {
                  "path": "/",
                  "redirect": "page1_2_1"
                },
                {
                  "path": "page1_2_1",
                  "name": "page1_2_1",
                  "component": page1_2_1,
                  "meta": {
                    "name": "页面1_2_1"
                  }
                },
                {
                  "path": "page1_2_2",
                  "name": "page1_2_2",
                  "component": empty_route,
                  "meta": {
                    "name": "页面1_2_2"
                  },
                  "children": [
                    {
                      "path": "/",
                      "redirect": "page1_2_2_1"
                    },
                    {
                      "path": "page1_2_2_1",
                      "name": "page1_2_2_1",
                      "component": page1_2_2_1,
                      "meta": {
                        "name": "页面1_2_2_1"
                      }
                    },
                    {
                      "path": "page1_2_2_2",
                      "name": "page1_2_2_2",
                      "component": page1_2_2_2,
                      "meta": {
                        "name": "页面1_2_2_2"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "path": "page2",
          "name": "page2",
          "component": page2,
          "meta": {
            "name": "页面2"
          }
        }
      ]
    }
  ]
});

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
