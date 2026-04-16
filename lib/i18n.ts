export type Lang = "ko" | "en";

export const content = {
  nav: {
    ko: { products: "서비스", partnership: "제휴·협력", about: "회사 소개", contact: "문의" },
    en: { products: "Services", partnership: "Partnership", about: "About", contact: "Contact" },
  },

  hero: {
    ko: {
      tag: "lulu.ai",
      headline1: "커뮤니티로 잇는",
      headline2: "새로운 세상",
      sub: "게임, 커뮤니티, 기술이 만나는\n플레이어 생태계를 설계합니다.",
      cta: "서비스 보기",
      cta2: "제휴 문의",
    },
    en: {
      tag: "lulu.ai",
      headline1: "A New World",
      headline2: "Connected by Community.",
      sub: "We design the player ecosystem where\ngame, community, and technology converge.",
      cta: "Explore Services",
      cta2: "Partner With Us",
    },
  },

  about: {
    ko: {
      label: "ABOUT",
      headline: "게임과 커뮤니티로\n세상을 연결합니다",
      body: "룰루닷에이아이는 게임과 커뮤니티, 기술을 연결하는 플랫폼 기업입니다. 온라인 포커부터 라이브 미니게임, 소모임 운영, AI 솔루션까지 — 플레이어 생태계 전반에 걸친 서비스를 설계하고 운영합니다.",
      stats: [
        { value: "6+", label: "개발 중 서비스" },
        { value: "2,000+", label: "국내 홀덤펍" },
        { value: "2030", label: "시장 규모 $372B" },
      ],
      mission: {
        label: "MISSION",
        text: "누구나 자신만의 게임 경험을 만들고, 커뮤니티를 운영하고, 함께 성장할 수 있는 인프라를 제공한다.",
      },
    },
    en: {
      label: "ABOUT",
      headline: "Connecting the world\nthrough games & community",
      body: "lulu.ai is a platform company that connects people through games, community, and technology. From online poker to live mini-games, club management, and AI solutions — we design and operate services across the entire player ecosystem.",
      stats: [
        { value: "6+", label: "Services in Pipeline" },
        { value: "2,000+", label: "Holdem Pubs in Korea" },
        { value: "2030", label: "Market Size $372B" },
      ],
      mission: {
        label: "MISSION",
        text: "Provide the infrastructure for anyone to build their own gaming experience, operate a community, and grow together.",
      },
    },
  },

  products: {
    label: { ko: "SERVICES", en: "SERVICES" },
    headline: {
      ko: "우리가 만드는 서비스",
      en: "Services We Build",
    },
    sub: {
      ko: "온라인 게임부터 라이브 플랫폼, 커뮤니티 솔루션, AI 툴까지 — 플레이어에게 필요한 모든 것을 만듭니다.",
      en: "From online games to live platforms, community solutions, and AI tools — we build everything players need.",
    },
    items: [
      {
        id: "pokerlulu",
        color: "#f59e0b",
        tag: { ko: "온라인 소셜 포커 플랫폼", en: "Online Social Poker Platform" },
        name: "PokerLulu",
        name_ko: "포커룰루",
        desc: {
          ko: "정식 등급분류 완료. 소셜 포커, 대회 시스템, 실시간 중계, 토너먼트를 갖춘 온라인 소셜 포커 플랫폼.",
          en: "Officially rated online social poker platform featuring social poker, tournament system, live broadcast, and tournament modes.",
        },
        badges: { ko: ["정식 등급분류", "소셜 포커", "대회 시스템", "실시간 중계", "토너먼트"], en: ["Official Rating", "Social Poker", "Tournament System", "Live Broadcast", "Tournament"] },
        status: { ko: "출시 예정", en: "Launching Soon" },
        highlight: true,
      },
      {
        id: "linkplay",
        color: "#06b6d4",
        tag: { ko: "방송·게임 인터랙티브 플랫폼", en: "Broadcast & Game Interactive Platform" },
        name: "LinkPlay",
        name_ko: "링플",
        desc: {
          ko: "BJ·크리에이터와 시청자가 함께 즐기는 참여형 라이브 미니게임 플랫폼. 게임산업법 기반의 합법적 구조로 운영.",
          en: "Participatory live mini-game platform for creators and viewers. Built on a legally compliant structure under the Game Industry Act.",
        },
        badges: { ko: ["라이브 참여", "크리에이터 연동", "게임산업법 준수"], en: ["Live Participation", "Creator Integration", "Game Act Compliant"] },
        status: { ko: "개발 중", en: "In Development" },
        highlight: false,
      },
      {
        id: "moitto",
        color: "#10b981",
        tag: { ko: "클럽·소모임 플랫폼", en: "Club & Community Platform" },
        name: "모이또",
        name_ko: "모이또",
        desc: {
          ko: "호스트 중심 소모임 운영 플랫폼. 모집부터 포인트·랭킹·정산·멤버십까지 한 곳에서 운영.",
          en: "Host-centric club management platform. Recruitment, points, ranking, settlement, and membership — all in one place.",
        },
        badges: { ko: ["소모임 운영", "포인트/랭킹", "정산 시스템", "멤버십"], en: ["Club Management", "Points & Ranking", "Settlement", "Membership"] },
        status: { ko: "개발 중", en: "In Development" },
        highlight: false,
      },
      {
        id: "tubelulu",
        color: "#ec4899",
        tag: { ko: "지식기반 팬덤교류 플랫폼", en: "Knowledge-based Fandom Exchange Platform" },
        name: "TubeLuLu",
        name_ko: "투베루루",
        desc: {
          ko: "전문가를 구독하고 깊이 있는 인사이트를 읽고 직접 질문하는 지식기반 팬덤 교류 플랫폼.",
          en: "Subscribe to experts, read deep insights, and ask questions directly — a knowledge-based fandom exchange platform.",
        },
        badges: { ko: ["전문가 구독", "인사이트 큐레이션", "유료 Q&A"], en: ["Expert Subscription", "Insight Curation", "Paid Q&A"] },
        status: { ko: "베타 준비", en: "Beta Soon" },
        highlight: false,
      },
      {
        id: "shuffleup",
        color: "#3b82f6",
        tag: { ko: "대회 운영 솔루션 플랫폼", en: "Tournament Operations Platform" },
        name: "ShuffleUp",
        name_ko: "셔플업",
        desc: {
          ko: "오프라인 포커 대회 운영을 위한 올인원 솔루션. 등록·시딩·블라인드 관리·중계·정산까지 한 번에.",
          en: "All-in-one solution for offline poker tournament management. Registration, seeding, blind management, broadcast, and settlement.",
        },
        badges: { ko: ["토너먼트 관리", "실시간 중계", "정산 자동화"], en: ["Tournament Mgmt", "Live Broadcast", "Auto Settlement"] },
        status: { ko: "기획 중", en: "Planned" },
        highlight: false,
      },
      {
        id: "gtolulu",
        color: "#8b5cf6",
        tag: { ko: "AI기반 GTO솔버", en: "AI-powered GTO Solver" },
        name: "GTOlulu",
        name_ko: "GTO루루",
        desc: {
          ko: "AI 기반 GTO(Game Theory Optimal) 솔버. 핸드 분석, 레인지 시뮬레이션, 실전 전략 코칭을 하나의 툴에서.",
          en: "AI-powered GTO (Game Theory Optimal) solver. Hand analysis, range simulation, and real-game strategy coaching in one tool.",
        },
        badges: { ko: ["GTO 분석", "레인지 시뮬레이션", "AI 코칭"], en: ["GTO Analysis", "Range Simulation", "AI Coaching"] },
        status: { ko: "기획 중", en: "Planned" },
        highlight: false,
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
          desc: "자체 포커 앱 출시, 대회 운영 시스템, 회원 관리 솔루션 도입에 관심 있는 오프라인 공간 사업자와 협력합니다.",
        },
        {
          icon: "🎙",
          title: "인플루언서·커뮤니티",
          desc: "자신만의 브랜드 포커 서비스를 만들고 싶은 포커 인플루언서, 유튜버, 커뮤니티 운영자와 함께합니다.",
        },
        {
          icon: "🤝",
          title: "기업·브랜드 제휴",
          desc: "팀빌딩, 이벤트, 브랜드 협업 등 포커를 활용한 기업 파트너십을 논의합니다.",
        },
        {
          icon: "🌏",
          title: "해외·투자 파트너",
          desc: "아시아 포커 시장 확장을 함께 추진할 해외 파트너, 투자자와의 협력을 환영합니다.",
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
          desc: "We partner with offline venues interested in launching their own poker apps, tournament management systems, and member management solutions.",
        },
        {
          icon: "🎙",
          title: "Influencers & Communities",
          desc: "We work with poker influencers, YouTubers, and community operators who want to build their own branded poker services.",
        },
        {
          icon: "🤝",
          title: "Corporate & Brand",
          desc: "We discuss corporate partnerships using poker for team building, events, and brand collaborations.",
        },
        {
          icon: "🌏",
          title: "Global & Investment",
          desc: "We welcome overseas partners and investors who want to expand the Asian poker market together.",
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
      body: "lulu.ai starts in Korea, expands across Asia — Japan, Taiwan, and beyond — and grows into a global player network. Our goal is not a single service, but to become the platform that encompasses the entire gaming and community ecosystem.",
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
        { label: "포커룰루", href: "#" },
        { label: "제휴 문의", href: "#partnership" },
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
        { label: "PokerLulu", href: "#" },
        { label: "Partnership", href: "#partnership" },
        { label: "About", href: "#about" },
      ],
    },
  },
};
