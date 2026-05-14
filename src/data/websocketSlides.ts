import type { LectureDeck } from '../types'

export const websocketDeck: LectureDeck = {
  id: 'websocket-redis',
  title: 'WebSocket & Redis Pub/Sub',
  description: '실시간 메시징의 원리부터 Redis를 이용한 대규모 확장까지',
  slides: [
    {
      eyebrow: 'Evolution of Web',
      title: '실시간 웹의 진화: HTTP에서 웹소켓까지',
      summary:
        '사용자가 새로고침을 누르지 않아도 데이터가 알아서 도착하는 "실시간성"은 어떻게 구현될까요? 과거의 눈물겨운 노력부터 웹소켓의 등장까지 살펴봅니다.',
      visual: 'web-evolution',
      bullets: [
        'Short Polling: 1초마다 "데이터 왔어?" 물어보기 (서버 부하 가중)',
        'Long Polling: 데이터 올 때까지 연결 붙잡고 기다리기 (응답 지연)',
        'Streaming: 연결을 안 끊고 계속 보내기 (단방향의 한계)',
        'WebSocket: 한 번 연결로 "전화 통화"처럼 양방향 자유 대화',
      ],
      tip: '카카오톡이나 주식 앱을 예로 들어 "새로고침 없이 데이터가 오는 경험"을 강조하세요.',
    },
    {
      eyebrow: 'Comparison',
      title: 'HTTP vs WebSocket 한눈에 보기',
      visual: 'messaging-comparison',
      table: {
        headers: ['비교 항목', 'HTTP (REST)', 'WebSocket'],
        rows: [
          ['통신 방식', '단방향 (요청 시에만 응답)', '양방향 (언제든 서로 전송)'],
          ['연결 상태', 'Stateless (매번 새로 연결)', 'Stateful (한 번 연결 유지)'],
          ['헤더 크기', '매번 큰 헤더 포함 (무거움)', '초기 연결 후 매우 작음 (가벼움)'],
          ['적합한 곳', '게시판, 블로그, 정적 페이지', '채팅, 게임, 실시간 차트'],
        ],
      },
    },
    {
      eyebrow: 'Protocol',
      title: 'STOMP: 메시징의 "공통 언어"',
      summary:
        '웹소켓이 "전화선"이라면, STOMP는 그 선을 통해 대화하는 "규칙(언어)"입니다. "라디오 방송국" 모델을 생각하면 이해가 쉽습니다.',
      visual: 'stomp-concept',
      bullets: [
        'Publish (발행): DJ가 마이크에 대고 말을 하는 것 (메시지 전송)',
        'Subscribe (구독): 청취자가 라디오 주파수를 맞추는 것 (채널 대기)',
        'Topic (주제): 라디오 주파수 번호 (메시지 경로)',
        'Broker (브로커): 방송국 시스템 (메시지를 배달해주는 역할)',
      ],
    },
    {
      eyebrow: 'Handshake',
      title: '웹소켓은 어떻게 시작될까? (Handshake)',
      summary:
        '웹소켓은 갑자기 생기는 게 아닙니다. 처음에는 HTTP로 시작했다가 "우리 이제 웹소켓으로 대화하자!"라고 업그레이드 요청을 보냅니다.',
      visual: 'ws-handshake',
      code: {
        title: 'HTTP Upgrade Request',
        language: 'text',
        body: `GET /ws-stomp HTTP/1.1
Host: server.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13`,
      },
      tip: '101 Switching Protocols 응답이 오면 그때부터 진짜 웹소켓 통신이 시작된다는 점을 언급하세요.',
    },
    {
      eyebrow: 'Project Setup',
      title: 'Spring Boot 설정 (의존성)',
      visual: 'layers',
      bullets: [
        'spring-boot-starter-websocket: 스프링의 웹소켓 핵심 기능',
        'spring-boot-starter-data-redis: 서버 확장(Scale-out)을 위한 필수 도구',
        'Lombok & Jackson: 데이터 처리를 편리하게',
      ],
      code: {
        title: 'build.gradle',
        language: 'gradle',
        body: `dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-websocket'
    implementation 'org.springframework.boot:spring-boot-starter-data-redis'
    implementation 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}`,
      },
    },
    {
      eyebrow: 'Config',
      title: 'WebSocketConfig: 우체국 설정하기',
      summary:
        '메시지가 어디로 들어오고 어디로 나갈지 경로를 정해줍니다.',
      visual: 'websocket-flow',
      code: {
        title: 'WebSocketConfig.java',
        language: 'java',
        body: `@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // [구독] 이 주소를 구독하는 사람들에게 메시지 전달
        config.enableSimpleBroker("/topic", "/queue");
        
        // [발행] 이 주소로 메시지를 보내면 서버 컨트롤러로 전달
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 클라이언트가 처음 연결을 시도하는 주소
        registry.addEndpoint("/ws-stomp")
                .setAllowedOrigins("*")
                .withSockJS(); // 구형 브라우저 지원
    }
}`,
      },
    },
    {
      eyebrow: 'Data Model',
      title: '메시지 DTO 설계',
      summary:
        '어떤 데이터를 주고받을지 형식을 정합니다. 채팅방 ID, 보낸 사람, 내용, 타입 등이 필요합니다.',
      code: {
        title: 'ChatMessage.java',
        language: 'java',
        body: `@Getter @Setter
public class ChatMessage {
    public enum MessageType { ENTER, TALK, QUIT }

    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
    private String time;
}`,
      },
    },
    {
      eyebrow: 'Controller',
      title: 'MessageMapping: 메시지 처리기',
      summary:
        '@MessageMapping은 클라이언트가 보낸 메시지를 받아서 적절한 처리를 한 뒤 다시 뿌려주는 역할을 합니다.',
      code: {
        title: 'ChatController.java',
        language: 'java',
        body: `@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
        
        // /topic/room/{id}를 구독 중인 사람들에게 메시지 쏘기!
        messagingTemplate.convertAndSend("/topic/room/" + message.getRoomId(), message);
    }
}`,
      },
    },
    {
      eyebrow: '1:1 Messaging',
      title: '일대일 채팅 (귓속말)',
      summary: '특정 사용자에게만 메시지를 전달할 때는 "/queue"와 "/user" 접두사를 사용합니다.',
      bullets: [
        '/topic은 방송용, /queue는 1:1 개인용 경로입니다.',
        'Spring Security의 Principal(유저ID)을 기준으로 배달됩니다.',
        'convertAndSendToUser 메서드로 대상 유저를 지정합니다.',
      ],
      code: {
        title: 'Private Messaging Logic',
        language: 'java',
        body: `// 서버: 특정 유저(recipientId)에게 전송
messagingTemplate.convertAndSendToUser(
    message.getRecipientId(), "/queue/message", message
);

// 클라이언트: 개인 메시지함 구독
// stompClient.subscribe('/user/queue/message', callback);`,
      },
    },
    {
      eyebrow: 'Client Side',
      title: '클라이언트는 어떻게 연결할까?',
      summary:
        '백엔드만 있다고 채팅이 되지 않죠. 프론트엔드(JavaScript)에서의 연결 흐름을 가볍게 이해해 봅니다.',
      code: {
        title: 'JS Client (stompjs 사용)',
        language: 'javascript',
        body: `const socket = new SockJS('/ws-stomp');
const stompClient = Stomp.over(socket);

stompClient.connect({}, (frame) => {
    // 1. 특정 채팅방 구독
    stompClient.subscribe('/topic/room/1', (message) => {
        const chat = JSON.parse(message.body);
        showChat(chat);
    });
    
    // 2. 메시지 보내기
    stompClient.send("/app/chat/message", {}, 
        JSON.stringify({roomId: '1', sender: 'Lee', message: 'Hello!'})
    );
});`,
      },
    },
    {
      eyebrow: 'Scalability',
      title: '서버가 여러 대라면? (The Problem)',
      summary:
        '사용자가 10만 명이라 서버를 3대로 늘렸습니다. 1번 서버의 철수와 2번 서버의 영희는 대화할 수 있을까요?',
      visual: 'redis-pubsub',
      bullets: [
        '서버의 웹소켓 세션은 메모리에 저장됩니다.',
        '1번 서버는 2번 서버에 누가 연결되어 있는지 모릅니다.',
        '이 문제를 해결하려면 서버들끼리 대화할 수 있는 "공통 채널"이 필요합니다.',
      ],
      tip: '서버 간의 "고립" 현상을 강조하며 Redis의 필요성을 자연스럽게 유도하세요.',
    },
    {
      eyebrow: 'Redis Pub/Sub',
      title: 'Redis: 서버 간의 메신저',
      summary:
        'Redis의 Pub/Sub 기능을 사용하면, 어떤 서버로 메시지가 들어오든 모든 서버가 그 메시지를 공유받을 수 있습니다.',
      visual: 'redis-pubsub',
      bullets: [
        '1번 서버로 메시지 도착 -> Redis의 "채팅 채널"에 발행(Publish)',
        '모든 서버(1, 2, 3번)는 Redis 채널을 구독(Subscribe) 중',
        'Redis에서 메시지가 뜨면 각 서버는 자신에게 연결된 클라이언트에게 전송',
      ],
    },
    {
      eyebrow: 'Redis Implementation',
      title: 'Redis 구독 서비스 구현',
      summary:
        'Redis에서 메시지가 오면 그걸 낚아채서 웹소켓으로 전달해주는 "리스너"가 핵심입니다.',
      code: {
        title: 'RedisSubscriber.java',
        language: 'java',
        body: `@Service
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        // Redis에서 온 메시지를 자바 객체로 변환해서 웹소켓 구독자들에게 전송
        String publishMessage = (String) redisTemplate.getStringSerializer()
                .deserialize(message.getBody());
        ChatMessage chatMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
        messagingTemplate.convertAndSend("/topic/room/" + chatMessage.getRoomId(), chatMessage);
    }
}`,
      },
    },
    {
      eyebrow: 'Security',
      title: '보안: 아무나 들어오면 안 돼요!',
      summary:
        '웹소켓은 한 번 연결되면 HTTP 인터셉터가 작동하지 않습니다. 별도의 보안 설정이 필요합니다.',
      bullets: [
        'ChannelInterceptor를 사용하여 연결 시점에 JWT 토큰을 검증합니다.',
        'Spring Security의 @Order 설정을 통해 웹소켓 보안 우선순위를 조정합니다.',
        'CSRF 보호: 웹소켓은 origin 체크를 통해 CSRF를 기본적으로 방어합니다.',
      ],
      code: {
        title: 'Interceptor JWT Check',
        language: 'java',
        body: `@Override
public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
    if (StompCommand.CONNECT == accessor.getCommand()) {
        String token = accessor.getFirstNativeHeader("Authorization");
        jwtTokenProvider.validateToken(token); // 토큰 검증 실패 시 예외 발생
    }
    return message;
}`,
      },
    },
    {
      eyebrow: 'Production Tips',
      title: '실제 서비스 운영 꿀팁',
      bullets: [
        'Heartbeat: 연결이 끊겼는지 주기적으로 확인 (보통 10~20초)',
        'SockJS: 웹소켓을 지원하지 않는 브라우저를 위해 HTTP Streaming 등으로 자동 전환',
        'Error Handling: 메시지 전송 실패 시 재시도 로직이나 에러 메시지 처리',
        'Binary Data: 사진/파일 전송은 웹소켓보다 별도의 파일 서버(S3 등) URL 공유 권장',
      ],
    },
    {
      eyebrow: 'Wrap-up',
      title: '최종 정리 및 실습 과제',
      checklist: [
        '웹소켓의 양방향 통신 원리 이해하기',
        'STOMP를 이용한 Pub/Sub 구조 설계',
        'Spring Boot에서의 WebSocketConfig 설정',
        'Redis를 활용한 다중 서버 확장 전략 수립',
        'JWT 인터셉터를 통한 보안 강화',
      ],
      tip: '단순한 채팅을 넘어 실시간 알림, 주식 차트, 협업 툴(노션 등)로 상상력을 넓혀보세요.',
    },
  ],
  presenterScripts: [
    [
      '안녕하세요! 오늘 저희는 웹 기술의 꽃이라고 불리는 "실시간 메시징"에 대해 깊이 있게 다뤄보겠습니다.',
      '단순히 코드를 짜는 법을 넘어, 왜 웹소켓이 탄생했는지, 그리고 수만 명의 사용자가 접속해도 견딜 수 있는 구조는 어떻게 만드는지까지 함께 고민해 볼 거예요.',
    ],
    [
      '먼저 HTTP와 웹소켓의 차이를 명확히 아는 게 중요합니다.',
      'REST API가 "질문과 답변" 형태의 인터뷰라면, 웹소켓은 "끝나지 않는 전화 통화"와 같습니다.',
      '헤더가 매우 가볍고 상태가 유지되기 때문에, 채팅처럼 주고받는 데이터가 많은 서비스에서 압도적인 효율을 보여줍니다.',
    ],
    [
      '웹소켓 위에서 돌아가는 언어인 STOMP를 설명할 때는 라디오 방송국을 떠올려 보세요.',
      'DJ가 방송을 하면(Publish), 그 주파수를 맞춘 사람들(Subscribe)만 소리를 들을 수 있죠.',
      '우리는 코드로 이 방송국 시스템을 구축할 겁니다.',
    ],
    [
      '웹소켓이 시작되는 찰나의 순간을 "핸드쉐이크"라고 부릅니다.',
      '처음엔 HTTP로 접근했다가 "우리 통신 방식 좀 바꿀까?" 하고 제안하면, 서버가 승인하는 순간 전화선이 연결되는 거죠.',
      '네트워크 로그를 찍어보면 101 Switching Protocols라는 응답 코드를 볼 수 있는데, 이게 바로 그 증거입니다.',
    ],
    [
      '실습 준비물은 간단합니다. 스프링 웹소켓과 Redis 라이브러리만 있으면 됩니다.',
      '요즘은 대부분의 실무 서비스가 서버를 여러 대 두기 때문에, 처음부터 Redis를 함께 공부하는 게 훨씬 유리합니다.',
    ],
    [
      'WebSocketConfig 설정은 우리 서비스의 "지도"를 그리는 작업입니다.',
      '/app으로 시작하는 메시지는 우리 컨트롤러가 처리하고, /topic으로 시작하는 건 브로커가 배달하도록 길을 뚫어주는 거예요.',
      '여기서 withSockJS()라는 옵션은 구형 브라우저에서도 실시간 채팅이 되게 해주는 아주 고마운 기능입니다.',
    ],
    [
      '채팅방에서 주고받을 데이터 모양도 정의해야겠죠?',
      '단순히 텍스트만 보내는 게 아니라, 이게 입장 메시지인지, 퇴장 메시지인지, 아니면 진짜 대화인지 타입을 구분해 주는 게 좋습니다.',
    ],
    [
      '컨트롤러 코드는 생각보다 익숙하실 거예요.',
      '@MessageMapping은 우리가 알던 @PostMapping과 거의 똑같이 동작합니다.',
      '메시지를 받어서 DB에 저장하거나, 입장 인사를 만들어서 모든 구독자에게 전달하는 핵심 로직이 여기서 돌아갑니다.',
    ],
    [
      '단체 채팅뿐만 아니라 일대일 채팅도 중요하죠.',
      '스프링에서는 convertAndSendToUser라는 메서드를 통해 특정 사용자에게만 메시지를 보낼 수 있습니다.',
      '이때 "/user"라는 특수한 접두사를 사용하여, 메시지가 엉뚱한 사람에게 배달되지 않도록 보안을 유지합니다.',
    ],
    [
      '프론트엔드 코드도 살짝 엿볼까요? 클라이언트는 서버 주소로 연결을 시도하고, 특정 방 번호를 구독합니다.',
      '구독이 완료되면 서버에서 메시지가 올 때마다 화면에 그려주기만 하면 끝입니다. 정말 간단하죠?',
    ],
    [
      '자, 이제 진짜 어려운 문제를 마주해 봅시다. 사용자가 너무 많아져서 서버를 늘렸을 때예요.',
      '서버가 두 대가 되면, 1번 서버에 접속한 사람과 2번 서버에 접속한 사람은 서로 만날 수가 없습니다.',
      '이게 바로 웹소켓 세션이 서버 메모리에 갇혀 있기 때문에 발생하는 문제입니다.',
    ],
    [
      '이 문제를 해결하기 위해 Redis라는 "공유 게시판"을 둡니다.',
      '어느 서버로 메시지가 들어오든 Redis에 먼저 알리고, Redis가 모든 서버에게 "메시지 왔으니 다들 배달해!"라고 전파하는 방식입니다.',
      '이게 바로 대규모 실시간 서비스를 만드는 핵심 아키텍처입니다.',
    ],
    [
      'Redis에서 온 소식을 낚아채는 리스너 코드입니다.',
      'Redis라는 광장에서 들려오는 소리를 듣고 있다가, 우리 서버에 연결된 사람들에게 "방금 이런 말이 올라왔어"라고 전해주는 중간 다리 역할을 합니다.',
    ],
    [
      '보안은 항상 중요합니다. 웹소켓은 연결이 한 번 맺어지면 HTTP 보안 필터가 동작하지 않아요.',
      '그래서 연결되는 첫 순간에 JWT 토큰을 꼼꼼하게 검사하는 인터셉터를 만들어야 합니다.',
      '문지기를 세워서 나쁜 사람들이 우리 채팅방에 들어오지 못하게 막는 거죠.',
    ],
    [
      '실제 운영을 할 때는 몇 가지 더 챙겨야 합니다.',
      '인터넷이 잠깐 끊겨도 연결을 유지하려는 "하트비트"나, 고용량 사진은 웹소켓 대신 URL로 보내는 센스가 필요합니다.',
      '이런 디테일이 모여서 장애 없는 훌륭한 서비스가 만들어집니다.',
    ],
    [
      '오늘 우리는 웹소켓의 시작부터 대규모 확장까지 모든 여정을 함께했습니다.',
      '단순한 채팅을 넘어 실시간 알림, 협업 도구 등 여러분이 상상하는 모든 실시간 기능을 이제 직접 만드실 수 있습니다.',
      '고생 많으셨습니다! 이제 직접 코드를 짜며 이 열기를 이어가 봅시다.',
    ],
  ],
}
