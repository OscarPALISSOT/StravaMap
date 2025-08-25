#!/bin/bash
docker run -it --rm \
  -v $(pwd):/home/developer/WKS \
  -v $(pwd)/docker-env/docker-dev-config/.zshrc:/home/developer/.zshrc \
  -v $(pwd)/docker-env/docker-dev-config/.p10k.zsh:/home/developer/.p10k.zsh \
  -w /home/developer/WKS \
  node-dev-env