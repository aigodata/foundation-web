/**
 * 所有的组件统一全局注册
 */

import appHeader from './app-header'
import appSidebar from './app-sidebar'
import appBreadcrumb from './breadcrumb/breadcrumb'

import appPieChart from './chart/pie-chart'
import appLineChart from './chart/line-chart'
import appTopnBarChart from './chart/topn-bar-chart'
import appStackBarChart from './chart/stack-bar-chart'
import appSankeyChart from './chart/sankey-chart'
import appGraphChart from './chart/graph-chart'
import appWeekScatterChart from './chart/week-scatter-chart'
import appRateChart from './chart/rate-chart'
import appMapChart from './chart/map-chart'
import appBarChart from './chart/bar-chart'
import appMutilBarChart from './chart/mutil-bar-chart'

const Components = {
	install: function(Vue) {
		Vue.component('app-header', appHeader)
		Vue.component('app-sidebar', appSidebar)
		Vue.component('app-breadcrumb', appBreadcrumb)

		Vue.component('app-pie-chart', appPieChart)
		Vue.component('app-line-chart', appLineChart)
		Vue.component('app-topn-bar-chart', appTopnBarChart)
		Vue.component('app-stack-bar-chart', appStackBarChart)
		Vue.component('app-sankey-chart', appSankeyChart)
		Vue.component('app-graph-chart', appGraphChart)
		Vue.component('app-week-scatter-chart', appWeekScatterChart)
		Vue.component('app-rate-chart', appRateChart)
		Vue.component('app-map-chart', appMapChart)
		Vue.component('app-bar-chart', appBarChart)
		Vue.component('app-mutil-bar-chart', appMutilBarChart)

	}
}
export default Components
