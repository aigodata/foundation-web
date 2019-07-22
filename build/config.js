/**
 *  构建配置
 */
module.exports = {
	/**
	 *	页面树配置
	 *
	 *	配置参数说明
	 *
	 *		  name: 也是文件名, 也是vue组件的name属性名, 也是页面顶层class名
	 *
	 *			display: 页面名称, document.title名称, 填充到模板各处的注释名称, 也是路由meta: {name: ??? }
	 *
	 * 			path: 相对路由地址 (生成路由表时会自动产生),  默认等于 name
	 *
	 * 			lazy: 路由是否是懒加载, 默认懒加载 == true
	 *
	 * 			template: 页面使用的模板, 快速生成页面
	 *
	 * 		  permission: 页面拥有的权限配置, 用于生成后台需要的权限清单
	 */
	pages: {
		name: "main",
		display: "主页面",
		lazy: false,
		children: [
			{
				name: "page1",
				display: "页面1",
				template: "empty",
				permission: ["insert", "update", "delete", "select", "export", "import"],
				children: [
					{
						name: "page1",
						display: "页面1-1",
						template: "empty",
						permission: ["insert", "update", "delete", "select", "export", "import"],
					},
					{
						name: "page2",
						display: "页面1-2",
						template: "empty",
						permission: ["insert", "update", "delete", "select", "export", "import"],
						children: [
							{
								name: "page1",
								display: "页面1-2-1",
								template: "empty",
								permission: ["insert", "update", "delete", "select", "export", "import"]
							},
							{
								name: "page2",
								display: "页面1-2-2",
								template: "empty",
								permission: ["insert", "update", "delete", "select", "export", "import"],
							}
						]
					}
				]
			},
			{
				name: "page2",
				display: "页面1",
				template: "empty",
				permission: ["insert", "update", "delete", "select", "export", "import"],
			}
		]
	}
}
