# privateCA
A CA (Certificate Authority) built around OpenSSL with a Node-Red wrapper interface.

The purpose for privateCA is to provide a CA for educational and demonstration purposes.  You may run it in a less critical production system if you take additional hardening precautions such as reduced exposure, adding authentication to Node-RED and use a strong passphrase for the CA.  After initializing the CA certificate and private key, the server provides a dashboard and API for signing CSR and requesting certificates (server or client) with private key or as P12.

## Prerequisite 
A Node-RED instance with projects enabled, preferably running in a docker container.

## Installation
1. Create a Node-RED docker instance with project settings enabled
2. From Node-RED projects, clone ```[git clone git@github.com:pandosme/privateCA.git](https://github.com/pandosme/privateCA.git)```  
You may need to manually install ```node-red-contrib-zip```
4. On tab "CA initialize", double click to edit "Set CA settings here".
5. Click Deploy
6. Click the inject node "Initialize CA".
13. Go to the Node-RED Dashboard
You should be good to go...

For browsers to trust the signed server certitificate they must install the CA certificate.  Each client needs to download the CA certificate and install it as a trusted CA. In Windows, Chrome and Edge us the system certificate store (double-click the downloaded CA certificate).   Firefox requires to install it in the browsers certificate store under menu "Settings".  The browser needs to be restarted after the CA certificate is installed. 

Note that everytime the CA is initialized, all the files generated by a previous CA initialization will be flushed.  Be cautions not to unintionally flush a CA in use.
If the privateCA is used for education it may be a good idea to flush the CA between each class.

# Changelog

## 3.2.0
- Changed repository to only include flows and package, targeting cloning directly from Node-RED projects
- Modified the Reuest Certificate GUI to only provide one ZIP file containing cert, private key and P12.

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

