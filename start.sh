#!/bin/bash

TASKKILL //F //IM node.exe
TASKKILL //F //IM msedge.exe

git fetch origin
git reset --hard origin/staging-branch
git checkout staging-branch
git pull

cd "Server" || exit 1
npm install
npm install -g ts-node
#ts-node server.ts &> server.log &
ts-node server.ts  &

cd "../Client" || exit 1
npm install 
npm run build
npm install -g serve
serve -s build &
start msedge --kiosk --edge-kiosk-type="fullscreen" "http://localhost:3000"