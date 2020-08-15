const express = require('express');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');

const PostController = require('../controllers/postController');

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string(),
    categories: Joi.array()
  })
}), PostController.create)

router.put('/:id', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string(),
    categories: Joi.array()
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required()
  })
}), PostController.update)

router.get('/', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    search: Joi.string(),
    id: Joi.number().integer(),
    page: Joi.number().integer().default(1),
    perPage: Joi.number().integer().default(5),
    categories: Joi.array()
  })
}), PostController.index)

router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required()
  })
}), PostController.delete)

module.exports = router;