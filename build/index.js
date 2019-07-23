const fs = require('fs')
const path = require('path')
const config = require('./config')									// 获取配置
const template = require('art-template')						// 模板引擎 https://aui.github.io/art-template/zh-cn/docs


// let tpl = path.resolve(__dirname, './tpl')

// let empty = fs.readFileSync(tpl + '/empty.tpl')

// 模板路径
let tpl = {
	404: path.resolve(__dirname, './init/tpl/exception/exception_404.vue'),
	403: path.resolve(__dirname, './init/tpl/exception/exception_403.vue'),
	500: path.resolve(__dirname, './init/tpl/exception/exception_500.vue'),
	// 登录
	login: path.resolve(__dirname, './init/tpl/login/login.vue'),
	// 主页面
	main: path.resolve(__dirname, './init/tpl/main/main.vue'),
	// 初始页面模板
	empty: path.resolve(__dirname, './init/tpl/empty.vue'),
	// 空路由
	empty_route: path.resolve(__dirname, './init/tpl/empty_route/empty_route.vue'),
	// 路由模板
	router: path.resolve(__dirname, './init/tpl/router.tpl'),
}

let routerPath = path.resolve(__dirname, '../src/router.js')

/**
 * 删除目录下所有文件夹和文件
 * @param delPath 绝对路径
 */
let deleteAll = (delPath) => {
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
				deleteAll(currentPath)
			} else {
				// 删除文件
				fs.unlinkSync(currentPath);
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
				console.log(file, d.template + '')
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
			// 目录
			let fileDirectory = (d.directory === undefined ? d.name : d.directory)
			let directory = relativePath + (fileDirectory ? '/' + fileDirectory : '')
			// 注释
			let note = (display ? display + ' | ' : '') + d.display
			// 相对路径
			d.filePath = directory + '/' + d.name + '.vue'
			// 存储地址
			// 过滤空路由情况
			if ((!d.children || d.children.length === 0)
				|| (!d.template || d.template !== 'empty_route') ) {
				addressList.push({lazy: true, note: note, ...d})
			}
			// 递归
			recursiveRouterAddress(d.children, directory, note, addressList)
		})
	}
}

// /**
//  * 递归构建路由表
//  * @param pages 页面清单
//  * @param router 路由表
//  */
// let recursiveRouterTable = (pages, router) => {
// 	if (pages && pages.length > 0) {
// 		pages.forEach(d => {
// 			// 为了格式化, 故意没有对齐
// 			let route = `
// 		{
// 			path: '${ d.path || d.name }', name: '${ d.name }', component: ${ d.name }, meta: {name: '${ d.display }'},`
//
// 			if (d.children && d.children.length > 0) {
// 				route += `
// 			children: [
// 				{
// 					path: '/', redirect: '${ d.children[0].name }',
// 				},
//
// 			],`
// 			}
// 			route += `
// 		},`
// 			router.routerTable += route
// 			// 递归
// 			recursiveRouterTable(d.children, router)
// 		})
// 	}
// }

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
				route.children = [
					{
						path: '/', redirect: d.children[0].path || d.children[0].name,
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
	fs.writeFileSync(routerPath, html)
}

/**
 * 误执行咋办? 询问?
 */

let pages = config.pages
let absolutePath = path.resolve(__dirname, '../src/views')

// 删除视图文件夹下的子文件夹和文件
deleteAll(absolutePath)

// 生成页面
generatePage(pages, absolutePath)
// 补充空路由
copyFile(tpl.empty_route + '', absolutePath + '/empty_route.vue')

// 生成路由地址 & 生成路由表
generateRouter(pages, '@/views')


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
