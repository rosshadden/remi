module.exports = {
	"/:database/:table"(req, res, next, database, table) {
		if (~Object.keys(app.controllers).indexOf(database)) return next();

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
			res.view("table/view", { cols, rows });
		});
	}
};
