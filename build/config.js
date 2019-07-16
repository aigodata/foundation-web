/**
 *  构建配置
 */
module.exports = {
	/**
	 *	页面配置
	 */
	pages: {
		"path": "main",
		"name": "主页面",
		"children": [
			{
				"path": "page1",
				"name": "页面1",
				"permission": ["insert", "update", "delete", "select", "export", "import"],
				"template": "empty"
			},
			{
				"path": "page2",
				"name": "页面1",
				"permission": ["insert", "update", "delete", "select", "export", "import"],
				"template": "empty"
			}
		]
	}
}
