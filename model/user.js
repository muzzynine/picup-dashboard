/**
 * Created by impyeong-gang on 1/11/16.
 */

var Promise = require('bluebird');
var AppError = require('../lib/appError');
var UserShceme = require('./scheme').USER;

module.exports = function(connection){
    var User = connection.define(UserShceme.TABLE,
        UserShceme.SCHEME, {
            instanceMethods: {
                getProfile : function(){
                    return {
                        uid : user.id,
                        nickname : user.nickname,
                        pic_s3path : user.profile_path
                    }
                }
            }
        });

    User.findUserById = function(uid){
	return new Promise(function(resolve, reject){
	    return User.findOne({
		where : {
		    id : uid
		}
	    }).then(function(user){
		if(!user){
		    throw AppError.throwAppError(404, "Not exist user");
		}
		resolve(user);
	    }).catch(function(err){
		if(err.isAppError){
		    reject(err);
		} else {
		    reject(AppError.throwAppError(500, err.toString()));
		}
	    });
	});
    }

    
    User.signout = function(user){
	return new Promise(function(resolve, reject){
	    user.getAuth().then(function(auth){
		return connection.transaction(function(t){
		    return user.destroy({transaction : t}).then(function(){
			if(auth.auth_type === "kakao"){
			    return Kakao.unlinkUserInfo(auth.auth_id).then(function(){
				return;
			    });
			} else {
			    throw AppError.throwAppError(400, "signout is support only kakao account");
			}
		    }).catch(function(err){
			throw err;
		    });
		}).then(function(){
		    resolve();
		});
	    }).catch(function(err){
		if(err.isAppError){
		    return reject(err);
		}
		reject(AppError.throwAppError(500, err.toString()));
	    });
	});
    };

    
    return User;
};

