# API for privateCA

## Request certificate

### POST: /request
```
{
  "cn": "Some Common Name",
  "caPassphrase": "The secret passphrase",
  "type": "server" or "client" [default="server"]
  "keylength": number of bits [default=2048],
  "days": number day befofe expiration [default=365]
}
```
### Response
```
```
