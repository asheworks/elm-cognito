port module Stylesheets exposing (main)

import Css.File exposing (CssFileStructure, CssCompilerProgram, compile, toFileStructure)


import Reset as Reset

import Example.Style as Example
-- import LogIn.Style as LogIn

port files : CssFileStructure -> Cmd msg


cssFiles : CssFileStructure
cssFiles =
    toFileStructure
        [ ( "global.css"
          , compile
                [ Reset.css
                ]
          )
        , ( "styles.css"
          , compile
                [ Example.css
                ]
          )
        , ( "components.css"
          , compile
            [ --LogIn.css
            ]
        )
        ]


main : CssCompilerProgram
main =
    Css.File.compiler files cssFiles