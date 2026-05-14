import type { LectureDeck } from '../types'

export const jpaDeepDiveDeck: LectureDeck = {
  id: 'jpa-deep-dive',
  title: 'JPA Deep Dive',
  description: '영속성 컨텍스트의 원리부터 성능 최적화까지',
  slides: [
    {
      eyebrow: 'Concept',
      title: 'JPA는 단순한 SQL 생성기가 아닙니다',
      summary: 'JPA의 핵심은 객체 지향 프로그래밍과 관계형 데이터베이스 사이의 패러다임 불일치를 해결하는 것입니다.',
      visual: 'jpa-paradigm',
      bullets: [
        'ORM (Object-Relational Mapping): 객체와 테이블을 매핑',
        'Persistence Context: 엔티티를 영구 저장하는 환경 (논리적 개념)',
        '단순히 DB에 넣는 게 아니라, 자바 객체를 DB와 동기화하는 도구',
      ],
      tip: 'JPA가 왜 단순한 MyBatis와 다른지, "객체 상태 관리"라는 키워드를 던져주세요.',
    },
    {
      eyebrow: 'Annotations',
      title: '핵심 매핑 어노테이션',
      summary: '엔티티 클래스를 테이블과 어떻게 연결하는지 결정하는 가장 기본적인 문법들입니다.',
      code: {
        title: '주요 매핑 어노테이션 예시',
        language: 'java',
        body: `@Entity // JPA가 관리할 객체임을 선언
@Table(name = "members") // 매핑할 테이블 이름 (생략 시 클래스명)
public class Member {

    @Id // 기본 키(PK) 매핑
    @GeneratedValue(strategy = GenerationType.IDENTITY) // PK 생성 전략 (DB에 위임)
    private Long id;

    @Column(name = "username", nullable = false, length = 20) // 컬럼 상세 설정
    private String name;

    @Enumerated(EnumType.STRING) // Enum 타입을 문자로 저장 (추천!)
    private RoleType role;

    @Lob // 대용량 데이터 (CLOB, BLOB)
    private String content;

    @Transient // DB와 매핑하지 않고 메모리에서만 사용
    private int tempScore;
}`,
      },
      bullets: [
        '@Entity: 기본 생성자가 필수 (public 또는 protected)',
        '@Id, @GeneratedValue: 식별자 매핑 및 자동 생성 전략 결정',
        '@Column: 컬럼명 변경, null 여부, 길이 등 DB 제약 조건 설정',
      ],
    },
    {
      eyebrow: 'Persistence Context',
      title: '영속성 컨텍스트: 엔티티의 "보관소"',
      summary: '엔티티 매니저를 통해 영속성 컨텍스트에 접근합니다. 이곳은 DB와 애플리케이션 사이의 중간 바구니 역할을 합니다.',
      visual: 'jpa-persistence',
      bullets: [
        '1차 캐시: 한 트랜잭션 내에서 같은 ID 조회 시 DB를 거치지 않음',
        '동일성(Identity) 보장: 같은 ID면 항상 같은 객체 주소 보장',
        '쓰기 지연(Write-behind): 트랜잭션이 끝날 때까지 쿼리를 모았다가 한 번에 전송',
        '변경 감지(Dirty Checking): 객체 값만 바꿔도 알아서 UPDATE 실행',
      ],
    },
    {
      eyebrow: 'Lifecycle',
      title: '엔티티의 생명주기',
      summary: '엔티티는 비영속, 영속, 준영속, 삭제 상태를 오가며 관리됩니다.',
      table: {
        headers: ['상태', '설명', '메서드'],
        rows: [
          ['비영속 (New)', '영속성 컨텍스트와 관계없는 순수 객체', 'new Entity()'],
          ['영속 (Managed)', '컨텍스트에 저장되어 관리되는 상태', 'em.persist(), find()'],
          ['준영속 (Detached)', '관리되다가 분리된 상태', 'em.detach(), clear()'],
          ['삭제 (Removed)', '삭제를 위해 표시된 상태', 'em.remove()'],
        ],
      },
    },
    {
      eyebrow: 'Strategy',
      title: '지연 로딩(Lazy) vs 즉시 로딩(Eager)',
      summary: '가급적 모든 연관 관계는 지연 로딩(LAZY)으로 설정하는 것이 실무의 철칙입니다.',
      visual: 'jpa-proxy',
      bullets: [
        'Lazy: 필요할 때만 쿼리 실행 (프록시 객체 활용) - 성능 최적화 유리',
        'Eager: 처음부터 다 가져옴 - 예상치 못한 SQL 발생 및 N+1의 주범',
        '@ManyToOne의 기본값은 EAGER이므로 반드시 LAZY로 명시해야 함',
      ],
      code: {
        title: 'LAZY 로딩 설정',
        language: 'java',
        body: `@ManyToOne(fetch = FetchType.LAZY) // 지연 로딩 설정
@JoinColumn(name = "team_id") // 외래 키(FK) 컬럼명 지정
private Team team;`,
      },
    },
    {
      eyebrow: 'Performance',
      title: '성능의 적: N+1 문제',
      summary: '연관 관계가 설정된 엔티티를 조회할 때, 의도치 않게 수많은 추가 쿼리가 발생하는 현상입니다.',
      visual: 'jpa-nplusone',
      bullets: [
        '상황: 팀 10개를 조회했는데, 각 팀의 멤버를 보려고 10번 더 SELECT 하는 경우 (1+10)',
        '원인: JPA가 연관 관계를 프록시로 가져왔다가 실제 데이터가 필요할 때 쿼리를 날리기 때문',
        '해결책: Fetch Join을 사용하여 한 번의 쿼리로 연관 객체까지 가져오기',
      ],
    },
    {
      eyebrow: 'Solution',
      title: 'Fetch Join: N+1 문제의 정답',
      summary: 'JPQL을 통해 한 번의 쿼리로 연관된 모든 엔티티를 즉시 로딩하는 방식입니다.',
      code: {
        title: 'JPQL Fetch Join 예시',
        language: 'java',
        body: `// 일반 조회 (N+1 발생 가능)
List<Team> teams = repository.findAll();

// Fetch Join (N+1 해결)
@Query("select t from Team t join fetch t.members")
List<Team> findAllWithMembers();

// 주의: Paging과 함께 사용 시 메모리 문제가 생길 수 있음`,
      },
    },
    {
      eyebrow: 'Convenience',
      title: '영속성 전이(Cascade)와 고아 객체',
      summary: '부모 엔티티를 저장/삭제할 때 자식 엔티티도 함께 처리하고 싶다면 이 기능을 사용합니다.',
      bullets: [
        'CascadeType.ALL: 부모의 상태 변화를 자식에게 모두 전파',
        'orphanRemoval = true: 부모와의 연결이 끊어진 자식 객체를 자동으로 삭제',
        '주의: 자식 객체가 오직 부모 하나에만 종속적일 때만 사용해야 함',
      ],
      code: {
        title: 'Cascade & orphanRemoval',
        language: 'java',
        body: `@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Child> children = new ArrayList<>();`,
      },
    },
    {
      eyebrow: 'Mapping',
      title: '연관 관계 매핑의 정석',
      summary: '객체는 참조를 사용하고, 테이블은 외래 키를 사용합니다. 이 차이를 이해하는 것이 중요합니다.',
      bullets: [
        '단방향 vs 양방향: 가급적 단방향으로 설계하고 필요할 때만 양방향으로 확장',
        '연관 관계의 주인: 외래 키(FK)를 가진 쪽이 주인이 되어 관리를 전담',
        'mappedBy: 주인이 아님을 선언하고 읽기 전용으로 설정',
      ],
      code: {
        title: 'ManyToOne & OneToMany',
        language: 'java',
        body: `@Entity
public class Member {
    @ManyToOne // 주인! (외래 키가 있는 곳)
    @JoinColumn(name = "team_id")
    private Team team;
}

@Entity
public class Team {
    @OneToMany(mappedBy = "team") // 거울! (Member의 team 필드에 의해 매핑됨)
    private List<Member> members = new ArrayList<>();
}`,
      },
    },
    {
      eyebrow: 'Framework',
      title: 'Spring Data JPA: 반복되는 코드의 해방',
      summary: 'JPA를 더 쉽게 쓸 수 있게 추상화한 라이브러리입니다. 인터페이스만 선언하면 구현체는 스프링이 만들어줍니다.',
      bullets: [
        '메서드 이름으로 쿼리 생성: findByUsername(String name)',
        '공통 인터페이스: save, findById, findAll, delete 등 기본 제공',
        '쿼리 메서드: @Query 어노테이션으로 직접 JPQL/Native SQL 작성 가능',
      ],
      code: {
        title: 'Repository 인터페이스',
        language: 'java',
        body: `public interface MemberRepository extends JpaRepository<Member, Long> {
    // 쿼리 메서드 (이름으로 쿼리 생성)
    List<Member> findByUsername(String username);
    
    // @Query를 이용한 Fetch Join
    @Query("select m from Member m join fetch m.team")
    List<Member> findAllWithTeam();
}`,
      },
    },
    {
      eyebrow: 'Wrap-up',
      title: '정리하며',
      checklist: [
        '핵심 매핑 어노테이션(@Entity, @Id, @Column 등)의 역할',
        '영속성 컨텍스트의 4가지 이점 이해',
        '엔티티 생명주기의 변화 흐름 숙지',
        '지연 로딩(Lazy)과 즉시 로딩(Eager)의 차이',
        'N+1 문제 발생 원인과 Fetch Join 해결법',
        '연관 관계 주인을 설정하는 이유와 규칙',
      ],
      tip: 'JPA는 원리를 모르면 고생하지만, 원리를 알면 마법처럼 편리한 도구입니다.',
    },
  ],
  presenterScripts: [
    [
      '안녕하세요! 오늘 저희는 자바 백엔드 개발자의 실력을 판가름하는 기준, JPA에 대해 깊게 파고들어 보겠습니다.',
      'JPA를 쓰면서 "왜 쿼리가 이렇게 많이 나가지?" 혹은 "왜 저장도 안 했는데 데이터가 바뀌지?"라고 생각해보셨다면 오늘 수업이 큰 도움이 될 겁니다.',
    ],
    [
      'JPA를 시작할 때 가장 먼저 마주하는 것이 바로 매핑 어노테이션입니다.',
      '@Entity로 클래스를 지정하고, @Id로 무엇이 기본키인지 알려주는 것부터 시작하죠.',
      '특히 @Enumerated(EnumType.STRING)처럼 실무에서 놓치기 쉬운 팁들도 함께 챙겨가시기 바랍니다.',
    ],
    [
      '이제 영속성 컨텍스트라는 개념을 이해해야 합니다.',
      '이건 메모리 안에 있는 가상의 데이터베이스라고 생각하시면 돼요. 자바 앱과 실제 DB 사이에서 완충 작용을 해주는 아주 기특한 녀석입니다.',
    ],
    [
      '영속성 컨텍스트의 4대 천왕, 1차 캐시, 동일성 보장, 쓰기 지연, 변경 감지를 기억하세요.',
      '특히 Dirty Checking이라 불리는 변경 감지 덕분에, 우리는 리포지토리를 직접 호출하지 않아도 객체 값만 바꾸면 업데이트 쿼리가 자동으로 나가는 마법을 경험할 수 있습니다.',
    ],
    [
      '엔티티의 생명주기는 자바의 가비지 컬렉션처럼 JPA가 어떻게 객체를 관리하는지를 보여줍니다.',
      'persist를 호출하는 순간 바로 DB에 들어가는 게 아니라, 영속 상태가 되어 "관리 대상"이 된다는 점이 핵심입니다.',
    ],
    [
      '지연 로딩과 즉시 로딩은 성능 최적화의 핵심입니다.',
      '실무에서는 무조건 지연 로딩을 기본으로 사용해야 합니다. 필요하지도 않은 데이터를 미리 다 가져오는 건 낭비니까요.',
    ],
    [
      '하지만 JPA를 쓰면서 가장 많이 좌절하는 부분이 바로 N+1 문제입니다.',
      '그림을 보시면 알겠지만, 팀 하나를 조회했을 뿐인데 연관된 멤버들을 가져오느라 쿼리가 줄줄이 소세지처럼 나가는 현상입니다.',
      '이걸 방치하면 운영 서버가 터질 수도 있는 무서운 버그죠.',
    ],
    [
      '가장 깔끔한 해결책은 Fetch Join입니다. "조인할 때 연관된 데이터도 한꺼번에 다 가져와!"라고 선언하는 거죠.',
      '이것만 잘 써도 애플리케이션의 성능을 10배 이상 끌어올릴 수 있습니다.',
    ],
    [
      '부모 엔티티를 관리할 때 자식까지 자동으로 챙기고 싶다면 Cascade 설정을 활용하세요.',
      '게시글을 지울 때 댓글도 한꺼번에 지워지게 하는 등 실무에서 아주 유용하게 쓰입니다.',
    ],
    [
      '마지막으로 연관 관계 매핑입니다. 누가 외래 키를 관리하는 "주인"인지를 명확히 해야 합니다.',
      '자동차와 바퀴가 있다면 바퀴가 자동차를 아는 게 더 자연스러운 것처럼, 실무적인 관점에서 주인을 정하는 법을 익혀야 합니다.',
    ],
    [
      '이제 이 모든 걸 편하게 해주는 Spring Data JPA를 사용하면 됩니다.',
      '인터페이스만 정의해도 스프링이 알아서 쿼리를 만들어주니, 우리는 비즈니스 로직에만 집중할 수 있습니다.',
    ],
    [
      'JPA는 알면 알수록 강력하지만, 모르면 독이 될 수도 있습니다.',
      '오늘 배운 영속성 컨텍스트의 원리를 바탕으로, 더 성능 좋고 안전한 코드를 짜보시길 응원합니다. 고생하셨습니다!',
    ],
  ],
}
