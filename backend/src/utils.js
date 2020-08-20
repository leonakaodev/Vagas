const moment = require('moment')

module.exports = {
  dateNow() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  },

  mountIndexResponse(count, perPage, page, data) {
    const totalItems = count['count(*)']
    const totalPages = Math.ceil(totalItems / perPage)
    const currentPage = page
    const nextPage = page < totalPages ? page + 1 : null
    const previousPage = page > 1 ? page - 1 : null

    return {
      totalItems,
      totalPages,
      currentPage,
      nextPage,
      previousPage,
      data
    }
  }
}