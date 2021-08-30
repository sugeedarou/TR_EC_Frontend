# TR_EC_Frontend
### This repository contains the frontend code of TR_EC
## Setup
### Install the Ionic Framework and Angular
npm install -g @ionic/cli\
npm i -D -E @angular/cli
### Run a development server at http://localhost:8100
ionic serve
### Run a development server that can be accessed inside the same LAN
ionic serve --external\
\
*The IP-address to connect to will be written in the terminal output as "External: IP"*
## Compile for production
ionic build --prod\
\
*The output html files will be written to TR_EC_Frontend/www\
Copy them onto a webserver to provide the frontend to users.*