#!/usr/bin bash

ssh -t persil@ovh1.ec-m.fr screen -X -S node quit
ssh -t persil@ovh1.ec-m.fr screen -wipe
ssh -t persil@ovh1.ec-m.fr rm -rf node/0xp


ssh -t persil@ovh1.ec-m.fr mkdir node/0xp
scp config.json package-lock.json package.json server.js persil@ovh1.ec-m.fr:node/0xp

ssh -t persil@ovh1.ec-m.fr mkdir node/0xp/controllers
scp controllers/* persil@ovh1.ec-m.fr:node/0xp/controllers

ssh -t persil@ovh1.ec-m.fr mkdir node/0xp/modules
scp modules/* persil@ovh1.ec-m.fr:node/0xp/modules

ssh -t persil@ovh1.ec-m.fr source launch_node_server.sh 0xp

exit 0