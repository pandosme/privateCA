# privateCA
A docker-compose repository that provides a private Certificate Authority (CA) using OpenSSL with a Node-Red wrapper interface.

The main purpose is to provide a CA with an API for other servers to automate certificat signing.  The dashboard can be used for manually signing CSR (Certificate Signing Request). The Dashboard also provides a list of all issued certificates and also a tab for inspecting certificate information.

## Prerequisite 
A Linux computer (Rasberry PI will do) with the following installed
- Docker
- Docker-compose
- Git

## Installation
1. git clone repository
2. cd privateCA
3. nano docker-compose.yaml if you need to chage the default port 8443 to something else
4. docker-compose up -d
5. Open Browser and goto http://address:8443/admin
6. On tab "Initialize CA", double click to edit "Set your Data Here" and edit msg.payload
```
{
  "org":"Acme Inc",
  "passphrase":""
}
``` 
6. Set the Org value to some name and set a passphrase that will protect the CA private key.  Leaving passphrase empty will create a key with no passphrase.  Having a passphrase or not depends on how critical the CA is and how well you protect the server.  For sandbox testing you can leave the passphrase empty (for convinence).
7. Click Deploy
8. Click inject node for "Set your Data Here".  This will generate CA private key and CA certificate.  Note that every time you click that inject it will generate  a new key (overwrite) and certificate.  The key will have 4096 bits RSA and valid for 10 years.
9. Open Browser and goto http://address:8443.  You are good to go...

## API

### GET /certificate/file
Returns CA Certificate as file with name CA_Certificate.crt

### GET /certificate/pem
Returns CA Certificate as text PEM format

### GET /certificates
Returns a JSON array of issued certificates

### GET /certificates/id?filename=some_name
Gets a previous signed certificate. id identifies the specific certificate listed in GET /certificates.  If filename is omitted, returns a certificates as PEM text. If filename is set, returns a PEM-file with filename

### POST /sign
Signs a CSR (Certificate Signing Request) and responds the signed certificate in PEM format.

Post body:
```
{
  "csr":"-----BEGIN CERTIFICATE REQUEST-----...",
  "passphrase":"If required",
  "type":"server || client",
  "days":123
}
```
Response:
Signed certificate in PEM format

### GET /cert?cn=some.server.com&o=Organization&passphrase=pass&type=server&days=100
A quick way to generates and sign a certificate with and a private key.  Private keys are nevere stored in the server.  If you loose the key, generate a new certificate.

Returns a ZIP file with a generated signed certificate and the private key
* cn (Common Name) is required
* o (Organization) is required
* passphrase is required if CA was initialized with a passphrase
* type (optional) Defines server or client certificate. Server certificate is default
* days (optional) Set how many days certificate is valid. Default = 365

### POST /cert
Same as GET /cert but returns a JSON payload (for automation)
```
{
  "cert":"...PEM data..",
  "key":"...PEM data..."
}
```

Post body:
```
{
 "cn":"required",
 "o":"required",
 "passphrase":"The CA passphrase if needed",
 "type":"client or server",
 "days": 123,
}
```
