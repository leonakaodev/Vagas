const connection = require('../database/connection')
const { dateNow, mountIndexResponse } = require('../utils')

const table = 'posts'

module.exports = {

  async index(request, response) {
    const page = parseInt(request.query.page) || 1,
      perPage = parseInt(request.query.perPage) || 5;

    const [ count ] = await connection(table)
      .where('deleted_at',  null)
      .count();
  
    const posts = await connection(table)
      .limit(perPage)
      .offset((page - 1) * perPage)
      .where('deleted_at', null)
      .select(['*']);

    const data = []

    for (const post of posts) {
      const categories = await connection('post_categories')
        .innerJoin('categories', 'categories.id', 'post_categories.category_id')
        .where('post_id', post.id)
        .select(['categories.name'])
      
      post['categories'] = categories.map(category => category.name);
      data.push(post)
    }

  
    return response.json(mountIndexResponse(count, perPage, page, data));
  },

  async create (request, response) {
    const { title, description, categories = []} = request.body
    const [ id ] = await connection(table).insert({
      title,
      description,
      created_at: dateNow(),
      updated_at: dateNow()
    })

    for(const category of categories) {
      await connection('post_categories')
        .insert({
          post_id: id,
          category_id: category
        })
    }

    return response.json({ id })
  },

  async update (request, response) {
    const { id } = request.params
    const { title, description, categories = [] } = request.body
    const affected = await connection(table)
      .where({ id })
      .update({
        title,
        description,
        updated_at: dateNow()
      });
    
    if(!affected) {
      return response.status(404).send();
    }

    await connection('post_categories')
      .where('post_id', id)
      .delete()
      
    for(const category of categories) {
      await connection('post_categories')
        .insert({
          post_id: id,
          category_id: category
        })
    }

    return response.send()
  },

  async delete(request, response) {
    const { id } = request.params;

    await connection(table)
      .where('id', id)
      .update({
        updated_at: dateNow(),
        deleted_at: dateNow()
      })

    return response.status(204).send();
  }
}