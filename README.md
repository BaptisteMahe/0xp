# 0xp

Site Live at http://persil.ovh1.ec-m.fr/zero-xp

## Installation
copier le repo
~~~shell
git clone https://github.com/BaptisteMahe/0xp.git
~~~

### Exécuter le Backend
~~~shell
cd 0xp/back-node
~~~
Installer les packages et lancer le server
~~~shell
npm install
npm run dev
~~~

### Exécuter le FrontEnd
Dans une autre console
~~~shell
cd 0xp/front-angular
~~~
Installer les packages et exécuter le server angular de dev
~~~shell
npm install
ng serve --open
~~~

## Note bonne pratique
On va toujours préférer rebase plutôt que simplement pull les branch pour cela :
~~~shell
git config --global pull.rebase merges
~~~
