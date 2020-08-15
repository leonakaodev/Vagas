const express = require('express');
const router = express.Router();

const PostController = require('./controllers/postController');
const CategoryController = require('./controllers/categoryController');

router.post('/posts', PostController.create)
router.put('/posts/:id', PostController.update)
router.get('/posts', PostController.index)
router.delete('/posts/:id', PostController.delete)

router.post('/categories', CategoryController.create)
router.put('/categories/:id', CategoryController.update)
router.get('/categories', CategoryController.index)
router.delete('/categories/:id', CategoryController.delete)

module.exports = router;