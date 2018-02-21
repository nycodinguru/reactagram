// Reactagram model

const db = require('../db/setup.js');
const Reactagram = {};

Reactagram.user = (req, res, next) => {
  const { id } = req.params;
  db
    .oneOrNone('SELECT * FROM users WHERE users.id = $1', [id])
    .then(user => {
      res.locals.user = user;
      next();
    })
    .catch(err => console.log(err));
};

Reactagram.allUsers = (req, res, next) => {
  db
    .manyOrNone('SELECT * FROM users')
    .then(users => {
      res.locals.users = users;
      next();
    })
    .catch(err => console.log(err));
};


Reactagram.allPosts = (req, res, next) => {
  db
    .manyOrNone('SELECT * FROM posts')
    .then(posts => {
      res.locals.data = posts;
      next();
    })
    .catch(err => console.log(err));
};

Reactagram.allComments = (req, res, next) => {
  db
    .manyOrNone('SELECT * FROM comments')
    .then(comments => {
      res.locals.comments = comments;
      next();
    })
    .catch(err => console.log(err));
};

Reactagram.createComment = (req, res, next) => {
  db
    .one(
      'INSERT INTO comments (comment_text, u_id, p_id) VALUES ($1, $2, $3) RETURNING *;',
      [req.body.comment_text, req.body.u_id, req.body.p_id],
    )
    .then(comment => {
      res.locals.comment = comment;
      next();
    })
    .catch(err => console.log(err));
};

Reactagram.like = (req, res, next) => {
  db
    .one(
      'INSERT INTO users_likes (user_id, postid, is_liked) VALUES ($1, $2, $3) RETURNING *;',
      [req.body.user_id, req.body.postid, req.body.is_liked],
    )
    .then(likeData => {
      res.locals.like = likeData;
      next();
    })
    .catch(err => console.log(err));
};

module.exports = Reactagram;
