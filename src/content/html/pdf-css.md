---
layout: post
title: 'PDF 페이지 CSS로 안전하게 작성하기'
author: [Pozafly]
tags: [CSS, HTML, PDF]
image: ../img/html/pdf-css.webp
date: '2022-04-02T12:13:47.149Z'
draft: false
excerpt: 웹을 개발하다 보면, PDF로 문서를 사용자에게 제공하는 기능을 구현해야 할 때가 있다. 다른 개발자분들이 헤매지 않을 수 있도록 정리해보았다.
---


# PDF 페이지 CSS로 안전하게 작성하기



웹을 개발하다 보면, PDF로 문서를 사용자에게 제공하는 기능을 구현해야 할 때가 있다. 코드를 작성하고 인쇄용 화면을 보고, 전부 다 뒤집어엎고 또 코드를 재작성하면서 나름 삽질을 했다. 모던 웹 기술이 많은 발전을 이루었지만, 인쇄용 기술은 비교적 덜 중요하다고 여겨지는지, 아직 구현되지 않은 부분이 있는 것 같다. CSS 속성이 먹히지 않는 경우도 많을뿐더러, 트릭과 같은 편법을 사용해야 하는 경우가 있을 수 있다. 다른 개발자분들이 헤매지 않을 수 있도록 정리해보았다.

아랫글은 특히 정적인 페이지(항상 동일한 페이지)를 보여주는 게 아니라, 동적인 페이지(Data에 따라 다른 페이지)를 보여주어야 한다면 아래의 내용이 꽤 도움 될 것이다. Chrome 99 버전 기준으로 작성되었다.

<br/>

<br/>

## 인쇄용 화면 확인

먼저, PDF로 변환해야 하는 html 파일이 어떻게 인쇄용 파일로 보이는지 확인해보자. 크롬 브라우저 기준으로 **파일** > **인쇄**를 클릭하거나 단축키를 사용해 인쇄 창을 열 수 있는데,

- Windows : **Ctrl + p**
- Mac: **⌘ + p**

위와 같은 단축키로 인쇄 미리보기 창을 열 수 있다. 인쇄 창에서 미리보기 형태로 다운로드될 PDF를 확인할 수 있다.

<br/>

<br/>

## 레이아웃 잡기

### @Page

인쇄물의 전체 페이지의 속성을 지정할 수 있다.

```css
@page { }
@page :first { }
```

`@page` 내에서 사용할 수 있는 속성은 **size**, **margin**, **orphan**, **widow**(앞단에서 넘어온 짤막한 행) 및 **page break** 속성만 가능하다. `:first` 수도 코드는 첫 페이지에만 적용되는데 웬만하면 사용하지 말길 바란다. 페이지가 여러 장 될 경우 다른 페이지의 margin 속성이 뒤틀릴 가능성이 있다.

@page에서 설정할 것은 일반적으로 size, margin이다.

#### size

size 속성의 경우 페이지 전체 사이즈를 지정할 수 있다. px, cm, mm in 등의 단위를 사용할 수 있다.

```css
size: auto;
size: portrait; /* 가로 모드 */
size: landscape;  /* 가로 모드 */

size: 6in;  /* 1개 값만 적으면 너비, 높이 모두 해당 값 */
size: 4in 6in;  /* 너비: 4in, 높이 6in */

/* 표준 사이즈 */
size: A4;
size: B5;
size: JIS-B4;
size: letter;

/* 표준 사이즈, 모드 변경 */
size: A4 portrait;
```

size를 명시해주지 않으면 auto로, 기본 여백이 적용된다. 주로 A4를 사용할 텐데 A4로 지정하는 것이 좋다.

#### margin

마진은 인쇄 페이지의 여백을 지정할 수 있다. 아래의 사진은 `margin: 0`, `margin: 40px` 이 적용된 사진이다. 

- **margin: 0**

<img width="564" alt="스크린샷 2022-04-02 오후 1 46 13" src="https://user-images.githubusercontent.com/59427983/161382932-9ca82e71-4b37-4d2f-8b94-84a5e3e5ef0e.png">

- **margin: 40**

<img width="566" alt="스크린샷 2022-04-02 오후 1 46 37" src="https://user-images.githubusercontent.com/59427983/161383055-273ce170-eb83-449c-a36d-fee017feaa19.png">



margin을 0을 주었을 경우 머리글과 바닥글이 삭제되었고, 40px 정도 주었을 경우는 자연스럽게 여백이 보이지만 머리글과 바닥글이 보인다.

하지만,  머리글 바닥글은 보여지지 않고, 여백이 필요하다면, html을 잡는 container 요소(예: body)에 아래와 같이 작성해주면 된다.

```css
body {
  width: 714px;  // size A4 일 경우 양 옆 마진을 주기 위해 width를 고정시킴
  margin: 0 auto;
  padding: 50px;
}
```

width와 margin auto 속성 때문에 좌우, 윗부분은 머리글과 바닥글은 없지만, 여백이 잘 적용되었다. 하지만 첫 페이지와 두 번째 페이지의 사이를 보자.

<img width="564" alt="스크린샷 2022-04-02 오후 9 26 55" src="https://user-images.githubusercontent.com/59427983/161383359-9ffe231f-9ded-41b7-b56e-1d846d4bc5ae.png">

첫 페이지의 하단과 두 번째 페이지의 상단의 padding 값이 제대로 들어가지 않았다. 그렇다고 `margin: 100px auto` 와 같이 margin을 준다고 해서 해결되지 않는다. 오히려 첫 페이지의 상단 여백이 더 많아질 뿐이다.

그렇다면 어떻게 해결해야 할까? 여기서 \<table>을 사용하면 된다. 전체 요소를 table 태그로 감싸고, \<thead>, \<tfoot> 요소를 선언, thead와 tfoot의 사이에 \<tbody> 를 두어 안에다가 화면에 보일 요소를 넣어주면 된다. 

```html
<table>
  <thead style="color: red">
    <tr>
      <td>thead</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <h1>PDF 인쇄 샘플</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, nisi maiores. Accusantium error ...
        </p>
        <img src="..." />
        ...
      </td>
    </tr>
  </tbody>
  <tfoot style="color: red">
    <tr>
      <td>tfoot</td>
    </tr>
  </tfoot>
</table>
```

그러면 아래 사진과 같이, 모든 페이지에서 thead, tfoot이 머리글과 바닥글 형태로 나오게 된다.

<img width="565" alt="image" src="https://user-images.githubusercontent.com/59427983/161383906-2542fe9f-e399-44b1-b3eb-31773b279667.png">

그리고 안에 문구를 \&nbsp; 로 바꾸고 border를 주면 얼마만큼 영역을 차지하는지 확인하면서 작업할 수 있다. 아래 코드를 보자.

```html
// html
...
<thead>
  <tr>
    <td>&nbsp;</td>
  </tr>
</thead>
<tbody>...여기에 본 내용이 들어갑니다.</tbody>
<tfoot>
  <tr>
    <td>&nbsp;</td>
  </tr>
</tfoot>
...

// css
thead td {
  border-bottom: 40px solid green;
}
tfoot td {
  border-top: 40px solid green;
}
```

<img width="564" alt="image" src="https://user-images.githubusercontent.com/59427983/161384551-7de9d425-4fa8-4b83-823b-057a86c80a57.png">

\&nbsp; 대신 문구를 넣어서 직접 내가 커스텀 한 머리글과 바닥글을 만들어 줄 수도 있다. 확인 후 border 색상을 white로 바꾸면 여백을 확보할 수 있다. margin, padding 속성은 제대로 적용되지 않는다.

여기까지가 인쇄 페이지의 전체 레이아웃을 잡는 방법이다. 위와 같은 방법으로 layout을 작성하면 `@page` 에 margin을 주었을 경우 내용이 잘리는 현상을 웬만하면 다 피할 수 있다. 특히 이유없이 사진이 잘리거나, 이쁘게 작업해둔 css가 잘려서 표현되지 않는 경우를 보고 눈물을 흘리며 삽질을 하지 않아도 된다.

<br/>

<br/>

## @media print 작성

인쇄 페이지를 위한 미디어 쿼리. 인쇄 페이지에서만 적용된다. 기존에 이미 작성되었던 페이지를 인쇄용으로 적용할 때 주로 사용한다.

```css
@media print { }
```

주의점은 배경(background)은 상황에 따라 출력되지 않는다. 따라서 PDF 설계 전 미리 흰색 배경화면을 사용하도록 설계 후 진행해야 한다. `color-adjust: exact !important` 와 같은 속성이 있긴 하지만 크롬 브라우저에서는 2022년 4월 현재 제대로 작동하지 않는다.

>  단, 전체 페이지 외 표현되는 영역 즉, 마지막 페이지의 content가 있는 곳까지 배경색을 임의로 집어넣을 수 있다. box-shadow의 inset을 이용해 콘텐츠 내부에 shadow를 주는 것이다.
>
>  ```css
>  body {
>  	box-shadow: inset 0 0 0 1000px gold;
>  }
>  ```
>
>  <img width="440" alt="image" src="https://user-images.githubusercontent.com/59427983/161383605-45819870-4b7d-412e-a6ad-4606ef2914b6.png">
>
>  마지막 페이지를 **제외한** 페이지는 정상적으로 배경 색상이 들어갔지만, 마지막 페이지를 보면 이렇게 배경색상이 잘리는 것을 볼 수 있다.
>
>  마지막 페이지의 끝부분까지 적용되지 않으므로 마음 편하게 배경 색상은 white로 고정하도록 하자.

`@media print` 속성은 주로 인쇄 화면에서 불필요한 네비게이션 등의 요소를 가리거나, `display: flex, grid` 와 같은 모던 css 요소가 제대로 작동하지 않을 경우 사용한다.

단, 요소를 가릴 때, `display: none` 으로만 해결이 안되고 element가 보일 경우도 있는데, 그럴 경우는 `visibility: hidden`, `opacity: 0` 을 함께 사용해주면 된다.

<br/>

<br/>

## 페이지 넘김 및 요소가 잘리는 부분에 대해

<img width="478" alt="image" src="https://user-images.githubusercontent.com/59427983/161386982-470d2da7-9865-409a-bde6-0b75f5eccfcb.png">

작업을 하다 보면, 위와 같이 사진 혹은 다른 element가 잘리거나 겹치는 현상이 때때로 일어난다. 밑의 2가지 상황을 보고 적절하게 대응할 수 있다.

### page-break

page-break는 꽤 중요한 속성이다. **page-break-before**, **page-break-after**, **page-break-inside** 속성이 있으며 각각 엘리먼트 전, 후, 내부요소 기준으로 페이지를 넘길지, 고정시킬지 지정할 수 있다.

강제로 다음 페이지로 요소를 넘기고 싶다면 아래와 같이 **always** 를 사용하면 된다.

```css
.some-element {
  page-break-before: always;
}
// some-element 엘리먼트의 직전에 페이지를 넘김
```

page-break-after를 사용하면 해당 엘리먼트 뒤에 페이지를 넘긴다. 중요한 것은 **page-break-inside** 속성이다. 해당 엘리먼트의 내부 페이지 넘김을 지정한다. 즉, 해당 엘리먼트가 애매하게 페이지 사이에 걸리면 넘길 수 있도록 할 수 있다.

```css
.some-element {
  page-break-inside: avoid;  // 해당 엘리먼트의 내부에서 페이지 넘김을 금지
}
```

엘리먼트 **내부**에서 페이지 넘김을 금지 하는 것으로, 바꿔 말하면 요소(some-element)가 페이지 사이에 걸리면 뒤로 넘겨버린다는 뜻이다. 반드시 잘리지 않아야 할 요소에 위와 같이 작성해주자. 그리고, page-break는 break-... 속성으로 대체 되었으므로 아래와 같이 모두 작성해주자.

```css
.some-element {
  break-inside: avoid;
  page-break-inside: avoid;
}
```

위에서 설명한 바와 같이 \<table> 을 통해 전체 레이아웃을 잡았다면 요소가 잘리는 부분이 웬만하면 모두 해결되었으므로 section 단위로 잘라야 하는 경우가 아니라면 위의 속성을 사용하지 않고도 크게 무리 없이 페이지를 구성할 수 있을 것이다.

### display: inline-block

`display: inline-block` 속성은 인쇄용 페이지에서 조금 특이하게 작동한다. page-break 속성과 비슷하게 inline-block 이 선언된 요소는 페이지 끝에 걸리면 다음 페이지로 넘어가는 성질이 있다. `width: 100%` 와 함께 사용하면 손쉽게 다음 요소를 다음으로 넘길 수 있다.

```css
.some-element {
  display: inline-block;
  width: 100%;
}
```

주의점은 해당 엘리먼트의 조상들이 `display: inline-block` 속성을 가지고 있으면 안 된다는 것이다. 이미 inline-block을 사용해서 스타일을 입힌 경우에는 조상 엘리먼트 전체가 페이지에 애매하게 걸리게 되면 다음 페이지로 떨어지기 때문에 삽질할 가능성이 높다(형제 요소는 괜찮음). 당연한 이야기이겠지만 원치 않는 요소가 이상하게 다음 페이지로 넘어간다면, **부모 요소**에 inline-block 속성을 사용한 것이 있는지 확인해야 한다.

<br/>

<br/>

## link는 PDF에서도 동작한다

\<a> 즉, link는 다운받은 pdf에서 클릭하면 웹 브라우저로 연결이 된다. 즉, PDF 문서는 문서 자체의 기능뿐 아니라 외부와 연결 짓기 때문에 주의해서 작성해주어야 한다.

만약 link의 href 속성이 잘못되어 있다면 잘못된 곳으로 웹 페이지가 이동할 것이다. 

또한 link의 width가 100% 라면, PDF에서 마우스가 빈 공간의 해당 라인에 걸치게 되면 클릭을 유도하는 모양으로 변할 것이다. 이를 방지하기 위해 표현된 만큼의 width를 가지도록 하자.

또한 link를 표현하는 텍스트가 매우 길 경우가 문제가 될 수 있다. 한글이 포함된 URL 같은 경우 퍼센트 인코딩(percent-encoding)으로 인해 한글 대신 %로 시작되는 것을 본 적이 있을 것이다. 이럴 경우 PDF의 layout 전체가 틀어지는 불상사가 발생한다.

<img width="614" alt="image" src="https://user-images.githubusercontent.com/59427983/161387535-25ad3bc9-e3f6-4605-a8e5-2b5712f8e496.png">

이렇게 화면 전체 layout이 틀어져버렸다.

```css
a {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 500px;
}
```

위와 같이 최대 너비를 지정해주고, text-overflow로 (...) 말 줄임 표시를 해주면 안전하게 link를 표현할 수 있을 것이다.

<br/>

<br/>

PDF 파일을 생성해내기 위해 HTML, CSS를 이용해서 문서를 만드는 것이 첫 번째다. 그중 CSS를 통해 마주한 문제들에 대해서 다루었다. 후에, 생성된 문서를 어떻게 사용자에게 제공해 줄 것인가는 프론트 단에서 할 수도, 백엔드 단에서 할 수도 있다.

프론트에서 바로 제공하는 방법은, [html2canvas](https://github.com/niklasvh/html2canvas)와 [jsPDF](https://github.com/MrRio/jsPDF) 라이브러리를 통해 즉시 제공할 수 있을 것이고, 백엔드에서 PDF 파일을 만들어 프론트로 넘기는 방법도 있을 것이다.

PHP 같은 경우는 [browsershot](https://github.com/spatie/browsershot) 라이브러리가 있다(헤드리스 브라우저 사용). 사용자 디바이스의 리소스를 잡아먹지 않고, 좀 더 보안에 신경 쓸 수 있는 좋은 방법인 것 같다. 단, 서버에서 blob 객체를 받기 때문에 PDF에 들어갈 사진 파일이 용량을 많이 먹는 경우, 서버 비용 증가와 더불어 사용자가 기다리는 시간이 꽤 걸릴 수 있다는 단점이 생긴다.

사용자에게 어떻게 PDF 파일을 제공할 것인가는 가볍게 [RisingStack](https://blog.risingstack.com/pdf-from-html-node-js-puppeteer/)의 글을 읽어봐도 좋을 것 같다.
