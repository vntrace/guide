var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

module.exports = function(app, config) {
	app.set('views', path.join(config.root, 'views'));
	app.set('view engine', 'ejs');
	app.set('view cache', false);
  	app.use(favicon());
  	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(logger('dev'));
  	app.use(express.static(path.join(config.root, 'public')));

	app.use(function(req, res, next) {
	    res.removeHeader("X-Powered-By");
	    next();
  	});

  	if(app.get('env') === 'dev') {
	  	app.use(express.errorHandler());
  	}
};