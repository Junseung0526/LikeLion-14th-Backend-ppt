import type { LectureDeck } from '../types'

export const javaSyntaxDeck: LectureDeck = {
  id: 'java-syntax',
  title: 'Java 01. 기초 문법과 제어문',
  description: 'Java 개발 환경 구축부터 변수, 데이터 타입, 조건문, 반복문까지',
  slides: [
    {
      eyebrow: 'Intro',
      title: 'Java의 탄생과 철학',
      summary: '1995년 탄생한 Java가 왜 여전히 기업형 서비스(Enterprise) 시장에서 1위인지 알아봅니다.',
      visual: 'java-intro',
      checklist: ['Write Once, Run Anywhere', '강력한 타입 체크', 'Garbage Collection', '풍부한 오픈소스 생태계'],
      tip: 'C/C++과의 가장 큰 차이점인 "메모리 관리(GC)"와 "플랫폼 독립성(JVM)"을 강조하세요.',
    },
    {
      eyebrow: 'Environment',
      title: 'JDK vs JRE vs JVM',
      summary: 'Java 개발을 위해 반드시 이해해야 하는 환경의 차이입니다.',
      visual: 'jvm',
      bullets: [
        'JDK: Java Development Kit (컴파일러 + JRE)',
        'JRE: Java Runtime Environment (JVM + 라이브러리)',
        'JVM: Java Virtual Machine (Java 프로그램을 실행하는 가상 머신)',
        'LTS Version: Long Term Support (안정적인 지원 버전 - 8, 11, 17, 21)',
      ],
    },
    {
      eyebrow: 'Variables',
      title: '데이터 타입과 변수',
      summary: 'Java는 엄격한 타입 언어입니다. 메모리 효율을 위해 용도에 맞는 타입을 써야 합니다.',
      code: {
        title: 'Primitive vs Reference Types',
        language: 'java',
        body: `// 기본형 (Primitive) - 실제 값을 저장
int age = 20;
long distance = 10000000000L;
double pi = 3.14;
boolean isValid = true;

// 참조형 (Reference) - 주소값을 저장
String name = "LIKELION";
Object obj = new Object();`,
      },
    },
    {
      eyebrow: 'Operators',
      title: '연산자와 우선순위',
      summary: '산술, 비교, 논리 연산자를 조합하여 로직을 만듭니다.',
      table: {
        headers: ['종류', '연산자', '설명'],
        rows: [
          ['산술', '+, -, *, /, %', '기본 사칙연산 및 나머지'],
          ['비교', '==, !=, >, <, >=', '값의 크기나 일치 여부 비교'],
          ['논리', '&&, ||, !', 'AND, OR, NOT 연산'],
          ['증감', '++, --', '값을 1 증가 또는 감소'],
        ],
      },
    },
    {
      eyebrow: 'Control Flow',
      title: '조건문 (if, switch)',
      summary: '프로그램의 흐름을 결정하는 의사결정 구조입니다.',
      code: {
        title: 'switch expression (Java 14+)',
        language: 'java',
        body: `// 기존 방식보다 간결해진 switch
String result = switch (day) {
    case MONDAY, FRIDAY -> "Keep going";
    case SATURDAY, SUNDAY -> "Relax";
    default -> "Work";
};`,
      },
    },
    {
      eyebrow: 'Loops',
      title: '반복문 (for, while)',
      summary: '동일한 작업을 효율적으로 반복 처리합니다.',
      code: {
        title: '다양한 반복문 구조',
        language: 'java',
        body: `// 일반 for문
for (int i = 0; i < 10; i++) { ... }

// 향상된 for문 (Collection/Array 순회)
for (String s : list) { ... }

// while문 (조건 중심)
while (count < 100) { ... }`,
      },
    },
    {
      eyebrow: 'Exercise',
      title: '실습: 별 찍기와 구구단',
      summary: '오늘 배운 제어문을 활용하여 기본적인 알고리즘을 구현해 봅니다.',
      checklist: ['이중 for문 이해하기', 'Scanner 클래스로 입력받기', '조건문으로 홀/짝 구분'],
    },
    {
      eyebrow: 'Mission',
      title: '오늘의 도전 과제',
      summary: '배운 내용을 바탕으로 간단한 계산기 프로그램을 만들어 보세요.',
      checklist: [
        'Scanner로 두 숫자와 연산자(+, -, *, /) 입력받기',
        'switch문을 사용하여 연산 수행하기',
        '결과 출력 후 반복 여부 묻기',
      ],
      tip: '0으로 나눌 때의 예외 처리를 if문으로 미리 시도해 보라고 유도하세요.',
    },
  ],
  presenterScripts: [
    [
      '안녕하세요! 오늘부터 자바의 세계에 발을 들이게 된 여러분을 환영합니다.',
      '자바는 1995년에 처음 나왔지만, 지금까지도 전 세계 수많은 대기업에서 가장 선호하는 언어 1위 자리를 지키고 있습니다.',
      '왜 그럴까요? 한 번 짜면 어디서든 돌아간다는 철학과, 개발자가 메모리 관리 같은 골치 아픈 일을 신경 쓰지 않아도 되게 해주는 강력한 기능들 덕분입니다.',
      '오늘 저희는 그 첫 단추인 기초 문법부터 차근차근 꿰어보도록 하겠습니다.',
    ],
    [
      '본격적으로 코딩하기 전에 용어 정리부터 확실히 해봅시다. JDK, JRE, JVM... 이름이 비슷해서 헷갈리시죠?',
      '쉽게 생각해서 JVM은 자바를 실행하는 엔진, JRE는 그 엔진에 필요한 부품들을 모아둔 것, 그리고 JDK는 이 모든 것을 포함하면서 우리가 코드를 짤 때 쓰는 도구들(컴파일러 등)까지 합친 세트라고 보시면 됩니다.',
      '우리는 개발자니까 무조건 JDK를 설치해야겠죠? 특히 실무에서 가장 많이 쓰는 17이나 21 버전을 추천드립니다.',
    ],
    [
      '자바는 타입에 굉장히 엄격한 언어입니다. "내가 지금 정수를 쓰는지, 실수를 쓰는지"를 명확히 해야 하죠.',
      '가장 많이 쓰는 int(정수), double(실수), boolean(참/거짓) 같은 기본형들이 있고, 글자를 담는 String 같은 참조형이 있습니다.',
      '처음엔 복잡해 보일 수 있지만, 이렇게 타입을 명확히 정해주기 때문에 큰 프로그램을 만들 때 에러를 미리 잡아주는 강력한 힘이 됩니다.',
    ],
    [
      '연산자는 수학 시간에 배운 것과 거의 비슷합니다. 사칙연산부터 크기를 비교하는 연산자까지 있죠.',
      '여기서 조금 생소할 수 있는 건 % 연산자인데, 나눗셈의 몫이 아니라 "나머지"를 구해주는 친구입니다. 홀수나 짝수를 구분할 때 정말 자주 쓰이니 꼭 기억해 두세요.',
      '그리고 ++나 -- 같은 증감 연산자는 코드를 아주 간결하게 만들어주는 자바의 감초 같은 존재입니다.',
    ],
    [
      '조건문은 프로그램에 "생각하는 힘"을 주는 도구입니다. "만약 이렇다면 이걸 해라"라고 시키는 거죠.',
      '가장 기본인 if문도 좋지만, 조건이 많을 때는 switch문을 쓰는 게 깔끔합니다.',
      '특히 최신 자바에서는 화살표(->)를 사용해서 훨씬 더 예쁘고 읽기 쉬운 switch문을 쓸 수 있게 되었으니, 구식 방식보다는 이 새로운 방식을 익혀보시길 추천합니다.',
    ],
    [
      '컴퓨터가 인간보다 훨씬 잘하는 일, 바로 반복입니다. 같은 일을 수만 번 시켜도 군말 없이 하죠.',
      '일반적인 for문은 숫자를 세면서 반복할 때 좋고, 리스트나 배열에 담긴 것들을 하나씩 꺼내볼 때는 "향상된 for문"이 최곱니다.',
      '조건이 맞을 때까지 계속 돌아야 한다면 while문을 쓰면 됩니다. 단, 무한 루프에 빠지지 않게 조심해야겠죠?',
    ],
    [
      '자, 이제 머리로 배운 내용을 손으로 익힐 시간입니다! 오늘 배운 제어문들을 총동원해 볼 거예요.',
      '화면에 별을 삼각형 모양으로 찍어보고, 숫자를 입력받아 구구단을 출력하는 프로그램을 직접 짜보겠습니다.',
      '처음엔 이중 for문이 헷갈릴 수 있지만, 안쪽과 바깥쪽 반복문이 어떻게 맞물려 도는지 천천히 코드를 따라가다 보면 어느새 감이 오실 겁니다. 화이팅!',
    ],
    [
      '마지막으로 오늘의 도전 과제입니다! 지금까지 배운 모든 것을 쏟아부어 "콘솔 계산기"를 만들어 보세요.',
      '숫자 두 개와 연산자를 입력받아 결과를 보여주는 프로그램입니다.',
      '단순히 결과만 보여주고 끝내는 게 아니라, "계속하시겠습니까?"라고 물어보고 사용자가 원할 때까지 반복하도록 만들면 완벽합니다.',
      '오늘 정말 고생 많으셨습니다. 막히는 부분이 있으면 언제든 질문해 주세요!',
    ],
  ],
}
