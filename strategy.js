var passport = require('passport-strategy');
var krb = require('kerberos-gss-wrapper');
var util = require('util');

function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  
  this._loginModule = options.loginModule ;
  
  passport.Strategy.call(this);
  this.name = 'kerberos-gss';
  
}

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function(req, options) {
  options = options || {};
  
  var authHeader = req.getHeader('Authorization');

  if (!authHeader ) {
    return this.fail({ message: options.badRequestMessage || 'Missing Authorization header' }, 400);
  }
  
  var self = this;
  
  try {
  	var username = krb.verifyAuthHeader(this._loginModule, authHeader);
  	if(!username) {
  		self.fail('auth failed');
  	}
	self.success(username, info);
  } catch (ex) {
    return self.error(ex);
  }
};

module.exports = Strategy;