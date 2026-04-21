export type Lang = "ko" | "en";

export const content = {
  nav: {
    ko: { products: "서비스", partnership: "제휴·협력", about: "회사 소개", contact: "문의" },
    en: { products: "Services", partnership: "Partnership", about: "About", contact: "Contact" },
  },

  hero: {
    ko: {
      tag: "lulu.ai",
      headline1: "모이고, 머물고, 성장하는",
      headline2: "커뮤니티를 만듭니다",
      sub: "소셜 포커 · 방송 인터랙티브 미니게임 · 소모임·대회 운영 · 지식 플랫폼 · AI 솔루션",
      cta: "서비스 보기",
      cta2: "제휴 문의",
      axisHighlights: { game: "게임", community: "커뮤니티", tech: "기술" },
    },
    en: {
      tag: "lulu.ai",
      headline1: "Gather, Stay, and Grow",
      headline2: "We build the community",
      sub: "Social Poker · Broadcast Mini-games · Clubs & Tournaments · Knowledge Platform · AI Solutions",
      cta: "Explore Services",
      cta2: "Partner With Us",
      axisHighlights: { game: "Game", community: "Community", tech: "Tech" },
    },
  },

  axes: {
    ko: {
      label: "CONNECTED BY COMMUNITY",
      headline: "서로 다른 서비스가\n하나의 커뮤니티로 이어집니다",
      sub: "여섯 개의 플랫폼은 각자의 역할을 하면서도, 커뮤니티라는 결을 따라 자연스럽게 서로를 엮어갑니다.",
      items: [
        {
          key: "game",
          color: "#e63946",
          name: "MEET",
          title: "모이는 순간",
          desc: "소셜 포커와 방송 인터랙티브 미니게임이 플레이어가 처음 만나는 접점이 됩니다.",
          services: ["PokerLulu", "LinkPlay"],
        },
        {
          key: "community",
          color: "#ff8c42",
          name: "BELONG",
          title: "머무는 자리",
          desc: "소모임과 대회로 이어지는 흐름 속에서 플레이어는 자신의 자리를 찾고 관계를 쌓습니다.",
          services: ["Moitto", "ShuffleUp"],
        },
        {
          key: "tech",
          color: "#00a3cc",
          name: "GROW",
          title: "성장의 동행",
          desc: "지식 교류와 AI 코칭이 플레이어의 실력과 여정을 함께 키워갑니다.",
          services: ["TubeLuLu", "GTOlulu"],
        },
      ],
    },
    en: {
      label: "CONNECTED BY COMMUNITY",
      headline: "Different services,\nwoven into one community",
      sub: "Six platforms each play their role, tied together by the thread of community.",
      items: [
        {
          key: "game",
          color: "#e63946",
          name: "MEET",
          title: "Where players meet",
          desc: "Social poker and broadcast interactive mini-games become the first point of contact.",
          services: ["PokerLulu", "LinkPlay"],
        },
        {
          key: "community",
          color: "#ff8c42",
          name: "BELONG",
          title: "Where players belong",
          desc: "Clubs and tournaments give players a place of their own and relationships that last.",
          services: ["Moitto", "ShuffleUp"],
        },
        {
          key: "tech",
          color: "#00a3cc",
          name: "GROW",
          title: "Where players grow",
          desc: "Knowledge exchange and AI coaching carry each player's skill and journey forward.",
          services: ["TubeLuLu", "GTOlulu"],
        },
      ],
    },
  },

  partners: {
    ko: {
      label: "PARTNERS",
      headline: "함께 만드는 파트너들",
      sub: "전국 2,000+ 홀덤펍, 토너먼트 운영사, 방송 플랫폼과 협력합니다.",
      categories: [
        { name: "HOLDEM PUBS", desc: "전국 홀덤펍 네트워크" },
        { name: "TOURNAMENT", desc: "오프라인 대회 운영사" },
        { name: "BROADCAST", desc: "방송·스트리밍 플랫폼" },
        { name: "PAYMENTS", desc: "결제·정산 인프라" },
        { name: "CONTENT", desc: "크리에이터·IP 제휴" },
      ],
      marquee: [
        "HOLDEM PUB A", "TOURNAMENT ORG", "BROADCAST X",
        "PAYMENT CO", "CONTENT STUDIO", "KOREA POKER",
        "LIVE PLATFORM", "EVENT PARTNER",
      ],
      cta: "제휴 문의하기",
    },
    en: {
      label: "PARTNERS",
      headline: "Partners we build with",
      sub: "2,000+ holdem pubs, tournament operators, and broadcast platforms across Korea.",
      categories: [
        { name: "HOLDEM PUBS", desc: "Nationwide pub network" },
        { name: "TOURNAMENT", desc: "Offline tournament operators" },
        { name: "BROADCAST", desc: "Broadcast & streaming" },
        { name: "PAYMENTS", desc: "Payments & settlement" },
        { name: "CONTENT", desc: "Creator & IP partners" },
      ],
      marquee: [
        "HOLDEM PUB A", "TOURNAMENT ORG", "BROADCAST X",
        "PAYMENT CO", "CONTENT STUDIO", "KOREA POKER",
        "LIVE PLATFORM", "EVENT PARTNER",
      ],
      cta: "Partner with us",
    },
  },

  about: {
    ko: {
      label: "ABOUT",
      headline: "게임과 커뮤니티로\n세상을 연결합니다",
      body: "룰루닷에이아이는 게임과 커뮤니티, 기술을 연결하는 플랫폼 기업입니다. 온라인 포커부터 라이브 미니게임, 소모임 운영, AI 솔루션까지, 플레이어 생태계 전반에 걸친 서비스를 설계하고 운영합니다.",
      stats: [
        { value: "6+", label: "개발 중 서비스" },
        { value: "2,000+", label: "국내 홀덤펍" },
        { value: "2030", label: "시장 규모 $372B" },
      ],
      mission: {
        label: "MISSION",
        text: "플레이어가 모이고, 커뮤니티가 만들어지고, 새로운 경험이 시작되는 곳.\n우리는 그 연결의 기반을 설계합니다.",
      },
      milestones: [
        { date: "2026.02", text: "법인 설립" },
        { date: "2026.03", text: "포커룰루 등급분류 완료" },
        { date: "2026.Q2", text: "포커룰루 출시 예정" },
        { date: "2026.Q3", text: "LinkPlay 베타 오픈" },
      ],
    },
    en: {
      label: "ABOUT",
      headline: "Connecting the world\nthrough games & community",
      body: "lulu.ai is a platform company that connects people through games, community, and technology. From online poker to live mini-games, club management, and AI solutions, we design and operate services across the entire player ecosystem.",
      stats: [
        { value: "6+", label: "Services in Pipeline" },
        { value: "2,000+", label: "Holdem Pubs in Korea" },
        { value: "2030", label: "Market Size $372B" },
      ],
      mission: {
        label: "MISSION",
        text: "Where players gather, communities form, and new experiences begin.\nWe design the foundation that connects it all.",
      },
      milestones: [
        { date: "2026.02", text: "Incorporated" },
        { date: "2026.03", text: "PokerLulu GRAC Rating" },
        { date: "2026.Q2", text: "PokerLulu Launch" },
        { date: "2026.Q3", text: "LinkPlay Beta" },
      ],
    },
  },

  products: {
    label: { ko: "SERVICES", en: "SERVICES" },
    headline: {
      ko: "우리가 만드는 서비스",
      en: "Services We Build",
    },
    sub: {
      ko: "온라인 게임부터 라이브 플랫폼, 커뮤니티 솔루션, AI 툴까지, 플레이어에게 필요한 모든 것을 만듭니다.",
      en: "From online games to live platforms, community solutions, and AI tools, we build everything players need.",
    },
    items: [
      {
        id: "pokerlulu",
        axis: "game" as const,
        color: "#f59e0b",
        tag: { ko: "온라인 소셜 포커 플랫폼", en: "Online Social Poker Platform" },
        name: "PokerLulu",
        name_ko: "포커룰루",
        desc: {
          ko: "친구와 가볍게 한 판,\n실력이 쌓이면 전국 고수와 겨루는,\n소셜 포커 플랫폼.",
          en: "A casual hand with friends,\nthen the top players nationwide —\none social poker platform.",
        },
        badges: { ko: ["소셜 포커", "대회 시스템", "실시간 중계", "On/Off Mix", "스쿼드전"], en: ["Social Poker", "Tournament System", "Live Broadcast", "On/Off Mix", "Squad Battle"] },
        status: { ko: "출시 예정", en: "Launching Soon" },
        url: null as string | null,
        image: null as string | null,
        highlight: true,
        features: [
          {
            icon: "♠",
            title: { ko: "소셜 포커", en: "Social Poker" },
            desc: { ko: "친구와 프라이빗 룸을 만들고, 자유롭게 게임을 즐기세요. 칩 걱정 없이 순수한 실력 대결.", en: "Create private rooms with friends and play freely. Pure skill competition without chip worries." },
          },
          {
            icon: "🏆",
            title: { ko: "토너먼트 시스템", en: "Tournament System" },
            desc: { ko: "일일 토너먼트부터 시즌 챔피언십까지. 실력을 증명하고 전국 랭킹에 도전하세요.", en: "From daily tournaments to season championships. Prove your skills and challenge the national rankings." },
          },
          {
            icon: "📺",
            title: { ko: "실시간 중계", en: "Live Broadcast" },
            desc: { ko: "대회 현장을 실시간으로 중계. 관전 모드로 고수들의 플레이를 분석하세요.", en: "Live broadcast tournament action. Analyze top players' moves in spectator mode." },
          },
          {
            icon: "🔀",
            title: { ko: "On/Off Mix 이벤트", en: "On/Off Mix Events" },
            desc: { ko: "온라인 Phase에서 예선, 오프라인 Phase에서 본선. 온·오프라인을 잇는 하이브리드 대회를 경험하세요.", en: "Qualifiers online, finals offline. Experience hybrid tournaments that bridge online and offline play." },
          },
        ],
        gallery: [null, null, null] as (string | null)[],
      },
      {
        id: "linkplay",
        axis: "game" as const,
        color: "#06b6d4",
        tag: { ko: "방송·게임 인터랙티브 플랫폼", en: "Broadcast & Game Interactive Platform" },
        name: "LinkPlay",
        name_ko: "링플",
        desc: {
          ko: "방송 중 시청자와 함께 게임을 즐기는 새로운 라이브 콘텐츠 경험. 크리에이터와 시청자의 경계를 허뭅니다.",
          en: "A new live content experience where viewers play games during broadcasts. Blurring the line between creator and audience.",
        },
        badges: { ko: ["실시간 매칭", "크리에이터 연동", "시청자 참여형", "라이브 인터랙션", "미니게임"], en: ["Real-time Matching", "Creator Integration", "Viewer Participation", "Live Interaction", "Mini-games"] },
        status: { ko: "개발 중", en: "In Development" },
        url: null as string | null,
        image: null as string | null,
        highlight: false,
        features: [
          {
            icon: "⚡",
            title: { ko: "실시간 매칭", en: "Real-time Matching" },
            desc: { ko: "방송 중 시청자와 즉시 게임 매칭. 대기 시간 없이 바로 플레이.", en: "Instant game matching with viewers during broadcast. Play right away with no waiting." },
          },
          {
            icon: "🎙",
            title: { ko: "크리에이터 연동", en: "Creator Integration" },
            desc: { ko: "스트리머 대시보드에서 게임 설정, 참가자 관리, 결과 공유까지 한 번에.", en: "Game setup, participant management, and result sharing, all from the streamer dashboard." },
          },
          {
            icon: "👥",
            title: { ko: "시청자 참여형 게임", en: "Viewer Participation" },
            desc: { ko: "시청자가 직접 참여하는 미니게임. 채팅 연동으로 누구나 쉽게 참가.", en: "Mini-games where viewers participate directly. Easy entry through chat integration." },
          },
          {
            icon: "🎮",
            title: { ko: "다양한 미니게임", en: "Various Mini-games" },
            desc: { ko: "포커, 퀴즈, 배틀 등 방송에 최적화된 인터랙티브 게임 라이브러리.", en: "Interactive game library optimized for broadcasts: poker, quiz, battles, and more." },
          },
        ],
        gallery: [null, null, null] as (string | null)[],
      },
      {
        id: "moitto",
        axis: "community" as const,
        color: "#10b981",
        tag: { ko: "클럽·소모임 플랫폼", en: "Club & Community Platform" },
        name: "Moitto",
        name_ko: "Moitto",
        desc: {
          ko: "홀덤펍, 동호회, 스터디 등 오프라인 모임을 온라인에서 쉽게 운영하세요. 모집부터 정산까지, 호스트에게 필요한 모든 것.",
          en: "Holdem pubs, clubs, study groups. Manage offline communities easily online. Everything a host needs, from recruitment to settlement.",
        },
        badges: { ko: ["소모임 운영", "멤버 관리", "포인트·랭킹", "자동 정산", "멤버십"], en: ["Club Management", "Member Mgmt", "Points & Ranking", "Auto Settlement", "Membership"] },
        status: { ko: "개발 중", en: "In Development" },
        url: null as string | null,
        image: null as string | null,
        highlight: false,
        features: [
          {
            icon: "🏠",
            title: { ko: "소모임 운영", en: "Club Management" },
            desc: { ko: "홀덤펍, 동호회, 스터디 모임을 온라인에서 손쉽게 개설하고 관리하세요.", en: "Easily create and manage holdem pubs, clubs, and study groups online." },
          },
          {
            icon: "👤",
            title: { ko: "멤버 관리", en: "Member Management" },
            desc: { ko: "가입 승인, 역할 설정, 활동 이력까지. 멤버 관리의 모든 것.", en: "Approval, role assignment, activity history. Everything for member management." },
          },
          {
            icon: "📊",
            title: { ko: "포인트·랭킹", en: "Points & Ranking" },
            desc: { ko: "참여 기반 포인트 적립과 랭킹 시스템으로 활발한 커뮤니티를 유지하세요.", en: "Maintain an active community with participation-based points and ranking systems." },
          },
          {
            icon: "💰",
            title: { ko: "자동 정산", en: "Auto Settlement" },
            desc: { ko: "회비 수납부터 정산까지 자동화. 호스트의 운영 부담을 줄여드립니다.", en: "Automated from fee collection to settlement. Reducing the operational burden on hosts." },
          },
        ],
        gallery: [null, null, null] as (string | null)[],
      },
      {
        id: "tubelulu",
        axis: "tech" as const,
        color: "#ec4899",
        tag: { ko: "지식기반 팬덤교류 플랫폼", en: "Knowledge-based Fandom Exchange Platform" },
        name: "TubeLuLu",
        name_ko: "투베루루",
        desc: {
          ko: "좋아하는 전문가를 구독하고, 깊이 있는 인사이트를 읽고, 직접 질문하세요. 지식과 팬덤이 만나는 새로운 교류 공간.",
          en: "Subscribe to your favorite experts, read deep insights, and ask questions directly. Where knowledge meets fandom.",
        },
        badges: { ko: ["전문가 구독", "인사이트 큐레이션", "유료 Q&A", "팬덤 커뮤니티", "지식 교류"], en: ["Expert Subscription", "Insight Curation", "Paid Q&A", "Fandom Community", "Knowledge Exchange"] },
        status: { ko: "베타 준비", en: "Beta Soon" },
        url: null as string | null,
        image: null as string | null,
        highlight: false,
        features: [
          {
            icon: "⭐",
            title: { ko: "전문가 구독", en: "Expert Subscription" },
            desc: { ko: "포커 프로, 전략가, 코치 등 분야별 전문가를 구독하고 인사이트를 받으세요.", en: "Subscribe to field experts like poker pros, strategists, and coaches, and receive their insights." },
          },
          {
            icon: "📖",
            title: { ko: "인사이트 큐레이션", en: "Insight Curation" },
            desc: { ko: "검증된 전문가의 심층 분석과 전략 콘텐츠를 큐레이션하여 제공합니다.", en: "Curated in-depth analysis and strategy content from verified experts." },
          },
          {
            icon: "❓",
            title: { ko: "유료 Q&A", en: "Paid Q&A" },
            desc: { ko: "전문가에게 직접 질문하고 프리미엄 답변을 받으세요. 지식의 가치를 실현합니다.", en: "Ask experts directly and get premium answers. Realizing the value of knowledge." },
          },
          {
            icon: "💬",
            title: { ko: "팬덤 커뮤니티", en: "Fandom Community" },
            desc: { ko: "같은 관심사를 가진 팬들이 모여 토론하고 정보를 교환하는 공간.", en: "A space where fans with shared interests gather to discuss and exchange information." },
          },
        ],
        gallery: [null, null, null] as (string | null)[],
      },
      {
        id: "shuffleup",
        axis: "community" as const,
        color: "#3b82f6",
        tag: { ko: "대회 운영 솔루션 플랫폼", en: "Tournament Operations Platform" },
        name: "ShuffleUp",
        name_ko: "셔플업",
        desc: {
          ko: "오프라인 포커 대회, 이제 시스템으로 운영하세요. 참가 등록부터 중계, 정산까지 하나의 솔루션으로 해결합니다.",
          en: "Run offline poker tournaments with a proper system. From registration to broadcast and settlement, one solution.",
        },
        badges: { ko: ["토너먼트 관리", "블라인드 관리", "시딩 시스템", "실시간 중계", "자동 정산"], en: ["Tournament Mgmt", "Blind Management", "Seeding System", "Live Broadcast", "Auto Settlement"] },
        status: { ko: "기획 중", en: "Planned" },
        url: null as string | null,
        image: null as string | null,
        highlight: false,
        features: [
          {
            icon: "📋",
            title: { ko: "토너먼트 관리", en: "Tournament Management" },
            desc: { ko: "참가 등록, 테이블 배정, 진행 현황까지 대회 운영 전 과정을 시스템화.", en: "Systematize the entire tournament process: registration, table assignment, and progress tracking." },
          },
          {
            icon: "⏱",
            title: { ko: "블라인드 타이머", en: "Blind Timer" },
            desc: { ko: "레벨별 블라인드 구조 설정과 자동 타이머. 대회 진행을 매끄럽게.", en: "Level-based blind structure settings and auto timer. Smooth tournament progression." },
          },
          {
            icon: "🎯",
            title: { ko: "시딩 시스템", en: "Seeding System" },
            desc: { ko: "랜덤 배정부터 시드 기반 매칭까지. 공정한 대진표를 자동 생성합니다.", en: "From random assignment to seed-based matching. Auto-generate fair brackets." },
          },
          {
            icon: "💳",
            title: { ko: "자동 정산", en: "Auto Settlement" },
            desc: { ko: "상금 분배, 참가비 정산, 수익 리포트까지 한 번에 처리.", en: "Handle prize distribution, entry fee settlement, and revenue reports all at once." },
          },
        ],
        gallery: [null, null, null] as (string | null)[],
      },
      {
        id: "gtolulu",
        axis: "tech" as const,
        color: "#8b5cf6",
        tag: { ko: "AI GTO 솔버 + 솔버 위키", en: "AI GTO Solver + Solver Wiki" },
        name: "GTOlulu",
        name_ko: "GTO루루",
        desc: {
          ko: "AI GTO 솔버와 홀덤 솔버 위키가 한 곳에. 게임이론 최적 전략 분석·핸드 리뷰·레인지 시뮬레이션을 위키형 지식 체계와 함께 학습하세요.",
          en: "An AI GTO solver paired with a Holdem Solver Wiki. Game-theory-optimal analysis, hand review, and range simulation — learned alongside a structured knowledge base.",
        },
        badges: { ko: ["GTO 솔버", "솔버 위키", "핸드 리뷰", "레인지 시뮬", "AI 코칭"], en: ["GTO Solver", "Solver Wiki", "Hand Review", "Range Sim", "AI Coaching"] },
        status: { ko: "프리뷰 운영 중", en: "In Preview" },
        url: null as string | null,
        image: null as string | null,
        highlight: false,
        features: [
          {
            icon: "🧠",
            title: { ko: "GTO 솔버", en: "GTO Solver" },
            desc: { ko: "게임이론 최적 전략을 기반으로 한 플레이 분석. AI가 상황별 최선의 액션을 제안합니다.", en: "Play analysis based on Game Theory Optimal strategy. AI suggests the best actions per situation." },
          },
          {
            icon: "📚",
            title: { ko: "홀덤 솔버 위키", en: "Holdem Solver Wiki" },
            desc: { ko: "프리플랍 차트·포지션·스택 깊이·보드 질감까지, 솔버 지식을 위키 형태로 구조화해 필요한 순간 바로 찾아보세요.", en: "Preflop charts, positions, stack depths, board textures — solver knowledge structured as a wiki you can reach in seconds." },
          },
          {
            icon: "🃏",
            title: { ko: "핸드 리뷰", en: "Hand Review" },
            desc: { ko: "플레이한 핸드를 복기하고, 각 상황의 최적 판단을 AI가 분석합니다.", en: "Review played hands and let AI analyze optimal decisions in each situation." },
          },
          {
            icon: "📈",
            title: { ko: "레인지 시뮬레이션", en: "Range Simulation" },
            desc: { ko: "상대방 핸드 레인지를 시뮬레이션하고 확률 기반 전략을 수립하세요.", en: "Simulate opponent hand ranges and build probability-based strategies." },
          },
          {
            icon: "🤖",
            title: { ko: "AI 코칭", en: "AI Coaching" },
            desc: { ko: "개인 플레이 패턴을 학습하는 AI 코치. 약점 분석과 맞춤 훈련 제안.", en: "An AI coach that learns your play patterns. Weakness analysis and personalized training suggestions." },
          },
        ],
        gallery: [null, null, null] as (string | null)[],
      },
    ],
  },

  news: {
    label: { ko: "NEWS & UPDATES", en: "NEWS & UPDATES" },
    headline: {
      ko: "최근 소식",
      en: "Latest Updates",
    },
    sub: {
      ko: "lulu.ai의 최신 활동과 소식을 전합니다.",
      en: "Stay up to date with the latest from lulu.ai.",
    },
    items: [
      {
        category: { ko: "대회", en: "Tournament" },
        title: { ko: "APL x LULU POKER FESTIVAL 개최", en: "APL x LULU POKER FESTIVAL" },
        desc: { ko: "Asia Poker League와 공동 주최하는 대형 포커 페스티벌을 개최합니다.", en: "Co-hosting a large poker festival with the Asia Poker League." },
        date: "2026.05",
        image: null,
        color: "#e60012",
      },
      {
        category: { ko: "대회", en: "Tournament" },
        title: { ko: "LULU INVITATIONAL 개최", en: "LULU INVITATIONAL" },
        desc: { ko: "초청받은 선수만 설 수 있는 프리미엄 무대. 선수·관객·브랜드가 한 자리에서 만난 2025 포커룰루 시즌 클로저.", en: "A premium stage reserved for invited players — where athletes, fans, and the brand shared one night. PokerLulu's 2025 season finale." },
        date: "2025.12",
        image: "/images/news/lulu-invitational.png",
        color: "#8b5cf6",
      },
      {
        category: { ko: "대회", en: "Tournament" },
        title: { ko: "LULU x Nightshift Pub 대회 개최", en: "LULU x Nightshift Pub Tournament" },
        desc: { ko: "Nightshift Pub과 협업한 오프라인 홀덤 대회를 개최했습니다.", en: "Hosted an offline Hold'em tournament in collaboration with Nightshift Pub." },
        date: "2025.06",
        image: null,
        color: "#06b6d4",
      },
    ],
  },

  partnership: {
    ko: {
      label: "PARTNERSHIP",
      headline: "함께 만들어갈\n기회를 찾고 있습니다",
      sub: "룰루닷에이아이는 게임·커뮤니티 생태계를 함께 성장시킬 파트너를 환영합니다.",
      items: [
        {
          icon: "🏢",
          title: "홀덤펍·공간 사업자",
          desc: "대회 운영 시스템, 회원 관리 솔루션 등 오프라인 공간에 필요한 디지털 인프라를 함께 구축합니다.",
        },
        {
          icon: "🎙",
          title: "인플루언서·크리에이터",
          desc: "라이브 방송, 게임 콘텐츠, 커뮤니티 운영 등 크리에이터의 영향력을 플랫폼과 연결합니다.",
        },
        {
          icon: "🤝",
          title: "기업·브랜드 제휴",
          desc: "이벤트, 팀빌딩, 브랜드 콜라보 등 게임과 커뮤니티를 활용한 기업 파트너십을 제안합니다.",
        },
        {
          icon: "🌏",
          title: "해외·투자 파트너",
          desc: "아시아 게임·커뮤니티 시장 진출을 함께 추진할 해외 파트너와 투자자를 환영합니다.",
        },
      ],
      cta: "제휴 문의하기",
    },
    en: {
      label: "PARTNERSHIP",
      headline: "Looking for partners\nto build together",
      sub: "lulu.ai welcomes partners who want to grow the gaming and community ecosystem together.",
      items: [
        {
          icon: "🏢",
          title: "Holdem Pubs & Venues",
          desc: "We build digital infrastructure for offline venues: tournament systems, member management, and more.",
        },
        {
          icon: "🎙",
          title: "Influencers & Creators",
          desc: "Connect your influence with our platforms: live broadcasts, game content, and community tools.",
        },
        {
          icon: "🤝",
          title: "Corporate & Brand",
          desc: "Corporate partnerships through gaming and community: events, team building, and brand collaborations.",
        },
        {
          icon: "🌏",
          title: "Global & Investment",
          desc: "We welcome overseas partners and investors to expand the Asian gaming and community market together.",
        },
      ],
      cta: "Contact for Partnership",
    },
  },

  vision: {
    ko: {
      label: "VISION",
      headline: "아시아를 넘어,\n글로벌 플레이어 네트워크",
      body: "룰루닷에이아이는 한국에서 시작해 일본·대만 등 아시아 전역으로, 그리고 글로벌 플레이어 네트워크로 확장합니다. 우리의 목표는 하나의 서비스가 아니라, 게임과 커뮤니티 생태계 전체를 아우르는 플랫폼이 되는 것입니다.",
    },
    en: {
      label: "VISION",
      headline: "Beyond Asia,\na Global Player Network",
      body: "lulu.ai starts in Korea, expands across Asia including Japan, Taiwan and beyond, and grows into a global player network. Our goal is not a single service, but to become the platform that encompasses the entire gaming and community ecosystem.",
    },
  },

  footer: {
    ko: {
      company: "룰루닷에이아이",
      company_en: "lulu.ai",
      tagline: "커뮤니티로 잇는 새로운 세상.",
      contact_label: "사업 문의",
      contact: "contact@lulu.ai",
      rights: "© 2026 lulu.ai. All rights reserved.",
      links: [
        { label: "서비스", href: "#products" },
        { label: "제휴 문의", href: "/partnership" },
        { label: "회사 소개", href: "#about" },
      ],
    },
    en: {
      company: "lulu.ai",
      company_en: "lulu.ai",
      tagline: "A New World Connected by Community.",
      contact_label: "Business Inquiry",
      contact: "contact@lulu.ai",
      rights: "© 2026 lulu.ai. All rights reserved.",
      links: [
        { label: "Services", href: "#products" },
        { label: "Partnership", href: "/partnership" },
        { label: "About", href: "#about" },
      ],
    },
  },
};
