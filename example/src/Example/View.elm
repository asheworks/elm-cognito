module Example.View exposing (..)

import Html exposing (..)

--

import Example.Style exposing (..)
import Example.Model exposing (Command(..), Model)


-- import Auth.Components.LogIn.View as LogIn
-- import Auth.LogIn.Model as T
-- import Auth as Auth
-- import LogIn.Model as LogIn
-- import LogIn.View as LogIn

--


{ id, class, classList } =
    cssNamespace



--


view : Model -> Html Command
view model =
    div
        []
        [ --LogIn.view model.logIn |> map LogIn_Command
        ]
