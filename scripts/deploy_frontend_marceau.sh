
#!/usr/bin bash

ssh -t github@marceauclavel.com rm -rf /var/www/front-0xp/*

npm install
ng build --prod --source-map=false --base-href ./

tar -czvf zero-xp.tar.gz dist/zero-xp
scp zero-xp.tar.gz github@marceauclavel.com:
rm -rf dist zero-xp.tar.gz

ssh -t  tar -xzvf zero-xp.tar.gz
ssh -t github@marceauclavel.com cp -r dist/zero-xp/* /var/www/front-0xp/
ssh -t github@marceauclavel.com rm -rf zero-xp.tar.gz dist

exit 0
