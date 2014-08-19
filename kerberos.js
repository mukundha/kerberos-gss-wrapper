var java = require('java');
var path = require('path');
var Strategy = require('./strategy');

var fileName = path.join (__dirname, './lib/kerberos.jar');
java.classpath.push(fileName);


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

exports = module.exports = Strategy;
exports.Strategy = Strategy;
