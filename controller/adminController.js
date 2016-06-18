var Promise = require('bluebird');
var AppError = require('../lib/appError');

var adminController = function(db){
    var self = this;
    self.dbInstance = db;
    self.getUserList = function(sex, provider, offset, limit){
	return new Promise(function(resolve, reject){
	    var select = "select users.id, auths.auth_id, users.mail, users.nickname, users.sex, users.birth, users.phoneNumber, users.profile_path, users.createdAt, count(groups.id) as groupCount, sum(groups.countAlbum) as countAlbum, users.latestReqDate, users.countAddPhoto, users.countDeletedPhoto, users.usageStorage";
	    var from = "from users left outer join auths on users.id = auths.userId left outer join UserGroup on users.id = UserGroup.userId left outer join groups on UserGroup.groupId = groups.id";
	    var groupBy = "group by users.id";
	    var where = "where ";

	    var whereCondition = [];

	    if(sex && provider){
		if(sex === "Male"){
		    whereCondition.push("users.sex = 'male'");
		} else if (sex === "Female"){
		    whereCondition.push(where += "users.sex = 'female'");
		} else if (sex === "Both"){
		} else {
		    return reject(AppError.throwAppError(400));
		}

		if(provider === "Kakao"){
		    whereCondition.push("auths.auth_type = 'kakao'");
		} else if (provider === "Facebook"){
		    whereCondition.push("auths.auth_type = 'facebook'");
		} else if (provider === "Both"){
		} else {
		    return reject(AppError.throwAppError(400));
		}
	    } else {
		return reject(AppError.throwAppError(400));
	    }

	    for(var i in whereCondition){
		where += whereCondition[i];
		if(i != whereCondition.length-1){
		    where += " and ";
		}
	    }

	    if(where === "where ") where = "";

	    var sql = select + " " + from + " " + where + " " + groupBy;
	    if(offset && limit){
		sql += " " + "limit " + limit + " offset " + offset;
	    }

	    db.connection.query(sql).spread(function(result){
		resolve(result);
	    }).catch(function(err){
		if(err.isAppError){
		    reject(err);
		} else {
		    reject(AppError.throwAppError(500, err.toString()));
		}
	    });
	});
    };

    self.getUser = function(uid){
	return new Promise(function(resolve, reject){
	    	    var select = "select users.id, auths.auth_id, users.mail, users.nickname, users.sex, users.birth, users.phoneNumber, users.profile_path, users.createdAt, count(groups.id) as groupCount, sum(groups.countAlbum) as countAlbum, users.latestReqDate, users.countAddPhoto, users.countDeletedPhoto, users.usageStorage";
	    var from = "from users left outer join auths on users.id = auths.userId left outer join UserGroup on users.id = UserGroup.userId left outer join groups on UserGroup.groupId = groups.id";
	    var groupBy = "group by users.id";
	    var where = "where users.id = '"+uid+"'";

	    var sql = select + " " + from + " "+  where + " " + groupBy;

	    db.connection.query(sql).spread(function(result){
		resolve(result);
	    }).catch(function(err){
		if(err.isAppError){
		    reject(err);
		} else {
		    reject(AppError.throwAppError(500, err.toString()));
		}
	    });
	});
    };

    self.forceSignOut = function(uid){
	return new Promise(function(resolve, reject){
	    var User = db.user;

	    User.findUserById(uid).then(function(user){
		return User.signout(user).then(function(){
		    resolve();
		});
	    }).catch(function(err){
		if(err.isAppError){
		    reject(err);
		} else {
		    reject(AppError.throwAppError(500, err.toString()));
		}
	    });
	});
    }

    self.temporaryBan = function(uid, reason, start, duration){
	return new Promise(function(resolve, reject){
	    var Connection = db.connection;
	    var User = db.user;

	    User.findUserById(uid).then(function(user){
		return user.getAuth().then(function(auth){
		    if(auth.isBan){
			throw AppError.throwAppError(400, "Already banned user");
		    }
		    return Connection.transaction(function(t){
			return auth.createBanInfo({
			    banReason : reason,
			    banStartDate : start,
			    banDuration : duration
			}).then(function(){
			    return;
			}).catch(function(err){
			    throw err;
			});
		    }).then(function(){
			resolve();
		    });
		}).catch(function(err){
		    if(err.isAppError){
			reject(err);
		    } else {
			reject(AppError.throwAppError(500, err.toString()));
		    }
		});
	    });
	});
    };
};


module.exports = adminController;

			   
			  










