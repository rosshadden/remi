module.exports = {
	index: {
		get(req, res, next) {
			res.view();
		},
		post(req, res, next) {
			res.json(false);
		}
	}
};
