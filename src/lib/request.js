import axios from 'axios'
import { is } from './util'

/**
 * 统一拦截错误码
 * @param vm vue实例
 * @param status 状态码
 */
let parseStatusCode = (vm, data, status) => {
	// 判断请求状态码
	if (status === 200) {
		return data.data
	}
	// 没有权限
	else if (status === 401) {
		throw new Error(status);
	}
	// Session失效
	else if (status === 403) {
		// @特殊处理 阻止到登录页面之前, 需要记录最后的访问页面
		if (vm.$route.fullPath !== '/login') {
			vm.localStore.set("before_403_path", vm.$route.fullPath);
		}
		vm.localStore.remove("user");
		vm.localStore.remove("permission");
		vm.$router.push('/login');
		throw new Error(status);
	}
	// 接口不存在
	else if (data.code === 404) {
		throw new Error(status);
	}
	// 其他异常信息
	else if (data.code === 500) {
		throw new Error(`code=${data.code}, message=${data.message}`);
	}
	// other
	else {
		throw new Error(status || data.message || 'request.js other error');
		// return data;
	}
}

/**
 * 统一处理请求 __log 的情况
 * @param vm vue实例
 * @param config 请求参数配置
 */
let supportRequestParam = (vm, url, config) => {

	let data = config.data || {}
	let ignore = ['/login', '/session/check']

	if (ignore.indexOf(url) !== -1) {
		return
	}

	/**
	 * 写法封装
	 */
	if (!data.__log) {
		data.__log = {
			trigger_page: vm.$route.meta.name || '',		// 触发页面
			trigger_event: config.action || '',					// 触发事件
		}
		if (url === '/action') {
			data.__log.trigger_event = ['select', 'update', 'insert', 'delete', 'export', 'import'].find(f => data[f]) || ''
		}
	}

}

export default {
	install: function (Vue) {
		Vue.prototype.$request = function (url, config, ignoreLoading) {

			// 指定浏览器前缀
			const apiPrefix = '/api';
			// 补充套入 __log 用户操作日志相关信息
			supportRequestParam(this, url, config);

			// 请求默认配置
			config = config || {};
			config.headers = config.headers || {};
			if (!config.ignoreApiPrefix) {
				config.url = apiPrefix + url;
			} else {
				config.url = url;
			}
			// 当请求开始, 自动设置loading状态
			!ignoreLoading && (this.loading = true);

			return axios.request(config).then((response) => {

				// 当请求成功, 自动设置loading状态
				!ignoreLoading && (this.loading = false);

				// 根据响应的状态码返回不同消息
				let data = response.data;

				// 二进制大对象 BLOB (binary large object)
				if (config.responseType === 'blob') {
					// console.log(data.type);
					// let suffix = data.type.match(/\/(.*)$/)[1];
					// 文件导出
					let url = URL.createObjectURL(new Blob([data]));
					let link = document.createElement('a');
					link.style.display = 'none';
					link.href = url;
					link.setAttribute('download', config.fileName);
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					return;
				}

				// 登录特殊处理
				if (url === '/login') {
					if (data.code === 500) {
						return data
					}
					return data.data
				}

				return parseStatusCode(this, data, data.code);

			}).catch((response) => {

				// 当请求报错, 自动设置loading状态
				!ignoreLoading && (this.loading = false);

				// 根据响应的状态码返回不同消息
				return parseStatusCode(this, {}, response.response && response.response.status);
			})
			// chrome 67 支持
			// .finally(() => {
			// 	// 当请求报错, 自动设置loading状态
			// 	!ignoreLoading && (this.loading = false);
			// })
		}
		Vue.prototype.$get = function (url, config, ignoreLoading) {
			config = Object.assign({}, config, { method: 'get' })
			return this.$request(url, config, ignoreLoading)
		}
		Vue.prototype.$post = function (url, config, ignoreLoading) {
			config = Object.assign({}, config, { method: 'post' })
			return this.$request(url, config, ignoreLoading)
		}
		Vue.prototype.$put = function (url, config, ignoreLoading) {
			config = Object.assign({}, config, { method: 'put' })
			return this.$request(url, config, ignoreLoading)
		}
		Vue.prototype.$delete = function (url, config, ignoreLoading) {
			config = Object.assign({}, config, { method: 'delete' })
			return this.$request(url, config, ignoreLoading)
		}
		Vue.prototype.$all = function (requestInfos) {
			if (!Array.isArray(requestInfos)) {
				requestInfos = [requestInfos]
			}
			this.loading = true
			return Promise.all(requestInfos.map(requestInfo => {
				if (is(String, requestInfo)) {
					requestInfo = [requestInfo]
				}
				const config = Object.assign({}, {method: 'get'}, requestInfo[1])
				const url = requestInfo[0]
				return this.$request(url, config, true)
			}))
				.then(responses => {
					this.loading = false
					return responses
				})
				.catch((response) => {
					if (response.response.status === 401) {
						this.$router.push({
							name: 'login'
						})
					} else {
						// this.$message.error(response.response.data.message)
					}
					this.loading = false
				})
		}
	}
}
