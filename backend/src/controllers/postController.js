const connection = require('../database/connection');

module.exports = {
  async create (req, res) {
    const { title, description } = req.body
    const [ id ] = await connection('posts').insert({
      title,
      description,
    })

    return res.json({ id })
  }
}