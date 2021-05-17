---
layout: post
title: '(6) 로그인3 -vue 구현'
author: [Pozafly]
tags: [Tripllo 제작기, Vue.js]
image: ../img/tripllo/tripllo6.png
date: '2021-02-05T07:03:47.149Z'
draft: false
excerpt: SpringBoot 쪽 서비스 로직이 만들어졌으므로 이번엔 vue에서 화면을 만들고 회원가입과 로그인을 진행해보자. 우리는 vue의 기능을 최대한 살려서 뼈대가 되는 페이지 하나에 login과 signup 2개의 컴포넌트를 붙이고 watch를 활용해 데이터를 검증할 것이다.
---

> SpringBoot 쪽 서비스 로직이 만들어졌으므로 이번엔 vue에서 화면을 만들고 회원가입과 로그인을 진행해보자. 우리는 vue의 기능을 최대한 살려서 뼈대가 되는 페이지 하나에 login과 signup 2개의 컴포넌트를 붙이고 watch를 활용해 데이터를 검증할 것이다.

![1113](https://user-images.githubusercontent.com/59427983/107032048-83748780-67f6-11eb-82a0-610a4d442113.gif)

## vue-router

```js
// routes/index.js

{
      // 중첩된 라우트 : 한 페이지에 url에 따라서 다른 컴포넌트를 보여야 할 때 사용.
      path: '/auth',
      redirect: '/auth/login',
      component: () => import('@/views/AuthPage'),
      children: [
        {
          path: 'login',
          component: () => import('@/components/auth/LoginForm'),
        },
        {
          path: 'signup',
          component: () => import('@/components/auth/SignupForm'),
        },
        {
          path: 'findPassword',
          component: () => import('@/components/auth/FindPassword'),
        },
      ],
    },
```

먼저 라우터 설계부터 해주자.

- path는 [domain]/auth 라고 url을 vue에게 요청하면 vue는 /auth/login 으로 가장 먼저 리다이렉트 해준다.

- children에 배열로 login과 signup, findPassword 가 있다. 뼈대 Page에 \<router-view> 태그로 뿌려질 컴포넌트들이 선언되어 있는 것.
- 그리고 여기서 보면 알겠지만 보통 import 구문을 routes/index.js 파일 맨 윗쪽에 놓고 component에다 쓰지만 여긴 화살표 함수 뒤에 적혀있다. 이는 vue-router의 `lazy loading`이란 기법이다. 해당 url로 라우팅 되었을 때 로드해준다. 프로젝트 규모가 커졌을 때 첫 로딩이 길어지지 않도록 하는 것.

<br/>

## 뼈대 Page

### AuthPage.vue

```html
<template>
  <div class="page">
    <header>
      <ul class="header-wrap" @click="goMain">
        <li><awesome icon="suitcase" class="fas fa-suitcase"></awesome></li>
        <li><span class="title">Tripllo</span></li>
      </ul>
    </header>
    <div class="main-wrap">
      <main>
        <router-view></router-view>
      </main>
      <aside>
        <a href="" @click.prevent="$router.push('/privacy')">Privacy Policy</a>
      </aside>
    </div>
    <footer />
    <div class="back">
      <img class="back item1" src="@/assets/user/back/1.png" />
      <img class="back item2" src="@/assets/user/back/2.png" />
    </div>
  </div>
</template>

<script>
  import Footer from '@/components/common/Footer';

  export default {
    components: { Footer },
    methods: {
      goMain() {
        this.$router.push('/main');
      },
    },
    created() {
      this.$loadScript(`https://developers.kakao.com/sdk/js/kakao.js`).then(() => {
        if (!window.Kakao.isInitialized()) this.$Kakao.init();
      });
      this.$Facebook.init();
    },
  };
</script>
```

뼈대 Page는 이렇게 생겼다. \<router-view>\</router-view> 이 부분이 router에서 설계한 child 컴포넌트들이 뿌려질 곳이다. created() 메서드에는 이 다음에 포스팅 할 소셜 로그인 기능을 위해 둔 것.

<br/>

## 회원가입 컴포넌트

### SignupForm.vue

SignupForm.vue와 LoginForm.vue는 비슷한 로직으로 되어있어 SignupForm.vue 만 둘러보면 LoginForm.vue는 보지 않아도 된다.

살펴보자.

#### ID 사용여부 체크

![스크린샷 2021-02-05 오후 12 00 49](https://user-images.githubusercontent.com/59427983/107036121-76f32d80-67fc-11eb-84e3-970fddffbc54.png)

사진과 같이 실시간으로 ID가 사용되고 있는지 여부를 체크해주면 좋겠다고 생각했다. 하지만 입력 이벤트가 일어날 때마다 백엔드로 http call을 보내면 쓸데없는 자원낭비라는 생각이 들었다. 여기다가 setTimeout 을 걸어줄까? 도 생각했지만 예전에 지나가다가 봤던 **lodash**의 `debounce` 를 사용해보기로 했다. setTimeout 은 설정한 시간이 흐른 후에 실행 되므로, 클라이언트가 타이핑 하고 나서 시간이 흐른 뒤 모든 http call을 요청했다. 하지만 lodash의 debounce는 시간을 설정하고 시간 내에 새로운 event가 일어나면 이전 것은 무시되고 제일 **마지막 한번이 동작**하게 되어 http call에 적합했다.

※ 사실 lodash는 배열과 객체를 다루는데 좋은 라이브러리라고 한다.. npm으로 lodash를 다운받고 import해서 아래와 같이 사용했다.

```html
<script>
  import _ from 'lodash';
  ...

  export default {
    data() {
      return {
        userData: {
          id: '',
        	...
        }
        push: {
          pushYn: false,
          message: '',
        },
        ...
      };
    },
    watch: {
  		...
      'userData.id': _.debounce(function(e) {
        this.validUserId(e);
      }, 750),
      ...
    },
    methods: {
      ...mapActions(['VALID_ID']),
      ...
      async validUserId(id) {
        ...
        try {
          await this.VALID_ID(id);
          this.push.pushYn = false;
        } catch ({ response }) {
          this.pushInsert(response.data.message);
        }
      },
      ...
    },
  };
</script>
```

생략되어 있지만 input 태그에 v-model로 userData의 id가 연동되어 있다. vue의 watch로 userData객체 안에 있는 id를 바라보게 하고(watch는 싱글 커테이션 `'` 으로 객체 안의 변수 하나를 캐스팅할 수 있다), 이 녀석에게 data 입력 이벤트가 일어나서(정확히는 data에 값이 입력되어서) watch로 감지되면 debounce가 실행되는 구조이다. 0.75초 이내에 다시 이벤트가 일어나면 다시 0.75 초를 기다려준 후 이벤트가 없을 시 이어지는 function이 실행된다.

methods에 있는 validUserId()는 입력된 userData.id 를 가지고 action 함수를 통해 http call을 날리고 MySQL에 접속해 해당 유저의 ID가 사용되고 있는지를 판별하여 다시 값을 돌려준다.

만약 사용되고 있다면, SpringBoot에서는

```java
message.setStatus(StatusEnum.BAD_REQUEST);
message.setMessage(ResponseMessage.ALREADY_USE);
message.setData(null);

return new ResponseEntity<>(message, headers, HttpStatus.UNAUTHORIZED);
```

이렇게 ALREADY_USE(이미 사용되고 있습니다) 라는 메세지를 가져오고, catch 절에 걸려 화면에 뿌려지게 되는 구조다.

#### 입력 폼 Validation

입력폼에 Validation이 빠지면 잘못된 정보가 입력될 수도 있으므로 utils에 validation.js를 만들어주기로 했다.

```js
// utils.validaction.js
function validateId(id) {
  const re = /^[a-z]+[a-z0-9]{5,19}$/g;
  return re.test(String(id));
}

function validatePw(pw) {
  const num = pw.search(/[0-9]/g);
  const eng = pw.search(/[a-z]/gi);
  const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  let message = '';

  if (pw.length < 5 || pw.length > 20) {
    message = '비밀번호는 5자리 ~ 20자리 이내로 입력해주세요.';
    return [false, message];
  } else if (pw.search(/\s/) != -1) {
    message = '비밀번호는 공백 없이 입력해주세요.';
    return [false, message];
  } else if (num < 0 || eng < 0 || spe < 0) {
    message = '비밀번호는 영문,숫자, 특수문자를 혼합하여 입력해주세요.';
    return [false, message];
  } else {
    return [true, ''];
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export { validateId, validatePw, validateEmail };
```

3개의 function으로 이루어져있고 정규 표현식을 사용해 검증해준다. (사실 긁어왔다. 정규표현식이 뭔지는 대충 아는데 사용법은 잘모름....)

이걸 이제 SignupForm.vue에다가 import 해와서 사용할 것이다.

```html
<script>
  ...
  import { validateId, validatePw, validateEmail } from '@/utils/validation';

  export default {
    data() {
      return {
        userData: {
          id: '',
          password: '',
          email: '',
          name: '',
        },
        againPassword: '',
  			...
      };
    },
    watch: {
      ...
      'userData.password': _.debounce(function(e) {
        this.validatePw(e);
      }, 750),
      againPassword: _.debounce(function(e) {
        this.validateAgainPw(e);
      }, 750),
      'userData.email': _.debounce(function(e) {
        this.validateEmail(e);
      }, 750),
    },
    methods: {
      ...mapActions(['SIGNUP', 'LOGIN', 'VALID_ID']),
      ...
      validatePw(pw) {
        let pwValid = validatePw(pw);
        if (!pwValid[0]) {
          this.pushInsert(pwValid[1]);
        } else {
          this.push.pushYn = false;
        }
      },
      validateAgainPw(pw) {
        const realPw = this.userData.password;
        const againPw = this.againPassword;
        if (realPw !== againPw) {
          this.pushInsert('다시 입력한 비밀번호가 같지 않습니다.');
        } else {
          this.push.pushYn = false;
        }
      },
      validateEmail(email) {
        if (!validateEmail(email)) {
          this.pushInsert('이메일 유형에 맞지 않습니다.');
        } else {
          this.push.pushYn = false;
        }
      },
      pushInsert(message) {
        this.push.pushYn = true;
        this.push.message = message;
      },
      ...
    },
  };
</script>
```

이렇게 아까와 같은 방식으로 debounce를 사용했고, validation.js에서 가져온 정규표현식으로 여기가 검증된다. 만약 검증되지 않았다면 push.message로 메세지가 들어가서 위에 표현되겠다. againPassword는 js에서 가져오지 않고 내부 methods를 사용했다.

<br/>

#### Button 활성화

모든 Form 값이 입력되었을 때 버튼이 초록색으로 활성화 되도록 하고 싶었다. 또, 하나의 값이라도 들어왔을 때, 소셜 로그인 버튼들을 보이지 않게끔 처리하고 싶었다.

```html
<button class="submit-item btn" type="submit" :disabled="btnDisabled">
  <b>Log in</b>
</button>
```

이렇게 :disable 을 걸어주고 btnDisabled에는 초깃값은 true로 비활성화이며, 모든 값이 찼을 때는 false로 활성화를 시켜줬다. 색 변경은 css로..

```html
<script>
  ...
  export default {
    data() {
      return {
        userData: {
          id: '',
          password: '',
          email: '',
          name: '',
        },
        ...
        btnDisabled: true,
        isSocialForm: true,
      };
    },
    watch: {
      userData: {
        handler(e) {
          e.id === '' && e.password === '' && e.email === '' && e.name === ''
            ? (this.isSocialForm = true)
            : (this.isSocialForm = false);

          e.id !== '' && e.password !== '' && e.email !== '' && e.name !== ''
            ? (this.btnDisabled = false)
            : (this.btnDisabled = true);
        },
        deep: true,
      },
      ...
    },
    methods: {
     ...
    }
  };
</script>
```

isSocialForm은 v-if 처리해주었음. vue의 data에 userData가 객체 형태로 존재하는 것을 볼 수 있다.

```js
watch: {
    userData(): {
      ...
    },
}
```

보통 이렇게 watch안에 감시하고 싶은 변수를 적는데 이렇게 적게되면, userData객체 안의 값이 하나라도 변경 되면 내부 로직이 실행되므로 적합하지 않다. 따라서, watch의 객체 `내부를 감시`하도록 하는 로직이 필요했다. 위와 같이 `deep: true`와 `handler`를 통해서 구현해 줄 수 있다.

<hr/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)