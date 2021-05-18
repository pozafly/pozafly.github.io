---
layout: post
title: '(4) 로그인1 -SpringSecurity & JWT 개념'
author: [Pozafly]
tags: [Tripllo 제작기, SpringSecurity, JWT]
image: ../img/tripllo/tripllo4.png
date: '2021-02-04T10:03:47.149Z'
draft: false
excerpt: Spring Security와 JWT를 사용해서 로그인 기능을 구현했다. Spring Security와 JWT의 개념을 알아보자.
---

> Spring Security와 JWT를 사용해서 로그인 기능을 구현했다. Spring Security와 JWT의 개념을 알아보자.

## Spring Security

Spring Security는 Spring 기반의 어플리케이션의 보안(`인증`과 권한, `인가` 등)을 담당하는 스프링 하위 프레임워크이다. Spring Security는 '인증'과 '권한'에 대한 부분을 Filter 흐름에 따라 처리하고 있다. Filter는 Dispatcher Servlet으로 가기 전에 적용되므로 가장 먼저 URL 요청을 받지만, Interceptor는 Dispatcher와 Controller사이에 위치한다는 점에서 적용 시기의 차이가 있다. Spring Security는 보안과 관련해서 체계적으로 많은 옵션을 제공해주기 때문에 개발자 입장에서는 일일이 보안관련 로직을 작성하지 않아도 된다는 장점이 있다. 구조를 잡아보자.

### 기본용어

1. Principal(접근주체) : 접근하는 대상(User)
2. Authentication(인증) : 리소스에 접근한 User가 누구인지 식별
3. Authorize(인가) : 접근한 User가 리소스에 접근 권한이 있는지 검사

### 간단 매커니즘 - Filter Chain

Spring Security는 Filter 구조이다. 사용자의 정보가 여러 체이닝 된 Filter들을 거치게 된다. 예를 들어 OAuth 2.0 인증을 시도하려고 할 때는 앞선 Filter인 "UsernamePasswordAuthenticationFilter"는 OAuth2.0 인증을 실시할 수 없으니 인증되지 않은 채로 다음 필터를 넘어가게 된다.

그 후 다른 필터인 "OAuth2ClientAuthenticationProcessingFilter"라는 필터에서 OAuth2.0을 이용한 인증을 진행한다. 따라서 여러 필터를 거치면서 인증을 진행하게 되고 앞선 Filter에서 인증이 완료되었다면 뒤에 따라오는 Filter에 걸리지 않고 그대로 인증된 사용자가 되는 것이다. 만약 모든 Filter를 거쳐도 인증이 되지 않았다면 이 User가 보내는 요청은 말 그대로 인증되지 않은 요청이 되는 것이다.

### 전체 구조

![ss](https://user-images.githubusercontent.com/59427983/106862908-1d5f0600-670b-11eb-8b65-8e83e71636e3.png)

1. 클라이언트가 Http Request로 로그인 요청을 보낸다.
2. 요청은 맨 처음 AuthenticationFilter에 가게 되고, UsernamePasswordAuthenticationFilter 로 가게 된다. 여기서 AuthenticationFilter는, Spring Security와 관련된 여러 **Filter List**를 가지고 있다. 그 중 하나인 UsernamePasswordAuthenticationFilter는 ID, PW를 이용한 인증을 담당하는 Filter다. 얻어온 ID, PW로 UsernamePasswordAuthenticationToken(Authentication)을 생성한다. Tripllo 프로젝트는 `JwtAuthenticationFilter` 를 이용한다.
3. ProviderManager의 구현체인 AuthenticationManager 에서 인증 과정을 수행할 것이다. 2번에서 받아온 UsernamePasswordAuthenticationToken 객체를 받아서 인증하고 인증 되었다면 다시 그 객체를 돌려주는 메서드를 구현한 인터페이스. 하지만 ProviderManager는 실제로 인증을 진행하는게 아니라 4번의 AuthenticationProvider들에게 인증을 위임하고 인증에 성공하면 다시 AuthenticationFilter에게 인증에 성공했다고 알려주는 방식인 것.
4. 3번에서 받아온 객체를 인증 가능한 클래스인지 확인하는 과정을 거친다. 즉, UsernamePasswordAuthenticationToken 이 AuthenticationProviders에 도착하면 ProviderManager는 AuthenticationProviders 목록을 순회하면서 해결 가능한 Provider에게 인증을 실시하라고 명령한다.
5. AuthenticationProvider는 인터페이스다. 즉, 우리는 이 인터페이스를 구현한 class를 만들면 해당 class가 실질적인 인증 처리를 하게 된다. Tripllo 프로젝트는 `JwtTokenProvider`를 이용한다.
6. 인증을 실행하기 위해서는 UserDetailService가 필요하다. 유저 정보를 전달하는 서비스의 인터페이스이고, DB단에서 User의 정보를 들고온다. 우리는 Mybatis의 select 문으로 해당 User 정보를 가져올 것이다. Tripllo 프로젝트는 `UserSerivceImpl`과 `SecurityUser(UserDetails의 구현체)`을 이용한다.
7. 이제 이곳에서 UserDetailService로 인해 가져온 User 정보를 검사하고 인증하여
8. 다시 이곳으로 돌려주고,
9. 원래 Filter로 돌려준다.
10. 사용자 데이터가 담긴 UsernamePasswordAuthenticationToken(Authentication) 객체를 SecurityContextHolder에 저장하고 AuthenticationSuccessHandle를 실행. (실패시 AuthenticationFailureHandler 실행)

참고자료 : <https://jeong-pro.tistory.com/205>, <https://jeong-pro.tistory.com/205>, <https://sjh836.tistory.com/165>

<hr/>

<br/>

## JWT

JWT(JSON Web Token)은 클라이언트와 서버, 서비스와 서비스 사이 api를 주고 받을 때 권한 인가(Authorization)를 위해 사용하는 토큰이다. JSON 객체를 암호화 하며 만든 String 값. 암호화 되어있어 변조하기 어려운 정보다. 토큰 자체에 데이터를 가지고 있다. 서버에서는 로그인이 완료된 클라이언트에게 회원을 구분할 수 있는 값을 넣은 JWT를 생성 & 발급한다.

기존 레거시 시스템에서는 서버 기반의 인증 방식을 사용했지만 시스템이 커지면서 한계점이 생기게 된다. 그러면서 나온 것이 토큰 기반의 인증 방식이다.

### 토큰 기반 인증 방식

![22](https://user-images.githubusercontent.com/59427983/106880800-260e0700-6720-11eb-8682-44f9a389721b.png)

위의 그림을 보면 이해하기 쉽다.

1. 로그인에 검증 가능한 ID, PW를 실어서 서버로 보냄.
2. 서버는 검증이 끝나면 토큰을 생성해서 클라이언트에게 토큰을 응답
3. 클라이언트는 앞으로 로그인을 제외한 다른 api를 요청할 때마다 header에 토큰을 실어서 보냄.
4. 서버에서는 다시 header에 실려온 토큰을 검증후 인증되면 응답을 해주는 구조이다.

- 장점

1. **무상태성(Stateless) & 확장성(Scalability)**
   토큰은 클라이언트 측에 저장되기 때문에 서버는 완전히 Stateless(비보존)하고, 클라이언트와 서버의 연결고리가 없기 때문에 확장하기에 매우 적합하다. 만약 사용자 정보가 서버 측 세션에 저장된 경우에 서버를 확장하여 분산처리 한다면, 해당 사용자는 처음 로그인 했었던 서버에만 요청을 받도록 설정을 해주어야 한다. 하지만 토큰을 사용한다면 어떠한 서버로 요청이 와도 상관이 없다.
2. **보안성**
   클라이언트가 서버로 요청을 보낼 때 더 이상 쿠키를 전달하지 않으므로, 쿠키 사용에 의한 취약점이 사라지게 된다.
3. **확장성(Extensibility)**
   시스템의 확장성을 의미하는 Scalability와 달리 Extensibility는 로그인 정보가 사용되는 분야의 확정을 의미한다. 토큰 기반의 인증 시스템에서는 토큰에 선택적인 권한만 부여하여 발급할 수 있으며 OAuth의 경우 Facebook, Google 등과 같은 소셜 계정을 이용하여 다른 웹서비스에서도 로그인을 할 수 있다.
4. **여러 플랫폼 및 도메인**
   서버 기반 인증 시스템의 문제점 중 하나인 CORS를 해결할 수 있는데, 애플리케이션과 서비스의 규모가 커지면 여러 디바이스를 호환시키고 더 많은 종류의 서비스를 제공하게 된다. 토큰을 사용한다면 어떤 디바이스, 어떤 도메인에서도 토큰의 유효성 검사를 진행한 후에 요청을 처리할 수 있다. 이런 구조를 통해 정적 파일(Image, html, css, js 등)은 모두 CDN에서 제공하고, 서버 측에서는 API만 다루도록 설게할 수 있다. 즉, MSA 구조에서도 유용하게 사용할 만하다.

### 구조

```json
HEADER.PAYLOAD.SIGNATURE
```

헤더(Header), 페이로드(Payload), 서명(Signature) 세 부분을 점(.)으로 구분하는 구조다.

- Header

JWT를 검증하는데 필요한 정보를 가진 JSON 객체는 Base64 URL-Safe 인코딩된 문자열이다. 헤더(Header)는 JWT를 어떻게 검증(Verify)하는가에 대한 내용을 담고 있다. 참고로 alg는 서명 시 사용하는 알고리즘이고, kid는 서명 시 사용하는 키(Public/Private Key)를 식별하는 값이다.

- Payload

JWT의 내용이다. 페이로드(Payload)에 있는 속성들을 클레임 셋(Claim Set)이라 부른다. 클레임 셋은 JWT에 대한 내용(토큰 생성자(클라이언트)의 정보, 생성 일시 등)이나 클라이언트와 서버 간 주고 받기로 한 값들로 구성된다.

- Signature

점(.)을 구분자로 해서 헤더와 페이로드를 합친 문자열을 서명한 값이다. 서명은 헤더의 alg에 정의된 알고리즘과 비밀 키를 이용해 성성하고 Base64 URL-Safe로 인코딩한다.

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IktleSBJRCJ9.eyJpYXQiOjE1ODYzNjQzMjcsImlzcyI6ImppbmhvLn
NoaW4ifQ.eyJhbGciOiJFUzI1NiIsImtpZCI6IktleSBJRC9.eyJpYXQiOjE1ODYzNjQzMjcsImlzcyI6Imp
pbmhvLnNoaW4ifQ.MEQCIBSOVBBsCeZ_8vHulOvspJVFU3GADhyCHyzMiBFVyS3qAiB7Tm_ME
Xi2kLusOBpanIrcs2NVq24uuVDgH71M_fIQGg
```

이런 문자열이 생성되는 것을 볼 수 있다.

참고자료 : <https://mangkyu.tistory.com/55>, <https://meetup.toast.com/posts/239>, <https://webfirewood.tistory.com/115>

<hr/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)