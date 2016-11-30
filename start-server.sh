#!/bin/sh
set -e

node_modules/.bin/http-server $(pwd)/static -a 0.0.0.0 -p 80 -r
