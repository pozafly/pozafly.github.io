---
title: "Java OutputStream"
excerpt: "JAVA의 OutputStream에 대해서 알아보자."
categories:
  - JAVA
tags:
  - OutputStream
last_modified_at: 2019-07-30
toc: true
toc_sticky: true

---



## OutputStream

- void write(int b)메소드 : b 코드값 내용을 써준다.

- String 클래스에 public byte[] getBytes()라는 메서드가 있음. : 바이트 배열 코드 값으로 바꿔줌.

```java
import java.io.*;
class A{
	public static void main(String args[]){
		try(
			FileOutputStream out = new FileOutputStream("a.txt");
		){
			String msg = "ABC";
			out.write(msg.getBytes());     //ABC를  a.txt에 입력시켜줌.
			//String 클래스에서 return 타입이 byte배열이 있다 : getBytes()
		}catch(Exception e){
			System.out.println("파일 쓰다가 오류발생~");
		}
	}
}
```

<br/>

[ex] 프레임에서 자료를 입력하고 파일로 출력시키는 소스

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
		item2.addActionListener(this);
		ta = new TextArea(); add(ta);
	}
	public void actionPerformed(ActionEvent e){
		FileDialog d = new FileDialog(this, "파일열기");
		d.setVisible(true);
		String fn = d.getDirectory()+d.getFile();
		if(e.getSource() == item1)
			readFile(fn);
		else
			writeFile(fn);
	}
	void readFile(String fn){
		try(
			FileInputStream fis = new FileInputStream(fn);
		){
			int size = fis.available();
			byte[] buffer = new byte[size];
			fis.read(buffer);
			ta.append(new String(buffer));
		}catch(IOException e1){
			System.out.println("읽다가 오류남~");
		}
	}
	void writeFile(String fn){
		try(
			FileOutputStream out = new FileOutputStream(fn);
		){
			String msg = ta.getText();
			out.write(msg.getBytes());
		}catch(IOException e1){
			System.out.println("쓰다가 오류남~");
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

[ex] 첫번째 입력된 파일의 내용을 두번째 입력된 파일에 내용복사 하려면?

```java
[exec]  java A a.java b.java
  
import java.io.*;
class A{
	public static void main(String args[]){
		try(
			FileInputStream in = new FileInputStream(args[0]);
			FileOutputStream out = new FileOutputStream(args[1]);
		){
			byte[] buffer = new byte[in.available()];
			in.read(buffer);
			out.write(buffer);  //여기서 왜 flush하지 않았느냐? 자원정리할 때 알아서 들어가 있음.
		}catch(Exception e){
			System.out.println("IO오류 발생~");
		}
	}
}
```

- flush() 메서드 : 읽은 내용을 한번에 보낸다.

출력 스트림을 사용할 때, write메서드를 호출 한 뒤 반드시 flush메서드를 호출하는 것이 좋다.