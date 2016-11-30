#!/bin/sh
set -e

node_modules/.bin/http-server $(pwd)/dist -a 0.0.0.0 -p 80 -r
