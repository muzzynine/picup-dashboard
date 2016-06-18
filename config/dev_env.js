/**
 * Created by impyeong-gang on 12/7/15.
 */
module.exports = {
    S3: {
	apiVersions : '2006-03-01',
	originalBucket : "bigfrog.picup.bakkess",
	minionBucket : "bigfrog.picup.minions",
	profileBucket : "bigfrog.picup.profile"
    },

    auth_server: {
	addr : '192.168.123.100',
	port : '8110',
	authPath : '/verify/token'
    },

    DB: {
	MYSQL:{
	    HOST : 'bigfrfog-picup.cpcmirt0kyjt.ap-northeast-2.rds.amazonaws.com',
	    DATABASE : 'picup',
	    PROTOCOL: 'mysql',
	    PORT: 3306,
	    USERNAME : 'muzzynine',
	    PASSWORD : 'su1c1delog1c'
	}
    }
};
