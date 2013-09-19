module.exports = {
	view(req, res) {
		var table = req.params.id;

		if (!app.config.db.database) {
			res.redirect("/");
			return;
		}

		if (table) {
			req.session.table = table;

			when.all([
				app.db.query(`describe ${table}`),
				app.db.query(`select * from ${table}`)
			])
			.spread((cols, rows) => {
				rows.forEach((row) => {
					for (let col in row) {
						if (row[col] instanceof Date) {
							row[col] = new Time(row[col]).isoDate;
						}
					}
				});
				res.view({ cols, rows });
			});
		} else {
			res.redirect(`/database/view/${req.session.database}`);
		}
	}
};
