var path = require('path');

module.exports = function(app, config) {
	var indexRouter = require(path.join(config.root, 'routes', 'index'));

	app.get('/', indexRouter.index);
};