---
title: "Java InputStream"
excerpt: "JAVA의 InputStream에 대해서 알아보자."
categories:
  - JAVA
tags:
  - InputStream
last_modified_at: 2019-07-30
toc: true
toc_sticky: true

---



## 스트림

스트림이란 데이터의 흐름을 의미. 양방향 통신은 되지 않는다. 물이 높은 곳에서 낮은 곳으로 흐르듯 데이터는 출발지에서 나와 도착지로 들어간다는 개념. 따라서 입력받을 때는 입력 스트림(InputStream), 데이터를 보낼 때에는 출력 스트림(OutputStream). 

 

- 출력스트림 : System.out

- 입력스트림 : System.in

 <br/>

- 콘솔창에 출력하기 : System.out.println();

- 콘솔창에 입력하기 : System.in

 <br/>

 <br/>

### 스트림 종류

1. 바이트 단위 처리 스트림 - InputStream, OutputStream

2. 문자 단위 처리 스트림 - Reader, Writer

- 입력스트림 - InputStream, Reader

- 출력스트림 - OutputStream, Writer

####  java.io.*;

파일읽기 -> FileInputStream, FileReader

\<텍스트> 파일읽기 -> FileInputStream, FileReader 두개다 됨.

\<그림> 파일읽기 -> FileInputStream 이거 한개만 됨. Reader는 문자단위 스트림 이므로.

#### FileInputStream 객체

- read() : 첫번째 값을 읽어온다. 1byte. read메소드가 리턴한 int값을 char 타입으로 변환하면 읽은 문자를 얻을 수 있다.

- 파일의 끝에 가면 -1을 반환한다. 더이상 출력할 것이 없을 때 -1 반환.(EOF : end of file)

- Enter키는 13(ENTER) 한줄 띄우고 10(\N)을 반환한다.

예제) 

test.txt 에

```
ab

c
```

이렇게 적혀있다고 가정하고.

```java
import java.io.*;
class A{
	public static void main(String args[])throws IOException {
		FileInputStream fis = new FileInputStream("test.txt");  //test.txt 에서.
		int n1 = fis.read();
		int n2 = fis.read();
		int n3 = fis.read();
		int n4 = fis.read();
		int n5 = fis.read();
		int n6 = fis.read();
		System.out.println(n1); //97  (a)
		System.out.println(n2); //98  (b)
		System.out.println(n3); //13  (enter1)
		System.out.println(n4); //10  (enter2)
		System.out.println(n5); //99  (c)
		System.out.println(n6); //-1
	}
}
```

이 소스코드에 System.out.println((char)n1); 를 넣는다면 문자 1개를 가져오겠지.

```java
import java.io.*;
class A{
	public static void main(String args[])throws IOException {
		FileInputStream fis = new FileInputStream("A.java"); //이것은 자기 자신의 소스코드를 읽어오는 소스다.
		
		while(true){
			int n = fis.read();
			if(n == -1) break;    //더이상 출력할게 없으면 -1을 반환하므로 -1이 되면 멈춘다.
			System.out.print((char)n);
		}
	}
}
```

<br/>

### 자원정리

java 소스는 메모리에 올라가지만, awt나 윈도우 기능을 사용하는 것은 jvm이 자원정리 해주지 않음. io도 마찬가지. 따라서 자원정리를 해줘야한다.

Closeable, AutoCloseable 을 구현객체로 가지고 있음. 따라서 자동 자원관리를 사용해서 고도화 해주라. 옛날방식도 알고 있어야한다. (고도화란, 소스 업데이트 유지보수할 때 더 좋은 소스로 만드는 거.)

- 옛날 방식 :

```java
import java.io.*;
class A{
	public static void main(String args[]){
		FileInputStream fis = null;
		try{        //try() 이쪽 괄호 안에 자동 자원정리 해주는데 안넣었지? 그럼 옛방식.
			fis = new FileInputStream("A.java");
			while(true){
				int n = fis.read();
				if(n == -1) break;
				System.out.print((char)n);
			}
		}catch(IOException e){
			System.out.println("읽다가 오류남~");
		}finally {
			try{
				if(fis != null){fis.close(); fis = null;}
			}catch(IOException e2){
				System.out.println("자원정리중 오류~");
			}
        }
	}
}
```

- 자동 자원관리 방식

```java
import java.io.*;
class A{
	public static void main(String args[]){
		try(
			FileInputStream fis = new FileInputStream("A.java");  //고도화
		){
			while(true){
				int n = fis.read();
				if(n == -1) break;
				System.out.print((char)n);
			}
		}catch(IOException e){
			System.out.println("읽다가 오류남~");
		}
	}
}
```

<br/>

### 한글 처리방법

특수문자, 숫자, 영어대소문자 --> 아스키코드표 1byte = 8bit

조합문자(한글) 2byte = 16bit

read() --> 1byte 읽기. 즉, 한글은 반개 읽어와서 반개 출력함. 깨진다.

따라서 FileInputStream을, FileReader로 바꿔주면 해결된다.



<br/>

### 콘솔창 입력

```java
import java.io.*;
class A{
	public static void main(String args[]){
		try(
			InputStream is = System.in;    //System.in -> cmd(System) 에서 입력받아서 집어넣어라. InputStream 형식의 is 변수에.
		){
			while(true){
				int n = is.read();       //읽어들여서 문자 1개를 반환해라.
				if(n == 's' || n == 'S') break;   //소문자 s or 대문자 S라면 그만둬라.
				System.out.print((char)n);  //cmd창에 뿌려줘라.
			}
		}catch(IOException e){
			System.out.println("읽다가 오류남~");
		}
	}
}
```

<br/>

### read()메서드에는 여러 매개변수 타입이 있음.

- int read()기본형은 1바이트씩 읽어들이니까 속도 저하가 발생. 따라서 배열 형식으로 사용.

- int read(byte[] b) 메소드 : 배열의 길이만큼 바이트를 읽고 배열에 저장한다. 따라서 루프 수가 줄어드는 것.

여기서 read 반환형은 int인데 그 값은 읽어들인 바이트 갯수를 반환한다.

 

※ read() 메서드 주의점 : 매개변수가 없는 read()메서드는 문자의 아스키코드 값을 int형으로 반환하고, 배열형 매개변수의 `read(byte[] b)`메서드는 int 형으로 방 갯수를 반환한다. read(byte[] b)의 값을 cmd창에 찍는 방법은 매개변수로 들어온 byte[]배열의 변수가 들어오고 write함수를 써야함.

```java
byte[] buffer = new byte[2];
is.read(buffer);
ps.write(buffer);   //버퍼에 저장해놓고 write함수로 한꺼번에 불러들임. 이제 cmd창에 방 갯수가 아니라 값이 찍힌다.
```

```java
import java.io.*;
class A{
	public static void main(String args[]){
		try(
			FileInputStream fis = new FileInputStream("test.txt");
		){
				byte[] buffer = new byte[3];
				int n = fis.read(buffer);     //n 은 읽어온 갯수를 리턴한다.
				System.out.println("읽어온 갯수 : " + n);
				for(byte n2 : buffer)
					System.out.println(n2);
		}catch(IOException e){
			System.out.println("읽다가 오류남~");
		}
	}
}
```

근데, 모두 출력되고 다음에 출력되는 것은 이전 방에 들어갔던 값 그대로 출력 된다. 예를들어서 

test.txt에 

abcde 라고 적고 아래 소스를 실행하면

```java
import java.io.*;
class A{
	public static void main(String args[]){
		try(
			FileInputStream fis = new FileInputStream("test.txt");
		){
				byte[] buffer = new byte[3];               //방3개 설정
				
				int len = fis.read(buffer);
				System.out.println("읽어온 갯수 : " + len);    //읽어온 갯수 : 3
				for(byte n2 : buffer)
					System.out.println(n2);               //97 98 99 순차로 찍힘
				
				System.out.println("****************");
				
				len = fis.read(buffer);
				System.out.println("읽어온 갯수 : " + len);    //읽어온 갯수 : 2
				for(byte n2 : buffer)
					System.out.println(n2);               //100 101 99 찍힘
		//99가 찍히는 이유는 2개를 불러왔고 마지막 방에는 들어가지 않으니 이전 방 값(99)를 찍는 것이다.
				System.out.println("****************");
				
				len = fis.read(buffer);
				System.out.println("읽어온 갯수 : " + len);   //읽어온 갯수 : -1
				for(byte n2 : buffer)
					System.out.println(n2);              //찍을게 없으니 그전 방 100 101 99가 찍힌다. 
				
		}catch(IOException e){
			System.out.println("읽다가 오류남~");
		}
	}
}
```

따라서 fis.read(buffer)가 반환하는 것은 방을 읽어들인 갯수니까 이것이 -1일 때 루프문을 멈추는 로직을 사용하면 속도도 빠르고 문자 길이도 짧은 로직을 가질 수 있게 된다.

```java
import java.io.*;
class A{
	public static void main(String args[]){
		try(
			FileInputStream fis = new FileInputStream("test.txt");
		){
				byte[] buffer = new byte[3];
				while(true){
					int len = fis.read(buffer);
					if (len == -1) break;
					System.out.println("읽어온 갯수 : " + len);
					for(byte n2 : buffer)
						System.out.println(n2);
					System.out.println("****************");
				}
		}catch(IOException e){
			System.out.println("읽다가 오류남~");
		}
	}
}
```

이렇게.

<br/>

- int available() 메소드 : 파일의 크기를 리턴한다.
- write()메서드 : PrintStream안에 있는 메서드. write메서드는 for문 돌릴 필요 없이, 바이트 배열이 한꺼번에 들어가서 출력시켜줌. 한글도 처리됨. 한개한개 쓰다보면 반바이트씩 가져오므로 한꺼번에 가져오면 한글이 깨지지 않는다.

```java
import java.io.*;
class A{
	public static void main(String args[]){
		try(
			FileInputStream fis = new FileInputStream("A.java");
			PrintStream ps = System.out;
		){
			int size = fis.available();         //파일이 총 몇 바이트인지 구하는 변수
			byte[] buffer = new byte[size];
			int len = fis.read(buffer);
			ps.println("읽어온 갯수 : " + len);
			ps.write(buffer);        //write 메서드 사용.
		}catch(IOException e){
			System.out.println("읽다가 오류남~");
		}
	}
}
```

이것도 근데 `속도를 저하`시킴. 만약 이 파일이 100GB라고 생각해보자. 루프문을 처음부터 끝까지 한번에 돌리다보면 속도가 떨어지게 된다. 이렇게 한번에 읽어들이지 않는다. 끊어서 읽어옴. 실제로는 전전 로직(while문이 들어간)을 사용한다. 

보통, byte[] buffer = new byte[8*1024]; `8kb씩 끊어서. 혹은 4kb씩 끊어서`.

<br/> 

[ex] 메뉴에서 파일을 불러들여서 TextArea에 파일 뿌리기.

```java
import java.awt.*;
import java.awt.event.*;
import java.io.*;
class A extends Frame implements ActionListener{
	MenuBar bar;
	Menu m;
	MenuItem item1, item2;
	TextArea ta;
	A(){
		bar = new MenuBar();
		m = new Menu("파일");
		item1 = new MenuItem("열기");
		item2 = new MenuItem("저장");
		setMenuBar(bar);
		bar.add(m);
		m.add(item1); m.add(item2);
		item1.addActionListener(this);
		ta = new TextArea(); add(ta);
	}
	public void actionPerformed(ActionEvent e){
		FileDialog d = new FileDialog(this, "파일열기");
		d.setVisible(true);
		try(
			FileInputStream fis = new FileInputStream(d.getDirectory()+d.getFile());     //경로와 파일이름을 가져와라.
			PrintStream ps = System.out;
		){
			int size = fis.available();
			byte[] buffer = new byte[size];
			fis.read(buffer);
			ta.append(new String(buffer));   //붙일때 new String() 을 사용.
		}catch(IOException e1){
			System.out.println("읽다가 오류남~");
		}
	}
}
class B{
	public static void main(String args[]){
		A f = new A();
		f.setBounds(200,200,300,400);
		f.setVisible(true);
	}
}
```

<br/>

- 콘솔창에서 한라인씩 읽기

System.in --> 콘솔창에서 읽기

BufferedReader --> 한라인씩 읽기

* 파일에서 한라인씩 읽기

FileInputStream, FileReader --> 파일읽기

BufferedReader --> 한라인씩 읽기(BufferedReader 클래스의 readLine() 메서드가)

 <br/>

Reader in = System.in + BufferedReader;

--> 이런 효과를 가져오려면...(콘솔창에서 한라인씩 읽기 기능을 쓰기 위해, 두개의 기능을 합치고 싶을 때.)

 <br/>

InputStream is = System.in;  //콘솔창에서 읽을 수 있는 변수

BufferedReader br = new BufferedReader(reader라면 다 들어올 수 있다.);   //한줄만 가져올 수 있는 클래스. 

<br/>

여기에 InputStream은 들어올 수 없음. 따라서 현재 콘솔창에서 한 라인만 읽을 수는 없음. 그런데 파일에서는 가능. BufferedReader가 Reader는 받아들일 수 있기 때문에. 즉,

FileReader fr = new FileReader("a.txt");

BufferedReader br = new BufferedReader(fr); //fr은 Reader의 자손이므로 생성자에 넣기 가능.

 <br/>

여기서 InputStreamReader 이런 애가 있다.

InputStream is = System.in;

InputStreamReader isr = new InputStreamReader(is);  //InputStreamReader는 Reader의 자손이다. BufferedReader에 바로 못들어갔지만 이제는 InputStreamReader을 사용하면 가능하다.

BufferedReader br = new BufferedReader(isr);  //이렇게 완성. InputStreamReader는 단순히 두 기능을 묶어주기 위해 매개자의 역할만 한다. 이것을 '파이프라인' 이라고 한다.

 

[ex] 조합완성.

```java
InputStreamReader isr = new InputStreamReader(System.in);
BufferedReader br = new BufferedReader(isr);
String line = br.readLine();    //한 라인 읽어온다.
System.out.println(line);
```

[ex] 이렇게.

```java
import java.io.*;
class A{
	public static void main(String args[]){
		try(
			InputStreamReader isr = new InputStreamReader(System.in);
			BufferedReader br = new BufferedReader(isr);
		){
			String line = br.readLine();    //한 라인 읽어온다.
			System.out.println(line);       //readLine의  EOF 는 null이다.
		}catch(IOException e){
			System.out.println("읽다가 오류남");
		}
	}
}
```

[ex]  앞에 번호 매겨서 줄 출력

```java
import java.io.*;
class A {
    public static void main(String args[]) throws Exception {
        FileInputStream fis = new FileInputStream(args[0]);
        InputStreamReader isr = new InputStreamReader(fis);
        BufferedReader br = new BufferedReader(isr);
        int cnt = 1;
        while(true) {
            String line = br.readLine();
            if(line == null) break;
            System.out.println((cnt++) + " : " + line);
        }
    }
}
```

<br/>

### Scanner

- 생성자 : Scanner(//InputStream의 자식은 다 들어올 수 있다.) 

- public String nextLine() : 줄 읽어서 가져옴.

```java
import java.io.*;
import java.util.*;
class A {
    public static void main(String args[]) {
        try {
            FileInputStream fis = new FileInputStream(args[0]);
            Scanner sc = new Scanner(fis);
            int cnt = 1;
            while(true)
                System.out.println((cnt++) + " : " + sc.nextLine());
        } catch (FileNotFoundException e1) {
            System.out.println("존재하지않는 파일:" + args[0]);
        } catch (NoSuchElementException e2) {
            System.out.println("읽기종료");
        }
    }
}
```

