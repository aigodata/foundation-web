/**
 *  构建配置
 */
module.exports = {
	/**
	 *  页面树配置
	 *
	 *  配置参数说明
	 *
	 *      name: 也是文件名, 也是vue组件的name属性名, 也是页面顶层class名, 也是面包屑名字
	 *            注意事项: 不要使用 - 中横线, 不利于生成变量名
	 *
	 *      display: 页面名称, document.title名称, 填充到模板各处的注释名称, 也是路由meta: {name: xxx }
	 *
	 *      path: 相对路由地址 (生成路由表时会自动产生, 默认由name进行代替)
	 *
	 *      directory: 页面文件的相对存储目录, 默认不使用, 如果配置将优先使用目录字段来存放文件,
	 *                 例1: 将多个文件放在同一个目录下
	 *                 		directory: 'exception',  文件将按  src/views/exception/文件名  来存储在
	 *                 例2: 希望将文件上提
	 *                 		directory: '',  文件将按  src/views/文件名 来存储在, 所有子路由跟随同样上提
	 *
	 *      lazy: 路由是否是懒加载, 默认 true == 懒加载
	 *
	 *      template: 页面使用的模板, 快速生成页面, 默认有children的情况, 不配置等于empty_route
	 *
	 *      permission: 页面拥有的权限配置, 用于生成后台需要的权限清单
	 */
	originRouter: [
		{
			path: '/', redirect: '/login', name: '/'
		},
		{
			path: '*', component: '@exception_404@'
		},
	],
	pages: [
		/**
		 * 这部分通用配置不需要修改
		 */
		{
			path: '/login', name: 'login', display: '登录', template: 'login'
		},
		{
			path: '/exception_404', name: 'exception_404', display: '页面不存在', directory: 'exception', template: '404'
		},
		{
			path: '/exception_403', name: 'exception_403', display: '无访问权限', directory: 'exception', template: '403'
		},
		{
			path: '/exception_500', name: 'exception_500', display: '服务器错误', directory: 'exception', template: '500'
		},
		/**
		 * 下面为定制修改部分
		 */
		{
			path: '/main', name: "main", display: "主页面", directory: '', template: "main", lazy: false,
			children: [
				{
					name: "dashboard", display: "仪表盘", template: "empty",
					permission: ["insert", "update", "delete", "select", "export", "import"],
				},
				{
					name: "page1",
					display: "页面1",
					permission: ["insert", "update", "delete", "select", "export", "import"],
					children: [
						{
							name: "page1_1",
							display: "页面1_1",
							template: "empty",
							permission: ["insert", "update", "delete", "select", "export", "import"],
						},
						{
							name: "page1_2",
							display: "页面1_2",
							template: "empty_route",
							permission: ["insert", "update", "delete", "select", "export", "import"],
							children: [
								{
									name: "page1_2_1",
									display: "页面1_2_1",
									template: "empty",
									permission: ["insert", "update", "delete", "select", "export", "import"]
								},
								{
									name: "page1_2_2",
									display: "页面1_2_2",
									template: "empty_route",
									permission: ["insert", "update", "delete", "select", "export", "import"],
									children: [
										{
											name: "page1_2_2_1",
											display: "页面1_2_2_1",
											template: "empty",
											permission: ["insert", "update", "delete", "select", "export", "import"]
										},
										{
											name: "page1_2_2_2",
											display: "页面1_2_2_2",
											template: "empty",
											permission: ["insert", "update", "delete", "select", "export", "import"],
										}
									]
								}
							]
						}
					]
				},
				{
					name: "page2",
					display: "页面2",
					template: "empty",
					permission: ["insert", "update", "delete", "select", "export", "import"],
				}
			]
		}
	]
}
