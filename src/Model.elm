module Model exposing (..)

-- API Data Structures


type alias Credentials =
    { expired : Bool
    , expireTime : Maybe String
    , accessKeyId : String
    }


type alias HttpOptions =
    { timeout : Int
    }


type alias RetryDelayOptions =
    { base : Int
    }


type alias Endpoint =
    { protocol : String
    , host : String
    , port_ : Int
    , hostname : String
    , pathname : String
    , path : String
    , href : String
    }


type alias ApiVersions =
    {}


type alias Config =
    { credentials : Credentials
    , credentialProvider : Maybe String
    , region : String
    , logger : Maybe String
    , apiVersions : ApiVersions
    , apiVersion : String
    , endpoint : String
    , httpOptions : HttpOptions
    , maxRedirects : Int
    , paramValidation : Bool
    , sslEnabled : Bool
    , s3ForcePathStyle : Bool
    , s3BucketEndpoint : Bool
    , computeChecksums : Bool
    , convertResponseTypes : Bool
    , correctClockSkew : Bool
    , customUserAgent : Maybe String
    , dynamoDbCrc32 : Bool
    , systemClockOffset : Int
    , signatureVersion : String
    , signatureCache : Bool
    , retryDelayOptions : RetryDelayOptions
    }


type alias Client =
    { config : Config
    , isGlobalEndpoint : Bool
    , endpoint : Endpoint
    }


type alias Pool =
    { userPoolId : String
    , clientId : String
    , paranoia : Int
    , client : Client
    }


type alias User =
    { username : String
    , pool : Pool
    , authState : Maybe String
    , client : Client
    , signInUserSession : Maybe String
    }


type alias SignUpResponse =
    { user : User
    , userConfirmed : Bool
    }
