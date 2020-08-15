const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/categoryController');

router.post('/', CategoryController.create)
router.put('/:id', CategoryController.update)
router.get('/', CategoryController.index)
router.delete('/:id', CategoryController.delete)

module.exports = router;