const connection = require('../database/connection')

class Controller {
  static get connection() {
    return connection
  }
}

module.exports = Controller