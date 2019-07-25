/**
 * 所有的组件统一全局注册
 */

// import appPieChart from './chart/pie-chart'
// import appLineChart from './chart/line-chart'
// import appTopnBarChart from './chart/topn-bar-chart'
// import appStackBarChart from './chart/stack-bar-chart'
// import appSankeyChart from './chart/sankey-chart'
// import appGraphChart from './chart/graph-chart'
// import appWeekScatterChart from './chart/week-scatter-chart'
// import appRateChart from './chart/rate-chart'
// import appMapChart from './chart/map-chart'
// import appBarChart from './chart/bar-chart'
// import appMutilBarChart from './chart/mutil-bar-chart'
//
// const Components = {
// 	install: function(Vue) {
//
// 		Vue.component('app-pie-chart', appPieChart)
// 		Vue.component('app-line-chart', appLineChart)
// 		Vue.component('app-topn-bar-chart', appTopnBarChart)
// 		Vue.component('app-stack-bar-chart', appStackBarChart)
// 		Vue.component('app-sankey-chart', appSankeyChart)
// 		Vue.component('app-graph-chart', appGraphChart)
// 		Vue.component('app-week-scatter-chart', appWeekScatterChart)
// 		Vue.component('app-rate-chart', appRateChart)
// 		Vue.component('app-map-chart', appMapChart)
// 		Vue.component('app-bar-chart', appBarChart)
// 		Vue.component('app-mutil-bar-chart', appMutilBarChart)
//
// 	}
// }
// export default Components








/**
 * 全局的组件引用
 *
 * 使用webpack的require.context解决组件过多的书写压力
 *
 * 说明
 * 		require.context(directory, useSubdirectories, regExp)
 * 		参数
 * 			directory：说明需要检索的目录
 *			useSubdirectories：是否检索子目录
 *			regExp: 匹配文件的正则表达式
 *		返回值
 *			返回一个require函数，这个函数可以接收一个参数：request 它是指在 require() 语句中的表达式
 *
 * 参考资料
 * 		https://juejin.im/post/5ab8bcdb6fb9a028b77acdbd
 *  	https://juejin.im/post/5ab86990f265da238532d95e
 *  	https://webpack.js.org/guides/dependency-management/#requirecontext
 *		https://github.com/wuchangming/blog/blob/master/docs/webpack/require-context-usage.md
 */

const Components = {
	install: function(Vue) {
		const requireAll = context => context.keys().map(context);
		const install = module => Vue.component(module.default.name, module.default)
		requireAll(require.context('./basic', true, /\.(vue|js)$/)).forEach(install)
		// requireAll(require.context('./charts', true, /\.(vue|js)$/)).forEach(install)
	}
}
export default Components;
