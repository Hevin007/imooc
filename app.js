var express = require('express');
var path = require('path')
var mongoose = require('mongoose')
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require("body-parser")
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var dbUrl = 'mongodb://localhost/imooc'
var logger = require('morgan')

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl)

app.set('view engine','jade');
app.set('views','./app/views/pages');

app.use(bodyParser.urlencoded({ extended: true }))  
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cookieSession({
	name: 'session',
	keys: ['key1','key2']
}))
app.use(express.static(path.join(__dirname,'public')))

if('development' === app.get('env')) {
	// app.set('showStackError', true)
	// app.use(logger(':method:url:status'))
	app.locals.pretty = true
	// mongoose.set('debug',true)
}

app.locals.moment = require('moment')


app.listen(port);

console.log('imooc started on port '+port);
require('./config/routes')(app)

