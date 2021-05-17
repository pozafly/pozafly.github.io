---
layout: post
title: '(3) Vue init & ESLint, Prettier 설정'
author: [Pozafly]
tags: [Tripllo 제작기, Vue.js]
image: ../img/tripllo/tripllo3.png
date: '2021-02-03T19:03:47.149Z'
draft: false
excerpt: 백엔드 Setting은 끝났으니 이제 프론트엔드 Setting이 필요하다. npm 으로 Vue를 생성하고, 코드 포맷터인 ESLint, Prettier 설정을 해보자.
---

> 백엔드 Setting은 끝났으니 이제 프론트엔드 Setting이 필요하다. npm 으로 Vue를 생성하고, 코드 포맷터인 ESLint, Prettier 설정을 해보자.

## npm 세팅

`npm`(Node Package Manager)은 node.js에서 사용하는 모듈을 패키지로 만들어 배포하고 다른 이들과 함께 공유할 수 있는 도구다. 여러가지 프레임워크를 다운받을 수 있는 도구. 그리고 npm에는 버전에 따라 프레임워크 모듈이 간 호환성 문제가 발생하므로 `nvm`(Node Version Manager)을 먼저 다운받아 npm 버전을 관리할 수 있다.

- 맥에서 nvm 다운받기

```shell
$ brew install nvm
```

그리고 나는 zsh를 사용하므로 .zshrc 파일에 설정을 추가해주어야 한다. 터미널에서 `vi ~/.zshrc` 명령어로 파일에 접근후 아래와 같은 설정을 해주자.

```shell
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

<img width="960" alt="스크린샷 2021-02-04 오후 1 06 03" src="https://user-images.githubusercontent.com/59427983/106843711-065bec00-66ea-11eb-9086-31150dcd5c62.png">

:wq 로 저장 후 빠져나와서

```shell
$ nvm install node
또는 버전을 지정하고 싶다면
$ nvm install 6
```

이렇게 자신이 사용하고 싶은 node 버전을 다운받아주자. 버전을 확인하고 싶으면 $ npm -v 하면된다. 자세한 사용법은 [여기](https://www.lesstif.com/javascript/nvm-node-version-manager-nodejs-82214944.html)로.

<br/>

## Vue 설치

먼저 Vue CLI(Command-line interface) 가 필요하다. Vue CLI는 Vue.js 개발을 위한 시스템으로 Vue.js Core에서 공식으로 제공하는 CLI이다.

자세한건 [공식 Vue-cli](https://kr.vuejs.org/v2/guide/installation.html).

```shell
$ npm install -g @vue/cli
```

cli가 설치 되었으면 이제 Vue 프로젝트를 생성해보자.

```shell
$ vue create <프로젝트명>
```

그러면 터미널에 아래와 같이 Vue 프로젝트의 초기 세팅 화면이 나온다.

![스크린샷 2021-02-04 오후 1 49 04](https://user-images.githubusercontent.com/59427983/106846199-cc8de400-66ef-11eb-80de-5e8ca4749e03.png)

우리는 커스텀을 해줄 것이기 때문에 `Manually select features` 를 선택해주자.

![스크린샷 2021-02-04 오후 1 55 33](https://user-images.githubusercontent.com/59427983/106846676-aa489600-66f0-11eb-8825-3ccbb6bb584e.png)

이런 화면이 뜰껀데 선택되어있는 것으로 넘어가자. Router나 Vuex는 따로 설치할 예정. 참고로 선택하는 것은 화살표로 커서를 움직여서 스페이스바를 누르면 선택된다. 다음 화면에서는 `2.x` 버전은 선택하자. Vue 3는 작년에 2버전에서 업데이트 되었는데 사용법을 아직 잘 모르니 패스..

![스크린샷 2021-02-04 오후 2 02 46](https://user-images.githubusercontent.com/59427983/106847153-b2550580-66f1-11eb-8468-e90d13efed2a.png)

이번에는 코드 포맷터를 선택하는 란인데 우리는 `ESLint + Prettier`를 선택해주자. 그리고 다음 페이지에서 `Lint on save`선택.

![스크린샷 2021-02-04 오후 2 05 12](https://user-images.githubusercontent.com/59427983/106847309-04962680-66f2-11eb-9573-824f4c8588a9.png)

이번에는 우리가 선택한 Babel, ESLint ... 등을 package.json으로 설정할 것인지 config 파일로 빼서 설정할 것인지를 선택하는 화면인데 우리는 `In dedicated config files`를 선택하자. 그러면 Save this as a preset for future projects? 라고 우리가 설정한 포맷을 다음에 사용하도록 저장하는 화면이 나오는데 `N`을 입력해주자.

![스크린샷 2021-02-04 오후 2 08 12](https://user-images.githubusercontent.com/59427983/106847536-72425280-66f2-11eb-9077-0bdf52664190.png)

요렇게 설치 되는 모습을 볼 수 있고, 설치가 완료되면 프로젝트명으로 된 폴더가 생성되고 vue가 설치되어있다. 해당 폴더로 이동 후 `npm run serve`명령을 내리고 localhost:8080으로 가보면 Vue가 실행된 모습을 볼 수 있다.

<br/>

## VSCode 설정

사용한 VSCode 플러그인은 다음과 같다.

- vetur(뷰 확장 플러그인)
- Vue VSCode Snippets(뷰 코드 스니펫)
- ESLint, TSLint(문법검사)
- Live Server(라이브로딩 서버)
- 나머지 : Prettier, Project Manager, Auto Close Tag, GitLens, Atom Keymap, Jetbrains IDE Keymap 등

단, `ESLint`와 `Prettier` 플러그인은 밑에서 설정하면서 따로 깔 것이기 때문에 나중에 깔도록 하자.

### local Vue 화면에 에러코드 보이지 않게 하기

만약 vue를 개발하다가 오류가 있는 코드를 치고 저장했을 시

![스크린샷 2021-02-04 오후 2 56 43](https://user-images.githubusercontent.com/59427983/106851327-5e4e1f00-66f9-11eb-8c2b-6958da96e83c.png)

이런 화면을 브라우저 상에서 볼 수 있을 것이다. 이게 상당히 거슬리기 때문에 에러가 나는 코드를 쳐도 브라우저상에서 표시되지 않도록 설정하겠다.

1. vscode 최상단에 `vue.config.js`파일을 만들자
2. 아래의 코드를 vue.config.js에 작성하자.
3. ctrl + c로 지금 돌고 있는 서버를 끄고, 다시 npm run serve로 켜주자.

```js
module.exports = {
  devServer: {
    overlay: false, // 여기서 overlay: false는 오류를 더이상 화면에 표시하지 않겠다는 말임.
  },
};
```

### Code Formatter(ESLint, Prettier 설정)

ESLint, Prettier를 이용해서 코드 스타일을 획일화 하는 작업(코딩 컨벤션 자동 설정)을 할 것이다. 협업을 하거나 혼자 개발하더라도 가독성이 좋아지려면 이 컨벤션을 지켜서 개발하는 것이 훨씬 유용하다. 그리고 저장할 때 자동으로 컨벤션을 맞춰주기 때문에 이게 없으면 개발이 안될 정도로 너무 편하다.

예를들어서 이런 것이다. 소스를 작성하고 저장했을 때, 개행이라던지, 세미콜론 이라던지 "" '' 라던지 코드 형식을 정해서 사용할 수 있는게 prettier다. 이걸 .prettierrc 이라는 설정파일을 새로 만들어서 설정해도 되지만, ESLint에 설정하도록 한다. 이유는 prettier와 ESLint가 충돌이 날 수 있기 때문에 따로 빼서 설정하는것이 아니라 .eslintrc.js 파일에 작성해준다.

vscode에 eslint 플러그인을 깔자. 그리고 먼저 생성되어 있는(없으면 최 상단 루트에 만들자) .eslintrc.js 파일에 들어가보자.

<img width="668" alt="제목 없는 그림" src="https://user-images.githubusercontent.com/59427983/106852373-4b3c4e80-66fb-11eb-9cdd-0b44c6935f0d.png">

사진과 같이 rules 안에

```js
"prettier/prettier": ['error', {
	printWidth: 80
}]
```

이렇게 작성해보자. 의미는 80자가 넘으면 error를 뱉어라 이다.

우리는

```js
"prettier/prettier": ['error', {
	singleQuote: true,
	semi: true,
	useTabs: true,
	tabWidth: 2,
	trailingComma: 'all',
	printWidth: 80,
	bracketSpacing: true,
	arrowParens: 'avoid',
}]
```

이렇게 적어줄 것이다. 그렇게 하면 이제 prettier에서 우리의 문법과 코드 컨벤션을 검사해주고 error를 내줄 것이다.(서버 껐다켜야 함.) 그러면 이제 이것을 ESLint가 받아서 알아서 수정해주는 역할을 해줄껀데 vscode 플러그인으로 깔아둔 ESLint를 설정창에서 검색해보자.

<img width="642" alt="제목 없는 그림1" src="https://user-images.githubusercontent.com/59427983/106852782-f6e59e80-66fb-11eb-8427-a5d9a1b06e31.png">

이게 ESLint에서 지원하는 언어들이고, vue 가 없다면 항목 추가버튼을 눌러서 추가해주자.

<img width="768" alt="제목 없는 그림2" src="https://user-images.githubusercontent.com/59427983/106852832-0ebd2280-66fc-11eb-8805-898cb0101eaf.png">

그리고 여기서 settings.json에서 편집 을 눌러서 직접 settings.json에서 편집해주어야 한다.

<img width="505" alt="제목 없는 그림3" src="https://user-images.githubusercontent.com/59427983/106852875-23011f80-66fc-11eb-9fc9-c90fa20caf70.png">

이런 그림이 뜰텐데 eslint.validate 란에다가 직접 적어주자.

```js
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.alwaysShowStatus": true,
"eslint.workingDirectories": [{
    "mode": "auto"
}],
"eslint.validate": [{
        "language": "vue",
        "autoFix": true
    },
    {
        "language": "javascript",
        "autoFix": true
    },
    {
        "language": "javascriptreact",
        "autoFix": true
    },
    {
        "language": "typescript",
        "autoFix": true
    },
    {
        "language": "typescriptreact",
        "autoFix": true
    },
]
```

autoFix를 true로 해준다는 것은 알아서 고쳐주겠다는 뜻이된다.

이번에는 Prettier 플러그인을 깔고,

<img width="365" alt="제목 없는 그림4" src="https://user-images.githubusercontent.com/59427983/106852981-504dcd80-66fc-11eb-8d47-d70fe2fd4351.png">

사진과 같이 사용안함(작업영역)을 선택해주자. 그리고, 설정에 들어가서 `format on save` 로 검색하여 체크 해제 해야한다. 왜냐면 eslint로 정렬을 할지 vscode에서 포매팅이 들어갈지 충돌날 수 있기 때문에.

<img width="917" alt="제목 없는 그림5" src="https://user-images.githubusercontent.com/59427983/106853578-49738a80-66fd-11eb-8bdc-ba9d2246957f.png">

그리고, 아래 그림과 같이

<img width="106" alt="제목 없는 그림6" src="https://user-images.githubusercontent.com/59427983/106853614-58f2d380-66fd-11eb-8965-1d7781ae775a.png">

vscode 최하단 오른쪽에 보면 ESlint 에 빨간색으로 X자가 되어있다면 이거 켜줘야 한다. 위의 그림처럼.

내용은 [캡틴판교님 사이트](https://joshua1988.github.io/web-development/vuejs/boost-productivity/)에 가면 확인할 수 있다.

<br/>

### vue 파일 내 경로 가독성 좋게 설정하기

vue 파일에서 다른 vue 파일이나 js 파일을 import 할 때, 원래는

```js
import CardModalBase from '../../components/card/cardDetail/CardModalBase';
```

이것을

```js
import CardModalBase from '@/components/card/cardDetail/CardModalBase';
```

이렇게 @ 를 사용하여 src를 나타내어 표현하게 할 수 있다. 유지 보수 시에도 일일이 경로를 찾아가는 번거로움을 조금이나마 줄여줄 수 있다.

프로젝트 최상단에서 `jsconfig.json` 파일을 생성하자.

```json
{
  "compilerOptions": {
    "baseUrl": ".", // 새로운 폴더로 들어와서 작업
    "paths": {
      "~/*": [
        // ~
        "./*"
      ],
      "@/*": [
        // @는 src 라는 뜻이 된다.
        "./src/*"
      ]
    }
  },
  "exclude": [
    // 컴파일 되지 않는 폴더들
    "node_modules",
    "dist"
  ]
}
```

이렇게 설정해주면 된다. 그러면 프론트엔드 Vue 쪽 세팅이 모두 끝났다.

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)