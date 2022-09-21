const Sequelize = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize('cookieheist', 'root', process.env.DB_PASS, {
    host: '127.0.0.1',
    dialect: 'mysql'
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require('./user')(sequelize, Sequelize);
db.file = require('./file')(sequelize, Sequelize);
db.key = require('./key')(sequelize, Sequelize);
// db.post = require('./post')(sequelize, Sequelize);

db.key.hasOne(db.user);
db.user.belongsTo(db.key);

db.user.hasMany(db.file);
db.file.belongsTo(db.user);

module.exports = db; 