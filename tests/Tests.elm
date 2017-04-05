module Tests exposing (all)

import Test exposing (..)
import Expect exposing (Expectation)


-- import TestUtil exposing (outdented, prettyPrint)
-- import Arithmetic
-- import Compile
-- import Fixtures
-- import Properties
-- import Selectors
-- import Colors


all : Test
all =
    describe "elm-css"
        [ stub
        ]


stub : Test
stub =
    describe "stub test"
        [ test "Runs and passes." <|
            \_ ->
                ""
                    |> Expect.equal ("")
        ]
