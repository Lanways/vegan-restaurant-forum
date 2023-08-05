const { User, Restaurant, Comment } = require('../models')

const commentServices = {
  postComment: (req, cb) => {
    const { restaurantId, text } = req.body
    const userId = req.user.id
    if (!text) throw new Error('Comment text is requires!')
    return Promise.all([
      User.findByPk(userId),
      Restaurant.findByPk(restaurantId)
    ])
      .then(([user, restaurant]) => {
        if (!user) throw new Error(`User didn't exist!`)
        if (!restaurant) throw new Error(`Restaurant didn't exist!`)
        return Comment.create({
          text,
          restaurantId,
          userId
        })
      })
      .then(newComment => cb(null, { newComment }))
      .catch(err => cb(err))
  },
  deleteComment: (req, cb) => {
    return Comment.findByPk(req.params.id)
      .then(comment => {
        if (!comment) throw new Error(`Comment didn't exist!`)
        return comment.destroy()
      })
      .then(deletedComent => cb(null, { deletedComent }))
      .catch(err => cb(err))
  }
}

module.exports = commentServices