---
layout: post
title: '(9) vue 리팩토링2'
author: [Pozafly]
tags: [Tripllo 제작기, 리팩토링, Vue.js]
image: ../img/tripllo/refactor2.jpg
date: '2021-04-04T19:13:47.149Z'
draft: false
excerpt: 멘토링 후 Tripllo에 꽤 많은 것을 손봐야한다는 것을 알게 되었다. 하나하나 고쳐보면서 정리한 것을 기록해보자.
---



<br/>

아래 내용은 [인프런 멘토링](https://www.inflearn.com/mentors)에서 캡틴판교님께 멘토링 받으며 코드 리뷰를 해주신 부분에 대한 반영 내용입니다.

<br/>

<br/>

## 목차

10. props type
11. plugin 폴더 정리
12. nextTick 없애기 & 대신 사용자 정의 디렉티브 연결
13. API 함수 에러 핸들링
14. API 함수에 JSDoc으로 스펙 명세하기 & 파라미터 형태 수정
15. API 함수 이름 구체화 및 API 접두사로 감싼 속성 제거하기
16. Travis 배포 자동화
17. Sentry 에러 로깅 시스템 도입
18. Let's Encrypt 갱신 자동화
19. Closure & Currying 적용기
20. Sub
21. Process 정리

<br/>

<br/>

## 10. props type

기존에 prop 을  `props: ['member'],` 이런 식으로 정의했었다면,

```js
props: {
  member: {
    type: Object,
    required: true,
    default: () => ({...}),
    validator: () => ({...}),
  },
},
```

이렇게 member라는 props에, `type`, `require`, `default`, `validator` 를 사용해 정의할 수 있다. type 에는 String, Number, Array, Object, Function, Boolean 이 들어갈 수 있다. [vue props type](https://kr.vuejs.org/v2/guide/components-props.html#Prop-%ED%83%80%EC%9E%85) 이곳에서 확인할 수 있다.

하지만 위와 같이 `type: Object` 는 밸리데이션 체크에는 크게 좋지 않은 형태인 듯하다. Object 형태로 모두 다 받아오는 것이 아니라 필요한 props 만 받고 원시 타입 형태로 받는 것이 좋을 듯 하다. 아래는 기존에 Object 형태였던 type을 [오브젝트의 속성(Properties) 전달](https://github.com/pozafly/TIL/blob/main/Vue/Vue2/Props.md#%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EC%86%8D%EC%84%B1properties-%EC%A0%84%EB%8B%AC)을 이용해서 바꿔보자.

먼저 기존 코드다.

```js
// 상위 컴포넌트.vue
<ProfileImage :board="board" />

// 하위 컴포넌트.vue
props: {
  board: {
    type: Object,  // object 형태
    required: true,
    default: () => ({
      createdBy: '',
      createdByPicture: '',
    }),
  },  
}
```

이런 식으로 prop을 받고 있었다. 아래와 같이 바꿀 수 있다.

```js
// 상위 컴포넌트
<ProfileImage v-bind="board" />  // 이 부분, :borad="board" 가 아님.

// 하위 컴포넌트
props: {
  createdBy: {
  type: String,
  required: true,
  default: '',
  validator(value) {
    return typeof value === 'string';
  },
  someProp: {
    type: Number,
    required: false,
    default: 0,
    validator(value) {
      return [1, 2, 3].indexOf(value) !== -1;
    },
  },
  (...)  // 상위 컴포넌트에서 내려준 prop에 있는 나머지 속성들.
}
```

- 이 부분 : **v-bind:something**="some" 이렇게 되어있던 부분이 **v-bind**="some" 이렇게 변화되었다. 그렇게 되면 some 객체가 알아서 key 값을 풀어준다. 위의 props는 createdBy, someProp, 등등 some 안에 들어있는 key값이 풀어진 형태다.

이렇게 되면 validator를 상세하게 붙여줄 수 있다. 코드량이 많아지긴 하지만 상세한 valid 체크, 문서화가 가능하다. 또한 모든 객체를 사용하는 것이 아니기 때문에 객체 중 어떤 값을 사용하고 있는지 파악하기 쉬워진다는 장점이 있다. 단점으로는 코드량이 늘어난다...

📌 추가

블로그 하단에 [kdeun1](https://github.com/kdeun1) 님 께서 감사하게도 댓글을 달아주셨는데 validator 부분은 `typeof value === 'string';` 이렇게 타입 체크 validation만 적어준다면, 이미 `type: String` 에서 타입 체크를 하기 때문에 기능상 동작은 같다고 하셨다. valid 예제를 찾아보다가 누군가 [velog 예제](https://velog.io/@ausg/Vue2-%EC%93%B0%EC%84%B8%EC%9A%94-Composition-API-%ED%95%9C%EB%B2%88-%EB%93%9C%EC%85%94%EB%B3%B4%EC%84%B8%EC%9A%94) 이곳에 아래와 같이 validator 를 쓰셨다.

```js
validator(listItems) {
  return listItems.every((listItem) => {
    const keys = Object.keys(listItem);
    return keys.every(key => ['key', 'contents', 'indent', 'selected'].includes(key));
  });
},
```

`every`, `Object.keys()`, `indexOf` 나 `includes` 를 사용해보는 것이 좋을 듯하다.

<br/>

<br/>

## 11. plugin 폴더 정리

### plugin 변수명 수정

기존에 plugin을 main.js 파일에서 덕지덕지 붙여다 쓰는 것이 싫어서 따로 plugin.js 파일로 빼서 선언 해두었다.

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

이렇게 변수명 앞에 달러 하나만 사용했다. [스타일 가이드 Private 속성 이름](https://kr.vuejs.org/v2/style-guide/index.html#Private-%EC%86%8D%EC%84%B1-%EC%9D%B4%EB%A6%84-%ED%95%84%EC%88%98) 이곳 스타일 가이드에서는, 플러그인, mixin 등에서 커스텀 사용자 private 프로퍼티에는 항상 접두사 `$_`(달러 + 언더바) 를 사용하라고 되어 있다. 왜냐하면 vue 코드와 충돌할 수 있기 때문임.

vue 내부적으로 달러 없이 언더바만 사용하고 있기 때문에, `$_` 를 쓰자. `$Google` 을 `$_Google` 이렇게.

### main.js 정리

이제 플러그인을 부르는 main.js를 정리해보자. 기존의 main.js에서는, 

```js
// 기존 main.js
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

이런 식으로 불러다 썼는데, 우선 filter를 빼서 적용해보자.( filter는 vue3에서는 삭제된 기능이다. 단 2에서 쓸 때는 main.js 에 빼서 따로 적용시켜 주자.) 또한, import 구문에 `@/plugin/plugin` 대신 plugin.js를 index.js로 바꿔서 `@/plugin` 으로 불러서 사용하자.

```js
import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { install } from '@/plugin';  // 플러그인
import { normalFormatDate, timeForToday } from '@/utils/dateFilter';  // 필터

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

src 아래에 `features(기능)`이라는 폴더를 만들었다. 그곳에 directive.js, filter.js, plugin.js 3개의 파일을 만들고 각각 정의해 주었다.

- `directive.js` : 사용자 정의 디렉티브

  ```js
  const directives = Vue => {
    // v-focus
    Vue.directive('focus', {
      (...)
    },
    (...)
  };
  export { directives };
  ```

- `filter.js` : 시간 관련 필터

  ```js
  // 필터 정의 함수들
  (...)
  export const filters = Vue => {
    Vue.filter('normalFormatDate', normalFormatDate);
    Vue.filter('timeForToday', timeForToday);
  };
  ```

- `plugin.js` : 외부 플러그인, 내가 정의한 플러그인

  ```js
  import $_Google from '@/utils/social/Google';
  (...)
  const plugins = Vue => {
     // 플러그인 정의
     (...)
  };
  export { plugins };
  ```

그리고, main.js 에서 깔끔하게 불러들여 보자.

```js
import Vue from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import { plugins } from '@/features/plugin';
import { directives } from '@/features/directive';
import { filters } from '@/features/filter';

Vue.config.productionTip = false;

Vue.use(plugins);
Vue.use(directives);
Vue.use(filters);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
```

이렇게. 아주 깔끔.

<br/>

<br/>

## 12. nextTick 없애기 & 대신 사용자 정의 디렉티브 연결

### nextTick 없애기

Vue는 DOM 업데이트를 비동기로 하는데, 특정 DOM이 갱신되기 전에 DOM의 데이터를 가져오려고 할 때 오류가 생긴다. 예를 들어 created 라이프사이클 함수에서 DOM의 정보를 가져올 때. 하지만, nextTick은 이를 방지해준다. DOM이 마운트되고 난 후 nextTick의 인자 안에 있는 콜백이 실행되기 때문에 콜백 안에서 데이터 조작 시 에러를 뿜지 않음.

정확한 nextTick의 사용법을 알지 못하고 남용했다. 따라서 mounted 라이프사이클 메서드에서 사용했던 nextTick의 콜백만 남기고(DOM의 데이터를 가져오는 로직) nextTick을 제거했다. mounted 라이프사이클 함수는 DOM이 입혀지고 난 후 실행되기 때문이다.

나머지는 제거 후 아래의 두 가지에만 nextTick을 유지했다. 

1. created 함수 실행 때, DOM에서 정보를 가져와 해당 정보로 비동기 api 호출 시. (특별하지 않은 이상 주로 비동기 api 함수 호출 장소는 created 라이프사이클 함수에서 한다)
2. Modal 컴포넌트같이 DOM에 달라붙기 전 데이터를 가져와 DOM에 정보를 붙이는 작업이 필요할 때.

후에는 2가지 또한 모두 제거되었다. 현재는 nextTick이 아예 없다. nextTick을 사용해도 되고 사용하지 않아도 되지만, 캡틴판교님의 [Vue.js 입문자가 실무에서 주의해야 할 5가지 특징](https://www.youtube.com/watch?v=Z9OGUU6G8vM) 강의에 보면, nextTick 사용 시 불필요한 코드 복잡도가 증가하고, 업데이트 시점 혼란을 야기하므로 사용을 지양해야 한다고 한다.

<br/>

### 사용자 정의 디렉티브 연결

그리고, 주로 nextTick을 사용할 때는 mounted 메서드에서 input 태그에 focus를 줄 때가 많았으므로 사용지 지정 디렉티브를 만들어 연결해 주었다.

```jsx
<input
  ref="title"
  (...)
/>
(...)

mounted() {
  // this.$nextTick(() => {
    this.$refs.title.focus();  // 포커스 메서드
  // })
},
```

mounted 함수에서 사용했으므로 nextTick이 필요가 없다. 따라서 지워줌. 그리고 Tripllo에 이렇게 mounted 되고 포커스를 맞추는 곳이 아주 많았다. 이제 이렇게 되어 있는 녀석을

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

이렇게 해주면 한 방에 해결된다. 쓸데없는 mounted와 methods를 하나 줄인 셈. 코드 량이 무척 많이 줄었고, focus 관련 nextTick은 전부 없어졌다. [사용자 지정 디렉티브](https://kr.vuejs.org/v2/guide/custom-directive.html) 이곳에 가면 위에서 사용한 `inserted` 와 같은 훅 함수에 대한 설명이 있으니 참고.

<br/>

<br/>

## 13. API 함수 에러 핸들링

프론트엔드 개발자는 api에서 데이터를 받아와 화면에 뿌리는 작업을 가장 많이 하기 때문에, api 함수는 **무조건** 에러 처리가 있어야 한다. 가장 기본인데 에러 핸들링이 아예 없었다. 만약 웹서비스를 사용하는 사용자 환경에서 에러가 났을 때 핸들링해 주지 않으면 아무 동작이 없기 때문에 무슨 일이 일어났는지 알지 못한다. 따라서 에러 핸들링 처리를 하자.

에러 핸들링은 어디서 해야 할까? 선택지는 3가지.

- Vuex의 actions
- api 함수를 호출하는 컴포넌트 단
- axios의 interceptor

결론은 컴포넌트 단에서 api 함수를 호출하는 부분에서와 interceptor에서 에러 처리를 하자. 아래에 설명이 되어있다.

### 기존소스(actions.js)

기존에 Vuex actions에서 사용했던 에러 처리다.

```js
// store/actions.js
READ_USER({ commit }, userId) {
  (...)
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

이곳에서 에러 처리를 했을 때 단점을 한번 보자.

1. action에서 다른 action을 호출 할 수도 있다. (이 방법은 좋은 방법은 아님. 밑에서 설명하겠음.) 그럴 때 어느 action의 오류를 핸들링하는지 모호해진다.
2. action 안에서 여러 작업을 할 수도 있겠지만 action의 역할은, 기본적으로 상태를 변이(mutation) 시키기 위함이다. 따라서 에러 처리 시 mutation을 발생시키는 commit 로직만 있는 것이 좋을 것 같은데, try catch절이 혼재해 있으면  로직을 파악하기 어려워진다.

따라서 actions.js 에서 에러 핸들링했던 것을 `모두 컴포넌트 단` 으로 옮기자. 컴포넌트 단에서 action을 호출하거나 api 함수를 사용할 때 에러 처리를 하면 action을 한눈에 파악하기 쉽고(commit 만 있음) 컴포넌트에서 각각의 action을 호출할 때 상황에 맞는 에러 처리를 할 수 있다.

<br/>

### action에서 또 다른 action 호출 로직 수정

기존 소스를 보자.

```js
// store/actions.js
async CREATE_LIST({ dispatch, state }, createListInfo) {
  try {
    const {data} = await createListAPI(createListInfo);
    (...)
    dispatch('READ_BOARD_DETAIL', state.board.id);  // 또 다른 action 호출.
  } catch (error) {
    console.log(error);
    alert('리스트를 생성하지 못했습니다.');
  }
},
```

`CREATE_LIST` 라는 action에서 API 함수를 호출한 후 다시, `READ_BOARD_DETAIL` action을 호출한다.

actions에서 에러 핸들링을 했을 때 단점 중 하나는 action에서 다른 action을 호출했을 때 어느 action의 오류를 핸들링 해야 하는지, 어떤 에러를 내주어야 하는지 모르게 된다. 그리고, 액션 동작 안에, 또 다른 동작이 있기 때문에 다시 `READ_BOARD_DETAIL` 이라는 동작을 찾아서 내부 로직을 봐야 하는 비용이 발생함. 명확하게 이 action의 의미를 파악하기 어려워진다.

action 안에 action을 저기 선언하는 것이 아니라 컴포넌트 단으로 옮기는게 더 의미를 파악하기 쉽다.

```js
// 컴포넌트 methods 단
try {
  await this.CREATE_LIST(createListInfo);  // error = 1
  await this.READ_BOARD_DETAIL(this.board.id);  // error = 2
  (...)
} catch (error) {
  if (error === 1) {
    alert('리스트를 생성하지 못했습니다.');
    return;
  } else if (error === 2) {
    alert('상세 보드 정보를 가져오지 못했습니다.');
    return;
  }
}
```

이렇게 컴포넌트 단에서 세부적으로 에러 핸들링을 했고, action이 반드시 필요하지 않은 api 함수는 전부 컴포넌트로 이동하게 되었다. action안의 action을 분리하면서 api 함수 호출과 commit 함수만 남아  의미 파악이 쉬워졌다. 결과로 actions.js 파일이  `415줄` 에서 `73줄` 이 되었다.

<br/>

### axios interceptor 에서 에러 핸들링

interceptor에서는 주로 권한처리나 공통적인 에러가 발생했을 때 핸들링을 해주는 것이 좋다.

```js
// api/common/interceptors.js

(...)
 
// api response 시,
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const errorCode = error.response.status;
    if (errorCode === 401 || errorCode === 403) {
      alert('권한이 없습니다.');
    } else if (errorCode === 400) {
      alert('잘못된 요청입니다.');
    }
    return Promise.reject(error);
  },
);
```

400, 401, 403 같은 공통 에러 핸들링이다. 공통으로 에러핸들링이 필요하다면 이렇게 axios interceptor에서 해주면 된다.

📌 추가

### Promise.catch() 체이닝에 대해서

axios로 api 함수를 사용해 백엔드로부터 데이터를 받아오면 Promise가 return 된다. 프로젝트에는 .then.catch 와 async, await 2가지 문법을 모두 사용했다. 그 중 .then.catch 문법이 대다수였다. 에러 핸들링 시 catch 처리가 없었으므로 catch 체이닝을 잊지 않기 위해 `먼저` 사용했다.

```js
updateBoardAPI(some)
  .catch(error => {  // catch 체이닝 먼저.
    console.log(error);
    alert('보드 정보를 업데이트 하지 못했습니다.');
  })
  .then(({ data }) => {  // 이어지는 then
    if (data.data.invitedUser) {
      return;
    }
    dispatch('READ_BOARD_DETAIL', state.board.id);
  });
```

하지만 이렇게 catch 체이닝을 먼저 사용하면 catch 콜백을 먼저 탄 후, `.then` 의 콜백까지 **같이 실행** 되었다. 이상했다. 에러가 발생하면 분명 catch 절을 타는 것은 맞는데 멈추지 않고 .then 까지 이어졌기 때문. axios interceptor 문제인가 해서 몇 번이고 수정해봤다.

[MDN promises common_mistakes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#common_mistakes)에 보면 항상 catch 체인으로 종료하는 것이 좋다고 이야기하고 있다.

또 여러 가지 실험을 하다 보니,

```js
.catch(error => {
  console.log(error);
  alert('보드 정보를 업데이트 하지 못했습니다.');
  throw error;  // 🚀
})
.then(({ data }) => {
  if (data.data.invitedUser) {
    return;
  }
  (...)
});
```

- 🚀 : 이 부분에서 throw error로 그냥 error를 뱉어주면 .then으로 이어지지 않는다. 하지만 Sentry에 쌓일 것이므로 이 방법은 좋은 방법은 쓰면 안 되겠다.

비동기 api 함수를 부르는 로직에 체이닝을 제거하고, async / await 와 try / catch 를 붙여주었음.

<br/>

<br/>

## 14. API 함수에 JSDoc으로 스펙 명세하기 & 파라미터 형태 수정

### api 함수 파라미터 형태 수정

기존, api 함수를 보자. 3가지 형태로 작성할 수 있는데, api 함수의 인자로 어떤 형태를 받을지에 따라 나눠놓은 것이다. 가장 좋은 방법은 3번째 방법이다.

```js
// 1. 인자로 객체 안에 어떤 데이터가 있는지 비구조화 할당한 객체를 명시하며 받는다.
createBoardAPI({ title, publicYn, hashtag, bgColor }) {
  return board.post('/', { title, publicYn, hashtag, bgColor });
},

// 2. 인자로 payload라는 이름으로 묶어 받는다.
updateCardAPI(payload) {
  return card.put('/', payload);
},

// 3. payload라는 명시적이지 않은 이름보다 해당 객체가 어떤 데이터인지 더 파악하기 쉬운 이름을 사용한다.
loginUserAPI(userInfo) {
  return instance.post('login', userInfo);
},
```

내가 스스로 생각했을 때는, payload나 userInfo 처럼 파라미터로 한 번에 받아넘기는 것보다 첫 번째의 `{ title, publicYn, hashtag, bgColor }` 이런 객체 형식으로 파라미터를 받아서 넘겨주는 것이 좋다고 생각했었는데, 이는 어떤 파라미터를 넘기는지 명시적으로 협업하는 사람들에게 보이기 위해서라고 생각했다.

하지만, 우선 내가 선택한 방법은 **코드 중복**이 일어난다. 쓸데없는 코드량이 늘게 되는 것. 또한 payload는 이름이 모호함. 3번째 방법으로 구체적인 객체 명을 적어두자.

### JSDoc으로 스펙 명세하기

api 명세를 해두자. 누가 와서 보더라도, 혹은 내가 다시 나중에 보게 될 때 빠르게 파악하기 위해서.

```js
/**
 * @typedef {Object} Board
 * ... @property 생략...
 */

/**
 * @typedef {Object} CreateBoardInfo
 * @property {string} title - 제목
 * @property {boolean} isPublic - 공개여부
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

이렇게 작성해주면 vscode상에

<img width="901" alt="스크린샷 2021-04-20 오전 11 49 37" src="https://user-images.githubusercontent.com/59427983/115330173-83b5d980-a1ce-11eb-9790-c867f2acc45b.png">

이렇게 api 함수에 `.` 을 찍어주면, @returns가 Promise 이므로, Promise에 체이닝 되는 메서드들이 자동 완성된다. 또한 JSDoc을 적어주는 것은 협업할 때, api가 어떤 것을 return 하는지, 파라미터로 무엇을 넘기는지 알 수 있게 도와준다. JSDoc이 언어 레벨로 표현된 것이 typescript 라고 한다.

<br/>

<br/>

## 15. API 함수 이름 구체화 및 API 접두사로 감싼 속성 제거하기

위 api 함수와 연결된다. 아래 코드를 보면, board 도메인과 관련된 api 함수인데, boardApi라는 큰 객체 형태 안에 readPersonalBoard 라는 api 함수가 존재한다.

```js
// api/board.js
const boardApi = {
  // 함수 시작
  readPersonalBoard({ boardId }) {
    return board.get(`/${boardId}`);
  },
  (...)
export default boardApi;
```

이렇게 되었던 것을, boardApi라는 껍질을 벗겨서 그냥 단순 함수로.

```js
const readPersonalBoardAPI = lastCreatedAt =>
  board.get(`/personal/${lastCreatedAt}`);
(...)

export { readPersonalBoardAPI, (...) }
```

그리고 애매했던, api 함수의 이름을 직관적으로 파악하기 좋게 바꿔줬다.

<br/>

<br/>

## 16. Travis 배포 자동화

[(10) Frontend -travis 배포 자동화](https://pozafly.github.io/tripllo/(10)vue-travis-automation/) 여기 따로 정리해두었다.

<br/>

<br/>

## 17. Sentry 에러 로깅 시스템 도입

[(11) Sentry 에러 로깅 시스템 도입](https://pozafly.github.io/tripllo/(11)vue-sentry-error-monitoring-system/) 여기 따로 정리해두었다.

<br/>

<br/>

## 18. Let's Encrypt 갱신 자동화

[(12) Let's Encrypt 갱신 자동화](https://pozafly.github.io/tripllo/(12)aws-lets-encrypt-renewal-automation/) 여기 따로 정리해두었다.

<br/>

<br/>

## 19. Closure & Currying 적용기

[(14) Closure & Currying 적용기](https://pozafly.github.io/tripllo/(14)Closure-Currying/) 여기 따로 정리해두었다. (이 부분은 유지보수가 좋게 짠 것이 맞는지에 대한 확신이 없다..)

<br/>

<br/>

## 20. Sub

- button type 넣어주기(접근성 차원에서)
- if문 block 넣어주기(javascript 만든 할아버지께서 말씀하심 - 안정성 때문인 듯.)
- es6 화살표 함수 안 되어있었던 것 모두 처리.
- v-show가 붙은 template 태그를 div 태그로 수정
  - v-if는 렌더링 자체를 막는 것이라 `<template>` 에 사용 가능. 하지만, v-show는 `<template>` 에 사용 불가. div or span 태그로 해줘야 함. 첫 렌더링은 되어야 하는데 template은 vue에서 사용하는 태그라 그런 듯?
  - 이 작업은 로그인 폼 input 단어를 입력했을 때 소셜 로그인 창이 보여지지 않게 작업을 해놨었는데, [daep93](https://github.com/daep93) 님께서 github issues로 동작하지 않는다고 알려주신 내용 때문에 알게 된 내용이다.

<br/>

<br/>

## 21. Process 정리

![Frontend-process](https://user-images.githubusercontent.com/59427983/115864975-a36d2c00-a472-11eb-8891-b7fcfa4fe55f.png)

[크게보기](https://user-images.githubusercontent.com/59427983/115864975-a36d2c00-a472-11eb-8891-b7fcfa4fe55f.png)

![Backend-process](https://user-images.githubusercontent.com/59427983/115865001-abc56700-a472-11eb-8297-9c206f981451.png)

[크게보기](https://user-images.githubusercontent.com/59427983/115865001-abc56700-a472-11eb-8297-9c206f981451.png)

<br/>

<br/>

## 배운점

1. 코드의 역할을 모르고 짜지말자($nextTick, vue의 동작원리-반응형 등). 코드를 사용했다면 왜 사용했는지 타당한 이유가 있어야 한다. 그래야 불필요한 코드 복잡도가 증가하지 않고 완성도가 높은 코드를 만들게 된다. 물론 지식 나눔은 덤.
2. 최대한 안정성 있게 짜자. if 문 같은 것은 블록 처리하는게 안전하게 작성하는 것.
3. store에서 처리하지 않아도 되는 것은 컴포넌트 단에서 처리하자. store가 반드시 필요한지, store에 넣었다면 그럴만한 타당한 이유가 있는지 생각하고 넣기.
4. 협업을 위해 변수 명이나 컴포넌트 명, 규칙을 가지고 만들자. 다른 사람이 봤을 때 이해하기 쉽도록.
5. 무언가 반복되는 것이 있다면 잘못 코딩한 것이다. 함수화, 모듈화 하자.
6. 오류 처리를 반드시 하자. 프론트엔드 개발자가 가장 많이 하는 것이 백엔드에서 api를 받아 화면에 표현하는 것인데 이곳에 오류처리가 없다면 사용자 경험이 떨어진다.
7. 라이프사이클 함수에서나, sideEffect가 있는 곳에서는 의미 단위로 함수로 뽑아서 사용하자.
8. Travis 배포 자동화 & Sentry를 도입하면서 개발 완료 후 유지보수 측면에서 가능한 자동화나, 에러추적을 해 생산성을 높이는 작업을 하자.
9. JSDoc 을 작성하면서 내가 나중에 봤을 때나, 다른 사람이 코드를 봤을 때 직관적으로 접하기 쉽도록 하고, 자동완성으로 작업 생산성을 높이자. (Typescript 배우자...)

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)