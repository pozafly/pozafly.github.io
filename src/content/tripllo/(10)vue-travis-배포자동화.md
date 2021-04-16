---
layout: post
title: '(10) Frontend -travis 배포 자동화'
author: [Pozafly]
tags:
  - Tripllo 제작기
image: ../img/tripllo/travis.png
date: '2021-04-06T17:13:47.149Z'
draft: false
excerpt: Vue프로젝트를 aws의 S3와 CloudFront에 Travis CI를 통해 배포 자동화를 해보자.
---

# Travis

Travis CI에 대해서 알아보자. 우선 [Travis 공식](https://docs.travis-ci.com/) Docs를 보고 따라해봤다. 참고 자료는 이동욱님의 스프링 부트와 AWS로 혼자 구현하는 웹 서비스 책을 참고했다.

우선 travis endpoint에 대해 알아야 한다.

- travis 엔드 포인트 --pro
  API 엔드 포인트 : https://api.travis-ci.com/

- travis 엔드 포인트
  API 엔드 포인트 : https://api.travis-ci.org/

endpoint를 잘 설정해주어야지 오류가 나지 않는다. springboot를 travis로 빌드 자동화를 했을 때도 겪었었지만, .org 엔드포인트는 오류가 많고 잘 되지 않는 경우가 많다. 버전 차이인듯 싶다. 어쨌든 우리는 .com인 --pro를 붙여 엔드포인트를 설정해줄 것이다.

<br/>
<br/>

## Github repository 연동

https://travis-ci.com/ 이곳에 먼저 들어가서 github ID로 로그인을 해주자. 우측 상단에 내 아이콘을 선택하고 Setting -> Repositories에 가면 무슨 프로젝트를 설정할 것인지 페이지가 나온다. 여기서 어떤 프로젝트를 CI 할 것인지 설정해줄 수 있다. Manage repositories on GitHub 을 클릭하고, github 페이지에 들어가면, 

![스크린샷 2021-04-06 오전 11 33 19](https://user-images.githubusercontent.com/59427983/113650888-f3ef3600-96cb-11eb-83a3-fe7d8b9849ad.png)

이곳에서 자신의 프로젝트를 선택해서 연동시킬 수 있다.

<br/>
<br/>

## .travis.yml

후에, 자신의 프로젝트에 .travis.yml 파일을 만들자.

```yaml
language: node_js
node_js:
- 14.16.0
branches:
  only:
  - master
cache:
  directories:
  - node_modules
script: npm run build
notifications:
  email:
    recipients:
    - pozafly@kakao.com
```

- language : vue 프로젝트를 설정할 것이므로, language는 node_js 형태로 빌드한다. 
- node_js : 버전은 자신이 설정한 것 대로 해주면 됨
- branches : master 브랜치에 push 되었을 때 자동으로 돌아가게 해줌.
- cache : 빌드시, node_modules가 계속 install 될 필요는 없으므로 해당 폴더를 캐시화 시켜주겠다는 말이다.
- script : 빌드 명령어
- notifications : CI가 완료되었을 때 결과를 noti 해준다. 내 메일 주소를 적었다.

우선 기본 틀이다. 이제 이 파일을 작성했다면, master 브랜치에 push or merge 할 때마다 travis가 알아서 프로젝트를 빌드해줄 것이다. push후 travis 페이지에 가보면 build log가 실시간으로 찍힌다.

첫번째 에러가 났다.

```
error  
Template execution failed: ReferenceError: VUE_APP_GOOGLE_CLIENT_ID is not defined
```

VUE_APP_GOOGLE_CLINET_ID 는 .env 파일에 있는데, 이걸 build 하지 못하는 이유는 .env 파일이 github에 올라가지 않아서다. 따라서 .env 파일을 travis 서버에서 인식하도록 할 필요가 있다. 방법은 3가지가 있다. [공식 페이지 환경변수](https://docs.travis-ci.com/user/environment-variables/) 이곳에 잘 설명되어 있는데, 나는 두번째 방법인 .travis.yml에서 secret 파일 암호화하는 방법을 사용하겠다.

<br/>
<br/>

## .evn 파일을 AES256 이용하여 .enc 파일 생성하기

### CLC 설치 & login

[여기](https://sanghye.tistory.com/42) 참고하였다. 먼저 로컬 컴퓨터에서 암호화 해 .enc 파일을 생성할 것이기 때문에 travis CLC가 필요하다.

```shell
$ gem install travis
```

만약 권한 오류가 난다면 sudo를 붙여주도록 하자. 이제 travis에 login을 해야 함.

```
$ travis login --pro
```

--com, --org 옵션을 줄 수 있는데, pro를 붙여주자. 아니면 빌드시 오류 발생. org를 사용하고 있다면 org를 써도 된다. login을 할 때 Not Found 에러가 날 수 있다. [travis login Not Found 오류 정리](https://github.com/pozafly/TIL/blob/main/%F0%9F%A7%A8%E1%84%8B%E1%85%A9%E1%84%85%E1%85%B2%E1%84%8B%E1%85%AA%E1%84%8B%E1%85%B4%20%E1%84%8C%E1%85%A9%E1%84%8B%E1%85%AE/travis/travis%20login%20Not%20Found.md) 이곳에 정리해 뒀으니, github token으로 로그인 해주자.

<br/>

### endpoint 설정

우리는 pro로 설정했으니 endpoint를 잡아주자. endpoint를 잡아주지 않으면, 암호화를 진행할 때, `not logged in -try running travis login --org` 오류가 뜰 수 있다. [github issues](https://github.com/travis-ci/travis-ci/issues/9668) 이곳을 참고 했다.

```shell
$ travis endpoint --pro
```

<br/>

### .env 파일 암호화

이제 암호화를 진행하자.

```shell
$ travis encrypt-file --pro [파일명]
```

--pro를 붙여주자. 붙여주지 않으면,

![스크린샷 2021-04-06 오전 11 55 25](https://user-images.githubusercontent.com/59427983/113652592-04ed7680-96cf-11eb-9b43-f67b49341adc.png)

push후 build 때, `iv undefined` 오류가 계속 뜰 것임.

그리고 --add 옵션을 붙여주면 .travis.yml 파일에 자동으로 `before_install` 란이 생기도록 할 수 있다. build 때 install 전에 암호화한 파일을 복호화 해서 travis가 알아먹을 수 있도록 해주는 작업이다. 따라서 최종적으로는

```shell
$ travis encrypt-file --pro .env.production --add
```

요렇게 해줬다. 그러면 `DANGER ZONE: Override existing .env.production.enc? |no|` 이런 문구가 뜰 것인데, yes 를 입력해주자. 그러면 .env 파일 밑에 .evn.enc 라는 파일이 생겼다. 암호화된 .env 파일이다.

📌 .env 파일은 반드시 gitignore 처리. .env.enc 파일은 ignore 하면 안된다.

<br/>

### 빌드 test

이제 암호화 된 파일이 생겼으니, 얘를 push 해서 build 해주자. 우선 travis 서버 상 build가 성공했으면 반은 성공한거임.

<br/>
<br/>

## s3에 호스팅 되어있는 버킷에 빌드 파일 올리기

traivs 상에서 내 파일이 build 까지 완료되었다면, 이제 호스팅 되고 있는 public s3 버킷에 내 빌드 파일을 올려서 master 브랜치에 수정한 소스가 git push 될 때마다 자동으로 배포되도록 설정해보자. 단, 기존에 s3 조건이 설정되어 있어야 함. 아래와 같음.

- s3 버킷은 public 접근 가능함.
- 버킷 정책 JSON이 설정되어 있을 것.

<br/>

### AWS IAM key 받기

[IAM](https://console.aws.amazon.com/iam/home?region=ap-northeast-2#/home)에 사용자 탭 -> 사용자 추가 -> 이름 설정 -> AWS 액세스 유형은 *프로그래밍 방식 엑세스* 체크 -> 기존 정책 직접 연결 -> 정책 필터에 *s3full* 검색 후 AmazonS3FullAccess 체크. -> cloudfront 검색 후 CloudFrontFullAccess 체크 -> 태그 등록 -> 권한 최종 확인 후 생성이 완료 되면 엑세스 키와 비밀 엑세스 키가 생성된다.

즉, IAM 에서는 `AmazonS3FullAccess`, `CloudFrontFullAccess` 두가지 권한이 필요한 것이다.

<br/>

### Travis CI에 키 등록

aws s3에 접근할 수 있는 엑세스키와 비밀키는 절대절대절대절대 github 에 올라가서는 안된다. 따라서 travis 상에 키를 등록해놓고 .traivs.yml에서 불러다 쓰는 형태로 진행해야한다. travis.com에 가서, Settings 화면에 가자. 해당 프로젝트 우측에 Settings 를 눌러서 key를 등록할 수 있다.

![스크린샷 2021-04-06 오후 2 29 49](https://user-images.githubusercontent.com/59427983/113663278-b6e36d80-96e4-11eb-9379-723b135ce55a.png)

- name  : AWS_ACCESS_KEY, AWS_SECRET_KEY 두개
- value : IAM에서 받은 엑세스키와 시크릿키

이렇게 각각 등록해두면 된다. 그럼 이걸 .travis.yml 파일에서 변수로 가져올 수 있는 형태가 되는 것임.

```yaml
deploy:
  provider: s3
  access_key_id: $AWS_ACCESS_KEY   # 여기
  secret_access_key: $AWS_SECRET_KEY  # 여기
  bucket: [버킷명]
  skip_cleanup: true
  acl: public_read
  region: ap-northeast-2
  wait-until-deploy: true
  local_dir: [vue라면 dist, react라면 build]
```

이런식으로. yml에 적어둔 것을 알아보자.

- provider : 배포 대상
- bucket : 내가 미리 생성해둔 public 접근 가능한 버킷.
- skip_cleanup : 공식 홈피에 따르면 빌드 중 이루어진 모든 변경 사항을 삭제하지 않게 함.
- acl : public 버킷이라 하더라도, 버킷에 올릴 때마다 파일을 일일이 public 객체로 바꿔주어야 하는데 이 옵션을 주면 자동으로 해줌. 하지만 aws cloudFront 설정을 따로 해줘야 한다. 자세한건 밑에 있다. 이렇게 적어주자.
- region : 버킷의 region
- wait-until-deploy : 배포 시, 기다려줌
- local_dir : build 후 어떤 특정 폴더를 배포할 지 설정. 나는 vue build 시 dist 폴더 안에 파일이 생성되므로 dist를 적어줬다.

여기까지 해보고 git push해서 성공하나 확인해보는게 좋다. 만약 성공하면 S3 버킷에 새 파일이 올라온 것을 확인할 수 있다. 이제 AWS CloudFront 를 통해 CDN 되어있는 페이지를 무효화 시키고 새 캐싱을 진행할 것임.

<br/>
<br/>

## CloudFront 배포 설정

위에서 설정한 S3를 오리진으로 CloudFront 배포를 설정해줄 것이다. [aws 원본 액세스 ID를 배포에 추가](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#private-content-creating-oai) 여길 보고 따라하면 된다. OAI를 설정해주었다.

---

**📌 CloudFront 콘솔을 사용하여 CloudFront OAI를 생성하려면**

1. AWS Management Console에 로그인하여 https://console.aws.amazon.com/cloudfront/에서 CloudFront 콘솔을 엽니다.
2. S3 오리진이 있는 배포의 ID를 선택합니다.
3. **Origins and Origin Groups(오리진 및 오리진 그룹)** 탭을 선택합니다.
4. 오리진 옆의 확인란을 선택한 다음 **Edit(편집)**을 선택합니다.
5. **Restrict Bucket Access(버킷 액세스 제한)**에서 **예**를 선택합니다.
6. 사용할 OAI가 이미 있는 경우 **Use an Existing Identity(기존 자격 증명 사용)**를 선택합니다. 그런 다음 **Your Identities(사용자 자격 증명)** 목록에서 OAI를 선택합니다.
7. CloudFront가 **오리진 도메인 이름(Origin Domain Name)**에 지정된 Amazon S3 버킷의 파일에 대한 읽기 권한을 자동으로 OAI에 부여하도록 하려면 **예, 버킷 정책을 업데이트합니다.(Yes, Update Bucket Policy)**를 선택합니다.
8. **예, 편집합니다**를 선택합니다.

OAI를 생성했다면, Amazon S3 버킷 정책 사용 해주면 되는데 나는 기존에 해두었으므로 패스. 위의 url에 자세하게 나와있다. 따라하면 됨.

---

이제, .travis.yml 파일을 수정해주자.

```yaml
(...)
before_deploy:
  - npm install -g travis-ci-cloudfront-invalidation

after_deploy:
  - aws configure set preview.cloudfront true
  - travis-ci-cloudfront-invalidation -a $AWS_ACCESS_KEY -s $AWS_SECRET_KEY -c $AWS_CLOUDFRONT_DIST_ID -i '/*' -b $TRAVIS_BRANCH -p $TRAVIS_PULL_REQUEST -o 'master'
```

이렇게 설정해주었다. S3에 매번 올린 후 cloudfront에서 매번 다시 캐싱 해줄 필요없이 위 명령어로 travis가 알아서 해준다. 여기서 `travis-ci-cloudfront-invalidation` 라는 패키지를 travis 상에 설치 후, 제일 아래에 있는 명령어로 진행하는 것이다. 

$AWS_ACCESS_KEY, $AWS_SECRET_KEY는 기존 travis에 설정된 대로 들어갈 것이고, `$AWS_CLOUDFRONT_DIST_ID` 는 travis의 환경변수 설정에서 직접 입력해주자. aws의 cloudfront 페이지에 가장 먼저 id가 나와있다. 나머지는 필요없다. 다만 위의 yml에 적여 있어야한다.

이제 git push 해주면, 

![스크린샷 2021-04-06 오후 5 41 15](https://user-images.githubusercontent.com/59427983/113683817-94128280-96ff-11eb-9a7c-e45173c60c60.png)

요런식으로 도는걸 볼 수 있다. 완료!!

.travis.yml 완성본

```yaml
language: node_js

# nodeJS 버전
node_js:
- 14.16.0

# Git Commit 수신 허용 목록 master 브랜치만.
branches:
  only:
  - master

# Travis CI 에서 node_modules를 캐싱한다.
# 빌드 프로세스 속도를 높여줌.
cache:
  directories:
  - node_modules

# Travis 서버에서 빌드 명령어
script: npm run build

# .env.production 파일 인코딩했던 것을 디코딩해서 만들어줌.
before_install:
- openssl aes-256-cbc -K [$encrypted_key...] -iv [$encrypted_iv...]
  -in .env.production.enc -out .env.production -d

# AWS CloudFront 캐싱을 위해 설치.
before_deploy:
  - npm install -g travis-ci-cloudfront-invalidation

# build후 배포 대상
deploy:
  provider: s3
  access_key_id: $AWS_ACCESS_KEY
  secret_access_key: $AWS_SECRET_KEY
  bucket: tripllo.tech
  skip_cleanup: true
  acl: public_read
  region: ap-northeast-2
  wait-until-deploy: true
  local_dir: dist

# 배포 완료 후 AWS CloudFront의 캐시를 무효화.
after_deploy:
  - aws configure set preview.cloudfront true
  - travis-ci-cloudfront-invalidation -a $AWS_ACCESS_KEY -s $AWS_SECRET_KEY -c $AWS_CLOUDFRONT_DIST_ID -i '/*' -b $TRAVIS_BRANCH -p $TRAVIS_PULL_REQUEST -o 'master'

# 빌드 후 알림
notifications:
  email:
    recipients:
    - pozafly@kakao.com
```

아쉬운 점은 npm모듈을 사용하지 않고 CloudFront 설정을 할 수 있을텐데 하지 못했다. [여기1](https://medium.com/lunit/travis-ci%EB%A1%9C-aws-s3%EC%97%90-spa-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-c081e25335b5), [여기2](https://renzolucioni.com/s3-deployment-with-travis/), [여기3](https://github.com/CircleCI-Public/aws-cli-orb/issues/24) 를 보면서 연구했는데 잘 안됐다...

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)