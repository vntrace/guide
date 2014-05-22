var passport = require('passport')
  , mongoose = require('mongoose')
  , multiparty = require('multiparty')
  , errorHelper = require('mongoose-error-helper').errorHelper;

var routers = {
	items: function(req, res, next) {
		var ItemModel = mongoose.model('Item');

		ItemModel.getAll()
				 .then(function(items){
					res.render('items/list', {
						items: items
					});
				 }, function(err){

				 });
	},
	add_item: function(req, res, next) {
		if(req.method.toLowerCase() === 'post') {
			var ItemModel = mongoose.model('Item');
			var item = new ItemModel(req.body);
				item.save(function(err){
					if(err) {
						return res.render('items/add', {
								error: errorHelper(err, next)
							});
					}

					res.redirect('/items');
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