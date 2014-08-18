var java = require('java');
java.classpath.push("lib/kerberos.jar");

exports.login = function (loginModule) {
	//var strLoginModule = java.newInstanceSync("java.lang.String" , [loginModule]) ;
	var subject = java.callStaticMethodSync( "node.security.kerberos.Kerberos" , "login" , loginModule) ;

}

exports.verifyAuthHeader = function ( loginModule , header) {

	var user = java.callStaticMethodSync ("node.security.kerberos.Kerberos" , "verifyAuthHeader" , loginModule , header);
	return user ;
}


exports.delegateCreds = function (loginModule, header, serverName) {
	var token = java.callStaticMethodSync ("node.security.kerberos.Kerberos" , "getDelegateCreds" , loginModule , header , serverName);
	return token;
}

exports.createAuthHeader = function  (loginModule, userName, serverName) {
	var token = java.callStaticMethodSync ("node.security.kerberos.Kerberos" , "createAuthHeader" , loginModule , userName , serverName);
	return token ;
}




