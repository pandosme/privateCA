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

## Get signed certificate file
### GET /file/crt?name=Some_Common_Name
Returns a singed certificate file (if avaialable)
### Resonse
A file


