---
layout: post
title: 'Github Blog에 카카오톡 공유버튼 만들기'
author: [Pozafly]
tags:
  - Blog
image: ../img/blog/kakaoShare.png
date: '2020-05-22T09:03:47.149Z'
draft: false
excerpt: Jekyll로 만든 Github 블로그에 카톡 공유버튼을 만들어보자!
---

---

> 개발 공부를 하다 공부한 것을 OneNote에 기록해두었는데, 항상 구글링 할때마다 개발자들이 github.io 로 된 블로그에서 도움을 많이 얻어 나도 언젠간 공부한 것들을 내 github 블로그에 포스팅 해야지 싶어서 github 블로그에 손을 댔다.
>
> 하루 이틀이면 끝날 줄 알았던 github 블로그를 만들기 시작한지 어느덧 2주가 흘렀고, 포스팅 보다 블로그를 꾸미는데 재미가 들려서 아직도 이것저것 손대보고 있다. 주객전도가 된 셈.😑(아직 손댈게 너무 많이 남아있다. 다른 실제적인 공부는 언제...)
>
> 왜 개발자들이 이렇게 설치형 블로그를 즐겨하는지 알 것 같은게 이게 web개발을 조금만 알고 있으면 응용해서 내 입맛대로 꾸밀 수 있다는게 굉장히 즐겁다.🤪

어쨌든, github 블로그의 기반이 되는게 rudy언어 기반의 `jekyll` 이다. 나는, jekyll 중에서도 사람들이 가장 많이 쓴다는 minimal-minskates 테마 기반의 블로그를 만들고 있다.

<br/>

![1](https://user-images.githubusercontent.com/59427983/82632006-fa023280-9c31-11ea-8b25-41839cb9a52e.png)

내 블로그에서 포스팅을 보면 여기 밑에 공유버튼 중 혼자만 튀는 녀석이 있다. 이 녀석을 클릭하면 카카오톡으로 지금 보고 있는 이 포스팅을 공유할 수 있는 버튼인데, 카카오톡 디벨로퍼에서 `카카오톡 api`를 사용, 버튼 클릭만으로 공유를 아주 간편하게 만들어준다.✨

이 포스팅을 적는 이유는 이 버튼을 만들기까지 구글링을 했지만 단편적인 정보만 얻을 수 있었고 삽질을 몇번 했기 때문에 이 페이지만 보고 따라하면 쉽게 github 블로그에서 카카오톡 공유 버튼을 만들 수 있게 하기 위함이다.

<br/><br/>

## 카카오톡 애플리케이션 만들기

먼저 [kakao developers🔗](https://developers.kakao.com/) 이곳에 접속해서 메인에 떠있는 시작하기 버튼을 누르자. 그러면 전체 애플리케이션 화면이 뜨는데 애플리케이션 추가를 누르면 애플리케이션을 추가할 수 있는 Dialog가 뜬다.

> 애플리케이션 하나를 추가할 때마다 카카오에서 서비스하는 api 하나를 지정해서 사용할 수 있는듯 하다. 페이지에 봐서는 카카오 로그인, 지도, 내비, 페이, 푸시알림 등등 기능이 있는듯.

![3](https://user-images.githubusercontent.com/59427983/82632014-025a6d80-9c32-11ea-8eaf-be65c09b8c43.png)

이렇게 앱 이름을 link로 주고 회사 이름을 아무거나 줬다. 그리고 생성된 애플리케이션을 클릭해서 들어가면, 첫 페이지에 `앱 키`, `플랫폼`, `기본 정보`가 뜬다. 먼저 앱 키에서 `JavaScript 키`를 복사해 메모장에 기록해두고 플랫폼 부분의 플랫폼 설정하기로 들어가보자.

우리는 Web 화면에 카카오톡 공유 script를 만들 것이므로 `Web 플랫폼 등록`을 누르자.

![4](https://user-images.githubusercontent.com/59427983/82632022-09817b80-9c32-11ea-94a1-7fc49738c930.png)

이렇게 우리가 생성해둔 호스팅 된 홈페이지 주소를 적는다. 주의점은 주소의 마지막 뒤에 / 를 빼고 넣어주어야 함.

> 이렇게 사이트 도메인을 등록하는 이유는, 이 카톡 애플리케이션을 사용하는 곳이 도메인이 설정되지 않은 곳에서 사용되면 카카오톡 측에서 블락을 걸어버리기 때문에 반드시 사용하는 도메인을 넣어주어야 한다.

<br/><br/>

## 템플릿 만들기

그러면 이제 왼쪽 네비게이션을 내려서 `카카오링크`를 클릭하고 메시지 템플릿 빌더 바로가기를 클릭하자. 카카오톡 공유를 했을 때, 카카오톡에

![6](https://user-images.githubusercontent.com/59427983/82632027-100ff300-9c32-11ea-8c68-12eaee0cf131.png)

이것과 같이 사진과 함께 글과 버튼을 커스텀하기 위해서는 이 템플릿이 필요하다. 템플릿 만들기를 클릭하고 FEED, LIST, COMMERCE 3가지 템플릿이 나오는데 우리는 `FEED`를 선택해보자.

![7](https://user-images.githubusercontent.com/59427983/82632034-17370100-9c32-11ea-8c9c-9532f8636089.png)

상단의 APP 쪽 ID 가 아니라 화살표로 되어있는 밑에 부분 ID를 메모장에 또 기록해두고, 템플릿 설명을 아무거나 적고, 사용 목적으로 `카카오링크/나에게 보내기` 부분에 체크한 후 밑으로 내려가보자.

![8](https://user-images.githubusercontent.com/59427983/82632045-1dc57880-9c32-11ea-96bc-c6d031175350.png)

> _탭 중에 짚고넘어가지 않는 부분은 사용 안함을 누르고 넘어감._

이 부분이 우리가 카카오톡으로 공유했을 때 카톡에 뜰 템플릿 부분이다. 이미지 설정은 기호에 맞게 하면된다. 1,2,3 이렇게 있는데 나는 단일 이미지를 쓸 것이므로 2,3을 삭제 해줬다. 보여주고 싶은 이미지를 업로드 하면 된다.

> 여기서 이미지 탭에 이미지 업로드 / Costom 이 있는데 Costom을 선택했을 시, 블로그가 변수로 값을 넘기는 것을 바꿔서 그 때마다 이 이미지를 바꿀 수 있는 기능이 있다. 밑에 부분에서 더 상세히 다룰 것임.

제목/설명 탭에서는 사진 밑에 사용할 제목과 설명을 지정하는 곳이다. static하게 사용하려면 여기 문자열을 집어넣으면 되고, 동적으로 페이지마다 다른 제목/설명을 보여주고 싶다면

제목에는 `${title}`를, 설명에는 `${description}`을 적어두자. 이것은 나중에 jekyll의 social-shard.html 파일에서 변수로 줄 변수 명들이다. 아까 Costom 부분도 ${} 안에 변수명을 적어주고 페이지에 같은 이름으로 이미지를 주면 동적으로 바뀌는 듯하다.

![10](https://user-images.githubusercontent.com/59427983/82632056-26b64a00-9c32-11ea-8690-b71a36d86c07.png)

버튼 탭에서 버튼명을 지어주고, 링크 설정 PATH 부분을 다음과 같이 /${url} 으로 주자. 마찬가지로 공유하고자 하는 페이지마다 url이 다르므로 변수로 설정해두자. 📌만약 이 부분을 개별링크가 아닌 공통링크 사용으로 해둔다면, 공유를 했을 때, 데스크탑 카카오 톡에서는 **모바일에서 확인하세요**라는 문구가 뜬다.

이제 공통링크 탭에서도 마찬가지로 PATH부분에 /${url} 을 주자. Mobile Web, Web 두 부분. 그러면 모든 설정이 끝났다. 상단에 템플릿 설명 쪽 저장 버튼을 누르면 카카오톡 공유를 했을 때 카카오톡에서 사용될 템플릿이 완성된 것이다.😎 템플릿에 대해 더 자세한 정보를 얻고 싶다면 [템플릿사전🔗](https://developers.kakao.com/docs/latest/ko/message/message-template)에서 알아보자.

<br/><br/>

## 페이지에 넣을 버튼 만들기

이제 우리 블로그에 버튼을 만들어야 한다. `_include/social-share.html` 파일을 열어보면 기본으로 twitter, facebook, linkedin이 `<a>`로 만들어져있는 것을 볼 수 있다.

Web 화면에서나 Mobile 화면에서 블로그에 접속했을 때 자동으로 공유하는 태그인 것. 우리는 이제 맨 밑에 카카오톡 공유 태그를 새롭게 추가할 것이다.

```javascript
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<script>
    Kakao.init("...");   // 아까 복사해둔 JavaScript 키
    function sendLink() {
      Kakao.Link.sendCustom({
        templateId: ...,   // 복사해둔 템플릿 ID
        templateArgs: {
          title: "{{ page.title }}",
          description: "{{ page.excerpt }}",
          url : "{{ page.url }}",
        },
      });
    }
</script>
<a id="kakao-link-btn" href="javascript:sendLink()">
    <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
</a>
```

이렇게 붙여넣어주자. 먼저, `Kako.init(...)` 부분은 아까 복사해둔 JavaScript 키를 넣어주고 `templateId:` 뒤에는 템플릿 ID를 넣어주자. 그리고 `templateArgs: {...}`은 템플릿에 들어갈 `변수: 값` 형태로 넣어줄 것인데, ` {``{ ` `page.xxx` ` }``} ` 문법을 사용해서 넣어준다.

블로그에서 확인해보니 jekyll엔진이 templateArgs 안에 적힌 변수로 해당 페이지의 title과 excerpt, url을 코드 블럭 내 적어버렸다. ` {``{ ` ... ` }``} ` ...에 들어갈 것은 각각 `page.title`, `page.excerpt`, `page.url`이다.

> 이 문법은 *Shopify*에서 개발한 Ruby 기반 Template 언어인 `Liquid`라고 한다. 해당 Post에서 자동으로 title과 excerpt(설명) url을 변수로 지정해 동적으로 카카오톡으로 보낸다.
>
> 그리고 `<a>` 사이에 `<img>`가 있을 것이다. 저 주소를 복사해서 브라우저에 넣어보면 정사각형의 카카오톡 이미지 파일이 뜨는것을 알 수 있다. 저대로 적용하니 다른 공유 버튼들에 비해서 굉장히 튀어 보인다.😅

![12](https://user-images.githubusercontent.com/59427983/82632078-33d33900-9c32-11ea-9155-bb32163e4259.png)

카카오 디벨로퍼 화면에 저 로고가 탐이났다. [카카오톡 로그인 로고🔗](https://developers.kakao.com/static/images/pc/product/homeicon/kakaoLogin.png). 이녀석을 다운받아서 어찌저찌 그림판으로 편집해 이름을 바꾸고 저장해서 `<img>`에 넣었다.

![kakao](https://user-images.githubusercontent.com/59427983/82647937-e1a21000-9c51-11ea-9f4d-a4f0bc762119.png)

assets/images/ 폴더에 이미지를 넣고, `<img>`에 `<img src="/assets/images/kakao.png">`이렇게 적어주고.

자 이제 모든 과정이 끝이 났다. git `add` `commit` `push` 작업을 거친 후 포스팅 한 화면 맨 밑을 보면 맨 처음 사진과 같이 공유 이미지가 나타났고, 버튼을 누르면 카카오톡으로 마음껏 공유할 수 있다.

다른 공유 버튼들에 비해 크기가 약간 크고 어떤식으로 조정해주면 저 사이즈에 딱 맞는 공유 사진이 완성될 수 있는지 잘 모르겠다..😥 퍼블리셔의 영역이라고 말하면 너무 책임감이 없어보이려나? 앞으로 `<img>`가 아닌 다른 태그 + css 조합으로 반응형으로 꾸밀 수 있을 것 같긴한데 나중에 한번 해봐야지.

---

---

### P.S. 카카오톡 공유 버튼을 딱맞게 완성했다 ✨

![13](https://user-images.githubusercontent.com/59427983/82632103-40f02800-9c32-11ea-9c78-5d8e95794594.png)

이렇게 `<img>`를 사용하지 않고, `<a>` 사이에 `<i>`, ` <span>` 을 넣어서 완성했다.

```javascript
<a id="kakao-link-btn" href="javascript:sendLink()" class="btn btn--comment">
  <i class="fa-fw fas fa-comment" aria-hidden="true"></i>
  <span>KakaoTalk</span>
</a>
```

이 과정을 어떻게 했냐면, 공유버튼이 이미 있는 twitter, facebook, linkedin 이 `<a>`, `<i>`, `<span>`으로 이루어져 있었고, `<i>` 에 class 프로퍼티로 "fab fa-fw fa-facebook" 이녀석이 들어가 있는 것이다.

구글링 해보니, [w3schools🔗](https://www.w3schools.com/icons/fontawesome5_icons_brands.asp)라는 사이트에서 지원하는 icon을 따와서 사용한 것이었다. Font Awesome 5 탭에 있는 Icons Brands 에서 지킬이 sns 아이콘을 따와서 넣고 `_scss/minimal-mistakes/_utillities.scss` 에서 아이콘 별 색상을 지정한다.

카카오톡과 비슷한 말풍선을 w3schools에서 찾았고 아이콘 이름은 *fa-comment*였다. 고로 `<i>`에 class이름은 fa-comment. 그리고 `<span>`은 옆에 붙을 텍스트다. 따라서 KakaoTalk.

`__utillities.scss`에는

```scss
.social-icons {
  ...
  .fa-comment {
    color: #FDDC3F;   // 노랑색
  }
  ...
}
```

이런식으로 색을 추가해줬고, `_sass/minimal-mistakes/_buttons.scss`에

```scss
.btn {
  ...
  $buttoncolors:
  (primary, $primary-color),
  (inverse, #fff),
  (light-outline, transparent),
  (success, $success-color),
  (warning, $warning-color),
  (danger, $danger-color),
  (info, $info-color),
  (facebook, $facebook-color),
  (twitter, $twitter-color),
  (comment, #FDDC3F),      // 이부분
  (linkedin, $linkedin-color);
  ...
}
```

이렇게 추가해주었다. 그러니 모바일 창에서도 딱 맞는 사이즈로 출력이 된다.

<img src="https://user-images.githubusercontent.com/59427983/82632148-64b36e00-9c32-11ea-9ee7-fe06b2787ecf.png" alt="14" style="zoom:50%;" />

요렇게 말이지 😎

---

카카오 API를 다룬다는게 매우 흥미로웠고, 다음에 정식으로 어떤 서비스를 맡게되면 카카오 로그인 기능을 이용해서 로그인을 편하게 할 수 있는 시스템을 만들어보고 싶다. 아마 변수처리 부분은 같지않을까.😊
