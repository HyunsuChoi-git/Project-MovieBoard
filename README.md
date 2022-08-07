# React-Springboot Movieboard 프로젝트

React.js, SpringBoot를 이용하여 영화를 등록하고 감상평을 서로 공유할 수 있는 사이트를 만들었습니다.

OS : Windows
프레임워크 : React.js, Springboot
DB : MySQL
개발환경 : VScode, eclips
개발인원 : 1명
개발기간 : 3주

#### 주요기능
- 영화목록 보기(HOME화면), 영화정보 및 user 감상평 보기, 회원가입, 로그인 (모든 권한)
- 회원정보수정, 로그아웃 (USER권한 이상)
- 영화감상평 등록, 감상평 수정, 감상평 삭제 (본인 및 MANAGER권한 이상)
- 영화정보 등록, 영화정보 수정, 영화정보 삭제 (ADMIN 권한 이상)

### 스프링부트

- Springboot ^2.0
- JPA
- MySQL
- Lombock
- JUnit5
- Spring security
- JWT


### React

- yarn add react-router-dom
- yarn add redux react-redux
- yarn add react-bootstrap bootstrap
- yarn add styled-components
- yarn add @fortawesome/fontawesome-svg-core
- yarn add @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
- yarn add @fortawesome/react-fontawesome@latest

```txt
import 'bootstrap/dist/css/bootstrap.min.css';
```

### 프로젝트 세팅

- .prettierrc
  ```json
  {
  "sigleQuote" : true,
  "semi":true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth" : 80
  }
  ```

- application.yml
  ```yml
  server:
    port: 8080
    servlet:
      encoding:
        charset: utf-8  
        enabled: true
        force: true

  spring:
    datasource:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://localhost:3306/movieboard?serverTimezone=Asia/Seoul&&useSSL=false
      username: root
      password: 1234

    jpa:
      hibernate:
        ddl-auto: update 
        naming:
          physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
      show-sql: true
      database: mysql

    servlet:
      multipart:
        max-file-size: 50MB
        max-request-size: 50MB

  ```
