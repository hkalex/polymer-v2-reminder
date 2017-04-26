#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# (cd $DIR/../build/default && bower install)

cp -rf $DIR/../bower_components/* $DIR/../build/default/bower_components
