---
layout: post
title: '왜 내 z-index는 먹히지 않는가?'
author: [Pozafly]
tags:
	- CSS
date: '2023-02-11'
image: ../img/css/stacking-context/main.png
draft: false
excerpt: z-index가 때로 적용이 되지 않는 문제를 해결하기 위해 stacking context에 대해 정확히 알아본다.
---

## 요약

- z-index는 겹치는 요소의 쌓임 순서를 제어한다
- z-index는 position이 static이 아닌 값을 가진 요소에만 영향을 준다
- stacking context는 z-index에 영향을 주는 그룹이다
- stacking context가 생성된 요소의 자식부터 영향을 준다
- 다른 stacking context에 속한 요소는 서로 z-index의 영향을 받지 않고 stacking context가 생성된 부모의 z-index를 기준으로 평가된다

마크업 작업을 하다 보면 다들 이런 경험이 있을 것이다. HTML, CSS로 꽤나 마음에 드는 화면을 그렸다. DOM의 구조도 잘 잡혔고 스타일도 공을 들여 마무리 하고 있다. 이제 한 요소를 위에 띄우는 상황 만이 남았다. 아마 z-index를 이용해서 z-index를 먹이지 않은 요소 위에 띄워주기만 하면 될 것 같다..! 하지만 z-index가 적용이 안되는 것 같다. 아무리 z-index 값을 높게 주거나, 아래로 깔고 싶은 요소에 z-index를 마이너스로 주어도 적용이 되지 않는다. 왜 css는 해도 자꾸만 새로워 보이는게 나오는걸까!

이유는 바로 stacking context에 있다. 먼저 기본적인 z-index부터 알아보자.

## z-index란?

z-index는 HTML이 화면에 그려질 때 어떤 요소가 위에 올라가는지를 설정하는 속성이다. z-index의 값이 높을 수록 위에 올라가며 z축 기준으로 순서를 가진다.

z-index는 양수, 음수, auto 값을 가질 수 있으며 따로 지정하지 않으면 auto댜. auto는 z-index를 부모 요소와 동일하게 설정한다. 음수 값을 설정하면, 아래로 깔리게 된다.

**반드시** `position` 속성이 static(기본값)이 아닌 것으로 설정 되어 있어야 한다. z-index의 숫자가 높을 수록 상위에 올라온다.

<iframe height="400" style="width: 100%;" scrolling="no" title="z-index" src="https://codepen.io/pozafly/embed/poZMzGo?default-tab=css%2Cresult&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pozafly/pen/poZMzGo">
  z-index</a> by pozafly (<a href="https://codepen.io/pozafly">@pozafly</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

HTML 상으로 red는 green 보다 먼저 선언 되었고, 원래 대로라면 green의 뒤에 깔려야 하는게 정상이다. 하지만 z-index값을 1로 주었기 때문에 z-index가 적용되지 않은 green의 위로 올라와 있다.

> ※ z-index는 반드시 같은 html 계층에 있지 않아도 된다.
> 
> 소스를 보면, HTML 계층 구조와 상관이 없다. 가장 최상위 div 밑에 형제로 div 태그가 있고, 각기 그 아래 div에 z-index가 있어서 반드시 한 묶음의 계층에서 z-index가 적용되는 것은 아니다.

그러면 z-index가 없을 경우는 요소가 어떤 기준으로 쌓일까? 다음 순서로 아래에서 부터 위로 쌓인다.

1. root 요소(최상위 요소 - `<html>`)
2. 자식 요소는 HTML에서 등장하는 순서대로
3. position이 지정된 자식 요소들은 HTML에서 등장하는 순서대로

※ HTML 상에 먼저 선언 되었더라도 position이 지정되지 않은 요소는 position 속성이 있는 엘리먼트보다 아래에 깔린다. 단, blue 처럼 z-index가 음수일 경우는 음수가 아래에 깔린다.

z-index가 없을 경우와 z-index가 존재할 경우의 순서를 다시 정리해보면 아래와 같다.

1. root 요소(최상위 요소 - `<html>`)
2. z-index 음의 값
3. block level 요소
4. float 속성이 지정된 요소
5. inline level 요소
6. z-index 0 값
7. z-index 양수 값

<br/>

## stacking context란?

stacking context를 번역하면 '쌓임 맥락'이라는 뜻이다. [The stacking context - mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)에 따르면, stacking context는 뷰포트 또는 웹페이지를 향하고 있다고 가정되는 사용자에 대해 가상의 z축을 따라 HTML 요소를 3차원으로 개념화한 것이다. HTML 요소는 요소 속성에 따라 우선순위에 따라 이 공간을 차지한다라고 되어있다.

쉽게 말해서 z-index가 적용되는 그룹이 생성된다고 생각하자. 이 그룹이 여러 개 생성되면 서로 다른 그룹끼리 z-index가 적용되지 않는다. stacking context는 다른 stacking context에 포함될 수 있으며, 각 stacking context는 형제 요소와는 완전히 독립적인 요소다. stacking이 처리될 경우 stacking context가 생성된 요소의 **하위 요소만** stacking context(그룹)으로 취급되는 것이다.

[medium의 예제](https://dongmin-jang.medium.com/css-stacking-context-172f9bd1af8b)

<iframe height="300" style="width: 100%;" scrolling="no" title="stacking-context-exam" src="https://codepen.io/pozafly/embed/dyjxRve?default-tab=css%2Cresult&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pozafly/pen/dyjxRve">
  stacking-context-exam</a> by pozafly (<a href="https://codepen.io/pozafly">@pozafly</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

3개의 div 안에 각각 span이 있고, red는 html상으로 가장 먼저 선언되었다. 그리고 red만 z-index가 1이다. 그러면 아래의 조건을 지키면서 red를 가장 뒤로 보내는 방법은 뭘까?

- HTML markup 변경 금지
- z-index 추가하거나 변경 금지
- position 속성을 추가하거나 변경 금지

답은 red를 감싸는 div에 opacity를 1보다 작은 값(ex. 0.99)로 적용하면 된다.

이유가 뭘까? 바로 red를 감싸고 있는 div에 stacking context가 생성되었기 때문이다. span을 감싸고 있는 각 div들은 서로 형제 요소이다. 그리고 position이 설정 되어 있지 않았고, z-index가 적용되어 있지 않았기 때문에 서로는 순서대로 나타나며 HTML상 가장 하단에 있는 blue를 감싸고 있는 div(3번째)가 가장 높이 올라와 보일 것이다.

즉, 다시 말하면 3개의 div 모두 stacking context가 root 요소인 `<html>` 이다. 그렇다면 span도 전부 root 요소의 stacking context 그룹에 속해있을 것이다. 그렇다면, red, green, blue(span 요소들) 모두 여전히 root 요소의 stacking context 안에 속해있다. 그렇기 때문에 계층과 상관 없이 z-index가 적용이 된 것이다.

여기서 red의 div에 `opacity: 0.99`를 주었을 경우 red의 div에 새로운 stacking context가 생성되었다. 기존 root의 stacking context에 자식 요소 하나가 새로운 stacking context 그룹을 생성했다.

red는 이제 root의 stacking context의 영향을 벗어나 red를 감싸는 div의 stacking context에 영향을 받을 것이다. 새롭게 만들어진 stacking context는 그 안에 있는 요소끼리의 z-index가 적용될 것이다.

[CSS의 스태킹 자세히 살펴보기](https://timkadlec.com/2008/01/detailed-look-at-stacking-in-css/)에 보면 더 쉬운 설명이 있다.

z-index 값을 0 또는 auto로 설정하면 새로운 stacking context를 설정한다. #front 요소에 z-index를 5로 설정했다고 해보자. #front 하위 요소들은 새로운 stacking context의 영향권에 있다. #middle이 #front의 자식 요소이고, z-index를 2로 설정한다면 여전히 #front 위에 표시 된다. 이유는 z-index 값과 상관없이 #front 하위의 영향권(stacking context)에 있기 때문.

```js
#front 5.0
#front 5.2
```

5.0, 5.2와 같이 표기를 해보면 헷갈리지 않게 어떤 요소가 깔리고 쌓이는지 판단할 수 있다. 이제 브라우저에서 어떤 경우에 stacking context를 생성하는지 알아보자.

<br/>

## stacking context 생성 조건

아래는 css를 사용하면서 stacking context가 생성되는 조건인데, 특히 많이 사용될 것 같은 속성만 나열했다. 추가적으로 많은 값은 [mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)을 확인하도록 하자.

- opacity 속성을 1보다 작은 값으로 설정
- position 속성이 fixed 또는 sticky로 설정(이 경우에 z-index가 따로 필요하지 않음)
- position 속성이 relative 또는 absolute 이면서, z-index 값이 auto가 아닐 때
- 값이 none이 아닌 아래의 css 요소
  - transform
  - filter
  - backdrop-filter
  - mask, mask-image, mask-border
- z-index 속성이 auto가 아니면서 flex 박스 하위 요소
- z-index 속성이 auto가 아니면서 grid 박스 하위 요소
- mix-blend-mode 속성이 normal이 아닌 경우

그리고 `isolation: isolation;` 속성을 사용하면 z-index를 사용하지 않아도 명시적으로 stacking context를 생성할 수 있다.

z-index가 잘 먹히지 않을 경우는 비교 대상이 같은 stacking context 안에 있지 않은지 확인하고, stacking context를 재설정 하거나 DOM 구조를 변경해야 할 것이다. 하지만, 가장 좋은 방법은 stacking context 존재를 알고, 미리 DOM 구조 설계부터 탄탄하게 만들고나서 구현하는 것이 가장 좋은 방법이겠다.

<br/>

> 참고
>
> - <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Adding_z-index>
> - <https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_without_z-index>
> - <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context>
> - <https://dongmin-jang.medium.com/css-stacking-context-172f9bd1af8b>
> - <https://webdesign.tutsplus.com/articles/what-you-may-not-know-about-the-z-index-property--webdesign-16892>
> - <https://timkadlec.com/2008/01/detailed-look-at-stacking-in-css/>
