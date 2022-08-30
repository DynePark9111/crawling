# crawling

### About

Updated webtoons crawling App  
Crawl and upload to MongoDB Atlas (node cronjob)  
Able to crawl

- [x] Naver
- [x] Kakao
- [ ] Kakaopage
- [ ] Lezhin
- [ ] TopToon
- [ ] Bomtoon
- [ ] Tomics
- [ ] Comico

### stopped updating crawling feature because...

1. Kakao and Kakaopage have same webtoons.
2. Kakaopage, Lezhin, and others aren't free.
3. TopToon is mostly adult content, require adult verification service.

### Get started

- git clone
- yarn add
- create .env file
  - create Mongodb atlas account. [link](https://account.mongodb.com/account/register)
  - create kakao account. [link](https://accounts.kakao.com/weblogin/create_account/#selectVerifyMethod)
- yarn start

### .env

PORT=
MONGODB_URI=
ORIGIN=
ID_KAKAO=
PW_KAKAO=

### Stack

- nodejs(express)
- mongoDB

### Library

- cheerio
  - used for crawling simple websites (Naver)
  - fast / limited features (static websites)
- puppeteer
  - used for crawling more complex websites (Kakao)
  - slower / more features (can crawl almost all websites)

### API

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

#### Request parameters

| Field    | options        | Description                         |
| -------- | -------------- | ----------------------------------- |
| platform | (naver, kakao) | optional. default is every platform |
