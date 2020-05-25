---
title: "JUnit(2) - Mockito"
excerpt: "Mockito 프레임워크를 통해 Mock 테스트를 알아보자."
categories:
  - JUnit
tags:
  - JUnit
  - 단위테스트
  - Mockito
last_modified_at: 2020-05-25
toc: true
toc_sticky: true
---

<1>

> 이전 포스팅에서는 Assertion 객체를 사용해, 테스트 코드의 return 값을 검증했다. 단순히 return 되는 값만 검증한 것인데, 만약 return 값이 없는 테스트를 하려면 어떻게 해야할까? 즉, void형 메서드를 테스트하고자 할 때는 어떤 단위 테스트가 필요할까?

## Mock Object란?

`Mock`이란, 사전적 의미로, 모조품이며 개발용어로는 **모의 객체**를 말한다. 모의 객체란 객체지향 프로그래밍으로 개발한 소스를 테스트할 때, 실제 객체를 사용하지 않고, 실제 객체를 흉내내는 가짜 객체를 작성, 테스트 하는 객체를 말한다. 

` Mockito`는, JUnit 위에서 동작하는 Mock 프레임워크이다. Mockito는 behavior(동작)을 테스트 하는 용도로 사용되는데, 이 `동작`이란, return 값에는 관심이 없고 어떤 요청이 들어왔을 때 제대로 해당 메소드를 찾고, 그 메소드에 매핑된 파라미터에 제대로 값을 보냈는지, Servie단에서 일어나는 Service class를 검증하는데 주로 사용된다.

우리가 설계했던 Product class에서 상품을 하나 집어넣는다고 생각해보자. 그러면 먼저 ProductService를 만들기 전, JPA의 ProductRepository부터 만들어보자.

```java
import org.springframework.data.jpa.repository.JpaRepository;
import kr.co.test.vo.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
}
```

그리고, ProductService다.

```java
import org.springframework.stereotype.Service;
import kr.co.test.vo.Product;

@Service
public class ProductService {
    
    final String message = "배달 보내겠습니다.";
    
    public void deleveryProduct(Product product) {
        product.setMessage(message);
    }
}
```

이렇게 아주 간단한 Service를 만들었고, 상품을 담아 배달할 때, message를 '배달 보내겠습니다.' 라는 아주 간단한 로직만 집어넣은 Service다.



> 단, 우리는 SpringBoot inialize로 프로젝트를 생성했고, Gradle에 **spring-boot-starter-test** 안에는 이미 Moskito가 import 되어있다.

---



## Mockito Class의 Methods

Mockito[Mockito Class 사전](https://javadoc.io/static/org.mockito/mockito-core/3.3.3/org/mockito/Mockito.html)에 메서드들이 상세하게 나와있지만 대중적으로 사용하는 메서드들을 알아보자.



### mock()

 : 가짜 객체를 만드는 메서드

우리는 어쨌든, `행위`를 검증하기 위해서 Service를 만들텐데 우리의 관심사는 Service이고, Repository가 우리의 관심사는 아니다. 그러므로 먼저 Repository를 mock객체화(가짜) 시켜서 코드를 작성할 것이다. Repository mock 객체를 만든 후 이 

이제 가볍게 상품을 CRUD 할 수있는 Service다. 이제 실제 테스트 할 ProductServiceTest 를 만들어보자.

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import org.junit.Test;
import kr.co.test.repository.ProductRepository;
import kr.co.test.vo.Product;

public class ProductServiceTest {
    
    @Test
    public void 행위_테스트() {
        Product newProduct = null;
        ProductRepository p = mock(ProductRepository.class);   // mock()로 Repository를 가짜로 생성함.
        
        Product iPhone = new Product(null, "iPhone", "stone");
		newProduct = p.save(iPhone);
        
        assertEquals("iPhone", newProduct.getName());
    }
}
```

여기서 사용된 `mock()`은, 매개변수로 주어진 class를 mock형태(가짜객체)로 만들어준다. 그리고 만들어진 가짜객체 p는 ProductRepository class에 있는 save() 라는 메서드를 가져다 쓸 수 있다. 즉, 우리는 `mock()`이라는 메서드로 mock 이라는 가짜 객체를 만들고 그 안에 있는 메서드를 사용, Test를 한 것이다.

이 Test를 돌려보면 `java.lang.NullPointerException`이 발생한다. 이유는  iPhone이라는 Product객체는 잘 만들었지만, p라는 mock객체를 썼기때문에 실제로 만들어진 객체가 아니어서 save() 메서드가 제대로 동작하지 않았고, 18번째 줄인  `newProduct.getName()`의 값이 null이기 때문에 제대로 동작하지 않은 것이다. 따라서 assertEquals() 메서드가 실행되기전에 NullPointerExcetpion이 발생. 

따라서, Mock 객체를 제대로 사용하기 위해 특정 메서드의 return 값을 명시해주어야 한다. 이때 `when()`메서드를 사용한다.



### when()

 : Mock 객체의 메서드의 특정 조건을 지정해줄 수 있는 Mockito의 메서드.

> 메소드 리턴값 지정 : `when(Mock객체메소드).thenReturn(리턴값);`
> 메소드 익셉션 지정 : `when(Mock객체메소드).thenThrow(예외);`

이 문법을 사용한다. 즉, when()메서드가 리턴하는 것은 mock 객체의 메서드의 리턴값을 thenReturn(값) 안에 적어주는 것이다. 코드를 작성해보자.

```java
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.junit.Test;
import org.mockito.Mockito;
import kr.co.test.repository.ProductRepository;
import kr.co.test.vo.Product;

public class ProductServiceTest {

    @Test
    public void 행위_테스트() {
        ProductRepository p = mock(ProductRepository.class);
        
        Product iPhone = new Product(null, "iPhone", "stone");
        when(p.save(iPhone)).thenReturn(iPhone);
        when(p.findAll()).thenReturn(Mockito.anyList());
        
        System.out.println(p.save(iPhone));   // Product(id=null, name=iPhone, shapeLike=stone)
        System.out.println(p.findAll());   // []
        
        assertTrue(p.save(iPhone) == iPhone);
        assertFalse(p.findAll() == new Object());
    }
}
```

이렇게 돌리면 테스트는 성공이다.

19번째 줄에서는 iPhone이라는 Product객체를 1개 만들어줬고, p는 Mock 객체이므로, p.save() 라는 메서드를 그냥 실행했다면, Mock객체이기 때문에 또다시 밑에서 NullPointerException이 발생했을텐데, 실행했을 때의 return 값으로 .thenReturn() 안에다가 iPhone 이라는 객체가 리턴된다고 when() 에 선언해두었기 때문에 `assertTrue`가 통과되는것이고, p.findAll() 도 마찬가지로 리턴값은 빈껍데기인 Mockito.anyList()라고 선언해줬기 때문에 `assertFalse`가 통과되는 것이다.



### verify()

 : 해당 구문이 호줄 되었는지를 체크하는 메서드. 단순 호출 뿐 아니라 timeout 시간까지 체크가 가능하다.

>`verify(Mock_객체).Mock_객체의_메소드;`
>`verify(Mock_객체, 호출횟수지정_메소드).Mock_객체의_메소드;`

```java
package kr.co.test.service;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.atMost;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.timeout;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Test;

import kr.co.test.repository.ProductRepository;
import kr.co.test.vo.Product;

public class ProductServiceTest {

    @Test
    public void 행위_테스트() {
        ProductRepository p = mock(ProductRepository.class);
        
        Product iPhone = new Product(null, "iPhone", "stone");
        when(p.save(iPhone)).thenReturn(iPhone);
        
        verify(p, times(1)).save(iPhone);   // 1번 p.save(iPhone) 가 실행되었는지 check
        verify(p, times(2)).save(iPhone);   // 1번 p.save(iPhone) 가 실행되었는지 check
        
        verify(p, never()).save(iPhone);   // p.save(iPhone) 가 한번도 실행되지 않았는지 check
        verify(p, atLeastOnce()).save(iPhone);   // p.save(iPhone) 가 최소 한번 이상 실행되었는지 check
        verify(p, atMost(2)).save(iPhone);   // p.save(iPhone) 가 최소 2번 이상 실행되었는지 check
        verify(p, timeout(100)).save(iPhone);   // p.save(iPhone) 0.1초 이내로 실행되었는지 check
    }
}
```

이런식으로 검증할 수 있다.