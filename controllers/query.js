module.exports = {
	"run/:database?/:table?": {
		get(req, res, next, database, table) {
			req.state = { database, table };
			res.locals({ state: req.state });
			res.view({ database, table });
		},

		post(req, res, next) {
			res.json(false);
		}
	}
};
