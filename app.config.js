module.exports = {
	/**
	 * html页面head中的title默认标签
	 *   后面会根据路由中的 meta.name 来灵活切换页面的title显示
	 */
	title: "aigodata2",
	/**
	 * 是否开启权限
	 * 	 development 为了方便开发, 可以关闭权限控制
	 * 	 production 需要将permission设置为true, 需要前后端权限联调
	 */
	permission: false,
}
