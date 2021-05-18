---
layout: post
title: '(5) 로그인2 -SpringBoot 구현'
author: [Pozafly]
tags: [Tripllo 제작기, SpringSecurity, JWT]
image: ../img/tripllo/tripllo5.png
date: '2021-02-04T15:03:47.149Z'
draft: false
excerpt: Spring Security와 JWT를 사용해서 로그인 기능을 구현했다. Spring Security의 구현된 소스와 login의 Service 단 내부 로직을 개념에 맞춰서 알아보자.
---

> Spring Security와 JWT를 사용해서 로그인 기능을 구현했다. Spring Security의 구현된 소스와 login의 Service 단 내부 로직을 개념에 맞춰서 알아보자.

<br/>

이제 실제적으로 SpringBoot부터 구현하자.

## Dependency 등록

첫번째로, build.gradle에 dependencies를 추가해주자.

```
implementation 'org.springframework.boot:spring-boot-starter-security'
implementation 'io.jsonwebtoken:jjwt:0.9.1'
```

<br/>

## Common 세팅

common이란 패키지 밑에 security 패키지를 만들었다. 이곳에 이제 Security 관련 class들이 들어갈 예정이다. 그 밑에 UserService 관련 객체가 들어갈 securityUser 패키지를 만들고 Spring Security의 전체 구조 사진의 5,6,7 번에 해당하는 UserDetailsService, UserDetail을 구현한 클래스를 만들었다.

### SecurityUser

```java
package com.pozafly.tripllo.common.security.securityUser;

import com.pozafly.tripllo.user.model.User;   // security 외에 Tripllo에서 직접 사용하는 User class
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class SecurityUser implements UserDetails {

    private Collection<? extends GrantedAuthority> authorities;
    private User user;   // 이곳에 Tripllo의 User 객체를 넣어준다.

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }
    @Override
    public String getPassword() { return user.getPassword(); }     // 패스워드를 들고오는 부분
    @Override
    public String getUsername() { return user.getId(); }   // id를 들고오는 부분
    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}

```

UserDetails를 구현한 class이다. UserDetails는 SpringSecurity의 인터페이스이고, 우리 프로젝트에서 만든 인터페이스가 아니다. Tripllo에서 사용하는 객체는 User 하나다. 제일 위 사진을 보면 6번에 해당하는 UserDetails 를 구현체로 한 구현 class가 해당 class이며 이는 Tripllo에서 실제로 사용하는 User 객체의 id, pw를 사용하는 모습을 볼 수 있다.

<br/>

### UserDetailsService

```java
package com.pozafly.tripllo.common.security.securityUser;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserDetailsService {
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
```

다음으로 볼 것은 위 그림에 5,6,7 번이 모두 물려있는 UserDetailService다. 이 인터페이스는 구현체인 UserDetailServiceImpl에서 이어지는데 하나의 메서드만 가지고 있다. `loadUserByUsername()`. 이 메서드 또한 SpringSecurity에서 자체적으로 제공하는 메서드인데 매개변수로 String username이 들어간다. 이름에서 알 수 있듯, username이라는 구분 값으로 DB에 접속해서 user의 정보를 가져오는 메서드.

<br/>

### UserDetailServiceImpl

```java
package com.pozafly.tripllo.common.security.securityUser;

import com.pozafly.tripllo.user.dao.UserDao;
import com.pozafly.tripllo.user.model.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Log4j2
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserDao userDao;   // Tripllo 유저 조회하기 위해 DI

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 로그인 시도하려는 유저정보 조회
        log.info("security loadUserByUsername에서 유저 조회");
        User user = userDao.readUser(username);   // tripllo에서 사용하는 User 조회 메서드

        // 조회가 되지않는 User는 에러발생.
        if(user == null){ throw new UsernameNotFoundException(username); }

        // 조회한 정보를 userCustom에 담는다.
        // 만약 파라미터를 추가해야한다면 UserCustom 을 먼저 수정한다.
        return new SecurityUser() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
                authorities.add(new SimpleGrantedAuthority(user.getRole()));  // Role을 위해
                return authorities;
            }
            @Override
            public String getPassword() { return user.getPassword(); }
            @Override
            public String getUsername() { return user.getId(); }
            @Override
            public boolean isAccountNonExpired() { return true; }
            @Override
            public boolean isAccountNonLocked() { return true; }
            @Override
            public boolean isCredentialsNonExpired() { return true; }
            @Override
            public boolean isEnabled() { return true; }
        };
    }
}
```

구현체인 UserServiceImpl 에서는 `loadUserByUsername()`를 정의해준다. Tripllo에서 사용하는 user를 조회하는 Dao를 DI해서 MyBatis로 연결되어 유저 정보를 조회해서 가져오고, username에는 user.getId(), password에는 user.getId()를 사용해서 넣어주었다. Role에 대해서는 밑에서 설명 예정.

<br/>

### JwtTokenProvider

```java
package com.pozafly.tripllo.common.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private static String secretKey = "triplloApplication";

    // 토큰 유효시간 60분 * 24 = 24시간
    private long tokenValidTime = 60 * 60 * 24 * 1000L;

    private final UserDetailsService userDetailsService;

    // 객체 초기화, secretKey를 Base64로 인코딩한다.
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT 토큰 생성
    public String createToken(String userPk, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userPk); // JWT payload 에 저장되는 정보단위
        claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + tokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey)  // 사용할 암호화 알고리즘, signature 에 들어갈 secret값 세팅
                .compact();
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰에서 회원 정보 추출
    public String getUserPk(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // Request의 Header에서 token 값을 가져옴. "Authorization" : "TOKEN값'
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
```

위의 사진에 4,5,7,8번이 물려있는 AuthenticationProviders의 하나인 JwtTokenProvider를 만들어주었다.

- init() : 상단의 secretKey 상수에 물려있는 String 값을 기반으로 Base64 로 인코딩해서 토큰을 생성한다. 물론 이 부분은 application.properties나 application.yml로 빼서 @Value 로 받아와 사용하는것이 좋겠다.

- createToken() : userPK(가령 id)와 role list를 매개변수로 받아 Claims를 생성하고, role을 Claims에 집어넣난다. Builder 패턴으로 정보, 토큰 발행시간, 토큰 유효시간, 그리고 사용할 알고리즘을 세팅한다.

- getAuthentication() : 위에서 생성했던 loadUserByUsername() 메서드를 여기서 사용한다. 클라이언트로부터 받은 token을 파싱해서 이름을 추출하고 userDetails를 가져온다. return 객체는 사진 2번에 물려있는 `UsernamePasswordAuthenticationToken`이다. 이 녀석이 핵심!

- getUserPk() : 토큰에서 회원 정보 추출.
- validateToken() : 토큰의 유효성 검사.
- resolveToken() : 이녀석을 유의해서 봐야하는데 이녀석 때문에 몇시간을 헤멘지 모르겠다. 중요한 것은

```java
return request.getHeader("Authorization");
```

이 부분이다. vue에서 axios로 api를 날릴때 token 이름을 "Token ...." 이런식으로 주었더니 토큰을 가져오지 못하는 경우가 발생했다.

<img width="1038" alt="스크린샷 2021-02-04 오후 9 18 58" src="https://user-images.githubusercontent.com/59427983/106891971-c79c5500-672e-11eb-8840-2377296e626c.png">

개발자 도구에 Network 탭에서 확인해보자. 만약 위 코드를

```java
return request.getHeader("Token");
```

이라고 했다고 하자. 그럼 클라이언트 단에서 **Authorization** 이라는 header 명으로 axios에서 요청을 보냈다. 그러자 Spring Security에서 인증되지 않아 403 인증 오류를 뱉는다. 즉, resolveToken() 메서드의 getHeader("Authorization") 이렇게 이름을 맞춰주거나, axios 로 http call을 날릴 때 헤더명을 "Token" 으로 맞춰주거나 해야 한다.

<br/>

### JwtAuthenticationFilter

```java
package com.pozafly.tripllo.common.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 헤더에서 JWT 를 받아옴.
        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);

        // 유효한 토큰인지 확인함.
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옴.
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            // SecurityContext 에 Authentication 객체를 저장함.
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}
```

이번엔 클라이언트에서 가장 먼저 접근했을 때 들어오는 Filter인, `JwtAuthenticationFilter` 를 살펴보자. 모든 filter는 요청이 들어왔을 때 doFilter() 메서드가 실행되며, 마칠 때 다른 filter 가 있다면 chain을 걸어주어야 한다. Provider에서 토큰을 받아오고, 다시 Provider에서 검증하는 과정을 거친다. 이제 마지막 부분인 config 부분을 보자. 이때까지 setting 이었다면, 이번에는 실질적으로 이 config 파일에서 모든 설정을 해줄 수 있다.

```java
package com.pozafly.tripllo.common.security;

import com.google.common.collect.ImmutableList;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    // 암호화에 필요한 PasswordEncoder를 Bean으로 등록함.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // authenticationManager를 Bean 등록함.
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    // 여기는 CORS 설정임.
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
      final CorsConfiguration configuration = new CorsConfiguration();
      configuration.setAllowedOrigins(ImmutableList.of("http://localhost:8080", "http://tripllo.tech.s3-website.ap-northeast-2.amazonaws.com", "http://tripllo.tech", "https://tripllo.tech"));
      configuration.setAllowedMethods(ImmutableList.of("HEAD","GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
      configuration.setAllowCredentials(true);
      // 토큰을 Authorization 이라는 이름으로 받겠다.
      configuration.setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type"));
      final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", configuration);
      return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
          .httpBasic().disable() // rest api 만을 고려하여 기본 설정은 해제.
          .csrf().disable() // csrf 보안 토큰 disable처리.
          .formLogin().disable() //기본 로그인 페이지 없애기
          .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 역시 사용하지 않음.
          .and()
            .authorizeRequests() // 요청에 대한 사용권한 체크
            //                .antMatchers("/admin/**").hasRole("ADMIN")
            .antMatchers("/profile").permitAll()
            .antMatchers("/websocket/**").permitAll()
            // post 방식의 user create(회원가입)은 허용한다.
            .antMatchers(HttpMethod.POST, "/api/user").permitAll()
            // 회원가입 전 사용하고 싶은 회원 id를 validation 해볼 수 있는 api도 open
            .antMatchers("/api/user/valid/**").permitAll()
            // 로그인 오픈
            .antMatchers("/api/login/**").permitAll()
            .antMatchers("/api/logout").permitAll()
            .antMatchers("/api/email/**").permitAll()

            // 인증된 사용자만 가능하다(즉, 헤더에 토큰을 준 사람만이 가능한 것임.)
            .antMatchers("/api/**").authenticated()
            // role이 ROLE_USER 인 역할만 통과
            .antMatchers("/api/**").hasRole("USER")
            .anyRequest().authenticated()   // 그외 나머지 요청은 인증 가능 해야한다.
          .and()
	          .cors()
          .and()
          	.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                             	UsernamePasswordAuthenticationFilter.class)
        // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 전에 넣는다
                ;
    }
}
```

하나씩 천천히 들여다보자.

- JwtTokenProvider를 마찬가지로 DI 받아서 사용한다.

- Spring Security라이브러리에서 제공하는 BCryptPasswordEncoder를 사용한다.

- 사진의 3,4,8,9에 물려있는 AuthenticationManager를 Bean으로 등록해준다.

- corsConfigurationSource 는 cors 설정이다. cors는 제작기를 따로 만들어서 다룰 예정이지만 가볍게 짚고 넘어가보자. cors란, 서로 다른 도메인 간 api response를 막는걸 말한다. 쉽게 말해 vue는 **8080** 포트를 사용하고, SpringBoot는 **3000**포트를 사용하는데 포트가 다르기 때문에 리소스를 막아주는 역할을 한다.

  SpringSecurity를 도입하기 전에는 WebMvcConfigurer를 상속받은 CorsConfig class를 따로 만들어서 해결했지만, 여기서 cors 설정을 해주면 CorsConfig 가 무시되므로 여기서 보면된다.

  - setAllowedOrigins() : url에 해당하는 출처를 허가하겠다라는 뜻이다. ImmutableList.of() 안에 허용하고 싶은 도메인들을 String 형식으로 적어주면 된다.
  - setAllowedMethods() : 허용하고 싶은 http 메서드를 마찬가지로 적어준다. 가령 "GET", "POST", "PUT", "DELETE", "OPTIONS" 같은 메서드들.
  - setAllowCredentials() : true일 때, header가 없는 응답들은 거르겠다는 뜻이다. header가 있어야 함을 의미.
  - addAllowedHeaders() : 어떤 이름으로 된 헤더들을 허용하겠느냐? ※addAllowedHeader("\*") 로 모든 헤더 허용 가능.
  - 그리고 모든 설정한 configuration을 등록해준다.

- configure 메서드에서 SpringSecurity 설정을 해줄 수 있다.

  - httpBasic().disable() : rest api 이므로 기본설정 사용안함. 기본설정은 비인증시 로그인폼 화면으로 리다이렉트 됨.(vue를 사용할 것이므로.)

  - .csrf().disable() : 마찬가지로 rest api이므로 csrf 보안이 필요없으므로 disable처리.

  - STATELESS 란 무상태성, 비보존한다는 뜻이다. 마찬가지로, 우리는 토큰 기반으로 인증을 계속 할것이기 때문에 세션이 필요없으므로 STATELESS를 사용한다.

    > ★위 3가지가 중요하다. react 나 vue 같이 서버단에서 화면을 보여주는것이 아니라 따로 존재하는 프론트 단에서는 위 설정이 필요없기 때문이다.

  - antMatchers() 는 http 메서드와 url을 적어줄 수 있는데 controller에서 접근하는 url을 말한다. 뒤에 따라오는 .permitAll()은 모두 허용하겠다는 뜻이된다.

  - .antMatchers("/api/\*\*").authenticated() 이 부분은 헤더에 토큰은 준 user만 허락한다는 뜻이 된다.

  - .antMatchers("/api/\*\*").hasRole("USER") : 이부분은 role에 대한 부분이다. role이 밑에서 설명하겠다.

  - 그리고 마지막으로 우리가 만들어준 JwtAuthenticationFilter 와 사용하는 UsernamePasswordAuthenticationFilter 를 등록하고 마친다.

참고자료 : <https://dongdd.tistory.com/175>, <https://postitforhooney.tistory.com/entry/SpringSecurity-%EC%B4%88%EB%B3%B4%EC%9E%90%EA%B0%80-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-Spring-Security-%ED%8D%BC%EC%98%B4>, <https://velog.io/@tlatldms/Spring-boot-Spring-security-JWT-Redis-mySQL-2%ED%8E%B8>

#### Role에 대해서

role이란, `역할`을 말한다. Workbench의 user 테이블을 보자.

<img width="94" alt="스크린샷 2021-02-04 오후 10 22 33" src="https://user-images.githubusercontent.com/59427983/106898417-80669200-6737-11eb-8387-4860cadc36e2.png">

이렇게 role이라는 column이 있고 ROLE*USER라는 값이 String으로 들어있다. spring security의 config 파일에 보면 .antMatchers("/api/\*\*").hasRole("USER") 이렇게 되어있다. role을 config에 등록해서, 어떤 api 호출이 가능한지 분기를 태울 수 있다는 말이된다. 그리고 hasRole에 USER 라는 값이 있으면 prefix 로 자동으로 앞에 \*\*ROLE*\*\* 이라는 값을 붙여서 검증한다. 즉, 일반 유저라는 뜻이 되는 것이고, 만약 user 테이블에 ROLE_ADMIN 의 값을 주고 .antMatchers("/api/\*\*").hasRole("ADMIN") 이렇게 하면 api에 해당하는 모든 자원을 허용하겠다는 뜻이 된다.

이렇게 Spring Security 와 JWT의 설정을 끝냈다. 이제 UserServiceImpl, LoginServiceImpl의 비지니스 로직에서 password를 어떻게 암호화할 수 있는지 알아보자.

<hr/>

## 서비스 로직

### 회원가입 프로세스

![회원가입 로그인 프로세스 001](https://user-images.githubusercontent.com/59427983/106987685-5c479700-67b1-11eb-8937-3507056b0b22.jpeg)

1. front에서 회원가입 시 이미 회원가입이 된 ID인지 검사하는 Http Call을 날린다. MySQL에서 회원 ID를 SELECT, 가입 가능한지 판별하여 return. 보면 Spring Security config 파일에 .antMatchers("/api/user/valid/\*\*").permitAll() 로 프론트에서 header를 가지고 들어오지 않아도 리소스를 요청할 수 있도록 풀어주었기 때문에 가능하다.
2. 가입 가능하다면 나머지 정보를 입력해서 Create Http Call을 날림. 여기도 마찬가지로 permitAll()로 풀어둔 상태다.
3. Spring Security에서 제공하는 PasswordEncoder를 통해 `.encode()`메서드로 BCrypt 방식으로 인코딩 후 INSERT

### 로그인 프로세스

![회원가입 로그인 프로세스 002](https://user-images.githubusercontent.com/59427983/106987714-68cbef80-67b1-11eb-98d2-17faa2b688c3.jpeg)

1. 로그인 시 ID, Password는 GET 방식으로 날릴 시 url 파라미터에 노출되므로 POST 방식으로 접근.
2. Payload에 담긴 ID로 유저 정보 조회
3. 회원가입 시 사용했던 SpringSecurity의 PasswoardEncoder에서 `.matches()` 메서드로 유저가 보낸 password와 DB에 BCrypt 방식으로 인코딩된 password를 가져와서 비교함.
4. 통과 된다면, JwtTokenProvider의 createToken으로 token 생성.
5. 토큰과 유저정보를 가지고 리턴.

핵심은 PasswordEncoder다.

<br/>

#### PasswordEncoder(BCrypt)

2가지 메서드를 사용했다.

- .encode(String password) : BCrypt 방식으로 String password를 인코딩해준다.

- .matches(String requestPassword, String DBSavedPassword) : 파라미터로 유저가 요청한 password를 첫번째로 넣어주고, DB에서 조회해온 BCrypt 방식으로 가져온 password와 같은지 내부적으로 판단해 boolean 값으로 리턴해준다. `순서가 중요`하다. 첫번째 파라미터와 두번째 파라미터를 반대로 적으면 체크가 제대로 되지 않는다.

<img width="408" alt="스크린샷 2021-02-05 오후 12 49 05" src="https://user-images.githubusercontent.com/59427983/106990185-1c83ae00-67b7-11eb-8ce3-6dc6a9df66dd.png">

DB에 접속해서 select 해보면 이런 값이 들어가있는 것을 확인할 수 있다. 지금 위의 값은 내가 임의로 만든 사용자인데 모두 *같은 비밀번호*를 입력했음에도 불구하고 서로 다른 값이 들어가있는 것을 볼 수 있다. 이는 DBA도 유저가 **어떤 패스워드를 사용했는지 모르게** 한다.

내부 소스를 보자. Service 단 소스다.

### 회원가입

```java
@Transactional
@Override
public ResponseEntity<Message> createUser(UserApiRequest request) {
    if (userIdValid(request.getId())) {

        // 소셜 로그인 패스워드 만들기
        if (!StringUtils.isEmpty(request.getSocial())) {
            PasswordUtil pw = new PasswordUtil();
            String newPw = pw.encryptSHA256(request.getId());
            request.setPassword(newPw);
        }

        String encodePassword = passwordEncoder.encode(request.getPassword()); // 이곳
        request.setPassword(encodePassword);

        userDao.createUser(request);

        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        message.setStatus(StatusEnum.OK);
        message.setMessage(ResponseMessage.CREATED_USER);
        message.setData(request);

        return new ResponseEntity <> (message, headers, HttpStatus.OK);
    } else {
        message.setStatus(StatusEnum.BAD_REQUEST);
        message.setMessage(ResponseMessage.ALREADY_USE);
        return new ResponseEntity <> (message, headers, HttpStatus.NOT_FOUND);
    }
}
```

### 로그인

```java
@Override
public ResponseEntity<Message> login(LoginApiRequest request) {
    User user = userDao.readUser(request.getId());
    if (!ObjectUtils.isEmpty(user)) {

        boolean check = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (check) { // 유저가 보유한 패스워드와 입력받은 패스워드가 일치하는 지 확인한다.
            log.info("로그인 성공");

            List <String> roles = new ArrayList <> ();
            roles.add("ROLE_USER");

            String token = jwtTokenProvider.createToken(user.getId(), roles); // id, role 정보만 가지고 token을 만든다.
            LoginApiResponse response = new LoginApiResponse(
                token, user.getId(), user.getEmail(), user.getName(), user.getPicture(), user.getBio(), user.getRecentBoard(), user.getInvitedBoard(),
                user.getCreatedAt(), user.getCreatedBy(), user.getUpdatedAt(), user.getUpdatedBy()
            );

            headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
            message.setStatus(StatusEnum.OK);
            message.setMessage(ResponseMessage.LOGIN_SUCCESS);
            message.setData(response);

            return new ResponseEntity <> (message, headers, HttpStatus.OK);
        } else {
            log.info("비번이 틀립니다");
            message.setStatus(StatusEnum.NOT_FOUND);
            message.setMessage(ResponseMessage.PASSWORD_WRONG);
            return new ResponseEntity <> (message, headers, HttpStatus.FORBIDDEN); // 403
        }
    } else {
        log.info("해당 id가 없습니다.");
        message.setStatus(StatusEnum.NOT_FOUND);
        message.setMessage(ResponseMessage.NOT_FOUND_USER);
        return new ResponseEntity <> (message, headers, HttpStatus.FORBIDDEN); // 403
    }
}
```

참고자료 : <https://mia-dahae.tistory.com/120>

<br/>

여기까지가 SpringBoot의 내부 처리 로직이다. 회원가입과 로그인 로직이 완성되었으므로 vue에서 어떻게 이것을 표현할지 다음 포스팅에서 알아보자. 소셜 로그인까지 같이.

<hr/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)