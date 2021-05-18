---
layout: post
title: '회사1 면접 질문정리'
author: [Pozafly]
tags:
  - 면접후기
image: ../img/interview/interview.jpeg
date: '2021-05-14T23:03:47.149Z'
draft: true
excerpt: 회사1의 신입 면접 질문 & 후기
---

# 2021 / 5 / 13

2시 전에 도착하지 못하면 어쩌지 전전긍긍. 다행히 건물에 도착해서 딱 50분에 전화를 드렸다. 내가 조금 일찍 전화를 드렸나, 10분 전엔 문자만 넣고, 전화를 2시에 드렸어야 했는데 후회.

면접은 약 50분 동안 진행되었고, 2시 50분이 넘어 사무실에서 나왔다. 정신이 하나도 없었다. 집으로 돌아오니 4시쯤 되었던 것 같다. 긴장해서 아침과 점심을 먹지 않았으므로 밥할 힘도 없어서 맥도날드 세트 하나를 조지고 그냥 누웠다. 저녁때는 아내가 내가 좋아하는 스시를 미리 시켜줘서 먹고 기분전환 겸 산책을 1시간 정도 했다. 지금은 오후 10시다.

SI 면접 때는 정말 기술이고 뭐고 거의 없었기 때문에 이렇게까지 긴장하지 않고 신경을 많이 쓰지도 않았는데 오늘은 에너지 소모가 극심했다. 지금은 정신을 조금 차리고 오늘 있었던 이야기를 조금 정리해야겠다.

<br/>

<br/>

## 면접 질문

- 개발을 하게 된 동기
- 회사에 지원한 이유
- 포트폴리오를 해당 주제로 만들게 된 계기
- 프로젝트를 진행하면서 어려웠던 점
- Vue를 사용했는데 얼마나 공부했는지? 무엇으로 공부했는지?
- CORS 에러란 무엇이고 어떻게 해결했는지? 
  - 스프링 시큐리티와 웹팩의 proxy를 사용해 해결했다.
- SSR과 SPA에 대해서 이야기해주세요
- Nuxt.js, Next.js란? 이점은? 
  - SSR을 쉽게 해주는 프레임워크다. SSR의 장점은? SEO에 유리하다. 사용자 경험이 좋다.
- http → https는 왜 필요한가? 보안 때문이라는 대답 말고 어떻게 보안이 이루어지는지 설명하라.
- Typescript 사용해봤는지?
  - No
- 테스팅 라이브러리 사용해봤는지?
  - No. Jest를 많이 사용한다고 알고 있다.
- 프로젝트 빌드는 무엇인가? 어떻게 진행되나?
  - 내 포트폴리오 빌드 프로세스를 말씀드렸는데, 이 글을 쓰면서 드는 생각은 웹팩과 바벨에 대한 답을 듣고 싶어 하지 않으셨을까?  웹팩은 무조건 공부해야겠다.
- 로그인 프로세스를 프론트엔드 관점에서 이야기해주세요.
- (꼬리 질문) 쿠키와 세션이 무엇인지, 말해주세요.
- (꼬리 질문) 내가 프로젝트에서 유저 토큰을 Base64로 암호화했다고 말씀드렸는데, 암호화한 것이 어떤 의미가 있냐고 되물으심. 이것저것 설명하다가 의미가 없다고 말씀드림. 프론트엔드에서 유저 토큰 암호화 처리는 큰 의미는 없다고 말씀해주셨다. Base64는 스트링값을 변환하는 것의 일종이라고 이해했는데 다시 정리해보자. 그리고 프론트엔드 암호화는 RSA로 할 수 있다고 하셨다. RSA는 처음 들었는데 정리해보자.
- 비동기 통신은 어떤 라이브러리를 사용하셨는지?
- (꼬리 질문) 비동기 api 호출 시 에러처리는 어떻게 했는지? error에 들어간 후속 작업은 어떤 식으로 했는지?
  - alert 처리. alert 외 다른 답변을 원하시는 듯한 인상을 받았다. 예를 들어 오류 페이지로 간다든지. 이 부분은 오류 페이지를 물어보신 것을 볼 때 라우터가드 설정되어있는 부분을 따로 말씀드렸으면 좋지 않았을까? 에러 처리에 대해서 다시 정리해야 한다. 다른 로직을 타게끔 한다든지?
- (꼬리 질문) 공통 에러 처리는 어떻게 했는지? 공통 에러는 무엇무엇을 잡았나?
  - 401, 404 권한 오류, 500 서버 에러
- 웹 페이지가 뜨지 않거나, 느리게 뜬다면 어떻게 해결해야 하나?
  - 웹팩의 코드 스플리팅을 사용했다. 트리쉐이킹 기법이 있다는 것 정도 안다.
  - 웹팩의 다른 방법이 있다고 하심. 이것 공부해보자.
- 살면서 한 가지에 몰두해본 경험?
- 개발 장비 & IDE 어떤 것을 사용?
- 요즘 가장 인상 깊게 본 책이나 강의가 있다면?

기억나는 것은 이 정도.

<br/>

<br/>

## 나의 질문

- 좋은 개발자란?
  - 개발에 대해 진정성이 있는 사람을 말한다. 비유해서 말하자면 프로란, 피아니스트와 같다. 피아노 치는 것을 좋아하는 사람은 학교에서 내는 과제에서 끝낸 사람을 말하는 것이 아니다. 더욱 잘 치기 위해 연구하고 매일 연습을 하는 사람을 말함. 이것이 프로 의식. 따라서 기술을 배울 때 하나라도 깊게 파야 함. 개발도 같다.

<br/>

<br/>

## 면접 피드백

- 프론트엔드의 가장 기본적인 것들만 질문했다. 하지만 CORS에 대해서 잘 모르시는 것 같다.(다른 부분도..) 기대를 했는데 기대를 한 자신에 대한 의구심이 들 정도.
- 깃헙과 블로그를 운영하는 것은 좋은 것 같다. 일주일에 한 번이라도 좋으니 학습한 내용을 블로그에 회고 형식으로 간단하게라도 올리는 것이 좋다.
- 같이 공부할 개발자들을 찾아라. 모각코도 좋고. 우물 안 개구리가 될 수 있다. 함께 무언가를 계속할 수 있는 사람을 찾는 것은 정말 중요하다.
- 면접도 경험이므로 면접을 많이 봐라.
- 포트폴리오 1개는 부족한 느낌이 있다. 1개 정도 더 하는 것을 추천.
- 사실은 강의 보다는 책으로 공부하는 것이 좋다. 깊게 파기 위해서.

<br/>

<br/>

## 느낀 점

- Javascript와 Vue에 대해서 질문하실 줄 알았는데, 없어서 아쉬웠다. 특히 Call Stack, Event Loop, this, 실행컨텍스트, 이벤트 위임, 클로저 등을 질문하실 줄 알고 그런 부분에 대해 답변을 준비해갔는데 질문하지 않으셔서 아쉬웠다. 면접은 어느 회사인지에 따라 공부한 것이 나올 수 있고 나오지 않을 수 있다.
- 솔직히 나는 면접 자체를 피드백해 주는 면접관은 들어본 적이 없다. 너무 감사했다. 피드백이 아프긴 했지만, 내가 얼마나 기초가 부족한지, 개발자로써 가져야 할 자세가 어떤 것인지를 배울 수 있었다.
- 평소에 질문을 저장해두어야겠다. 반복해서 질문할 거리가 없냐고 물으셨는데 별로 질문을 하지 못했다. 이것은 내가 개발자를 어떻게 생각하고 있는지에 대한 자세 문제이다. 개발에 대해 진정성 있고 좋은 개발자에 대해서 평소에 고민한다면 분명 무궁무진 할 텐데. 평소에 공부와 기능 구현에만 신경 쓰는 것이 아니라 개발 자체에 대한 목적, 개발자라는 직업에 대한 생각을 정리할 수 있는 시간을 가져야겠다. 제일 좋은 것은 역시 회고일 듯하다.
- 알고 있는 기술을 말로 잘 표현하는 연습이 충분하지 않았다. 물론 면접을 더 준비하고 면접 경험이 많아지면 따라오겠지만, 우선 상대방에게 말로 표현을 잘하지 못한다면 기술에 대해 잘 알고 있는 것이 아니다.
- 피드백을 들을 때 떨어졌구나 감이 왔다. 맞다. 사실 지금 합격한다면 이상한 일이다. 그래도 지금은 정신을 차리고 내일 할 일을 정리해보고 자야겠다. 멘탈이 무척 약한 편인데 아내가 나보고 예전보다는 훨씬 많이 좋아졌다고 했다. 회복 탄력성!

<br/>

<br/>

## 내일부터 할 것

### 중요도 상

- CORS 에러에 대해 깊게 파보자. 해결법까지. 레파지토리를 하나 파서 직접 코딩하면서 정리하면 아주 좋을 듯.
- https 보안 원리에 대한 공부.
- 스터디 찾기.
- 에러 처리에 대한 공부. 에러를 잡는 것에서 끝나는 것이 아니라 어떻게 다른 로직과 이을지?
- 웹팩 공부.

### 중요도 하

- Jest, Typescript.
- Next.js를 맛이라도 보자. SSR에 대한 것을 직접 구현해보고 SEO가 좋게하는 것에 대해 경험해보자.
