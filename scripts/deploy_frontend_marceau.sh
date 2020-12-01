
#!/usr/bin bash

ssh -t github@marceauclavel.com rm -rf /var/www/0xp-front-angular

npm install
ng build --prod --source-map=false --base-href ./

tar -czvf zero-xp.tar.gz dist/zero-xp
scp zero-xp.tar.gz github@marceauclavel.com:
rm -rf dist zero-xp.tar.gz

ssh -t github@marceauclavel.com tar -xzvf zero-xp.tar.gz
ssh -t github@marceauclavel.com cp -r dist/zero-xp/ www/0xp-front-angular
ssh -t github@marceauclavel.com rm -rf zero-xp.tar.gz dist
ssh -t github@marceauclavel.com cp -r www/zero-xp/assets/* www/0xp-front-angular/assets/

exit 0
