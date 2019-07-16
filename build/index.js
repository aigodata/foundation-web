
const fs = require('fs')
const path = require('path')
const config = require('./config')									// 获取配置
const template = require('art-template')						// 模板引擎 https://aui.github.io/art-template/zh-cn/docs

const pages = config.pages.children

// let tpl = path.resolve(__dirname, './tpl')

// let empty = fs.readFileSync(tpl + '/empty.tpl')
let emptyTpl = path.resolve(__dirname, './init/tpl/empty.tpl')

let viewsDirectory = path.resolve(__dirname, '../src/views')

pages.forEach(d => {

	let directory = viewsDirectory  + '/' +  d.path
	// 判断目录是否存在
	let exists = fs.existsSync(directory)
	// 存在删除目录
	if (exists) {
		fs.rmdirSync(directory)
	}
	// 新增目录
	fs.mkdirSync(directory)

	let file = viewsDirectory  + '/' +  d.path + '/' + d.path + '.vue'
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

})

// 基于模板名渲染模板
// template(filename, data);

// 将模板源代码编译成函数
// template.compile(source, options);

// 将模板源代码编译成函数并立刻执行
// template.render(source, data, options);
