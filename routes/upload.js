var path = require('path');

var UploadHandler = function(req, res, callback) {
	this.req = req;
	this.res = res;
	this.callback = callback;
};

module.exports = function(app, config) {
	var auth = app.get('auth');

	app.post('/upload', auth.requireLogin, function(req, res, next){
		var tmp_path = path.join(config.root, 'tmp');

		
	});
}