const connection = require('../database/connection')
const { dateNow, mountIndexResponse } = require('../utils')

const table = 'posts'

module.exports = {

  async index(request, response) {
    const { page, perPage, search, categories, id } = request.query

    const countObj = connection(table)
      .where('deleted_at',  null)
  
    const postsObj = connection(table)
      .limit(perPage)
      .offset((page - 1) * perPage)
      .where('deleted_at', null)

    if(id) {
      countObj.where('id', id)
      postsObj.where('id', id)
    } else if(search || categories) {
      if(search){
        countObj.where(function(){
          this.where('title', 'like', `%${search}%`).orWhere('description', 'like', `%${search}`)
        })
        postsObj.where(function(){
          this.where('title', 'like', `%${search}%`).orWhere('description', 'like', `%${search}`)
        })
      }
      if(categories) {
        const filterCategory = function() {
          for (const category of categories) {
            this.orWhere('post_categories.category_id', category)
          }
        }
        countObj.innerJoin('post_categories', 'posts.id', 'post_categories.post_id').where(filterCategory)
        postsObj.innerJoin('post_categories', 'posts.id', 'post_categories.post_id').where(filterCategory)
      }
    }

    const [ count ] = await countObj.count()
    const posts = await postsObj.select(['id', 'title', 'description', 'image', 'created_at', 'updated_at'])

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
    const { title, description, image, categories = []} = request.body
    const [ id ] = await connection(table).insert({
      title,
      description,
      image,
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
    const { title, description, image, categories = [] } = request.body
    const affected = await connection(table)
      .where({ id })
      .update({
        title,
        description,
        image,
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