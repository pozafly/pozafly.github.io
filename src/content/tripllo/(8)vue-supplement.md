---
layout: post
title: 'Tripllo(8) vue 보완'
author: [Pozafly]
tags:
  - Tripllo 제작기
image: ../img/tripllo/tripllo8.png
date: '2021-04-03T19:13:47.149Z'
draft: false
excerpt: 멘토링 후, 조언을 주신대로 Vue쪽 보완을 한 내용을 정리해보자.
---



멘토링 후 vue에 대해 보완해야 할 점을 듣고 정리한 내용을 정리해보자.

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

## 2. plugin 폴더 정리

기존에 plugin을 main.js 파일에서 덕지덕지 붙여다 쓰는게 싫어서 따로 plugin.js 파일로 빼서 선언 해두었다.

```js
// plugin.js
import $Google from '@/utils/social/Google';
import $Kakao from '@/utils/social/Kakao';
import $Github from '@/utils/social/Github';
import $Facebook from '@/utils/social/Facebook';

import KProgress from 'k-progress';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import MiniModal from '@/components/common/MiniModal';
import Notifications from 'vue-notification';
import vClickOutside from 'v-click-outside';
import InfiniteLoading from 'vue-infinite-loading';
import { normalFormatDate, timeForToday } from '@/utils/dateFilter';
import LoadScript from 'vue-plugin-load-script';

const install = Vue => {
  Vue.prototype.$Kakao = $Kakao;
  Vue.prototype.$Github = $Github;
  Vue.prototype.$Google = $Google;
  Vue.prototype.$Facebook = $Facebook;
  Vue.component('KProgress', KProgress);
  Vue.component('DatePicker', DatePicker);
  Vue.component('MiniModal', MiniModal);
  Vue.use(LoadScript);
  Vue.use(Notifications);
  Vue.use(vClickOutside);
  Vue.use(InfiniteLoading);
  Vue.filter('normalFormatDate', normalFormatDate);
  Vue.filter('timeForToday', timeForToday);
};

export { install };
```

이렇게 $... 으로 사용했다. [Private 속성 이름](https://kr.vuejs.org/v2/style-guide/index.html#Private-%EC%86%8D%EC%84%B1-%EC%9D%B4%EB%A6%84-%ED%95%84%EC%88%98) 이곳 스타일 가이드에서는, 플러그인, mixin 등에서 커스텀 사용자 private 프로퍼티에는 항상 접두사 `$_` 를 사용하라고 되어 있다. 왜냐하면 다른 사람의 코드와 충돌할 수 있기 때문임.

vue 내부적으로 `_` 달러 없이 언더바는 사용하고 있기 때문에, $_ 를 쓰자.

그리고 filter는 vue3에서는 삭제된 기능이다. 단 2에서 쓸 때는 main.js 에 빼서 따로 적용시켜 주자.

기존의 main.js에서는, 

```js
// main.js
(...)
import { install } from '@/plugin/plugin';

(...)
Vue.use(install);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
```

이런 식으로 불러다썼는데, 우선 filter를 빼서 적용시켜보자. 또한, import 구문에 `@/plugin/plugin` 대신 plugin.js를 index.js로 바꿔서 `@/plugin` 으로 불러서 사용하자.

```js
import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { install } from '@/plugin';
import '@/utils/fontAwesomeIcon.js';
import { normalFormatDate, timeForToday } from '@/utils/dateFilter';

Vue.config.productionTip = false;
Vue.use(install);

Vue.filter('normalFormatDate', normalFormatDate);
Vue.filter('timeForToday', timeForToday);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
```

완성.

<br/>

## 3. 컴포넌트 명 변경

### 컴포넌트 이름에 합성어 사용

[컴포넌트 명 스타일 가이드](https://kr.vuejs.org/v2/style-guide/index.html#%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-A-%EA%B7%9C%EC%B9%99-%ED%95%84%EC%88%98-%EC%97%90%EB%9F%AC-%EB%B0%A9%EC%A7%80)에 나와있는대로 컴포넌트 명을 바꾸었다. 모든 HTML 엘리먼트의 이름은 한 단어이기 때문에 합성어를 사용하는 것은 기존 그리고 향후 HTML 엘리먼트와의 **충돌을 방지해준다**고 한다.

- ex) Spinner -> LoadingSpinner, Noti -> AlertNotification

### Page 명 수정

또한, views 폴더에는 ...Page.vue 들이 들어가 있는데 즉, 페이지 컴포넌트가 들어가있는데, ...Page라고 명시하지 않은 부분을 수정했고, NotFoundPage는 common 폴더에 있던 것을 views  폴더로 이동시켜주었다.

### 컴포넌트 명에 detail 전부 삭제

그리고, ...detail 처럼 명시적이지 않은 부분을, 최대한 명시적으로 이름을 모두 변경하였다. 이 작업이 굉장히 시간이 오래 걸렸음. 내가 작명할 때 얼마나 대충 했는지, 협업을 위한 준비가 되어있지 않았다는 사실을 알게 되었음.

### import 구문에 .vue 붙이기

import 구문에 .vue가 붙어있지 않다면 vscode에서 ctrl + 클릭으로 이동이 불가능하기 때문에 .vue를 붙여줌. js나 기타 파일은 vscode가 인식하지만, .vue 같은 경우는 vscode 입장에서 외계어이기 때문에 이동이 불가능했다.

### 폴더에 (...).js로 붙이지말고 대표되는 파일에 index.js 바꾸기

일반적으로 폴더를 하나 만들고 끌어다 쓸 때는 index.js를 붙이지 않아도 되므로 대표 파일을 index.js 라고 바꿔주었다.

<br/>

## 4. router

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

이렇게 해주어야 함. 왜냐하면 와일드카드가 다른 주소에 걸릴 수 있기 때문에.

### 가드 처리가 있어야 함.

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

## props 타입 정의

기존에 prop 을  `props: ['member'],` 이런식으로 정의했었다면, 

```js
props: {
  member: {
    type: Object,
    default: null,
  },
},
```

이렇게 타입과 디폴트 값을 넣어주자. default도 object 형태로..

<br/>

## eslint

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

이렇게 공식 문서에서 정한 순서대로 error를 뱉어준다.

<br/>

## store에 strict 모드 추가하기

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

## webStorage 변경, encode 작업

```js
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

Base64 참고 자료 : https://pks2974.medium.com/base-64-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-da50fdfc49d2 => 정리하자

<br/>

## 라이프 사이클 함수에서 의미 단위 함수로 묶기

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

이런 식으로 묶기. 이런 식으로 묶어주면, 코드는 최대한 간결하고 명료하게.

<br/>

## dataSet 없애기

`data-...` 는 태그에 연결은 안해도 된다. dataSet은 프레임워크가 없을 때 예전에 사용하던 방법이다.



<br/>

## Sub

- button type 넣어주기(접근성 차원에서)
- if문 block 넣어주기(javascript 만든 할아버지께서 말씀하심 - 안정성 때문인듯.)
- es6 화살표 함수 안되어있었던 것 다 처리.




<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

# 계속해서 작성중....


<br/>
<br/>

<br/>

## 배운점

1. 코드를 일관성있게 작성하는게 좋다. JS는 코드 스타일 선택 폭이 넓어서 어디에는 이거 어디에는 저거 방식대로 짤 수 있는데, 이걸 일관되게 해주는 것.
2. 최대한 안정성 있게 짜자. if 문 같은 것은 블록 처리하는게 안전하게 작성하는 것.
3. store에서 처리하지 않아도 되는 것은 컴포넌트 단에서 처리하자.
4. 협업을 위해 변수 명이나 컴포넌트 명, 규칙을 가지고 만들자. 다른 사람이 봤을 때 이해하기 쉽도록.
5. 코드가 중복 되는 것이 있다면 함수화, 모듈화 하자.
6. 오류 처리를 반드시 하자. 비동기 처리 Promise에서 .catch()를 먼저 사용함으로 반드시 catch를 할 수 있도록 하자.
7. 라이프 사이클 메서드에서나, sideEffect가 있는 곳에서는 의미 단위로 함수로 뽑아서 사용하자.

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)