---
layout: post
title: 'JUnit(1) - 개념'
author: [Pozafly]
tags:
  - SpringBoot
  - JUnit
image: ../img/java/springboot.png
date: '2020-05-21'
draft: false
excerpt: SpringBoot에서 JUnit의 개념짚기
---

Web 프로젝트를 하다보면 오류는 당연히 만나는 것이고 그 때마다 `System.out.println()`을 찍어보거나 `@Slf4j`로 log를 찍는일이 대부분이었다. 또 log를 확인하기 위해 **WAS를 올렸다 내렸다**하는 번거로움까지. 하지만 WAS를 반복적으로 올렸다 내렸다 하지 않고, 소스 상으로 기능이 제대로 동작하는 코드가 짜여졌는지 알 수 있는 것이 `테스트 프레임워크`이며, 그 중 하나인 JUnit을 알아보고자 한다.

<br/>

> 참고로 가장 대중적인 테스트 프레임워크는 이름이 xxxUnit 이다.
>
> - java : `JUnit`
> - DB : `DBUnit`
> - C++ : `CPPUnit`
> - .net : `NUnit`

<br/>

<br/>

## 1. 단위 테스트의 장점

- 개발단계 초기에 문제점을 발견하도록 도와줌.
- 개발자가 나중에 코드를 리팩토링 하거나 라이브러리 업그레이드 등에서 기존 기능이 올바르게 작동하는지 확인할 수 있음.
- 기능에 대한 불확실성을 감소시킬 수 있음.
- 시스템에 대한 실제 문서를 제공함. 즉, 단위 테스트 자체가 문서로 사용될 수 있음.

즉, 단위테스트를 하면, 내가 짠 Java 소스가 잘짜여졌는지 코드상으로 바로바로 확인할 수 있다는 것이다. 🙆‍♀️

<br/>

<br/>

## 2. JUnit이란?

- java에서 독립된 **단위테스트**(Unit Test)를 지원해주는 프레임워크이다.
- 단정(assert) 메서드로 테스트 케이스의 수행 결과를 판별한다.(ex. assertEquals(예상값, 실제값))
- JUnit4 이후부터는 테스트를 지원 어노테이션을 제공한다.(@Test, @Before, @After 등)
- @Test 메서드가 호출할 때마다 *새로운 인스턴스*를 생성하여 **독립적인 테스트**가 이루어지게 한다.

> JUnit4와 JUnit5의 차이점 :
>
> JUnit4는 단일 모듈이며, JUnit5는 `JUnit Platform` + `JUnit Jupiter` + `JUnit Vintage` 로 구성되어 있다.
>
> 따라서 테스트 코드를 작성할 때 필요한 모듈이 분리되어 있고, 이것을 실행하는 엔진모듈, 또 JUnit4로 작성된 코드를 분석할 수 있는 모듈로 나눠져있다는 것. 우리는 JUnit4를 실습해볼 것이기 때문에 JUnit5는 다른 포스팅에서 알아보도록 하자. 🤐
>
> 실습에 중요한 차이점은 각 테스트 Class에 붙는 @RunWith(SpringRunner.class) 어노테이션 유무다. (4에서는 이 어노테이션이 필요하고 5에서는 생략되어 명시하지 않아도 됨.) JUnit5의 자세한 설명은 [JUnit5 공식문서](https://junit.org/junit5/docs/current/user-guide/)에 나와있다.

<br/><br/>

## 3. 환경설정

먼저 IDE에서 Spring Starter Project로 SpringBoot 프로젝트를 생성해보자. 나는 `Gradle` 과 `Java 1.8`을 설정하고, 디펜던시는 가장 대중적으로 사용하는 `Spring Web`, `Spring Boot DevTools`, `Lombok`, `Spring Data JPA`를 체크하고 생성했다.😀

<br/>

### build.gradle

SpringBoot 2.2.x 버전 부터는 JUnit5가 기본적으로 설정되어있다. build.gradle에 보면

```java
dependencies {
    ...
	testImplementation('org.springframework.boot:spring-boot-starter-test') {
		exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
	}
}
test {
	useJUnitPlatform()
}
```

디펜던시가 이렇게 잡혀있을텐데, JUnit4를 사용하기 위해서

```java
dependencies {
    ...
    testImplementation('org.springframework.boot:spring-boot-starter-test')
}

test {
    useJUnitPlatform {
        includeEngines 'junit-vintage'
        // excludeEngines 'junit-jupiter'
    }
}
```

이렇게 바꿔준 후, Project Explorer에서 해당 프로젝트 우클릭 -> Gradle -> Reflesh Gradle Project 를 눌러서 디펜던시를 받아주자.

> 여기 붙어있는 **spring-boot-starter-test**에는 다름 라이브러리들이 포함되어있다.
>
> - JUnit 5 (JUnit 4와의 하위 호환성을 위한 빈티지 엔진 포함) => 이에 별다른 설정 없이 JUnit 5도 사용 가능
> - 스프링 테스트 및 스프링 부트 테스트
> - AssertJ
> - Hamcrest
> - Mockito
> - JSONassert
> - JsonPath

<br/><br/>

## 4. Assert 단위테스트

Vo 객체를 먼저 만들어보자. 경로는 src/main/java.

```java
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String shapeLike;
}
```

필드가 name 뿐인 아주 간단한 Product class를 만들고, 실제 테스트 클래스를 만들어보자.

테스트 코드를 작성할 클래스를 생성할 때, 관례적으로 대상 클래스 이름에 Test를 붙인다. 따라서, ProductTest Class를 생성할 것이다. 테스트할 Class는 src/test/java 밑에 위에서 생성한 class의 동일 package에 생성한다.

Test객체. 경로는 src/test/java.

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.Test;
import kr.co.test.vo.Product;

public class ProductTest {
    @Test
    public void 상품이름이_리턴된다() {
        Product product = new Product(null, "cup", "circle");
        assertEquals("cup", product.getName());
    }
}
```

<br/>

이렇게 하고, @Test 어노테이션이 붙은 곳에서 우클릭 -> Run As -> JUnit Test 를 클릭하면 테스트가 실행된다. 만약 실행되지 않는다면, (이클립스 기준)Run As -> Run Configurations -> Test runner 옵션을 JUnit 5 에서 4로 변경한 후 테스트 해보자.

그러면 하단에 JUnit 창에 `상품이름이_리턴된다()`가 초록색 바 표시와 함께 정상적으로 동작했다는 것을 알 수 있다.⛏

<br/>

> - 테스트 클래스는 반드시 public으로 선언해야 한다.
> - @Test : 이 어노테이션을 선언한 메서드는 JUnit이 알아서 실행할 수 있게 함.

JUnit을 통해 아주 간단한 단위 테스트를 해보았다. 여기서 사용된 assert 메서드에 대해 좀 더 알아보자.

| assert 메서드      | 설명                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| assertEquals(a, b) | 객체 a와 b의 실제 `값`이 일치하는지 확인                                                                          |
| assertSame(a, b)   | 객체 a와 b가 같은 `객체`인지 확인<br /> assertEquals : 값의 비교<br /> assertSame : 객체의 비교(== 연산자와 같음) |
| assertTrue(a)      | 조건 a(boolean)가 true 인지 확인                                                                                  |
| assertNotNull(a)   | 객체 a가 null이 아님을 확인                                                                                       |

더 자세한 내용은 [JUnit Assert Class 사전🔗](http://junit.sourceforge.net/javadoc/org/junit/Assert.html)에 기록되어 있다.

이렇게 간단하게 @Test 어노테이션을 사용, assert 메서드로 Product라는 도메인을 테스트 해봤다. 😎 다음 포스팅에서는 JUuit위에서 동작하는 Mockito에 대해서 알아보자.