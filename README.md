# nodejs-service

## Requirements

```
Nodejs 14+
Npm

Redis
MongoDB 4+
```

## PRODUCTION ON HEROKU
```
https://liko-nodejs-service.herokuapp.com/health
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
GET [```https://liko-nodejs-service.herokuapp.com/ok```](https://liko-nodejs-service.herokuapp.com/ok)
CURL ```curl https://liko-nodejs-service.herokuapp.com/ok```
Response:
```
{
    "status": "ok"
}
```

## GET HEALTH
GET [```https://liko-nodejs-service.herokuapp.com/health```](https://liko-nodejs-service.herokuapp.com/health)
CURL ```curl https://liko-nodejs-service.herokuapp.com/health```
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
GET [```https://liko-nodejs-service.herokuapp.com/token```](https://liko-nodejs-service.herokuapp.com/token)
CURL ```curl https://liko-nodejs-service.herokuapp.com/token```
Response:
```
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMS0wNy0xMFQxODo1MTo0NC40NDNaIiwiaWF0IjoxNjI1OTQzMTA0LCJleHAiOjE2MjU5NDY3MDR9.6t5qrgLLBVGzsPLHNYv_ijQko1DCgx89sJ5wMWnbG58"
}
```

## CREATE USER
POST ```https://liko-nodejs-service.herokuapp.com/user```
CURL 
```
curl --location 
--request POST 'localhost:8000/user' 
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMS0wNy0xMFQxOTozNzoxMi41MTlaIiwiaWF0IjoxNjI1OTQ1ODMyLCJleHAiOjE2MjU5NDk0MzJ9.uMQ86q1lRWPwiJ186tkS40eLQFSaO72Pzcll4APQ9sM' 
--header 'Content-Type: application/json' 
--data-raw '{"user":"user","email":"user@mail.com","accountNumber":123,"identityNumber":123}'
```
Response:
```
{
    "success": true
}
```

## GET USER BY ACCOUT
GET ```https://liko-nodejs-service.herokuapp.com/user/account?accountNumber=123```
CURL
```
curl --location --request GET 'https://liko-nodejs-service.herokuapp.com/user/account?accountNumber=123' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMS0wNy0xMFQyMDozMToxOC4xNzlaIiwiaWF0IjoxNjI1OTQ5MDc4LCJleHAiOjE2MjU5NTI2Nzh9.Cd0mNqklpEBQ0EKWEZ38IFYKv-JyBzkgCEdefca0kAM'
```
Response:
```


{
    "success": true,
    "user": {
        "_id": "60ea03d51d12aa0015be99f1",
        "user": "user",
        "email": "user@mail.com",
        "accountNumber": 123,
        "identityNumber": 123
    }
}
```

## GET USER BY IDENTITY NUMBER
GET ```https://liko-nodejs-service.herokuapp.com/user/identity?identityNumber=123```
CURL
```
curl --location --request GET 'https://liko-nodejs-service.herokuapp.com/user/identity?identityNumber=123' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMS0wNy0xMFQyMToxNjoyNy40ODJaIiwiaWF0IjoxNjI1OTUxNzg3LCJleHAiOjE2MjU5NTUzODd9.Pjnjn1Mko_BxO9VN4YQfOCCYPdJ82kUZiI3nqcjxFt8'
```
Response:
```
{
    "success": true,
    "user": {
        "_id": "60ea03d51d12aa0015be99f1",
        "user": "user",
        "email": "user@mail.com",
        "accountNumber": 123,
        "identityNumber": 123
    }
}
```


## UPDATE USER BY ID
PUT ```https://liko-nodejs-service.herokuapp.com/user/60ea03d51d12aa0015be99f1```
CURL
```
curl --location --request PUT 'https://liko-nodejs-service.herokuapp.com/user/60ea03d51d12aa0015be99f1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMS0wNy0xMFQyMDozMToxOC4xNzlaIiwiaWF0IjoxNjI1OTQ5MDc4LCJleHAiOjE2MjU5NTI2Nzh9.Cd0mNqklpEBQ0EKWEZ38IFYKv-JyBzkgCEdefca0kAM' \
--header 'Content-Type: application/json' \
--data-raw '{"user":"newtest","email":"newtest@gmail.com"}'
```
Response:
```
{
    "success": true
}
```

## DELETE USER BY ID
DELETE ```https://liko-nodejs-service.herokuapp.com/user/60e9e44b255e9b9de304f4eb```
CURL
```
curl --location --request DELETE 'https://liko-nodejs-service.herokuapp.com/user/60e9e44b255e9b9de304f4eb' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMS0wNy0xMFQxNzozNDoyOC4xNzFaIiwiaWF0IjoxNjI1OTM4NDY4LCJleHAiOjE2MjU5NDIwNjh9.kCGASaWW412MAqRVTPeoiQr6j0WotBWXMcZFbLFv_Jw'
```
Response:
```
{
    "success": true
}
```


