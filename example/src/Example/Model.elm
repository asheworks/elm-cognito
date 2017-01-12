module Example.Model
    exposing
        ( Command(..)
        , Event(..)
        , Effect(..)
        , Context
        , ContextValues
        , Model
        , mapContext
        , mapValues
        , defaultModel
        )

-- import LogIn.Model as LogIn

type alias ContextValues =
    {}


type alias Context =
    Maybe ContextValues


type alias Model =
    { --logIn : LogIn.Model
    }


type Command
    = NoCommands
    -- | LogIn_Command LogIn.Command


type Event
    = NoEvents


type Effect
    = None


mapContext : Context -> Model
mapContext context =
    Maybe.withDefault
        {}
        context
        |> mapValues


mapValues : ContextValues -> Model
mapValues values =
    { --logIn = LogIn.defaultModel
    }


defaultModel : Model
defaultModel =
    { --logIn = LogIn.defaultModel
    }
