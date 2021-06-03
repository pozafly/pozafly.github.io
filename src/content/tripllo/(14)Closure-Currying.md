---
layout: post
title: "(14) Closure & Currying 적용기"
author: [Pozafly]
tags: [Tripllo 제작기, Javascript, Vue.js]
image: ../img/tripllo/currying2.png
date: '2021-04-30T15:13:47.149Z'
draft: false
excerpt: 함수형 프로그래밍에 대해서 공부하다가 Tripllo에 적용한 클로저와 커링.

---

<br/>


> [참고1](https://sujinlee.me/currying-in-functional-javascript/), [참고2](https://github.com/FEDevelopers/tech.description/wiki/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EA%B0%80-%EB%90%98%EA%B3%A0-%EC%8B%B6%EB%8B%A4%EA%B3%A0%3F-(Part-2)), [참고3](https://ko.javascript.info/currying-partials)

<br/>

<br/>

## 개념

currying은 여러 개의 인자를 가진 함수를 호출할 경우, 파라미터의 수보다 적은 수의 파라미터를 인자로 받으면 누락된 파라미터를 인자로 받는 기법을 말함.

예를 들면 `f(a, b, c)` 처럼 단일 호출로 처리하는 함수를 `f(a)(b)(c)` 와 같이 각각의 인수가 호출 가능한 프로세스로 호출된 후 병합되도록 변환하는 것이다. 함수를 인자로 주면 새로운 함수를 만들어 반환해 준다.

```js
function curry(f) {  // 커링 변환을 하는 curry(f) 함수
  return function(a) {
    return function(b) {
      return f(a, b);
    }
  }
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);
alert(curried(1)(2));  // 3
```

<br/>

<br/>

## Tripllo validation 함수에 적용

기존의 내 valid 코드를 보자. 비슷한 두 개의 함수를 가져왔다.

```js
const validateEmail = email => {
  if(email.length < 20) {
    const re = (...);  // 정규식
    return re.test(String(email)); 
  } else {
    return false;
  }
};

const validateId = id => {
  if(id.length > 4 && id.length < 19) {
    const re = (...);  // 정규식
    return re.test(String(id));    
  } else {
    return false; 
  }
};
```

- email : 길이 20 이하, 정규식 체크
- id : 길이 4 초과 19 미만, 정규식 체크

이렇게 매번 정규식으로 체크를 해줘도 되지만 고차 함수를 통해 바꿔보자.

## 고차 함수로 변환

> 고차 함수는 함수를 매개변수로 받을 뿐 아니라 함수를 반환하기도 함.

```js
const valid = (regFunc, lengthFunc, ...args) => value => {
  if (regFunc(value)) {
    return lengthFunc(value, ...args);
  } else {
    return false;
  }
}

// 위 함수와 아래 함수는 같다. 편하게 화살표 함수가 좋은 것 같다.

function valid(regFunc, lengthFunc, ...args) {
  return function(value) {
    if(regFunc(value)) {
      return lengthFunc(value, ...args);
    } else {
      return false;
    }
  }
}
```

이렇게 valid 함수를 만들었다. valid 함수는 정규식을 체크하는 함수를 매개변수로 받고 이어지는 함수에서 길이 체크를 한다. 고차 함수의 매개변수로 들어갈 regFunc 함수와 그 lengthFunc을 만들어주자. 단 함수는 반드시 sideEffect가 없는 `순수 함수` 여야 한다.

> 순수 함수는 외부의 어떤 변수 값을 참조하지 않는 함수를 말한다. 항상 같은 값을 넣었을 때 항상 동일한 결과를 도출해야 함. 함수형 프로그래밍에서는 각각의 함수가 독립적으로 작동하게 해 부수효과를 가지게 해서는 안 되기 때문이다.

```js
// regFunc
const email = value => {
  const re = (...);
  return re.test(String(value).toLowerCase());
};
const id = value => {
  const re = (...);
  return re.test(String(value));
}

// lengthFunc
const length = (value, first, last) => {
  const length = value.length;
  if (!last) {
    if (length > first) {
      return true;
    } else {
      return false;
    }
  } else {
    if (length > first && length < last) {
      return true;
    } else {
      return false;
    }
  }
};
```

이렇게 매개변수로 들어갈 함수를 정의해 주었음. 이제 이 함수를 아래와 같이 사용할 수 있다.

```js
const emailValid = valid(email, length, 20);
const idValid = valid(id, length, 4, 19);
```

valid 함수 하나로 emailValid, idValid 함수를 만들었다. 

- 첫 번째 매개변수(regFunc)는 email과 id의 정규식을 체크하는 함수
- 두 번째 매개변수(lengthFunc)는 길이를 체크하는 함수.
- 후에 오는 매개변수(...args)는 1개를 넣어줄 때 이하, 2개를 넣어줄 때 사잇 값 체크를 해준다.

이렇게 만든 함수를 아래와 같이 활용할 수 있다.

```js
const emailResult = emailValid('pozafly@gmail.com23450987');
const idResult = idValid('pozafly');
console.log(emailResult, idResult);  // true or false 반환
```

물론 valid를 통해 새로운 함수를 만들지 않고 아래와 같이도 만들 수 있음.

```js
const emailResult = valid(email, length, 20)('pozafly@gmail.com')
const idResult = valid(id, length, 4, 19)('pozafly');
```

여기서 `valid` 함수를 통해 새로운 함수를 만들고 매개변수를 넣어주었는데, 이 valid 함수의 결과가 반환된 `emailValid` 함수와 `idValid` 함수는 3개의 매개변수로 넣어줬던 값을 기억하고 있다는 점을 주목하자. 생성될 때의 스코프에 상수(매개변수 값)가 존재했기 때문이다. 이 개념이 바로 `클로저` 다.

이미 valid 함수를 호출하고 종료되었지만, 내부에 있는 상수는 메모리에 살아있다. 이렇게 valid 함수로 만들어진 새로운 함수가 다시 새로운 함수로 호출하면 내부에 살아있던 변수(함수)가 적용되는 이유다.

valid 함수에 email, id 함수 말고도 password 함수를 만들어 넣어주어도 좋고, 다르게 변형해서 사용해도 좋을 것 같다. length 뒤에 오는 숫자들은 길이 제한 값이라 유지 보수하기에 좋다.

[Tripllo에 사용한 currying 함수 목록](https://github.com/pozafly/tripllo_vue/blob/9eabdcce73fdeee58749523f81337582b481dfa9/src/utils/validation.js)

<br/>

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)