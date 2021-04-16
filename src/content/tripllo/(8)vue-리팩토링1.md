---
layout: post
title: '(8) vue 리팩토링1'
author: [Pozafly]
tags:
  - Tripllo 제작기
image: ../img/tripllo/refactor1.jpg
date: '2021-04-03T19:13:47.149Z'
draft: false
excerpt: 멘토링 후 Tripllo에 꽤 많은 것을 손봐야한다는 것을 알게 되었다. 하나하나 고쳐보면서 정리한 것을 기록해보자.
---



멘토링 후 vue에 대해 보완해야 할 점을 듣고 정리한 내용을 정리해보자.

## 목차

1. package.json 정리(안쓰는 라이브러리 제거, 개발용 배포용 라이브러리 구분)
2. vue plugin eslint 설정 후 적용
3. 컴포넌트 명 변경
4. 라우터 가드 설정
5. 라이프 사이클 함수에서 의미 단위 함수로 묶기
6. store에 필요없는 state 제거
7. dataSet 없애기
8. store에 strict 모드 추가하기
9. webStorage 변경, userData encoding 작업

<br/>

<br/>

## 1. package.json 정리(안쓰는 라이브러리 제거, 개발용 배포용 라이브러리 구분)

기존 package.json 파일을 보자.

```json
"dependencies": {
  (...)
  "node-sass": "^5.0.0",
  "sass-loader": "^10.1.0",
  "webstomp-client": "^1.2.6"
},
"devDependencies": {
  (...)
  "@vue/cli-plugin-unit-jest": "~4.5.0",
  "@vue/test-utils": "^1.0.3",
}
```

걸리는 것은 이 5가지다. 먼저 webstomp-client는 사용하지 않았는데, 시도해보기 위해서 깔아뒀던 것. 그리고, 내 소스에는 test 라이브러리와, jest 관련 작업들이 없으므로 지워준다. devDependencies라 안지워도 되나? 싶기도 함.  `npm uninstall` 로 지운다. 

그리고 `node-sass`, `sass-loader` 두 가지는 [캡틴판교님 웹팩 핸드북 dependencies](https://joshua1988.github.io/webpack-guide/build/npm-module-install.html#npm-%EC%A7%80%EC%97%AD-%EC%84%A4%EC%B9%98-%EC%98%B5%EC%85%98-2%EA%B0%80%EC%A7%80)에 보면 잘 나와있듯, webpack에서 build시 필요한 로더 이므로 devDependencies로 옮겨 주어야 한다.

여기서 node-sass, sass-loader를 그냥 scss를 사용하기위해 넣어둔 것인데, 정확한 개념을 다시 한번 보자.

---

- node-sass : node 환경에서 sass를 css 코드로 변환해줌.
- sass-loader : 
  - [npm sass-loader](https://www.npmjs.com/package/sass-loader) 에 이렇게 말하고 있다. Sass / SCSS 파일을 로드하고 CSS로 컴파일 해줌. 기본적으로 로더는 종속성을 기반으로 구현함. 필요한 구현을 `package.json`( `sass`또는 `node-sass`패키지)에 추가하고 종속성을 설치해라.

---

따라서 

```json
"dependencies": {
  (...)
},
"devDependencies": {
  (...)
  "node-sass": "^5.0.0",
  "sass-loader": "^10.1.0",
}
```

이렇게 싸악 정리가 되었다.

<br/>

<br/>

## 2. vue plugin eslint 설정 후 적용

.eslintrc.js 파일에,

```js
extends: ["plugin:vue/essential", "@vue/prettier"],
```

이렇게 essential 이 되어있었다. 제일 약한 버전. 이걸 recommended 로 해주자. 쎈걸로. 이건 따로 공식 문서를 보고 정리해야한다. https://eslint.vuejs.org/ 여기

```js
'vue/order-in-components': ['error', {
  "order": [
    "el",
    "name",
    "key",
    "parent",
    "functional",
    ["delimiters", "comments"],
    ["components", "directives", "filters"],
    "extends",
    "mixins",
    ["provide", "inject"],
    "ROUTER_GUARDS",
    "layout",
    "middleware",
    "validate",
    "scrollToTop",
    "transition",
    "loading",
    "inheritAttrs",
    "model",
    ["props", "propsData"],
    "emits",
    "setup",
    "asyncData",
    "data",
    "fetch",
    "head",
    "computed",
    "watch",
    "watchQuery",
    "LIFECYCLE_HOOKS",
    "methods",
    ["template", "render"],
    "renderError"
  ],
}],
```

이렇게 공식 문서에서 정한 순서대로 error를 뱉어준다. 이렇게 순서를 정해놓으면 좋은 점이, 만약 created 라이프사이클 함수를 사용했는데, 이미 선언 한 것을 잊고 다른 곳에 새로 작성해줄 경우 기존 created 함수에 적용했던 로직이 무시되는 경우가 발생. 또한 다른 이들과 협업할 시 위치가 일관성있게 짜여지지 않으면 충돌이 날 수 있다.

<br/>

<br/>

## 3. 컴포넌트 명 변경

### 컴포넌트 이름에 합성어 사용

[컴포넌트 명 스타일 가이드](https://kr.vuejs.org/v2/style-guide/index.html#%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-A-%EA%B7%9C%EC%B9%99-%ED%95%84%EC%88%98-%EC%97%90%EB%9F%AC-%EB%B0%A9%EC%A7%80)에 나와있는대로 컴포넌트 명을 바꾸었다. 모든 HTML 엘리먼트의 이름은 한 단어이기 때문에 합성어를 사용하는 것은 기존 그리고 향후 HTML 엘리먼트와의 **충돌을 방지해준다**고 한다.

- ex) Spinner -> LoadingSpinner, Noti -> AlertNotification

<br/>

### Page 명 수정

또한, views 폴더에는 ...Page.vue 들이 들어가 있는데 즉, 페이지 컴포넌트가 들어가있는데, ...Page라고 명시하지 않은 부분을 수정했고, NotFoundPage는 common 폴더에 있던 것을 views  폴더로 이동시켜주었다.

<br/>

### 컴포넌트 명에 detail 전부 삭제

그리고, ...detail 처럼 명시적이지 않은 부분을, 최대한 명시적으로 이름을 모두 변경하였다. 이 작업이 굉장히 시간이 오래 걸렸음. 내가 작명할 때 얼마나 대충 했는지, 협업을 위한 준비가 되어있지 않았다는 사실을 알게 되었음.

<br/>

### import 구문에 .vue 붙이기

import 구문에 .vue가 붙어있지 않다면 vscode에서 ctrl + 클릭으로 이동이 불가능하기 때문에 .vue를 붙여줌. js나 기타 파일은 vscode가 인식하지만, .vue 같은 경우는 vscode 입장에서 외계어이기 때문에 이동이 불가능했다.

<br/>

### 폴더에 (...).js로 붙이지말고 대표되는 파일에 index.js 바꾸기

일반적으로 폴더를 하나 만들고 끌어다 쓸 때는 index.js를 붙이지 않아도 되므로 대표 파일을 index.js 라고 바꿔주었다.

<br/>

<br/>

## 4. 라우터 가드 설정

### 와일드 카드 맨 아래로 두기

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: () => import('@/views/NotFoundPage.vue') },
    { path: '/', beforeEnter: firstAccess },
    (...)
  ],
});
```

이녀석을,

```js
routes: [
  { path: '/', beforeEnter: firstAccess },
  (...)
  { path: '*', component: () => import('@/views/NotFoundPage.vue') },
],
```

이렇게 해주어야 함. 왜냐하면 와일드카드가 다른 주소에 걸릴 수 있기 때문에. 가드 처리가 있어야 함.

프론트에서 route 처리중 가장 중요한 것은 권한에 따라 페이지를 막는 것이 제일 중요하다. 예를들면 로그인 되지 않은 상태로 url을 쳐서 화면을 넘길 때, 현재는 이 처리가 되어있지 않을때,

![스크린샷 2021-04-02 오후 9 10 01](https://user-images.githubusercontent.com/59427983/113414586-4a245680-93f8-11eb-8fae-5e7b42b8e094.png)

이런 식으로 권한이 없다고 나오지만, 페이지가 보여진다. 만약, 중요한 페이지인데 권한이 없는 누군가 url을 쳐서 페이지에 접속했을 때 보여지면 안되는 페이지라면 안되기 때문. 페이지 자체가 보이지 않도록 가드를 걸어줘야 함.

```js
// routes/index.js
const requireAuth = (to, from, next) => {
  const loginPath = `/auth`;
  if (store.getters.isAuth) {
    next();
  } else {
    alert('로그인 되어있지 않습니다.');
    next(loginPath);
  }
};

(...)

{
  path: '/profile',
  component: () => import('@/views/ProfilePage.vue'),
  beforeEnter: requireAuth,
},
```

<br/>

<br/>

## 5. 라이프 사이클 함수에서 의미 단위 함수로 묶기

예를 들면,

```js
created() {
  if (this.socket === null) {
    socketConnect();
    (...)
  }
  bus.$on('receive-message', data => {
    this.receive(data);
  });
},
```

이걸

```js
created() {
  socketConnect();
  this.receive();
},
 
method: {
  receive() {
    (...)
  }
}
```

이런 식으로 묶기. 이런 식으로 묶어주면, 의미 단위로 모듈화가 가능하고, 라이프 사이클 함수에서 어떤 작업을 하는지 한눈에 보이기 때문이다. 즉, 기존에 라이프 사이클 함수에 여러 로직이 혼재해 있으면 어떤 작업을 하는지 빠르게 파악하기 어렵다.

<br/>

<br/>

## 6. store에 필요없는 state 제거

### mainTapId state에서 제거

sessionStorage에 mainTapId를 넣어서, state에서 사용하지 않게끔 했다. main페이지에서 tab별로 보여지는 데이터가 다른데, 1 depts만 서로 주고받기 때문에 state보다는 sessionStorage를 사용하는게 맞다고 생각된다. 그리고 데이터를 굳이 보존하는 이유는, 탭에서 board 페이지로 접근 후, 다시 빠져나왔을 때, 해당 tab 화면이 유지가 되어야 하기 때문이다.

하지만, sessionStorage를 사용할 때, 현재 프로젝트에서는 한번 로그인 하면, localStorage에 유저 정보와 토큰을 가지고 있어, login 페이지로 가는 것이 아니라 바로 main 화면으로 가게된다. 그렇게 되면 탭을 닫을 때 사라지는 sessionStorage는 어디에선가 한번 초깃값을 주어야 한다.

처음에는 Tab이 있는 컴포넌트 created 함수에서 했지만, Tab이 있는 화면으로 항상 오기 때문에 무조건 초깃값인 0이 설정되어 버린다. 그러면 sessionStorage를 사용하는 의미가 없어지기 때문에 내가 선택한 곳은 `App.vue` 에 선언하는 것.

`saveSessionStorage('mainTabId', 0);` 이렇게 App.vue에 created 함수에 선언해주었다.

📌 추가

checklist, hashtags, comment 등 store에 반드시 있지 않아야 하는 것을 제거 했다. api 함수를 바로 컴포넌트단에서 호출해, 받아온 데이터를 store에 등록하는 것이 아니라 로컬 컴포넌트의 `data` 객체에 넣어주는 것.

[(13)Vuex-store와 EventBus에 대한 고찰(feat. 삽질기)](https://pozafly.github.io/tripllo/(13)Vuex와-eventBus/) 에 삽질기를 정리해두었다.

<br/>

<br/>

## 7. dataSet 없애기

`data-...` 는 태그에 연결은 안해도 된다. dataSet은 프레임워크가 없을 때 예전에 사용하던 방법이다.

```html
<someComponent :data-id="data.id" ref="some"></someComponent>

(...)

<script>
  const id = this.$ref.some.dataset.id;
</script>
```

이렇게 되어 있는 녀석을

```html
<someComponent :id="data.id" ref="some"></someComponent>

(...)

<script>
  const id = this.$ref.some.getAttribute('id');
</script>
```

이런 형식으로 가져오게 만들었다.

📌 추가

이렇게 v-bind를 사용해서 DOM에 붙이는 방법을 사용하지 않고, data에 초기화 후 이벤트가 일어날 때마다 methods에서 처리하는 방법을 사용했다. 즉, 사실은 DOM에 데이터를 붙이는 방법 자체가 Vue 스럽지 않은 방법이다. 어떻게 수정했는지 예시를 한번 보자.

```html
<div ref="boardItem">
  <div
    v-for="board in personalBoard"
    :key="board.id"
    class="board-list"
    :lastCreatedAt="board.createdAt"
  >
  </div>
</div>

(...)

<script>
infiniteHandler($state) {
  this.READ_PERSONAL_BOARD(this.lastCreatedAt)
  .then(({ data }) => {
    (...)
    this.pushPersonalBoard(data.data);
  });
  setTimeout(() => {
    if (this.isInfinity === true && this.$refs.boardItem) {
      this.lastCreatedAt = this.$refs.boardItem.lastChild.getAttribute(
        'lastCreatedAt',  // 🌈
      );
      $state.loaded(); // 계속 데이터가 남아있다는 것을 infinity에게 알려준다.
    }
  }, 1000);
},
</script>
```

- 🌈 : 이 부분에서 getAttribute로 가져옴.

분석해보자면, 마지막 DOM의 createAt 값이 필요했기 때문에  ref가 걸린 상위태그의 .lastChild를 가져와서 child에 v-bind 되어있는 녀석을 `getAttribute` 로 값을 가져오는 형태이다.

하지만 이럴 필요가 전혀 없다. DOM에 데이터를 붙이는게 아니라 그냥 받아온 data에서 마지막 값을 넣어주기만 하면 되는 것이었다.

```html
<div v-for="board in personalBoard" :key="board.id" class="board-list">
(...)

<script>
 infiniteHandler($state) {
   this.READ_PERSONAL_BOARD(this.lastCreatedAt)
     .then(({ data }) => {
        (...)
        this.pushPersonalBoard(data.data);
        setTimeout(() => {
          const boardItem = data.data;
          const lastCreatedAt = boardItem[boardItem.length - 1].createdAt;
          this.lastCreatedAt = lastCreatedAt;
          $state.loaded(); // 계속 데이터가 남아있다는 것을 infinity에게 알려준다.
        }, 1000);
      }
   })
},
</script>
```

이렇게 간단한 일을 그냥 ref고, getAttribute로 DOM에 직접 데이터를 바인딩해서 온갖 짓을 다한 것이다. DOM에 필요없는 데이터를 노출시킴으로써 사용자에게 필요 없는 정보를 보여줄 수도 있는 위험이 있으며, 에러 로그 또한 마찬가지로 data를 불러오지 않았을 때도 getAttribute를 실행해버려서 boardItem이 붙지 않은 상태에서 가져오려하니 찍히기 일수였다.

즉, 이번 코드를 고치면서 깨닳은 것은, Vue 프레임워크를 사용할 때, 직접 UI에 뿌려줘야하는 데이터가 아니면 script 내부적으로 데이터를 사용하게끔 설계하는 것이 정말 중요하다는 것을 배웠다.

<br/>

<br/>

## 8. store에 strict 모드 추가하기

```js
import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/store/actions';
import getters from '@/store/getters';
import state from '@/store/state';
import mutations from '@/store/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.development,  // 이부분
  state,
  getters,
  mutations,
  actions,
});
```

저부분을 왜 추가하냐? mutation이 store만 변화 시켜야하는데, 다른걸 변화시킬때 오류를 내준다. 따라서 개발 모드에서만 strict 모드를 사용하고 production 모드에서는 끄기.

<br/>

<br/>

## 9. webStorage 변경, userData encoding 작업

기존코드는

```js
// webStorage.js
function saveUserToLocalStorage(user) {
  localStorage.setItem('user_id', user.id);
  localStorage.setItem('user_email', user.email);
  localStorage.setItem('user_name', user.name);
  localStorage.setItem('user_social', user.social);
  localStorage.setItem('user_bio', user.bio);
  localStorage.setItem('user_picture', user.picture);
  localStorage.setItem('user_recentBoard', user.recentBoard);
  localStorage.setItem('user_invitedBoard', user.invitedBoard);
  localStorage.setItem('user_created_at', user.createdAt);
}

function saveUserToken(token) {
  localStorage.setItem('user_token', token);
}
```

localStorage와 state에서 이렇게 user 객체를 하나의 단위로 올리는 작업을 하고 있었다. user 객체로 묶어서 작업하는게 좋을 듯 하다고 해서 user객체를 하나의 JSON String으로 만들고 사용할 때는 parse 해서 사용하는 것으로 바꾸었다. 코드량이 많기도 하고, 묶어서 관리하는게 좋다.

```js
// webStorage.js

// 인코딩, 디코딩 함수
const makeIncodeValue = (key, value) => {
  const data = encodeURIComponent(JSON.stringify(value));
  localStorage.setItem(key, btoa(data));
};

const returnDecodeValue = value => {
  const decode = atob(value);
  const data = JSON.parse(decodeURIComponent(decode));
  return data;
};

// 로컬스토리지 관련 함수(user)
const saveUserToLocalStorage = user => {
  makeIncodeValue('TRIPLLO-V1-U', user);
};

const getUserFromLocalStorage = () => {
  if (localStorage.getItem('TRIPLLO-V1-U')) {
    return returnDecodeValue(localStorage.getItem('TRIPLLO-V1-U'));
  }
};

// 로컬스토리지 관련 함수(token)
const saveTokenToLocalStorage = token => {
  makeIncodeValue('TRIPLLO-V1-T', token);
};

const getTokenFromLocalStorage = () => {
  if (localStorage.getItem('TRIPLLO-V1-T')) {
    return returnDecodeValue(localStorage.getItem('TRIPLLO-V1-T'));
  }
};
```

추가로 중요한 정보이니까, Base64로 인코딩 작업을 했다. 근데 network 탭에 찍히기 때문에 이 작업은 서버에서 따로 디코딩해서 작동하도록 만드는게 좋을 듯 한데 우선 그냥 로컬 단에서 디코딩해 사용했다.

Base64 참고 자료 : https://pks2974.medium.com/base-64-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-da50fdfc49d2

<br/>

<br/>

다음 페이지에.. [이동](https://pozafly.github.io/tripllo/(9)vue-리팩토링2/)

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)