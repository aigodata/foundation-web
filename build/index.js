const fs = require('fs')
const path = require('path')
const config = require('./config')									// 获取配置
const template = require('art-template')						// 模板引擎 https://aui.github.io/art-template/zh-cn/docs


/**
 *	!!! 切勿自动格式化, 文件中含有文件初始化的生成格式 !!!
 */

// 模板路径
let tpl = {
	404: path.resolve(__dirname, './tpl/exception/exception_404.vue'),
	403: path.resolve(__dirname, './tpl/exception/exception_403.vue'),
	500: path.resolve(__dirname, './tpl/exception/exception_500.vue'),
	// 登录
	login: path.resolve(__dirname, './tpl/login/login.vue'),
	// 主页面
	main: path.resolve(__dirname, './tpl/main/main.vue'),
	// 初始页面模板
	empty: path.resolve(__dirname, './tpl/empty/empty.vue'),
	// 空路由
	back_route: path.resolve(__dirname, './tpl/router/back_route.vue'),
	// 刷新路由
	empty_route: path.resolve(__dirname, './tpl/router/empty_route.vue'),
	// 保持文件夹提交状态
	gitkeep: path.resolve(__dirname, './tpl/router/.gitkeep'),
	// 路由模板
	router: path.resolve(__dirname, './tpl/router/router.tpl'),
}

/**
 * 删除目录下所有文件夹和文件
 * @param delPath 绝对路径
 * @param ignore 忽略文件的数组
 */
let deleteFileAll = (delPath, ignore) => {
	let files = [];
	// 判断是否存在
	if (fs.existsSync(delPath)) {
		// 读取所有下属文件和文件夹
		files = fs.readdirSync(delPath)
		// 遍历
		files.forEach((file, index) => {
			let currentPath = delPath + "/" + file
			// 存在子文件夹, 递归删除
			if (fs.statSync(currentPath).isDirectory()) {
				deleteFileAll(currentPath, ignore)
			} else {
				// 删除文件
				console.log('remove file', file)
				if (ignore.indexOf(file) === -1) {
					fs.unlinkSync(currentPath);
				}
			}
		});
		// 过滤掉 /src/views 视图根目录
		if (delPath !== absolutePath) {
			// 删除掉下属文件和文件夹后, 删除空文件夹
			fs.rmdirSync(delPath);
		}
	}
}


function copyFile(src, dest) {
	let readStream = fs.createReadStream(src);
	readStream.pipe(fs.createWriteStream(dest));
}

/**
 * 递归遍历页面树
 * @param pages 页面清单
 * @param absolutePath  绝对路径
 */
let generatePage = (pages, absolutePath) => {
	if (pages && pages.length > 0) {
		pages.forEach(d => {
			if ( d.name === 'back_route' && d.template === 'back_route') {
				return
			}
			// 目录-------------------------
			let fileDirectory = (d.directory === undefined ? d.name : d.directory)
			let directory = absolutePath + '/' + fileDirectory
			// 判断目录是否存在
			let exists = fs.existsSync(directory)
			// 不存在新增目录
			if (!exists) {
				fs.mkdirSync(directory)
			}

			// 文件-------------------------
			// 过滤空路由
			if (d.template !== 'empty_route') {
				let file = absolutePath + '/' + fileDirectory + '/' + d.name + '.vue'
				// 判断文件是否存在
				exists = fs.existsSync(file)
				// 存在删除文件
				if (exists) {
					fs.unlinkSync(file)
				}
				// 渲染模板
				console.log('create page: ', file)
				let tplPath = tpl[d.template || 'empty']
				const html = template(tplPath, d);
				// 新增文件
				fs.writeFileSync(file, html)
			}

			// 递归-------------------------
			generatePage(d.children, directory)
		})
	}
}

/**
 * 递归构建路由地址
 * @param pages 页面清单
 * @param relativePath  相对路径
 * @param display 注释 不断累积
 * @param addressList 路由地址
 */
let recursiveRouterAddress = (pages, relativePath, display, addressList) => {
	if (pages && pages.length > 0) {
		pages.forEach(d => {
			if ( d.name === 'back_route' && d.template === 'back_route') {
				return
			}
			// 目录
			let fileDirectory = (d.directory === undefined ? d.name : d.directory)
			let directory = relativePath + (fileDirectory ? '/' + fileDirectory : '')
			// 注释
			let note = (display ? display + ' | ' : '') + d.display
			// 相对路径
			d.filePath = directory + '/' + d.name + '.vue'
			// 存储地址
			// 过滤空路由, 刷新路由
			if ((!d.children || d.children.length === 0)
				|| (!d.template || d.template !== 'empty_route') ) {
				addressList.push({lazy: true, note: note, ...d})
			}
			// 递归
			recursiveRouterAddress(d.children, directory, note, addressList)
		})
	}
}

/**
 * 递归构建路由表
 * @param pages 页面清单
 * @param routes 路由表
 */
let recursiveRouterTable = (pages, routes) => {
	if (pages && pages.length > 0) {
		pages.forEach(d => {
			let route = {
				path: d.path || d.name,
				name: d.name,
				component: "@" + d.name + '@',			// 为了后期格式化替换
				meta: {
					name: d.display
				},
			}
			if (d.children && d.children.length > 0) {
				route.component = '@' + (d.template || 'empty_route') + '@'
				let child = d.children[0].name === 'back_route' ? d.children[1] : d.children[0]
				route.children = [
					{
						path: '/', redirect: child.path || child.name,
					},
				]
				// 递归
				recursiveRouterTable(d.children, route.children)
			}
			routes.push(route)
		})
	}
}

/**
 * 生成路由表
 * @param pages 页面清单
 * @param relativePath 相对路径
 */
let generateRouter = (pages, relativePath) => {
	pages = JSON.parse(JSON.stringify(pages))
	// 路由地址
	let addressList = []
	recursiveRouterAddress(pages, relativePath, '', addressList)
	// 路由表
	let routes = [] // {routerTable: ''}
	// 兼容处理, 原生路由
	routes = routes.concat(config.originRouter)
	recursiveRouterTable(pages, routes)
	// 正则替换 @@占位符
	let regExp = /\"@([A-Za-z0-9_]+)@\"/gm
	let routerTable = JSON.stringify({ routes: routes }, 2, 2)
	// 渲染模板
	const html = template(tpl.router, {
		addressList: addressList,
		routerTable: routerTable.replace(regExp, '$1')
	});
	// 新增文件
	let routerPath = path.resolve(__dirname, '../src/router.js')
	console.log('build router:  ', routerPath)
	fs.writeFileSync(routerPath, html)
}

/**
 * 递归构建权限清单
 * @param pages 页面清单
 * @param per 权限清单- 权限表, 角色_权限关联表
 */
let recursivePermission = (pages, per) => {
	let type = {
		select: '查询',
		insert: '新增',
		update: '更新',
		delete: '删除',
		import: '导入',
		export: '导出',
	}
	if (pages && pages.length > 0) {
		pages.forEach((d, idx) => {
			// 格式化需要, 估计没有对齐
			// 权限仅配置没有子页面
			if (!d.children || d.children.length === 0) {
				if (d.permission) {
					per.permission += `
-- ${ d.display }
`
					d.permission.forEach(p => {
						per.permission += `INSERT INTO \`sys_permission\` VALUES (${ per.index }, '${ d.name }', '${ d.display }', '${ p }', '${ type[p] }${ d.display }');
`
// 					per.role_permission += `
// -- ${ d.display }
// `
						per.role_permission += `INSERT INTO \`sys_role_permission\` VALUES (1, ${ per.index });
`
						per.index += 1
					})
				}
			}
			// 递归
			recursivePermission(d.children, per)
		})
	}
}

/**
 * 生成权限清单
 * @param pages 页面清单
 */
let generatePermission = (pages) => {
	// 路由地址
	let per = {
		index: 1,
		permission: '',
		role_permission: ''
	}
	recursivePermission(pages, per)
	// 新增文件
	let routerPath = path.resolve(__dirname, '../role-permission.sql')
	console.log('build permission sql:  ', routerPath)
	// 格式化需要, 估计没有对齐
	fs.writeFileSync(routerPath, `
-- 权限清单
-- 权限表
${ per.permission }
-- 角色权限关联表
${ per.role_permission }
	`)
}

let pages = config.pages
let absolutePath = path.resolve(__dirname, '../src/views')

// 删除视图文件夹下的子文件夹和文件
deleteFileAll(absolutePath, ['.gitkeep'])

// 生成页面
generatePage(pages, absolutePath)
// 补充空路由
copyFile(tpl.empty_route + '', absolutePath + '/empty_route.vue')
// 补充刷新路由
copyFile(tpl.back_route + '', absolutePath + '/back_route.vue')
// 补充保持文件夹提交状态
copyFile(tpl.gitkeep + '', absolutePath + '/.gitkeep')

// 生成路由地址 & 生成路由表
generateRouter(pages, '@/views')

// 生成权限清单
generatePermission(pages)

/**
 * ??? 误执行咋办? 询问式 需要配置参数?
 */


// // 新增目录
// let directory = viewsDirectory  + '/' +  'page'
// fs.mkdirSync(directory, {recursive: true})
//
// directory = viewsDirectory  + '/' +  'page' + '/' +  'page1'
// fs.mkdirSync(directory, {recursive: true})
//
// directory = viewsDirectory  + '/' +  'page2' + '/' +  'page21'
// fs.mkdirSync(directory, {recursive: true})

// 基于模板名渲染模板
// template(filename, data);

// 将模板源代码编译成函数
// template.compile(source, options);

// 将模板源代码编译成函数并立刻执行
// template.render(source, data, options);
