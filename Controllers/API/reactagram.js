//Reactagram API router

const router = require('express').Router();
const Reactagram = require('../../Models/reactagram.js');

router.get('/posts', Reactagram.allPosts, (req, res) => {
  const allPosts = res.locals.data;
  res.json(allPosts);
});

router.get('/users/:id', Reactagram.user, (req, res) => {
  const userObj = res.locals.user;
  res.json(userObj);
});

router.get('/comments', Reactagram.allComments, (req, res) => {
  const commentObj = res.locals.comments;
  res.json(commentObj);
});

router.get('/users', Reactagram.allUsers, (req, res) => {
  const allUsers = res.locals.users;
  res.json(allUsers);
})

module.exports = router;
