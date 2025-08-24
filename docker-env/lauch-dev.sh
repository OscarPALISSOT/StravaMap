#!/bin/bash
docker run -it --rm \
  -v $(pwd):/home/developer/WKS \
  -w /home/developer/WKS \
  node-dev-env