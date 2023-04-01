#!/usr/bin/env bash
set -euo pipefail

rm -rf exports/*
./bin/build_index.rb
mkdir -p /tmp/build
taylor export --build-cache /tmp/build
pushd exports
unzip 'Taylor Playground-web-v0.0.1.zip'
popd
