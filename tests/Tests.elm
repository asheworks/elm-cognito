module Tests exposing (all)

import Test exposing (..)
import CognitoAPITests.Tests as CognitoAPITests


all : Test
all =
    describe "elm-cognito-tests"
        [ CognitoAPITests.all
        ]
