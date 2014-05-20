var passport = require('passport');

var routers = {
	items: function(req, res, next) {
		res.render('items/list', {});
	},
	add_item: function(req, res, next) {
		res.render('items/add', {});
	}
};

module.exports = function(app, config) {
	var auth = app.get('auth');

	app.get('/items', auth.requireLogin, routers.items);

	app.get('/items/add', auth.requireLogin, routers.add_item);

	app.post('/items/add', auth.requireLogin, routers.add_item);
};