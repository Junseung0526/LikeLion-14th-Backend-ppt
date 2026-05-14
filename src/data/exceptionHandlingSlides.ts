import type { LectureDeck } from '../types'

export const exceptionHandlingDeck: LectureDeck = {
  id: 'spring-exception',
  title: 'Spring Boot 예외 처리',
  description: '안정적인 서비스를 위한 우아한 예외 처리 전략',
  slides: [
    {
      eyebrow: 'Necessity',
      title: '왜 예외 처리가 중요한가?',
      summary: '에러가 났을 때 브라우저에 하얀 화면이나 500 에러 페이지를 그대로 보여주는 것은 사용자 경험(UX)에 치명적입니다.',
      visual: 'exception-necessity',
      bullets: [
        '사용자에게 친절한 에러 메시지 제공',
        '서버 내부 로직 노출 방지 (보안)',
        '일관된 에러 응답 형식 (API 규격 유지)',
        '에러 추적 및 로그 기록 용이성',
      ],
      tip: '사용자 입장에서 "알 수 없는 에러"보다는 "아이디가 중복되었습니다"가 훨씬 낫다는 점을 강조하세요.',
    },
    {
      eyebrow: 'Basics',
      title: 'Checked vs Unchecked Exception',
      summary: '자바의 예외는 크게 두 가지로 나뉩니다. 스프링의 트랜잭션 처리에 큰 영향을 줍니다.',
      table: {
        headers: ['구분', 'Checked Exception', 'Unchecked (Runtime)'],
        rows: [
          ['확인 시점', '컴파일 시점 (필수 처리)', '런타임 시점 (선택 처리)'],
          ['트랜잭션', '기본적으로 Rollback 안 됨', '기본적으로 Rollback 됨'],
          ['예시', 'IOException, SQLException', 'NullPointerException, IllegalArgumentException'],
        ],
      },
    },
    {
      eyebrow: 'Architecture',
      title: '스프링의 예외 처리 흐름',
      summary: '예외가 발생하면 컨트롤러 밖으로 던져지고, 스프링 부트의 DispatcherServlet이 이를 가로채서 적절한 핸들러에게 전달합니다.',
      visual: 'exception-flow',
      bullets: [
        'Controller에서 발생한 예외 -> ControllerAdvice가 낚아챔',
        '@ExceptionHandler가 특정 예외 타입을 처리',
        'ResponseEntity를 통해 HTTP 상태 코드와 에러 JSON 반환',
      ],
    },
    {
      eyebrow: 'Standard Response',
      title: '일관된 에러 응답 DTO 설계',
      summary: '모든 에러는 동일한 모양으로 나가야 프론트엔드에서 처리하기 쉽습니다.',
      code: {
        title: 'ErrorResponse.java',
        language: 'java',
        body: `@Getter
@Builder
public class ErrorResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status;
    private final String error;
    private final String code;
    private final String message;
}`,
      },
    },
    {
      eyebrow: 'Custom Exception',
      title: '커스텀 예외와 에러 코드',
      summary: '비즈니스 로직의 의미를 담은 우리만의 예외를 정의합니다.',
      code: {
        title: 'ErrorCode & CustomException',
        language: 'java',
        body: `public enum ErrorCode {
    USER_NOT_FOUND(404, "U001", "사용자를 찾을 수 없습니다."),
    INVALID_INPUT(400, "C001", "잘못된 입력값입니다.");
    
    private final int status;
    private final String code;
    private final String message;
}

public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;
    // ... 생성자 생략
}`,
      },
    },
    {
      eyebrow: 'ControllerAdvice',
      title: '@RestControllerAdvice 사용법',
      summary: '모든 컨트롤러에서 발생하는 예외를 한 곳에서 관리하는 "중앙 통제실"입니다.',
      visual: 'exception-flow',
      code: {
        title: 'GlobalExceptionHandler.java',
        language: 'java',
        body: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
        ErrorCode ec = e.getErrorCode();
        return ResponseEntity
                .status(ec.getStatus())
                .body(ErrorResponse.of(ec));
    }

    @ExceptionHandler(Exception.class) // 잡지 못한 모든 예외
    protected ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("Unhandled Exception", e);
        return ResponseEntity.status(500).body(ErrorResponse.internalServerError());
    }
}`,
      },
    },
    {
      eyebrow: 'Validation',
      title: '데이터 검증 예외(@Valid) 처리',
      summary: '사용자 입력값이 잘못되었을 때 발생하는 예외도 여기서 상세히 처리할 수 있습니다.',
      code: {
        title: 'MethodArgumentNotValidException 처리',
        language: 'java',
        body: `@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ErrorResponse> handleValidException(
        MethodArgumentNotValidException e) {
    String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
    return ResponseEntity.badRequest().body(new ErrorResponse(400, "V001", message));
}`,
      },
    },
    {
      eyebrow: 'Strategy',
      title: '올바른 로그 남기기',
      summary: '에러 처리는 단순히 응답을 보내는 것에서 끝나지 않습니다. 나중에 고칠 수 있게 기록해야 합니다.',
      bullets: [
        'ERROR: 즉시 조치가 필요한 심각한 문제 (DB 연결 실패 등)',
        'WARN: 잠재적 위험 상황 (API 호출 실패 시 재시도 등)',
        'INFO: 서비스 운영상의 주요 정보 (사용자 가입, 결제 등)',
        'DEBUG: 개발 단계에서 상세한 추적을 위해 사용',
      ],
      tip: 'log.error("에러 발생", e); 처럼 예외 객체를 통째로 넘겨야 StackTrace가 남습니다.',
    },
    {
      eyebrow: 'Wrap-up',
      title: '정리하며',
      checklist: [
        'Checked vs Unchecked 예외의 차이 숙지',
        '일관된 에러 응답 형식을 위한 DTO 설계',
        '비즈니스 로직에 맞는 커스텀 예외와 에러 코드 정의',
        '@RestControllerAdvice로 전역 예외 처리기 구현',
        '상태 코드(4xx, 5xx)를 상황에 맞게 활용',
        '적절한 로그 레벨을 사용한 로깅 전략 수립',
      ],
      tip: '에러는 숨기는 것이 아니라, 잘 관리하고 친절하게 안내하는 것이 실력입니다.',
    },
  ],
  presenterScripts: [
    [
      '안녕하세요! 오늘은 개발자보다 사용자가 더 중요하게 생각하는 주제, "예외 처리"에 대해 알아보겠습니다.',
      '프로그램을 완벽하게 짜서 에러가 안 나게 하는 것도 중요하지만, 에러가 났을 때 어떻게 대처하느냐가 진짜 서비스의 퀄리티를 결정합니다.',
    ],
    [
      '먼저 자바의 기초지만 중요한 Checked 예외와 Unchecked 예외를 구분해봅시다.',
      '스프링은 기본적으로 런타임 예외가 터져야만 트랜잭션을 롤백시켜주기 때문에, 우리가 만드는 비즈니스 예외는 보통 RuntimeException을 상속받아야 합니다.',
    ],
    [
      '스프링은 예외가 발생했을 때 이를 가로채는 아주 강력한 메커니즘을 가지고 있습니다.',
      '그림에서 보시는 것처럼, 컨트롤러에서 터진 에러를 ControllerAdvice라는 그물이 낚아채서 예쁜 JSON 응답으로 바꿔줍니다.',
    ],
    [
      '가장 먼저 해야 할 일은 에러 응답의 "모양"을 정하는 것입니다.',
      '어떤 에러가 나든 시간, 상태 코드, 에러 메시지 등이 일정한 형식으로 나가야 프론트엔드 개발자가 편하게 작업할 수 있습니다.',
    ],
    [
      'RuntimeException만 쓰지 말고, 우리 서비스만의 커스텀 예외를 만들어 보세요.',
      'ErrorCode라는 Enum을 활용하면 에러 메시지와 상태 코드를 한곳에서 관리할 수 있어 코드가 훨씬 깔끔해집니다.',
    ],
    [
      '이제 이 모든 예외를 처리할 전역 핸들러를 만듭니다.',
      '@RestControllerAdvice를 붙이면 모든 컨트롤러의 문지기 역할을 하게 됩니다.',
      '여기서 우리가 만든 커스텀 예외뿐만 아니라, 예상치 못한 일반 Exception까지 모두 잡아주는 게 포인트입니다.',
    ],
    [
      '특히 회원가입이나 게시글 작성 시 발생하는 입력값 검증 에러도 여기서 처리할 수 있습니다.',
      '사용자가 제목을 안 적었을 때 "제목은 필수입니다"라는 메시지를 정확히 전달해 주는 로직이죠.',
    ],
    [
      '에러가 났을 때 로그를 잘 남기는 것도 중요합니다.',
      '단순히 printStackTrace()를 쓰는 게 아니라, 로그 레벨을 적절히 나누고 에러 상황을 추적할 수 있는 정보를 남겨야 합니다.',
    ],
    [
      '에러 처리는 단순히 버그를 고치는 게 아닙니다. 사용자와 대화하는 방식이죠.',
      '오늘 배운 전역 예외 처리 전략을 통해, 에러 앞에서도 당황하지 않는 튼튼한 서버를 만들어 보시기 바랍니다. 감사합니다!',
    ],
  ],
}
