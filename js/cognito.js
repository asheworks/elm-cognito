"use strict"

// "aws-sdk": "2.7.0"
var AWS = require('aws-sdk')
var AWSCognito = new AWS.CognitoIdentity()

var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
// var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool

/*
* Helper functions
*/

/*
* check
*
* Validate that the provided object is neither undefined nor null
*/
function check(obj) {
  return typeof obj === 'undefined' || obj === null
}

/*
* checkConfig
*
* Validate that the provided object is a properly shaped config
*/
function checkConfig(config) {
  return
    check(config) ||
    check(config.region) ||
    check(config.userPoolId) ||
    check(config.clientId)
}

/*
* checkSuccessError
*
* Validate that the provided object is a properly shaped pass / error handler
*/
function checkSuccessError(obj) {
  return
    check(obj) &&
    check(obj.success) &&
    check(obj.error)
}

/*
* checkSuccessFailError
*
* Validate that the provided object is a properly shaped pass / fail / error handler
*/
function checkSuccessFailError(obj) {
  return
    checkSuccessError(obj) &&
    check(obj.failure)
}

function checkLogIn(obj) {
  return
    check(obj) &&
    checkSuccessFailError(obj) &&
    check(obj.mfaRequired) &&
    check(obj.newPasswordRequired)
}

function checkSignOut(obj) {
  return
    check(obj.signOut) &&
    check(obj.signOut.complete)
}

function checkHandler(obj) {
  check(obj) &&
  checkSuccessFailError(obj.changePassword) &&
  checkSuccessError(obj.confirmRegistration) &&
  checkSuccessError(obj.deleteuser) &&
  checkSuccessError(obj.forgotPassword) &&
  checkLogIn(obj.logIn) &&
  checkSuccessError(obj.logOut) &&
  checkSuccessError(obj.resendConfirmationCode) &&
  checkSuccessError(obj.resetPassword) &&
  checkSuccessError(obj.signUp) &&
  checkSignOut(obj.signOut)
}

/*
* 
*/
module.exports = function(handler, config) {
  if (
    checkConfig(config)
  ) {
    throw new Error('invalid config')
  }
  if (
    checkHandler(handler)
  ) {
    throw new Error('invalid handler')
  }

  var _handler = handler
  var _config = config
  var _pool = getPool(config)

  var result =
    { changePassword: changePassword(_handler, _pool)
    , confirmRegistration: confirmRegistration(_handler, _pool)
    , deleteUser: confirm(_handler, _pool)
    , forgotPassword: confirm(_handler, _pool)
    , logIn: logIn(_handler, _pool)
    , logOut: logOut(_handler, _pool)
    , resendConfirmationCode: confirm(_handler, _pool)
    , resetPassword: confirm(_handler, _pool)
    , signOut: confirm(_handler, _pool)
    , signUp: signUp(_handler, _pool)
    }
  return result
}

function toCognitoAttr(attr) {
  return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attr);
}

/*
getPool

- Retrieves the AWS cognito pool instance for the provided config settings

example config:

var config = {
  dev: false, // optional
  region: 'us-west-2',
  userPoolId: 'us-west-2_key',
  clientId: 'generated_by_aws_cognito',
}
*/
function getPool(config) {
  if (!check(config.dev)) {
    config.dev = false
  }
  var keys = Object.keys(AWS)
  AWSCognito.config.region = config.region
  var poolData = {
    UserPoolId : config.userPoolId,
    ClientId : config.clientId
  }
  AWSCognito.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
  })
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

  return userPool
}

function getCognitoUser(pool, data) {
  if (
      check(data) ||
      check(data.username) ||
      check(data.password)
    ) {
      throw new Error('missing user name or password')
    }
  let authData = {
    Username: data.username,
    Password: data.password
  }
  let authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData)
  let userData = {
    Username: data.username,
    Pool: pool
  }
  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

  return  { details: authDetails
          , user: cognitoUser
          }
}

/*
* Exposed methods
*/

function changePassword(handler, pool) {
  return function (data)  {
    try {
      if (
        check(data) ||
        check(data.oldPassword) ||
        check(data.newPassword)
      ) {
        throw new Error('missing prior or new password')
      }
      data.password = data.oldPassword
      let cognito = getCognitoUser(pool, data)
      let cbHandler = {}
      cbHandler = {
        onSuccess: (result) => {
          let tokens =
            { idToken: result.idToken.jwtToken
            , refreshToken: result.refreshToken.token
            , accessToken: result.accessToken.jwtToken
            }
          // console.log('JS - Cognito - changePassword success: \n', tokens)
          handler.changePassword.success(tokens)
        },
        onFailure: (err) => {
          // console.log('JS - Cognito - changePassword failure: ', err)
          handler.changePassword.failure(err.message)
        },
        mfaRequired: (codeDeliveryDetails) => {
          // console.log('* mfa: ', codeDeliveryDetails)
          // handler.logIn.mfaRequired(codeDeliveryDetails)
          throw new Error('change password mfa required')
        },
        newPasswordRequired: (userAttrs, requiredAttrs) => {
          // console.log('* requiredAttrs: ', requiredAttrs)
          // delete userAttrs.email_verified
          // delete userAttrs.phone_number_verified
          
          // cognitoUser.completeNewPasswordChallenge('@Password1', userAttrs, cbHandler)
          throw new Error('change password new password required')
        }
      }

      cognito.user.authenticateUser(cognito.details, cbHandler)
    } catch(ex) {
      // console.log('JS - Cognito - changePassword error: ', ex)
      handler.changePassword.error(ex.message)
    }
  }
}

function confirmRegistration(handler, pool) {
  return function (data) {
    // console.log('JS - Cognito - confirmRegistration: ', data)
    try {
      let userData = {
        Username: data.username,
        Pool: pool
      }
      let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          // console.log('JS - Cognito - confirm error 1: ', ex)
          handler.confirm.error(err.message)
          return
        }
        // console.log('JS - Cognito - confirm success: ', result)
        handler.confirm.success(result)
      })
    } catch(ex) {
      // console.log('JS - Cognito - confirm error 2: ', ex)
      handler.confirm.error(ex.message)
    }
  }
}

// LogIn - onSuccess:
//
// { "idToken" : { "jwtToken" : ... }
// , "refreshToken" : { "token" : ... }
// , "accessToken" : { "jwtToken" : ... }
// }
//
//
//

// Errors:
//
// - Password does not conform to policy: Password must have uppercase characters
// - Password does not conform to policy: Password must have numeric characters
// - Password does not conform to policy: Password must have symbol characters
//
//
//

/* Auth Details is not defined
[ReferenceError: authDetails is not defined]
*/
/* Invalid Username or Password
{ [NotAuthorizedException: Incorrect username or password.]
  message: 'Incorrect username or password.',
  code: 'NotAuthorizedException',
  time: Tue Jan 10 2017 11:55:03 GMT-0800 (PST),
  requestId: 'ad0d406c-d76e-11e6-af0b-99545b896e1d',
  statusCode: 400,
  retryable: false,
  retryDelay: 55.0304648000747 }
*/

/* User does not exist
{ [UserNotFoundException: User does not exist.]
  message: 'User does not exist.',
  code: 'UserNotFoundException',
  time: Tue Jan 10 2017 13:13:47 GMT-0800 (PST),
  requestId: 'ace63037-d779-11e6-9277-2f6e6a4ed94f',
  statusCode: 400,
  retryable: false,
  retryDelay: 23.13126209191978 }
*/
function logIn(handler, pool) {
  return function (data) {
    try {
      let cognito = getCognitoUser(pool, data)
      let cbHandler = {}
      cbHandler = {
        onSuccess: (result) => {
          let tokens =
            { idToken: result.idToken.jwtToken
            , refreshToken: result.refreshToken.token
            , accessToken: result.accessToken.jwtToken
            }
          // console.log('JS - Cognito - logIn success: \n', tokens)
          handler.logIn.success(tokens)
        },
        onFailure: (err) => {
          // console.log('JS - Cognito - logIn failure: ', err)
          handler.logIn.failure(err.message)
        },
        mfaRequired: (codeDeliveryDetails) => {
          // console.log('* mfa: ', codeDeliveryDetails)
          handler.logIn.mfaRequired(codeDeliveryDetails)
        },
        newPasswordRequired: (userAttrs, requiredAttrs) => {
          // console.log('* requiredAttrs: ', requiredAttrs)
          delete userAttrs.email_verified
          delete userAttrs.phone_number_verified
          
          cognito.user.completeNewPasswordChallenge('@Password1', userAttrs, cbHandler)
        }
      }

      cognito.user.authenticateUser(cognito.details, cbHandler)
    } catch(ex) {
      // console.log('JS - Cognito - logIn error 2: ', ex)
      handler.logIn.error(ex.message)
    }
  }
}

function logOut(handler, pool) {
  return function(data) {
    try {
      let cognitoUser = pool.getCurrentUser()
      if(cognitoUser != null) cognitoUser.signOut()

      handler.logOut.success()
    } catch(ex) {
      handler.logOut.error(ex.message)
    }
  }
}

function signUp(handler, pool) {
  return function (data) {
    // console.log('JS - Cognito - signUp: ', data)
    try {
      var attributes =
        [ { Name: 'email'
          , Value: data.username
          }
        , { Name: 'email'
          , Value: data.username
          }
        ]

      pool.signUp(data.username, data.password, attributes.map(toCognitoAttr), null, (err, result) => {
        if (err) {
          handler.signUp.error(err.message)
          return
        }
        // console.log('JS - Cognito - signUp success: ', result)
        handler.signUp.success({ result: JSON.stringify(result) })
      })
    } catch(ex) {
      // console.log('JS - Cognito - signUp error: ', ex)
      handler.signUp.error(ex.message)
    }
  }
}

