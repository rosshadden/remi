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
					var cols = (rows.length) ? Object.keys(rows[0]) : [];
					rows.forEach((row) => {
						for (let col in row) {
							if (row[col] instanceof Date) {
								let time = new Time(row[col]);
								row[col] = `${time.isoDate} ${time.isoTime.slice(0, -4)}`;
							}
						}
					});
					res.json({ cols, rows });
				});
			})
		}
	}
};
