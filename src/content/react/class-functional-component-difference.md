---
layout: post
title: 'React의 클래스형, 함수형 컴포넌트 차이'
author: [Pozafly]
tags: [React, JavaScript]
date: '2023-03-05'
image: ../img/react/class-functional.png
draft: false
excerpt: 
---

## react의 class, function 컴포넌트 차이

### Class 컴포넌트

Class 컴포넌트로 Counter를 만들어보자.

```jsx
import { Component } from 'react';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      count: 0,
    };
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <div>{count}</div>
        <button onClick={this.handleClick}>클릭해보세요!</button>
      </div>
    );
  }
}
```

- react 라이브러리에서 제공하는 Component를 import 받아와서 상속 관계를 맺어주었음.

  - 따라서, react에서 만든 Component라는 class의 프로터피와 메서드를 사용할 수 있다.

- constructor를 사용해 생성자 함수 구현.

  - JSX로 컴포넌트를 선언할 때, `React.createElement()` 함수로 컴포넌트를 가져오는데, 이때, new 키워드로 class 컴포넌트의 인스턴스를 생성하면서 매개변수에 props를 주입한다.

  - 따라서, 매개변수로 props를 받는다. super 키워드를 사용해, React.Component의 constructor에 props를 등록해준다.

    - ※ super(props)를 사용하는 이유. [super(props) 를 써야하는 이유](https://min9nim.github.io/2018/12/super-props/)

      - super는 class의 constructor에서 부모의 constructor 메서드를 실행시킨다.

      - 만약 생략하면 `constructor() {}` 가 자동으로 생성되며, 자식 클래스에서 생략하면 `constructor(...args) { super(...args) }` 가 암묵적으로 생성되기 때문에 생략도 가능하다.

      - 자식 클래스에서는, constructor에 인스턴스 프로퍼티를 사용하기 위해서 this를 사용해야 하는데, this를 사용하기 전 항상 `super` 키워드를 붙여 주도록 되어있다. ECMAScript에서 고정시켜두었음.

      - 여기서 `super(props)` 를 넘기는데 이는 React.Component에 그렇게 하도록 되어있기 때문이다.

        ```jsx
        // Inside React
        class Component {
          constructor(props) {
            this.props = props;
            // ...
          }
        }
        ```

        [코드](https://github.com/facebook/react/blob/1d25aa5787d4e19704c049c3cfa985d3b5190e0d/packages/react/src/ReactBaseClasses.js#L22)를 보자.

      - 그런데 super에 props를 넘겨주지 않아도 props를 render() 메서드 내부에서 사용할 수 있다.

        ```jsx
        // Inside React
          const instance = new YourComponent(props);
          instance.props = props;
        ```

        이렇게 props를 전달 받고, 또 instance.props에 props를 할당한다.

      - 이렇게 하는 이유는, ES6 클래스만 지원하기로 했던 것은 아니고 최대한 범용적으로 여러가지 클래스 형태를 지원하고자 했었음. ClojureScript, CoffeeScript, ES6, Fable, Scala.js, TypeScript 등에 사용했을 때 문제가 없도록 하기 위함임.

      - 그러면 `super(props)` 를 쓰지 말고 `super()` 만 쓰면 되는거 아닌가 할 수 있는데 아니다.

      - 생성자 내부에서 this.props를 부르면 undefined임. `console.log(this.props); // undefined`

      - 따라서 안전하게 사용하기 위해 props를 super에 넣어주도록 하자.

  - handleClick이라는 메서드에 bind를 사용해 this를 명시적으로 할당한다.

  - state를 만들어주었다. state는 constructor에 선언되어야 한다.

  - 이렇게 constructor에서 인스턴스 프로퍼티와, 인스턴스 메서드를 사용했다. 컴포넌트가 인스턴스화 되면 이 인스턴프 프로퍼티와 인스턴스 메서드를 사용할 수 있게 된다.

- handleClick이라는 프로토타입 메서드 선언

  - 프로토타입 메서드이기 때문에 인스턴스에서는 따로 메서드가 만들어지는게 아니라, 이 메서드를 참조할 것이다.

    - 단, constructor에서 this로 handleClick 메서드를 다시 할당했기 때문에(bind로 엮어주기 위해) 이도 마찬가지로 인스턴스가 생성될 때마다 새롭게 만들어질 것이다.

  - `this.setState`를 해주고 있다. this를 붙인 이유는, React.Component에 setState 메서드가 있을 것이다.

  - 여기서 this란, constructor에서 메서드에 bind를 해주었기 때문에 class(컴포넌트) 자체를 가리키고 있다.

    - ※ setState는 비동기적으로 업데이트 한다. 성능을 위해서.

  - 만약 bind 해주지 않았을 경우는?

    handleClick를 call 하면, this는 `undefind` 값이 나타난다. 그 이유는, IIFE로 메서드가 실행되고, 그렇기 때문에 this는 전역 객체를 바라보게 된다. 단, ‘strict mode’ 이기 때문에 window 대신 undefined로 나타나게 된다. (ES6의 class 내부는 암묵적으로 strict mode로 실행된다.)

    따라서, bind가 필요하고, 그렇게 하지 않고 싶을 경우는 render에 `() => this.handleClick()` 화살표 함수로 실행시키거나, class 메서드로 class의 몸체에 화살표 함수를 사용해 this를 상위의 this로 암묵적 바인딩 해주면 된다.

- render 메서드 선언

  - class 컴포넌트는 반드시 render 메서드가 존재해야 하고, 렌더링 하고 싶은 jsx를 return 하면 된다.
  - return 문 안에는 button에 onClick이 있고, 클릭 시 실행되는 handleClick이 `()` 실행문이 붙지 않은 상태로 함수 자체를 넘겨주고 있다.
  - render return에 들어가는 jsx는 `React.createElement()`  함수로 dom을 생성하는데, 이때 create 인자로 ‘값’만 들어갈 수 있다. 즉, ‘문’이 들어갈 수 없고 ‘식’ 만 들어갈 수 있다.
    - 문이란, 기본적인 프로그램 실행 단위이며(if, for…) 식이란 값으로 평가되는 문이다. 따라서 `&&` 와 삼항 연산자와 같은 평가된 값만 들어갈 수 있다. 조건부 렌더링에서 && 가 사용되는 이유다.

- 참고로 React 17 이후에는 Event를 Document에 붙이는 것이 아니라, 리액트 트리가 렌더되는 root DOM container에 붙이는 방식으로 변했다고 한다. [React Deep Dive— React Event System (1)](https://blog.mathpresso.com/react-deep-dive-react-event-system-1-759523d90341)

- class 형 컴포넌트는 lifeCycle 메서드가 따로 있어 React.Component에서 메서드를 타이밍에 맞게 실행시켜준다.

- 메모리 자원을 함수형 컴포넌트 보다 많이 사용함.

<br/>

### Fuctional Component

function 컴포넌트로 만들어보자.

```jsx
import { useState } from 'react';

export default function MyComponent(props) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClick}>클릭해보세요!</button>
    </div>
  );
}
```

- function의 인수로 props를 받는다
  - class 형태에서는 constructor로 받았지만 function에서는 함수의 인자로 들어옴.
  - 비구조화 할당을 해줄 수 있다. `({ some })`
- useState가 사용되었다.
  - useState는 Hook이다. 비구조화 할당으로 상태값, 상태값 업데이트 함수를 받는다.
- 화살표 함수로 handleClick 선언.
  - 함수 컴포넌트이므로 함수 컴포넌트 내부에서 this를 활용할 일은 많지 않다. 특히 props나 state, setState 함수를 this로 가져와야할 일이 없어 가볍게 화살표 함수로 선언되었다.
  - setCount 함수를 사용한다. count 상태 값을 업데이트 해준다.
    - 여기서 살펴봐야 할 것은, 함수 컴포넌트는 이 MyComponent라는 함수는 한번 실행되고 사라진다. 왜냐하면 ‘함수’ 이기 때문이다.
    - 하지만, 여기 선언된 handleClick이라는 함수는 버튼을 클릭할 때마다 동작한다.
    - 그리고 useState로 선언된 count, setCount도 마찬가지로 상태 값을 유지하고 사라지지 않고 있다.
    - 이는 ‘클로저’를 이용한 것이다. 내부 함수가 외부로 jsx에 의해 return 되었고 이곳의 실행 컨텍스트는 사라졌을 것이다.
    - 하지만 외부에서 이곳에 접근할 수 있기 때문에 자유 변수인 count, setCount, handleClick은(handleClick도 마찬가지로 일급함수로서 변수에 선언된 값이다) 여전히 살아있다.
    - 외부에서도 참조할 수 있기 때문에 참조되고 있는 이 변수들은 가비지 컬렉터가 수집하지 않은 것이다.
- return 문 안에는 jsx가 사용되었다.
  - onClick에는 여전히 `()` 실행하는 것이 아닌 선언되어 있는 함수 자체가 반환되었다. react 내부적으로 어디에선가 실행될 것이다.
  - 함수 내부에 값으로 선언된 함수이기 때문에 this를 붙여서 넘겨줄 필요가 없다.

------

<br/>

## 클래스, 인스턴스 프로토타입 프로퍼티(메서드) 정리

```js
class Verify {
  // 클래스 프로퍼티
  classProperty = 'class';
  // 클래스 메서드.  📌 계속 새로 생성된다.
  classMethod = () => {
    console.log('classMethod');
  };

  constructor() {
    // 인스턴스 프로퍼티
    this.instanceProperty = 'instance';
    // 인스턴스 메서드. 📌 계속 새로 생성된다.
    this.instanceMethod = function () {
      console.log('instanceMethod');
    };
  }

  // 프로토타입 메서드
  prototypeMethod() {
    console.log('prototypeMethod');
  }

  // 정적 프로퍼티
  static staticProperty = 'static';
  // 정적 메서드
  static staticMethod() {
    console.log('staticMethod');
  }
}

// 인스턴스 생성
const v1 = new Verify();
const v2 = new Verify();
console.log(v1.instanceMethod === v2.instanceMethod); // false 새로 생성됨.
console.log(v1.classMethod === v2.classMethod); // false 새로 생성됨.
console.log(v1.prototypeMethod === v2.prototypeMethod); // true 새로 생성 안됨.
```

<br/>

> 참고 될만한 링크
>
> <https://overreacted.io/ko/how-are-function-components-different-from-classes/>
