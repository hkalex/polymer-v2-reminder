#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker rm -f polymer

docker run \
  -d \
  --name polymer \
  -p 8080:80 \
  -v $DIR/..:/usr/share/nginx/html:ro \
  nginx:alpine

#-v $DIR/../build/default:/usr/share/nginx/html:ro \