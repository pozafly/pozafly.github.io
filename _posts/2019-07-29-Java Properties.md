---
title: "Java Properties"
excerpt: "JAVA의 Properties 대해서 알아보자."
categories:
  - JAVA
tags:
  - Properties
last_modified_at: 2019-07-29
toc: true
toc_sticky: true
---



## 특성

- Properties는 부모가 Hashtable이다. Properties의 키와 값은 String으로 제한됨. Properties는 애플리케이션의 옵션정보, 데이터베이스 연결정보 국제화(다국어) 정보가 저장된 프로퍼티(~.properties) 파일을 읽을 때 주로 사용됨.

[ex] properties 파일안에 이렇게 작성되어 있다고 가정하고.

MSG1=aaa

여기서 앞에오는 것이 key이고 = 뒤에는 value다.

 

- 프로퍼티 값에는 보통 유니코드가 온다. \u : 유니코드라는 뜻.

[ex] contry=대한민국 ==> contry=\uB300\uD55C\uBBFC\uAD6D

근데 cmd창에서 native2ascii 명령어 사용하면 자동으로 유니코드로 바꿔준다.

[ex]native2ascii msg.properties msg2.properties



<br/>

### Properties객체의 메소드 :

- String getProperty(String key) : key를 넣으면 String 형식의 값을 주겠다.

```java
[ex]
import java.util.*;
import java.io.*;
class A {
    public static void main(String args[]) throws Exception {
        Properties p = new Properties();     //Properties객체생성
        p.load(new FileInputStream("C:/Users/SunTae/test/bin/message.properties"));  //로드시킴.프로퍼티스 파일을.
			//new FileInputStream : 파일을 읽어올 때 필요한 객체. FileInputStream.
		System.out.println(p.getProperty(args[0]));  //args[0]은 key값, 반환은 value값.
    }
}
```

- Set<String> stringPropertyNames() : Properties의 키 값만 얻어옴.

```java
[ex]
import java.lang.reflect.*;
import java.util.*;
import java.io.*;
import kr.co.seoulit.action.Action;
class A {
    public static void main(String args[]) throws Exception {
        Properties p = new Properties();
        p.load(new FileInputStream("C:/Users/SunTae/test/bin/message.properties"));       //경로설정
		
        Map < String, Action > map = new HashMap < > ();
        Set < String > set = p.stringPropertyNames();
        for(String key: set) {
			String cName = p.getProperty(key);        //키값을 얻어옴.
			Object obj = Class.forName(cName).newInstance();   //클래스 생성
            map.put(key,(Action)obj);        //넣는다.
        }
        Action action = map.get(args[0]);
        action.execute();
    }
}
```