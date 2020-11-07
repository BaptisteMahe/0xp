#!/usr/bin bash

ssh -t persil@ovh1.ec-m.fr rm -rf www/zero-xp

npm install
ng build --prod --base-href ./

tar -czvf zero-xp.tar.gz dist/zero-xp
scp zero-xp.tar.gz persil@ovh1.ec-m.fr:
rm -rf dist zero-xp.tar.gz

ssh -t persil@ovh1.ec-m.fr tar -xzvf zero-xp.tar.gz
ssh -t persil@ovh1.ec-m.fr cp -r dist/zero-xp www/
ssh -t persil@ovh1.ec-m.fr rm -rf zero-xp.tar.gz dist
ssh -t persil@ovh1.ec-m.fr cp -r www/zero-xp/assets/* www/assets/

exit 0