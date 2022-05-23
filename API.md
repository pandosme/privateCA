# API for privateCA

## Sign CSR
Signs a CSR PEM data and returns a filename that can be used to fetch the signed certificate file
### POST: /sign
```
{
  "PEM": "-----BEGIN CERTIFICATE REQUEST-----MIICXjCCAUY...",
  "caPassphrase": "The secret passphrase",
  "type": "server" or "client" [default="server"],
  "filename": "The filename the cert shall have"
}
```
### Response
```
{
  "filename":"The_filename_the_cert_shall_have",
  "type":"server",
  "days":365,
  "timestamp":"YYYY-MM-DDThh:mm:ss.xxxZZ"
}
```

## Request certificate
Generates a signed certificate and private key and retuns a filename that is used to fetch the certificate file, private key, combined in a ZIP file or as a P12 file.
### POST: /request
```
{
  "cn": "Some Common Name",
  "caPassphrase": "The secret passphrase",
  "type": "server" or "client" [default="server"],
  "keylength": number of bits [default=2048],
  "days": number day befofe expiration [default=365]
}
```
### Response
```
{
	"cn":"Some Common Name",
	"type":"server",
	"keylength":2048,
	"days":365,
	"filename":"Some_Common_Name",
	"timestamp":"YYYY-MM-DDThh:mm:ss.xxxZZ"
}
```

## Make P12
Generates P12 file from a previous requested certificate (if available on server).
### POST: /p12
```
{
  "filename": "Some_Common_Name",
  "passphrase": "The secret passphrase for the P12"
}
```
### Response
```
{
	"p12":"Some_Common_Name",
	"timestamp":"YYYY-MM-DDThh:mm:ss.xxxZ"
}
```

## Get signed certificate file
### GET /file/crt?name=Some_Common_Name
Returns a singed certificate file (if avaialable)
### Resonse
A file

## Get private key file
### GET /file/key?name=Some_Common_Name
Returns the private key file (if avaialable)
### Resonse
A file

## Get certificate and private key as a ZIP file
### GET: /file/zip?name=Some_Common_Name
Returns the private key file (if avaialable)
### Resonse
A ZIP file containing
- Signed certificate
- Private key file
- CA certificate

## Get P12 file
### GET: /file/p12?name=Some_Common_Name
Gets the P12 file generate with POST:/p12 (if available)
### Resonse
P12 file

## Delete certificate files on server
After generating and fetching files it is recommeded to remove them from the server.
Removes:
- Some_Common_Name.crt
- Some_Common_Name.csr
- Some_Common_Name.key
- Some_Common_Name.p12
## DELETE: /file
```
{
  "filename": "Some_Common_Name"
}
```
### Response
OK

