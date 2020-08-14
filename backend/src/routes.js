const express = require('express');
const router = express.Router();

const PostController = require('./controllers/postController');

router.get('', function(req, res) {
  res.send('Hello World')
})

router.post('/posts', PostController.create)
router.get('/posts', PostController.index)
router.get('/posts/:id', PostController.select)
router.delete('/posts/:id', PostController.delete)

module.exports = router;