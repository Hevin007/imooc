var User = require('../models/user')


// signup

exports.showSignup = function(req,res){
	res.render('signup',{
		title:'注册页面'
	})	
}

exports.showSignin = function(req,res){
	res.render('signin',{
		title:'登陆页面'
	})	
}

exports.signup = function(req,res) {
	var _user = req.body.user

	User.find({name: _user.name},function(err,user){
		if (err) {
			console.log(err)
		}
		if (user) {
			return res.redirect('/signin')
		}
		else {
			var user = new User(_user)
			user.save(function(err,user) {
				if (err) {
					console.log(err)
				}

				res.redirect('/')
			})
			
		}
	})
	/*   req.param('user') 通用方式
	/user/signup/:userid  req.params.userid
	/user/signup?userid=1122  req.query.userid
	form post 传递 req.body.userid      */
}


//signin 
exports.signin = function(req,res) {
	var _user = req.body.user
	var name = _user.name
	var password = _user.password

	User.findOne({name: name},function(err,user) {
		if(err) {
			console.log(err)
		}
		if(!user) {
			return res.redirect('/signup')
		}
		user.comparePassword(password,function (err ,isMatch) {
			if(err) {
				console.log(err)
			}
			if(isMatch) {
				req.session.user = user

				return res.redirect('/')
			}
			else {
				return res.redirect('/signin')
			}
		})
	})
}

//signout
exports.signout = function(req,res) {
	delete req.session.user
	//delete app.locals.user
	res.redirect('/')
}


//userlist page
exports.list = function(req,res) {
	User.fetch(function(err,users) {
		if (err) {
			console.log(err)
		}
		res.render('userlist',{
			title:'imooc 用户列表页',
			users: users
		});
		
	})
}


//midware for user
exports.signinRequired = function(req,res,next) {
	var user = req.session.user

	if (!user) {
		return res.redirect('/signin')
	}
    next()
}

exports.adminRequired = function(req,res,next) {
	var user = req.session.user

	if (user.role <= 10) {
		return res.redirect('/signin')
	}
    next()
}