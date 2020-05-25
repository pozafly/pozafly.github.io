---
title: "JUnit(2) - Mockito"
excerpt: "Mockito 프레임워크를 통해 Mock 테스트를 알아보자."
categories:
  - JUnit
tags:
  - JUnit
  - 단위테스트
  - Mockito
last_modified_at: 2020-05-25
toc: true
toc_sticky: true
---

<1>

> 이전 포스팅에서는 Assertion 객체를 사용해, 테스트 코드의 return 값을 검증했다. 단순히 return 되는 값만 검증한 것인데, return 값이 아닌, behavior(비지니스 로직의 동작)을 테스트하고자 한다면 어떻게 해야할까?



## Mock Object란?

`Mock`이란, 사전적 의미로, 모조품이며 개발용어로는 **모의 객체**를 말한다. 모의 객체란 객체지향 프로그래밍으로 개발한 소스를 테스트할 때, 실제 객체를 사용하지 않고, 실제 객체를 흉내내는 가짜 객체를 작성, 테스트 하는 객체를 말한다. 



` Mockito`란, JUnit 위에서 동작하는 Mock 프레임워크이다. Mockito를 사용하면 테스트 stub()

