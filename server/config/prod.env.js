module.exports = {
	env: 'production',
	port: 80,
	proxy: {
		target: 'http://localhost:8080',
	}
}
