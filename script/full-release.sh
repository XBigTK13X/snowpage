#! /bin/bash

source script/variables.sh

export NODE_ENV="production"

echo "=-=- Build the apks -=-="
script/prod-generate-apks.sh

echo "=-=- Push the apks up to the file server -=-="
~/script/push-apks.py snowpage

echo "=-=- Deploy the apks to all devices -=-="
~/script/remote-adb.py All deploy_snowpage

unset NODE_ENV