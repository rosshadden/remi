module.exports = {
	view(req, res) {
		app.db.query(`
			select * from trait
		`)
		.then((rows) => {
			res.view({ rows });
		});
	}
};
