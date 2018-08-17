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
  db
    .one(
      'INSERT INTO posts (image_link, caption, user_id) VALUES ($1, $2, $3) RETURNING *;',
      [req.body.image_link, req.body.caption, req.body.user_id],
    )
    .then(post => {
      res.locals.newpost = post;
      next();
    })
    .catch(err => console.log(err));
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
  console.log("called1")
  db.oneOrNone(
      'SELECT * FROM user_likes WHERE userid = $1 AND postid = $2', [req.body.userid, req.body.postid]
      ).then( data => {
        console.log(data);
        if(data === null){
          console.log("NEW DATA")
        db
          .one(
            'INSERT INTO user_likes (userid, postid, is_liked) VALUES ($1, $2, $3) RETURNING *',
            [req.body.userid, req.body.postid, req.body.is_liked],
          )
          .then(likeData => {
              res.locals.like = likeData;
              next();
            })
            .catch(err => console.log(err));
          }
      if (data.is_liked === true) {
        console.log("change to FALSE")
        db
          .one(
            'UPDATE user_likes SET is_liked = false WHERE id = $1 RETURNING *', [data.id]
            )
          .then(falseLikeUpdate => {
            res.locals.falseLikeUpdate = falseLikeUpdate
            next();
          })
          .catch(err => console.log(err));
      }
      else {
        console.log("change to TRUE")
        db
          .one(
            'UPDATE user_likes SET is_liked = true WHERE id = $1 RETURNING *', [data.id]
            )
          .then(trueLikeUpdate => {
            res.locals.trueLikeUpdate = trueLikeUpdate
            next();
          })
          .catch(err => console.log(err));
      }})
              .catch(err => console.log(err));
};

module.exports = Reactagram;
