---
layout: post
title: '클로저와 함께 알아보는 curring 함수'
author: [Pozafly]
tags:
	- JavaScript
date: '2023-02-14'
image: ../img/javascript/closure-with-curring.png
draft: false
excerpt: JavaScript의 클로저를 통해 currying 함수를 알아보자.

---

## 요약

- 일급 함수란, 함수를 다른 변수와 동일하게 다루는 것을 말한다.
- 클로저는 함수와 함수가 선언된 어휘적 환경(Lexical Environment)의 조합이다.
- Lexical Environment의 Lexical Scope에 의해 내부 함수는 외부 변수를 참조할 수 있다.
  - Lexical Scope는 함수의 스코프를 결정할 때, 함수가 어디에서 호출되었는가가 아니라 어디에 선언되었는가에 따라 결정되는 스코프를 말한다.
- 클로저에서 자유 변수가 실행 컨텍스트가 종료 되었어도 여전히 참조할 수 있는 이유는 가비지 컬렉터의 동작 방식 때문이다.
- 클로저는 private한 변수를 만들 수 있고, currying 함수를 만들어 함수를 지연 실행 시킬 수 있다.

<br/>

[mdn](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)에서 말하기를 클로저란, '**함수와 함수가 선언된 어휘적 환경의 조합**'이라고 한다. 처음 이 말을 접했을 때는 도대체 이 말이 뭘 말하는 것인가 잘 모르겠더라. 이 말의 의미를 파악하면서 자바스크립트의 추가적인 개념과 함께 알아보자.

## 일급 함수(first-class function)

먼저, 일급 함수에 대해서 알아보자. [mdn JavaScript](https://developer.mozilla.org/ko/docs/Web/JavaScript)에서 JavaScript를 설명하기로 JavaScript는 가벼운, 인터프리터 혹은 just-in-time 컴파일 프로그래밍 언어로, '**일급 함수**'를 지원한다고 한다. 일급 함수란, 함수를 다른 변수와 동일하게 다루는 언어다. 일급 함수의 조건은 아래와 같다.

- 함수를 다른 함수에 인수로 제공할 수 있다.
- 함수가 함수를 반환할 수 있다.
- 함수를 변수에 할당할 수 있다.

```js
// 함수를 변수에 할당
const foo = function () {
  console.log('foobar');
};

// 함수를 인자로 받는다.
function bar(func) {
  // 함수를 리턴한다.
  return func;
}
```

함수를 인자로 받거나, 함수를 리턴하는 함수를 '**고차 함수**(Higher-order function)'라고 한다. 만약 `return func;` 이 아니라, `return func()` 이었다면 함수를 실행한 '값' 자체가 반환되었을 것이다. 하지만 함수를 실행한 것이 아니라 함수를 가리키고 있는 변수 자체를 반환했다.

자바스크립트의 이러한 특성을 활용하면 클로저를 만들 수 있다.

<br/>

## 클로저

클로저는 함수와 함수가 선언된 어휘적 환경(Lexical Environment)의 조합이라고 했다. Lexical Environment는 실행 컨텍스트 안에 있는 객체다. 실행 컨텍스트란, 코드가 실행될 때 필요한 환경 정보를 모아둔 객체인데, 이는 함수가 실행될 때 활성화 된다.

실행 컨텍스트 안에는 여러가지가 있지만, 대표적으로 'VariableEnvironment', 'LexicalEnvironment', 'ThisBinding' 있다. 여기서 말하는 LexicalEnvironment는 변수에 접근하기 위해 필요한 식별자(변수명)를 모으고, 외부 환경에서 가지고 있는 식별자 정보를 수집한다. 식별자를 모으는 곳은 EnvironmentRecord이고, 외부 환경의 식별자 정보를 수집하는 곳은 OuterEvironmentReferece 다.

```js
function init() {
  var name = 'Mozilla';
  function displayName() {
    alert(name);
  }
  displayName();
}
init();
```

즉, 위의 코드에서 init이라는 함수가 실행되었을 때 실행 컨텍스트가 활성화 되었다. 함수 내부에는 `name` 라는 식별자가 있다. 이는 LexicalEnvironment에 수집이 되었을 것이다. 그리고, displayName 함수에서는 내부 변수가 없지만, init 함수의 변수인 `name`이 사용되었다. 외부의 식별자에 접근했으므로 OuterEnvironmentReference에 접근을 했을 것이다.

이것이 우리가 흔히 말하는 '스코프 체이닝'이다. OuterEnvironmentReference는 현재 호출된 함수가 선언될 당시의 외부 LexicalEnvironment를 참조하는 것. 식별자의 유효범위를 **안에서부터 바깥으로 차례로 LexicalEnvironment를 검색해 나가는 것을 스코프 체인**이라고 한다.

그렇다면, Lexical Scoping은 무엇일까? 함수의 스코프를 결정할 때, 함수가 어디서 호출되었는가가 아니라, 어디에 선언 되었는가에 따라 결정되는 스코프를 말한다. `displayName()` 함수는 init() 함수 안에 선언되었다. 외부에서 이 init 함수를 불러도 마찬가지로, init안의 LexicalEnvironment를 참조하겠다.

이제 클로저를 보자. 위 소스는 클로저가 아니다.

```js
function makeFunc() {
  // 자유 변수
  var name = 'Mozilla';
  function displayName() {
    console.log(name);
  }
  return displayName;
}

// myFunc변수에 displayName을 리턴함
var myFunc = makeFunc();
//리턴된 displayName 함수를 실행(name 변수에 접근)
myFunc(); // Mozilla
```

일급 함수라는 특성을 이용해 함수를 리턴했다. makeFunc()이 실행되면서 myFunc 변수에 displayName 함수가 반환되었다. 그리고 displayName이 실행되었다. 일반적으로 함수가 실행이 되면 실행 컨텍스트가 활성화 되고, 실행이 종료가 되면 실행 컨텍스트가 함께 종료된다. 그러면 실행 컨텍스트에 담겨있는 LexicalEnvironment 또한 사라질 것이다.

즉, `var myFunc = makeFunc();` 요 구문에서 이미 `name` 식별자가 사라졌다는 뜻이다. 하지만 `myFunc()` 코드는 정상적으로 실행된다. 이상하지 않나? 이미 name 식별자는 함수 종료와 함께 사라졌을텐데 말이다.

이 현상을 클로저라고 부른다. 즉, 클로저란 어떤 함수에서 선언한 변수를 참조하는 내부 함수에서 발생하는 현상이다. 이때 변수가 사라지지 않는 현상을 말한다. 사라지지 않는 이유는, JavaScript 엔진의 가비지 컬렉터의 동작 방식 때문이다. 가비지 컬렉터는 어떤 값을 참조하는 변수가 하나라도 있으면 그 값은 수집 대상에 포함시키지 않기 때문.

그리고 그 외부 함수에 있던 변수를 `자유 변수`라고 부른다. 클로저는, 함수가 자유 변수에 대해 닫혀 있다는 의미로 이러한 이름이 붙었다. 수식으로 표현하면 아래와 같다.

> 클로저 = 함수 + 함수가 참조하는 어휘적(렉시컬) 환경

그렇다면 클로저는 무조건 내부 함수를 반환해야만 가능할까? 아니다.

```js
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
```

1. setInterval, clearInterval은 전역 객체인 window 객체의 메서드다. 따라서 setInterval, clearInterval은 즉시실행함수(IIFE)인 코드에서 접근할 수 있다.
2. IIFE 안의 변수는 `a`, `intervalId`, `inner` 로 3가지다. inner 함수 내부에서는 a와 intervalId에 접근하고 있다.
3. setInterval이 실행될 때, 콜백으로 넘겨준 inner가 실행될 것이다. 렉시컬 스코프에 의해 inner가 선언된 IIFE의 스코프를 inner도 가진다.
4. inner 함수가 실행되면 실행 컨텍스트가 활성화 되는데, environmentRecord 안에서 먼저 변수 `a`, `intervalId` 을 찾는다. 변수가 없기 때문에 outerEnvinronmentReference에서 변수를 찾는다. 즉 스코프 체인을 따라 IIFE에 선언된 변수를 찾는다.
5. setInterval 메서드가 실행되면서, 첫번째로 실행된 inner 함수의 호출이 끝났다. 그리고 IIFE 함수도 호출이 끝났다. setInterval(window의 메서드)은 inner를 다시 호출한다. 원래는 IIFE가 종료 되었기 때문에 내부의 변수 a, intervalId 를 참조할 수 없지만 inner는 다시 참조한다.
6. 즉, IIFE 내부의 변수는 계속 참조가 되고 있다. 따라서 클로저다.

내부 함수를 외부로 전달하는 방법은, 함수를 return 하는 경우 뿐 아니라 콜백으로 전달하는 경우에도 포함이 된다.

---

아래 코드를 보자. 활용 방안이다.

```js
function makeCounter() {
  let counter = 0;
  function increase() {
    counter++;
  }
  function decrease() {
    counter--;
  }
  function getCounter() {
    return counter;
  }
  return {
    increase,
    decrease,
    getCounter,
  };
}

let counter = makeCounter();
counter.increase();
counter.increase();
console.log(counter.getCounter()); // 2

counter.decrease();
counter.decrease();
console.log(counter.getCounter()); // 0

counter = makeCounter(); // counter 초기화
counter.increase();
console.log(counter.getCounter()); // 1
```

이런 식으로 사용할 수 있다. 여기서 counter 변수 자체는 외부에서 직접 접근이 불가능하고, `getCounter()` 함수로만 접근이 가능하다. private 변수인 것이다. 이 개념을 '정보 은닉' 이라고 한다. 외부로 return된 녀석들로만 통제가 가능하다.

코드를 아래와 같이 사용할 수도 있다.

```js
function makeCounter() {
  let counter = 0;
  function increase() {
    counter++;
    return this;
  }
  function decrease() {
    counter--;
    return this;
  }
  function getCounter() {
    return counter;
  }
  return {
    increase,
    decrease,
    getCounter,
  };
}

let counter = makeCounter().increase().increase().decrease().getCounter();
console.log(counter); // 1
```

이렇게 메서드 체이닝도 가능하다. 왜냐하면 increase, decrease에서 `return this` 를 사용했기 때문. 함수는 기본적으로 this가 전역 객체이지만, 여기서는 함수가 아니라 **메서드**로 사용이 되었다. `makeCounter().increase()` 이렇게 점(.) 표기법으로 객체 안의 함수를 불렀기 때문이다. 따라서 이 경우의 this는 makeCounter 자체가 되었고 이는 메서드 체이닝으로 이어진다.

<br/>

## 커링 함수

커링 함수는 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것을 말한다.

커링은 `f(a, b, c)`처럼 단일 호출로 처리하는 함수를 `f(a)(b)(c)`와 같이 각각의 인수가 호출 가능한 프로세스로 호출된 후 병합되도록 변환하는 것이다.

```js
function curry(f) {
  // 커링 변환을 하는 curry(f) 함수
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}

function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);
console.log(curriedSum(1)(2)); // 3
console.log(curriedSum(4)(6)); // 10
let curriedSumSix = curriedSum(6);
console.log(curriedSumSix(1)); // 7
```

이 코드에서도 일급 함수의 특성이 사용되었다. curry 함수에서는 다른 함수들을 return 하고 있다. 그리고 return된 함수를 또 다른 매개변수에 넣어 호출하고 있다. curriedSum이라는 함수는 `()()`를 통해 가장 깊숙이 있는 함수가 실행되어 값을 return 했다. curriedSumSix는 currriedSum으로 만들어졌고 이는 6을 무조건 더하도록 고정이 되었다. curriedSum은 이제 다른 함수로 조합할 수 있는 여지가 많아졌다. 그리고 조합과, 마지막에 호출될 함수는 나중에 사용되어도 된다. 이를 '지연 실행(lazy execution)' 이라고 한다.

지연 실행은, 당장 필요한 정보만 받아서 전달하고 또 필요한 정보가 들어오면 전달하는 식으로 마지막 인자가 넘어갈 때까지 함수의 실행을 미루는 것을 말한다.

curry 함수를 가독성이 좋게 화살표 함수로 만들 수 있다.

```js
const curry = f => a => b => f(a, b);
```

> 참고
>
> - https://charles098.tistory.com/157
> - https://ko.javascript.info/currying-partials
> - https://chanhuiseok.github.io/posts/js-5/
> - https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x
