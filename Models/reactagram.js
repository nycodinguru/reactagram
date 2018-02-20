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

module.exports = Reactagram;
