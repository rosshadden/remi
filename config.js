var config = {
	name: "REMI",
	port: 8080,

	db: {
		adapter: "mysql",
		mysql: {
			host: "localhost",
			user: "root",
			password: "root"
		}
	},

	env: {
		development: {
			debug: true
		}
	}
}

module.exports = config;
