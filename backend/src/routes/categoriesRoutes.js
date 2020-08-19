const express = require('express');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');

const CategoryController = require('../controllers/categoryController');

router.get('/', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    search: Joi.string().allow(''),
    id: Joi.number().integer(),
  })
}), CategoryController.index)

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
  })
}), CategoryController.create)

router.put('/:id', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required()
  })
}), CategoryController.update)

router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required()
  })
}), CategoryController.delete)

module.exports = router;