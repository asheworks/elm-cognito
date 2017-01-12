module Example.Stub exposing (main)

import CQRS exposing (..)

--

import Example.Model exposing (..)
import Example.Update as Example
import Example.View as Example


--

import Html exposing (div)
import Html.Attributes as Attr
import Css exposing (..)


--

-- import PortsAuth as PortsAuth


--


styles : List Mixin -> Html.Attribute msg
styles =
    asPairs >> Attr.style



--


view : Model -> Html.Html Command
view model =
    div
        [ styles
            [ backgroundColor (hex "#EEE")
            , property "width" "calc(100vw - 150px)"
            , property "height" "calc(100vh - 150px)"
            , marginLeft (px 25)
            , marginTop (px 25)
            , padding (px 50)
            , overflow scroll
            ]
        ]
        [ Example.view model
        ]


main : Program Context Model Event
main =
    program
        { decode = Example.decode
        , encode = Example.encode
        , init = Example.init
        , view = view
        , commandMap = Example.commandMap
        , eventMap = Example.eventMap
        , eventHandler = eventHandler
        , subscriptions = subscriptions
        }


eventHandler : ( Model, Effect ) -> Cmd msg
eventHandler ( model, effect ) =
    case effect of
        _ ->
            Cmd.none


subscriptions : Model -> Sub Command
subscriptions model =
    Sub.batch []



-- DoLogIn username password ->
--     PortsAuth.auth_LogIn
--         { username = username
--         , password = password
--         }
--
--
--
-- [ PortsAuth.auth_LogInError LogInError
-- , PortsAuth.auth_LogInSuccess LogInSuccess
-- ]
