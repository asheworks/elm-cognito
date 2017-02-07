module Cognito exposing
        ( Errors(..)
        , mapError
        )

{-| This library contains methods to interact with cognito in compliance with asheworks/elm-auth

## Error messages and related mapping
@docs Errors, mapError

-}

{-| mapError

Parses the AWS Cognito error message and converts it to a structured Elm payload

-}
mapError : String -> Errors
mapError message =
    case message of
        _ ->
            InvalidUsername

{-| Errors

Defineds the set of error cases that can be expressed by the library

-}
type Errors
    = InvalidUsername
