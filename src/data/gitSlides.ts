import type { LectureDeck } from '../types'

export const gitDeck: LectureDeck = {
  id: 'git-basics',
  title: 'Git & GitHub 기초',
  description: '버전 관리 시스템 Git과 협업 도구 GitHub 시작하기',
  slides: [
    {
      eyebrow: 'Git Basics',
      title: '개발자의 필수 도구, Git',
      summary: '코드의 변경 이력을 관리하고, 다른 개발자와 협업하기 위한 필수 도구인 Git의 기초를 배웁니다.',
      checklist: ['Git 설치', 'Local Repo', 'Commit', 'Remote Repo', 'Push/Pull'],
      tip: 'Git이 왜 필요한지(과거로 돌아가기, 협업)를 강조하며 시작하세요.',
    },
    {
      eyebrow: 'Concepts',
      title: '꼭 알아야 할 Git 용어',
      summary: 'Git을 사용하면서 가장 많이 접하게 될 핵심 개념들입니다.',
      visual: 'terms',
      bullets: [
        'Repository: 프로젝트의 모든 기록이 담긴 저장소',
        'Commit: 변경 사항을 기록하는 하나의 스냅샷',
        'Branch: 독립적으로 작업을 진행하기 위한 가지',
        'Merge: 나누어진 브랜치를 하나로 합치는 작업',
        'Remote: GitHub와 같은 온라인 저장소',
      ],
    },
    {
      eyebrow: 'Local Workflow',
      title: '로컬 작업 흐름',
      summary: '내 컴퓨터에서 코드를 수정하고 기록하는 과정입니다.',
      code: {
        title: 'Git 기본 명령어 순서',
        language: 'bash',
        body: `# 1. 저장소 생성
git init

# 2. 변경 사항 선택 (Staging)
git add .

# 3. 기록 남기기 (Commit)
git commit -m "첫 번째 커밋"

# 4. 상태 확인
git status`,
      },
    },
    {
      eyebrow: 'Remote Repository',
      title: 'GitHub와 연결하기',
      summary: '내 컴퓨터의 기록을 GitHub 온라인 저장소에 올리고 내려받는 방법입니다.',
      code: {
        title: '원격 저장소 명령어',
        language: 'bash',
        body: `# 원격 저장소 주소 등록
git remote add origin https://github.com/user/repo.git

# 내 기록 보내기
git push -u origin main

# 남의 기록 가져오기
git pull origin main

# 통째로 복사해오기
git clone https://github.com/user/repo.git`,
      },
    },
    {
      eyebrow: 'Branch & Merge',
      title: '브랜치 활용하기',
      summary: '동시에 여러 기능을 개발하거나 실험적인 코드를 짤 때 브랜치를 사용합니다.',
      visual: 'git-flow',
      bullets: [
        '새 기능은 별도의 브랜치에서 작업하는 것이 안전합니다.',
        '작업이 완료되면 메인 브랜치(main/master)로 합칩니다.',
        '협업 시에는 Pull Request(PR)를 통해 검토 후 합칩니다.',
      ],
      code: {
        title: '브랜치 관련 명령어',
        language: 'bash',
        body: `# 브랜치 생성
git branch feature/login

# 브랜치 이동
git checkout feature/login
# 또는
git switch feature/login

# 브랜치 합치기 (main 브랜치에서 실행)
git merge feature/login`,
      },
    },
    {
      eyebrow: 'Conflict',
      title: '충돌(Conflict) 해결하기',
      summary: '같은 파일의 같은 부분을 여러 명이 수정했을 때 발생합니다.',
      bullets: [
        '충돌은 자연스러운 현상입니다. 당황하지 마세요.',
        'Git이 표시해 준 부분을 직접 확인하고 수정합니다.',
        '수정 후 다시 add, commit을 진행하면 해결됩니다.',
      ],
      tip: '충돌 해결 과정을 직접 데모로 보여주면 학생들이 훨씬 안심합니다.',
    },
    {
      eyebrow: 'Best Practice',
      title: '좋은 커밋 습관',
      bullets: [
        '의미 있는 단위로 자주 커밋하세요.',
        '커밋 메시지는 무엇을 왜 바꿨는지 명확하게 적습니다.',
        'main 브랜치에 직접 푸시하기보다 브랜치를 활용하세요.',
        '.gitignore 파일을 만들어 불필요한 파일은 제외합니다.',
      ],
    },
  ],
  presenterScripts: [
    [
      '개발자들의 필수 도구, Git과 GitHub에 대해 배워보겠습니다.',
      '코드를 짜다 보면 "아, 어제 코드로 되돌리고 싶다!"거나 "친구랑 같이 작업하고 싶다!"는 생각이 들 때가 있죠.',
      'Git은 여러분의 코드 역사를 기록해 주는 타임머신이고, GitHub는 그 기록을 온라인에 안전하게 보관하고 공유하는 공간입니다.',
      '오늘 이 두 가지를 마스터해서 협업의 기초를 다져봅시다.',
    ],
    [
      'Git을 쓸 때 꼭 알아야 할 용어들입니다. Repository는 프로젝트 저장소, Commit은 현재 상태를 기록하는 "찰칵" 스냅샷이라고 이해하시면 돼요.',
      'Branch는 나만의 실험실 같은 공간이고, Merge는 그 실험 결과를 메인 코드에 합치는 과정입니다.',
      '마지막으로 Remote는 내 컴퓨터 밖, 즉 GitHub 서버에 있는 저장소를 말합니다.',
    ],
    [
      '내 컴퓨터에서 작업을 기록하는 순서는 딱 세 단계입니다. init으로 시작하고, add로 기록할 파일을 고르고, commit으로 확정 짓는 거죠.',
      '메시지를 남길 때는 "무엇을 바꿨는지" 짧고 명확하게 적는 습관을 들이는 게 좋습니다.',
      '중간중간 status 명령어로 내가 지금 어떤 상태인지 확인하는 것도 잊지 마세요.',
    ],
    [
      '이제 내 기록을 세상에 공개해 봅시다! GitHub에서 만든 저장소 주소를 remote add로 등록해 주세요.',
      'push는 내 기록을 서버로 밀어 올리는 것이고, 반대로 pull은 서버에 있는 남의 기록을 내 컴퓨터로 당겨오는 겁니다.',
      '남의 프로젝트를 통째로 복사하고 싶을 때는 clone을 사용하면 됩니다.',
    ],
    [
      '여러 명이 동시에 작업할 때는 브랜치가 필수입니다. 메인 코드는 가만히 두고, 나만 쓸 수 있는 평행우주(Branch)를 만드는 거죠.',
      '로그인 기능을 만든다면 feature/login 같은 이름을 붙여서 작업한 뒤, 다 만들면 메인에 합칩니다.',
      '이렇게 하면 내가 실수로 코드를 망쳐도 다른 사람의 작업에는 영향을 주지 않아 안전합니다.',
    ],
    [
      '협업하다 보면 가끔 "충돌(Conflict)"이 발생합니다. 같은 부분을 두 명이 동시에 고쳤을 때 Git이 당황해서 멈추는 건데요.',
      '이건 에러가 아니라 "둘 중에 어떤 게 맞아?"라고 Git이 우리에게 물어보는 과정입니다.',
      '코드를 직접 보고 원하는 내용을 선택한 뒤 다시 커밋하면 해결됩니다. 충돌을 두려워하지 마세요, 성장의 기회입니다!',
    ],
    [
      '마지막으로 좋은 개발자가 되기 위한 Git 습관입니다.',
      '너무 큰 단위로 커밋하기보다, 의미 있는 작은 단위로 자주 기록하세요. 나중에 되돌리기도 훨씬 편합니다.',
      '그리고 .gitignore 파일은 꼭 만드세요. 비밀번호가 담긴 설정 파일이나 용량이 큰 실행 파일이 GitHub에 올라가는 걸 막아주는 든든한 가드레일이 됩니다.',
      '자, 이제 직접 첫 번째 커밋을 남기러 가볼까요?',
    ],
    [
      '오늘의 최종 미션입니다! GitHub에 여러분만의 저장소를 만들고 오늘 배운 과정을 직접 실습해 보세요.',
      '브랜치를 만들어서 작업하고, 그 기록을 push하고, 다시 합치는(Merge) 과정까지 성공한다면 여러분은 이제 Git을 두려워할 필요가 없습니다.',
      '실패해도 괜찮습니다. Git은 언제든 과거로 돌아갈 수 있는 타임머신이니까요. 지금 바로 시작해 보세요!',
    ],
  ],
}
