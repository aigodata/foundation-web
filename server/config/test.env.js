module.exports = {
	env: 'testing',
	port: 9000,
	proxy: {
		target: 'http://192.168.200.7:8080'
	}
}
