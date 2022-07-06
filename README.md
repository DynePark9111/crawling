# crawling

### About

Updated Webtoons crawling App  
Crawl and upload to MongoDB Atlas (cronjob)  
Able to crawl

- [x] Naver
- [ ] Kakao
- [ ] Kakaopage

### Stack

- nodejs(express)
- mongoDB

### API

| Method | URL                   | Description                         |
| ------ | --------------------- | ----------------------------------- |
| GET    | /                     | display port                        |
| GET    | /check                | check all webtoons for update       |
| GET    | /check/naver          | check new webtoons length(Naver)    |
| GET    | /check/db/:platform   | check db {platform}                 |
| GET    | /update               | update all (crawl and upload to db) |
| GET    | /update/naver         | update naver                        |
| GET    | /test                 | for testing db                      |
| GET    | /test/reset/:platform | delete db {platform}                |

### params

- platform : naver
