---
title: "Java의 Exception에 대해서"
excerpt: "여러가지 Exception 처리에 대해서 알아보자."
categories:
  - JAVA
tags:
  - Exception 종류
  - try,catch
last_modified_at: 2019-07-11
toc: true
toc_sticky: true
---



## 자주 발생하는 Excetion

1. `NumberFormatException` - 숫자형식에러

```java
class A{
        public static void main(String args[]){
                int n=Integer.parseInt("삼십");
        }
}
```

<br/>

2. `NullPointerException` - 주소가 가르키는 것이 없을 때, 호출한 경우.

```java
class A{
        public static void main(String args[]){
                Object o=null;
                System.out.println(o.toString());
        }
}
```

<br/>

<br/>

3. `ArrayIndexOutOfBoundsException`  -  배열 방 번호를 잘못 입력했을 때.

```java
class A{
        public static void main(String args[]){
                int[] a={100};
                int b=a[200];
        }
}
```

  

  

  



4. `ClassCastException` - 형변환 변수가 더 작은 부모 형태로 변환되었을 때.

```java
class A{
        public static void main(String args[]){
                Object o1=new A();
                String o2=(String)o1;
        }
}
```





## Exception의 종류

1. `Checked Exception` : 폭탄(예외)이 있는데 처리를 안했으면 Exception이 뜸. 던지면 됨(throw).

2. `Unchecked Exception` : RuntimeException 똑같은 폭탄()인데, 컴파일러가 신경을 안써줌.

   ※Exception 을 폭탄이라고 가정.

 

## Exception의 처리방법

#### 1. throw, throws사용.

- throw는 해당 Exeption을 선언된 메소드가 속한 곳으로 던지는 역할을 한다.

- throws는 메서드() 뒤에 붙이는데 이 메서드에서 해당 Exeption이 발생하면 호출한 메서드로 해당 Exeption을 던져버림. 이때, throws뒤에 여러가지 Exeption을 적을 수 있다.

 ```java
class A {
    static void a() throws Exception {   //예외발생 시 던지겠다.
        Exception e = new Exception("폭탄");   //Exeption 선언. 폭탄은 있는데, 불이 안붙은 상태.
        throw e;   //불붙은 상태. 불을 끄던가, 던지던가 불중 하나 선택해. 여기서는 던진다.
    }
} 
 ```

- throw 뒤에는 Exception의 종류만 올 수 있다. [ex] A o = new A(); throw o; 컴파일 에러.

- throws Exeption, B, C 가능.(단, B,C가 Exception을 상속하고 있을 때.) 여러개가 올 수 있으므로 throws임.

 

 

#### 2. try, catch절 사용(예외처리기).

```java
[sy]
try{
	예외발생가능소스코드;
}catch(...Exception 변수){
		예외처리소스코드;
}
```

try catch절의 문법은 위와 같이 사용하는데, 예외가 발생할 것 같은 소스가 try절 안에 적히고 catch절 안에 예외가 발생한 것이 잡히면 예외처리 소스코드를 실행한다.

※throws나, catch절 뒤에 Exception을 구체적인 이름으로 적어주는게 좋다. 나중에 소스가 길면 헷갈리기 때문에. 

 



#### 3. 다중 catch절

 : catch절은 여러번 사용할 수 있다. 그것을 다중 catch절이라 한다.

 ```java
class A {
    public static void main(String args[]) {
        try{
          //args 0, 1방을 받아서 더하는 소스
          int n1 = Integer.parseInt(args[0]);
          int n2 = Integer.parseInt(args[1]);
          System.out.print(args[0] + "+" + args[1] + "=");
          System.out.println(n1 + n2);
        }catch(NumberFormatException e1){    //args숫자형식 오류
          System.out.println("숫자형식 오류. 숫자만 입력해주세요.");
        }catch(ArrayIndexOutOfBoundsException e2){    //args방에 아무것도 입력하지 않았을 시
          System.out.println("반드시 두개의 값을 입력해주세요.");
        }
    }
}
 ```

**※**주의사항

- 다중 catch 시, Exception 이 위에 catch절에 있을 때, 상속관계상 모두 잡아버리기 때문에 밑으로 가야함.그렇지 않으면 error.

- catch절 안에 또 throw 할 수 있다. 테이블 간 무슨 예외가 발생했는지 모르기 때문에 이름을 붙여서 다시 던진다. 예를들어 클래스 두개가 모두 sql 예외가 발생할 수 있는 가능성이 있다고 했을 때, 어느 테이블에서 예외가 발생했는지 모른다. 이때, throw ...Exception이라고 이름을 붙여서 throw 해줌.

- catch() 안에 or연산자(|) 사용가능.

 



#### 4. finally절

- 반드시 실행해야하는 소스코드 - catch처리 후 finally안에 있는 소스를 반드시 실행한 후 마친다.

```java
[sy]
try{
	예외발생가능소스코드
	}catch(xxxException 변수){
		예외처리소스코드
	}finally{
		반드시 실행해야하는 소스코드
	}
}
```

Exception에서 무슨 예외가 일어났는지 정확히 알기 위해서는 System.out.println(e.getMessage()); getMessaget() 메소드를 통해 알 수 있다.


※ e.printStackTrace();  //경로에서 뭐가 잘못되었지 찾아서 뽑아줌.

  



#### 5. 사용자 정의 Exception

- Exception과 Runtime Exception 둘 중 하나를 상속받아 새로운 class 정의 해야한다.

```java
[ex]
public class AException extends RuntimeException {
    public AException(String msg) {
        super(msg);
    }
    public AException(Exception ex) {
        super(ex);
    }
}
```

그 후 다른 class에서 try catch절을 이용해 throw new Aexception(""); 이 발생한 것을 잡아 출력시킨다.