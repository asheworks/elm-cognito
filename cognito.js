"use strict"

// "aws-sdk": "2.7.0"
var AWS = require('aws-sdk')
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool

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
    check(config.creds) ||
    check(config.creds.region) ||
    check(config.creds.userPoolId) ||
    check(config.creds.clientId) ||
    check(config.aws) ||
    check(config.cognito) ||
    check(config.identity)
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

var noop = () => { console.log('Elm-Cognito NOOP') }

function makeHandlers(ports) {
  var handler =
    { changePassword :
      { error : noop
      , failure : noop
      , success : noop
      }
    , confirmRegistration :
      { error : noop
      , success : noop
      }
    , deleteUser :
      { error : noop
      , success : noop
      }
    , forgotPassword :
      { error : noop
      , success : noop
      }
    , logIn :
      { error : ports.sub_AsheWorks_ElmCognito_LogInError.send
      , failure : ports.sub_AsheWorks_ElmCognito_LogInFailure.send
      , mfaRequired : (data) => { console.log('logIn MFARequired: ', data) }
      , newPasswordRequired : (data) => { console.log('logIn NewPasswordRequired: ', data) }
      , success : ports.sub_AsheWorks_ElmCognito_LogInSuccess.send
      }
    , logOut : 
      { error : noop
      , success : noop
      }
    , passwordChallenge :
      { error : ports.sub_AsheWorks_ElmCognito_PasswordChallengeError.send
      , failure : ports.sub_AsheWorks_ElmCognito_PasswordChallengeFailure.send
      , success : ports.sub_AsheWorks_ElmCognito_PasswordChallengeSuccess.send
      }
    , resendConfirmationCode :
      { error : noop
      , success : noop
      }
    , resetPassword :
      { error : noop
      , success : noop
      }
    , signOut :
      { complete : noop
      }
    , signUp :
      { error : ports.sub_AsheWorks_ElmCognito_SignUpError.send
      , failure : ports.sub_AsheWorks_ElmCognito_SignUpFailure.send
      , success : ports.sub_AsheWorks_ElmCognito_SignUpSuccess.send
      }
    }
    
  return handler
}

/*
example config:

var config = {
  dev: false, // optional
  creds: {
    region: 'us-west-2',
    userPoolId: 'us-west-2_key',
    clientId: 'generated_by_aws_cognito'
  }
}
*/
module.exports = function(config) {
  console.log('Cognito config: ', config)
  return function(ports) {
    if (
      checkConfig(config)
    ) {
      throw new Error('invalid config')
    }
    var _handler = makeHandlers(ports)

    var _config = config

    var creds = _config.creds
    AWS.Config.region = creds.region
    AWS.Config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: creds.identityPoolId
    })

    var poolData =
      { UserPoolId: creds.userPoolId
      , ClientId: creds.clientId
      }
    var _pool = new CognitoUserPool(poolData)

    var init = function(func) {
      return func(_handler, _pool, _config)
    }
    var methods = {}
    methods =
      { changePassword: init(changePassword)
      , confirmRegistration: init(confirmRegistration)
      // , deleteUser: init(confirm)
      // , forgotPassword: init(confirm)
      , logIn: init(logIn)
      , logOut: init(logOut)
      , passwordChallenge: init(passwordChallenge)
      // , resendConfirmationCode: init(confirm)
      // , resetPassword: init(confirm)
      // , signOut: init(confirm)
      , signUp: init(signUp)
      }
    ports.cmd_AsheWorks_ElmCognito_LogIn.subscribe(methods.logIn)
    ports.cmd_AsheWorks_ElmCognito_PasswordChallenge.subscribe(methods.passwordChallenge)
    ports.cmd_AsheWorks_ElmCognito_SignUp.subscribe(methods.signUp)
    return methods
  }
}

function getCognitoUser(pool, data, config) {
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
  let authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData);
  let userData = {
    Username: data.username,
    Pool: pool
  }
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return { details: authDetails
         , user: cognitoUser
         }
}

/*
* Exposed methods
*/

function changePassword(handler, pool, config) {
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
      let cognito = getCognitoUser(pool, data, config)
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

function confirmRegistration(handler, pool, config) {
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

// // Sample error response messages:

// // Password Length / Content:

// passwordLengthOrContext = "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6"

// // User name has invalid length or characters

// invalidUserName = "2 validation errors detected: Value at 'username' failed to satisfy constraint: Member must have length greater than or equal to 1; Value at 'username' failed to satisfy constraint: Member must satisfy regular expression pattern: [\p{L}\p{M}\p{S}\p{N}\p{P}]+"

// // Invalid Email Format

// invalidEmail = "Invalid email address format."

// // Incorrect username of password

// incorrectUsernamdOrPassword = "Incorrect username or password."

// // Too many attempts

// passwordAttemptsExceeded = "Password attempts exceeded"

// // User not found

// userNotFound = "User does not exist."

// // User account expired

// userAccountExpired = "User account has expired, it must be reset by an administrator.""

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
function logIn(handler, pool, config) {
  return function (data) {
    try {
      console.log('Cognito log in: ', data)
      // let cognito = getCognitoUser(pool, data, cognito)
      let cognito = getCognitoUser(pool, data, config)
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
      console.log('Calling authenticateUser')
      cognito.user.authenticateUser(cognito.details, cbHandler)
    } catch(ex) {
      console.log('JS - Cognito - logIn error 2: ', ex)
      handler.logIn.error(ex.message)
    }
  }
}

function logOut(handler, pool, config) {
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

function passwordChallenge(handler, pool, config) {
  return function (data) {
    try {
      console.log('Cognito password challenge: ', data)
      // let cognito = getCognitoUser(pool, data, cognito)
      let cognito = getCognitoUser(pool, data.credentials, config)
      let cbHandler = {}
      completeHandler = {
        onSuccess: (result) => {
          let tokens =
            { idToken: result.idToken.jwtToken
            , refreshToken: result.refreshToken.token
            , accessToken: result.accessToken.jwtToken
            }
          // console.log('JS - Cognito - passwordChallenge success: \n', tokens)
          handler.passwordChallenge.success(tokens)
        },
        onFailure: (err) => {
          // console.log('JS - Cognito - passwordChallenge failure: ', err)
          handler.passwordChallenge.failure(err.message)
        }
      }
      cbHandler = {
        onSuccess: (result) => {
          // let tokens =
          //   { idToken: result.idToken.jwtToken
          //   , refreshToken: result.refreshToken.token
          //   , accessToken: result.accessToken.jwtToken
          //   }
          // console.log('JS - Cognito - passwordChallenge success: \n', tokens)
          handler.passwordChallenge.error('User account was already confirmed.')
        },
        onFailure: (err) => {
          // console.log('JS - Cognito - passwordChallenge failure: ', err)
          handler.passwordChallenge.failure(err.message)
        },
        newPasswordRequired: (userAttrs, requiredAttrs) => {
          // console.log('* requiredAttrs: ', requiredAttrs)
          delete userAttrs.email_verified
          delete userAttrs.phone_number_verified
          
          console.log('Sending new password for user: ', data)
          cognito.user.completeNewPasswordChallenge(data.newPassword, userAttrs, completeHandler)
        }
      }
      console.log('Calling authenticateUser for confirmRegistration')
      cognito.user.authenticateUser(cognito.details, cbHandler)
    } catch(ex) {
      console.log('JS - Cognito - confirmRegistration error 2: ', ex)
      handler.logIn.error(ex.message)
    }
  }
}

function signUp(handler, pool, config) {
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

      var cognitoAttributeMap = function(attr) {
        return new config.cognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attr)
      }
      //pool.signUp(data.username, data.password, attributes.map(toCognitoAttr), null, (err, result) => {
      pool.signUp(data.username, data.password, attributes.map(cognitoAttributeMap), null, (err, result) => {
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

