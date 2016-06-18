/**
 * Created by impyeong-gang on 1/11/16.
 */
var config = require('../config/config').DB.MYSQL;
var Sequelize = require('sequelize');
var _ = require('lodash');



var connection = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 100000
    },
    logging: false
});


var models = [
    'delta',
    'group',
    'user',
    'auth',
    'accessToken',
    'client',
    'pushRegistration'
];


_.forEach(models, function(model){
    module.exports[model] = connection.import(__dirname + '/' + model);
});

(function(m){
    m.user.belongsToMany(m.group, {through: 'UserGroup'});
    m.user.hasOne(m.pushRegistration, {onDelete: 'CASCADE'});
    m.user.hasOne(m.auth, {onDelete : 'CASCADE'});
    m.group.belongsToMany(m.user, {through: 'UserGroup'});
    m.group.hasMany(m.delta, {as: 'Deltas'});
    m.auth.belongsTo(m.user, {onDelete : 'CASCADE'});
    m.auth.hasOne(m.accessToken, {onDelete : 'CASCADE'});
    m.auth.hasOne(m.client, {onDelete : 'CASCADE'});
    m.accessToken.belongsTo(m.auth, {onDelete : 'CASCADE'});
})(module.exports);

connection.sync();

console.log("Database connected");

module.exports.connection = connection;
