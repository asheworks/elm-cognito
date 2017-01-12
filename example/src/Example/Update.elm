module Example.Update exposing (..)

import Example.Model exposing (..)


--


decode : Context -> Model
decode =
    mapContext


encode : Model -> Context
encode _ =
    Nothing


init : Model -> ( Model, Effect )
init model =
    ( model, None )


commandMap : Model -> Command -> Event
commandMap model command =
    let
        t1 =
            Debug.log "Example - CommandMap" command
    in
        case command of
            NoCommands ->
                NoEvents
            -- LogIn_Command _ ->
            --     NoEvents


eventMap : Model -> Event -> ( Model, Effect )
eventMap model event =
    let
        t1 =
            Debug.log "Example - EventMap" event
    in
        case event of
            NoEvents ->
                (model, None)
