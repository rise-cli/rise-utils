const createUser = require('./createUser')
const deleteUser = require('./deleteUser')
const resetPassword = require('./resetPassword')

module.exports = {
  create: createUser,
  remove: deleteUser,
  resetPassword
}
