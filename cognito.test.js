"use strict"

var providerFunc = require('elm-cognito')
 
var creds = require('./credentials')

/*

Credentials file required to run integration tests

credentials.js

File contents should be in this format, with your credentials

module.exports =
  { region: 'us-west-2'
  , userPoolId: 'us-west-2_aAaAaAaA'
  , clientId: 'aAaAaAaAaAaAaAaAaAaAaAaA'
  }
*/

//var noop = () => {}
var noop =
  { send : () =>
    { console.log('noop')
    }
  }

var cmd =
  { subscribe : () =>
    { console.log('command')
    }
  }

var mockPorts =
  { cmd_AsheWorks_ElmCognito_PasswordChallenge : cmd
  , sub_AsheWorks_ElmCognito_PasswordChallengeError : noop
  , sub_AsheWorks_ElmCognito_PasswordChallengeFailure : noop
  , sub_AsheWorks_ElmCognito_PasswordChallengeSuccess : noop
  , cmd_AsheWorks_ElmCognito_LogIn : cmd
  , sub_AsheWorks_ElmCognito_LogInError : noop
  , sub_AsheWorks_ElmCognito_LogInFailure : noop
  , sub_AsheWorks_ElmCognito_LogInSuccess : noop
  , cmd_AsheWorks_ElmCognito_SignUp : cmd
  , sub_AsheWorks_ElmCognito_SignUpError : noop
  , sub_AsheWorks_ElmCognito_SignUpFailure : noop
  , sub_AsheWorks_ElmCognito_SignUpSuccess : noop
  }

function getMockPorts(impl) {
  return Object.assign({}, mockPorts, impl)
}

// test('does stuff', () => {
//   const service = cognito
//     ( getMockHandler(
//       { logIn :
//         { success : (res) => { console.log('* login success: ', res) }
//         , error : (err) => { console.log('* login error: ', err) }
//         }
//       }
//     )
//     , { region: 'us-west-2'
//       , userPoolId: 'us-west-2_wUnhKNf1i'
//       , clientId: 'dnpjkp19h2snr4ek0voht8j2n'
//       }
//     )
//   service.logIn
//     ( { username : 'test0001'
//       , password : 'P@ssw0rd'
//       }
//     )
// })

test('does stuff', () => {
  const config =
      { creds: creds
      }
  const provider = providerFunc( config )
  const service = provider(
    getMockPorts(
      { sub_AsheWorks_ElmCognito_LogInError :
        { send : (message) =>
          { console.log('Log In Error: ', message)
          }
        }
      , sub_AsheWorks_ElmCognito_LogInFailure :
        { send : (message) =>
          { console.log('Log In Failure: ', message)
          }
        }
      , sub_AsheWorks_ElmCognito_LogInSuccess :
        { send : (message) =>
          { console.log('Log In Success: ', message)
          }
        }
      , sub_AsheWorks_ElmCognito_PasswordChallengeError :
        { send : (message) =>
          { console.log('PasswordChallenge Error: ', message)
          }
        }
      , sub_AsheWorks_ElmCognito_PasswordChallengeFailure :
        { send : (message) =>
          { console.log('PasswordChallenge Failure: ', message)
          }
        }
      , sub_AsheWorks_ElmCognito_PasswordChallengeSuccess :
        { send : (message) =>
          { console.log('PasswordChallenge Success: ', message)
          }
        }
      }
    )
  )
    
  service.logIn
    ( { username : 'test0001'
      , password : '@Password1'
      }
    )
})

// test('fail auth due to REQUIRE_PASSWORD_RESET', () => {
//   const service = cognito
//     ( getMockHandler(
//       { logIn :
//         { success : (res) => { console.log('* login success: ', res) }
//         , error : (err) => { console.log('* login error: ', err) }
//         }
//       }
//     )
//     , creds
//     )
//   service.logIn
//     ( { username : 'test0002'
//       , password : 'P@ssw0rd'
//       }
//     )
// })

// test('fail auth due to USER DOES NOT EXIST', () => {
//   const service = cognito
//     ( getMockHandler(
//       { logIn :
//         { success : (res) => { console.log('* login success: ', res) }
//         , error : (err) => { console.log('* login error: ', err) }
//         }
//       }
//     )
//     , creds
//     )
//   service.logIn
//     ( { username : 'test0003'
//       , password : 'P@ssw0rd'
//       }
//     )
// })