---
layout: post
title: 'JavaScript의 Getter / Setter'
author: [Pozafly]
tags:
	- JavaScript
date: '2023-02-09'
image: ../img/javascript/JavaScript_Getter_Setter.png
draft: false
excerpt: 객체의 접근자 프로퍼티인 Getter와 Setter에 대해 알아보자.
---

## 정리

- setter는 객체의 접근자 프로퍼티다.
- 객체 내부에 선언하며, 외부에서 접근자 프로퍼티를 넣어줄 수도 있다.
- 접근자 프로퍼티는 객체의 데이터 프로퍼티를 조회, 삽입 하는 가상의 메서드이다.
- 접근자 프로퍼티를 활용하면 응집도가 높은 객체를 사용할 수 있다.

<br>

## getter와 setter란?

객체의 프로퍼티는 두 종류다. 첫 번째는 데이터 프로퍼티이고, 두 번째는 접근자 프로퍼티다. 데이터 프로퍼티는 우리가 흔히 아는 객체 내부의 값에 해당한다. 접근자 프로퍼티는 getter와 setter를 말한다. 이는 객체의 프로퍼티에 접근해 값을 반환하거나 값을 할당할 수 있다.

### getter

우선 getter에 대해서 알아보자. getter는 객체 내부의 데이터 프로퍼티를 return하는 메서드다. 동적으로 가공한 값을 반환할 수도 있다.

```js
const user = {
  name: '선태',
  get addNimName() {
    return `${this.name}님`;
  },
};
user.addNimName // 선태님
```

addNimName이라는 getter를 객체 내부에 선언해두었다. 그리고 객체 외부에서 getter에 접근해 user 객체의 name 데이터 프로퍼티를 가공해 return했다. 이렇게 한 프로퍼티의 값을 가공해 외부에서 사용할 수 있게 되었다. getter는 함수처럼 호출하지 않고 프로퍼티에서 값에 접근하는 것처럼 접근할 수 있다.

getter에는 3가지 제약사항이 있다.

- getter 메서드는 매개변수를 가질 수 없다.
- 객체 내에서 동일한 getter 식별자를 가질 수 없다.
- 객체 내의 다른 프로퍼티 명과 겹치면 안된다.

```js
const user = {
  age: 15,
  get name(value) { ... } -> 매개변수 사용 불가
  get nickName() { ... }
  get nickName() { ... } -> 두번 이상 선언 불가
  get age() { ... } -> age라는 데이터 프로퍼티가 있기 때문에 불가
}
```

### setter

setter는 객체의 프로퍼티에 값을 할당할 수 있게 해준다.

```js
const user = {
  name: '선태',
  surName: '황',

  get fullName() {
    return `${this.name} ${this.surName}`;
  },
  set fullName(value) {
    [this.name, this.surName] = value.split(' ');
  },
};
user.fullName; // 선태 황

user.fullName = '윤정 박';
user.fullName; // 윤정 박
```

fullName이라는 getter에 `=`으로 값을 할당하기전에는 단순 getter가 나왔고, 이후 `=` 연산자를 통해 setter를 거치면 내부에 있는 데이터 프로퍼티가 변경되었다.

<br/>

## getter/setter의 공통 속성

### 접근자 프로퍼티 삭제

delete 키워드로 접근자를 삭제할 수 있다.

```js
const user = {
  get getName() {
    return this._name;
  },
  set setName(value) {
    this._name = value;
  },
}

delete user.getName;
delete user.setName;
```

### 객체 내부에 선언하지 않고 외부에서 선언하기

만약 객체를 선언한 후 getter/setter를 추가하고 싶다면 `Object.defineProperty()` 메서드를 사용해서 추가해줄 수 있다.

```js
const user = {
  name: '선태',
};
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surName}`;
  },
  set(value) {
    [this.name, this.surName] = value.split(' ');
  },
});
```

## 사용 이유

getter/setter는 method로도 구현할 수 있다. 아래 예시를 보자.

```js
const user = {
  name: '선태',
  surName: '황',

  get fullName() {
    return `${this.name} ${this.surName}`;
  },
  getFullName() {
    return `${this.name} ${this.surName}`;
  },
};

console.log(user.fullName); // 선태 황
console.log(user.getFullName()); // 선태 황
```

getter인 fullName과 method인 getFullName() 은 동일한 값을 return하며, 로직 또한 동일하다. 하지만 `console.log(user)` 로 값을 보면 다르게 나타난다.

<img width="309" alt="image" src="https://user-images.githubusercontent.com/59427983/217734448-76698eb1-bd17-4459-8642-d35d8c5f5ee4.png">

method인 `getFullName()` 은 console에 나타났고, getter인 `fullName()` 은 나타나지 않았다. 해당 객체를 직접 열어보면 그제서야 `get fullName()` 이라는 함수가 나타난다. 즉, getter는 가상의 프로퍼티다. 가상의 프로퍼티라는 것은, 읽고 쓸 수는 있지만, 실제로는 존재하지 않는다는 의미다. 가상의 프로퍼티는 [mdn](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get#%EC%84%A4%EB%AA%85)에서 번역하기를 '유사 속성'이라고 되어 있다.

객체 내부에 method로 지정된 함수는 공식적인 의미를 가지기 때문에 여러 곳에서도 활용될 수 있음을 내포하고 있다. 하지만, getter 또한 마찬가지로 여러 곳에서 사용될 수는 있지만, 공식적이지 않다는 의미가 된다.

그리고, 서버로 부터 전달받은 어떤 객체가 여러 곳에서 활용하고 있다고 해보자.

```js
const user = {
  name: '선태',
  surName: '황',
};
```

이때 객체는 오로지 데이터 프로퍼티만 가지고 있다. 그리고 화면에 나타나야 할 데이터는 `name + surName` 이다. 그러면 `const fullName = name + surName;` 이 된다. 이 fullName이라는 가공된 변수는 화면 여러곳에서, 각기 다른 JavaScript 파일에서 사용되고 있다. 이때, fullName 뒤에 '님'을 붙여 표현해야 한다는 요구사항이 생겼다.
그러면 이 fullName을 사용하고 있는 파일들을 일일이 찾아 뒤에 '님'을 붙여야 할 것이다. 또한 식별자가 fullName으로 되어있지 않을 수도 있다.

하지만 만약, getter가 선언되어 있었고, 이를 많은 곳에서 활용하고 있었다고 가정해보자.

```js
const user = {
  name: '선태',
  surName: '황',
  get fullName() {
    return `${this.name} ${this.surName}님`;
  },
};
```

많은 곳에서 fullName getter를 사용하고 있었기 때문에 return값 맨 뒤에 '님' 만 붙이면 일일이 찾지 않아도, 의존하고 있는 곳에서 전부 '님'으로 변경 될 것이다.

모듈에서는 결합도는 낮추고, 응집도는 높일 수록 독립적인 소프트웨어 설계이다. 다른 곳에서 일일이 fullName 변수를 만들어 사용했다는 것은 결합도(의존성)가 높아졌다는 것이고, getter로 fullName을 객체 내부에 집어넣었다는 것은 응집도가 높아졌다는 뜻이다. 즉, getter로 선언해 특정 기능을 user 객체 안에 응집도 높은 모듈화가 잘 이루어졌다. 데이터 프로퍼티를 일일이 꺼내 쓰지 않도록 인터페이스 화가 잘 되었다.

<br/>

### 활용 예시

#### 1. 유효성 검사(setter)

```js
let user = {
  get name() {
    return this._name;
  },
  set name(value) {
    if (value.length < 4) {
      alert('입력하신 값이 너무 짧습니다. 네 글자 이상으로 구성된 이름을 입력하세요.');
      return;
    }
    this._name = value;
  },
};

user.name = '선태';
console.log(user.name); // 선태

user.name = ''; // alert open
```

name을 위한 setter를 만들어 user의 이름이 너무 짧은 것을 방지하고 있다.

#### 2. getter/setter 호출시 추가 행위

```js
const user = {
  count: 0,

  get name() {
    return this._name;
  },
  set name(value) {
    this.count++;
    this._name = value;
  },
};

user.name = 'a';
user.name = 'b';
user.name = 'c';
user.name = 'd';
console.log(user.count); // 4
```

객체에 set이 일어날 때마다 count를 세어준다.

<br/>

> 참고
> - https://ko.javascript.info/property-accessors
> - https://stackoverflow.com/questions/34805099/are-getter-and-setter-necessary-in-javascript
> - https://madplay.github.io/post/coupling-and-cohesion-in-software-engineering
