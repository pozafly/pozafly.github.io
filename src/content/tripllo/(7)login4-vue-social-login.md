---
layout: post
title: '(7) 로그인4 -vue 소셜로그인'
author: [Pozafly]
tags: [Tripllo 제작기, Vue.js]
image: ../img/tripllo/tripllo7.jpeg
date: '2021-02-05T10:03:47.149Z'
draft: false
excerpt: vue에서 소셜 로그인 기능을 만들어보자. 보통 요즘 서비스들은 다 소셜 로그인으로 가입, 로그인이 되므로 앞으로 서비스 개발할 때 거의 필수적으로 들어갈 기능이라고 생각했다. 또 backend보다는 frontend 개발자로 지원하고 싶기 때문에 백엔드의 OAuth2.0 을 사용하는 것 보다는 Javascript단에서 로그인 기능을 넣고 싶었다.
---

> vue에서 소셜 로그인 기능을 만들어보자. 보통 요즘 서비스들은 다 소셜 로그인으로 가입, 로그인이 되므로 앞으로 서비스 개발할 때 거의 필수적으로 들어갈 기능이라고 생각했다. 또 backend보다는 frontend 개발자로 지원하고 싶기 때문에 백엔드의 OAuth2.0 을 사용하는 것 보다는 Javascript단에서 로그인 기능을 넣고 싶었다.

![스크린샷 2021-02-06 오전 12 00 03](https://user-images.githubusercontent.com/59427983/107050303-6c419400-680e-11eb-8d39-f3d69c54e252.png)

이것 봐라. 너무 이쁘게 표현되지 않았나? 아무래도 이런거 보면 난 프론트가 맞는 듯 하다.. CSS는 너무 어렵지만...

## 소셜 로그인

- 소셜로그인 프로세스

![회원가입 로그인 프로세스 003 jpeg 001](https://user-images.githubusercontent.com/59427983/107029684-c5033380-67f2-11eb-90b9-0e89f4d3409e.jpeg)

각각 js 파일이 있으며 js 파일에 3곳에서 지원하는 로직을 넣어줬다. 서비스 ID 혹은 key가 맞으면 소셜에 등록한 return url 또는 domain을 체크하여 userInfo를 보내주고, 그 userInfo를 이용하여 회원가입 혹은 로그인 할 수 있게 구성했다. 공통적으로 SpringBoot와 통신하는 소셜 공통 API를 마지막에 타고 MySQL 까지 접근하는 큰 구조이다.

### 소셜 공통 API

```js
// utils/social/index.js
import store from '@/store';
import router from '@/routes';

async function socialLogin(req, isSignup) {
  try {
    const { data } = await store.dispatch('SOCIAL_LOGIN', req.id);
    store.commit('setUserToken', data.data.token);
    store.commit('setUser', data.data);

    if (isSignup === 'afterSignup') alert('회원가입 완료! 메인 페이지로 이동합니다.');

    router.push('/main');
  } catch (error) {
    console.log(error);

    const { data } = await store.dispatch('VALID_ID', req.id);
    if (data.status === 'OK') {
      const confirmYn = confirm(
        '아직 가입되지 않은 회원입니다. \n회원가입 화면으로 이동하시겠습니까?',
      );
      if (confirmYn) router.push('/auth/signup');
    }
  }
}

async function socialSignup(req) {
  try {
    await store.dispatch('VALID_ID', req.id);
    await store.dispatch('SIGNUP', req);

    socialLogin(req, 'afterSignup');
  } catch (error) {
    console.log(error);

    const confirmYn = confirm('이미 가입된 소셜 회원입니다. \n로그인 화면으로 이동하시겠습니까?');
    if (confirmYn) router.push('/auth/login');
  }
}

export { socialLogin, socialSignup };
```

Tripllo는 소셜 로그인을 Google, Facebook, Kakoa 3곳에서 지원하도록 만들었다. 따라서 이 3곳에서 받아온 user 정보는 항상 공통 API를 거친다. 공통 API는 백엔드로 유저정보를 넘겨주는 역할을 한다. 로그인과 회원가입 두가지 메서드로.

- `socialLogin()` : Vuex의 store에서 action 함수인 `SOCIAL_LOGIN` 을 dispatch 해준다. `제작기 5` 부분의 백엔드로 연결되어 소셜로그인을 진행하는 구조이다. 백엔드로부터 return된 token과 userInfo를 Mutation 함수로 보내는 역할이다. Mutation에서는 state와 LocalStorage에 해당 정보를 올린다.(후에 webStorage에 대해 정리하면서 Vuex의 state와 LocalStorage, SessionStorage에 대해서 이야기 할것임.) 통과가 된다면 router로 메인 페이지로 이동하게 된다.

※ isSignup 분기를 태운 이유는 유저가 소셜로 회원가입을 했을 시 회원가입이 되었다는 메세지가 필요할 듯 해서 넣어주었다.

- socialSignup() : 마찬가지로 백엔드에서 id validation을 거친 후 Signup을 진행한다. 완료 되면 socialLogin을 바로 진행하는 구조이다.

### 페이스북 로그인

#### 페이스북 서비스 등록

[페이스북 Development](https://developers.facebook.com/docs/development)

이곳에 들어가서 로그인 후, 상단 바에 내 앱 클릭, 앱 만들기에서 `연결된 환경 구축`을 클릭하고 넘어가자.

<img width="614" alt="스크린샷 2021-02-05 오후 2 43 28" src="https://user-images.githubusercontent.com/59427983/107001176-8d819080-67cc-11eb-9c70-5010f927d1cb.png">

그리고 표시할 앱 이름에 편의에 맞게 이름을 정해준뒤 앱 만들기를 클릭하자.

<img width="665" alt="스크린샷 2021-02-05 오후 2 44 14" src="https://user-images.githubusercontent.com/59427983/107001201-98d4bc00-67cc-11eb-9d71-e56eb059a826.png">

그러면 아래와 같이 앱에 제품을 추가할 수 있는 곳이 나온다. 여기서 Facebook 로그인 부분에 설정을 눌러주자.

<img width="1000" alt="스크린샷 2021-02-05 오후 2 45 14" src="https://user-images.githubusercontent.com/59427983/107001270-b0ac4000-67cc-11eb-812d-42d2eabbb760.png">

그리고, 우리는 웹에서 사용할 것이므로 웹을 선택해주자. 우선 local 환경에서 볼 것이기 때문에 http://localhost:8080 포트까지 입력.

<img width="968" alt="스크린샷 2021-02-05 오후 2 47 11" src="https://user-images.githubusercontent.com/59427983/107001355-d6394980-67cc-11eb-8bd6-a7e7cc4c4f0b.png">

save를 누르고 다음을 누르면, JavaScript 용 Facebook SDK 설정 코드가 나오는데 해당 코드를 복사해둔다.

그리고 왼쪽 상단 탭에 보면 앱 ID 란이 있다 이녀석도 복사해두자.

<img width="450" alt="스크린샷 2021-02-05 오후 2 57 18" src="https://user-images.githubusercontent.com/59427983/107001424-f23ceb00-67cc-11eb-84b3-e2b285fd8b1d.png">

나는 Vue프로젝트에 utils에 따로 social이라는 이름으로 js 파일들을 모아두고 관리한다. 여기에 Facebook.js 파일을 등록해서, 필요한 곳에서 꺼내쓰는 형식으로 하는 것이 좋겠다.

여기에 Facebook.js 파일을 만들고 다음 코드를 넣자.

#### init

```js
init() {
    window.fbAsyncInit = function() {
        window.FB.init({
            appId: process.env.VUE_APP_FACEBOOK_APP_KEY,
            cookie: true,
            xfbml: true,
            version: 'v9.0',
        });
        window.FB.AppEvents.logPageView();
    };
    (function(d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
},
```

appId에는 아까 복사해둔 앱 ID를 넣는 곳이다. env 파일로 따로 빼서 관리하면 보안성이 좋기 때문에 env 파일에 따로 빼서 관리하자. init() 은 사용하고 싶은 페이지의 created() 라이프사이클 메서드에서 사용할 것이다.

※ 아참, 그리고 자꾸 까먹는거.. env 파일에 넣으면 서버를 다시 껐다 켜주지 않으면 undifined 가 뜬다는 것. 그리고 init() 메서드를 실행하면 아래와 같이 FB.init() 에 AppId를 먼저 입력해야한다고 나올 것이다. 잘... 하자..

<img width="923" alt="스크린샷 2021-02-05 오후 4 09 10" src="https://user-images.githubusercontent.com/59427983/107001480-0b459c00-67cd-11eb-8dd9-327dba05aa26.png">

<br/>

#### getInfo()

```js
getInfo() {
    return new Promise((resolve, reject) => {  // promise
      window.FB.getLoginStatus(() => {
        // 첫 시도
        window.FB.login(
          response => {
            if (response.status === 'connected') {
              // const accessToken = response.authResponse.accessToken;
              window.FB.api(
                '/me',
                { fields: 'id, name, email, picture' },
                res => {
                  if (!res) LoginFailure();
                  const req_body = {
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    picture: res.picture.data.url,
                    social: 'Facebook',
                  };
                  resolve(req_body);
                },
              );
            } else {
              LoginFailure();
            }
          },
          { scope: 'public_profile, email' },
        );
      });
    });
  },
```

getInfo는 이제 화면에서 Facebook으로 로그인 하기 혹은 회원가입하기 버튼을 누르면 가장 먼저 페이스북에서 유저 정보를 가져와서 로그인이든 회원가입이든 진행을 하게 된다. 여기서 `회원의 정보를 페이스북으로부터 가저오는 메서드`이다.

- req_body는 페이스북으로부터 가져온 user 정보를 담는 곳이다. id, name, email, profileImg 는 user의 기본정보이고, `social`은 MySQL에 user 테이블에 social 칼럼에 들어갈 값이다. 이렇게 social로 구분해놓는 이유는, 소셜 로그인을 통해 회원가입 한 회원의 비밀번호 찾을 때 구분값으로도 사용되고, 회원 가입 시, social회원과 아닌 회원을 분기 처리해서 password를 자동으로 만들어줄 것이기 때문이다.

- scope 부분이 프로필과 email정보를 요청하겠다라는 뜻이다.
- 여기서 return new Promise((resolve, reject) => ... Promise가 사용되었다. 사실 Tripllo는 로그인 시, 회원가입 시 두개 다 페이스북으로부터 정보를 가져온 다음 진행이 되는데 2개의 메서드가 이렇게 유저 info를 가져오는 부분이 겹친 소스로 되어있었다. 리팩토링하기 위해서 Promise를 사용했으며, login, signup에서 이어서 promise를 사용한다.

#### login, signup

```js
async login() {
  const req = await this.getInfo();
	await socialLogin(req);
},

async signup() {
  const req = await this.getInfo();
  await socialSignup(req);
},
```

이렇게 async await 를 사용해주지 않으면(.then 을 사용해서 처리해도 됨..) socialLogin 메서드로 비동기처리(req가 넘어오지 않았는데 먼저 실행) 되기 때문에 넣어주었다. 이젠 Promise를 쓰지 않으면 불편한 수준....

#### 전체소스

```js
import { socialLogin, socialSignup } from '@/utils/social';

const Facebook = {
  init() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.VUE_APP_FACEBOOK_APP_KEY,
        cookie: true,
        xfbml: true,
        version: 'v9.0',
      });
      window.FB.AppEvents.logPageView();
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  },

  async login() {
    const req = await this.getInfo();
    await socialLogin(req);
  },

  async signup() {
    const req = await this.getInfo();
    await socialSignup(req);
  },

  getInfo() {
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus(() => {
        // 첫 시도
        window.FB.login(
          response => {
            if (response.status === 'connected') {
              // const accessToken = response.authResponse.accessToken;
              window.FB.api('/me', { fields: 'id, name, email, picture' }, res => {
                if (!res) LoginFailure();
                const req_body = {
                  id: res.id,
                  name: res.name,
                  email: res.email,
                  picture: res.picture.data.url,
                  social: 'Facebook',
                };
                resolve(req_body);
              });
            } else {
              LoginFailure();
            }
          },
          { scope: 'public_profile, email' },
        );
      });
    });
  },
};

export default Facebook;
```

여기서 보면 가장 상단에 `import { socialLogin, socialSignup } from '@/utils/social';` 이 구문이 있다. social 로그인과 social 회원가입은 이 포스팅에서 가장 먼저 설명했던 소셜 공통 API인 utils/social/index.js 파일에서 가져오는 메서드인데, 역시 공통 부분을 거쳐서 기능을 수행하게 되는 구조이다.

또 해당 js 파일은 export default로 Facebook 에 선언된 4개의 메서드를 내보내고 있다. 이 처리는, vue의 plugin 기능으로 어디서든 빼서 쓸 수 있도록 한 것인데, 굳이 plugin 기능으로 만들었어야 했나? 하는 의문이 들지만 일단 plugin을 직접 만들어 사용해봤다는데 의미를 두어야 할듯.

참고자료 : [공식 Document](https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus), <https://parkjihwan.tistory.com/9>

LoginFailure() 은 따로 만들진 않음...

<br/>

### 카카오 로그인

#### 카카오 서비스 등록

[카카오 Development](https://developers.kakao.com/)

이곳에 들어가보자. 상단에 내 애플리케이션을 클릭, + 버튼으로 애플리케이션 추가하기를 눌러주자.

![스크린샷 2021-02-05 오후 5 21 25](https://user-images.githubusercontent.com/59427983/107010446-b0ff0800-67d9-11eb-9531-376d46df5d76.png)

사진과 같이 입력해주고 들어가보자. 가장 먼저 뜨는 것은 앱키에 대한 부분이다. `JavaScript 키` 만 복사해두자. 이것도 페이스북과 마찬가지로 env 파일에 등록해줄것이다.

![스크린샷 2021-02-05 오후 5 37 18](https://user-images.githubusercontent.com/59427983/107010496-c1af7e00-67d9-11eb-97db-c48f966c2d4b.png)

왼쪽 탭에 `플랫폼`이 있다. 클릭 후 우리는 Web 서비스를 할 것이기 때문에 Web 플랫폼을 등록하자. 사이트 도메인이 나오는데, 로컬 환경의 url을 입력해주자. 이 부분은 나중에 배포 시 다시 수정해주어야 할 부분이다. 도메인이 바뀔 것이기 때문. 이 부분을 제대로 등록하지 않으면 밑에 사진과 같은 오류가 뜬다. 배포 후 도메인을 변경했을 때도 마찬가지다.

<img width="930" alt="스크린샷 2021-02-05 오후 5 38 08" src="https://user-images.githubusercontent.com/59427983/107010554-d429b780-67d9-11eb-80d9-7be367de37e0.png">

이제, 왼쪽 탭에 카카오 로그인이 있다. 클릭해보자. 그리고 활성화 설정의 상태를 ON으로 두자. 왼쪽 탭에 카카오 로그인 밑에 동의항목 탭이 있다. 눌러보자. 우리는 개인정보 보호 부분을 설정해주어야 한다. 나는 밑의 사진과 같이 꼭 필요한 정보만 요청하도록 설정했다.

![스크린샷 2021-02-05 오후 5 41 33](https://user-images.githubusercontent.com/59427983/107010576-ddb31f80-67d9-11eb-8c14-ef84c53a9ea2.png)

그리고 동의 화면 미리보기를 눌러보면 사용자가 회원가입 시 우리에게 어떤 정보를 제공할지 동의 화면을 데모로 확인해볼 수 있다.

![스크린샷 2021-02-05 오후 5 42 05](https://user-images.githubusercontent.com/59427983/107010604-e6a3f100-67d9-11eb-896e-ddfd3c20db30.png)

이제 SDK를 사용해서 페이스북과 마찬가지로 유저 정보를 카카오로부터 가져올 것이다.

[카카오 로그인 공식문서](https://developers.kakao.com/docs/latest/ko/getting-started/sdk-js)

이곳에서 따라하면 설정할 수 있다. 내가 처음에 사용했던 방법은 간단하게 생각해서 vue 의 public 디렉토리 밑 index.html에 link 를 담아서 사용하면 어떨까? 생각했다. 실제로 그렇게 개발하기도 했고. 중간에 index.html에 link 태그로 선언해둔다면 모든 페이지에서 카카오 관련 sdk가 불러와지는 것 아닌가? 그러면 리소스 낭비이고 이런 링크가 늘어갈 수록 어플리케이션 **전반에 성능 이슈**가 생길 수 있겠다는 생각이 들었다. 그래서 찾았던 것은 해당 vue 컴포넌트에서만 link를 불러오는 방법을 찾았다. 바로 `LoadScript` 라는 녀석이다.

#### LoadScript

[LoadScript 사용법](https://berrrrr.github.io/programming/2020/09/15/vue-script-load/) 이곳에서 간단하게 loadScript를 설치하고 사용했다. npm install 후, main.js에 등록해주고, create() 라이프사이클 메서드에서 사용했다.

```js
this.$loadScript(`https://developers.kakao.com/sdk/js/kakao.js`).then(() => {
  if (!window.Kakao.isInitialized()) this.$Kakao.init();
});
```

이런 식으로 사용한다. return 타입은 Promise고 then으로 이어서 사용한다. window.Kakao.isInitalized() 함수는 앞으로 js에 설정해줄 kakao의 init() 함수가 실행되어 프로그램이 로드되어 있는가를 판단해주는 메서드다. $Kakao.init 은 페이스북과 마찬가지로 plugin으로 이어준 것인데 Kakao.js 파일을 살펴보도록 하자.

#### Kakao.js

```js
import { socialLogin, socialSignup } from '@/utils/social';

const Kakao = {
  init() {
    window.Kakao.init(process.env.VUE_APP_KAKAO_APP_KEY);
    return true;
  },

  getInfo(authObj, division) {
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: async res => {
        console.log(res);
        const kakao_account = res.kakao_account;
        const req = {
          id: res.id,
          name: kakao_account.profile.nickname,
          email: kakao_account.email,
          picture: kakao_account.profile.profile_image_url,
          social: 'Kakao',
        };
        if (division === 'login') {
          socialLogin(req);
        } else {
          socialSignup(req);
        }
      },
      fail: error => {
        console.log(error);
      },
    });
  },

  login() {
    window.Kakao.Auth.login({
      scope: 'profile, account_email',
      success: authObj => {
        this.getInfo(authObj, 'login');
      },
      fail: error => console.log(error),
    });
  },

  signup() {
    window.Kakao.Auth.login({
      scope: 'profile, account_email',
      success: authObj => {
        this.getInfo(authObj, 'signup');
      },
      fail: error => console.log(error),
    });
  },

  logout() {
    window.Kakao.Auth.logout(res => {
      if (!res) return console.log(error);
      social_logout();
    });
  },
};

export default Kakao;
```

Facebook.js와 별반 차이 없다. init() 메서드에서 `process.env.VUE_APP_KAKAO_APP_KEY` 이 부분은 아까 긁어둔 Javascript 키를 env 파일에 저장해두고 불러온 것이다. getInfo() 메서드에 매개변수로 division을 둔 이유는 역시 getInfo 부분이 로그인과 회원가입에서 카카오로부터 유저 정보를 가져오는 로직이 겹치므로 분기로 구분하기 위한 구분 값으로 넣어주었다.

로그인을 시도하면

<img width="906" alt="스크린샷 2021-02-05 오후 6 10 06" src="https://user-images.githubusercontent.com/59427983/107013323-8adb6700-67dd-11eb-96ac-968696d2846c.png">

이렇게 정보를 잘 불러온다. 이걸 이제 등록해주면 되는 것임. 페이스북에서와 마찬가지로 소셜 공통 API 에서 사용한 것을 소스 상으로 볼 수 있다.

<br/>

### 구글 로그인

자, 마지막 구글 로그인이다.

#### 구글 서비스 등록

[Google Console](https://console.cloud.google.com) 해당 페이지 이동한다.

![스크린샷 2021-02-05 오후 6 50 01](https://user-images.githubusercontent.com/59427983/107017902-1efbfd00-67e3-11eb-878a-07b4a548e92d.png)

프로젝트 선택을 누르고 새 프로젝트를 누른다. 프로젝트 이름을 만들자.

![스크린샷 2021-02-05 오후 7 23 04](https://user-images.githubusercontent.com/59427983/107021591-ae0b1400-67e7-11eb-812b-fbba90a6d8c1.png)

API 및 서비스를 눌러서 들어가고, 또 왼쪽 탭에 사용자 인증정보를 눌러서 사용자 인증 정보를 만들자. 몇 메뉴 중에 OAuth 클라이언트 ID 를 누르자.

<img width="562" alt="스크린샷 2021-02-05 오후 7 28 18" src="https://user-images.githubusercontent.com/59427983/107022415-b44dc000-67e8-11eb-9fc3-65c6b5e43501.png">

그리고,

<img width="559" alt="스크린샷 2021-02-05 오후 7 30 15" src="https://user-images.githubusercontent.com/59427983/107022457-c2034580-67e8-11eb-82f6-a3c0a68a06d1.png">

이름을 정해주고, 승인된 리디렉션에 localhost 를 적어주자.

<img width="529" alt="스크린샷 2021-02-05 오후 7 32 32" src="https://user-images.githubusercontent.com/59427983/107022773-22928280-67e9-11eb-8c2f-ffb25f96449a.png">

이런 클라이언트 ID와 보안 비밀번호가 나온다. 잘 기록해두자. 그리고 다시 왼쪽에

<img width="255" alt="스크린샷 2021-02-05 오후 7 35 17" src="https://user-images.githubusercontent.com/59427983/107022933-4d7cd680-67e9-11eb-9b9f-85a0571342aa.png">

OAuth 동의 화면을 눌러서 승인된 도메인 부분에 http://localhost:8080 을 적어주자. 이제 연동할 차례다.

#### npm vue-google-login

```shell
$ npm i vue-google-login
```

간단하게 가기 위해서 이번엔 그냥 모듈을 다운받아서 연동시키겠다.

```html
<GoogleLogin class="external_item" :params="googleParams" :onSuccess="googleSuccess">
  <img src="@/assets/user/logo/google.png" />
  <b> Continue with Google</b>
</GoogleLogin>
```

GoogleLogin 태그를 사용하면 바로 기능이 연동된다. vue 파일의 template 태그 안에 넣어주면 된다. img와 b태그는 내가 임의로 넣은 것이고, :onSuccess와 :params 값을 정의해서 넣어주기만 하면 된다.

```js
googleParams: { client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID },
```

```js
async googleSuccess(googleUser) {
	if (localStorage.getItem('user_token')) {
		alert('이미 로그인 되어 있습니다.');
		this.$router.push('/main');
	} else {
		this.$Google.login(googleUser);
	}
},
```

이렇게 $Google로 되어있다. Google.js 파일을 만들어야겠지?

#### Google.js

```js
import { socialLogin, socialSignup } from '@/utils/social';

const Google = {
  makeReq(googleUser) {
    return new Promise((resolve, reject) => {
      const req = {
        name: googleUser.Fs.sd,
        id: googleUser.Fs.lt,
        email: googleUser.Fs.lt,
        picture: googleUser.Fs.wI,
        social: 'Google',
      };
      resolve(req);
    });
  },

  login(googleUser) {
    this.makeReq(googleUser).then(req => {
      socialLogin(req);
    });
  },

  signup(googleUser) {
    this.makeReq(googleUser).then(req => {
      socialSignup(req);
    });
  },
};

export default Google;
```

제일 간단하다. makeReq() 메서드로 받아온 googleUser를 소셜 공통 API로 넣어주면 끝. vue-google-login 모듈 때문이다.

소셜 로그인 기능은 끝이 났다. 이제 SpringBoot에서 JWT를 vue에게 return 해주었는데 관리하는 방법과 함께 LocalStorage 와 Axios 인터셉터로 api를 주고받는 기능에 대해서 포스팅 할 것이다.

<hr/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)