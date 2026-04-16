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
          ko: "친구랑 가볍게 한 판,\n실력이 쌓이면 전국 고수와 겨루는\n소셜 포커 플랫폼.",
          en: "A casual hand with friends,\nthen challenge top players nationwide\n— a social poker platform.",
        },
        badges: { ko: ["정식 등급분류", "소셜 포커", "대회 시스템", "실시간 중계", "토너먼트"], en: ["Official Rating", "Social Poker", "Tournament System", "Live Broadcast", "Tournament"] },
        status: { ko: "출시 예정", en: "Launching Soon" },
        url: null as string | null,
        image: null as string | null,
        highlight: true,
      },
      {
        id: "linkplay",
        color: "#06b6d4",
        tag: { ko: "방송·게임 인터랙티브 플랫폼", en: "Broadcast & Game Interactive Platform" },
        name: "LinkPlay",
        name_ko: "링플",
        desc: {
          ko: "방송 중 시청자와 함께 게임을 즐기는\n새로운 라이브 콘텐츠 경험.\n크리에이터와 시청자의 경계를 허뭅니다.",
          en: "A new live content experience\nwhere viewers play games during broadcasts.\nBlurring the line between creator and audience.",
        },
        badges: { ko: ["실시간 매칭", "크리에이터 연동", "시청자 참여형", "라이브 인터랙션", "미니게임"], en: ["Real-time Matching", "Creator Integration", "Viewer Participation", "Live Interaction", "Mini-games"] },
        status: { ko: "개발 중", en: "In Development" },
        url: null as string | null,
        image: null as string | null,
        highlight: false,
      },
      {
        id: "moitto",
        color: "#10b981",
        tag: { ko: "클럽·소모임 플랫폼", en: "Club & Community Platform" },
        name: "모이또",
        name_ko: "모이또",
        desc: {
          ko: "홀덤펍, 동호회, 스터디 등\n오프라인 모임을 온라인에서 쉽게 운영하세요.\n모집부터 정산까지, 호스트에게 필요한 모든 것.",
          en: "Holdem pubs, clubs, study groups —\nmanage offline communities easily online.\nEverything a host needs, from recruitment to settlement.",
        },
        badges: { ko: ["소모임 운영", "멤버 관리", "포인트·랭킹", "자동 정산", "멤버십"], en: ["Club Management", "Member Mgmt", "Points & Ranking", "Auto Settlement", "Membership"] },
        status: { ko: "개발 중", en: "In Development" },
        url: null as string | null,
        image: null as string | null,
        highlight: false,
      },
      {
        id: "tubelulu",
        color: "#ec4899",
        tag: { ko: "지식기반 팬덤교류 플랫폼", en: "Knowledge-based Fandom Exchange Platform" },
        name: "TubeLuLu",
        name_ko: "투베루루",
        desc: {
          ko: "좋아하는 전문가를 구독하고,\n깊이 있는 인사이트를 읽고, 직접 질문하세요.\n지식과 팬덤이 만나는 새로운 교류 공간.",
          en: "Subscribe to your favorite experts,\nread deep insights, and ask questions directly.\nWhere knowledge meets fandom.",
        },
        badges: { ko: ["전문가 구독", "인사이트 큐레이션", "유료 Q&A", "팬덤 커뮤니티", "지식 교류"], en: ["Expert Subscription", "Insight Curation", "Paid Q&A", "Fandom Community", "Knowledge Exchange"] },
        status: { ko: "베타 준비", en: "Beta Soon" },
        url: null as string | null,
        image: null as string | null,
        highlight: false,
      },
      {
        id: "shuffleup",
        color: "#3b82f6",
        tag: { ko: "대회 운영 솔루션 플랫폼", en: "Tournament Operations Platform" },
        name: "ShuffleUp",
        name_ko: "셔플업",
        desc: {
          ko: "오프라인 포커 대회,\n이제 시스템으로 운영하세요.\n참가 등록부터 중계, 정산까지 하나의 솔루션으로 해결합니다.",
          en: "Run offline poker tournaments\nwith a proper system.\nFrom registration to broadcast and settlement — one solution.",
        },
        badges: { ko: ["토너먼트 관리", "블라인드 관리", "시딩 시스템", "실시간 중계", "자동 정산"], en: ["Tournament Mgmt", "Blind Management", "Seeding System", "Live Broadcast", "Auto Settlement"] },
        status: { ko: "기획 중", en: "Planned" },
        url: null as string | null,
        image: null as string | null,
        highlight: false,
      },
      {
        id: "gtolulu",
        color: "#8b5cf6",
        tag: { ko: "AI기반 GTO솔버", en: "AI-powered GTO Solver" },
        name: "GTOlulu",
        name_ko: "GTO루루",
        desc: {
          ko: "포커 실력을 한 단계 끌어올리는 AI 코치.\nGTO 전략 분석부터 핸드 리뷰, 레인지 시뮬레이션까지\n데이터 기반으로 성장하세요.",
          en: "An AI coach to level up your poker game.\nFrom GTO strategy analysis to hand review and range simulation\n— grow with data.",
        },
        badges: { ko: ["GTO 분석", "핸드 분석", "레인지 시뮬레이션", "AI 코칭", "전략 리포트"], en: ["GTO Analysis", "Hand Analysis", "Range Simulation", "AI Coaching", "Strategy Report"] },
        status: { ko: "기획 중", en: "Planned" },
        url: null as string | null,
        image: null as string | null,
        highlight: false,
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
        title: { ko: "ShuffleUp 파일럿 대회 성료", en: "ShuffleUp Pilot Tournament Complete" },
        desc: { ko: "첫 오프라인 파일럿 대회를 성공적으로 마쳤습니다.\n대회 운영 솔루션의 실전 검증을 완료했습니다.", en: "Successfully completed our first offline pilot tournament.\nField-tested our tournament operations solution." },
        date: "2026.04",
        image: null,
        color: "#3b82f6",
      },
      {
        category: { ko: "서비스", en: "Service" },
        title: { ko: "포커룰루 등급분류 완료", en: "PokerLulu Official Rating Complete" },
        desc: { ko: "게임물관리위원회 정식 등급분류를 받았습니다.\n합법적인 소셜 포커 서비스로 출시를 준비합니다.", en: "Officially rated by GRAC.\nPreparing to launch as a legal social poker service." },
        date: "2026.03",
        image: null,
        color: "#f59e0b",
      },
      {
        category: { ko: "회사", en: "Company" },
        title: { ko: "lulu.ai 법인 설립", en: "lulu.ai Incorporated" },
        desc: { ko: "룰루닷에이아이 법인이 공식 설립되었습니다.\n게임과 커뮤니티를 잇는 여정이 시작됩니다.", en: "lulu.ai has been officially incorporated.\nOur journey connecting games and community begins." },
        date: "2026.02",
        image: null,
        color: "#6366f1",
      },
      {
        category: { ko: "개발", en: "Development" },
        title: { ko: "LinkPlay 프로토타입 공개", en: "LinkPlay Prototype Revealed" },
        desc: { ko: "크리에이터-시청자 인터랙티브 게임 플랫폼의\n첫 프로토타입을 내부 공개했습니다.", en: "Internally revealed the first prototype of our\ncreator-viewer interactive game platform." },
        date: "2026.03",
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
          desc: "We build digital infrastructure for offline venues — tournament systems, member management, and more.",
        },
        {
          icon: "🎙",
          title: "Influencers & Creators",
          desc: "Connect your influence with our platforms — live broadcasts, game content, and community tools.",
        },
        {
          icon: "🤝",
          title: "Corporate & Brand",
          desc: "Corporate partnerships through gaming and community — events, team building, and brand collaborations.",
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
        { label: "서비스", href: "#products" },
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
        { label: "Services", href: "#products" },
        { label: "Partnership", href: "#partnership" },
        { label: "About", href: "#about" },
      ],
    },
  },
};
