---
layout: post
title: 'Semantic Web에 대해 더 깊이 알아보기'
author: [Pozafly]
tags: [HTML, SEO, Semantic Web]
image: ../img/html/html.png
date: '2021-05-29T12:13:47.149Z'
draft: false
excerpt: Semantic Tag를 실제로 적용해보면서 고민했던 것과 팁을 함께 내용에 적어두었다. Semantic Tag에 대한 정의는 많지만 실제로 어떤 기준으로 적용해야할지 고민한다면 이 글이 도움이 될 수 있겠다.
---



인터뷰를 보다보면 SSR과 SPA에 대한 질문은 항상 나왔다. 프론트엔드에서 빠질 수 없는 기술 질문이라 다시 정리를 하다보니 SSR의 장점인 SEO에 대해 더 알아보게 되었다. 후에 다시 SEO에 대한 포스팅을 준비 하려고 한다.

SEO에 유리해지려면 그 중 하나의 전략으로 웹페이지를 Semantic하게 적용하는 방법이 있다. 오늘은 기존 페이지에서 Semantic Tag를 사용하면서 기준을 조금 더 명확하고 구체적으로 블로그에 정의해보려고 한다.

특히 Semantic Tag를 실제로 적용해보면서 고민했던 것과 팁을 함께 내용에 적어두었다. Semantic Tag에 대한 정의는 많지만 실제로 어떤 기준으로 적용해야할지 고민한다면 이 글이 도움이 될 수 있겠다. 단, 시멘틱 태그에 대한 적용 방법은 개발자마다 다르고 정답은 없다고 한다.

<br/>

<br/>

# Semantic Web?

Semantic은 사전적으로 '**의미의**' 라는 뜻을 가진 단어다.

`Semantic Web` 이란, **컨텐츠에 의미를 부여한 요소를 사용**하여 구축한 웹 사이트로, 웹 크롤러가 웹 사이트의 의미와 컨텐츠의 내용을 이해하도록 하여 **더 고품질의 정보를 수집하고 처리할 수 있도록 하는 것**에 도움을 준다.

> 📌 웹 크롤러(web crawler) : 조직적, 자동화된 방법으로 월드 와이드 웹을 탐색하는 컴퓨터 프로그램.

즉, 의미 없는 단순한 요소(Non-Semantic Element)로 구성된 웹 사이트와는 달리, Semantic Web은 **Semantic Element**로 작성되어 있기 때문에 검색 엔진의 웹 클롤러가 웹 사이트에 대한 정보를 비교적 정확히 수집, 분석할 수 있게 되어 최적의 검색 결과를 도출하는데 도움을 준다.

또한 시멘틱 웹은 시각 장애가 있는 유저가 사용하는 **Screen reader**에게 정보를 제공하는 것에도 사용될 수 있다.

> 📌 Screen reader : 컴퓨터 화면 내 문자를 음성으로 읽어주는 SW

<br/>

<br/>

## SEO(검색엔진 최적화)에 유리한 이유

시멘틱 웹의 장점은 SEO에 유리하다.

> 📌 SEO란?
>
> Search Engine Optimization. 검색 유저에게 양질의 컨텐츠와 경험을 제공하는 것으로, 포털 사이트 검색 엔진에 웹 사이트를 상위에 노출시키기 위해 기술적으로 웹 사이트를 최적화하는 대책을 말한다.

상위에 노출되는 조건은 유저가 검색한 검색 키워드, 웹 사이트의 컨텐츠가 연관성이 있다는 것을 웹 크롤러에게 인지시켜줄 필요가 있다.

이 때 Semantic Element(Tag)를 사용해 구축한 사이트는 컨텐츠를 인식할 수 있기 때문에 검색 키워드와 Semantic Web의 컨텐츠가 서로 부합하는지 검토할 수 있도록 한다.

웹 크롤러로부터 높은 평가를 받은 웹 사이트는 검색 순위의 상위권에 노출될 확률이 높아지게 된다.

<br/>

<br/>

## Semantic Web을 구성하는 Semantic Tag

### Semantic Tag란?

**특정한 의미**를 가지고 있는 HTML 요소. 예를 들면 페이지 상단의 로고나 검색 바, 네비게이션을 포함하는 정보를 담고 있는 `<header>` 태그가 대표적인 시멘틱 태그.

반면, **단순한** 구역을 나누는 `<div>` 태그가 대표적 **Non-Semantic Tag**다. div 태그는 단순 구역을 나누는 역할 그 자체만 수행하기 때문에 어떠한 용도로 사용되는지, 어떤 역할을 행하는지 정보를 제공하지 못한다.

<br/>

## 대표적인 Semantic Tag

![image](https://user-images.githubusercontent.com/59427983/120062107-5432a080-c09b-11eb-933e-45d4a22e929f.png)

- `<header>` : 웹 페이지 도입부. 주로 페이지 상단에 웹 사이트 로고와 네비게이션 링크를 감싸는 것에 사용.
- `<nav>` : 사이트 내 링크를 모아둔 네비게이션을 만드는 태그. 웹 사이트의 동선을 생성해준다. 또한 상위 페이지에서 하위 페이지로 유도하는 역할.
- `<main>` : 웹 사이트의 본문을 뜻함. 메인 컨텐츠를 크게 감싸주는 역할로, 한 HTML 내에서 1개만 존재해야 함.
- `<section>` : 페이지 내에서 각 영역의 제목을 나타내는 `header` 와 컨텐츠를 감싸줌. 각 컨텐츠의 영역을 구획하는 것에 주로 사용.
- `<article>` : 뉴스나 블로그 글과 같이 독립적으로 컨텐츠 그 자체가 될 수 있는 컨텐츠.
- `<aside>` : 사이드 메뉴 등 main 이외의 컨텐츠. 메인 컨텐츠가 아닌 부가 정보, 해설을 담고 있기도 함.
- `<footer>` : 웹 페이지의 가장 하단에 있다. 웹 사이트 하단에 회사 정보나 약관 정보, 사이트 맵, 소셜 미디어 링크 등의 컨텐츠를 표시하는 것에 사용.

------

## 사용 팁

### `<header>`

header 태그는 소개 컨텐츠 그룹을 나타낸다, 제목(\<h1>~\<h6>)을 감싸기 위한 요소지만, 필수 사항은 아니다([링크](https://developer.mozilla.org/ko/docs/Web/HTML/Element/header#%EC%82%AC%EC%9A%A9_%EC%9D%BC%EB%9E%8C)).  일반적으로 \<body> 상단에 표기되어 웹 사이트의 Title이나 네비게이션이 존재하는 영역에 사용된다. 하지만, \<article>, \<section> 내에서도 사용될 수 있다.

- \<body> 안에서 사용될 경우 : 웹 페이지 전체 헤더를 정의한다.
- \<article>, \<section> 안에서 사용될 경우 : 해당 영역에 대한 특정 헤더를 정의하는 경우 사용된다.([링크](https://developer.mozilla.org/ko/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure#html_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83_%EC%9A%94%EC%86%8C%EC%9D%98_%EC%84%B8%EB%B6%80_%EC%82%AC%ED%95%AD))

즉, article, section 안에서도 사용될 수 있는데 body에서 사용하는 것은 페이지의 전체 제목과 내용을 표시하고, article, section 안에서 사용할 때는 해당 태그 자체의 제목과 연관된다.

<br/>

### `<nav>`

홈 페이지의 메인 영역으로 연결하는 태그다. 대부분의 메뉴 버튼이나 링크, 탭으로 표현될 수 있다. \<body> 하위의 \<header> 에 위치하기도 하며, 링크 그룹을 모아둔 곳이다.

- \<header> 하위에 말고 동등한 위치에 두는 것이 SEO 측면으로 더 좋다.
- \<nav> 는 하나의 문서에서 여러 개의 \<nav> 를 가질 수 있다([링크](https://developer.mozilla.org/ko/docs/Web/HTML/Element/nav#%EC%82%AC%EC%9A%A9_%EC%9D%BC%EB%9E%8C)). 단, 모든 링크가 \<nav> 안에 있어야 하는 것은 아니다.
- 한 페이지 당 1개를 사용해 네비게이션 메뉴에만 제한해서 쓰기도 한다.([김버그님-유튜브](https://www.youtube.com/watch?v=jOzR83vixsE)(3분 7초))
- 내용을 쉽게 이해할 수 있도록 nav 요소 내부에는 비순차 목록(`<ul>`)을 사용하는 것이 좋다.
- 사이트 하단에 위치한 링크는 \<footer> 로 충분하다.

다른 분들의 블로그나 여러 페이지를 둘러본 결과, \<nav> 를 여러 개 사용한 곳도 있고 한 개만 사용한 곳도 있다. 심지어 네이버 메인 페이지는 \<nav> 자체가 없다. 스크린 리더 등에서 콘텐츠의 초기 렌더링을 제외할지 결정할 때 \<nav> 를 참고한다는 사실을 알고 취향껏 사용하면 될듯하다.

<br/>

### `<main>`

메인 컨텐츠 내용이 들어갈 태그다. 

- \<body> 에 포함되지만 섹션 요소가 아니며, 페이지 당 여러 개가 존재할 수 는 있지만 단 1개만 시각적으로 보여야 한다.(나머지 main은 hidden 속성 처리 해주어야 함.)
- 섹션 요소인 section, article, aside, nav 요소는 main 요소를 자식으로 포함할 수 없다.([링크](https://velog.io/@apricotsoul/HTML-section%EC%9A%94%EC%86%8C-main-%EC%9A%94%EC%86%8C))
- 타이틀은 \<header> 안 \<h1>~\<h6>로 하며, 본문 내용은 주로 \<p> 를 사용한다.

<br/>

### `<section>`, `<article>`

나는 처음에 section과 article의 정의를 읽고 잘 이해가지 않았다. 단순히 section은 어떤 한 의미 덩어리로 묶고, article은 말 그대로 기사 처럼 \<main> 안에서 동일한 구조를 갖는 어떤 컨텐츠(유튜브의 동영상 목록 처럼)를 묶는 단위라고 생각했다.

하지만, [\<section> 버리고 HTML5 \<article> 써야 하는 이유](https://webactually.com/2020/03/03/%3Csection%3E%EC%9D%84-%EB%B2%84%EB%A6%AC%EA%B3%A0-HTML5-%3Carticle%3E%EC%9D%84-%EC%8D%A8%EC%95%BC-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0/)를 읽고, 내가 생각하는 article에 대한 정의가 조금 오류가 있다는 것을 알게 되었다. (시간이 된다면 위 링크는 한번 쯤 읽어볼 만한 가치가 있다고 생각한다.) 요약을 해보자면,

- \<article> 을 기사로 여기지 말고 **옷 한벌**이라고 생각하자. 즉, 동일한 구조를 갖는 컨텐츠만 article로 묶는 게 아니다. 옷은 상황에 맞춰 다른 옷들과 함께 다양하게 입을 수 있다. (독립적인 콘텐츠가 될 수 있다)
  - 특히 \<header> 요소를 \<article> 안에 포함하면 읽기 모드(watch OS 등의)에서 함께 표시된다.
- \<section> 은 웹 브라우저가 HTML5 **문서의 목차를 정할 수 있도록**, 각각의 제목과 그에 따른 내용을 담기 위한 보편적인 용도의 컨테이너로 만들어졌다.
  - 하지만, HTML5에는 이 목차 인식 기능을 구현해놓은 웹 브라우저는 전혀 없다. 따라서, section 대신 article로 대체가 모두 가능하다.
  - 굳이 section을 써야 한다면, 간단 요약 같은 한 부분(section) 을 스크린 리더가 건너뛸 수 있도록 도와주는 역할을 해줄 수 있다.

따라서, 취향에 따라 개발자가 생각하는 의미대로 section을 사용할 수 있고, 대부분의 section은 article로 대체될 수 있는데, 반드시 article은 비슷한 틀을 가지고 묶을 필요는 없다는 것이다.

또한, 

- \<article> 내부에 \<section> 태그를 포함할 수 있고, 반대로 \<section> 내부에 \<article>를 포함할 수 있다.
- \<article> 은 웹 접근성을 위해 \<header>로 감싼, 제목(h1~h6 요소)을 포함시켜 요소를 식별하게 하자. 마찬가지로 본문 내용은 \<p> 를 사용하자. 만약 섹션 제목을 감춰야 하는 상황이라면 hidden 속성을 사용하면 된다.([링크](https://velog.io/@apricotsoul/HTML-section%EC%9A%94%EC%86%8C-main-%EC%9A%94%EC%86%8C))

<br/>

### `<aside>`

aside는 문서의 주요 내용과 간접적으로만 연관된 부분을 나타낸다. 용어집 항목, 저자 약력, 관련 링크 등. \<aside> 는 \<main> 이나, \<article>과 독립적인 별개의 요소로 생각했지만 아니었다.

```html
<article>
  <p>
    디즈니 만화영화 <em>인어 공주</em>는
    1989년 처음 개봉했습니다.
  </p>
  <aside>
    인어 공주는 첫 개봉 당시 8700만불의 흥행을 기록했습니다.
  </aside>
  <p>
    영화에 대한 정보...
  </p>
</article>
```

이런 식으로 \<article> 하위에도 포함될 수 있다.

<br/>

<br/>

## HTML에서 이미지를 표시하는 방법

대표적으로 2가지가 있다.

1. Semantic Tag인 `<img>` 태그 사용

2. `<div>` 태그 등에 CSS의 background-image 속성 사용

<br/>



### Semantic Tag인 `<img>` 태그 사용

img 태그는 해당 페이지의 **메인 컨텐츠인 이미지를 표현**할 때 사용한다. 해당 페이지에서 정보를 표현하는 것에 있어 없어서는 안될 이미지를 출력할 때 사용한다.

예를 들면 상품 사진, 썸네일 등. (상품을 판매하는 쇼핑몰인데 상품 사진이 없어서는 안된다. 이렇게 이미지 그 자체가 정보를 표현하는데 중요한 역할을 할 때 img 태그를 사용)

```html
<img src="apple.png" alt="사과" />
```

- src : 표시할 이미지 경로
- alt : 이미지가 특정 이유로 출력되지 않을 때 이미지 대신 표시될, 이미지를 부가적으로 설명해 줄 텍스트 정보

img 태그는 `alt` 속성을 가질 수 있기 때문에 시멘틱 태그의 성격을 가진다.

하지만 img 태그는 CSS인 background-image보다 웹 페이지를 렌더링할 때 부하가 크기(무겁기) 때문에 주로 웹 사이트의 큰 배경 이미지를 표현해야할 때는 CSS인 background-image를 사용한다. (이미지 용량이 크면 클 수록 더더욱 무거워진다.)

<br/>

### `<div>` 태그 등에 CSS의 background-image 속성 사용

background-image는 HTML이 아닌, CSS 속성 그 자체이기 때문에 SEO 적으로 활용될 수 없다. 주로 컨텐트 외적인 **웹 페이지의 디자인적 요소를 표현할 때 사용**된다.

예를 들면 배경, 아이콘처럼 해당 컨텐츠가 존재하지 않아도 페이지의 정보를 표현하는 것에 지장을 주지 않는 정보.

```css
.bg {
  background-image: url("apple.png")
}
```

CSS로 이미지를 구현할 때는 위의 코드처럼 background-image라는 속성을 사용하는데 CSS이기 때문에 background-image 뿐 아니라 다양한 속성을 추가해 이미지를 더욱 풍부하게 표현할 수 있다.

```css
.bg {
  background-image: url("apple.png");
  background-repeat: repeat;
}
```

위와 같이 배경 이미지를 일정하게 반복시켜 도트 무늬나 스트라이프 무늬를 가진 배경을 표현할 수도 있음.

> CSS의 background-image를 사용하기 적합한 상황
>
> 1. 웹 페이지의 메인 컨텐츠가 아닌 장식적인, 디자인적인 목적으로 이미지를 표시해야할 때 사용
> 2. 아이콘 배경 등을 표현할 때
> 3. `transition`, `filter`, `background-repeat` 등 CSS로 이미지를 다양하게 편집할 필요가 있을 때

<br/>

<br/>

## 적용

[Tripllo semantic-apply 브랜치](https://github.com/pozafly/tripllo_vue/commits/semantic-apply) 20201/5/29일자 commit 내역을 보면 Semantic-Web을 적용한 내용을 보실 수 있습니다.
