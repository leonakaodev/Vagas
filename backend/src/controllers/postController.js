const connection = require('../database/connection');
const moment = require('moment')

module.exports = {

  async index(request, response) {
    const { page = 1, perPage = 5 } = request.query
      
    const [ count ] = await connection('posts').count();
  
    const posts = await connection('posts')
      .limit(perPage)
      .offset((page - 1) * perPage)
      .select(['*']);
  
    response.header('X-Total-Count', count['count(*)']);
      
    return response.json(posts);
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
      description
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
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      });

    if(!affected) {
      return response.status(404).send();
    }
    return response.send()
  },

  async delete(request, response) {
    const { id } = request.params;

    await connection('posts').where('id', id).delete();

    return response.status(204).send();
  }
}