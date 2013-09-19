module.exports = {
	view(req, res) {
		var table = req.params.id;

		if (table) {
			req.session.table = table;

			app.db.query(`
				select * from ${table}
			`)
			.then((rows) => {
				res.view({ rows });
			});
		} else {
			res.redirect(`/database/view/${req.session.database}`);
		}
	}
};
