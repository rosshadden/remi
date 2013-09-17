module.exports = {
	"get tables"(req, res) {
		app.db.query(`
			show tables
		`)
		.then((tables) => {
			res.view({
				tables
			});
		});
	}
};
