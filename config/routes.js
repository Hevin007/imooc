var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')

module.exports = function(app) {

	//pre handle user
	app.use(function(req,res,next) {
		var _user = req.session.user
		app.locals.user = _user
		next()
	})

	//index page
	app.get('/',Index.index)

	// User
	app.post('/user/signup',User.signup)
	app.get('/admin/userlist',User.list)
	app.post('/user/signin',User.signin)
	app.get('/signin',User.showSignin)
	app.get('/signup',User.showSignup)
	app.get('/signout',User.signout)

	//Movie
	app.get('/movie/:id',Movie.detail);
	app.get('/admin/new',Movie.new)
	app.get('/admin/update/:id',Movie.update)
	app.post('/admin/movie/new',Movie.save)
	app.get('/admin/list',Movie.list)
	app.delete('/admin/list',Movie.del)
}

