const fs = require('fs')
const path = require('path')
const config = require('./config')									// 获取配置
const template = require('art-template')						// 模板引擎 https://aui.github.io/art-template/zh-cn/docs


// let tpl = path.resolve(__dirname, './tpl')

// let empty = fs.readFileSync(tpl + '/empty.tpl')
// 初始页面模板
let emptyTpl = path.resolve(__dirname, './init/tpl/empty.tpl')
// 路由模板
let routerTpl = path.resolve(__dirname, './init/tpl/router.tpl')
let routerPath = path.resolve(__dirname, '../src/router2.js')

/**
 * 删除目录下所有文件夹和文件
 * @param absolutePath 绝对路径
 */
let deleteAll = (absolutePath) => {
	let files = [];
	// 判断是否存在
	if (fs.existsSync(absolutePath)) {
		// 读取所有下属文件和文件夹
		files = fs.readdirSync(absolutePath)
		// 遍历
		files.forEach((file, index) => {
			let curPath = absolutePath + "/" + file
			// 存在子文件夹, 递归删除
			if (fs.statSync(curPath).isDirectory()) {
				deleteAll(curPath)
			} else {
				// 删除文件
				fs.unlinkSync(curPath);
			}
		});
		// 删除掉下属文件和文件夹后, 删除空文件夹
		fs.rmdirSync(absolutePath);
	}
}

/**
 * 递归遍历页面树
 * @param pages 页面清单
 * @param absolutePath  绝对路径
 */
let recursivePage = (pages, absolutePath) => {
	if (pages && pages.length > 0) {
		pages.forEach(d => {
			// 目录-------------------------
			let directory = absolutePath + '/' + d.name
			// 判断目录是否存在
			let exists = fs.existsSync(directory)
			// 存在递归删除目录及下属文件和文件夹
			if (exists) {
				deleteAll(directory)
			}
			// 新增目录
			fs.mkdirSync(directory)

			// 文件-------------------------
			let file = absolutePath + '/' + d.name + '/' + d.name + '.vue'
			// 判断文件是否存在
			exists = fs.existsSync(file)
			// 存在删除文件
			if (exists) {
				fs.unlinkSync(file)
			}
			// 渲染模板
			const html = template(emptyTpl, d);
			// 新增文件
			fs.writeFileSync(file, html)

			// 递归-------------------------
			recursivePage(d.children, directory)
		})
	}
}

/**
 * 递归构建路由
 * @param pages 页面清单
 * @param relativePath  相对路径
 * @param display 注释 不断累积
 * @param addressList 路由地址
 */
let recursiveRouter = (pages, relativePath, display, addressList) => {
	if (pages && pages.length > 0) {
		pages.forEach(d => {
			// 目录
			let directory = relativePath + '/' + d.name
			// 注释
			d.display = (display ? display  + ' | ' : '') + d.display
			// 相对路径
			d.path = directory + '/' + d.name + '.vue'
			// 存储
			addressList.push({
				lazy: true,
				...d
			})
			// 递归
			recursiveRouter(d.children, directory, d.display, addressList)
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
	recursiveRouter(pages, relativePath, '', addressList)
	// 渲染模板
	const html = template(routerTpl, {
		addressList: addressList
	});
	// 新增文件
	fs.writeFileSync(routerPath, html)
}

let pages = config.pages.children
let absolutePath = path.resolve(__dirname, '../src/views')
recursivePage(pages, absolutePath)

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
