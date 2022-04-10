---
layout: post
title: "(12) Let's Encrypt 갱신 자동화"
author: [Pozafly]
tags: [Tripllo 제작기, Let's Encrypt, AutoMation]
image: ../img/tripllo/lets-encrypt.png
date: '2021-04-12T10:13:47.149Z'
draft: false
excerpt: AWS EC2 환경에서 Nginx와 Let's Encrypt로 HTTPS SSL 인증서 갱신 자동화를 해보자.
---

# Let's Encrypt 갱신 자동화

<br/>

> 서비스 환경은 AWS의 EC2(Amazon linux2) + Nginx 조합으로 되어있습니다. *amazon linux2는 apt-get 패키지 관련 명령어 대신 yum 패키지 명령어를 사용합니다.

<br/>

<br/>

Let's Encrypt는 사용자에게 무료로 SSL 인증서를 발급해 주는 비영리 기관이다. 쉽게 말해서 http 프로토콜을 https 로 http 통신 규약을 암호화해서 서로 소통하도록 해주는 것이다.

Tripllo에서 frontend는 AWS Certificate Manager를 이용해, https 프로토콜을 입혀줬고, 백엔드는 EC2 자체적으로 Let's Encrypt를 이용해 무료 SSL 인증서로 https를 입혀주었다. 참고로 만약 한쪽만 http이고, 다른 한쪽이 https라면 Mixed Content 에러가 나게 되어있다. Let's Encrypt에서 발급하는 인증서는 90일짜리 단기 인증서인데 3개월에 한 번은 갱신을 해주어야 한다.

 어쨌든 EC2 백엔드 서버를 `Let's Encryp`, `Nginx` 설정으로 https를 입혀주었는데 그때 당시에는 갱신 자동화를 해놓지 않았었다. 아래와 같은 메일이 도착했다.

<img width="681" alt="스크린샷 2021-04-12 오전 10 26 42" src="https://user-images.githubusercontent.com/59427983/114335026-bdf7f900-9b86-11eb-9f88-3689a881199a.png">

만료 20일 전인데 갱신하라는 메일이다. 이번 기회를 통해 갱신을 자동화해보자.

<br/>

## 만료일 확인

ssh로 EC2에 접속 후 아래의 명령어로 인증서 만료일을 확인할 수 있다.

```shell
$ echo "" | openssl s_client -connect localhost:443 | openssl x509 -noout -dates

혹은

$ sudo letsencrypt certificates
```

<img width="689" alt="스크린샷 2021-04-12 오후 12 09 12" src="https://user-images.githubusercontent.com/59427983/114335514-e7fdeb00-9b87-11eb-9889-716a5a0ebbdb.png">

나는 첫 번째 명령어를 사용해 확인했다. 1/28일에 처음 생성했고, 4/28일 이후에는 유효하지 않다는 메세지가 뜬다. 두 번째 명령어를 사용하면 며칠 남았는지와 인증서의 시리얼 넘버를 알려준다.

<br/>

## Nginx 관련 명령어

먼저 Nginx 관련 명령어를 정리하는 이유는 Let's Encrypt 관련 작업은 Nginx에서 리버스 프록시 기능을 사용해 통신 포트를 관리하고 있고, 인증서 갱신 전에 Nginx를 잠시 꺼두어야 Let's Encrypt 관련 명령어가 먹기 때문이다. 단, nginx를 껐다가 갱신하고 다시 키는 작업 대신 restart로 작업하기 위해, 나중에 yum 패키지로 `python-certbot-nginx` 를 설치 할 것이다.

- nginx 상태확인

```shell
$ systemctl status nginx.service
```

만약 Nginx가 잘 동작하고 있다면 `Acive: active (running)` 이라고 나오고, 멈춰있다면 `Active: inactive (dead)` 라고 나올 것이다.

- nginx 끄기

  ```shell
  $ sudo service nginx stop
  ```

- nginx 켜기

  ```shell
  $ sudo service nginx start
  ```

- nginx 재시작

  ```shell
  $ sudo service nginx restart
  ```

Nginx 상태를 확인하고 인증서 갱신 테스트 전 우선 꺼보자.

<br/>

## 갱신 테스트

Let's Encrypt는 갱신 전 테스트를 할 수 있다. Nginx를 껐다면 아래 명령어로 실제로 갱신하는 것이 아니라 갱신이 가능한지 테스트할 수 있다.

```shell
$ sudo certbot renew --dry-run
```

<img width="657" alt="스크린샷 2021-04-12 오후 12 17 08" src="https://user-images.githubusercontent.com/59427983/114336187-58593c00-9b89-11eb-8a90-d74459ff0b34.png">

모든 시뮬레이션 된 갱신이 성공했다고 뜬다. 만약, 인증서 갱신 기간이 아닐 때 위와 같은 명령어로 갱신 테스트를 한다면 오류가 뜬다. 이렇게 되면 이제 갱신을 할 수 있는 환경이 만들어진 것이다.

만약 인증서 갱신 자동화를 하지 않고 수동으로 갱신하고 싶다면

```shell
$ sudo certbot renew
```

이렇게 `--dry-run` 를 제외하고 갱신해 주면 된다. 하지만 위 명령어를 아직은 사용하지 말고 현재 인증서 갱신 전 nginx를 껐다 켰다 하는 번거로움이 있으니 이를 없애보자.

<br/>

## python-certbot-nginx 설치

이제까지의 인증서 재발급 프로세스는 

1. nginx 끄기
2. 인증서 재발급(테스트)
3. nginx 켜기

이다. 하지만, 일일이 nginx를 끄는 작업을 하고 재발급을 받고 다시 nginx를 키는 작업을 했다. 물론 자동화를 하면서 shell 스크립트를 짜서 돌리면 되지만 이것마저 귀찮기 때문에 우리는 `python-certbot-nginx` 를 설치할 것이다. 이 녀석을 설치해주면 nginx를 켜고 끄는 게 아니라,

1. 인증서 재발급(테스트)
2. nginx 재시작

만 해주면 된다. 먼저 amazon linux2는 api-get 패키지가 없다. 대신 yum을 통해 패키지 관리를 하므로 yum을 사용하도록 하자.

```shell
$ sudo yum update
```

현재 yum 패키지 목록을 업데이트해준다.

```shell
$ sudo yum install python-certbot-nginx
```

이 녀석을 깔아줬으면 이제 다시 한번 재발급 테스트를 해보자.

```shell
$ sudo certbot renew --nginx --dry-run
```

이번엔, `--nginx` 옵션이 붙었다. 만약 위 패키지를 설치하지 않고 테스트하거나 --nginx 옵션을 붙여주지 않았다면 certbot이 이 명령어를 알아듣지 못한다. 갱신 자동화를 사용하고, nginx를 재부팅 해주면 되게 되었다. 이제, Cron(스케줄러의 정규 표현식)을 이용해 해당 날짜가 되면 알아서 갱신하도록 해줄 것이다.

<br/>

## CronTab을 사용해서 인증서 갱신 자동화

이제 실제적으로 자동화를 해보자. 먼저 letsencrypt(certbot)에서 공식적으로 갱신 자동화를 지원하는 것이 아닌 linux에서 지원하는 CronTab을 사용하는 것임을 알아두자. CronTab은 정해진 일시에 반복적으로 특정 작업을 할 수 있게 해주는 스케줄러다.

### CronTab 명령어 정리

```shell
# Crontab 목록 보기
$ sudo crontab -l

# Crontab 편집(만들기)
$ sudo crontab -e

# Crontab 실행 로그 확인
$ view [로그 존재 경로]
```

실제 CronTab 등록 전, test를 위해 10분 마다 갱신되도록 해보고, 성공하면 3달에 한 번 지정된 날짜에 갱신되도록 설정할 것이다.

### 10분 마다 갱신되도록 테스트

```shell
$ sudo crontab -e
```

이제 CronTab을 작성할 수 있는 편집기가 열렸다.

```shell
*/10 * * * * sudo /usr/bin/certbot renew --nginx --renew-hook="sudo service nginx restart" >> /var/log/le-renew.log
```

이 뜻은, 

- `*/10 * * * * sudo /usr/bin/certbot renew --nginx` : 10분마다 renew --nginx 명령어를 실행한다. 
- `--renew-hook="sudo service nginx restart"` : renew 후에 nginx를 재시작하라는 hook을 실행해라. 
- `>> /var/log/le-renew.log` : 모두 마치면 /var/log/re-renew.log에 로그를 쌓아라라는 뜻이다.

📌 cronTab 표현식 만들어주는 사이트

[CronTab guru](https://crontab.guru/) 에 들어가면 쉽게 표현식을 만들어준다. 처음에는 [크론(cron) 표현식 정리](https://zamezzz.tistory.com/197) 이곳과 [CronMaker](http://www.cronmaker.com/) 이곳에서 작성했는데 그냥 cron 표현식이었고, CronTab 표현식과는 약간 차이가 있다. 잘 구분해서 쓸 것. 이것 때문에 시간을 날렸다 ㅜㅜ.

이제 0분이 되면 renew 명령어가 실행되므로,

```shell
$ view /var/log/le-renew.log
```

명령어로 갱신되었는지 로그를 보고,

```shell
$ systemctl status nginx.service
```

명령어로 nginx가 몇 분 전에 running 되었는지를 확인하자. 최종적으로는

```shell
$ echo "" | openssl s_client -connect localhost:443 | openssl x509 -noout -dates
```

명령어로 갱신되어 언제까지 유효한지 확인하자.

<img width="689" alt="스크린샷 2021-04-12 오후 2 52 04" src="https://user-images.githubusercontent.com/59427983/114349272-a29ae700-9ba2-11eb-8312-8f6ef7a24174.png">

이렇게 나는 7월 11일까지 유효한 인증서로 대체되었다.

### 3개월에 한번 갱신되도록 수정

마지막으로 3개월에 한번 12일 03시에 갱신되도록 Cron 표현식을 아래와 같이 바꿔주면 된다.

```shell
0 3 12 1-12/3 * sudo /usr/bin/certbot renew --nginx --renew-hook="sudo service nginx restart" >> /var/log/le-renew.log
```

<br/>

> 프로젝트 구경하기 -> [Tripllo\_메인](https://tripllo.tech), [Vue_Github](https://github.com/pozafly/tripllo_vue), [SpringBoot_Github](https://github.com/pozafly/tripllo_springBoot)

