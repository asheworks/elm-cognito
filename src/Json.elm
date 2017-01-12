module Json exposing (..)

import Model exposing (..)


--

import Json.Decode exposing (..)
import Json.Decode.Pipeline exposing (decode, required, optional)


decodeCredentials : Decoder Credentials
decodeCredentials =
    decode Credentials
        |> required "expired" bool
        |> required "expireTime" (nullable string)
        |> required "accessKeyId" string


decodeHttpOptions : Decoder HttpOptions
decodeHttpOptions =
    decode HttpOptions
        |> required "timeout" int


decodeRetryDelayOptions : Decoder RetryDelayOptions
decodeRetryDelayOptions =
    decode RetryDelayOptions
        |> required "base" int


decodeEndpoint : Decoder Endpoint
decodeEndpoint =
    decode Endpoint
        |> required "protocol" string
        |> required "host" string
        |> required "port" int
        |> required "hostname" string
        |> required "pathname" string
        |> required "path" string
        |> required "href" string


decodeApiVersions : Decoder ApiVersions
decodeApiVersions =
    decode ApiVersions


decodeConfig : Decoder Config
decodeConfig =
    decode Config
        |> required "credentials" decodeCredentials
        |> required "credentialProvider" (nullable string)
        |> required "region" string
        |> required "logger" (nullable string)
        |> required "apiVersions" decodeApiVersions
        |> required "apiVersion" string
        |> required "endpoint" string
        |> required "httpOptions" decodeHttpOptions
        |> required "maxRedirects" int
        |> required "paramValidation" bool
        |> required "sslEnabled" bool
        |> required "s3ForcePathStyle" bool
        |> required "s3BucketEndpoint" bool
        |> required "computeChecksums" bool
        |> required "convertResponseTypes" bool
        |> required "correctClockSkew" bool
        |> required "customUserAgent" (nullable string)
        |> required "dynamoDbCrc32" bool
        |> required "systemClockOffset" int
        |> required "signatureVersion" string
        |> required "signatureCache" bool
        |> required "retryDelayOptions" decodeRetryDelayOptions


decodeClient : Decoder Client
decodeClient =
    decode Client
        |> required "config" decodeConfig
        |> required "isGlobalEndpoint" bool
        |> required "endpoint" decodeEndpoint


decodePool : Decoder Pool
decodePool =
    decode Pool
        |> required "userPoolId" string
        |> required "clientId" string
        |> required "paranoia" int
        |> required "client" decodeClient


decodeUser : Decoder User
decodeUser =
    decode User
        |> required "username" string
        |> required "pool" decodePool
        |> required "AuthState" (nullable string)
        |> required "client" decodeClient
        |> required "signInUserSession" (nullable string)


decodeSignUpResponse : Decoder SignUpResponse
decodeSignUpResponse =
    decode SignUpResponse
        |> required "user" decodeUser
        |> required "userConfirmed" bool
