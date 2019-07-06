import Vue from 'vue'
import Vuex from 'vuex'
import localStore from 'store'		// 浏览器存储

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		sidebarShow: true,
		navName: '',
		user: null,
		permission: null
	},
	mutations: {
		sidebarShow (state, params) {
			state.sidebarShow = params.sidebarShow;
		},
		navName(state, params) {
			state.navName = params.navName;		// 切换导航和菜单
		},
		user(state, params) {
			localStore.set('user', params);
			state.user = params;
		},
		permission(state, params) {
			let permission = {};
			// 转换格式
			if (Array.isArray(params)) {
				params.forEach(v => {
					let item = v.sys_permission
					if (!permission[item.module]) {
						permission[item.module] = {}
					}
					permission[item.module][item.action] = true;
				});
			}
			localStore.set('permission', permission);
			state.permission = permission;
		}
	},
	actions: {

	},
	getters: {
		// 登录的个人信息
		user: (state) => {
			return state.user || localStore.get('user') || {}
		},
		// 权限控制清单
		permission: (state) => {
			return state.permission || localStore.get('permission') || {}
		}
	}
})
