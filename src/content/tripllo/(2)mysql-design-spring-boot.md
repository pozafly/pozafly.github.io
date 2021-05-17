---
layout: post
title: '(2) MySQL 설계 & SpringBoot init'
author: [Pozafly]
tags: [Tripllo 제작기, MySQL, SpringBoot]
image: ../img/tripllo/tripllo2.png
date: '2021-02-03T12:03:47.149Z'
draft: false
excerpt: Tripllo 백엔드 세팅을 해보자. Workbench로 DB를 설계하고 MySQL, MyBatis와 SpringBoot를 연동한다.
---

> Tripllo 백엔드 세팅을 해보자. Workbench로 DB를 설계하고 MySQL, MyBatis와 SpringBoot를 연동한다.

## 웹 개발 절차

통상적인 웹 개발 절차는

- 요구사항 -> 서비스 기획 -> UI, UX 상세 설계 -> GUI 디자인 -> 퍼블리싱 -> 백엔드 API 개발 -> 프론트엔드개발 -> QA

순이라고 한다. 요구사항, 서비스 기획, UI, UX 상세설계, GUI 디자인은 이미 나와있는 Trello 어플리케이션을 참고할 것이기 때문에 계획 할 필요는 없을 것 같고, DB 설계를 잡아두고 나중에 내가 추가하고 싶은 기능에 따라 유동적으로 테이블을 수정해나가기로 했다. 그리고 생성된 DB에 SpringBoot 프로젝트를 연동까지.

가장 먼저 DB 설계가 필요했다. DB 설계는 MySQL 워크벤치를 사용했다.

<br/>

<br/>

## DB설계

첫 설계는 이렇다.

<img width="922" alt="스크린샷 2021-02-04 오전 9 40 57" src="https://user-images.githubusercontent.com/59427983/106828257-2d57f500-66cd-11eb-94bb-f1736bf8db4c.png">

user는 id를 pk로 각 사람을 구분하고, user는 여러개의 board를 가질 수 있다. board -> list -> card 로 이어지는 1:N 관계가 가장 기본이 되는 뼈대라고 생각했다. comment는 user는 여러개의 comment를 가질 수 있고, card또한 여러개의 comment를 가질 수 있다. 그리고 card의 정보가 다양할 것이라고 생각해서 card_detail 이라는 테이블을 한개 더 생성했다. 지금은 결국 card_detail이 없어지고 card 에 포함이 된 상태이다.

이번에 MySql 워크밴치를 사용하면서 알게되었던 것은 워크밴치의 ERD 설계가 그려질 때, DB에 실시간으로 반영되는 형태가 아니라 전부 다 그려진 뒤 MySql 스크립트를 자동으로 생성해주고, 스크립트가 실행되어 Table, column, relation을 생성해준다는 것이다. 그리고 기존에 만들어져있던 스키마 기반으로 다시 ERD를 그려줘서 위의 사진과 같이 관계도를 볼 수 있고, 수정 후 다시 스크립트를 생성, 실행하는 구조이다.

<br/>

### Workbench ERD 사용하기

#### Reverse Engineer

Reverse Engineer는 DB를 도식화 해서 보기 좋고, 관계를 한눈에 파악하기 쉬워서 개발하면서 몇번이고 들어가서 보기 좋았던 기억이라 간략하게 기록해두기로 한다.

![스크린샷 2021-02-04 오전 10 08 43](https://user-images.githubusercontent.com/59427983/106830274-0f8c8f00-66d1-11eb-8e03-32f2bd566bf4.png)

스키마가 생성되어있는 DB에서 상단탭 -> Database -> Reverse Engineer.. 를 클릭하면 Connection 설정 탭이 나온다. 자신의 로컬 환경에 맞는 connection 정보를 세팅 후(기존에 connection이 되어있으면 자동으로 된다.) Continue를 누르면

![image](https://user-images.githubusercontent.com/59427983/106830391-5da19280-66d1-11eb-9af0-d7da050fbd3f.png)

다음과 같이 스키마를 선택할 수 있는 화면이 나온다. 해당 스키마를 선택해주고 Continue. 그리고 Import MySQL Table Objects 가 나오는데 우리는 filter 할 필요 없이 전부를 ERD 화면에 불러올 것이기 때문에 아무것도 하지 않고 Execute를 눌러주자. 그러면 이 포스팅의 가장 상단에 나와있는 그림이 우리를 맞이할 것이다.

테이블 위치를 수정해가면서 볼 수 있고, 해당 테이블을 더블클릭해서 칼럼이나 데이터 타입, FK 설정(관계설정) 등 원하는대로 할 수 있다.

<br/>

#### Forward Engineer

중요한 것은 여기서 Diagram을 다시 나의 DB에 적용시키는 것인데, 아래 사진과 같이 이번엔 Reverse Enginner가 아니라 `Forward Engineer`를 눌러서 적용시켜줄 수 있다.

![image](https://user-images.githubusercontent.com/59427983/106830780-136ce100-66d2-11eb-81cc-f8518bf9483e.png)

그러면 아까와 같은 Connection Options 화면이 나오고, 설정 후,

![image](https://user-images.githubusercontent.com/59427983/106831934-21bbfc80-66d4-11eb-8b04-238e509c439f.png)

Create Options를 설정 할 수 있다. `DROP objects bofore each CREATED object`는 기존에 있던 내 테이블의 DB자료를 몽땅 `delete cascade` 후 새로운 테이블을 다시 만들어주는 옵션이고, `Include model attached scripts` 는 스크립트를 확인 후 적용시키는 옵션이다. 원하는 옵션을 체크 후 Continue. 그리고 다음도 그냥 Continue.

![image](https://user-images.githubusercontent.com/59427983/106832254-a9a20680-66d4-11eb-8099-1751fbee205f.png)

그러면 위와 같이 스크립트가 만들어진 것을 볼 수 있다. 워크밴치는 이 스크립트 기반으로 새롭게 Table을 생성해준다. 이 스크립트를 긁어서 AWS의 RDS에 사용할 수도 있고, 원하는대로 저장해둘 수 있다. 그리고 Forward Engineer에서 미처 선택하지 못한 명령어를 여기다가 직접 입력해주면 알아서 그 명령어 또한 같이 실행해준다. 가령 Delete cascade 같은 옵션들.

그러면 이제 워크밴치에서 내가 원하는 Table이 생성되었고 Table간 관계가 잘 맺어진 모습을 볼 수 있다.

<br/>

<br/>

## SpringBoot 프로젝트 생성 & 연동

나는 인텔리제이 커뮤니티 버전을 사용하고 있으므로 SpringBoot 내장 생성기 가 없다. 따라서 [spring initializr](https://start.spring.io/)을 사용해서 SpringBoot 프로젝트를 생성해주었다. Dependencies는 나중에 따로 라이브러리를 Gradle로 설정 할 수 있으니 간단하게 `Spring Web`, `Spring Boot DevTools`, `Lombok` 만 옵션으로 주고 생성해서 인텔리제이에 임포트 시켜주었다.

### build.gradle, properties 설정

- build.gradle

```
compile("org.mybatis.spring.boot:mybatis-spring-boot-starter:1.3.2")
compile('org.springframework.boot:spring-boot-starter-jdbc')
compile('mysql:mysql-connector-java')
```

MySQL과, MyBatis 디펜던시를 넣어주자. 그리고 설계된 Table을 중심으로 도메인 하나를 컨트롤러와 서비스, 모델까지 우선 만들어주고 연동을 해보자.

- application.properties

```properties
# Mysql
# db source url
spring.datasource.driverClassName=net.sf.log4jdbc.sql.jdbcapi.DriverSpy
spring.datasource.url=jdbc:log4jdbc:mysql://localhost:3306/mydb?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul&allowPublicKeyRetrieval=true

# db response name
spring.datasource.username=[자신의 db id]

# db response password
spring.datasource.password=[자신의 db password]
```

프론트에서 백엔드로 json을 요청할 때 찍히는 쿼리문을 보고 싶기 때문에 log4jdbc 와 함께 연동하기 위해서 spring.datasource.url 부분에 jdbc:`여기`:mysql .... 여기 부분에 log4jdbc를 넣어주었다. 그리고 MySQL 포트(기본포트 3306)와 함께 내가 연결할 DB, 그리고 뒷 부분은 MySQL 버전에 따라 오류가 나지 않게 Timezone 설정, SSL 설정등이 들어갔다.

```properties
#mybatis
mybatis.mapper-locations=mapper/*.xml
mybatis.type-aliases-package=com.pozafly.tripllo
# 마이바티스 카멜케이스 변환
mybatis.configuration.map-underscore-to-camel-case=true
```

MyBatis 설정이다. 위치를 잡아줬고, package를 적어주고, DB의 스네이크케이스를 DTO의 카멜케이스로 바꿔주기 위해 설정해준다. 이제 쿼리 로그를 보기위해서 log4jdbc 설정을 해줄 것이다.

<br/>

### log4jdbc 설정

resources 폴더에 log4jdbc.log4j2.properties 파일을 생성하고 이렇게 적어주자.

```properties
log4jdbc.spylogdelegator.name=net.sf.log4jdbc.log.slf4j.Slf4jSpyLogDelegator
log4jdbc.dump.sql.maxlinelength=0
```

그리고 같은 위치에 logback.xml 파일을 만들고 log가 찍힐 표현 단위 설정을 해주자.

```xml
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyyMMdd HH:mm:ss.SSS} [%thread] %-3level %logger{5} - %msg %n</pattern>
        </encoder>
    </appender>

    <logger name="jdbc" level="OFF"/>

    <logger name="jdbc.sqlonly" level="OFF"/>
    <logger name="jdbc.sqltiming" level="DEBUG"/>
    <logger name="jdbc.audit" level="OFF"/>
    <logger name="jdbc.resultset" level="OFF"/>
    <logger name="jdbc.resultsettable" level="DEBUG"/>
    <logger name="jdbc.connection" level="OFF"/>

    <root level="INFO">
        <appender-ref ref="STDOUT" />
    </root>

</configuration>
```

여기까지 설정해주면, MySQL 과 연동 준비가 완료된 셈이다. 이제 프론트 -> 백엔드 -> DB 접속 시 쿼리문이 인텔리제이 상 log에 잘찍히는 모습을 볼 수 있다.

<br/>

### 연동테스트

아까 log4jdbc 설정을 한 resource 폴더에 mapper 폴더를 만들자. 이곳에 xml로 쿼리문이 들어갈 곳이다. application.properties에 MyBatis의 location을 잡아주었듯 반드시 여기에 들어가야한다. 만들어진 mapper 폴더에 ...Mapper.xml을 만들고,

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.pozafly.tripllo.user.dao.UserDao">

    <select id="readUser" parameterType="String" resultType="com.pozafly.tripllo.user.model.User">
        select
            *
        from user
        where id = #{id}
    </select>

</mapper>
```

이렇게 가볍게 쿼리문을 작성하고 연동 테스트를 해보자. 워크밴치로 테스트 데이터를 만들어 insert 후, SpringBoot에 RestContoller를 만들고, serive, model, dao 패키지화 해서 접속점을 만들어 브라우저 또는 Postman으로 api를 요청해본다. 그러면 로그 상에 logback.xml에 resultsettable을 설정해준 것 같이 쿼리문과 함께 테이블에서 어떤 정보를 가져왔는지 모두 표현 되는 것을 볼 수 있다.

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)