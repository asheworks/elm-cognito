port module CognitoPorts exposing (..)

import Auth exposing (..)
import Cognito exposing (..)


port cmd_AsheWorks_ElmCognito_PasswordChallenge : CredentialsReset -> Cmd msg


port sub_AsheWorks_ElmCognito_PasswordChallengeError : (String -> msg) -> Sub msg


port sub_AsheWorks_ElmCognito_PasswordChallengeFailure : (String -> msg) -> Sub msg


port sub_AsheWorks_ElmCognito_PasswordChallengeSuccess : (Auth.Tokens -> msg) -> Sub msg


port cmd_AsheWorks_ElmCognito_LogIn : CredentialsReset -> Cmd msg


port sub_AsheWorks_ElmCognito_LogInError : (String -> msg) -> Sub msg


port sub_AsheWorks_ElmCognito_LogInFailure : (String -> msg) -> Sub msg


port sub_AsheWorks_ElmCognito_LogInMFARequired : (String -> msg) -> Sub msg


port sub_AsheWorks_ElmCognito_LogInNewPasswordRequired : (String -> msg) -> Sub msg


port sub_AsheWorks_ElmCognito_LogInSuccess : (Auth.Tokens -> msg) -> Sub msg


port cmd_AsheWorks_ElmCognito_SignUp : Credentials -> Cmd msg


port sub_AsheWorks_ElmCognito_SignUpError : (String -> msg) -> Sub msg


port sub_AsheWorks_ElmCognito_SignUpFailure : (String -> msg) -> Sub msg


port sub_AsheWorks_ElmCognito_SignUpSuccess : (String -> msg) -> Sub msg


effects : ( Auth.Model, Auth.Effect ) -> Cmd msg
effects ( model, effect ) =
    case effect of
        Auth.DoLogIn creds ->
            cmd_AsheWorks_ElmCognito_LogIn creds

        Auth.DoSignUp creds ->
            cmd_AsheWorks_ElmCognito_SignUp creds

        _ ->
            Cmd.none


subscriptions : (Auth.Command -> msg) -> Sub msg
subscriptions mapper =
    Sub.batch <|
        List.map (Sub.map mapper)
            [ sub_AsheWorks_ElmCognito_PasswordChallengeError Auth.PasswordChallengeError
            , sub_AsheWorks_ElmCognito_PasswordChallengeFailure Auth.PasswordChallengeFailure
            , sub_AsheWorks_ElmCognito_PasswordChallengeSuccess Auth.PasswordChallengeSuccess
            , sub_AsheWorks_ElmCognito_LogInError Auth.LogInError
            , sub_AsheWorks_ElmCognito_LogInFailure Auth.LogInFailure
            , sub_AsheWorks_ElmCognito_LogInMFARequired Auth.LogInMFARequired
            , sub_AsheWorks_ElmCognito_LogInNewPasswordRequired Auth.LogInNewPasswordRequired
            , sub_AsheWorks_ElmCognito_LogInSuccess Auth.LogInSuccess
            , sub_AsheWorks_ElmCognito_SignUpError Auth.SignUpError
            , sub_AsheWorks_ElmCognito_SignUpFailure Auth.SignUpFailure
            , sub_AsheWorks_ElmCognito_SignUpSuccess Auth.SignUpSuccess
            ]
