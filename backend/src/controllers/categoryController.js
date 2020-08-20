const connection = require('../database/connection')
const { dateNow } = require('../utils')

const table = 'categories'

module.exports = {

  async index(request, response) {
    const { search, id } = request.query

    const countObj = connection(table)

    const categoriesObj = connection(table)

    if(id) {
      countObj.where('id', id)
      categoriesObj.where('id', id)
    } else if(search) {
      countObj.where('name', 'like', `%${search}%`)
      categoriesObj.where('name', 'like', `%${search}%`)
    }

    const [ count ] = await countObj.count()
    const categories = await categoriesObj
      .orderByRaw('LOWER(name)')
      .select(['id', 'name', 'created_at', 'updated_at'])

    return response.json({
      totalItems: count['count(*)'],
      data: categories
    })
  },

  async create (request, response) {
    const { name } = request.body

    const hasCategory = (await connection(table)
      .where('name', name)
      .first('id')) !== undefined

    if(hasCategory){
      return response.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'This category already exists',
      })
    }

    const [ id ] = await connection(table).insert({
      name,
      created_at: dateNow(),
      updated_at: dateNow()
    })

    return response.json({ id })
  },

  async update (request, response) {
    const { id } = request.params
    const { name } = request.body
    const affected = await connection(table)
      .where({ id })
      .update({
        name,
        updated_at: dateNow()
      })

    if(!affected) {
      return response.status(404).send()
    }
    return response.send()
  },

  async delete(request, response) {
    const { id } = request.params

    const hasPost = (await connection('post_categories')
      .innerJoin('posts', 'post_categories.post_id', 'posts.id')
      .where('category_id', id)
      .whereNull('posts.deleted_at')
      .first('post_id')) !== undefined

    if(hasPost){
      return response.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Exist a post using this category',
      })
    }

    await connection(table)
      .where('id', id)
      .delete()

    return response.status(204).send()
  }
}