const Controller = require('./controller')
const { dateNow } = require('../utils')

class PostController extends Controller {

  static async index(request, response) {
    let { page, perPage } = request.query

    page = parseInt(page) || 1;
    perPage = parseInt(perPage) || 5;

    const [ count ] = await super.connection('posts').count();
  
    const posts = await super.connection('posts')
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
  }

  static async select(request, response) {
    const { id } = request.params

    const [ post ] = await super.connection('posts').where('id', id).select(['*']);

    if(!post) {
      return response.status(404).send();
    }

    return response.json(post);
  }

  static async create (request, response) {
    const { title, description } = request.body
    const [ id ] = await PostController.connection('posts').insert({
      title,
      description,
      created_at: dateNow(),
      updated_at: dateNow()
    })

    return response.json({ id })
  }

  static async update (request, response) {
    const { id } = request.params
    const { title, description } = request.body
    const affected = await super.connection('posts')
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
  }

  static async delete(request, response) {
    const { id } = request.params;

    await super.connection('posts').where('id', id).delete();

    return response.status(204).send();
  }
}

module.exports = PostController