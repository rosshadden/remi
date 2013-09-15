module.exports = {
	index(req, res) {
		app.db.query(`
			show databases
		`)
		.then((databases) => {
			res.view({
				databases
			});
		});
	}
};
