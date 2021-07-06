#!/usr/bin/sh
rm -rdf dist/
tsc
rm dist/bot/inhibitors/Insiders.js
# make a variable called vps equal a string of the desired deployment location.
# You need the server to accept your GPG key so that no password is required.
# eg: hello@hello.hello
ssh $vps "kill -9 \$(pidof node)"
ssh $vps "rm -rdf /home/cxbot/dist/ /home/cxbot/node_modules/ && rm -f /home/cxbot/package-lock.json /home/cxbot/package.json"
scp -r dist package.json package-lock.json $vps:/home/cxbot
ssh $vps "cd /home/cxbot/ && npm i && node dist >> errors.txt &"
echo "Successfully deployed cxbot"
