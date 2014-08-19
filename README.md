kerberos-gss-wrapper
====================

A Node wrapper for Java GSS API. This is a low level API to perform 

1. Verify Kerberos Authorization Header
2. Generate a Kerberos Authorization Header
3. Perform Kerberos Credential Delegation

This can also be used as strategy with [Passportjs](https://github.com/jaredhanson/passport)

### Install

```
npm install kerberos-gss-wrapper
```

### Setup

Add ```login.conf```, ```krb5.conf``` files to your application

Sample login.conf

```
ServicePrincipalLoginContext
{
      com.sun.security.auth.module.Krb5LoginModule required 
      principal="http/service-principal-account@APIGEE.LOCAL" 
      doNotPrompt=true
      useTicketCache=true   
      keyTab="spn.keytab"
      useKeyTab=true
      storeKey=true
      debug=true;      
}
```

Sample krb5.conf

```
[libdefaults]
	default_realm=APIGEE.LOCAL
	default_tkt_enctypes = aes128-cts rc4-hmac des3-cbc-sha1 des-cbc-md5 des-cbc-crc
	default_tgs_enctypes = aes128-cts rc4-hmac des3-cbc-sha1 des-cbc-md5 des-cbc-crc
	permitted_enctypes   = aes128-cts rc4-hmac des3-cbc-sha1 des-cbc-md5 des-cbc-crc

[realms]
	APIGEE.LOCAL  = {
		kdc = kdc.youdomain.com 
		default_domain = APIGEE.LOCAL
}

[domain_realm]
	.APIGEE.LOCAL = APIGEE.LOCAL 
```

### Usage


```
var krb = require('kerberos-gss-wrapper');
```

####### Validate Kerberos Token
```
//authorizationHeader will be of the form 'Negotiate <base64 encoded kerberos token>'
var userName = krb.verifyAuthHeader(loginModuleName, req.getHeader('Authorization')) ;

```

####### Generate Kerberos Token,
```
var authHeader = krb.createAuthHeader ( loginModuleName , 
										principalName, 
										servicePrincipalNameofServer ) ;
authHeader = 'Negotiate ' + authHeader ;
req.setHeader('Authorization' , authHeader);
```

####### Kerberos Credential Delegation
```
var newAuthHeader = krb.delegateCreds (loginModuleName , 
									req.getHeader('Authorization') , 
									servicePrincipalNameofServer );
newAuthHeader = 'Negotiate ' + newAuthHeader ;
req.setHeader('Authorization' , newAuthHeader );									

```

####### Passport Strategy

```
var krb = require('kerberos-gss-wrapper').Strategy;
var passport = require('passport');
var express = require('express');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

passport.use(new krb({loginModule: 'ServicePrincipalLoginContext'})) ;

var app = new express () ;

app.use(passport.initialize());
app.use(passport.session());

app.get('/token' , passport.authenticate('kerberos-gss') , function(req,res){
	res.end('Success ' + req.user) ;
});

app.listen(3000);
```

### TODO

1. Support Kerberos Constrained Delegation
