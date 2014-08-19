kerberos-gss-wrapper
====================

A Node wrapper for Java GSS API. This is a low level API to perform 

1. Verify Kerberos Authorization Header
2. Generate a Kerberos Authorization Header
3. Perform Kerberos Credential Delegation


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

//For Kerberos token validation
var userName = krb.verifyAuthHeader(loginModuleName, authorizationHeader) ;

//For Southbound authentication,
var authHeader = krb.createAuthHeader ( loginModuleName , principalName, servicePrincipalNameofServer ) ;
authHeader = 'Negotiate ' + authHeader ;
req.setHeder('Authorization' , authHeader);

//For Kerberos Credential Delegation
var newAuthHeader = krb.delegateCreds (loginModuleName , authHeader , servicePrincipalNameofServer );

```

### TODO

1. Create a Passport Strategy for this module
2. Support Kerberos Constrained Delegation
