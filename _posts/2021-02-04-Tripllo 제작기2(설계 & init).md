---
title: "Tripllo 제작기 2 (설계 & init)"
excerpt: "블라블라"
categories:
  - Tripllo
tags:
  - Tripllo
  - 제작기
last_modified_at: 2021-02-03
toc: true
toc_sticky: true

---

## Tripllo 제작기 2 (설계 & init)

### 웹 개발 절차

통상적인 웹 개발 절차는

- 요구사항 -> 서비스 기획 -> UI, UX 상세 설계 -> GUI 디자인 -> 퍼블리싱 -> 백엔드 API 개발 -> 프론트엔드개발 -> QA

순이라고 한다. 요구사항, 서비스 기획, UI, UX 상세설계, GUI 디자인은 이미 나와있는 Trello 어플리케이션을 참고할 것이기 때문에 계획 할 필요는 없을 것 같고, DB 설계를 잡아두고 나중에 내가 추가하고 싶은 기능에 따라 유동적으로 테이블을 수정해나가기로 했다. 

#### DB설계

첫 설계는 이렇다.