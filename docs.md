# WonderQ API

## Create new message

Send a post request with message data.
```
POST /v1/api/messages HTTP/1.1
Host: <host>:<port>
Content-Type: application/json

{
    "data" : JSON
}
```

Response body:
```
{
    "id" : UUID
}
```

## Pull messages

Send a get request and optionally define a limit amount on query parameters. Maximum amount o messages per request is 10.

```
GET /v1/api/messages?limit=<limit> HTTP/1.1
Host: <host>:<port>

```

Response body:
```
{
    "id" : UUID,
    "data" : JSON
}
```

## Set message processed

Within <LOCK_MESSAGES_TIMEOUT> ms from pulling messages mark messages as processed.
```
DELETE /v1/api/messages/<UUID> HTTP/1.1
Host: <host>:<port>
``` 

Response body:
```
{ success : boolean }
```