const connection = require('../database/connection')
const { dateNow, mountIndexResponse } = require('../utils')

module.exports = {

  async index(request, response) {
    const page = parseInt(request.query.page) || 1,
      perPage = parseInt(request.query.perPage) || 5;

    const [ count ] = await connection('posts')
      .where('deleted_at',  null)
      .count();
  
    const posts = await connection('posts')
      .limit(perPage)
      .offset((page - 1) * perPage)
      .where('deleted_at', null)
      .select(['*']);

  
    return response.json(mountIndexResponse(count, perPage, page, posts));
  },

  async select(request, response) {
    const { id } = request.params

    const [ post ] = await connection('posts').where('id', id).select(['*']);

    if(!post) {
      return response.status(404).send();
    }

    return response.json(post);
  },

  async create (request, response) {
    const { title, description } = request.body
    const [ id ] = await connection('posts').insert({
      title,
      description,
      created_at: dateNow(),
      updated_at: dateNow()
    })

    return response.json({ id })
  },

  async update (request, response) {
    const { id } = request.params
    const { title, description } = request.body
    const affected = await connection('posts')
      .where({ id })
      .update({
        title,
        description,
        updated_at: dateNow()
      });

    if(!affected) {
      return response.status(404).send();
    }
    return response.send()
  },

  async delete(request, response) {
    const { id } = request.params;

    await connection('posts')
      .where('id', id)
      .update({
        updated_at: dateNow(),
        deleted_at: dateNow()
      })

    return response.status(204).send();
  }
}