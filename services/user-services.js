const bcrypt = require('bcryptjs')
const { User, Comment, Restaurant } = require('../models')

const userServices = {
  signUp: (req, cb) => {
    if (req.body.password != req.body.passwordCheck) throw new Error('Password do not mathc')

    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => {
        return User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
      })
      .then((user) => {
        user = user.toJSON()
        delete user.password
        return cb(null, { user })
      })
      .catch(err => cb(err))
  },
  getUser: (req, cb) => {
    return Promise.all([
      User.findByPk(req.params.id),
      Comment.findAll({
        raw: true,
        nest: true,
        where: {
          userId: req.params.id
        },
        include: [Restaurant]
      })
    ])
      .then(([user, comments]) => {
        if (!user) throw new Error(`User didn't exist`)
        user = user.toJSON()
        delete user.password
        return cb(null, { user, comments })
      })
      .catch(err => cb(err))
  },
  editUser: (req, cb) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error(`User didn't exist`)
        user = user.toJSON()
        delete user.password
        return cb(null, { user })
      })
      .catch(err => cb(err))
  },
}
module.exports = userServices