# 0xp

Site Live at http://persil.ovh1.ec-m.fr/zero-xp/home

## Installation
copier le repo
~~~shell
git clone https://github.com/BaptisteMahe/0xp.git
~~~

~~~shell
cd 0xp/back-node
~~~
Installer les packages et lancer le server
~~~shell
npm install
npm run dev
~~~

Dans une autre console
~~~shell
cd 0xp/front-angular
~~~
Installer les packages et serve le fron
~~~shell
npm install
ng serve --open
~~~

## Note bonne pratique
On va toujours préférer rebase plutôt que simplement pull les branch pour cela :
~~~shell
git config --global pull.rebase merges
~~~
Code for Centrale's option "Digital.e" : 0xp website, find your first xp

## Bien nommer ses branches et ses commits

Pour une modification en relation au ticket ZXP-XX \
nom de la branche **monprenom-ZXP-XX** \
message de commit **ZXP-XX monmessagedecommit**
