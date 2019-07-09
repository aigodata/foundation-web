/**
 *  构建配置
 */
module.exports = {
	/**
	 *	页面配置
	 */
	menu: {
		"key": "main",
		"name": "主页面",
		"children": [
			{
				"key": "page1",
				"name": "页面1",
				"permission": ["insert", "update", "delete", "select", "export", "import"],
				"template": "empty"
			},
			{
				"key": "page1",
				"name": "页面1",
				"permission": ["insert", "update", "delete", "select", "export", "import"],
				"template": "empty"
			}
		]
	}
}
