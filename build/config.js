/**
 *  构建配置
 */
module.exports = {
	/**
	 *	页面树配置
	 */
	pages: {
		"path": "main",
		"name": "主页面",
		"children": [
			{
				"path": "page1",
				"name": "页面1",
				"permission": ["insert", "update", "delete", "select", "export", "import"],
				"template": "empty",
				"children": [
					{
						"path": "page1",
						"name": "页面1-1",
						"permission": ["insert", "update", "delete", "select", "export", "import"],
						"template": "empty"
					},
					{
						"path": "page2",
						"name": "页面1-2",
						"permission": ["insert", "update", "delete", "select", "export", "import"],
						"template": "empty",
						"children": [
							{
								"path": "page1",
								"name": "页面1-2-1",
								"permission": ["insert", "update", "delete", "select", "export", "import"],
								"template": "empty"
							},
							{
								"path": "page2",
								"name": "页面1-2-2",
								"permission": ["insert", "update", "delete", "select", "export", "import"],
								"template": "empty"
							}
						]
					}
				]
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
