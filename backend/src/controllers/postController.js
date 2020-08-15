const connection = require('../database/connection');
const moment = require('moment')

module.exports = {

  async index(request, response) {
    let { page, perPage } = request.query

    page = parseInt(page) || 1;
    perPage = parseInt(perPage) || 5;

    const [ count ] = await connection('posts').count();
  
    const posts = await connection('posts')
      .limit(perPage)
      .offset((page - 1) * perPage)
      .select(['*']);
  
    const totalItems = count['count(*)'];
    const totalPages = Math.ceil(totalItems / perPage);
    const currentPage = page;
    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    return response.json({
      totalItems,
      totalPages,
      currentPage,
      nextPage,
      previousPage,
      data: posts
    });
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
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
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