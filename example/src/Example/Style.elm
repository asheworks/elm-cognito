module Example.Style
    exposing
        ( CssClasses(..)
        , CssIds(..)
        , cssNamespace
        , css
        )

import Css exposing (..)
import Css.Elements as Elements
import Html.CssHelpers exposing (Namespace, withNamespace)
import Css.Namespace exposing (namespace)
-- import Styles.Colors exposing (..)


type CssClasses
    = Component


type CssIds
    = None


cssNamespace : Namespace String a b c
cssNamespace =
    withNamespace "Example_"


css : Stylesheet
css =
    (stylesheet << namespace cssNamespace.name)
        [ (.) Component
            []
        ]
