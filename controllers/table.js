module.exports = {
	view(req, res) {
		var table = req.params.id;

		if (!table) return res.redirect(`/database/view/${req.session.database}`);

		req.session.table = table;

		when.all([
			app.db.query(`describe ${table}`),
			app.db.query(`select * from ${table}`)
		])
		.spread((cols, rows) => {
			rows.forEach((row) => {
				for (let col in row) {
					if (row[col] instanceof Date) {
						let time = new Time(row[col]);
						row[col] = `${time.isoDate} ${time.isoTime.slice(0, -4)}`;
					}
				}
			});
			res.view({ cols, rows });
		});
	}
};
