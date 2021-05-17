---
layout: post
title: "(13) Vuex-store와 EventBus에 대한 고찰"
author: [Pozafly]
tags: [Tripllo 제작기, Vue.js]
image: ../img/tripllo/eventBus.png
date: '2021-04-16T15:13:47.149Z'
draft: false
excerpt: 데이터를 Vuex store에 저장시키지 말고 로컬 컴포넌트에서 불러와 EventBus로 통신을 하면 어떻게 될까? 라는 물음에서 시작된 삽질기.

---

# Vuex-store와 EventBus에 대한 고찰



>  Tripllo 프로젝트를 리팩토링하면서, [vue 리팩토링1](https://pozafly.github.io/tripllo/(8)vue-refactor1/)의 `6.store에 필요 없는 state 제거` 파트를 진행하게 되었다. 해당 부분을 상세하게 한번 보면서 생각할 부분을 정리해보자.

<br/>

<br/>

store에서 걷어낸 몇 가지가 있는데 이번 비교는 `checklists` 라는 Todo 관련 컴포넌트를 비교 대상으로 잡았다. checklists는 store에 올라가 있을 만큼 아주 전역적으로 사용되는 녀석은 아니지만, 잘게 쪼개진 컴포넌트에서 공통으로 사용하고 다른 곳에 위치한 컴포넌트에서도 사용한다. 넓게 퍼져있긴 하지만 어플리케이션 전체에서 사용하는 데이터는 아니므로 지우기로 마음을 먹고 진행했다.

<br/>

<br/>

## 소스 비교

### 기존 소스

먼저 checklist를 읽어오는 로직이 

```js
// 상위 컴포넌트
this.READ_CHECKLIST({ id: this.card.id });
```

이렇게 상위 로직에 있었고,

```jsx
// ChecklistWrapper.vue
<Checklists
  v-for="checklist in checklists"
  :key="checklist.id"
  class="checklist"
  v-bind="checklist"
/>

computed: {
  ...mapState(['checklists']),
},
```

이렇게 하위 로직에서 checklists를 state에서 불러들여 3단계를 거치며 하위 로직에까지 이어지도록 되어 있었다. 또 checklists와 관련된 created 로직은 아예 다른 컴포넌트에 붙어있었기 때문에 Vuex의 `actions` 를 통해서 store와 연결된 그런 구조였다.

떨어져 있는 컴포넌트에서는 actions를 통해 dispatch 하고 있었다.

### 변경 소스

state에 있던 checklists 상탯값을 삭제하고, actions, mutations에서 checklists 관련 로직을 제거했다. 그리고 checklists 데이터는 컴포넌트에서 직접 백엔드로부터 가지고 와서 하위 컴포넌트들에게 props로 내려주게끔 했다.

```jsx
// ChecklistWrapper.vue
<Checklists ...(위에와 동일, props로 내려줌) /> 

data() {
  return {
    checklists: [],
  };
},
created() {
  this.readChecklist(this.cardId);
},
methods: {
  readChecklist(cardId) {
    readChecklistAPI(cardId)
      .then(({data}) => {
        this.checklists = data.data;
      })  // catch절 생략
}
```

이렇게 props로 내려주는 구조로 변경하다 보니 문제는 data 수정 후, 다시 checklists를 읽어와야 했기 때문에 `readChecklist()` 메서드도 함께 props로 내려주어 변경 로직이 있는 컴포넌트에서 이 메서드를 사용할 수 있게끔 해주었다.

```js
// 하위 컴포넌트
props: {
  readChecklist: {
    type: Function,
    require: true,
    default: () => {},
    validator(value) {
      return typeof value === 'function';
    },
  },  
}

(...)
 
this.readChecklist(cardId);  // 메서드 사용
```

그리고 한 가지 더 문제점은, 아예 다른 디렉토리에 있는 컴포넌트에서 checklists를 생성하는 부분이 있었는데, 이 또한 생성 후 이곳에 있는 read 메서드를 사용해야 했으므로, Vue의 `EventBus` 를 사용해 해결했다.

```js
// 다른 곳에 있는 생성 로직
createChecklistAPI(...)
  .then(() => {
    bus.$emit('readChecklist', this.card.id);  // 이벤트 버스 사용
  })  // catch 생략
```

```js
// ChecklistWrapper.vue (아까 원래 read 메서드가 있는 컴포넌트)
created() {
  (...)
  this.busListener();
},
beforeDestroy() {
  this.$off('readChecklist');
},
methods: {
  busListener() {
    bus.$on('readChecklist', cardId => {
      this.readChecklist(cardId);
    });
  }, 
}
```

이렇게 EventBus로 이어주었다.

📌 정리를 해보면,

1. Vuex store의 state, actions, mutations에 checklists 관련 로직 모두 제거
2. 컴포넌트 단에서 모든 api 관련 함수를 import 하여 사용
3. 읽어온 데이터와 재사용해야 하는 function을 props를 통해 내려줌
4. 멀리 떨어져 있는 컴포넌트에서는 EventBus 사용

<br/>

<br/>

## store vs 컴포넌트에서 관련 로직 처리(& EventBus)

### 사용하면서 느낀 점

이렇게 컴포넌트에서 api 함수를 처리하고 props와 EventBus를 사용하도록 변경하면서 내가 느꼈던 것은, store가 구조를 파악하기 훨씬 쉽고 직관적으로 어떤 역할을 하는지 알기 편했다는 것이다.

Vuex는 Redux와 같이 `Flux 패턴` 을 적용해 단방향 데이터 흐름을 채택한 구조이다. actions -> mutations -> state 의 구조를 가지기 때문에 어디에서든 actions를 이용해 call 하고 mutations으로 data를 저장, 각 컴포넌트에서 data를 꺼내 쓰는 구조이다. 따라서 이 패턴만 알고 있으면 로직의 흐름을 파악하기 쉽다.

EventBus는 서로 떨어져 있는 컴포넌트 간 통신을 가능하게 하지만, 컴포넌트에서 매번 listener 등록과 listener 제거(제거를 해주지 않으면 bus 상에 데이터가 남기 때문에 컴포넌트가 사라질 때 제거해 주어야 함), 또 어디서 호출하는지 파악하기 쉽지 않기 때문에 로직이 여기저기 흩어져 있는 느낌을 받았다.

### 그러면 왜?

나는 checklists가 store에 올라가있을 만큼 전역적으로 사용되는 데이터는 아니라고 판단했기 때문에 로컬 컴포넌트로 옮겼다. 그러면서 store를 사용하면 되는데 `굳이 내가 그럴 필요가 있었을까?` 에 대한 정당성을 찾기 위해서 속도 측정을 한번 해봤다. ㅋㅋㅋㅋ

<br/>

<br/>

## 더미 데이터로 속도 측정하기

우선 git reset 명령어로 store에 올라가있도록 기존 소스를 복구 시키고, 아래와 같이 더미 데이터를 만들어주었다. 10000개의 데이터를 생성했다.

```js
// ChecklistWrapper.vue (아까 원래 read 메서드가 있는 컴포넌트)
testCreateChecklist() {
  const itemArray = [];
  for (let i = 0; i < 10000; i++) {
    itemArray.push({
      id: i,
      checklistId: 100,
      isChecked: 'N',
      item: i,
    });
  }
  const checklist = [
    {
      cardId: 895,
      id: 100,
      items: itemArray,  // 이곳에 10000개의 데이터가 들어간다.
      title: 'Checklist',
    },
  ];
  this.checklists = checklist;
},
```

이렇게 해주고 기존에 있던 readAPI를 주석 처리하고 렌더링 해보자. 

📌 성능 측정 순서

1. 크롬 개발자도구의 `performance` 탭에 들어감
2. 기록 버튼(빨간색 원)을 누른 후 체크리스트를 체크(이벤트 발생)
3. Stop

결과를 한번 보자. 먼저 store에 올라가 있던 기존 소스다.

<img width="785" alt="스크린샷 2021-04-16 오후 6 07 42" src="https://user-images.githubusercontent.com/59427983/115016684-5f1ce180-9ef0-11eb-816f-a40f0dca3a0a.png">

저기 청록색으로 되어있는 부분에 보면 약간 잘려 있지만 dispatch 된 것을 볼 수 있다. 한 번의 클릭에 `477.36ms` 가 나왔다. 그리고 다시 컴포넌트에서 read 하는 변경된 소스로 테스트해보자.

<img width="786" alt="스크린샷 2021-04-16 오후 6 08 38" src="https://user-images.githubusercontent.com/59427983/115016892-a73c0400-9ef0-11eb-81af-ee194e1505d8.png">

이번엔 `349.68ms` 이 나왔다. 만개를 테스트했는데 생각보다 별 차이가 없다..  그리고 심지어 테스트할 때마다 값이 변하고 심지어 store에 올려서 테스트한 것이 더 빠른 결과를 내기도 했다...🤤 그리고 Vue.js 공식 페이지에서도 이벤트 버스를 권장하지 않는지 이벤트 버스에 대한 이야기나 예제가 별로 없다고 한다.

그렇다면, 앞으로도 계속 이렇게 컴포넌트 뎁스가 깊어지거나 이벤트 버스를 사용할 일이 많아지면 무조건 Vuex를 사용해야 될까? 그렇다면 store에 엄청나게 많은 상탯값이 존재하게 되고 메모리를 많이 잡아먹겠지?

[Vuex store data always reside in memory?](https://stackoverflow.com/questions/50940662/vuex-store-data-always-reside-in-memory) 스택오버플로우에 적힌 답변을 보면, 전체 페이지가 리로드 되지 않으면 Vuex 데이터가 메모리에 남아있게 된다고 한다. 따라서 대형 객체를 삭제해 가비지 컬렉터가 메모리를 해제할 수 있도록 해야 한다고 적혀있다.

정리해보자면,

1. Vuex - store를 사용하든, 지역 컴포넌트에서 데이터를 당겨와 EventBus로 작업하든 속도적인 측면에서는 별 차이가 없다.
2. EventBus를 사용하면 가독성과 데이터 흐름을 파악하기 어려워져 유지 보수가 어려워진다.
3. Vuex가 무거워질 것을 대비해 사용하지 않을 때는, 항상 메모리를 해제할 수 있도록 객체를 초기화해주자.

이 정도 되겠다. 이번 테스트의 목적은, Vuex를 사용하지 않고 지역 컴포넌트에서 데이터를 조작하면 속도가 더 빨라질 것을 알아보는 것이었지만, 오히려 별 차이가 없다는 것을 알게 되었다. 이전 커밋을 가져와서 다시 소스를 짜는 게 생각보다 시간이 오래 걸리긴 했지만, 기존 코드에 더미 데이터를 집어넣어 보면서 속도 측정 연습을 해본 경험이었다고 생각해야지.

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)

