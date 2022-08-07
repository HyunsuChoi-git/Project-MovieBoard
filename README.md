# React-Springboot Movieboard 프로젝트

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

'''txt
import 'bootstrap/dist/css/bootstrap.min.css';
'''

### 프로젝트 세팅

- .prettierrc
  '''json
  {
  "sigleQuote" : true,
  "semi":true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth" : 80
  }
  '''

- application.yml
'''txt
server:
  port: 8080
  servlet:
    encoding:
      charset: utf-8   # 들어오는 모든 데이터를 utf-8로 받겠다. 
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
      ddl-auto: update # create(서버 실행마다 테이블 새로 만들어짐), update(서버꺼져도 기존테이블 안사라짐), none
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
        #모델 네이밍에 맞출 것임을 명시함. 내가 적은 이름 그대로 컬럼명 만들어짐 
    show-sql: true
    database: mysql
      
  servlet:
    multipart:
      max-file-size: 50MB
      max-request-size: 50MB

'''
