module CognitoAPITests.Stubs exposing (..)

import Model as Auth

credentials : Auth.Credentials
credentials =
    { expired = False
    , expireTime = Nothing
    , accessKeyId = "mock"
    }


httpOptions : Auth.HttpOptions
httpOptions =
    { timeout = 120000
    }


retryDelayOptions : Auth.RetryDelayOptions
retryDelayOptions =
    { base = 100
    }


config : Auth.Config
config =
    { credentials = credentials
    , credentialProvider = Nothing
    , region = "us-west-2"
    , logger = Nothing
    , apiVersions = {}
    , apiVersion = "2016-04-19"
    , endpoint = "cognito-idp.us-west-2.amazonaws.com"
    , httpOptions = httpOptions
    , maxRedirects = 10
    , paramValidation = True
    , sslEnabled = True
    , s3ForcePathStyle = False
    , s3BucketEndpoint = False
    , computeChecksums = True
    , convertResponseTypes = True
    , correctClockSkew = False
    , customUserAgent = Nothing
    , dynamoDbCrc32 = True
    , systemClockOffset = 0
    , signatureVersion = "v4"
    , signatureCache = True
    , retryDelayOptions = retryDelayOptions
    }


endpoint : Auth.Endpoint
endpoint =
    { protocol = "https:"
    , host = "cognito-idp.us-west-2.amazonaws.com"
    , port_ = 443
    , hostname = "cognito-idp.us-west-2.amazonaws.com"
    , pathname = "/"
    , path = "/"
    , href = "https://cognito-idp.us-west-2.amazonaws.com/"
    }


client : Auth.Client
client =
    { config = config
    , isGlobalEndpoint = False
    , endpoint = endpoint
    }


pool : Auth.Pool
pool =
    { userPoolId = "poolid"
    , clientId = "clientid"
    , paranoia = 0
    , client = client
    }


user : Auth.User
user =
    { username = "user4@gmail.com"
    , pool = pool
    , authState = Nothing
    , client = client
    , signInUserSession = Nothing
    }


response : Auth.SignUpResponse
response =
    { user = user
    , userConfirmed = False
    }
