import type { LectureDeck } from '../types'

export const javaAdvancedDeck: LectureDeck = {
  id: 'java-advanced',
  title: 'Java 03. 컬렉션과 예외 처리',
  description: '실무 데이터 관리의 핵심 컬렉션 프레임워크와 안정적인 앱을 위한 예외 처리',
  slides: [
    {
      eyebrow: 'Exception',
      title: '프로그램의 위기 관리: 예외 처리',
      summary: '에러가 발생해도 프로그램이 멈추지 않게 방어막을 치는 방법입니다.',
      code: {
        title: 'try-catch-finally',
        language: 'java',
        body: `try {
    int result = 10 / 0; // 예외 발생
} catch (ArithmeticException e) {
    System.out.println("0으로 나눌 수 없습니다.");
} finally {
    System.out.println("무조건 실행되는 코드");
}

// 실무에서는 사용자 정의 예외를 만들어 관리합니다.`,
      },
    },
    {
      eyebrow: 'Collection',
      title: 'Collection Framework',
      summary: '다수의 데이터를 효율적으로 저장하고 관리하기 위한 표준화된 인터페이스입니다.',
      visual: 'terms',
      bullets: [
        'List: 순서가 있고 중복을 허용 (ArrayList, LinkedList)',
        'Set: 순서가 없고 중복 불가 (HashSet, TreeSet)',
        'Map: Key-Value 쌍으로 관리 (HashMap, TreeMap)',
        'Stack/Queue: 자료 구조 특성에 맞는 저장 방식',
      ],
    },
    {
      eyebrow: 'ArrayList',
      title: '가장 많이 쓰는 List: ArrayList',
      summary: '배열의 크기가 가변적으로 변하는 구조입니다. 데이터 조회 속도가 빠릅니다.',
      code: {
        title: 'ArrayList 활용',
        language: 'java',
        body: `List<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");

fruits.get(0); // "Apple"
fruits.size(); // 2
fruits.remove("Apple");`,
      },
    },
    {
      eyebrow: 'HashMap',
      title: '데이터 매핑의 달인: HashMap',
      summary: '키(Key)를 통해 값(Value)을 순식간에 찾아냅니다. 사전과 같은 구조입니다.',
      code: {
        title: 'HashMap 활용',
        language: 'java',
        body: `Map<String, Integer> scores = new HashMap<>();
scores.put("Kim", 90);
scores.put("Lee", 85);

int score = scores.get("Kim"); // 90
boolean hasLee = scores.containsKey("Lee"); // true`,
      },
    },
    {
      eyebrow: 'Modern Java',
      title: 'Java 8+ 핵심: 람다와 스트림',
      summary: '코드를 더 간결하고 가독성 좋게 만드는 함수형 프로그래밍 스타일입니다.',
      visual: 'stream',
      code: {
        title: 'Stream API 맛보기',
        language: 'java',
        body: `List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// 짝수만 골라서 2배로 만들기
List<Integer> result = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .collect(Collectors.toList());`,
      },
      tip: '스트림은 데이터 소스를 변경하지 않고, 일회용으로만 사용됨을 기억하세요.',
    },
    {
      eyebrow: 'Safety',
      title: 'Null의 공포에서 탈출: Optional',
      summary: 'NullPointerException을 예방하기 위한 래퍼 클래스입니다.',
      code: {
        title: 'Optional 활용',
        language: 'java',
        body: `Optional<String> name = Optional.ofNullable(getName());

// 값이 없으면 "Unknown" 반환
String result = name.orElse("Unknown");

// 값이 있을 때만 동작 실행
name.ifPresent(System.out::println);`,
      },
    },
    {
      eyebrow: 'Wrapping Up',
      title: 'Spring Boot로 가는 길',
      summary: '이제 Java의 기초 체력을 길렀습니다. 다음 단계는 Spring Framework입니다.',
      checklist: [
        'Annotation 기반 프로그래밍 이해하기',
        '의존성 주입(DI) 개념 맛보기',
        'Gradle 빌드 도구 익히기',
        'Spring Initializr로 첫 프로젝트 만들기',
      ],
    },
    {
      eyebrow: 'Mission',
      title: '미션: 학생 성적 관리 시스템',
      summary: '컬렉션과 스트림을 사용하여 데이터를 처리하는 프로그램을 만듭니다.',
      checklist: [
        'Student 객체들을 List에 담기',
        'Map을 사용해 학번으로 학생 정보 찾기',
        'Stream을 사용해 평균 점수 80점 이상인 학생만 필터링',
        'Optional을 사용하여 없는 학생 조회 시 안전하게 처리',
      ],
      tip: '현업에서 리스트 데이터를 가공할 때 Stream이 얼마나 편한지 체감하게 해주세요.',
    },
  ],
  presenterScripts: [
    [
      '축하드립니다! 벌써 자바의 세 번째 단계까지 오셨네요.',
      '오늘은 프로그램이 예상치 못한 상황을 만났을 때 어떻게 대처하는지(예외 처리), 그리고 수많은 데이터를 어떻게 효율적으로 다루는지(컬렉션)를 배울 겁니다.',
      '특히 오늘 배우는 내용들은 여러분이 나중에 스프링 부트로 웹 서버를 만들 때 매일같이 쓰게 될 정말 중요한 도구들입니다.',
      '조금만 더 힘내서 자바 마스터로 거듭나 봅시다!',
    ],
    [
      '프로그램을 짜다 보면 꼭 에러가 나기 마련입니다. 특히 0으로 나누거나, 없는 데이터를 찾을 때 말이죠.',
      '이럴 때 프로그램이 "나 못해!" 하고 그냥 꺼져버리면 안 되겠죠? 그래서 try-catch라는 방어막을 쳐줍니다.',
      '문제가 생길 것 같은 코드를 try 안에 넣고, 문제가 생기면 catch에서 수습하는 거예요.',
      'finally는 비가 오나 눈이 오나 무조건 실행해야 하는 뒷정리 코드를 넣는 곳입니다. "안전한 프로그램"을 만드는 첫걸음이죠.',
    ],
    [
      '우리가 다뤄야 할 데이터가 100개, 1000개라면 변수 1000개를 만들 순 없겠죠?',
      '그래서 자바는 데이터를 묶음으로 관리하는 컬렉션 프레임워크를 제공합니다.',
      '순서가 중요한 List, 중복을 싫어하는 Set, 그리고 이름표를 붙여서 저장하는 Map까지!',
      '상황에 맞는 바구니를 고르는 게 실력 있는 개발자의 능력입니다. 하나씩 자세히 살펴볼까요?',
    ],
    [
      '가장 많이 쓰이는 List의 대명사, ArrayList입니다. 그냥 "크기가 마음대로 늘어나는 배열"이라고 생각하면 편해요.',
      '데이터를 뒤에 추가하거나 중간에서 꺼내오는 게 정말 빠릅니다. 웬만한 목록 기능은 다 이 친구로 해결할 수 있죠.',
      '실무에서도 90% 이상의 리스트는 ArrayList를 쓴다고 봐도 무방할 정도로 중요한 클래스입니다.',
    ],
    [
      '데이터를 찾을 때 이름표(Key)가 있다면 얼마나 편할까요? 그게 바로 HashMap입니다.',
      '학번으로 이름을 찾거나, 아이디로 비밀번호를 찾는 상황에 딱이죠.',
      '데이터가 아무리 많아도 키값만 알면 빛의 속도로 값을 찾아낼 수 있는 아주 똑똑한 친구입니다.',
      '단, 키값은 중복될 수 없다는 점! "홍길동"이라는 이름의 사물함은 하나여야 하니까요.',
    ],
    [
      '자바 8 버전 이후로 코딩 스타일이 완전히 바뀌었습니다. 바로 람다와 스트림 덕분인데요.',
      '복잡한 for문과 if문을 쓰지 않고도 "필터링하고, 변환해서, 모아라"라는 식으로 마치 말하듯이 코드를 짤 수 있습니다.',
      '처음엔 낯설 수 있지만, 한 번 익숙해지면 예전 방식으로 돌아가기 싫을 정도로 코드가 간결하고 아름다워집니다.',
      '요즘 최신 프로젝트들은 거의 다 이 방식으로 작성되니 꼭 익혀두세요.',
    ],
    [
      '자바 개발자를 가장 괴롭히는 에러 1위가 뭔지 아세요? 바로 NullPointerException입니다.',
      '데이터가 있을 줄 알고 접근했는데 아무것도 없을 때(null) 발생하는 비명 같은 에러죠.',
      'Optional은 이 null을 안전하게 담는 상자입니다. 상자를 열기 전에 "안에 내용물이 있나?"를 먼저 체크하게 해서 에러를 근본적으로 막아줍니다.',
      '이제 null 때문에 프로그램이 터지는 일은 없게 만들어 봅시다.',
    ],
    [
      '정말 고생 많으셨습니다! 이제 여러분은 자바의 핵심을 모두 꿰뚫으셨습니다.',
      '하지만 여기서 끝이 아니죠. 이 강력한 자바 실력을 바탕으로 이제 "스프링 부트"라는 거대한 날개를 달아볼 겁니다.',
      '스프링은 여러분이 짠 자바 코드를 실제 돌아가는 멋진 웹 서비스로 만들어줄 최고의 프레임워크입니다.',
      '다음 스터디에서는 본격적인 웹 개발의 세계로 떠나보겠습니다. 오늘 정말 수고하셨습니다!',
    ],
    [
      '마지막 실전 미션입니다! 학생들의 성적을 관리하는 시스템을 구축해 보세요.',
      '리스트에 학생들을 담고, 맵으로 특정 학생을 찾고, 스트림으로 우수 학생을 걸러내는 과정을 직접 구현해 보시길 바랍니다.',
      '이 과정을 마스터하면 여러분은 어떤 복잡한 데이터도 자바 안에서 자유자재로 다루실 수 있을 겁니다.',
    ],
  ],
}
