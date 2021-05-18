---
layout: post
title: '(11) Sentry 에러 로깅 시스템 도입'
author: [Pozafly]
tags: [Tripllo 제작기, Sentry, 에러 모니터링]
image: ../img/tripllo/sentry.png
date: '2021-04-09T17:13:47.149Z'
draft: false
excerpt: Sentry를 통해 프론트엔드 에러 로깅 시스템을 도입해보자.
---

# Sentry

Sentry는 Application Error Monitoring 도구다. 에러 로그를 수집하는데 특화되어 있고 각 코드의 에러들을 모아 웹에서 확인할 수 있게 해주는 플랫폼이다.

스타트업의 경우 개발 인원이 많지 않다 보니 외부 서비스 연동이나 새로운 기능 구현 시 어쩔 수 없이 스택은 늘어나는 상황이 발생하는데, 대부분의 플랫폼을 지원하고 있는 Sentry는 비즈니스 로직이 확장되어도 **에러 모니터링을 일원화** 할 수 있다는 장점이 있다. (출처 [안정성 높은 서비스 개발하기 — Sentry](https://medium.com/humanscape-tech/%EC%95%88%EC%A0%95%EC%84%B1-%EB%86%92%EC%9D%80-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0-1-2-a9e54054c675)) -> 이 글 읽어보면 되게 좋다..

서버단은 ec2라든지 자체 서버에 로그가 기록되는 반면, 프론트엔드는 클라이언트가 오류를 마주하고 피드백을 주면 어디서 에러가 났고, 어떤 브라우저 환경에서 에러가 났는지 찾기 쉽지 않다. Sentry는 어느 Device 종류, 어떤 브라우저, 어떤 버전, 어떤 코드에서 에러가 났는지 상세하게 알려주고, 또 협업을 위해 이슈를 해결하기 위해 멤버를 배정하는 등 프로젝트를 유지 보수 하기 쉽게 만들어준다. 에러가 났을 때 다양한 플랫폼에 알림 서비스도 제공하고 있다.

유료 버전을 구매하면 더 다양한 기능을 사용할 수 있다고 하는데, 우선 무료 버전으로 프로젝트에 Sentry를 입혀보자.

<br/>

<br/>

## 설치

[sentry.io](https://sentry.io/) 에서 회원가입 후 프로젝트를 생성하면, 

![sentrymain](https://user-images.githubusercontent.com/59427983/113977290-563b6880-987d-11eb-979f-4414c49b659f.png)

이렇게 플랫폼을 선택할 수 있는 화면이 나온다. vue를 클릭. 간단 시작 가이드가 나온다.

```shell
# Using yarn
yarn add @sentry/vue @sentry/tracing

# Using npm
npm install --save @sentry/vue @sentry/tracing
```

CDN으로 하거나, SDK를 설치하는 방법이 나오는데, npm 으로 SDK를 깔아보자.

그리고,  아래와 같이 코드를 main.js에 값을 넣으라고 자세히 알려준다. utils 폴더에 sentry.js 파일을 만들어 따로 빼고 main.js에 붙여주자. dsn 도 페이지에서 바로 알려주는데, env 파일로 빼서 사용하는 게 좋겠지?

```js
// src/utils/sentry.js
import Vue from "vue";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

export default Sentry.init({
  Vue,
  dsn: VUE_APP_SENTRY_DSN,  // env 파일에 저장
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
```

export default를 해주었으니 main.js에는 `import '@/utils/sentry';` 이렇게 한 줄 넣어주면 됨.

init의 추가 옵션에 대해서 알려주는데 아래와 같다.

---

SDK는 동작을 변경할 수 있는 몇 가지 다른 구성 옵션을 허용합니다.

- 통과 `Vue`는 선택 사항이지만 통과하지 못한 경우 `window.Vue`반드시 참석해야 합니다. (Vue가 반드시 import 되어 있어야 한다는 뜻인 듯...)
- `attachProps` 전달은 선택 사항이며 제공되지 않은 경우 `true` 입니다. `false` 로 설정하면 Sentry는 로깅을 위해 모든 Vue 구성 요소의 props를 전송하지 않습니다.
- 전달 `logErrors`은 선택 사항이며 제공되지 않은 경우  `false` 입니다. `true` 로 설정하면 Sentry는 Vue의 원래 `logError`기능도 호출 합니다.

*Vue 오류 처리

이 통합을 활성화하면 기본적으로 Vue가 내부적으로`logError`를 호출하지 않습니다. 즉, Vue 렌더러에서 발생하는 오류가 개발자 콘솔에 표시되지 않습니다. 이 기능을 유지하려면`logErrors : true` 옵션을 전달해야 합니다.

---

이렇게 적혀있다. 그래서 일단, attachProps: true, logErrors: false, 기본값 옵션을 따로 줘놨다. 나중에 필요할 때 바로 쓸 수 있게. logErrors는 false로 해두면 개발자 콘솔에 찍히지 않는다는데 내가 우선 개발할 때는 true로 두어야 할 것 같아서 눈치 살.. 보고 변경해야지.

코드를 입히기 전에 Sentry 페이지에는 하단에, *첫 번째 이벤트 수신 대기 중..* 이렇게 나와있는데 local에서 한번 돌려보자. 그러면 `이벤트가 입하했습니다!` 라고 뜨면서 연동이 완료된 것임. 하지만,<img width="1040" alt="스크린샷 2021-04-08 오전 10 44 00" src="https://user-images.githubusercontent.com/59427983/113955813-680a1500-9857-11eb-9eae-007438e32c3a.png">

이렇게 CORS error가 주욱 뜨는 걸 볼 수 있다. sentry를 입히지 않았을 때는 정상적으로 CORS 에러가 뜨지 않고 잘 작동되었던 것이다. 이번 CORS 에러는 Sentry와 내 local vue(node서버) 간의 CORS 문제가 **아니다!**

에러 문구를 자세히 보면, localhost:3000 에서 localhost:8080 을 막고 있다고 나와있다. 3000은 SpringBoot로 되어있는 백엔드 로컬임. 하지만 Sentry를 입히기 전에는

```java
// security/WebSecurityConfig.java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
  (...)
  configuration.setAllowedOrigins(ImmutableList.of("http://localhost:8080", "https://tripllo.tech"));
  (...)
}
```

SpringSecurity config에서 이렇게 8080을 허용하고 있었는데, Sentry를 입히면서 여기에서 문제가 생긴 것이다. 따라서 vue.config.js 파일에 proxy 설정을 해주도록 하자.

<br/>

### proxy devServer 설정

기존에 개발 환경은 SpringSecurity에서 localhost:8080을 허용해 주는 것으로 해결하고 있었는데, 이제는 백엔드와 프론트 환경에 proxy(대리자)를 두어 동일한 3000번 포트에서 동작하는 것처럼 환경을 구성해 줄 것이다.

프로젝트 최상단에 vue.config.js 파일이 있었다면 그곳에 작업하고, 없다면 만들자.

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/websocket': {
        target: 'http://localhost:3000',
      },
    },
  },
};
```

이렇게 해주면, 지금 vue가 돌아가고 있는 local 포트가 8080 이 아닌, 3000 으로 백엔드와 같은 포트를 사용하는 것처럼 해준다. `/api` 의 의미는 url에 백엔드로 요청하는 엔드 포인트를 뜻한다. websocket도 마찬가지. 핫 리로딩을 지원하지 않으므로 프론트 서버를 다시 껐다 켜주자. 

그리고, 중요한 것은 ⭐️ 서버로 요청을 보낼 때, 기존과 같이 prefix를 localhost:3000 으로 두는 것이 아니라 `공백` 으로 두어야 한다. 즉, 

```js
// axios BaseURL 설정 시
const environmentURL =
  process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_URL : '';

const createInstance = () => {
  return axios.create({
    baseURL: `${environmentURL}/api/`,
  });
};
```

이런 식으로 local에서 proxy를 사용한다면 공백을 넣어주어야 백엔드로 요청이 정상적으로 갈 것이다.

이제 로컬에서, 임의로 오류를 발생시키고, sentry 페이지에 가보면 오류 문이 잘 찍혀있는 것을 볼 수 있다.

![스크린샷 2021-04-08 오후 4 28 03](https://user-images.githubusercontent.com/59427983/114003087-6ca2ed80-9898-11eb-990d-edda67fdf5da.png)

<br/>

<br/>

## Environment

[공식 environment](https://docs.sentry.io/product/sentry-basics/environments/) 이곳에 가면 잘 설명되어 있다. 환경별 탭을 두어, 개발 환경(development)에서 오류가 났는지, 배포 환경(production)에서 오류가 났는지 알 수 있게 해준다.

```js
Sentry.init({
  environment: process.env.NODE_ENV,
});
```

이렇게 설정해주면

![스크린샷 2021-04-08 오후 6 33 25](https://user-images.githubusercontent.com/59427983/114003693-ec30bc80-9898-11eb-8ca7-69b757d65115.png)

이런 탭이 생기고 어느 환경에서 어떤 error가 생겼는지 쉽게 볼 수 있다. 지금은 이슈 탭에 보면

![스크린샷 2021-04-08 오후 9 19 06](https://user-images.githubusercontent.com/59427983/114025443-1346b880-98b0-11eb-8bc2-16e824e5c42c.png)

이렇게 어떤 Error가 떴는지만 나오고 소스 추적이 안되는 상태이다. 이제 소스를 추적할 수 있도록 만들 것이다.

<br/>

<br/>

## 오류에서 읽기 가능한 스택 추적 활성화

[공식 Docs](https://docs.sentry.io/product/sentry-basics/guides/integrate-frontend/upload-source-maps/)에 자세한 설명이 있다. sentry 화면에서 에러가 표시될 때, 소스코드와 함께 어디서 에러가 났는지 알려면 소스 맵(source map)을 sentry 서버에 올려줘야 한다. sentry-cli를 설치해서 로컬 컴퓨터에서 수동으로 소스 맵을 올려주거나, 빌드시 자동으로 올려주는 방법이 있다. 우리는 빌드 시 자동으로 올려주는 방법을 선택할 것인데 이게 자동화가 되어있기 때문에 일일이 수동으로 올려주지 않아도 되기 때문에 편하다.

<br/>

### 프로젝트 이름 등록

1. Organization 이름 등록 : 좌측 텝에 보면 Settings가 있다. -> General Settins에 Organization Slug에 프로젝트 명을 등록해 주자. 
2. Project 이름 등록 : 이번엔, General Settins 말고 바로 밑 Projects에 들어가자 -> 자신의 Project를 클릭하면 Name을 정할 수 있다. 프로젝트 이름을 등록해 주자.

이 두 가지가 설정되었으면, 

<br/>

### 토큰 획득

![스크린샷 2021-04-08 오후 9 38 08](https://user-images.githubusercontent.com/59427983/114043706-7db42480-98c1-11eb-8dfe-bcc85c767c82.png)

이곳으로 들어가서, Create New Token -> 체크된 상태로 다음으로 가면 토큰을 발급해 준다.

![스크린샷 2021-04-08 오후 9 40 21](https://user-images.githubusercontent.com/59427983/114043983-bd7b0c00-98c1-11eb-8990-a632c5bd0f7e.png)

이렇게. 이걸 잘 가지고 있자.

<br/>

### 웹팩 플러그인 설치 & 등록

빌드 시, Sentry 서버에 소스 맵을 자동으로 올려줄 Sentry 웹팩 플러그인을 세팅해보자.

```shell
$ npm install --save-dev @sentry/webpack-plugin
```

그리고, `vue.config.js` 파일에 다음과 같이 적어주자.

```js
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const sentryPlugin =
  process.env.NODE_ENV !== 'development'
    ? [
        new SentryWebpackPlugin({
          // sentry-cli configuration
          authToken: process.env.VUE_APP_SENTRY_AUTH_TOKEN,
          org: [Organization에 등록한 이름],
          project: [Project에 등록한 이름],

          // webpack specific configuration
          include: './dist',
          ignore: ['node_modules', 'vue.config.js'],
        }),
      ]
    : [];

module.exports = {
  (...)
  configureWebpack: {
    plugins: sentryPlugin,
  },
};

```

- authToken : 이 부분은 env 파일에 빼둔 것인데, 아까 sentry에서 발급받은 token을 넣어주면 된다.

위와 같이 development 환경에서는 `[]` 빈 배열을 넣어준 이유는, vscode상으로 코드를 수정하고 저장하면 핫리로딩이 일어날 때마다 빌드 해서 소스 맵을 sentry 서버에 전송한다. 코드 하나 바꾸고 또 빌드하고 올려주고 이런 작업이 반복되고 개발 속도가 현저하게 떨어지기 때문에, 개발 환경에서 쓰이지 않게 하기 위해 분기를 태운 것임. 즉, 개발 모드에서는 소스 맵을 올리지 않게 되어 sentry에는 에러만 찍힐 뿐, 어디에서 에러가 났는지 코드 자체를 보여주지 않는다.

이제, git push를 하면 travis에서 

![스크린샷 2021-04-08 오후 11 35 24](https://user-images.githubusercontent.com/59427983/114048113-39c31e80-98c5-11eb-9970-52844f87de2d.png)

이렇게 소스 맵을 생성해주고, sentry에 올려주는 것을 볼 수 있다. 그리고 sentry 홈페이지 Settings -> 한 칸 오른쪽 탭의 Projects -> 내 프로젝트 선택 -> Source Maps를 클릭

![스크린샷 2021-04-08 오후 11 52 48](https://user-images.githubusercontent.com/59427983/114048567-a9d1a480-98c5-11eb-9363-fa92505642e1.png)

이렇게 임의의 이름으로 소스 맵이 올라온 것을 볼 수 있다. (약간 늦게 뜰 수 있다. 기다리면 나옴.) 그 녀석을 눌러보면 .js파일과 .map 파일이 주욱 뜨면 소스 맵을 sentry 서버에 올린 것을 확인할 수 있다.

그리고 배포된 프로젝트에 들어가서 오류를 내고 Issues 탭에 들어가서 오류를 확인해보면,

![스크린샷 2021-04-08 오후 11 42 44](https://user-images.githubusercontent.com/59427983/114048964-fae19880-98c5-11eb-99ff-1e1272ba2227.png)

이렇게 정상적으로 어느 소스코드에서 에러를 냈는지 자세하게 알려준다. 

<br/>

### development 환경 막기

이제, development(local) 환경과 production 환경에서 에러 로깅 시스템이 잘 동작하는 것을 확인했으므로 development 환경에서는 에러 로깅 시스템을 꺼주도록 하자.

왜냐하면 Sentry는 무한정으로 무료로 사용할 수 있는 솔루션은 아니므로 배포까지 많은 테스트가 일어날 텐데 그때마다 발생하는 에러를 모두 Sentry 서버로 보내게 되면 무료 카운팅을 사용할 수 없게 될 수 있기 때문이다. 개발 환경에서는 콘솔만 보면 되니까.

```js
// sentry.js
import Vue from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

export default Sentry.init({
  Vue,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  attachProps: true,
  logErrors: false,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV !== 'development',  // 🔥

  tracesSampleRate: 1.0,
});
```

- 🔥 : 이 부분이 추가 되었다.

따라서 개발 환경에 따라 environment는 실 배포 환경과 스테이징 환경 두 가지에서 돌면 되지 않을까?

알림 설정은 기본적으로 email로 되어있는데, Slack으로 notification을 주는 것도 가능하다. 또한 해당 코드를 관리하는 개발자에게 이슈를 맡길 수도 있고 해결 처리, 또 해결이 되지 않았는데 해결 처리를 했다면 회귀 sign도 sentry가 알아서 준다.

에러 로깅 시스템을 도입하면서 사용자에게 어떻게 하면 더 안정적이고 견고한 소프트웨어를 제공할 수 있을지 고민이 되는 좋은 시간이었다! 또 Sentry를 도입하면서 내가 놓쳤던 Error를 고치고,  사용자한테 일어나지 않을 것 같은 Error까지 잡아보면서 대수롭지 않게 넘겼던 Error에 대해 다시 한번 생각해 볼 수 있는 기회였다.

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)