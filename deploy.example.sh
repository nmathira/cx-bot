#!/usr/bin/sh
rm -rdf dist/
tsc
rm dist/bot/inhibitors/Insiders.js
# make a variable called vps equal a string of the desired deployment location.
# You need the server to accept your GPG key so that no password is required.
# eg: hello@hello.hello
ssh $vps "kill -9 \$(pidof node)"
ssh $vps "rm -rdf /home/cxbot/dist/ && rm -f /home/cxbot/yarn.lock /home/cxbot/package.json"
scp -r dist package.json yarn.lock $vps:/home/cxbot
ssh $vps "cd /home/cxbot/ && yarn install && node dist >> errors.txt &"
echo "Successfully deployed cxbot"
