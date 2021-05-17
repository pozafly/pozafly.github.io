---
layout: post
title: 'Spring에서의 MediaType'
author: [Pozafly]
tags:
  - SpringBoot
  - MediaType
image: ../img/java/springboot.png
date: '2020-05-27'
draft: false
excerpt: Spring MVC에서 MediaType 매핑에 대해서 알아보고 테스트 해보자
---

> 계속 JUnit에 대해서 공부하고 있는데 `@GetMapping(value = "/hello" , consumes = MediaType.APPLICATION_JSON_VALUE)` 속성으로 MediaType이 등장했다. 궁금증이 생겨 MediaType에 대해서 조금 알아보았다.

<br/><br/>

## MediaType이란?

wiki의 말에 따르면, 미디어타입(media type)은 인터넷에 전달되는 파일 포맷과 포맷 콘텐츠를 위한 식별자고, HTTP와 HTML 문서 파일 포맷에 사용된다고 한다. MIME(Mulipuerpose Internet Mail Extensions) type, content type 이라고도 한다. 여기서 MIME는 전자우편을 보낼 때 8비트 이상 코드를 사용하는 문자, 이진 파일들은 모두 이 포맷으로 변환되기 때문에 이렇게 이름이 붙었다.

우리가 흔히 보는 HTML에 `<meta http-equiv="content-type" content="text/html; charset=UTF-8" />` 이 부분을 많이 봤을 것이다. `<head>`태그 안에 적히는 것인데 charset은 문자 인코딩 방식을 의미한다. 한글은 UTF-8 인코딩 방식으로 인코딩 되지 않으면 깨지는 경우가 많은데 이클립스에서 인코딩 방식을 UTF-8로 주지 않으면 화면에서 한글이 깨져보이는게 그 예라고 하겠다.

이 타입에 대한 종류는 [모질라](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)에서 확인할 수 있다.

<br/><br/>

## Spring MediaType

웹의 동작은 request, response로 이루어져 있다. 웹을 개발할 때 브라우저(Client)가 서비스 주체(Server)에 어떤 요청(request)을 하게 되고, 그 서버는 클라이언트에게 알맞는 응답(response)을 하는게 웹의 구동방식인데, Spring MVC에서는 Controller가 @...Mapping으로 url을 클라이언트로부터 요청받고, 내부 로직을 거친 뒤 다시 클라이언트에게 응답한다.

이때 request와 response에 MediaType을 지정해서 요청받을 때 사용하는 MediaType과 응답할 때 보내주는 MediaType을 지정, 사전에 필요한 타입만 거를 수 있다.

<br/>

### 기본예제

```java
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SampleController {
	@GetMapping(value = "/hello" , consumes = MediaType.APPLICATION_JSON_VALUE)   // consumes
	@ResponseBody
	public String hello() {
		return "hello";
	}
}
```

이런 SampleController가 있다고 했을 때를 가정하고 테스트 코드를 만들어보면,

```java
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

	@Autowired
	MockMvc mockMvc;

	@Test
	public void testURI() throws Exception {
		mockMvc.perform(get("/hello")
				.contentType(MediaType.APPLICATION_JSON_UTF8))   // 이부분
				.andDo(print())
				.andExpect(status().isOk());
	}
}
```

테스트를 실행해보면, console에

```
MockHttpServletRequest:
  HTTP Method = GET
  Request URI = /hello
   Parameters = {}
		  Headers = [Content-Type:"application/json;charset=UTF-8"]
				 Body = null
Session Attrs = {}

Handler:
	 Type = com.hwan.jpaTest.controller.SampleController
   Method = com.hwan.jpaTest.controller.SampleController#hello()

Async:
	Async started = false
	 Async result = null

Resolved Exception:
			 Type = null

ModelAndView:
	View name = null
			 View = null
			Model = null

FlashMap:
   Attributes = null

MockHttpServletResponse:
		   Status = 200
Error message = null
		  Headers = [Content-Type:"text/plain;charset=UTF-8", Content-Length:"5"]
 Content type = text/plain;charset=UTF-8
				 Body = hello
Forwarded URL = null
Redirected URL = null
		  Cookies = []
```

이렇게 찍히는 것을 볼 수 있다. Test 코드에 자세히 보면, `.contentType(MediaType.APPLICATION_JSON_UTF8))` 즉, MediaType을 `APPLICATION_JSON_UTF8`로 보냈고, controller 코드에서는 `consumes = MediaType.APPLICATION_JSON_VALUE`이렇게, `APPLICATION_JSON_VALUE`로 받는걸 볼 수 있는데 content-Type은 http의 스펙이지만, charset은 스펙이 아니고 특정 브라우저에서 지원해주는 기능이다. 따라서 UTF-8로 해도 에러가 나지 않는 것이다.

---

<br/>

### consumes & produces

위의 예제코드에서 controller에 @...Maping() 을보면 consumes라는 속성이 명시되어있고, 값으로 MediaType이 되어있다. 이 속성에 들어가는 것은 consumes와 produces가 쓰일 수 있는데, 차이점을 보면

- consumes : 소비 가능한 미디어 타입의 목록을 지정해서 주요한 매핑을 제한함. Content-Type 요청 헤더가 consumes에 지정한 미디어 타입과 일치할 때만 요청을 매핑해줌

- produces : 생산 가능한 미디어 타입의 목록을 지정해서 주요 매핑을 제한할 수 있다. Accept 요청헤더가 이러한 값 중 하나와 일치할 때만 요청이 매칭 된다.

즉, `consumes`는 브라우저가 서버에게 보낼때 거르는 것이고, `produces`는 반대로 서버에서 브라우저에게 보낼 때 거르는 것이다. 예제를 보자.

<br/>

#### consumes

```java
@RestController
@RequestMapping(value = "/ex1", method = "RequestMethod.GET", consumes="application/json")
public String ex1() {
	return "ex1";
}
```

```bash
$ curl -i -H "Content-Type:application/json" http://localhost:8080/ex1
```

Content-Type은 명시한 타입으로 보내겠다는 말이 된다.

<br/>

#### produces

```java
@RestController
@RequestMapping(value = "/ex1", method = "RequestMethod.GET", produces="application/json")
public String ex1() {
	return "ex1";
}
```

```bash
$ curl -i -H "Accept: application/json" http://localhost:8080/ex1
```

Accept는 명시한 타입으로 응답받겠다는 말이 된다.