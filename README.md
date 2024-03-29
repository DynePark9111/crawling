# crawling

## About

Webtoons crawling App  
Crawl and upload to MongoDB Atlas (node cronjob)

### crawl from...

- [x] [Naver](https://comic.naver.com/webtoon/weekday)
- [x] [Kakao](https://webtoon.kakao.com/original-webtoon)
- [ ] [Kakaopage](https://page.kakao.com/main)

## Get started

1. git clone
2. yarn add
3. create .env file
4. create [MongoDB Atlas](https://account.mongodb.com/account/register) account.
5. create [Kakao](https://accounts.kakao.com/weblogin/create_account/#selectVerifyMethod) account.
6. yarn start

### .env

```
PORT=
MONGODB_URI=
ORIGIN=
ID_KAKAO=
PW_KAKAO=
```

## Stack

- Nodejs
- MongoDB

### Library

- cheerio
  - used for crawling simple websites (Naver)
  - fast / limited features (static websites)
- puppeteer
  - used for crawling more complex websites (Kakao)
  - slower / more features (can crawl almost all websites)

## API

| Method | URL               | Description                                           |
| ------ | ----------------- | ----------------------------------------------------- |
| GET    | /                 | display port                                          |
| GET    | /new              | check all webtoons for update                         |
| GET    | /new/:platform    | check new webtoons length{platform}                   |
| GET    | /db               | check db all webtoons                                 |
| GET    | /db/:platform     | check db {platform}                                   |
| DELETE | /db               | delete db                                             |
| DELETE | /db/:platform     | delete db {platform}                                  |
| GET    | /update           | force update db (crawl new webtoons and upload to db) |
| GET    | /update/:platform | force update db {platform}                            |

### Request parameters

| Field    | options        | Description                         |
| -------- | -------------- | ----------------------------------- |
| platform | (naver, kakao) | optional. default is every platform |
