module Auth exposing (..)

-- import Auth.Login exposing (..)


type alias Credentials =
    { username : String
    , password : String
    }


type alias CredentialsValidationResult =
    { general : Maybe (List String)
    , username : Maybe String
    , password : Maybe String
    }


type alias ValidationFunc =
    Credentials -> CredentialsValidationResult


type LogInResponses
    = Success
    | InvalidUserName


type Command
    = Validate Credentials
    | LogIn Credentials
    | LogInAPISuccess String
    | LogInAPIError String


type Event
    = ValidationCompleted CredentialsValidationResult
    | LogInRequested Credentials
    | LogInAPICompleted LogInResponses


type Effect
    = None
    | CallLogInAPI Credentials
