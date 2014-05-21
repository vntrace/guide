var path = require('path');
var when = require('when');

var UploadHandler = function(req, res, callback) {
	this.req = req;
	this.res = res;
	this.callback = callback;
};

UploadHandler.prototype.setNoCacheHeaders = function() {
	this.res.setHeader('Pragma', 'no-cache');
    this.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    this.res.setHeader('Content-Disposition', 'inline; filename="files.json"');
};

UploadHandler.prototype.uploadTo = function(des) {
	var deferreds = [];

	Object.keys(this.req.files).forEach(function(field){
		deferred.push((function(){
			var deferred = when.defer();

			require('fs').rename(
				req.files[field].path,
				des + req.files[field].name,
				function(error) {
					if(error) {
						deferred.reject(error);
					} else {
						deferred.resolve(req.files[field].name);
					}
				}
			);

			return deferred.promise;
		})());
	});

	return when.all(deferreds);
};

module.exports = function(app, config) {
	var auth = app.get('auth');

	app.post('/upload', auth.requireLogin, function(req, res, next){
		// var tmp_path = path.join(config.root, 'tmp');

		var uploadHandler = new UploadHandler(req, res, next);
			uploadHandler.setNoCacheHeaders();

			uploadHandler.uploadTo(path.join(config.root, 'static'))
				.then(function(fileName){
					console.log(fileName);
				}, function(err){

				});
	});
};