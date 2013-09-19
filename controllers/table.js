module.exports = {
	view(req, res) {
		var table = req.params.id;

		if (table) {
			req.session.table = table;

			when.all([
				app.db.query(`describe ${table}`),
				app.db.query(`select * from ${table}`)
			])
			.spread((cols, rows) => {
				res.view({ cols, rows });
			});
		} else {
			res.redirect(`/database/view/${req.session.database}`);
		}
	}
};
