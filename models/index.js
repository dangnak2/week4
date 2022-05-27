const { Sequelize } = require("sequelize");
const Auth = require('./auth');
const Posts = require('./posts');

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};


const sequelize = new Sequelize( //config의 db정보와 연결
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Auth = Auth;
db.Posts = Posts;

Auth.init(sequelize);

Posts.init(sequelize);

Auth.associate(db);  // 4

Posts.associate(db);  // 4

module.exports = db;