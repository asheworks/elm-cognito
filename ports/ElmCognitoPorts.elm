port module ElmCognitoPorts exposing (..)


port elm_cognito_SignUp :
    { username : String
    , password : String
    }
    -> Cmd msg

port elm_cognito_SignUpSuccess : (String -> msg) -> Sub msg
port elm_cognito_SignUpError : (String -> msg) -> Sub msg

port elm_cognito_Confirm :
    { username : String
    }
    -> Cmd msg

port elm_cognito_ConfirmSuccess : (String -> msg) -> Sub msg
port elm_cognito_ConfirmError : (String -> msg) -> Sub msg

port elm_cognito_LogIn :
    { username : String
    , password : String
    }
    -> Cmd msg

port elm_cognito_LogInSuccess : (String -> msg) -> Sub msg
port elm_cognito_LogInError : (String -> msg) -> Sub msg


port elm_cognito_LogOut :
    { username : String
    }
    -> Cmd msg

port elm_cognito_LogOutSuccess : (String -> msg) -> Sub msg
port elm_cognito_LogOutError : (String -> msg) -> Sub msg
