/**
 * Created by impyeong-gang on 1/11/16.
 */
var AccessTokenScheme = require('./scheme').ACCESS_TOKEN;

module.exports = function(connection){
    var AccessToken =  connection.define(AccessTokenScheme.TABLE, AccessTokenScheme.SCHEME);

    return AccessToken;
};
