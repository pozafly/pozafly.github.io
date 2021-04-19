---
layout: post
title: '(9) vue 리팩토링2'
author: [Pozafly]
tags:
  - Tripllo 제작기
image: ../img/tripllo/refactor2.jpg
date: '2021-04-04T19:13:47.149Z'
draft: false
excerpt: 멘토링 후 Tripllo에 꽤 많은 것을 손봐야한다는 것을 알게 되었다. 하나하나 고쳐보면서 정리한 것을 기록해보자.
---



## 목차

10. props valid
11. plugin 폴더 정리
12. nextTick 없애기 & 사용자 지정 디렉티브 연결
13. 비동기 메서드 에러 핸들링
14. API 함수에 JSDoc으로 스펙 명세하기
15. API 함수 이름 구체화 및 API 접두사로 감싼 속성 제거하기
16. Travis 배포 자동화
17. Sentry 에러 로깅 시스템 도입
18. Let's Encrypt 갱신 자동화
19. Sub

<br/>

<br/>

## 10. props valid

기존에 prop 을  `props: ['member'],` 이런식으로 정의했었다면, 

```js
props: {
  member: {
    type: Object,
    require: true,
    default: () => ({...}),
    validator: () => ({...}),
  },
},
```

이렇게 타입과 디폴트 값을 넣어주자. default, require, validator도 사용할 수 있다. 하지만 `type: Object` 는 벨리데이션 체크에는 크게 좋지 않은 형태인 듯 하다. Object 형태로 모두 다 받아오는 것이 아니라 필요한 props 만 받고 String, Number, Array 형태로 받는게 좋을 듯 하다.

아래는 기존에 Object 형태였던 type을 [오브젝트의 속성(Properties) 전달](https://github.com/pozafly/TIL/blob/main/Vue/Vue2/Props.md#%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EC%86%8D%EC%84%B1properties-%EC%A0%84%EB%8B%AC)을 이용해서 바꿔보자. 

먼저 기존 코드다.

```js
// 상위 컴포넌트
<ProfileImage :board="board" />

// 하위 컴포넌트
props: {
  board: {
    type: Object,
    require: true,
    default: () => ({
      createdBy: '',
      createdByPicture: '',
    }),
  },  
}
```

이런식으로 prop을 받고 있었다면,

```json
// 상위 컴포넌트
<ProfileImage v-bind="board" />  // 이 부분

// 하위 컴포넌트
createdBy: {
  type: String,
  require: true,
  default: '',
  validator(value) {
    return typeof value === 'string';
  },
},
someProp: {
  type: Number,
  require: false,
  default: 0,
  validator(value) {
    return [1, 2, 3].indexOf(value) !== -1;
  },
},
(...)
```

- 이 부분 : **v-bind:something**="some" 이렇게 되어있던 부분이 **v-bind**="some" 이렇게 변화되었다. 그렇게 되면 some 객체가 알아서 key 값을 풀어준다. 위의 props는 createBy, someProp, 등등 some 안에 들어있는 key값이 풀어진 형태다.

이렇게 되면 validator를 상세하게 붙여줄 수 있다. 코드량이 많아지긴 하지만 상세한 valid 체크, 문서화가 가능하다. 또한 모든 객체를 사용하는 것이 아니기 때문에 객체 중 어떤 값을 사용하고 있는지 파악하기 쉬워진다는 장점이 있다.

<br/>

<br/>

## 11. plugin 폴더 정리

기존에 plugin을 main.js 파일에서 덕지덕지 붙여다 쓰는게 싫어서 따로 plugin.js 파일로 빼서 선언 해두었다.

```js
// 기존 plugin/plugin.js
import $Google from '@/utils/social/Google';
(...)

const install = Vue => {
  Vue.prototype.$Google = $Google;
  (...)
};

export { install };
```

이렇게 $... 으로 사용했다. [Private 속성 이름](https://kr.vuejs.org/v2/style-guide/index.html#Private-%EC%86%8D%EC%84%B1-%EC%9D%B4%EB%A6%84-%ED%95%84%EC%88%98) 이곳 스타일 가이드에서는, 플러그인, mixin 등에서 커스텀 사용자 private 프로퍼티에는 항상 접두사 `$_`(언더바 추가) 를 사용하라고 되어 있다. 왜냐하면 다른 사람의 코드와 충돌할 수 있기 때문임.

vue 내부적으로 달러 없이 언더바만 사용하고 있기 때문에, `$_` 를 쓰자. `$Google` 을 `$_Google` 이렇게.

그리고 filter는 vue3에서는 삭제된 기능이다. 단 2에서 쓸 때는 main.js 에 빼서 따로 적용시켜 주자. 기존의 main.js에서는, 

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
import { normalFormatDate, timeForToday } from '@/utils/dateFilter';

Vue.config.productionTip = false;
Vue.use(install);  // 플러그인 불러 사용함.

// 필터 관련
Vue.filter('normalFormatDate', normalFormatDate);
Vue.filter('timeForToday', timeForToday);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
```

완성.

📌 추가.

아래의 리팩토링 12번 `사용자 정의 디렉티브` 를 쓰면서 main.js 가 다시 더렵혀졌다. 따라서 제대로 모듈화를 해보자.

src 아래에 `features(기능)`이라는 폴더를 만들었다. 그곳에 directive.js, filter.js, plugin.js 3개의 파일을 만들고 각각 정의 해주었다.

- `directive.js` : 사용자 정의 디렉티브

  ```js
  const useDirective = Vue => {
    // v-focus
    Vue.directive('focus', {
      (...)
    },
    (...)
  };
  export { useDirective };
  ```

- `filter.js` : 시간 관련 필터

  ```js
  // 필터 정의 함수들
  (...)
  export const useFilter = Vue => {
    Vue.filter('normalFormatDate', normalFormatDate);
    Vue.filter('timeForToday', timeForToday);
  };
  ```

- `plugin.js` : 외부 플러그인, 내가 정의한 플러그인

  ```js
  import $_Google from '@/utils/social/Google';
  (...)
  const usePlugin = Vue => {
     // 플러그인 정의
     (...)
  };
  export { usePlugin };
  ```

그리고, main.js 에서 깔끔하게 불러들여보자.

```js
import Vue from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import { usePlugin } from '@/features/plugin';        // 🔥
import { useDirective } from '@/features/directive';  // 🔥
import { useFilter } from '@/features/filter';        // 🔥

Vue.config.productionTip = false;

Vue.use(usePlugin);     // 🔥
Vue.use(useDirective);  // 🔥
Vue.use(useFilter);     // 🔥

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
```

이렇게.

<br/>

<br/>

## 12. nextTick 없애기 & 사용자 지정 디렉티브 연결

### nextTick 없애기

Vue는 DOM 업데이트를 비동기로 하는데, 특정 DOM이 갱신되기 전에 DOM의 데이터를 가져오려고 할 때 오류가 생긴다. 예를 들어 created 라이프사이클 함수에서 DOM의 정보를 가져올 때. 하지만, nextTick은 이를 방지해준다. DOM이 마운트되고 난 후 nextTick 안의 콜백이 실행되기 때문에 콜백 안에서 데이터 조작 시 에러를 뿜지 않음.

정확한 nextTick의 사용법을 알지못하고 남용했다. 따라서 mounted 라이프사이클 메서드에서 사용했던 nextTick의 콜백만 남기고(DOM의 데이터를 가져오는 로직) nextTick을 제거했다. mounted 라이프사이클 함수는 DOM이 입혀지고 난 후 실행되기 때문이다.

나머지는 제거 후 아래의 두가지에만 nextTick을 유지했다. 

1. created 함수 실행 때, DOM에서 정보를 가져와 해당 정보로 비동기 api 호출 시. (특별하지 않은 이상 주로 비동기 api 함수 호출 장소는 created 라이프사이클 함수에서 한다)
2. Modal 같이 DOM에 달라붙기 전 DOM 정보를 가져오는 작업이 필요할 때.

현재는 nextTick이 **아예 없다**. nextTick을 사용해도 되고 사용하지 않아도 되지만, 캡틴판교님의 [Vue.js 입문자가 실무에서 주의해야 할 5가지 특징](https://www.youtube.com/watch?v=Z9OGUU6G8vM) 강의에 보면, nextTick 사용 시 불필요한 코드 복잡도가 증가하므로 사용을 지양해야한다고 한다.

<br/>

### 사용자 지정 디렉티브 연결

그리고, 주로 nextTick을 사용할 때는 mounted 메서드에서 input 태그에 focus를 줄 때가 많았으므로 사용지 지정 디렉티브를 만들어 연결시켜 주었다.

```html
<input
  ref="title"
  (...)
/>
(...)

mounted() {
  this.$refs.title.focus();
},
```

이렇게 되어 있는 녀석을

```js
// directive.js에 v-focus 정의
Vue.directive('focus', {
  inserted: function(el) {
    el.focus();
  },
});
```

```html
<input
  v-focus
  (...)
/>
```

이렇게 해주면 한방에 해결된다. 쓸데없는 mounted와 methods를 하나 줄인 셈. 코드 량이 무척 많이 줄었고, nextTick은 거의 다 없어졌다... 

<br/>

<br/>

## 13. 비동기 메서드 에러 핸들링

에러처리를 어디서 하는지 굉장히 고민을 많이 했다. 선택지는 3가지다.

- 실제적인 axios api 호출하는 파일(ex api/board.js)
- Vuex의 actions.js
- 컴포넌트단

우선 api 호출 파일은 제외. 그리고 actions와 컴포넌트 단 둘 중 어디서 해야할까 고민했을 때, 이미 login signup 관련 api 에러처리는 컴포넌트단에서 하고 있었다. 후에 [Vuex Tip 작업 오류 처리](https://medium.com/js-dojo/vuex-tip-error-handling-on-actions-ee286ed28df4)라는 글을 읽게 되었고, 여기서 하는 말이, `각 구성 요소의 오류를 처리해야하는 경우 로드를 유지 하고 때로는 오류 상태 구성 요소를 전역 / vuex 상태에서 벗어나는 것이 훨씬 더 모범 사례 입니다.`  라고 했다. 

내 소스는 일반적인 경우 actions.js 에서 에러 핸들링을 하고, 특별히 컴포넌트 단에서 필요한 에러처리는 컴포넌트에서 했는데, 컴포넌트 단에서 핸들링 해주는 것이 더 좋은 방법인 듯 하다.

### actions.js 에서 에러 핸들링

```js
READ_USER({ commit }, userId) {
  return userApi
    .readUser(userId)
    .then(({ data }) => {
      commit('setUser', data.data);
    })
    .catch(error => {
      console.log(error);
      alert('유저 정보를 읽어오지 못했습니다.');
    });
},
```

이런식으로 .then만 있었던 곳에 `.catch` 절을 적어주었다. .catch절을 .then 보다 위에 적는 것을 습관화 하게 되면 더 좋다고 했는데, catch절에 걸리고 다시 .then에 걸리는 경우가 생겨서 우선에는 catch절을 밑에 적었다. 컴포넌트 단에서 에러 핸들링 후 컴포넌트 조작 작업이 필요한 녀석들은 모두 컴포넌트 단에서 해결했다.

<br/>

### axios interceptor 에서 에러 핸들링

```js
// response
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 403) {
      alert('권한이 없습니다.');
    }
    return Promise.reject(error);
  },
);
```

기존의 에러 핸들링이다. 하지만, 이렇게되면 403 으로 인해서 권한이 없다는 alert 창이 한번 뜨고, actions.js에서 해당 비동기 처리 메서드가 실패했다는 alert이 또 한번 더 뜨게 된다. 따라서 `return` 문을 넣어주었다.

```js
if (error.response.status === 403) {
  alert('권한이 없습니다.');
  return;
}
```

이렇게. 그러면 alert 창은 권한이 없을 때 1번만 뜨게 되고, 권한 문제가 아닌 다른 에러는 actions.js에서 잡아준다. 그리고, 인터셉터에서 아예 모든 에러 핸들링을 할까도 고민했었다.

```js
else {
  alert(response.data.message);
}
```

이렇게. 사실 백엔드에서 data.message에 api에 알맞은 message가 같이 넘어온다. 여전히 지금도 고민중. actions.js에서 api별로 따로 catch절로 에러핸들링을 하는 것이 맞는지, interceptor에서 한번에 묶어서 해주는 것이 맞는지. 일단, 공통적으로 interceptor 에서 묶어서 처리하지 않은 것은 에러 처리를 일부러 각각 명확하게 하기 위해서다.

<br/>

<br/>

## 14. API 함수에 JSDoc으로 스펙 명세하기

기존, api 함수를 보자.

```js
createBoardAPI({ title, publicYn, hashtag, bgColor }) {
  return board.post('/', { title, publicYn, hashtag, bgColor });
},

updateCardAPI(id, payload) {
  return card.put(`/${id}`, payload);
},

loginUserAPI(userData) {
  return instance.post('login', userData);
},
```

서로 다른 파일에 있는 api 함수인데, 어떤 곳은 객체 자체를 넘겨받아 api 파라미터로 사용했고, 어떤 곳은 payload라는 이름으로 객체를 받아 파라미터로 사용했다. 또 다른 곳은 payload 대신 좀 더 구체적인 이름으로 명시한 객체 묶음을 파라미터로 사용했다.

내가 스스로 생각했을 때는, payload나 userData 처럼 파라미터로 한번에 받아 넘기는 것 보다 가장 위의 `{ title, publicYn, hashtag, bgColor }` 이런 객체 형식으로 파라미터를 받아서 넘겨주는게 좋다고 생각했는데, 이는 어떤 파라미터를 넘기는지 명시적으로 협업하는 사람들에게 보여지기 위해서라고 생각했다.

하지만, 우선 내가 선택한 방법은 코드 중복이 일어난다. 쓸데 없는 코드량이 늘게 되는 것. 따라서 payload 말고 구체적인 객체명을 적어두되, api 명세를 해두자. 누가와서 보더라도, 혹은 내가 다시 나중에 보게될 때 빠르게 파악하기 위해서. 3개 함수 중 createBoard 함수만 어떻게 바꾸었는지 한번 보자.

```js
/**
 * @typedef {object} CreateBoardInfo
 * @property {string} title - 제목
 * @property {string} publicYn - 공개여부
 * @property {string[]} hashtag - 해시태그
 * @property {string} bgColor - 배경색상
 */

/**
 * Board 생성
 * @param {CreateBoardInfo} createBoardInfo - Board 생성 정보
 * @returns {Promise<Board>}
 */
const createBoardAPI = createBoardInfo => board.post('/', createBoardInfo);
```

이렇게 바꾸어줬다.

<br/>

<br/>

## 15. API 함수 이름 구체화 및 API 접두사로 감싼 속성 제거하기

위 api 함수와 연결된다.

```js
const boardApi = {
  // 함수 시작
  readPersonalBoard({ boardId }) {
    return board.get(`/${boardId}`);
  },
  (...)
export default boardApi;
```

이렇게 되었던 것을, 한번 꺼내서 그냥 단순 함수로.

```js
const readPersonalBoard = lastCreatedAt =>
  board.get(`/personal/${lastCreatedAt}`);
(...)
export { readPersonalBoard, (...) }
```

그리고 애매 했던, api 함수의 이름을 직관적으로 파악하기 좋게 바꿔줬다.

<br/>

<br/>

## 16. Travis 배포 자동화

[Tripllo(10) Frontend -travis 배포 자동화](https://pozafly.github.io/tripllo/(10)vue-travis-배포자동화/) 여기 따로 정리해두었다.

<br/>

<br/>

## 17. Sentry 에러 로깅 시스템 도입

[Tripllo(11) Sentry 에러 로깅 시스템 도입](https://pozafly.github.io/tripllo/(11)vue-Sentry-에러로깅/) 여기 따로 정리해두었다.

<br/>

<br/>

## 18. Let's Encrypt 갱신 자동화

[Tripllo(12) Let's Encrypt 갱신 자동화](https://pozafly.github.io/tripllo/(12)AWS-Lets-Encrypt-갱신자동화/) 여기 따로 정리해두었다.

<br/>

<br/>

## 19. Sub

- button type 넣어주기(접근성 차원에서)
- if문 block 넣어주기(javascript 만든 할아버지께서 말씀하심 - 안정성 때문인듯.)
- es6 화살표 함수 안되어있었던 것 다 처리.

<br/>

<br/>

## 배운점

1. 코드를 일관성있게 작성하는게 좋다. JS는 코드 스타일 선택 폭이 넓어서 어디에는 이거 어디에는 저거 방식대로 짤 수 있는데, 이걸 일관되게 해주는 것.
2. 최대한 안정성 있게 짜자. if 문 같은 것은 블록 처리하는게 안전하게 작성하는 것.
3. store에서 처리하지 않아도 되는 것은 컴포넌트 단에서 처리하자. store가 반드시 필요한지, store에 넣었다면 그럴만한 타당한 이유가 있는지 생각하고 넣기.
4. 협업을 위해 변수 명이나 컴포넌트 명, 규칙을 가지고 만들자. 다른 사람이 봤을 때 이해하기 쉽도록.
5. 코드가 중복 되는 것이 있다면 함수화, 모듈화 하자.
6. 오류 처리를 반드시 하자. 비동기 처리 Promise에서 .catch()를 먼저 사용함으로 반드시 catch를 할 수 있도록 하자.
7. 라이프 사이클 메서드에서나, sideEffect가 있는 곳에서는 의미 단위로 함수로 뽑아서 사용하자.
8. Travis 배포 자동화 & Sentry를 도입하면서 개발 완료 후 유지보수 측면에서 가능한 자동화나, 에러추적을 해 생산성을 높이는 작업을 하자.
9. JSDoc 을 작성하면서 내가 나중에 봤을 때나, 다른 사람이 코드를 봤을 때 직관적으로 접하기 쉽도록 하고, 자동완성으로 작업 생산성을 높이자. (Typescript 배우자...)
10. 멘토님 감사합니다.

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)