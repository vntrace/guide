var path = require('path');
var when = require('when');
var multiparty = require('multiparty');
var util = require('util');

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

	var form = new multiparty.Form();
		form.parse(this.req, function(err, fields, files) {
			console.log(files);
			Object.keys(files).forEach(function(field){
				deferreds.push((function(){
					var deferred = when.defer();
					require('fs').rename(
						files[field].path,
						des + files[field].name,
						function(error) {
							if(error) {
								deferred.reject(error);
							} else {
								deferred.resolve(files[field].name);
							}
						}
					);

					return deferred.promise;
				})());
			});
		});
	return when.all(deferreds);
};

module.exports = function(app, config) {
	var auth = app.get('auth');

	app.post('/upload', auth.requireLogin, function(req, res, next){
		var uploadHandler = new UploadHandler(req, res, next);
			uploadHandler.setNoCacheHeaders();

			uploadHandler.uploadTo(path.join(config.root, 'static'))
				.then(function(fileName){
					console.log(fileName);
					res.json({
						status: true
					});
				}, function(err){
					res.json({
						status: false
					});
				});
	});
};