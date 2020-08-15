const Controller = require('./controller')
const { dateNow } = require('../utils')

class PostController extends Controller {

  static async index(request, response) {
    const page = parseInt(request.query.page) || 1,
      perPage = parseInt(request.query.perPage) || 5;

    const [ count ] = await super.connection('posts').count();
  
    const posts = await super.connection('posts')
      .limit(perPage)
      .offset((page - 1) * perPage)
      .select(['*']);
  
    return response.json(super.mountIndexResponse(count, perPage, page, posts));
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