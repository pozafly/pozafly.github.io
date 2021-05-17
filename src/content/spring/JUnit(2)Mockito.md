---
layout: post
title: 'JUnit(2) - Mockito'
author: [Pozafly]
tags:
  - SpringBoot
  - JUnit
image: ../img/java/springboot.png
date: '2020-05-25'
draft: false
excerpt: Mockito 프레임워크를 통해 Mock 테스트를 알아보자.
---

![1](https://user-images.githubusercontent.com/59427983/82849592-9038a000-9f33-11ea-86df-ab8e2c52c2ec.png)

> 이전 포스팅에서는 Assertion 객체를 사용해, 테스트 코드의 return 값을 검증했다. 단순히 return 되는 값만 검증한 것인데, 만약 return 값이 없는 테스트를 하려면 어떻게 해야할까? 즉, void형 메서드를 테스트하고자 할 때는 어떤 단위 테스트가 필요할까?

<br/><br/>

## Mock Object란?

`Mock`이란, 사전적 의미로, 모조품이며 개발용어로는 **모의 객체**를 말한다. 모의 객체란 객체지향 프로그래밍으로 개발한 소스를 테스트할 때, 실제 객체를 사용하지 않고, 실제 객체를 흉내내는 가짜 객체를 작성, 테스트 하는 객체를 말한다.

` Mockito`는, JUnit 위에서 동작하는 Mock 프레임워크이다. Mockito는 behavior(동작)을 테스트 하는 용도로 사용되는데, 이 `동작`이란, return 값에는 관심이 없고 어떤 요청이 들어왔을 때 제대로 해당 메소드를 찾고, 그 메소드에 매핑된 파라미터에 제대로 값을 보냈는지, Servie단에서 일어나는 Service class를 검증하는데 주로 사용된다.

<br/>

> 우리는 SpringBoot inialize로 프로젝트를 생성했고, Gradle에 **spring-boot-starter-test** 안에는 이미 Moskito가 import 되어있다. 단, SpringBoot를 사용하지 않는다면 build.gradle에 다음과 같은 구문을 추가해주자.

```java
dependencies {
    ....
    testCompile group: 'org.mockito', name: 'mockito-junit-jupiter', version: '3.1.0'
    ....
}
```

---

우리가 설계했던 Product class에서 상품을 하나 집어넣는다고 생각해보자. 그러면 먼저 ProductService를 만들기 전, JPA의 ProductRepository부터 만들어보자.

```java
import org.springframework.data.jpa.repository.JpaRepository;
import kr.co.test.vo.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
}
```

그리고, ProductService다.

```java
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.co.test.repository.ProductRepository;
import kr.co.test.vo.Product;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> readAll() {
         return productRepository.findAll();
     }

     public Optional<Product> readById(Long id) {
         return productRepository.findById(id);
     }

     public void createProduct(Product product) {
         productRepository.save(product);
     }

     public void deleteProduct(Long id) {
         productRepository.deleteById(id);
     }
}
```

Service에는 JPA에서 사용하는 CRUD 메서드들을 만들었다. Mockito를 사용하는 궁극적인 목적은 이 Service로직에 선언되어있는 메서드가 제대로 짜여졌는지, 제대로 동작하는지, 이런 `행위`를 테스트하기 위함이다.

---

<br/><br/>

## Mockito의 Methods

Mockito[Mockito Class 사전](https://javadoc.io/static/org.mockito/mockito-core/3.3.3/org/mockito/Mockito.html)에 메서드들이 상세하게 나와있지만 대중적으로 사용하는 메서드들을 알아보자.

<br/>

### mock()

: 가짜 객체를 만드는 메서드

우리는 어쨌든, `행위`를 검증하기 위해서 Service를 만들텐데 우리의 관심사는 Service이고, Repository가 우리의 관심사는 아니다. 그러므로 먼저 Repository를 mock객체화(가짜) 시켜서 코드를 작성할 것이다. Repository mock 객체를 만든 후 Repository 안에 있는 어떤 메서드를 사용하여 가짜로 결과값을 낼 수 있다.

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

여기서 사용된 `mock()`은, 매개변수로 주어진 class를 mock형태(가짜객체)로 만들어준다. 그리고 만들어진 가짜객체 p는 ProductRepository class에 있는 save() 라는 메서드를 가져다 쓸 수 있다. 즉, 우리는 `mock()`이라는 메서드로 `p`라는 가짜 객체를 만들고 그 안에 있는 메서드를 사용, Test를 한 것이다.

이 Test를 돌려보면 `java.lang.NullPointerException`이 발생한다. 이유는 iPhone이라는 Product객체는 잘 만들었지만, p라는 mock객체를 썼기때문에 실제로 만들어진 객체가 아니어서 save() 메서드가 제대로 동작하지 않았고, 18번째 줄인 `newProduct`의 값이 null이기 때문에 제대로 동작하지 않은 것이다. 따라서 assertEquals() 메서드가 실행되기전에 NullPointerExcetpion이 발생.

따라서, Mock 객체를 제대로 사용하기 위해 특정 메서드의 return 값을 명시해주어야 한다. 이때 `when()`메서드를 사용한다.

<br/>

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
    @Mock
    private ProductRepository p;  // ProductRepository p = mock(ProductRepository.class); 이것과 같다.

    @Test
    public void 행위_테스트() {
        Product iPhone = new Product(null, "iPhone", "stone");
        when(p.save(iPhone)).thenReturn(new Product(null, "andriodPhone", "soap"));
        when(p.findAll()).thenReturn(Mockito.anyList());

        System.out.println(p.save(iPhone));   // Product(id=null, name=andriodPhone, shapeLike=soap)
        System.out.println(p.findAll());   // []

        assertTrue(p.save(iPhone) == iPhone);
        assertFalse(p.findAll() == new Object());
    }
}
```

이렇게 돌리면 테스트는 성공이다.

자, 여기서 우리가 봐야할 것은 17번째 줄, when() 메서드 구문이다. when() 파라미터로 p.save(iPhone)을 넣었다. 그렇다면 20번째 줄에서 예상되는 결과값은, iPhone에 대한 정보일텐데, `.thenReturn(new Product(null, "andriodPhone", "soap"))` 이 구문 때문에 결과는 andriodPhone에 대한 정보가 찍혔다. 즉, Repository는 Mock 객체이고, 우리는 그 안에 들어있는 어떤 로직도 신경쓰지 않고 단순히 이 Service 로직만 테스트하겠다는 의도를 알 수 있다.

<br/>

### verify()

: Mockito에서 가장 중요한 메서드가 아닐까 생각한다. 해당 구문이 `호줄 되었는지를 체크`하는 메서드. 단순 호출 뿐 아니라 timeout 시간까지 체크가 가능하다.

> `verify(Mock_객체).Mock_객체의_메소드;` >`verify(Mock_객체, 호출횟수지정_메소드).Mock_객체의_메소드;`

```java
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
    @Mock
    private ProductRepository p;

    @Test
    public void 행위_테스트() {
        Product iPhone = new Product(null, "iPhone", "stone");
        when(p.save(iPhone)).thenReturn(new Product(null, "andriodPhone", "soap"));

        verify(p, times(1)).save(iPhone);   // 1번 p.save(iPhone) 가 실행되었는지 check
        verify(p, times(2)).save(iPhone);   // 1번 p.save(iPhone) 가 실행되었는지 check

        verify(p, never()).save(iPhone);   // p.save(iPhone) 가 한번도 실행되지 않았는지 check
        verify(p, atLeastOnce()).save(iPhone);   // p.save(iPhone) 가 최소 한번 이상 실행되었는지 check
        verify(p, atMost(2)).save(iPhone);   // p.save(iPhone) 가 최소 2번 이상 실행되었는지 check
        verify(p, timeout(100)).save(iPhone);   // p.save(iPhone) 0.1초 이내로 실행되었는지 check
    }
}
```

`verify()`는 기본적으로 메서드 호출이 한번 되는 것을 검증할 수 있고, 추가로 `times()`, `atLeast()`, `atMost()`, `never()`등을 사용, 특정 호출 횟수 및 최소/최대 횟수를 지정해서 검증할 수 있다.

| 메서드                      |                             설명                             |
| --------------------------- | :----------------------------------------------------------: |
| `atLeastOnece()`            |                 적어도 한번 수행했는지 검증                  |
| `atLeast(int n)`            |                 적어도 n 번 수행했는지 검증                  |
| `times(int n)`              | 무조건 n번 수행했는지 검증 (n보다 크거나 작으면 오류로 간주) |
| `atMost(int n)`             |                 최대한 n 번 수행했는지 검증                  |
| `never()`                   |        수행되지 않았는지 검증(수행했으면 오류로 간주)        |
| `timeout(long millisecond)` |  주어진 시간에 초과하였는지 검증(초과하였으면 오류로 간주)   |