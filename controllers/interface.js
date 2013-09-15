module.exports = {
	index(req, res) {
		app.db.query(`
			show databases
		`)
		.then((data) => {
			res.json(data);
		});
	}
};
