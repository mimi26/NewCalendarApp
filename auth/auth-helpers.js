const bcrypt = require('bcryptjs');
const models = requir('../db/models/index');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
