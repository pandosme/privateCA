# privateCA
A docker-compose repository that provides a private Certificate Authority (CA) using OpenSSL with a Node-Red wrapper interface.

The main purpose is to provide a CA with an API for other servers to automate certificat signing.  The dashboard can be used for manually signing CSR (Certificate Signing Request). The Dashboard also provides a list of all issued certificates and also a tab for inspecting certificate information.

## Prerequisite 
A Linux computer (Rasberry PI will do) with the following installed
- npm
- Docker
- Docker-compose
- Git

## Installation
1. In your home directory
1. ```git clone git@github.com:pandosme/privateCA.git```
2. ```cd privateCA```
3. ```npm install```
3. ```nano docker-compose.yaml``` if you need to chage the default port 8443 to something else
4. ```docker-compose up -d```
5. Open Browser and goto http://address:8443/admin
6. On tab "CA initialize", double click to edit "Set CA settings here".
7. Click Deploy
8. Click the inject node "Initialize CA".
9. Open Browser and goto http://address:8443/ui.  You are good to go...

