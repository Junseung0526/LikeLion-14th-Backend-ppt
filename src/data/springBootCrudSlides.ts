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
      tip: '학습 목표를 명확히 하고, 오늘 결과물을 Swagger로 직접 보여주며 시작하세요.',
    },
    {
      eyebrow: 'Beginner',
      title: '처음 보는 용어 먼저 정리',
      summary:
        '초보자는 코드보다 용어가 먼저 익숙해져야 합니다. 오늘 자주 나오는 단어를 간단히 정리하고 시작합니다.',
      visual: 'terms',
      bullets: [
        'REST API: 주소와 Method로 기능을 구분하는 방식',
        'Entity: DB 테이블을 Java 클래스로 옮긴 것',
        'DTO: 요청과 응답에 쓰는 전달용 객체',
        'Service: 실제 동작 순서를 처리하는 곳',
        'Repository: DB와 직접 연결되는 곳',
      ],
      tip: '초보자는 용어에서 막힙니다. 비유를 들어 최대한 쉽게 설명하고 넘어가세요.',
    },
    {
      eyebrow: 'Goal',
      title: '오늘 완성할 기능',
      visual: 'goals',
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
      '안녕하세요, 멋쟁이사자처럼 14기 연암공과대학교 백엔드 파트 발표를 맡은 [본인 이름]입니다.',
      '오늘 저희가 함께 공부할 주제는 Spring Boot를 활용한 기초 CRUD의 이해입니다.',
      '단순히 이론만 보는 게 아니라, 제가 직접 구현한 이 발표 도구를 보면서 백엔드의 핵심 구조를 시각적으로 파악해 보겠습니다.',
      '오늘 사용할 기술은 Spring Web, JPA, H2, 그리고 Swagger입니다. 각각의 역할은 뒤에서 하나씩 자세히 설명해 드릴게요.',
      '자, 그럼 백엔드 개발의 가장 기본이 되는 게시판 API 만들기, 지금부터 시작하겠습니다.',
    ],
    [
      '본격적으로 시작하기 전에, 초보자분들이 가장 어려워하는 용어부터 가볍게 정리하고 갈게요.',
      'REST API는 주소로 기능을 구분하는 약속이고, Entity는 DB 테이블을 자바 클래스로 만든 거예요.',
      'DTO는 데이터를 주고받는 상자, Service는 실제 업무 로직을 처리하는 곳, Repository는 DB에 직접 접근하는 곳입니다.',
      '지금 당장 다 외우실 필요는 없어요. 앞으로 코드를 보면서 이 이름들이 계속 나올 텐데, 그때마다 "아, 이게 그 역할이었지" 하고 떠올려 주시면 충분합니다.',
    ],
    [
      '오늘 저희가 직접 만들어볼 기능은 게시판의 기본인 5가지 기능입니다.',
      '글을 쓰고, 목록을 보고, 하나만 자세히 보고, 내용을 고치고, 마지막으로 지우는 것까지요.',
      '이 다섯 가지만 제대로 할 줄 알면, 우리가 사용하는 대부분의 웹 서비스 기본은 할 수 있게 됩니다.',
      '게시글 하나를 구분하는 핵심 값은 id라는 점을 꼭 기억해 주세요. 뒤에서 이 id를 어떻게 사용하는지 보여드릴게요.',
    ],
    [
      '이 기능들을 구현할 때 어떤 주소로, 어떤 방식으로 요청할지 약속하는 게 REST API입니다.',
      '작성은 POST, 조회는 GET, 수정은 PUT, 삭제는 DELETE 방식을 사용해요.',
      '주소는 모두 /api/boards로 비슷하지만, 이 Method들 덕분에 서버가 우리가 뭘 하고 싶은지 정확히 알 수 있습니다.',
      '주소에 "createBoard" 같은 동사를 쓰는 것보다, 이렇게 자원 이름과 Method를 조합하는 게 훨씬 깔끔하고 표준적인 방식입니다.',
    ],
    [
      '그럼 우리가 보낸 요청이 서버 안에서 어떻게 움직일까요? 그림을 한번 봐주세요.',
      '요청이 들어오면 가장 먼저 Controller가 문을 열어줍니다. 그다음 Service가 실제 업무 규칙에 맞게 일을 시키죠.',
      'Service는 Repository를 통해 DB에 데이터를 저장하거나 가져옵니다.',
      '이렇게 역할을 꼼꼼히 나눠놓아야 나중에 에러가 났을 때 어디를 고쳐야 할지 바로 찾을 수 있습니다. 이게 백엔드 설계의 핵심이에요.',
    ],
    [
      '이제 실습 준비 단계입니다. 프로젝트를 만들 때 꼭 챙겨야 할 의존성들이에요.',
      '웹 서버를 돌리기 위한 Spring Web, DB 작업을 도와주는 JPA, 가볍게 쓸 수 있는 H2 데이터베이스, 그리고 테스트 화면을 보여줄 Swagger가 필요합니다.',
      '빌드 도구는 요즘 많이 쓰는 Gradle을 기준으로 설명해 드릴게요.',
      '버전은 수업 자료와 맞춰주시면 되고, 특히 Swagger 의존성을 넣으면 우리가 일일이 테스트 페이지를 만들지 않아도 돼서 정말 편합니다.',
    ],
    [
      '프로젝트 폴더 구조를 한번 볼까요? 처음엔 파일이 많아서 당황스러울 수 있지만 규칙이 명확합니다.',
      'config에는 설정이, controller에는 입구가, service에는 핵심 로직이 들어갑니다.',
      'entity와 dto 폴더에는 데이터 모양을 정의한 클래스들을 모아둡니다.',
      '이렇게 역할별로 집을 지어준다고 생각하시면 돼요. 나중에 댓글 기능을 추가할 때도 똑같이 이 구조를 따라가면 됩니다.',
    ],
    [
      '설정 파일인 application.yml에서는 데이터베이스 정보를 적어줍니다.',
      'H2는 따로 설치하지 않아도 메모리에서 바로 도는 실습용 DB라 공부할 때 정말 최고예요.',
      'ddl-auto를 create로 두면 우리가 짠 코드대로 테이블을 알아서 매번 새로 만들어줍니다.',
      'show-sql을 켜두면 JPA가 내부적으로 어떤 SQL을 날리는지 콘솔에서 직접 눈으로 확인할 수 있어서 공부에 큰 도움이 됩니다.',
    ],
    [
      '실제 코드를 작성해 보겠습니다. Board 클래스에 @Entity를 붙여주면 이게 바로 DB 테이블이 됩니다.',
      'id는 게시글의 고유 번호인데, 우리가 일일이 정하지 않아도 1번부터 자동으로 늘어나게 설정했어요.',
      '제목, 작성자, 내용 같은 필드들을 정의해 주면 JPA가 이걸 보고 DB에 테이블을 예쁘게 만들어줍니다.',
      '여기서 @PrePersist는 데이터가 처음 저장될 때 현재 시간을 자동으로 넣어주는 아주 기특한 기능입니다.',
    ],
    [
      '여기서 중요한 게 DTO라는 개념이에요. DB 테이블 모양인 Entity를 사용자에게 그대로 보여주는 건 위험할 수 있거든요.',
      '그래서 데이터를 받을 때 쓰는 Request 상자와, 데이터를 돌려줄 때 쓰는 Response 상자를 따로 만듭니다.',
      '조금 번거로워 보일 수 있지만, 이렇게 해야 내부 코드가 바뀌어도 외부 서비스에는 영향을 주지 않는 튼튼한 API가 됩니다.',
    ],
    [
      'DB랑 대화하는 Repository는 놀라울 정도로 코드가 짧습니다. JpaRepository 인터페이스만 상속받으면 끝이에요.',
      '우리가 직접 복잡한 SQL을 쓰지 않아도, 저장, 전체 조회, id로 찾기 같은 기능들을 JPA가 공짜로 만들어줍니다.',
      '스프링 데이터 JPA의 가장 강력한 무기라고 할 수 있죠. 우리는 이 인터페이스를 불러다 쓰기만 하면 됩니다.',
    ],
    [
      '가장 중요한 Service 로직입니다. 여기서 아까 만든 Entity와 Repository를 하나로 연결해 줍니다.',
      '게시글 작성 로직을 보면, 사용자가 보낸 Request 상자에서 내용을 꺼내 Entity를 만들고, 그걸 Repository의 save 메서드로 저장합니다.',
      '마지막으로 잘 저장됐다고 Response 상자에 담아서 돌려주는 거죠.',
      '조회할 때는 stream을 써서 목록 전체를 하나씩 Response 상자로 옮겨 담는 과정을 거칩니다.',
    ],
    [
      '상세 조회와 수정 로직도 살펴볼까요? 먼저 id로 게시글이 진짜 있는지부터 확인해야 합니다.',
      '없으면 에러를 던지고, 있으면 내용을 보여주거나 고칩니다.',
      '수정할 때 신기한 건, 명시적으로 save를 호출하지 않아도 값이 바뀌면 JPA가 알아서 DB에 반영해 준다는 거예요. 이걸 "변경 감지"라고 부릅니다.',
      '삭제는 Repository의 deleteById 메서드 한 줄이면 깔끔하게 끝납니다.',
    ],
    [
      '이제 외부에서 우리 서버를 부를 수 있게 문을 열어줄게요. 바로 Controller입니다.',
      '@RestController를 붙이면 모든 응답을 JSON 형식으로 보내겠다는 뜻입니다.',
      '@PostMapping이나 @GetMapping을 사용해서 우리가 처음에 약속했던 주소들을 Service랑 연결해 줍니다.',
      'Controller는 직접 복잡한 일을 하지 않고, 요청을 받아서 Service에 전달하는 역할에 집중합니다.',
    ],
    [
      '상세 조회나 수정처럼 특정 게시글 하나를 지칭할 때는 URL 뒤에 {id}를 붙여서 보냅니다.',
      '이걸 자바 코드에서 @PathVariable로 받아서 처리하는 거죠.',
      '수정할 때는 id와 수정할 데이터 둘 다 필요하고요.',
      '삭제가 성공하면 보통 204 No Content라는 응답을 보내서 "성공적으로 지워졌고 돌려줄 내용은 없다"는 사실을 알려줍니다.',
    ],
    [
      '프론트엔드와 연결할 때 반드시 넘어야 할 산, CORS 설정입니다.',
      '브라우저는 보안 때문에 주소가 다른 서버끼리 대화하는 걸 기본적으로 막아두거든요.',
      '그래서 "우리 리액트 개발 서버(5173 포트)에서 오는 요청은 믿어도 돼"라고 스프링에게 허락을 구하는 코드를 작성해야 합니다.',
      '이걸 빼먹으면 백엔드 서버가 멀쩡해도 화면에서 데이터가 안 나오는 현상을 겪게 됩니다.',
    ],
    [
      '드디어 서버를 실행할 차례입니다. 터미널에서 명령어를 입력하면 8080 포트에서 서버가 돕니다.',
      '서버가 잘 떴다면 브라우저에서 /swagger-ui 주소로 접속해 보세요. 우리가 만든 API 목록이 화면에 예쁘게 보일 거예요.',
      'H2 Console에 들어가서 DB가 실제로 어떻게 생겼는지도 확인해 봅시다. 처음엔 데이터가 하나도 없는 게 정상입니다.',
    ],
    [
      'Swagger에서 직접 첫 게시글을 작성해 보겠습니다. POST 버튼을 누르고 Try it out을 클릭해 보세요.',
      'JSON 입력창에 제목과 내용을 적고 Execute를 누르면 실제 요청이 날아갑니다.',
      '성공 응답으로 id 1번이 돌아왔나요? 그렇다면 여러분의 첫 번째 API가 성공적으로 동작한 겁니다.',
      '에러가 나면 괄호가 빠지진 않았는지, 오타가 없는지 천천히 살펴보세요.',
    ],
    [
      '방금 만든 게시글이 전체 목록에 나오는지 GET으로 확인해 보고, id를 넣어서 특정 글만 조회하거나 수정, 삭제도 해보세요.',
      '코드로만 보던 CRUD 흐름이 실제로 어떻게 동작하는지 눈으로 확인하는 이 과정이 제일 중요합니다.',
      '기능 하나가 완성될 때마다 Swagger로 직접 테스트해 보는 습관을 들이면 개발 속도가 훨씬 빨라질 거예요.',
    ],
    [
      '오늘 저희는 게시판 CRUD를 통해 백엔드의 전체 흐름을 한 바퀴 쭉 훑어봤습니다.',
      'Entity부터 Controller까지, 데이터가 어떻게 흐르는지 이제 조금 감이 오시나요?',
      '이 기본 패턴만 익히면 댓글, 로그인, 검색 같은 복잡한 기능들도 결국 이 틀 안에서 확장되는 것뿐입니다.',
      '오늘 스터디는 여기서 마칠게요. 끝까지 함께해주셔서 감사합니다! 고생 많으셨습니다.',
    ],
  ],
}
