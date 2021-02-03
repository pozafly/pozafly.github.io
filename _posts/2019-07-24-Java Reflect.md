---
title: "Java Reflect"
excerpt: "JAVA의 Reflect 대해서 알아보자."
categories:
  - JAVA
tags:
  - Reflect
last_modified_at: 2019-07-23
toc: true
toc_sticky: true

---

## Reflect란?

- reflect 사전적 의미 : `투영`
- 메모리에 로드된 클래스들에 관한 정보를 프로그램에서 사용할 수 있게 해준다.
- 자바에서는 클래스가 메모리에 최초로 로드될 때(.class파일을 이때 읽어들임)
- 그 클래스를 나타내는 Class라는 이름의 클래스 인스턴스를 생성하여 그 클래스의 타입정보와 같은 시스템 정보를 런타임시에 관리한다.
  - reflect를 배우는 이유 : 동적으로 메서드 명을 바꿀 수 있다.



<br/>

### Class 클래스

: 클래스와 관련이 있는 클래스. 생성자, 메소드, 이름 등등 가져오거나 변경할 수 있는 클래스.

- Class class 메소드 :

  `1.`forName("클래스이름"); -> 클래스를 메모리에 로드한다.

  `2.`public T newInstance() 메서드 : 객체를 생성한다. (newInstance()의 반환형은 만들려는 객체의 형태인데, 이 형태가 아직 없다면 Object로 받아서 나중에 형변환 하면 된다.)

```java
abstract class A{
	void a(){System.out.println(1);}
	void b(){System.out.println(2);}
	void c(){System.out.println(3);}
}
class B{
	public static void main(String args[]){
		try{
			Class<A> o1 = A.class;     //컴파일 된, A.class의 정보를 담아서 o1변수에 담는다.
			A o2 = o1.newInstance();    //Class class의 메소드. 이렇게 객체 생성 가능.
										//즉, A o2 = new A(); 와 같음.
		}catch(InstantiationException e1){   //A 클래스에 abstract 붙여주면 됨.
			System.out.println("해당클래스는 객체 생성안됨.");
		}catch(IllegalAccessException e2){   //A 클래스에 private A(){}
			System.out.println("해당클래스는 접근권한 없음.");
		}
	}
} 
```

   `3.`Method[]    getDeclaredMethods() 메서드 : 선언 되어진 메소드들을 가져와. 배열 형식으로.

```java
[ex] class를 받았을 때 그 안에 무슨 메서드가 있는지 모를 때 사용함.
import java.lang.reflect.*;
class A{
	void a(){System.out.println(1);}
	void b(){System.out.println(2);}
	void c(){System.out.println(3);}
}
class B{
	public static void main(String args[]){
		Class<A> o1 = A.class;
		Method[] array = o1.getDeclaredMethods();
		System.out.println(array.length);
	}
} 
```

Method 클래스는 java.lang.reflect.* 안에 있다. 그리고 getName()이라는 메서드도 가지고 있음.

System.out.println(array[0].getName()); //메소드 이름 출력

`4.`public Method getMethod(String name, Class<?>... parameterTypes)메소드 :

- String name : 어떤 메소드를 가지고 올껀데? 그 메소드 이름

- Class<?>... parameterTypes : 그 파라미터 타입이 뭔데? 즉, 가져오려는 메소드가 오버로딩 되어있을 수 있으니 매개변수가 어떤식으로 선언되어있는지 알아야함. (두번째 인자값으로 parameterTypes을 주지 않으면 a() 이렇게 아무것도 선언되어있지 않은 메소드를 가져옴.)

```java
[ex]
Method m = a.getMethod("abc", int.class, String.class);
```

`5.`Method[]    getMethods() 메서드 : 선언된 모든 public 메소드를 가져와.

getDeclaredMethods와의 차이점은 public 으로 선언되어진 메소드들을 모두 가져온다.

- ※getMethods와 getDeclaredMethods 의 차이점 : getMethod는 public 메서드만 찾고, 상위 클래스의 메서드(public)를 반환한다는 것이다. 반면, getDeclaredMethod는 해당 클래스에 명시적으로 선언된 메서드를 반환하며, 모든 visibility의 메서드를 반환한다.

`6.`Object invoke(Object obj, Object... args) 메소드 : 객체 안에 있는 메소드를 사용하겠다.

- Object obj : 객체 생성 주소가 들어와야함. Object obj = new Object(); 에서 obj를 넣는다. 그리고 또 들어올 수 있는게 new A() 라던지, .getInstance() 라던지. 

- Object… args : 그 메서드의 매개변수로 들어가는 실제 값이 여기 들어감.

- 근데 반환형이 Object네? 반환형이 있는 메서드일 시 return받기 때문에 Object라고 되어있음. 반드시 Object주소로 받아야 한다. 형변환 해야한다. Object로 받아서 하거나, 다른 주소로 받아서 나중에 하거나.

```java
[ex]
import java.lang.reflect.*;
class Box{
	String color;
	Box(String c){color = c;}
}
class A{
	public void abc(int n, Box b, String s){
		System.out.println(n);
		System.out.println(s);
		System.out.println(b.color);
	}
	int def(){return 200;}
}
class B{
	public static void main(String args[])throws Exception{
		Class<A> c = A.class;
		Method m = c.getDeclaredMethod("abc", int.class, Box.class, String.class);
				//abc라는 메서드를 부를껀데, 매개변수로 int, Box주소, String 형인 메서드를 불러.
		m.invoke(new A(), 100, new Box("red"), "aa");    //호출
				//그 부르는 메서드는 A클래스에 있고, 실 인자 값으로 100, new Box("red"), "aa"를 주겠다. 그리고 메서드를 실행하라.
	}
}
```