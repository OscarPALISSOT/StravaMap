#!/bin/bash

#import env variables
set -a
source .env
set +a

docker run -it --rm \
  -v $(pwd):/home/developer/WKS \
  -v $(pwd)/docker-env/docker-dev-config/.zshrc:/home/developer/.zshrc \
  -v $(pwd)/docker-env/docker-dev-config/.p10k.zsh:/home/developer/.p10k.zsh \
  -w /home/developer/WKS \
  -p ${AUTHENTICATION_SERVICE_PORT}:${AUTHENTICATION_SERVICE_PORT} \
  node-dev-env