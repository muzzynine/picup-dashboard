/**
 * Created by impyeong-gang on 1/11/16.
 */
var ClientScheme = require('./scheme').CLIENT;

module.exports = function(connection){
    var Client = connection.define(ClientScheme.TABLE, ClientScheme.SCHEME);


    return Client;
};

