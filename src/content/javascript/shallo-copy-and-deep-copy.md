---
layout: post
title: 'JavaScript의 얕은 복사와 깊은 복사'
author: [Pozafly]
tags:
	- JavaScript
date: '2023-02-08'
image: ../img/javascript/deep-copy-shallow-copy.png
draft: false
excerpt: JavaScript의 얕은 복사와 깊은 복사로 알아보는 객체의 특성. (feat. React, Vue.js)
---

<br/>

JavaScript에서 객체란, 키로 구분된 데이터 집합이나 복잡한 개체(entity)를 저장할 수 있다. JavaScript를 잘 다루려면 객체를 잘 이해하고 있어야 한다.

객체는 단순히 key, value로 되어있는 자료형일 뿐 아니라, 내부 메커니즘을 알고 있어야 모던 자바스크립트 프레임워크를 잘 다룰 수 있다.


## 데이터 타입

JavaScript의 얕은 복사와 깊은 복사를 알아보기전에 데이터 타입에 대해서 알아보자. 크게 2종류로 분류할 수 있다.
- 기본형(Primitive) 타입
- 참조형(Reference) 타입

기본형 타입에는 Number, String, Boolean, undefined, null, 그리고 ES6에서 추가된 Symbol이 있다.

참조형 타입은 Object, Array, Function, Date, RegExp, 그리고 ES6에서 추가된 Map, WeakMap, Set, WeakSet이 있다.

기본형과 참조형을 구분할 수 있는 방법은, 할당이나 연산 시 값을 복사하면 기본형이고, 값을 복사할 때 참조하면 참조형이다. 그러면 할당을 해보자.

```js
var a = 10;
```

코드에서는 변수를 선언하고, 식별자를 a로 주었으며 number 타입인 10을 할당했다. 이 코드를 실행했을 때, 메모리의 한 공간을 확보한 다음, 식별자를 붙인다. 그리고 바로 10을 할당하지 않고 데이터를 저장하기 위한 다른 메모리 공간을 하나 더 확보하고 그곳의 주소를 식별자가 저장된 곳의 값으로 집어넣는다. 그리고 10이라는 값을 집어넣는다.

즉 변수는 값의 위치(주소)를 기억하는 메모리 공간인데, 값의 위치란 값이 위치하고 있는 메모리 상의 주소(address)를 의미한다. 즉, 변수란 값이 위치하고 있는 메모리 주소에 접근하기 위해 사람이 이해할 수 있는 언어로 지정한 식별자다.

값을 가져오는 과정은 위 과정과 반대다. `console.log`로 a에 접근했을 때 먼저 메모리 공간에서 식별자가 a인 메모리 공간을 찾고, 메모리 공간에 저장된 실제 값이 들어있는 공간의 주소로 값을 가져오는 것이다.

number 타입은 기본형 타입으로 주소가 한번 연결되었다. 그러면 참조형 타입을 알아보자.

```js
var obj = {
   a: 10,
   b: 'abc',
}
```

<img width="1157" alt="스크린샷 2023-02-07 오후 8 04 24" src="https://user-images.githubusercontent.com/59427983/217228274-5af5ff74-f2d6-44f0-a260-e658ebc1c508.png">

(Note : 코어 자바스크립트 책의 그림을 다시 그렸습니다.)

1. obj라는 식별자를 가진 변수를 선언하고 참조형 타입인 객체 하나를 할당했다. 기본형과 동일하게 메모리 공간(@1002)을 하나 확보하고 obj라는 식별자를 주었다. 그리고 값을 저장하려고 다른 메모리 공간(@5001)을 하나 더 확보했더니 기본형으로 저장해야 하는 값이 여러 개가 들어있다.
2. 이 프로퍼티들을 저장하기 위해 방금 새로 확보한 공간 외 프로퍼티 갯수에 맞게 또 여러 개의 공간(@7103, @7104)을 확보하고 식별자를 지정한다. (위 코드에서는 2개 더 있기 때문에 영역을 2개 더 확보했다.)
3. 그리고 그 식별자의 실제 데이터가 저장할 공간을 다시 확보하고(@5003, @5004) 실제 값을 저장한다.
4. @7103, @7014에 방금 저장한 곳의 주소를 저장 후, @5001에 그룹의 주소를 저장한다.
5. 마지막으로, 아까 확보해둔 메모리 공간(@5001)에 값이 저장된 (@7103, @7104)의 공간 주소를 저장한다.

기본형 데이터와의 차이는 참조형 데이터 안에 있는 기본형 데이터를 저장하기 위해 기본형 데이터의 주소를 담은 공간을 새로 생성했다는 점이다.

<br/>

## 불변 값이란?
불변 값은, 변하지 않는 값이라는 뜻이다. 위에서 살펴본 기본형 타입은 불변 값이다. 그리고 참조형 타입은 대체적으로 가변값이다.

```js
var a = 10;
a = 20;
console.log(a); // 20
```

처음에는 a에 10 값을 주었다. 그리고 20 값을 다시 할당하고 출력하니 20이 나왔다. 자바스크립트 입장에서 설명해보자.
- 메모리 공간을 확보 후 다른 메모리 공간에 10을 할당했다.
- 그리고 10이 저장된 주소를 a에 넣는다. 
- 이후, 20을 재할당할 때, 10이 저장되어 있는 메모리 공간을 그대로 두고, 20을 저장하는 메모리 공간을 추가로 확보 후 저장한다.
- 그리고 그 공간의 주소를 a가 저장한다.

흔히 사람의 입장에서는 10이 저장되어 있는 메모리 공간에 10을 삭제하고 20을 집어 넣는 것을 생각한다. 하지만 자바스크립트는 값을 새로 생성하고 주소를 수정해주었다. 즉, 기본형 타입은 새로 생성 되었고 변경되지 않았다. (10이라는 값은 추후 GC가 수집하여 없어질 것임.)

하지만 레퍼런스 타입은 다르다.

```js
var obj = {
   a: 10,
   b: 'abc',
}
var obj.a = 20;
```
obj의 프로퍼티의 값을 재할당하면, obj이 가지고 있는 메모리 주소는 변경되지 않고 obj.a가 가지고 있는 주소가 변경된다. 즉, '새로운 객체'가 만들어진 것이 아니라 기존 객체 내부의 값만 바뀐 것이다.

<br/>

## 깊은 복사란?

여기서 말하는 **'복사'**란, 원본을 베낌. 종이를 포개고 그 사이사이에 복사지를 받쳐 한 번에 여러 장을 쓴다는 의미를 가지고 있다. 즉 동일한 내용을 그대로 다른 곳에서 사용하는 것을 말한다.

그리고, 깊은 복사란, 기존 값의 모든 참조가 끊어지는 것을 말한다. 특히 복사할 때, 참조형 타입 값(객체)에서 내부에 있는 모든 값이 새로운 값이 되는 것을 말한다.

### 기본형 타입의 깊은 복사

자바스크립트에서는 할당 연산자(`=`)를 사용해 쉽게 복사를 할 수 있다.

```js
var a = 10;
var b = a;
console.log(a); // 10
console.log(b); // 10
```

b에 10을 직접 할당해주지 않아도 a를 할당 했기 때문에 10이라는 값이 도출된다. 하지만, 정확하게 말하자면 할당 연산자(`=`)는 객체를 복사해서 값에 집어 넣는 것이 아니다. 단지 a가 가지고 있는 주소를 b에게 주어 b도 그 대상을 바라보게 만든 것이다. 기본형 타입은 '불변값' 이라고 했다. 기본형 타입의 값을 재할당 할 때는 기존 값을 변경하는 것이 아닌 새로 만들어 주소 값을 준다는 의미였다. 따라서, a와 b는 메모리 공간에 생성된 10의 주소값을 가지고 있다.

```js
var a = 10;
var b = 10;
console.log(a === b); // true
var c = 20;
var d = c;
console.log(c === d); // true

d = 30;
console.log(c) // 20
console.log(d) // 30
console.log(c === d) // false
```

- 기본형 타입의 값을 바라보는 주소값이 동일하기 때문에 a와 b는 각각 값을 할당 받았지만 동일하다고 판단한다.
- d도 마찬가지로 c의 주소를 넘겨받았기 때문에 동일하다고 판단한다.
- c의 주소를 넘겨 받은 d에 30을 재할당 했다.
- c와 d는 다른 값을 바라보고 있다.

내부의 값은 없지만 복사했을 때, 서로의 주소가 달라졌다. 기본형 타입의 깊은 복사다. **서로에게 영향을 주지 않는다.** 그럼, 참조형 타입을 보자.

### 참조형 타입의 깊은 복사

```js
var obj1 = {
   a: 10,
   b: 'abc',
};
var obj2 = obj1;
console.log(obj1 === obj2); // true

obj2.a = 20;
console.log(obj1); // {a: 20, b: 'abc'}
console.log(obj2); // {a: 20, b: 'abc'}
console.log(obj1 === obj2); // true
```

- obj1과 obj2가 가지고 있는 주소 값이 동일하기 때문에 true가 나왔다.
- obj2의 a프로퍼티의 값을 20으로 재할당했다.
- obj1, obj2의 값의 a 프로퍼티 모두 20으로 변경되었다.
- 여전히 obj1과 obj2가 가지고 있는 주소 값이 동일하다.

결과가 나온 이유는, obj2의 '**프로퍼티**'를 변경시켰기 때문이다. 프로퍼티 a가 바라보고 있는 주소 자체는 변경되었지만 obj1, obj2가 프로퍼티 '그룹'을 바라보는 주소자체는 변경되지 않은 것이다. 이렇게 객체 자체의 참조 값을 할당하면, 깊은 복사가 일어나지 않는다.

그렇다면 객체의 깊은 복사를 하려면, 즉 내부의 프로퍼티 값의 주소를 전부 다르게 하려면 어떻게 해야할까?

#### 재귀 함수를 이용
```js
var deepCopy = function(obj) {
   var result = {};
   if (typeof obj === 'object'  && obj !== null) {
      for (var prop in obj) {
         result[obj] = deepCopy(obj[prop]);
      }
   } else {
      result = obj;
   }
   return result;
}
```
deepCopy 함수는 함수 내부에서 자기 자신을 호출하는 재귀 함수다. 중첩된 객체라고 하더라도 프로퍼티 갯수만큼 돌면서 result 객체에 새롭게 할당해준다.

#### JSON.parse(JSON.stringify(obj))를 사용
```js
var obj1 = {
   a: 10,
   b: 'abc',
}
var obj2 = JSON.parse(JSON.stringify(obj1));
obj2.b = 3;
console.log(obj1); // {a: 10, b: 'abc'}
console.log(obj2); // {a: 10, b: 3}
```

JSON.stringify()는 JavaScript 값이나 객체를 JSON 문자열로 변환한다. 그리고 JSON.parse()는 JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성한다. 즉, 객체를 문자열로 변환 후 다시 객체 형태로 만든다. 문자열로 변환후 다시 객체로 만들면 원본 객체와의 참조가 모두 끊어진다.

---

깊은 복사를 사용하면 복사했을 때 값은 동일하지만, 객체 내부의 값을 변경해도 서로 영향을 주지 않고 격리된 값을 보장한다. 원시값과 달리 객체는 변경이 가능한 '가변값'이며 프로퍼티의 집합이다. 클래스에 정의된 멤버대로 객체를 생성하는 자바같은 경우 객체가 생성된 이후 멤버를 추가할 수 없다. 하지만, 자바스크립트는 객체 생성 이후에도 프로퍼티를 추가하거나 삭제하는 등 변경할 수 있다. 따라서, 깊은 복사를 통해 객체를 복사하지 않으면 객체 사이의 관계가 생성되어 예기치 못한 오류가 발생할 수 있다.

<br/>

## 얕은 복사란?

얕은 복사란 참조형 타입의 값의 바로 아래 단계의 값만 복사하는 방법이다.

```js
var obj1 = {
   a: 1,
   b: {
      c: 2,
   },
}
var obj2 = { ...obj1 };
console.log(obj1 === obj2); // false
console.log(obj1.b === obj2.b); // true
```

두 개의 객체는 다른 주소를 가지고 있지만, 객체 안 프로퍼티는 동일한 주소를 가지고 있다. 쉽게 말하면 `{}` 이 껍데기는 새로 생성된 객체이며 새로운 주소를 갖게 되었고 spread 연산자로 풀어진 프로퍼티들은 처음 선언된 obj1의 프로퍼티들이 사용되었다.

얕은 복사는 후술할 React, Vue.js에서 중요한 개념으로 다루어진다. 얕은 복사를 만드는 방법은 위에 사용한 spread 연산자를 통해 만들 수도 있고 다른 방법으로도 만들 수 있다. spread 연산자는 객체 뿐 아니라 배열에서도 동일하게 동작한다.

### Object.assign()

assign은 '할당'이라는 뜻을 가지고 있으며 객체와 객체를 합쳐주는 메서드다.

```js
var obj1 = {
   a: 10,
   b: {
      c: 'abc',
   },
};
var obj2 = Object.assign({}, obj1);
obj2.a = 20;
obj2.b.c = 'def';

console.log(obj1); // { a: 10, b: { c: "def" } }
console.log(obj2); // { a: 20, b: { c: "def" } }
```

- 첫번째 인자로 `{}` 빈 객체가 들어갔기 때문에 껍데기가 obj1과 다른 객체가 반환 될 것이다.
- obj1의 내용을 `{}` 빈 객체 안에 복사해서 집어넣고 반환한다.
- 프로퍼티 a는 기본형 타입의 값이 들어있기 때문에 변경하면 obj2의 a 프로퍼티만 변경된다.
- 프로퍼티 b는 참조형 타입의 값이 들어있기 때문에 변경하면 obj1, obj2의 b가 가진 주소값이 동일하기 때문에 둘 다 변경된다.

[mdn](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#%EA%B9%8A%EC%9D%80_%EB%B3%B5%EC%82%AC_%EC%A3%BC%EC%9D%98%EC%A0%90)에 따르면 Object.assign은 깊은 복사를 해주지 않는다고 나와있다.

<br/>

### for ... in

```js
var copyShallo = function(obj) {
   var result = {};
   for (var prop in obj) {
      result[prop] = obj[prop];
   }
   return result;
}
```

깊은 복사에서 사용했던 함수와 달리 재귀를 사용하지 않았다. 단순히 첫번째 프로퍼티만 새로 만든 result 객체에 담는 형태이다.

---

정리하자면 이렇다.


얕은 복사는 한 단계까지만 복사하고, 깊은 복사는 객체에 중첩된 객체까지 모두 복사한다.
얕은 복사와 깊은 복사 모두 복사한 대상에 대해서 새로운 객체를 생성하여 기존 객체에는 영향을 주지 않는다. 하지만 얕은 복사와 깊은 복사는 어느 수준까지 복사하느냐의 차이를 가진다.
얕은 복사를 하면 한 단계만 복사하기 때문에 중첩된 객체에 대해서는 서로 영향을 주고, 깊은 복사는 중첩된 객체 역시 별개의 값으로서 서로 영향을 주지 않는다.

<br/>
<br/>

## react, vue에서 사용하는 복사

### react의 경우

react에서 DOM을 변경시키는 방법은 props와 상태 값을 변경하는 것이다. 상태 값이 변경되면 React는 새 데이터로 DOM을 다시 그린다. React의 모든 상태값을 불변으로 취급힌다.

```js
const [count, setCount] = useState(0);
(...)

setCount(5);
```
원시 값은 불변값이므로 count가 0에서 5로 변경되었고(0 값은 메모리에 존재하는데 5가 메모리에 새로 생성되어 count 변수의 주소가 변경되었다), 리랜더링이 일어나 화면의 데이터가 변경된 데이터로 나타났다.
그렇다면 객체는 어떨까?

```js
const [obj, setObj] = useState({
   a: 10,
   b: {
   c: 'abc',
   },
});

return (
   <div>
   <p>{obj.b.c}</p>
   <button
      onClick={() => {
         obj.b.c = 'def';
         setObj(obj);
      }}
   >
      Click
   </button>
   </div>
);
```

b.c 프로퍼티에 'def'를 재할당했다. 하지만 setState를 사용했음에도 화면은 변하지 않는다. 이유는 react에서 상태값을 비교할 때 '얕은 비교' 를 사용하기 때문이다. obj는 새로 만들어진 객체가 아니라, 상태값을 선언할 때 이미 만들어져있었던 obj를 다시 setState 함수에 넣어주었고, obj와 b.c프로퍼티가 변경된 obj는 서로 같은 주소를 가지고 있기 때문에 react 입장에서 동일한 객체라 인식하고 업데이트 하지 않은 것이다.

react는 상태를 비교할 때 `Object.is()` 를 사용한다. Object.is 메서드는 동등 비교(`===`) 연산자와 비슷한 역할을 하는데, 0의 부호가 다른 것을 구분하며, Number.NaN과 NaN을 같지 않은 것으로 판단하는 것 외에는 동일하다. [useState in React: A complete guide](https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/)

그렇다면 주소를 변경한 Object를 넣어주자.

```js
onClick={() =>
   setObj({
      ...obj,
      b: {
         c: 'def',
      },
   })
}
```

setState에 새로운 객채(`{}`)를 만들었고, 얕은 복사로 spread 문법을 활용해 객체를 풀어주었다.(앞서 살펴본 Object.assing() 메서드도 동일하게 동작한다) 그리고 b.c의 값을 변경했다. 잘 동작한다. 그렇다면 깊은 복사도 가능할까?

```js
onClick={() => {
   const obj2 = JSON.parse(JSON.stringify(obj));
   obj2.b.c = 'def';
   setObj(obj2);
}}
```

역시 마찬가지로 obj가 바라보고 있는 주소 자체가 변경되었기 때문에 깊은 복사도 동작한다. react 공식 Doc에서 지속적으로 등장하는 단어가 있다. 그것은 'shallow' 인데, DOM을 비교할 때에도 react는 얕은 비교를 한다. 왜 깊은 복사도 가능하지만 얕은 복사를 권장할까?
이유는 성능에 있다. [react - reconciliation](https://ko.reactjs.org/docs/reconciliation.html)


만약 Object의 깊이가 1000개라고 가정하자. 그리고 999번째의 깊이의 5번째 값이 변경되었다. 그렇다면 Object의 1000개의 깊이를 모두 돌면서 값을 비교해야한다. 비교를 해야하는 연산이 매우 많기 때문에 연산하는 도중에 성능이 낮은 기기에서는 어플리케이션이 죽을 것이다.

하지만, 얕은 비교를 한다면 객체 내부의 깊이가 몇개든 상관없이 가장 외부의 값만 비교를 해서 변경되었는지 판단하고 변경 되었다면 변경된 객체 전체를 새로 상태값에 집어넣어 렌더링을 해주면 된다. 따라서 react에서는 불변 값을 지키며, 얕은 복사의 상태값만 렌더링 되도록 되어 있다.

<br/>

### Vue의 경우

(version 2.6 이하의 Vue입니다.)
Vue도 react와 마찬가지로 props와 상태값(data)을 변경하면 DOM을 새로 그려준다. 단, Vue는 일반 객체가 변경되어도 감지한다. Vue는 data로 관리되는 객체의 속성을 직접적으로 변경하는 것을 허용한다. 어떻게 그 문제를 해결했을까?

Vue는 일반 JavaScript 객체를 Vue 인스턴스에 `data` 옵션으로 전달하면 Vue는 모든 속성을 읽고 `Object.defineProperty()` 메서드를 사용해 getter/setter로 변환한다.

이 getter/setter에서 데이터의 변경이 일어났을 때 Vue에 알리는 기능을 수행한다.

```js
function defineReactive$$1 (
   (...)
) {
   Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
         (...)
         return value;
      },
      set: function reactiveSetter (newVal) {
         var value = getter ? getter.call(obj) : val;
         
         if (newVal === value || (newVal !== newVal && value !== value)) {
            return
         }

         (...)

         if (setter) {
            setter.call(obj, newVal);
         } else {
            val = newVal;
         }
         childOb = !shallow && observe(newVal); // observe 메서드 사용
         dep.notify();
      }
   });
}
```

Vue 내부에 있는 소스 코드다. Object.defineProperty로 getter/setter를 만들어주고, 중요한 것은 setter의 `observe()` 다. observe를 따라 끝까지 올라가다보면, `update` 라는 function을 만날 수 있다.

또, Vue 내부적으로 사용하는 `Vue.$set()` 메서드가 있다. 이는 상태값(data)에 선언되지 않았지만, 객체를 새로 생성해 반응형을 주입할 수 있는 메서드다. `$set()` 메서드를 따라가다 보면 위에서 사용된 `defineReactive$$1` function을 만날 수 있다.

Vue에서 '깊은 복사'를 사용하는 경우가 있다. 이는 컴포넌트에 주입된 props에 붙어있는 observer를 떼어내고 순수한 객체 그대로를 가공해야할 경우 사용한다. 또한 변경되기 전의 값을 가지고 비교를 해야할 때 깊은 복사를 사용해 변경 전 값을 가지고 있고, 앞으로 변경 가능성이 있는 객체는 그대로 두고 사용한다.



> 참고
>
> - https://www.valentinog.com/blog/react-object-is/
> 
> - https://beta.reactjs.org/learn/updating-objects-in-state
>
> - https://blog.bitsrc.io/understanding-referential-equality-in-react-a8fb3769be0
>
> - https://bingbingba.tistory.com/entry/%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%EC%97%90%EC%84%9C-Vue%EC%99%80-React%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90%EA%B3%BC-%EB%B6%88%EB%B3%80%EC%84%B1Difference-of-state-management-between-Vue-and-React
