const express = require('express')
const router = express.Router()

const PostRoutes = require('./postsRoutes')
const CategoriesRoutes = require('./categoriesRoutes')

router.use('/posts', PostRoutes)
router.use('/categories', CategoriesRoutes)

module.exports = router