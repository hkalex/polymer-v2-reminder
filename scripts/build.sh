#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

(cd .. && polymer build --bundle --js-minify --css-minify --html-minify)
