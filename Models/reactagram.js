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
      [req.body.comment_text, req.body.u_id, req.body.p_id]
    )
    .then(comment => {
      res.locals.comment = comment;
      next();
    })
    .catch(err => console.log(err));
};


Reactagram.createPost = (req, res, next) => {
  console.log('insert something here');
};

Reactagram.destroy = (req, res, next) => {
  db
    .none('DELETE FROM posts WHERE id = $1', [req.params.id])
    .then(() => {
      next();
    })
    .catch(error => {
      console.log('error encountered in posts.destroy. error:', error);
    });
};

Reactagram.allUserLikes = (req, res, next) => {
  db
    .any(
      'SELECT * FROM user_likes WHERE userid = $1;', [req.params.id])
    .then(allUserLikes => {
      res.locals.allUserLikes = allUserLikes;
      next();
    })
    .catch(err => console.log(err));
};

Reactagram.like = (req, res, next) => {
  db
    .one(
      'INSERT INTO user_likes (userid, postid, is_liked) VALUES ($1, $2, $3) RETURNING *;',
      [req.body.userid, req.body.postid, req.body.is_liked],
    )
    .then(likeData => {
      res.locals.like = likeData;
      next();
    })
    .catch(err => console.log(err));
};

module.exports = Reactagram;
