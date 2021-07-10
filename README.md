# nodejs-service

## Requirements

```
Nodejs 14+
Npm

Redis
MongoDB 4+
```

## Dir Map
**src/** - Source code, ES6+<br>
**dist/** - Build by babel<br>
**package.json**<br>

## Commands
```npm install```
```npm run test```
```npm run build```
```npm run dev```
```npm run validate```
```npm run clean```

CRUD apis are secured by authorization header token (JWT), expired every 60m.
To get authorization token we simply get from this url: 

## GET OK
GET ```http://localhost:8000/ok```
CURL ```curl http://localhost:8000/ok```
Response:
```
{
    "status": "ok"
}
```

## GET HEALTH
GET ```http://localhost:8000/health```
CURL ```curl http://localhost:8000/health```
Response:
```
{
    "pid": 40209,
    "name": "NODEJS-SERVICE",
    "version": "1.0.0",
    "port": 8000,
    "uptimeSec": 33.781127598
}
```

## GET TOKEN
GET ```http://localhost:8000/token```
CURL ```curl http://localhost:8000/token```
Response:
```
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMS0wNy0xMFQxODo1MTo0NC40NDNaIiwiaWF0IjoxNjI1OTQzMTA0LCJleHAiOjE2MjU5NDY3MDR9.6t5qrgLLBVGzsPLHNYv_ijQko1DCgx89sJ5wMWnbG58"
}
```

## POST USER
POST ```http://localhost:8000/user```
CURL ```
curl --location --request POST 'localhost:8000/user' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMS0wNy0xMFQxOTozNzoxMi41MTlaIiwiaWF0IjoxNjI1OTQ1ODMyLCJleHAiOjE2MjU5NDk0MzJ9.uMQ86q1lRWPwiJ186tkS40eLQFSaO72Pzcll4APQ9sM' \
    --header 'Content-Type: application/json' \
    --data-raw '{"user":"user","email":"user@mail.com","accountNumber":123,"identityNumber":123}'
```
Response:
```
{
    "success": true
}
```
