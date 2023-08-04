const express = require('express')
const router = express.Router()
const userController = require('../contorllers/user-controller')
const passport = require('../config/passport')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local',
  {
    failureRedirect: '/signin',
    failureFlash: true
  }), userController.signIn)
router.get('/restaurants', authenticated, restController.getRestaurants)

module.exports = router
