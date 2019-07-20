const fs = require('fs')
const path = require('path')
const config = require('./config')									// 获取配置
const template = require('art-template')						// 模板引擎 https://aui.github.io/art-template/zh-cn/docs


// let tpl = path.resolve(__dirname, './tpl')

// let empty = fs.readFileSync(tpl + '/empty.tpl')
let emptyTpl = path.resolve(__dirname, './init/tpl/empty.tpl')

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
 * @param arr    页面数组
 * @param absolutePath  绝对路径
 */
let recursive = (arr, absolutePath) => {
	if (arr && arr.length > 0) {
		arr.forEach(d => {
			// 目录-------------------------
			let directory = absolutePath + '/' + d.path
			// 判断目录是否存在
			let exists = fs.existsSync(directory)
			// 存在递归删除目录及下属文件和文件夹
			if (exists) {
				deleteAll(directory)
			}
			// 新增目录
			fs.mkdirSync(directory)

			// 文件-------------------------
			let file = absolutePath + '/' + d.path + '/' + d.path + '.vue'
			// 判断文件是否存在
			exists = fs.existsSync(file)
			// 存在删除文件
			if (exists) {
				fs.unlinkSync(file)
			}
			// 渲染模板
			const html = template(emptyTpl, {
				key: d.path,
				name: d.name
			});
			// 新增文件
			fs.writeFileSync(file, html)

			// 递归-------------------------
			recursive(d.children, directory)

		})
	}
}

let pages = config.pages.children
let absolutePath = path.resolve(__dirname, '../src/views')
recursive(pages, absolutePath)

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
