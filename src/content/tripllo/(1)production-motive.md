---
layout: post
title: '(1) 제작동기'
author: [Pozafly]
tags:
  - Tripllo 제작기
image: ../img/tripllo/tripllo1.png
date: '2021-02-03T10:03:47.149Z'
draft: false
excerpt: Trello 어플리케이션을 만들기 시작한 지 벌써 2달이 조금 안 되었다. 하루에 10시간씩 꼬박 시간을 들여가며 만드는 시간이 조급하면서도 즐거웠다. 현재 어플 상태는 3/4 정도 만들어진 상태로 배포되어 있다. 어플을 만들면서 다음번에 같은 문제를 만났을 때 참고할 만한 자료를 남겨두어야지 생각만 하다가 지금부터라도 남겨두어야겠다 싶어 제작기를 적으려고 한다.
---

> Trello 어플리케이션을 만들기 시작한 지 벌써 2달이 조금 안 되었다. 하루에 10시간씩 꼬박 시간을 들여가며 만드는 시간이 조급하면서도 즐거웠다. 현재 어플 상태는 3/4 정도 만들어진 상태로 배포되어 있다. 어플을 만들면서 다음번에 같은 문제를 만났을 때 참고할 만한 자료를 남겨두어야지 생각만 하다가 지금부터라도 남겨두어야겠다 싶어 제작기를 적으려고 한다.

## 제작 동기

평소에 여행을 갈 때 Trello를 아주 유용하게 사용했다. 우선 Trello는 계획을 세울 때 Board를 먼저 만들고 그 안에서 card를 만들어 계획을 적은 다음 계획을 수정할 때나, 마친 계획이 적힌 card를 내가 원하는 위치에 드래그해서 옮길 수 있는 매우 직관적인 어플이다. 나는 Trello를 계획을 짤 때만 사용했지만 사실 Trello는 소프트웨어 회사에서 이슈 트래커로 사용하고 있다고 한다. Team 단위로 Board를 꾸밀 수 있고, 파일을 올릴 수 있으며 댓글로 소통한다. 그리고 누가 어떤 계획을 세웠는지, 어떤 변경 점이 있었는지 log가 다 표시되어 이슈 트래킹에 적합하다고 한다. 나는 Trello를 통해서 여행계획 틀을 잡고 친구들을 해당 Board에 초대해 세부 계획을 완성해가는 용도로 사용했다.

또한, Trello는 굉장히 직관적이다. 내가 아는 단순한 정보를 열거할 수도 있고 계획같이 순서가 필요한 단위에 사용하기에도 좋다. 무엇보다 혼자서 사용할 수도 있지만, 누군가와 공유할 수 있다는 점이 매력적이었는데, 따라서 Tripllo에 반드시 넣어야 하는 기능은 누군가를 초대해서 함께 Board를 꾸밀 수 있는 기능과 card 단위로 드래그할 수 있는 직관적인 기능이다. 어쨌든 내가 만난 어플들 중 꽤 유용하게 사용했기 때문에 이 어플을 Clone 하는 포트폴리오를 만들면 좋겠다고 생각했다. 내가 즐겁게 사용할만한 것을 개발해야 다른 이들도 즐겁게 내 포트폴리오를 구경할 것 같았다. 나는 주로 여행할 때 어플을 사용했기 때문에 네이밍은 그냥 마음이 가는 대로 Trip + Trello = Tripllo가 어떨까?

<br/>

## 기술 선택

이전에 일했던 곳에서 Vue.js를 사용했으므로 프론트는 Vue로 하기로 했다. Tripllo 제작을 하기 전 워밍업으로 기존에 들었었던 Vue 강의를 빠르게 다시 듣고 시작했다. 백단은 SpringBoot로. MySQL과 MyBatis. 배포는 이전에 이동욱님의 [스프링부트와 aws로 혼자 구현하는 웹서비스](https://jojoldu.tistory.com/463)로 공부해뒀던 AWS 배포 방식을 따르기로 했다. 즉, 크게는 3가지. Vue, SpringBoot, AWS. 사실 내가 가고싶은 분야는 스타트업인데(약간의 환상이 있다.) 스타트업은 대부분 react를 사용하지만 우선 내가 가장 자신 있는 Vue를 사용해서 만들고 싶었다. Vue 또한 마찬가지로 SPA라 react를 나중에 배우더라도 감을 익힌 상태로 배울 수 있지 않을까 하는 생각..

<br/>

## 마음가짐

처음부터 끝까지 단순히 혼자 만드는 웹 서비스라 매우 기대 되었다. 내가 스스로 얼마만큼 구현할 수 있는지, 또 구글링이던, 강의를 다시 듣던 스스로 문제를 해결해 갈 수 있는 사람인지 테스트 하는 시간이라 생각되었다. 무엇보다 내가 원하는대로, 내가 만족할만한 일을 하는 것은 굉장히 기쁜 일이다. 나는 위에 스프링부트와 aws로 혼자 구현하는 웹서비스 책의 저자 이동욱님의 블로그를 가끔 들어가보고 괜찮은 정보 & 생각들을 공유받는데, 그곳에 [착각 주도 개발](https://jojoldu.tistory.com/496?category=689637)이라는 게시글이 있다. 간단히 말해서 내가 뭔가 아주 중요하고 대단한걸 개발하고 있다고 착각하면 프로젝트를 끝까지 마무리할 수 있다는 것이다. 분명, 착각 속에 개발하는 것은 참 즐겁다.

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)