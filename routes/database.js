var passport = require('passport')
  , mongoose = require('mongoose')
  , errorHelper = require('mongoose-error-helper').errorHelper;

var routers = {
	items: function(req, res, next) {
		res.render('items/list', {});
	},
	add_item: function(req, res, next) {
		var ItemModel = mongoose.model('Item');

		if(req.method.toLowerCase() === 'post') {
			var item = new ItemModel(req.body);
				item.save(function(err){
					if(err) {
						res.render('items/add', {
							error: errorHelper(err, next)
						});
					}
				});
		} else {
			res.render('items/add', {});
		}
	}
};

module.exports = function(app, config) {
	var auth = app.get('auth');

	app.get('/items', auth.requireLogin, routers.items);

	app.get('/items/add', auth.requireLogin, routers.add_item);

	app.post('/items/add', auth.requireLogin, routers.add_item);
};