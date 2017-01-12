module CognitoAPITests.Samples exposing (..)


validCredentials : String
validCredentials =
    """
{ "expired": false
, "expireTime": null
, "accessKeyId": "mock"
}
  """


validEndpoint : String
validEndpoint =
    """
{ "protocol": "https:"
, "host": "cognito-idp.us-west-2.amazonaws.com"
, "port": 443
, "hostname": "cognito-idp.us-west-2.amazonaws.com"
, "pathname": "/"
, "path": "/"
, "href": "https://cognito-idp.us-west-2.amazonaws.com/"
}
"""


validConfig : String
validConfig =
    """
{ "credentials":
  { "expired": false
  , "expireTime": null
  , "accessKeyId": "mock"
  }
, "credentialProvider": null
, "region": "us-west-2"
, "logger": null
, "apiVersions": {}
, "apiVersion": "2016-04-19"
, "endpoint": "cognito-idp.us-west-2.amazonaws.com"
, "httpOptions":
  { "timeout": 120000
  }
, "maxRedirects": 10
, "paramValidation": true
, "sslEnabled": true
, "s3ForcePathStyle": false
, "s3BucketEndpoint": false
, "computeChecksums": true
, "convertResponseTypes": true
, "correctClockSkew": false
, "customUserAgent": null
, "dynamoDbCrc32": true
, "systemClockOffset": 0
, "signatureVersion": "v4"
, "signatureCache": true
, "retryDelayOptions":
  { "base": 100
  }
}
"""


validClient : String
validClient =
    """
{ "config":
  { "credentials":
    { "expired": false
    , "expireTime": null
    , "accessKeyId": "mock"
    }
  , "credentialProvider": null
  , "region": "us-west-2"
  , "logger": null
  , "apiVersions": {}
  , "apiVersion": "2016-04-19"
  , "endpoint": "cognito-idp.us-west-2.amazonaws.com"
  , "httpOptions":
    { "timeout": 120000
    }
  , "maxRedirects": 10
  , "paramValidation": true
  , "sslEnabled": true
  , "s3ForcePathStyle": false
  , "s3BucketEndpoint": false
  , "computeChecksums": true
  , "convertResponseTypes": true
  , "correctClockSkew": false
  , "customUserAgent": null
  , "dynamoDbCrc32": true
  , "systemClockOffset": 0
  , "signatureVersion": "v4"
  , "signatureCache": true
  , "retryDelayOptions":
    { "base": 100
    }
  }
, "isGlobalEndpoint": false
, "endpoint":
  { "protocol": "https:"
  , "host": "cognito-idp.us-west-2.amazonaws.com"
  , "port": 443
  , "hostname": "cognito-idp.us-west-2.amazonaws.com"
  , "pathname": "/"
  , "path": "/"
  , "href": "https://cognito-idp.us-west-2.amazonaws.com/"
  }
}
"""


validPool : String
validPool =
    """
{ "userPoolId": "poolid"
, "clientId": "clientid"
, "paranoia": 0
, "client":
  { "config":
    { "credentials":
      { "expired": false
      , "expireTime": null
      , "accessKeyId": "mock"
      }
    , "credentialProvider": null
    , "region": "us-west-2"
    , "logger": null
    , "apiVersions": {}
    , "apiVersion": "2016-04-19"
    , "endpoint": "cognito-idp.us-west-2.amazonaws.com"
    , "httpOptions":
      { "timeout": 120000
      }
    , "maxRedirects": 10
    , "paramValidation": true
    , "sslEnabled": true
    , "s3ForcePathStyle": false
    , "s3BucketEndpoint": false
    , "computeChecksums": true
    , "convertResponseTypes": true
    , "correctClockSkew": false
    , "customUserAgent": null
    , "dynamoDbCrc32": true
    , "systemClockOffset": 0
    , "signatureVersion": "v4"
    , "signatureCache": true
    , "retryDelayOptions":
      { "base": 100
      }
    }
  , "isGlobalEndpoint": false
  , "endpoint":
    { "protocol": "https:"
    , "host": "cognito-idp.us-west-2.amazonaws.com"
    , "port": 443
    , "hostname": "cognito-idp.us-west-2.amazonaws.com"
    , "pathname": "/"
    , "path": "/"
    , "href": "https://cognito-idp.us-west-2.amazonaws.com/"
    }
  }
}
"""


unconfirmedSignUpSuccess : String
unconfirmedSignUpSuccess =
    """
{ "user":
  { "username": "user4@gmail.com"
  , "pool":
    { "userPoolId": "poolid"
    , "clientId": "clientid"
    , "paranoia": 0
    , "client":
      { "config":
        { "credentials":
          { "expired": false
          , "expireTime": null
          , "accessKeyId": "mock"
          }
        , "credentialProvider": null
        , "region": "us-west-2"
        , "logger": null
        , "apiVersions": {}
        , "apiVersion": "2016-04-19"
        , "endpoint": "cognito-idp.us-west-2.amazonaws.com"
        , "httpOptions":
          { "timeout": 120000
          }
        , "maxRedirects": 10
        , "paramValidation": true
        , "sslEnabled": true
        , "s3ForcePathStyle": false
        , "s3BucketEndpoint": false
        , "computeChecksums": true
        , "convertResponseTypes": true
        , "correctClockSkew": false
        , "customUserAgent": null
        , "dynamoDbCrc32": true
        , "systemClockOffset": 0
        , "signatureVersion": "v4"
        , "signatureCache": true
        , "retryDelayOptions":
          { "base": 100
          }
        }
      , "isGlobalEndpoint": false
      , "endpoint":
        { "protocol": "https:"
        , "host": "cognito-idp.us-west-2.amazonaws.com"
        , "port": 443
        , "hostname": "cognito-idp.us-west-2.amazonaws.com"
        , "pathname": "/"
        , "path": "/"
        , "href": "https://cognito-idp.us-west-2.amazonaws.com/"
        }
      }
    }
  , "AuthState": null
  , "client":
    { "config":
      { "credentials":
        { "expired": false
        , "expireTime": null
        , "accessKeyId": "mock"
        }
      , "credentialProvider": null
      , "region": "us-west-2"
      , "logger": null
      , "apiVersions": {}
      , "apiVersion": "2016-04-19"
      , "endpoint": "cognito-idp.us-west-2.amazonaws.com"
      , "httpOptions":
        { "timeout": 120000
        }
      , "maxRedirects": 10
      , "paramValidation": true
      , "sslEnabled": true
      , "s3ForcePathStyle": false
      , "s3BucketEndpoint": false
      , "computeChecksums": true
      , "convertResponseTypes": true
      , "correctClockSkew": false
      , "customUserAgent": null
      , "dynamoDbCrc32": true
      , "systemClockOffset": 0
      , "signatureVersion": "v4"
      , "signatureCache": true
      , "retryDelayOptions":
        { "base": 100
        }
      }
    , "isGlobalEndpoint": false
    , "endpoint":
      { "protocol": "https:"
      , "host": "cognito-idp.us-west-2.amazonaws.com"
      , "port": 443
      , "hostname": "cognito-idp.us-west-2.amazonaws.com"
      , "pathname": "/"
      , "path": "/"
      , "href": "https://cognito-idp.us-west-2.amazonaws.com/"
      }
    }
  , "signInUserSession": null
  }
, "userConfirmed": false
}
"""
