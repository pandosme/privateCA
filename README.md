# privateCA
A CA (Certificate Authority) built around OpenSSL with a Node-Red wrapper interface.

The purpose for this CA is to provide a CA for educational and demonstration purposes.  You may run it in a less critical production system if you take additional hardening precautions such as reduced exposure, adding authentication to Node-RED and use a strong passphrase for the CA.  After initializing the CA certificate and private key, the server provides a dashboard and API for signing CSR and requesting certificates (server or client) with private key or as P12.

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
5. Open Browser and goto http://address:8443
6. On tab "CA initialize", double click to edit "Set CA settings here".
7. Click Deploy
8. Click the inject node "Initialize CA".
9. Open Browser and goto http://address:8443/ui.  
You should be good to go...

It is recommeded to add authetication in the settings.js file.

# Changelog

## 3.1.0
- Fixed browser connection timeout when user clicks download links
- Added SubjectAltName in CSR when requesting a certificate.  Required by some browsers.

## 3.0.0  BREAKING CHANGES
- Refactory to simplify interfaces and logic

## 2.4.0 
- General cleanup
- Include CA certificate in ZIP file when requesting client or server certificate

## 2.2.0 
Requesting server and client certs in dashboard is moved from its own page to buttons on the home page. 

## 2.1.0 Breaking changes
The openssl directory structure is removed from reposiroty and created when initializing the CA
- General cleanup
- Simplifying flows tab

## 2.0.0
- Cleanup
- Extended API

## 1.x Development versions

