#!/bin/bash

set -eo pipefail

# iOS
# IPA_URL=$(curl -sS https://expo.io/--/api/v2/versions | python -c 'import sys; import json; print json.load(sys.stdin)["iosUrl"]')

# ANdroid
# APK_URL=$(curl -sS https://expo.io/--/api/v2/versions | python -c 'import sys, json; print json.load(sys.stdin)["androidUrl"]')

curl -o /tmp/Exponent.tar.gz https://dpq5q02fu5f55.cloudfront.net/Exponent-2.24.3.tar.gz

mkdir -p ~/project/e2e/Exponent.app

# CircleCI path
tar -C ~/project/e2e/Exponent.app -xzf /tmp/Exponent.tar.gz
