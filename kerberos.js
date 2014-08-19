var java = require('java');

//FIX IT!!, 
var path = require('fs').realpathSync('.') + '/node_modules/kerberos-gss-wrapper/lib/kerberos.jar';
java.classpath.push(path);


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




