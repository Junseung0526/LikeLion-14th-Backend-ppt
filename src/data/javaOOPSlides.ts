import type { LectureDeck } from '../types'

export const javaOOPDeck: LectureDeck = {
  id: 'java-oop-deep',
  title: 'Java 02. 객체지향 프로그래밍 (OOP)',
  description: '객체지향의 4대 원칙과 Java 클래스 설계의 핵심',
  slides: [
    {
      eyebrow: 'Concept',
      title: '절차지향 vs 객체지향',
      summary: '프로그램을 바라보는 관점의 차이입니다. 왜 현대 소프트웨어는 객체지향을 선택했을까요?',
      visual: 'terms',
      bullets: [
        '절차지향: 실행 순서와 로직 중심 (C언어 등)',
        '객체지향: 데이터와 기능을 가진 "객체" 중심',
        '유지보수: 객체 단위로 모듈화되어 수정이 용이함',
        '재사용성: 상속과 다형성을 통한 코드 재사용 가능',
      ],
    },
    {
      eyebrow: 'Class & Object',
      title: '클래스는 설계도, 객체는 실체',
      summary: '클래스를 통해 붕어빵 틀을 만들고, 인스턴스화를 통해 실제 붕어빵(객체)을 만듭니다.',
      visual: 'java-box',
      code: {
        title: '클래스 구조',
        language: 'java',
        body: `public class Car {
    // 필드 (속성)
    String model;
    int speed;

    // 생성자 (객체 초기화)
    public Car(String model) {
        this.model = model;
    }

    // 메서드 (동작)
    void accelerate() { speed += 10; }
}`,
      },
    },
    {
      eyebrow: 'Encapsulation',
      title: '1. 캡슐화와 접근 제어자',
      summary: '데이터를 외부로부터 숨기고(은닉), 허용된 인터페이스를 통해서만 접근하게 합니다.',
      code: {
        title: 'Getter / Setter 활용',
        language: 'java',
        body: `public class User {
    private String password; // 외부 접근 불가

    public String getPassword() { return "****"; }
    public void setPassword(String pw) {
        if (pw.length() > 8) this.password = pw;
    }
}`,
      },
      tip: 'private, default, protected, public의 차이를 반드시 숙지하세요.',
    },
    {
      eyebrow: 'Inheritance',
      title: '2. 상속 (Inheritance)',
      summary: '부모 클래스의 기능을 자식 클래스가 물려받아 확장(extends)하는 개념입니다.',
      code: {
        title: 'extends 키워드',
        language: 'java',
        body: `class Animal {
    void eat() { System.out.println("Eating..."); }
}

class Dog extends Animal {
    void bark() { System.out.println("Woof!"); }
}

// Dog은 eat()과 bark()를 모두 가짐`,
      },
    },
    {
      eyebrow: 'Polymorphism',
      title: '3. 다형성 (Polymorphism)',
      summary: '하나의 객체가 여러 가지 타입을 가질 수 있는 능력입니다. OOP의 핵심 중의 핵심입니다.',
      code: {
        title: '업캐스팅과 오버라이딩',
        language: 'java',
        body: `Animal myDog = new Dog(); // 부모 타입으로 참조
myDog.move(); // 실제 객체(Dog)의 오버라이딩된 메서드 실행

// 인터페이스를 통한 다형성 구현이 실무의 핵심`,
      },
    },
    {
      eyebrow: 'Abstraction',
      title: '4. 추상화 (Abstraction)',
      summary: '복잡한 내부 구현은 숨기고 공통된 핵심 인터페이스만 정의합니다.',
      table: {
        headers: ['구분', '추상 클래스 (Abstract Class)', '인터페이스 (Interface)'],
        rows: [
          ['키워드', 'abstract extends', 'interface implements'],
          ['목적', '공통 기능의 확장', '동작의 규격 정의'],
          ['다중 상속', '불가능', '가능 (강력한 유연성)'],
        ],
      },
    },
    {
      eyebrow: 'Mission',
      title: '미션: 동물원 관리 시스템 설계',
      summary: '오늘 배운 OOP 4대 원칙을 적용하여 간단한 클래스 구조를 설계해 봅니다.',
      checklist: [
        'Animal 추상 클래스 만들기 (추상화)',
        'Lion, Eagle 클래스가 Animal 상속받기 (상속)',
        '각 동물의 울음소리를 다르게 구현하기 (다형성)',
        '나이(age) 필드를 private으로 보호하기 (캡슐화)',
      ],
      tip: '클래스 다이어그램을 화이트보드에 간단히 그려보며 설명하면 효과적입니다.',
    },
  ],
  presenterScripts: [
    [
      '이제 자바의 꽃이라고 할 수 있는 객체지향 프로그래밍, OOP에 대해 알아볼 시간입니다.',
      '예전에는 위에서 아래로 순서대로 실행되는 절차지향 방식이 대세였지만, 프로그램이 거대해지면서 한계를 맞이했습니다.',
      '그래서 현대 소프트웨어는 관련된 데이터와 기능을 하나로 묶은 "객체"를 조립해서 만드는 방식을 선택했죠.',
      '조금 어렵게 느껴질 수 있지만, 오늘 이 4대 원칙만 이해해도 여러분은 자바 개발자의 절반은 성공하신 겁니다.',
    ],
    [
      '클래스와 객체, 가장 기본이 되는 개념입니다. 저는 보통 "붕어빵 틀"과 "붕어빵"에 비유하곤 하는데요.',
      '클래스는 어떤 속성과 기능을 가질지 정의한 설계도(틀)이고, 객체는 그 설계도를 바탕으로 메모리에 실제로 만들어낸 결과물(붕어빵)입니다.',
      '우리가 Car라는 설계도를 하나 잘 만들어두면, 그걸로 수만 대의 서로 다른 자동차 객체를 찍어낼 수 있는 거죠.',
    ],
    [
      '첫 번째 원칙, 캡슐화입니다. 이름 그대로 중요한 데이터를 캡슐 안에 넣어서 보호하는 거예요.',
      '변수를 private으로 막아서 아무나 못 고치게 하고, 대신 공개된 메서드(Getter/Setter)를 통해서만 접근하게 합니다.',
      '왜 이렇게 귀찮게 하냐고요? 나중에 데이터가 잘못 바뀌었을 때 범인을 찾기 쉽고, 내부 구현을 바꿔도 밖에서는 알 필요가 없기 때문입니다. 이게 바로 유지보수의 핵심입니다.',
    ],
    [
      '두 번째는 상속입니다. 부모님이 물려주신 재산처럼, 기존 클래스의 기능을 그대로 이어받는 거예요.',
      'Animal이라는 공통 기능을 부모로 두고, Dog이나 Cat이 이를 상속받으면 "먹는다", "숨 쉰다" 같은 공통 코드를 중복해서 짤 필요가 없죠.',
      'extends 키워드 하나로 코드의 재사용성이 비약적으로 올라갑니다.',
    ],
    [
      '세 번째, 다형성입니다. OOP의 진정한 마법 같은 기능이죠.',
      '하나의 타입(Animal)으로 여러 형태의 객체(Dog, Cat)를 가리킬 수 있는 능력입니다.',
      '우리는 그저 "동물아, 소리 내봐!"라고 명령만 하면, 실제 객체가 강아지면 멍멍, 고양이면 야옹 하고 알아서 반응합니다. 코드가 훨씬 유연해지고 확장하기 좋아지죠.',
    ],
    [
      '마지막 네 번째는 추상화입니다. 복잡한 건 숨기고 알맹이만 보여주는 거죠.',
      '추상 클래스와 인터페이스가 이 역할을 담당하는데, 특히 인터페이스는 "이 기능을 만들려면 이 규칙은 꼭 지켜야 해!"라는 약속과 같습니다.',
      '실무에서는 인터페이스를 먼저 설계하고 구현을 나중에 하는 방식이 아주 일반적입니다. 협업의 기준이 되기 때문이죠.',
    ],
    [
      '오늘의 핵심 미션입니다! 동물원 관리 프로그램을 설계해 볼 거예요.',
      '동물이라는 큰 틀(추상 클래스)을 만들고, 사자와 독수리가 각자의 특징을 살려 상속받게 해보세요.',
      '다형성을 활용해 모든 동물을 리스트에 담고 한꺼번에 울게 만드는 코드를 짜본다면, 오늘 배운 내용을 완벽히 이해하신 겁니다.',
    ],
  ],
}
