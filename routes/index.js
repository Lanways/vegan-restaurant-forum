const express = require('express')
const router = express.Router()
const userController = require('../contorllers/user-controller')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

module.exports = router
