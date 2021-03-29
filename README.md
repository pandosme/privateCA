# privateCA
Local private Certificate Authority (CA) using standard OpenSSL with a Node-Red user interface wrapper.  The main purpose is to provide API for other servers to automate certificat signing but the dashboard can be used to sign CSR (Certificate Signing Request) [PEM].

## Installation
1. git clone repository
2. Edit docker-compose.yaml if you need to chage the default port 8443 to something else
3. docker-compose up -d
4. Open Browser and goto http://address:8443/admin
5. On tap "Initialize CA", double click to edit "Set your Data Here" and edit msg.payload {"org":"Acme Inc","passphrase":""}
6. Set the Org value to some name and set a passphrase that will protect the CA private key.  Leaving passphrase empty will set nor passphrase.  Having a passphrase or not depends on how critical the CA is and how well you protect the server.
7. Click Deploy.
8. Open Browser and goto http://address:8443

## API

### GET /certificate/file
Returns CA Certificate as file with name CA_Certificate.crt

### GET /certificate/pem
Returns CA Certificate as text PEM format

### GET /certificates
Returns a JSON array of issued certificates

### GET /certificates/id?filename=some_name
id defines the specific certificates seen in GET /certificates.  If filename is omitted, returns a certificates as PEM text. If filename is set, returns a PEM-file with filename

### POST /sign
Signs a CSR (Certificate Signing Request) and responds the signed certificate in PEM format.
Post body: CSR in PEM format or as a file (form upload)

### GET /cert?cn=some.server.com&o=Organization&passphrase=pass&type=server&days=100
Returns a ZIP file with a generated signed certificate and assiciated private key
* cn (Common Name) is required
* o (Organization) is required
* passphrase is required if CA was initialized with a passphrase
* type (optional) Defines server or client certificate. Server certificate is default
* days (optional) Set how many days certificate is valid. Default = 365

### POST /cert
Same as GET /cert but returns a JSON payload
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
 "passphrase":"if needed",
 "type":"client or server",
 "days": 123,
}
```



