import type { LectureDeck } from '../types'

export const springBootCrudDeck: LectureDeck = {
  id: 'spring-boot-crud',
  title: 'SpringBootCRUD',
  description: '게시판 Board CRUD REST API 실습',
  slides: [
    {
      eyebrow: 'Spring Boot CRUD',
      title: '게시판 Board CRUD API 만들기',
      summary:
        'Spring Web, Spring Data JPA, H2 Database를 사용해서 REST API 구조의 게시판 백엔드를 구현합니다.',
      visual: 'overview',
      checklist: ['Create', 'Read', 'Update', 'Delete', 'CORS', 'Swagger'],
    },
    {
      eyebrow: 'Beginner',
      title: '처음 보는 용어 먼저 정리',
      summary:
        '초보자는 코드보다 용어가 먼저 익숙해져야 합니다. 오늘 자주 나오는 단어를 간단히 정리하고 시작합니다.',
      bullets: [
        'REST API: 주소와 Method로 기능을 구분하는 방식',
        'Entity: DB 테이블을 Java 클래스로 옮긴 것',
        'DTO: 요청과 응답에 쓰는 전달용 객체',
        'Service: 실제 동작 순서를 처리하는 곳',
        'Repository: DB와 직접 연결되는 곳',
      ],
    },
    {
      eyebrow: 'Goal',
      title: '오늘 완성할 기능',
      bullets: [
        '게시글 작성: 제목, 작성자, 내용을 받아 저장',
        '게시글 목록 조회: 저장된 게시글 전체를 JSON으로 응답',
        '게시글 상세 조회: id로 게시글 1개 조회',
        '게시글 수정: id로 기존 게시글을 찾아 내용 변경',
        '게시글 삭제: id로 게시글 삭제',
      ],
    },
    {
      eyebrow: 'REST API',
      title: 'CRUD와 HTTP Method 매핑',
      table: {
        headers: ['기능', 'Method', 'URL', '역할'],
        rows: [
          ['작성', 'POST', '/api/boards', '새 게시글 저장'],
          ['목록', 'GET', '/api/boards', '게시글 전체 조회'],
          ['상세', 'GET', '/api/boards/{id}', '게시글 1개 조회'],
          ['수정', 'PUT', '/api/boards/{id}', '게시글 내용 변경'],
          ['삭제', 'DELETE', '/api/boards/{id}', '게시글 제거'],
        ],
      },
    },
    {
      eyebrow: 'Architecture',
      title: '요청이 처리되는 흐름',
      summary:
        '클라이언트 요청은 Controller에서 시작해 Service와 Repository를 거쳐 DB까지 이동합니다. 각 계층은 맡은 일만 처리합니다.',
      visual: 'layers',
      bullets: [
        'Controller는 URL, HTTP Method, JSON 요청과 응답을 담당합니다.',
        'Service는 게시글 작성, 수정, 삭제처럼 앱의 실제 규칙을 처리합니다.',
        'Repository는 JPA를 이용해 DB 저장과 조회를 담당합니다.',
        '구조가 분리되어 있으면 에러가 났을 때 확인할 위치가 명확합니다.',
      ],
    },
    {
      eyebrow: 'Project',
      title: '프로젝트 생성과 의존성',
      bullets: [
        'Spring Initializr에서 Java 17 이상, Spring Boot 3.x 선택',
        'Dependencies: Spring Web, Spring Data JPA, H2 Database, Swagger UI',
        '빌드 도구는 Gradle 또는 Maven 중 수업 환경에 맞게 선택',
      ],
      code: {
        title: 'build.gradle dependencies 예시',
        language: 'gradle',
        body: `dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.16'
    runtimeOnly 'com.h2database:h2'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}`,
      },
    },
    {
      eyebrow: 'Structure',
      title: '프로젝트 폴더 구조',
      summary:
        '처음에는 파일이 많아 보이지만, 역할별로 위치가 정해져 있어 찾기 쉽습니다.',
      code: {
        title: 'src/main/java/com/example/board',
        language: 'text',
        body: `board
 ├─ BoardApplication.java
 ├─ config/CorsConfig.java
 ├─ controller/BoardController.java
 ├─ service/BoardService.java
 ├─ repository/BoardRepository.java
 ├─ entity/Board.java
 └─ dto/BoardRequest.java, BoardResponse.java`,
      },
    },
    {
      eyebrow: 'Config',
      title: 'H2 Database와 JPA 설정',
      bullets: [
        'H2는 서버를 따로 설치하지 않고 쓰는 실습용 DB입니다.',
        'ddl-auto=create는 앱 실행 시 테이블을 새로 만듭니다.',
        'show-sql=true로 JPA가 실행하는 SQL을 콘솔에서 확인합니다.',
      ],
      code: {
        title: 'src/main/resources/application.yml',
        language: 'yaml',
        body: `spring:
  datasource:
    url: jdbc:h2:mem:boarddb
    driver-class-name: org.h2.Driver
    username: sa
    password:
  h2:
    console:
      enabled: true
      path: /h2-console
  jpa:
    hibernate:
      ddl-auto: create
    show-sql: true`,
      },
    },
    {
      eyebrow: 'Entity',
      title: 'Board Entity 작성',
      bullets: [
        '@Entity는 이 클래스가 DB 테이블과 연결된다는 뜻입니다.',
        '@Id는 기본키, @GeneratedValue는 id 자동 증가 설정입니다.',
        '@PrePersist는 저장 직전에 createdAt 값을 넣을 때 사용합니다.',
      ],
      code: {
        title: 'entity/Board.java',
        language: 'java',
        body: `@Entity
public class Board {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String writer;

    @Column(columnDefinition = "TEXT")
    private String content;
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}`,
      },
    },
    {
      eyebrow: 'DTO',
      title: '요청 DTO와 응답 DTO',
      summary:
        'Entity를 API 요청/응답에 그대로 쓰기보다 DTO로 분리하면 코드 변경에 강해집니다.',
      code: {
        title: 'dto/BoardRequest.java / BoardResponse.java',
        language: 'java',
        body: `public class BoardRequest {
    private String title;
    private String writer;
    private String content;
}

public class BoardResponse {
    private Long id;
    private String title;
    private String writer;
    private String content;
    private LocalDateTime createdAt;

    public static BoardResponse from(Board board) {
        // Entity를 응답 DTO로 변환
    }
}`,
      },
    },
    {
      eyebrow: 'Repository',
      title: 'JPA Repository 작성',
      summary:
        'JpaRepository를 상속하면 save, findAll, findById, deleteById 같은 기본 CRUD 메서드를 바로 사용할 수 있습니다.',
      code: {
        title: 'repository/BoardRepository.java',
        language: 'java',
        body: `public interface BoardRepository
        extends JpaRepository<Board, Long> {
}`,
      },
    },
    {
      eyebrow: 'Service',
      title: '작성과 목록 조회 로직',
      bullets: [
        'Controller는 요청만 받고 실제 로직은 Service에서 처리합니다.',
        '@Transactional은 DB 작업을 하나의 작업 단위로 묶습니다.',
      ],
      code: {
        title: 'service/BoardService.java',
        language: 'java',
        body: `@Service
@Transactional
public class BoardService {
    private final BoardRepository boardRepository;

    public BoardResponse create(BoardRequest request) {
        Board board = new Board();
        board.setTitle(request.getTitle());
        board.setWriter(request.getWriter());
        board.setContent(request.getContent());
        return BoardResponse.from(boardRepository.save(board));
    }

    @Transactional(readOnly = true)
    public List<BoardResponse> findAll() {
        return boardRepository.findAll().stream()
                .map(BoardResponse::from)
                .toList();
    }
}`,
      },
    },
    {
      eyebrow: 'Service',
      title: '상세 조회, 수정, 삭제 로직',
      code: {
        title: 'BoardService 추가 메서드',
        language: 'java',
        body: `public BoardResponse findOne(Long id) {
    Board board = boardRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다."));
    return BoardResponse.from(board);
}

public BoardResponse update(Long id, BoardRequest request) {
    Board board = boardRepository.findById(id).orElseThrow();
    board.setTitle(request.getTitle());
    board.setWriter(request.getWriter());
    board.setContent(request.getContent());
    return BoardResponse.from(board);
}

public void delete(Long id) {
    boardRepository.deleteById(id);
}`,
      },
    },
    {
      eyebrow: 'Controller',
      title: 'REST Controller 작성',
      bullets: [
        '@RestController는 JSON 응답을 반환합니다.',
        '@RequestBody는 JSON 요청을 Java 객체로 바꿉니다.',
        '@PathVariable은 URL 안의 id 값을 받습니다.',
      ],
      code: {
        title: 'controller/BoardController.java',
        language: 'java',
        body: `@RestController
@RequestMapping("/api/boards")
public class BoardController {
    private final BoardService boardService;

    @PostMapping
    public BoardResponse create(@RequestBody BoardRequest request) {
        return boardService.create(request);
    }

    @GetMapping
    public List<BoardResponse> findAll() {
        return boardService.findAll();
    }
}`,
      },
    },
    {
      eyebrow: 'Controller',
      title: '상세, 수정, 삭제 API',
      code: {
        title: 'BoardController 추가 메서드',
        language: 'java',
        body: `@GetMapping("/{id}")
public BoardResponse findOne(@PathVariable Long id) {
    return boardService.findOne(id);
}

@PutMapping("/{id}")
public BoardResponse update(@PathVariable Long id,
        @RequestBody BoardRequest request) {
    return boardService.update(id, request);
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
    boardService.delete(id);
    return ResponseEntity.noContent().build();
}`,
      },
    },
    {
      eyebrow: 'CORS',
      title: '프론트엔드 연결을 위한 CORS 설정',
      bullets: [
        '프론트엔드와 백엔드 주소가 다르면 브라우저가 요청을 막을 수 있습니다.',
        '개발 중에는 Vite 기본 주소인 http://localhost:5173을 허용합니다.',
        '운영 환경에서는 실제 서비스 도메인만 허용해야 합니다.',
      ],
      code: {
        title: 'config/CorsConfig.java',
        language: 'java',
        body: `@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}`,
      },
    },
    {
      eyebrow: 'Run',
      title: '실행 방법',
      bullets: [
        '프로젝트 루트에서 서버를 실행합니다.',
        'Gradle: ./gradlew bootRun',
        'Maven: ./mvnw spring-boot:run',
        'H2 Console: http://localhost:8080/h2-console',
        'Swagger UI: http://localhost:8080/swagger-ui/index.html',
      ],
      code: {
        title: '브라우저 접속 주소',
        language: 'text',
        body: `Swagger UI: http://localhost:8080/swagger-ui/index.html

H2 Console: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:boarddb
User Name: sa
Password: 비워두기`,
      },
    },
    {
      eyebrow: 'Swagger Test',
      title: 'Swagger UI로 게시글 작성 테스트',
      summary:
        '브라우저에서 API 목록을 보고 Try it out 버튼으로 바로 요청을 보낼 수 있습니다.',
      visual: 'swagger',
      code: {
        title: 'POST /api/boards 요청 본문',
        language: 'json',
        body: `{
  "title": "첫 번째 게시글",
  "writer": "likelion",
  "content": "Spring Boot CRUD 실습입니다."
}`,
      },
    },
    {
      eyebrow: 'Swagger Test',
      title: 'Swagger UI 테스트 순서',
      bullets: [
        'POST /api/boards를 열고 Try it out을 누른 뒤 JSON을 입력합니다.',
        'GET /api/boards로 작성한 게시글 목록을 확인합니다.',
        'PUT /api/boards/{id}에서 id와 수정 JSON을 입력합니다.',
        'DELETE /api/boards/{id}로 삭제한 뒤 목록을 다시 조회합니다.',
      ],
      code: {
        title: 'PUT /api/boards/{id} 요청 본문',
        language: 'json',
        body: `{
  "title": "수정된 제목",
  "writer": "likelion",
  "content": "Swagger UI에서 수정했습니다."
}`,
      },
    },
    {
      eyebrow: 'Wrap-up',
      title: '실습 체크리스트',
      checklist: [
        'Entity 필드 id, title, writer, content, createdAt 구현',
        'Repository가 JpaRepository를 상속',
        'Service에서 create, findAll, findOne, update, delete 구현',
        'Controller에서 REST API URL 매핑',
        'CORS 설정 추가',
        'Swagger UI 테스트로 전체 흐름 확인',
      ],
    },
  ],
  presenterScripts: [
    [
      '오늘 실습의 목표는 게시판 기능을 REST API로 만드는 것입니다. 화면을 직접 만드는 수업이 아니라, 프론트엔드가 호출할 수 있는 백엔드 API를 만드는 수업이라고 먼저 안내합니다.',
      '게시판은 백엔드 입문에서 가장 좋은 예제입니다. 작성, 조회, 수정, 삭제가 모두 들어 있고, 대부분의 서비스 기능도 결국 이 CRUD 흐름을 확장한 형태입니다.',
      '오늘 사용할 기술은 Spring Web, Spring Data JPA, H2 Database, Swagger UI입니다. Spring Web은 API 요청을 받고, JPA는 DB 작업을 도와주고, H2는 실습용 DB, Swagger는 API 테스트 화면입니다.',
      '오른쪽 그림을 보면서 요청이 Client에서 Spring Boot를 지나 H2 DB까지 이동한다고 설명합니다. 학생들이 “코드를 어디에 써야 하는지”를 먼저 큰 그림으로 이해하게 만드는 것이 중요합니다.',
      '마지막으로 오늘은 Swagger UI에서 직접 POST, GET, PUT, DELETE를 눌러 보면서 내가 만든 API가 정말 동작하는지 확인할 것이라고 말합니다.',
    ],
    [
      '초보자 입장에서는 용어가 가장 먼저 어렵게 느껴집니다. 그래서 오늘은 코드를 보기 전에 단어부터 정리하고 시작합니다.',
      'REST API는 “주소와 Method로 기능을 구분하는 약속”이라고 설명하면 이해가 쉽습니다. Entity는 DB 테이블을 Java 클래스로 옮긴 것이고, DTO는 요청과 응답을 옮겨 주는 상자입니다.',
      'Service는 실제 일을 하는 곳, Repository는 DB에 다녀오는 곳이라고 말하면 됩니다. Controller는 문을 열고 닫는 입구라고 생각하면 됩니다.',
      '이 슬라이드는 완벽하게 외우는 것이 목적이 아니라, 뒤에서 나오는 코드 이름이 낯설지 않게 만드는 용도라고 짚어 줍니다.',
      '처음 보는 학생에게는 “오늘은 이름만 알아도 충분하다”라고 말해주면 부담이 줄어듭니다.',
    ],
    [
      '이 슬라이드에서는 오늘 만들 기능을 기능 단위로 정리합니다. 게시판 CRUD는 작성, 목록 조회, 상세 조회, 수정, 삭제로 나눌 수 있습니다.',
      '작성은 사용자가 title, writer, content를 보내면 서버가 DB에 저장하는 기능입니다. 저장이 되면 서버는 id와 createdAt이 포함된 응답을 돌려줍니다.',
      '목록 조회는 저장된 게시글 전체를 JSON 배열로 응답하는 기능입니다. 프론트엔드에서는 이 응답을 받아 게시글 리스트를 화면에 그릴 수 있습니다.',
      '상세 조회, 수정, 삭제는 모두 id가 필요합니다. 어떤 게시글을 대상으로 할지 구분해야 하기 때문에 URL에 id가 들어갑니다.',
      '학생들에게 “게시글 하나를 구분하는 값이 id”라는 점을 강조합니다. 이후 Repository에서 Long 타입 id를 쓰는 이유와 연결됩니다.',
    ],
    [
      'REST API는 URL과 HTTP Method를 조합해서 기능을 표현합니다. 같은 /api/boards 주소라도 Method가 다르면 의미가 달라집니다.',
      'POST /api/boards는 새 게시글을 만드는 요청입니다. 요청 본문에 JSON이 들어갑니다.',
      'GET /api/boards는 게시글 전체 목록을 가져오는 요청이고, GET /api/boards/{id}는 특정 id의 게시글 하나만 가져오는 요청입니다.',
      'PUT /api/boards/{id}는 기존 게시글을 수정합니다. 삭제는 DELETE /api/boards/{id}로 처리합니다.',
      '여기서 중요한 포인트는 URL을 동사처럼 만들지 않는 것입니다. /createBoard 같은 주소보다 자원명 boards와 Method를 조합하는 방식이 REST API에 더 가깝습니다.',
    ],
    [
      '이제 요청이 실제 코드 안에서 어떤 순서로 처리되는지 설명합니다. 브라우저나 Swagger에서 요청을 보내면 가장 먼저 Controller가 받습니다.',
      'Controller는 URL 매핑, 요청 JSON 받기, 응답 JSON 반환처럼 HTTP와 가까운 일을 담당합니다. 그래서 Controller에는 복잡한 DB 로직을 많이 넣지 않는 것이 좋습니다.',
      'Service는 앱의 실제 규칙을 처리합니다. 예를 들어 게시글을 만들 때 어떤 값으로 Entity를 만들지, 수정할 때 기존 게시글을 먼저 찾아야 한다는 규칙이 Service에 들어갑니다.',
      'Repository는 DB 접근을 담당합니다. JPA를 사용하면 직접 SQL을 많이 쓰지 않아도 save, findAll, findById 같은 메서드를 사용할 수 있습니다.',
      '이렇게 나누면 에러가 났을 때 확인할 위치가 명확해집니다. URL이 잘못됐으면 Controller, 저장이 안 되면 Service나 Repository, 테이블 문제가 있으면 Entity와 설정을 보면 됩니다.',
    ],
    [
      '프로젝트를 만들 때 가장 먼저 확인할 것은 의존성입니다. 오늘은 API 서버를 만들기 때문에 Spring Web이 필요합니다.',
      'DB 작업을 객체 중심으로 처리하기 위해 Spring Data JPA를 추가합니다. 실습용 DB로는 H2 Database를 사용합니다.',
      'API 테스트는 Swagger UI로 진행하므로 springdoc-openapi-starter-webmvc-ui 의존성을 추가합니다. 이 의존성을 넣으면 /swagger-ui/index.html에서 API 문서를 볼 수 있습니다.',
      '버전은 수업 자료 기준으로 2.8.16을 사용합니다. Spring Boot 3.x 수업에서는 springdoc 2.x 계열을 쓰면 됩니다.',
      '학생들이 Gradle과 Maven을 헷갈릴 수 있으니, 지금 자료의 코드는 Gradle 예시라고 분명히 말합니다. Maven을 쓰는 경우 dependency 형식만 다르고 개념은 같습니다.',
    ],
    [
      '폴더 구조는 역할별로 나누어 봅니다. config에는 CORS 같은 설정 코드가 들어갑니다.',
      'controller에는 API 주소와 HTTP Method를 매핑하는 Controller가 들어갑니다. service에는 핵심 로직, repository에는 DB 접근 코드가 들어갑니다.',
      'entity에는 DB 테이블과 연결되는 Board 클래스가 들어가고, dto에는 요청과 응답 전용 클래스가 들어갑니다.',
      '처음에는 파일이 많아 보여도 이 구조를 유지하면 새 기능을 추가할 때 고민이 줄어듭니다. 예를 들어 댓글 기능을 추가하면 comment 패키지 안에서도 같은 구조를 반복할 수 있습니다.',
      '학생들에게 “파일을 많이 만드는 것이 목적이 아니라, 역할을 섞지 않는 것이 목적”이라고 설명하면 좋습니다.',
    ],
    [
      'H2는 별도 설치 없이 메모리에서 실행되는 DB입니다. 그래서 수업 중 빠르게 실행하고 초기화하기 좋습니다.',
      'jdbc:h2:mem:boarddb는 메모리 DB 이름입니다. 애플리케이션을 종료하면 데이터가 사라질 수 있다는 점을 설명합니다.',
      'ddl-auto=create는 실행할 때 Entity를 기준으로 테이블을 새로 만들어 줍니다. 실습에는 편하지만 운영에서는 validate나 none 같은 설정을 주로 씁니다.',
      'show-sql=true를 켜면 콘솔에 insert, select 같은 SQL이 찍힙니다. JPA가 내부적으로 DB에 어떤 요청을 보내는지 확인할 수 있습니다.',
      'H2 Console은 DB 안에 실제로 데이터가 들어갔는지 확인하는 용도이고, Swagger UI는 API 요청을 보내는 용도라고 구분해서 말합니다.',
    ],
    [
      'Board Entity는 게시글 테이블을 Java 클래스로 표현한 것입니다. @Entity가 붙으면 JPA가 이 클래스를 관리합니다.',
      'id는 게시글을 구분하는 기본키입니다. @GeneratedValue를 사용하면 DB가 id를 자동으로 증가시켜 줍니다.',
      'title, writer, content는 사용자가 입력하는 게시글 데이터입니다. content는 길어질 수 있으므로 TEXT 컬럼으로 지정했습니다.',
      'createdAt은 게시글이 생성된 시간을 저장합니다. @PrePersist는 Entity가 처음 저장되기 직전에 실행되는 메서드를 지정할 때 사용합니다.',
      '학생들에게 Entity는 “DB 테이블의 설계도”라고 설명하면 이해가 쉽습니다. 단, API 요청과 응답까지 Entity가 전부 담당하게 만들지는 않을 것이라고 다음 슬라이드로 연결합니다.',
    ],
    [
      'DTO는 Data Transfer Object의 줄임말입니다. API로 들어오고 나가는 데이터의 모양을 정하는 객체입니다.',
      'BoardRequest는 클라이언트가 보내는 값만 담습니다. 작성과 수정에서는 title, writer, content가 필요합니다.',
      'BoardResponse는 서버가 돌려줄 값을 담습니다. id와 createdAt처럼 서버가 만든 값도 응답에 포함할 수 있습니다.',
      'Entity를 그대로 응답하면 나중에 내부 구조가 외부 API에 그대로 노출될 수 있습니다. 그래서 실무에서는 Entity와 DTO를 분리하는 경우가 많습니다.',
      '초보자에게는 코드가 조금 늘어나는 것처럼 보이지만, 규모가 커질수록 DTO 분리가 유지보수에 훨씬 유리하다고 설명합니다.',
    ],
    [
      'Repository는 DB 작업을 담당합니다. Spring Data JPA를 쓰면 인터페이스만 만들어도 기본 메서드가 자동으로 제공됩니다.',
      'JpaRepository<Board, Long>에서 Board는 저장할 Entity 타입이고 Long은 id 타입입니다.',
      'save는 저장, findAll은 전체 조회, findById는 id로 조회, deleteById는 id로 삭제하는 메서드입니다.',
      '우리가 직접 SQL을 작성하지 않아도 JPA가 Entity 정보를 보고 SQL을 만들어 줍니다.',
      '이 슬라이드에서는 코드가 짧다는 점을 강조합니다. Repository가 짧은 이유는 Spring Data JPA가 많은 반복 작업을 대신해 주기 때문입니다.',
    ],
    [
      'Service는 Controller와 Repository 사이에서 실제 작업을 조율합니다. Controller가 받은 요청 DTO를 Entity로 바꾸는 일이 여기에서 일어납니다.',
      'create 메서드에서는 새 Board 객체를 만들고, request에서 title, writer, content를 꺼내 세팅합니다.',
      '그 다음 boardRepository.save(board)를 호출하면 DB에 저장됩니다. 저장 후에는 BoardResponse.from으로 응답 DTO로 바꿔 반환합니다.',
      'findAll은 전체 게시글을 가져온 뒤 stream을 사용해서 BoardResponse 목록으로 변환합니다.',
      '@Transactional(readOnly = true)는 조회 전용 메서드라는 의미입니다. 수정이 없는 조회에서는 readOnly를 붙이면 의도가 명확해집니다.',
    ],
    [
      '상세 조회는 id로 게시글을 찾는 기능입니다. findById는 Optional을 반환하므로 값이 없을 때 어떻게 처리할지 정해야 합니다.',
      '예시에서는 게시글이 없으면 IllegalArgumentException을 발생시킵니다. 나중에는 @RestControllerAdvice로 예외 응답을 더 깔끔하게 통일할 수 있습니다.',
      '수정은 먼저 기존 게시글을 조회한 뒤, title, writer, content 값을 새 값으로 바꿉니다.',
      'JPA는 트랜잭션 안에서 Entity 값이 변경된 것을 감지하고 UPDATE SQL을 실행합니다. 이것을 변경 감지라고 부릅니다.',
      '삭제는 deleteById를 사용합니다. 실무에서는 삭제 전에 존재 여부를 확인하거나 권한 체크를 추가할 수 있습니다.',
    ],
    [
      'Controller는 클라이언트가 호출하는 API의 입구입니다. @RestController는 반환값을 JSON 응답으로 바꿔주는 역할을 합니다.',
      '@RequestMapping("/api/boards")를 클래스 위에 붙이면 이 Controller의 모든 API가 /api/boards로 시작합니다.',
      '@PostMapping은 POST 요청을 받습니다. @RequestBody는 요청 본문의 JSON을 BoardRequest 객체로 바꿔 줍니다.',
      '@GetMapping은 목록 조회 요청을 받습니다. Service에서 가져온 BoardResponse 목록을 그대로 반환하면 JSON 배열로 응답됩니다.',
      '여기서 Controller는 직접 Entity를 만들거나 Repository를 호출하지 않습니다. 요청을 Service에 넘기는 역할에 집중한다고 설명합니다.',
    ],
    [
      '상세 조회, 수정, 삭제는 모두 URL에 id가 들어갑니다. 예를 들어 /api/boards/1은 id가 1인 게시글을 의미합니다.',
      '@PathVariable Long id는 URL의 {id} 부분을 Java 변수로 받아오는 문법입니다.',
      'PUT 요청은 id와 수정할 JSON 본문을 함께 받습니다. 그래서 @PathVariable과 @RequestBody를 같이 사용합니다.',
      'DELETE 요청은 삭제 후 응답 본문이 필요하지 않으므로 ResponseEntity.noContent().build()로 204 응답을 반환합니다.',
      '학생들에게 Swagger에서 id 입력칸이 왜 생기는지 이 코드와 연결해서 설명하면 좋습니다.',
    ],
    [
      '프론트엔드 개발 서버와 백엔드 서버는 보통 포트가 다릅니다. 예를 들어 React는 5173, Spring Boot는 8080을 사용합니다.',
      '브라우저는 보안상 다른 출처로 요청을 보낼 때 CORS 정책을 확인합니다. 허용되지 않으면 서버가 정상이어도 브라우저에서 요청이 막힙니다.',
      'addCorsMappings에서 /api/** 경로에 대해 localhost:5173을 허용합니다. 그러면 프론트엔드에서 백엔드 API를 호출할 수 있습니다.',
      'allowedMethods에는 사용할 HTTP Method를 명시합니다. 오늘은 GET, POST, PUT, DELETE가 필요합니다.',
      '운영 환경에서는 *로 열어두지 말고 실제 서비스 도메인만 허용해야 한다는 점을 짚습니다.',
    ],
    [
      '서버 실행은 프로젝트 루트에서 진행합니다. Gradle 프로젝트면 ./gradlew bootRun, Maven 프로젝트면 ./mvnw spring-boot:run을 사용합니다.',
      '서버가 정상 실행되면 기본 포트는 8080입니다. 먼저 Swagger UI 주소로 접속해서 API 목록이 보이는지 확인합니다.',
      'Swagger UI 주소는 /swagger-ui/index.html입니다. 의존성이 제대로 들어갔다면 별도 Controller를 만들지 않아도 화면이 뜹니다.',
      'H2 Console은 /h2-console로 접속합니다. JDBC URL은 application.yml과 동일하게 jdbc:h2:mem:boarddb를 입력합니다.',
      '수업 진행 시 Swagger UI와 H2 Console을 나란히 띄워두면 API 요청 후 DB 변화까지 바로 보여줄 수 있습니다.',
    ],
    [
      'Swagger UI에서 POST /api/boards API를 펼칩니다. Try it out 버튼을 누르면 JSON을 수정할 수 있는 입력창이 활성화됩니다.',
      '예시 JSON에는 title, writer, content 세 필드가 있습니다. 이 필드 이름은 BoardRequest의 필드명과 맞아야 합니다.',
      'Execute를 누르면 실제 POST 요청이 서버로 전송됩니다. 서버는 JSON을 BoardRequest로 받고, Service를 거쳐 DB에 저장합니다.',
      '응답 결과에서 id와 createdAt이 생겼는지 확인합니다. 이 값들은 클라이언트가 보낸 것이 아니라 서버와 DB 저장 과정에서 만들어진 값입니다.',
      '에러가 나면 JSON 쉼표, 따옴표, 필드명 오타를 먼저 확인하라고 안내합니다.',
    ],
    [
      'POST가 성공했다면 다음은 GET /api/boards로 목록을 조회합니다. 방금 작성한 게시글이 배열 안에 들어 있으면 조회 성공입니다.',
      '상세 조회는 GET /api/boards/{id}를 열고 id에 방금 생성된 값을 넣어 실행합니다. 목록과 달리 게시글 하나만 응답됩니다.',
      '수정 테스트는 PUT /api/boards/{id}에서 진행합니다. id는 기존 게시글 id를 넣고, 요청 본문에는 수정할 title, writer, content를 입력합니다.',
      '수정 후 다시 GET으로 조회해서 값이 바뀌었는지 확인합니다. 이 과정을 통해 Service의 update 로직과 JPA 변경 감지를 확인할 수 있습니다.',
      '마지막으로 DELETE를 실행하고 목록을 다시 조회합니다. 해당 게시글이 사라졌다면 CRUD 전체 흐름이 완성된 것입니다.',
    ],
    [
      '마무리에서는 오늘 작성한 파일과 역할을 다시 연결해서 정리합니다. Entity는 테이블, Repository는 DB 접근, Service는 로직, Controller는 API 입구입니다.',
      'CORS 설정은 프론트엔드 연결을 위한 준비이고, Swagger UI는 API를 직접 테스트하기 위한 도구입니다.',
      '학생들이 기억해야 할 핵심은 “요청이 Controller, Service, Repository 순서로 이동한다”는 흐름입니다.',
      '게시판 CRUD를 이해하면 댓글, 공지사항, 상품, 주문 같은 기능도 같은 패턴으로 만들 수 있습니다.',
      '다음 단계로는 입력값 검증, 예외 응답 통일, 페이징, 검색 기능을 붙일 수 있다고 안내하며 수업을 마무리합니다.',
    ],
  ],
}
