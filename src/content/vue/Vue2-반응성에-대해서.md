---
layout: post
title: "Vue2 반응성에 대해 깊이 알아보기"
author: [Pozafly]
tags:
  - Vue.js
image: ../img/vue/vue-jet.jpeg
date: '2021-04-13T20:13:47.149Z'
draft: false
excerpt: Vue 2.x 버전의 반응성에 대해 깊이 알아보자. Vue의 반응성을 제대로 알지 못한다면 UI 컴포넌트를 다룰 때, 혹은 data 객체를 다룰 때 문제가 생길 수 있다.
---

## 정리하면서 느꼈던 것

<br/>

아래의 내용은 공식 홈페이지의 반응성(반응형)에 대해 정리된 글을 옮기고 난 후 느낀 점입니다.

### 1. 객체 불변성에 대해

Vue는 내부적으로 기존의 data 객체에 없었던 프로퍼티에 값을 추가해 주기 위해 Vue.set()을 사용한다. 여러 개의 객체를 추가하려면 `Object.assign({}, 기존 객체, 추가할 객체)` 를 사용하기도 함.

Object.assign()은 첫 번째 인자에 `{}`를 넣어주면 기존 객체를 사용하는 것이 아니라 새로 만든 객체에 기존 객체 + 추가할 객체를 더해서 아예 새로운 객체를 만들어 주는 것. react와 같이 불변성을 지켜준다. 내부적으로 새 객체를 만들어 넣어주면, 마치 immer.js 라이브러리같이 vue에서 알아서 객체를 처리하는 방식. react에서는 Object가 변경되었다는 것을 react가 얕은 비교(객체 껍데기가 가르키고 있는 주소 비교)를 해서 변경을 감지한다. Vue는 `Object.defineProperty` 를 사용해 기존 객체에 끼워 넣는 형식으로 동작한다. 즉, 두 가지 방법이 있는 듯하다.

react에서 개발자가 불변성을 신경 써서 지켜주어야 한다면, vue는 Watcher가 알아서 `Object.defineProperty` 을 사용해 데이터 변경을 감지한다.

<br/>

### 2. nextTick에 대해

vue로 만든 toy 프로젝트에서 nextTick을 사용했는데, 불필요하게 많이 사용되었다는 피드백을 받고 거의 전부를 정리했었다. 그때 내가 알던 nextTick은 화면을 그려준 다음 콜백의 로직을 수행하는 것으로만 알고 있었는데, 사실은 소스 상으로 DOM이 그려지기 전에 수행되도록 짜인 코드가, DOM이 수행한 후 동작하도록 하는 메서드였다.

캡틴판교님의 vue reactive 강의에서도 그랬듯, nextTick은 사용을 지양해야 한다. 왜냐하면 vue는 script 단의 data 중심으로 개발자가 데이터를 다루도록 권장하기 때문이다. nextTick은 어쩔 수 없이 UI component의 데이터를 화면에 그려진 후 가져온다든지 하는 작업이 일어날 때만 사용하는 것이 좋다. 또한, 일반적으로 nextTick을 사용하기보다 `mounted` 라이프 사이클 훅에서 사용하도록 권장하고 있다.

<br/>

### 3. Object.observe에 대해

Vue 3에서는 이제 data에 선언되지 않은 프로퍼티라 하더라도 반응한다고 한다. `Object.observe` 가 이제 더 이상 사용되지 않아 vue 내부적으로 Object.observe 대신 Proxy 를 사용한다고 한다. 위의 설명에 보면, 코드 유지 관리 측면에서도 중요한 고려 사항이 있다며, `data` 객체는 컴포넌트 상태에 대한 스키마와 같다고 했다. 모든 반응 속성을 미리 선언하면 나중에 다시 방문하거나 다른 개발자가 읽을 때 구성 요소 코드를 더 쉽게 이해할 수 있다는 이유.

아마도 추측컨대 Vue에서는 data에 적힌 Object나 data 자체의 Object를 미리 선언해두지 않으면 반응하지 않는 것을 기술 부채로 안고 있었던 느낌이 있다. data의 객체 정의 형식이 스키마와 같다고 적혀있긴 했지만 어쨌든 Vue 3에서는 이것이 해결되었다고 함. 물론, 내 생각에도 data에 데이터 스키마 형식으로 명시적으로 적는 것이 유지 보수 측면에서 더 좋은 것 같기는 하다.

<br/>

<br/>

아래부터는 공식 홈페이지의 내용을 옮긴 내용입니다.

# Vue2 반응성에 대해 깊이 알아보기

> 출처 : https://kr.vuejs.org/v2/guide/reactivity.html

vue의 가장 두드러진 특징 중 하나는 눈에 잘 띄지 않는 반응형 시스템이다. 모델은 단순한 JS 객체임. 수정하면 화면이 갱신된다. state 관리를 간단하고 직관적으로 만들어주지만, 함정이 있기 때문에 어떻게 작동하는지 이해하는 것이 중요함.

<br/>

## 변경 내용을 추적하는 방법

vue 인스턴스에 Javascript 객체를 `data` 옵션으로 전달하면 Vue는 모든 속성에 [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)를 사용하여 [getters/setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Defining_getters_and_setters)로 변환한다. 

📌 쉽게 말해서, 

- Object.defineProperty : 객체에 새 속성을 추가하거나 기존 속성을 수정하고 새로운 객체가 아닌 해당 객체를 다시 반환함. 또 writable 같은 걸로 수정 불가능하게 만들 수도 있다.
- getters/setters : java의 class 생성자, 게터 세터와 같음.

이는 Vue가 ES5를 사용할 수 없는 IE8 이하를 지원하지 않는 이유다.

getter/setter는 사용자에게는 보이지 않으나 속성에 액세스 하거나 수정할 때 Vue가 종속성 추적 및 변경 알림을 수행할 수 있다. 한가지 주의 사항은 변환된 데이터 객체가 기록될 때 브라우저가 getter/setter 형식을 다르게 처리하므로 친숙한 인터페이스를 사용하기 위해 vue-devtools를 설치하는게 좋음.

모든 컴포넌트 인스턴스에는 해당 `watcher` 인스턴스가 있고, 이 인스턴스는 컴포넌트가 종속적으로 렌더링되는 동안 **'수정'** 된 모든 속성을 기록한다. 나중에 종속적인 setter가 트리거 되면 watcher에 알리고 컴포넌트가 다시 렌더링 된다.

![스크린샷 2021-04-13 오후 5 20 01](https://user-images.githubusercontent.com/59427983/114520542-85d2e200-9c7c-11eb-86e2-da5b4fd62ef6.png)

<br/>

<br/>

## 변경 감지 경고

최신 Javascript의 한계 (그리고 `Object.observe` 의 포기)로 인해 Vue는 **속성의 추가 제거를 감지할 수 없다.** Vue는 인스턴스 초기화 중에 getter/setter 변환 프로세스를 수행하기 때문에 `data` 객체에 속성이 있어야 Vue가 이를 변환하고 응답할 수 있다. 

📌 이것은 Vue3에서 Object.observe 대신 proxy를 사용하기 때문에 이제는 data 객체에 미리 선언해두지 않아도 반응 함.

```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 는 이제 반응적이다.

vm.b = 2
// `vm.b` 는 이제 반응적이지 않다.
```

Vue는 이미 만들어진 인스턴스에 새로운 루트 수준의 반응 속성을 동적으로 추가하는 것을 허용하지 않는다. 그러나 `Vue.set(object, key, value)` 메서드를 사용해 중첩 된 객체에 반응성 속성을 추가할 수 있다.

```js
Vue.set(vm.someObject, 'b', 2);
```

`Vm.$set` 인스턴스 메서드를 사용할 수도 있다. 이 메서드는 전역 `Vue.set` 에 대한 별칭이다.

```js
Vue.$set(this.someObject, 'b', 2);
```

때로는 예를 들어 `Object.assign()` 또는 `_.extend()` 를 사용하여 기존 객체에 많은 속성을 할당 할 수 있다. 그러나 객체에 추가 된 새 속성은 변경 내용을 트리거 하지 않는다. 이 경우 원본 객체와 mixin 객체의 속성을 사용해 새 객체를 만든다.

```js
// `Object.assign(this.someObject, { a: 1, b: 2 })` 대신
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 });
```

즉, 주석 처리 된 부분은 새로운 객체를 생성하는게 아니고, 기존 someObject라는 객체에다 병합 해서 해당 객체를 return 한 것이라면, `Object.assign({}, ...)` 는 새 객체를 만들고 여기다 집어넣은 것임. [Object.assign](https://github.com/pozafly/TIL/blob/main/Javascript/Object.assign.md) 여기를 참고하삼.

[리스트 렌더링 섹션](https://kr.vuejs.org/v2/guide/list.html#Caveats)에 앞서 알아보아야 할 배열 관련 참고사항이 있다.

<br/>

<br/>

## 반응형 속성 선언하기

Vue는 루트 수준의 반응성 속성을 동적으로 추가할 수 없으므로 모든 루트 수준의 반응성 데이터 속성을 빈 값으로라도 초기에 선언하여 Vue 인스턴스를 초기화 해야 함.

```js
var vm = new Vue({
  data: {
    // 빈 값으로 메시지를 선언 한다.
    message: ''
  },
  template: '<div>{{ message }}</div>'
});
// 나중에 'message'를 설정 한다.
vm.message = 'Hello!'
```

data 옵션에 `message` 를 선언하지 않으면 Vue는 렌더 함수가 존재하지 않는 속성에 접근하려고 한다는 경고를 한다.

이 제한 사항에는 기술적인 이유가 있음. 종속성 추적 시스템에서 잇지 케이스 클래스를 제거하고 Vue 인스턴스를 유형 검사 시스템으로 더 멋지게 만든다. 그러나 코드 유지 관리 측면에서도 중요한 고려 사항이 있다. `data` 객체는 컴포넌트 상태에 대한 스키마와 같다. 모든 반응 속성을 미리 선언하면 나중에 다시 방문하거나 다른 개발자가 읽을 때 구성 요소 코드를 더 쉽게 이해할 수 있다.

<br/>

<br/>

## 비동기 갱신 큐

Vue는 DOM 업데이트를 **비동기로 한다**. 데이터 변경이 발견 될 때마다 큐를 열고 같은 이벤트 루프에서 발생하는 모든 데이터 변경을 버퍼에 담는다. 같은 Watcher가 여러 번 발생하면 대기열에서 한 번만 푸시된다. 이 버퍼링된 중복의 제거는 불필요한 계산과 DOM 조작을 피하는데 있어 중요하다. 그 다음, 이벤트 루프 "tick"에서 Vue는 대기열을 비우고 실제 (이미 중복 제거 된) 작업을 수행한다. 내부적으로 Vue는 비동기 큐를 위해 네이티브 `Promise.then` 과 `MessageChannel` 을 시도하고, `setTimeout(fn, 0)` 으로 돌아간다.

예를 들어, `vm.someData = 'new value'` 를 설정하면, 컴포넌트는 즉시 재 렌더링 되지 않는다. 큐가 플러시 될 때 다음 "tick" 에서 업데이트 된다. 대개의 경우 이 작업을 신경 쓸 필요는 없지만 업데이트 후 DOM의 상태에 의존하는 작업을 수행하려는 경우 까다로울 수 있다. Vue.js는 일반적으로 개발자가 "데이터 중심" 방식으로 생각하고 DOM을 직접 만지지 않도록 권장하지만 때로는 건드려야 할 수도 있다. Vue.js가 데이터 변경 후 DOM 업데이트를 마칠 때까지 기다리려면 데이터가 변경된 직후에 `Vue.nextTick(콜백)` 을 사용할 수 있다. 콜백은 DOM이 업데이트 된 후에 호출된다.

```jsx
<div id="example">{{ message }}</div>

var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
});
vm.message = 'new message';  // 데이터 변경
vm.$el.textContent === 'new message';  // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message';   // true
});
```

또한 `vm.$nextTick()` 인스턴스 메서드가 있다. 이는 내부 컴포넌트들에 특히 유용함. 왜냐하면 전역 `Vue` 가 필요 없고 콜백의 `this`  컨텍스트가 자동으로 현재 Vue 인스턴스에 바인드될 것이기 때문.

```js
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function() {
    return {
      message: '갱신 안됨'
    }
  },
  methods: {
    updateMessage: function() {
      this.message = '갱신됨';
      console.log(this.$el.textContent);  // => '갱신 안됨'
      this.$nextTick(function() {
        console.log(this.$el.textContent);  // => '갱신됨'
      })
    }
  }
});
```

`$nextTick()` 은 promise를 반환하므로, ES2017 async/await 문법을 사용해 똑같은 동작을 수행할 수 있다.

```js
methods: {
  updateMessage: async function() {
    this.message = '갱신됨';
    console.log(this.$el.textContent);  // => '갱신 안됨'
    await this.$nextTick();
    console.log(this.$el.textContent);  // => '갱신됨'
  }
}
```