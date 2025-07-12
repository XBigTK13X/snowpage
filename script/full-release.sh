#! /bin/bash

export NODE_ENV="production"

echo "=-=- Build the apks -=-="
script/prod-generate-apks.sh

echo "=-=- Push the apks up to the file server -=-="
~/script/push-apks.sh snowpage

echo "=-=- Deploy the apks to all devices -=-="
~/script/remote-adb.py

unset NODE_ENV