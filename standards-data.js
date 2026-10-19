import { curriculumAll } from './curriculum-data.js';

export const SCHOOL_LEVEL_OPTIONS = [
  {
    id: "elem",
    name: "초등학교",
    badge: "초등 1~6학년",
    icon: "🎒",
    iconBg: "#fef3c7",
    iconBorder: "#fde68a",
    desc: "성취기준 체크리스트 제공 연계 (국어, 수학, 사회, 바른생활, 슬기로운생활, 즐거운생활)"
  },
  {
    id: "mid",
    name: "중학교",
    badge: "중학 1~3학년",
    icon: "📚",
    iconBg: "#e0f2fe",
    iconBorder: "#bae6fd",
    desc: "2022 개정 중학교 교육과정 연계 (국어, 수학, 사회·역사·도덕, 진로와 직업)"
  },
  {
    id: "high",
    name: "고등학교",
    badge: "고등 1~3학년",
    icon: "🎓",
    iconBg: "#ede9fe",
    iconBorder: "#ddd6fe",
    desc: "2022 개정 고등학교 교육과정 연계 (국어, 수학, 사회·역사·윤리, 진로와 직업)"
  }
];

export const LOCATION_PRESETS = [
  { id: "loc-mart", name: "대형마트 / 전통시장", icon: "MARKET", desc: "물건 구매, 화폐 및 카드 결제, 지역사회 편의시설 이용" },
  { id: "loc-cafe", name: "베이커리 / 카페", icon: "CAFE", desc: "키오스크 및 구두 주문, 직업 현장 견학, 식음료 에티켓" },
  { id: "loc-garden", name: "수목원 / 생태공원", icon: "NATURE", desc: "자연 오감 탐색, 계절 식물 관찰, 야외 보행 안전" },
  { id: "loc-museum", name: "과학관 / 박물관", icon: "MUSEUM", desc: "체험형 전시물 탐색, 공공장소 관람 예절, 질서 지키기" },
  { id: "loc-transit", name: "지하철역 / 버스터미널", icon: "TRANSIT", desc: "대중교통 승하차, 교통카드 태그, 환승 및 안전 보행" },
  { id: "loc-farm", name: "스마트팜 / 농촌체험장", icon: "FARM", desc: "농작물 수확, 생태 직업 탐구, 도구 안전 사용" }
];

export const THEME_SUGGESTIONS = {
  "loc-mart": [
    "나 스스로 고르고 결제하는 슬기로운 마트 장보기",
    "우리 동네 마트 탐험대: 필요한 물건 찾기와 영수증 확인",
    "예산 안에서 현명하게 소비하는 자립 경제 프로젝트"
  ],
  "loc-cafe": [
    "달콤한 향기 가득한 베이커리 카페 직업 탐험",
    "내 손으로 주문하고 받아오는 카페 에티켓 마스터",
    "바리스타와 제빵사의 하루: 현장에서 배우는 진로 체험"
  ],
  "loc-garden": [
    "오감으로 만나는 초록빛 숲속 생태 보물찾기",
    "계절의 변화를 느끼는 수목원 힐링 산책",
    "자연물 채집과 생태 관찰로 만드는 나만의 숲 지도"
  ],
  "loc-museum": [
    "보고 만지며 배우는 신나는 과학·문화 탐험",
    "공공장소 예절을 지키며 관람하는 문화 나들이",
    "스탬프 투어로 완성하는 우리 역사·과학 탐구"
  ],
  "loc-transit": [
    "카드를 삑! 혼자서도 척척 타는 지하철·버스 원정대",
    "표지판을 따라 목적지까지 안전하게 이동하기",
    "질서와 배려를 실천하는 대중교통 이용 프로젝트"
  ],
  "loc-farm": [
    "씨앗에서 수확까지: 스마트팜 생태 농부 체험",
    "자연이 주는 선물, 농작물 수확과 나눔 활동",
    "식물과 함께 자라는 친환경 직업 탐구 여행"
  ]
};

export const EVALUATION_FOCUS_OPTIONS = [
  {
    id: "eval-independence",
    title: "독립적 수행도 (자립 생활 역량)",
    desc: "교사나 보조인력의 신체적·언어적 촉진 수준을 줄이고, 스스로 물품을 선택하거나 결제·이동하는 독립 수행도 중심 평가"
  },
  {
    id: "eval-communication",
    title: "의사소통 및 상호작용 (AAC / 구어 활용)",
    desc: "현장 직원이나 동료에게 자신의 요구, 질문, 선택, 감사 표현을 구어 또는 AAC 도구로 명확하게 전달하는 의사소통 수행 중심 평가"
  },
  {
    id: "eval-safety",
    title: "안전 수칙 준수 및 공공 에티켓 실천",
    desc: "보행 안전 수칙, 줄 서기, 조용히 관람하기, 돌발 상황 시 인솔 교사 곁에 머무르기 등 공공장소 규칙 이행도 중심 평가"
  },
  {
    id: "eval-participation",
    title: "정서적 참여도 및 자기결정 역량",
    desc: "자신의 흥미와 선호에 따라 활동에 적극적으로 참여하고, 결과에 대한 긍정적 성취감과 감정을 표현하는 태도 중심 평가"
  }
];

export const TEACHING_METHOD_OPTIONS = [
  {
    id: "method-project",
    name: "프로젝트 학습 (PBL)",
    badge: "체험 중심 권장",
    desc: "실제 삶의 문제(예: 가족을 위한 간식 구매하기)를 해결하기 위해 사전 기획부터 현장 실행, 사후 결과물 제작까지 학생 주도로 탐구하는 방식"
  },
  {
    id: "method-cooperation",
    name: "협력 학습 (Cooperative Learning)",
    badge: "사회성 촉진",
    desc: "2~3명의 동료 짝꿍을 이루어 역할을 분담(안내도 확인자, 물품 확인자, 결제 담당자)하고 서로 도움을 주고받으며 미션을 완수하는 방식"
  },
  {
    id: "method-question",
    name: "질문식 수업 (Inquiry / Questioning)",
    badge: "사고력 증진",
    desc: "교사의 구조화된 발문과 시각 단서 질문(예: '이 표지판은 무엇을 뜻할까?', '가장 먼저 어디로 가야 할까?')을 통해 학생의 능동적 탐색을 유도하는 방식"
  },
  {
    id: "method-direct",
    name: "직접교수 및 시연 수업 (Direct Instruction)",
    badge: "기초 기능 습득",
    desc: "교사의 단계적 모델링과 설명 → 학생의 모의 연습(Role-Play) → 실제 현장 즉각 적용 및 피드백으로 이어지는 체계적 기술 습득 방식"
  }
];

// 학교급별 성취기준 데이터 헬퍼 (초등학교: 교육과정 체크리스트, 중/고등: korean-secondary-learning-map-mcp-main)
export function getStandardsForSchoolLevel(schoolLevel) {
  if (schoolLevel === "초등학교") {
    return curriculumAll.elementary || [];
  } else if (schoolLevel === "중학교") {
    return curriculumAll.middle || [];
  } else {
    return curriculumAll.high || [];
  }
}

// 장소 및 학교급에 맞춘 상위 추천 성취기준 6~8개 필터링 헬퍼
export function getRecommendedStandards(schoolLevel, locationId) {
  const all = getStandardsForSchoolLevel(schoolLevel);
  const keywordsMap = {
    "loc-mart": ["구매", "화폐", "돈", "소비", "가게", "시장", "시설", "생활", "계산", "숫자", "말하기", "인사", "질서", "경제", "수량", "선택"],
    "loc-cafe": ["직업", "진로", "주문", "인사", "대화", "식생활", "예절", "음식", "소통", "서비스", "노동", "일자리"],
    "loc-garden": ["식물", "자연", "환경", "계절", "동물", "생태", "감각", "탐색", "관찰", "숲", "건강", "안전", "생명", "공공"],
    "loc-museum": ["문화", "역사", "관람", "전시", "질서", "체험", "탐구", "공공", "예절", "유물", "사회", "유산", "기록"],
    "loc-transit": ["교통", "안전", "이동", "길", "보행", "규칙", "신호", "예절", "표지판", "대중교통", "승하차", "공공", "시설", "생활", "질서"],
    "loc-farm": ["식물", "수확", "농업", "도구", "자연", "생태", "직업", "환경", "노동", "재배", "생명", "진로", "체험"]
  };

  const coreSubjects = [
    "국어", "공통국어", "화법", "독서", "문학", "의사소통",
    "수학", "공통수학", "경제 수학", "직무 수학", "실용수학",
    "사회", "통합사회", "경제", "한국사", "역사", "지리", "정치", "도덕", "윤리",
    "진로와 직업", "진로",
    "바른생활", "슬기로운생활", "즐거운 생활"
  ];

  const keywords = keywordsMap[locationId] || ["생활", "참여", "안전", "대화"];
  const matches = [];

  for (const item of all) {
    const text = (item.desc + " " + item.title + " " + item.subject).toLowerCase();
    let score = 0;
    
    // 핵심 교과 가중치 (+5점)
    if (coreSubjects.some(cs => item.subject.includes(cs))) {
      score += 5;
    }

    for (const kw of keywords) {
      if (text.includes(kw)) score += 3;
    }

    if (score > 5) {
      matches.push({ item, score });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  if (matches.length >= 6) {
    return matches.slice(0, 8).map(m => m.item);
  }

  // 매칭이 부족하면 전체 목록 중 핵심 교과 우선 8개 반환
  const coreFallback = all.filter(item => coreSubjects.some(cs => item.subject.includes(cs)));
  return (coreFallback.length >= 8 ? coreFallback : all).slice(0, 8);
}
