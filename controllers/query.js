module.exports = {
	"run/:database?/:table?": {
		get(req, res, next, database, table) {
			req.state = { database, table };
			res.locals({ state: req.state });
			res.view({ database, table });
		},

		post(req, res, next, database, table) {
			app.db.change({ database })
			.then(() => {
				app.db.query(req.body.query)
				.then((rows) => {
					res.json(rows);
				});
			})
		}
	}
};
