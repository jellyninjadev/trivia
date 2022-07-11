#!/bin/bash

set -eo pipefail

# iOS
IPA_URL=$(curl -sS https://expo.io/--/api/v2/versions | python -c 'import sys; import json; print json.load(sys.stdin)["iosUrl"]')

# ANdroid
# APK_URL=$(curl -sS https://expo.io/--/api/v2/versions | python -c 'import sys, json; print json.load(sys.stdin)["androidUrl"]')

#curl -o /tmp/Exponent.tar.gz "$IPA_URL"

# CircleCI path
tar -C ~/project/e2e/Exponent.app -xzf /tmp/Exponent.tar.gz
