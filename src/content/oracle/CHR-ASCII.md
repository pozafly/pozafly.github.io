---
layout: post
title: '오라클 CHR, ASCII 함수 사용법'
author: [Pozafly]
tags:
  - Oracle
image: ../img/oracle/oracle.jpeg
date: '2020-06-12'
draft: false
excerpt: CHR(), ASCII() 함수 사용법.
---

## 정의

 -`CHR()` : 아스키코드값 얻기(숫자)
​ -`ASCII()` : CHR값 얻기(문자)

이렇게만 적어놓으면 뭐가뭔지 잘 모를테니, 문자로 아스키코드값과 아스키코드로 문자열 값을 얻는 쿼리문을 한번 보자.

```sql
SELECT
	ASCII('A'),
	ASCII('Z'),
	ASCII('a'),
	ASCII('z'),
	CHR('65'),
	CHR('90'),
	CHR('97'),
	CHR('122')
FROM DUAL
```

결과는,

| ASCII('A') | ASCII('Z') | ASCII('a') | ASCII('z') | CHR('65') | CHR('90') | CHR('97') | CHR('122') |
| ---------- | ---------- | ---------- | ---------- | --------- | --------- | --------- | ---------- |
| 65         | 90         | 97         | 122        | A         | Z         | a         | z          |

이렇게 나온다.

<br/><br/>

## 활용법

그러면 이걸 어디다 활용하느냐? table에 test 데이터를 넣는다고 가정해보자. 그럴 때, 문자 `A`부터 순서대로 `Z` 까지 문자열 안에 추가해야한다고 가정하면, 먼저 ASCII() 함수를 사용해, '문자열 A를 숫자형태로 바꿔서, +1씩 증가시켜주고, 다시 그 숫자들을 다시 CHR() 함수를 사용해서 다시 문자로 바꿔주면 된다.

```sql
SELECT CHR(ASCII('A') + (ROWNUM-1)) ID
FROM   DUAL
CONNECT BY ROWNUM <= 26;
```

이러면 ID라는 칼럼에 A~Z 까지 모두 출력된다. 이 때 사용한 것은 `ROWNUM`임. ROWNUM은 1부터 시작하기 때문에 (ROWNUM-1)이 필요했고, 각 칼럼에 ROWNUM을 더해주는 것.

<br/><br/>

## CHR(10), CHR(13)

- `CHR(10)`

  : 라인 피드라고 하며, 현재 커서가 위치한 줄에서 한 칸 아래로 이동한다. 즉, 개행문자.

- `CHR(13)`

  : 캐리지 리턴이라고 하며, 현재 커서가 위치한 줄의 맨 앞으로 보낸다. TEXT 편집기에서 Home 키를 누른 것과 같다.

<br/>

```sql
SELECT CHR(10), CHR(13) FROM DUAL;
```

이걸 데이터베이스 IDE에서 실행해보면 CHR(10) 같은 경우 개행이지만 헷갈리게 아무 표시가 안되는 것을 볼 수 있다.

`SQL DEVELOPER`에서 실행했을때,

![주석 2020-06-12 121723](https://user-images.githubusercontent.com/59427983/84461248-f4cf5b00-aca6-11ea-82ca-603204390d22.png)

이렇게 아무것도 표시가 되지 않고, `DBeaver`에서 실행했을 때,

![주석 2020-06-12 121711](https://user-images.githubusercontent.com/59427983/84461240-eda84d00-aca6-11ea-9e97-c2fcad6ff7ea.png)

이렇게 개행문자는 표시되는 것을 볼 수 있다. 개발하다 쿼리문에서 개행해 넘겨줄 필요한 경우가 있었는데 이런식으로 쿼리단에서 자바단으로 개행을 주는 것이 가능하다.