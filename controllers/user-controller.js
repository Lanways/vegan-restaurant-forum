const userServices = require('../services/user-services')

const userController = {
  signUpPage: (req, res) => {
    let inputData = {}
    if (req.session.input) {
      inputData = req.session.input
      delete req.session.input
    }
    res.render('signup', {
      input: inputData,
    })
  },
  signUp: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) {
      req.flash('error_messages', 'Password do not match')
      req.session.input = req.body
      return res.redirect('/signup')
    }
    userServices.signUp(req, (err, data) => {
      if (err) {
        req.flash('error_messages', err.message)
        req.session.input = req.body
        return res.redirect('/signup')
      }
      req.flash('success_messages', '成功註冊!')
      res.redirect('/signin')
    })
  },
  signInPage: (req, res) => {
    let inputData = {}
    if (req.session.input) {
      inputData = req.session.input
      delete req.session.input
    }
    res.render('signin',{
      input: inputData
    })
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入!')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功')
    req.logout()
    res.redirect('/signin')
  },
  getUser: (req, res, next) => {
    userServices.getUser(req, (err, data) => {
      err ? next(err) : res.render('users/profile', data)
    })
  },
  editUser: (req, res, next) => {
    userServices.editUser(req, (err, data) => {
      err ? next(err) : res.render('users/edit', data)
    })
  },
  putUser: (req, res, next) => {
    userServices.putUser(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '使用者資料編輯成功')
      req.session.createData = data
      return res.redirect(`/users/${req.user.id}`)
    })
  },
  addFavorite: (req, res, next) => {
    userServices.addFavorite(req, (err, data) => {
      err ? next(err) : res.redirect('back')
    })
  },
  removeFavorite: (req, res, next) => {
    userServices.removeFavorite(req, (err, data) => {
      if (err) return next(err)
      req.session.createData = data
      return res.redirect('back')
    })
  },
  addLike: (req, res, next) => {
    userServices.addLike(req, (err) => {
      err ? next(err) : res.redirect('back')
    })
  },
  removeLike: (req, res, next) => {
    userServices.removeLike(req, (err) => {
      err ? next(err) : res.redirect('back')
    })
  },
  getTopUsers: (req, res, next) => {
    userServices.getTopUsers(req, (err, data) => {
      err ? next(err) : res.render('top-users', data)
    })
  },
  addFollowing: (req, res, next) => {
    userServices.addFollowing(req, (err) => {
      err ? next(err) : res.redirect('back')
    })
  },
  removeFollowing: (req, res, next) => {
    userServices.removeFollowing(req, (err) => {
      err ? next(err) : res.redirect('back')
    })
  }
}

module.exports = userController