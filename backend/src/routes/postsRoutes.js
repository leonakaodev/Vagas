const express = require('express');
const router = express.Router();

const PostController = require('../controllers/postController');

router.post('/', PostController.create)
router.put('/:id', PostController.update)
router.get('/', PostController.index)
router.delete('/:id', PostController.delete)

module.exports = router;