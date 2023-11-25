const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelizeConfig = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeConfig;

db.user = require('../models/user.model')(sequelizeConfig, Sequelize);
db.role = require('../models/role.model')(sequelizeConfig, Sequelize);

db.user.belongsToMany(db.user, {
    through: 'user_roles'
});

db.role.belongsToMany(db.role, {
    through: 'user_roles'
});

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;