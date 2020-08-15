const moment = require('moment')

module.exports = {
  dateNow() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }
}