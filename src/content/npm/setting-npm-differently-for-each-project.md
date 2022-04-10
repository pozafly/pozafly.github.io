---
layout: post
title: 'nvm을 사용해 프로젝트별로 Node.js 버전 다르게 사용하기'
author: [Pozafly]
tags: [NPM, AutoMation]
image: ../img/npm/node-version-manager.webp
date: '2022-04-10T12:13:47.149Z'
draft: false
excerpt: NVM을 사용해 프로젝트 별로 Node.js 버전 지정을 자동화 해보자.
---



nvm이란, **N**ode **V**ersion **M**anager로, Node.js의 버전을 관리하는 도구다. 시스템에 여러 개의 Node.js를 설치하고 사용할 버전을 쉽게 전환할 수 있도록 도와주는 유틸이다. 이는 쉘(sh, dash, ksh, zsh, bash) 별로 호출되도록 설계되었다.

프레임워크 혹은 라이브러리는 Node.js 버전에 맞게 설치가 되며, 새롭게 프로젝트를 받아 세팅할 경우, 프로젝트 생성 시 사용했던 Node.js 버전이 다르면 `$ npm install` 명령어를 입력해도 오류가 날 경우가 생긴다.

따라서 NVM을 사용하면 컴퓨터에 여러 버전의 Node.js를 설치할 수 있고, 또 쉽게 변경도 할 수 있다. 오늘 가볍게 포스팅할 것은 NVM의 alias 기능과, 프로젝트 별로 Node.js 버전을 고정할 수 있는 방법을 알아본다. 프로젝트 별로 버전을 매번 번거롭게 바꿔주어야 했다면 간단한 쉘 스크립트로 이를 자동화 할 수 있다.

<br/>

<br/>

## NVM 설치 및 세팅

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

[NVM](https://github.com/nvm-sh/nvm) 문서에 나와있는대로 터미널에 입력해주자. 

그리고 노드 최신 버전도 설치해주자.

```bash
$ nvm install node
```

여기서 **node**란, Node.js의 최신 버전에 대한 별칭이다. 따라서, 내가 원하는 버전의 Node.js를 설치하고 싶다면,

```bash
$ nvm install 14.7.0
```

이렇게 버전을 명시해준다. `$ nvm install` 명령어로 설치했다면 방금 설치한 버전이 사용될 것이다. 다른 버전으로 변경하기 위해서는 **use** 명령어로 쉘에서 사용하겠다고 명시해주어야 해당 버전을 사용할 수 있다.

```bash
$ nvm use 14.7.0
```

또, 현재 어떤 버전이 배포되어 있고 어떤 버전이 사용가능한지 알기 위해서는 아래 명령어로 확인 가능하다.

```bash
$ nvm ls-remote
```

내 컴퓨터에 어떤 버전이 설치되있는지 확인하기 위해서는 아래 명령어를 사용하면 된다.

```bash
$ nvm ls
or
$ nvm list
```

<img width="386" alt="스크린샷 2022-04-10 오후 5 23 17" src="https://user-images.githubusercontent.com/59427983/162609562-b3223d43-e391-4f74-8153-5656ff5116f4.png">

지금 사용되고 있는 버전은 16.13.1이고, 위로는 내 컴퓨터에 깔려있는 Node.js 버전들을 말해준다.

여기서 볼 점은 `default -> ` 로 명시된 부분인데, default로 Node.js 버전을 16.13.1로 사용하게 되어있다. 즉, 터미널을 열 때마다 16.13.1 버전을 사용하도록 되어있다.

가장 처음 NVM을 정의할 때 언급했던 NVM의 설계 철학은, 쉘 별로 Node.js 버전을 다르게 가져가도록 되어있다는 것이다.

<br/>

<br/>

## NVM alias

Node.js 버전에 별칭을 줄 수 있다. 별칭은 Node.js 버전에 별칭을 주어 쉽게 관리할 수 있도록 해준다. 또한, default로 지정된 Node.js 버전은 터미널을 닫았다가 다시 열였을 때(shell session이 새로 생성되었을 때), default로 지정된 버전이 적용된다.

현재 사용된 버전을 default로 지정하고 싶다면 alias default 명령어로 지정해줄 수 있다.

```bash
$ nvm alias default system
```

터미널을 다시 시작해보면 default로 지정한 Node.js 버전이 실행될 것이다. 또 다른 별칭을 주는 것도 가능하며, 별칭을 삭제할 수도 있다. 아래는 원하는 버전에 pozafly라는 별칭을 준 예제이다.

```bash
// 별칭 지정
$ nvm alias pozafly

// 별칭 삭제
$ nvm unalias pozafly

// 별칭으로 지정된 버전 사용하기
$ nvm use pozalfy
```

<br/>

<br/>

## 프로젝트 별 Node.js 버전 강제하기

프로젝트마다 Node.js 버전이 다르다면 다시 터미널을 열고 nvm use 명령어를 통해 지정된 버전 혹은 별칭을 매번 입력해주어야 한다. 물론 default alias system 로 버전 한 개를 지정할 수 있지만, 관리하고 있는 프로젝트가 여러개라면 매번 use 명령어를 입력해주어야 하는 상황이 발생한다.

이 때는 **.nvmrc** 파일을 프로젝트의 루트 디렉토리에 생성해서 맞는 버전을 기록해두면 된다.

<img width="216" alt="image" src="https://user-images.githubusercontent.com/59427983/162609918-ef4008a4-c718-4e1a-9db6-7209500211aa.png">

이렇게 파일을 생성해두고, Node.js 버전을 기록해두자.

<img width="222" alt="image" src="https://user-images.githubusercontent.com/59427983/162609948-033ab829-fc50-41aa-b2fb-5957f4224aa3.png">

이제 터미널을 열고 `nvm use` 명령어만 쳐주면 해당 버전이 적용되는 것이다. 그런데 이 또한 번거롭다. `.nvmrc` 파일을 만들었지만, default alias system 로 지정한 버전이 가장 먼저 적용될 것이고, 다시 `nvm use` 명령어로 Node.js 버전을 한번 더 적용시켜주어야만 하기 때문이다.

[NVM](https://github.com/nvm-sh/nvm#nvmrc) 문서에 따르면 `$ nvm use` 명령어는 프로젝트 루트 디렉토리(도는 모든 상위 디렉토리)에서 .nvmrc 파일을 찾고, 파일 안 노드 버전을 참조한다고 한다. 따라서, 터미널을 실행시킬 때 자동으로 `$ nvm use` 명령어를 실행시키도록 하면 된다. [avn](https://github.com/wbyoung/avn) 이라는 패키지를 사용해도 좋지만, 나는 더 가볍게 동작하게 하기 위해서 쉘 설정을 추가해주도록 했다.

nvm을 이용하는 많은 사람들이 나와 같은 문제를 생각했는지 좋은 스크립트를 만들어서 공유중이었다. 나는 zsh shall을 이용하기 때문에 `.zshrc` 파일에 아래 내용을 입력해주었다.

`$ vim ~/.zshrc`

```shell
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

이렇게 입력해주고 `:wq` 로 저장하면 이제, 터미널을 열고 원하는 프로젝트로 이동하면 아래와 같은 문구가 출력되는 것을 볼 수 있다.

<img width="691" alt="image" src="https://user-images.githubusercontent.com/59427983/162611307-3d16430a-de33-4def-96d7-cb2b09a31513.png">

**.nvmrc** 파일을 찾았고, 명시된 대로 해당 버전의 Node.js를 사용하겠다는 뜻이다. 매번 프로젝트 별로 터미널을 열었을 때, `$ nvm use` 명령어로 버전을 변경하지 않아도 알아서 변경되도록 되었다.

여기까지 프로젝트 별로 Node.js 버전을 사용할 수 있도록 하는 설정이다. nvm은 shell 별(shell session)로 다르게 버전을 가져갈 수 있다는 설계철학을 알아야 헷갈리지 않고 유용하게 사용할 수 있다.