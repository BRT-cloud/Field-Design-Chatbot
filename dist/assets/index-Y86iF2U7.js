import{r as e}from"./rolldown-runtime-W7wSyTde.js";import{t}from"./curriculum-data-R8fr1bWs.js";import{t as n}from"./jszip-vendor-DgZ-bUN_.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var r=[{id:`elem`,name:`초등학교`,badge:`초등 1~6학년`,desc:`성취기준 체크리스트 제공 연계 (국어, 수학, 사회, 바른생활, 슬기로운생활, 즐거운생활)`},{id:`mid`,name:`중학교`,badge:`중학 1~3학년`,desc:`2022 개정 중학교 교육과정 연계 (국어, 수학, 사회·역사·도덕, 진로와 직업)`},{id:`high`,name:`고등학교`,badge:`고등 1~3학년`,desc:`2022 개정 고등학교 교육과정 연계 (국어, 수학, 사회·역사·윤리, 진로와 직업)`}],i=[{id:`loc-mart`,name:`대형마트 / 전통시장`,icon:`MARKET`,desc:`물건 구매, 화폐 및 카드 결제, 지역사회 편의시설 이용`},{id:`loc-cafe`,name:`베이커리 / 카페`,icon:`CAFE`,desc:`키오스크 및 구두 주문, 직업 현장 견학, 식음료 에티켓`},{id:`loc-garden`,name:`수목원 / 생태공원`,icon:`NATURE`,desc:`자연 오감 탐색, 계절 식물 관찰, 야외 보행 안전`},{id:`loc-museum`,name:`과학관 / 박물관`,icon:`MUSEUM`,desc:`체험형 전시물 탐색, 공공장소 관람 예절, 질서 지키기`},{id:`loc-transit`,name:`지하철역 / 버스터미널`,icon:`TRANSIT`,desc:`대중교통 승하차, 교통카드 태그, 환승 및 안전 보행`},{id:`loc-farm`,name:`스마트팜 / 농촌체험장`,icon:`FARM`,desc:`농작물 수확, 생태 직업 탐구, 도구 안전 사용`}],a={"loc-mart":[`나 스스로 고르고 결제하는 슬기로운 마트 장보기`,`우리 동네 마트 탐험대: 필요한 물건 찾기와 영수증 확인`,`예산 안에서 현명하게 소비하는 자립 경제 프로젝트`],"loc-cafe":[`달콤한 향기 가득한 베이커리 카페 직업 탐험`,`내 손으로 주문하고 받아오는 카페 에티켓 마스터`,`바리스타와 제빵사의 하루: 현장에서 배우는 진로 체험`],"loc-garden":[`오감으로 만나는 초록빛 숲속 생태 보물찾기`,`계절의 변화를 느끼는 수목원 힐링 산책`,`자연물 채집과 생태 관찰로 만드는 나만의 숲 지도`],"loc-museum":[`보고 만지며 배우는 신나는 과학·문화 탐험`,`공공장소 예절을 지키며 관람하는 문화 나들이`,`스탬프 투어로 완성하는 우리 역사·과학 탐구`],"loc-transit":[`카드를 삑! 혼자서도 척척 타는 지하철·버스 원정대`,`표지판을 따라 목적지까지 안전하게 이동하기`,`질서와 배려를 실천하는 대중교통 이용 프로젝트`],"loc-farm":[`씨앗에서 수확까지: 스마트팜 생태 농부 체험`,`자연이 주는 선물, 농작물 수확과 나눔 활동`,`식물과 함께 자라는 친환경 직업 탐구 여행`]},o=[{id:`eval-independence`,title:`독립적 수행도 (자립 생활 역량)`,desc:`교사나 보조인력의 신체적·언어적 촉진 수준을 줄이고, 스스로 물품을 선택하거나 결제·이동하는 독립 수행도 중심 평가`},{id:`eval-communication`,title:`의사소통 및 상호작용 (AAC / 구어 활용)`,desc:`현장 직원이나 동료에게 자신의 요구, 질문, 선택, 감사 표현을 구어 또는 AAC 도구로 명확하게 전달하는 의사소통 수행 중심 평가`},{id:`eval-safety`,title:`안전 수칙 준수 및 공공 에티켓 실천`,desc:`보행 안전 수칙, 줄 서기, 조용히 관람하기, 돌발 상황 시 인솔 교사 곁에 머무르기 등 공공장소 규칙 이행도 중심 평가`},{id:`eval-participation`,title:`정서적 참여도 및 자기결정 역량`,desc:`자신의 흥미와 선호에 따라 활동에 적극적으로 참여하고, 결과에 대한 긍정적 성취감과 감정을 표현하는 태도 중심 평가`}],s=[{id:`method-project`,name:`프로젝트 학습 (PBL)`,badge:`체험 중심 권장`,desc:`실제 삶의 문제(예: 가족을 위한 간식 구매하기)를 해결하기 위해 사전 기획부터 현장 실행, 사후 결과물 제작까지 학생 주도로 탐구하는 방식`},{id:`method-cooperation`,name:`협력 학습 (Cooperative Learning)`,badge:`사회성 촉진`,desc:`2~3명의 동료 짝꿍을 이루어 역할을 분담(안내도 확인자, 물품 확인자, 결제 담당자)하고 서로 도움을 주고받으며 미션을 완수하는 방식`},{id:`method-question`,name:`질문식 수업 (Inquiry / Questioning)`,badge:`사고력 증진`,desc:`교사의 구조화된 발문과 시각 단서 질문(예: '이 표지판은 무엇을 뜻할까?', '가장 먼저 어디로 가야 할까?')을 통해 학생의 능동적 탐색을 유도하는 방식`},{id:`method-direct`,name:`직접교수 및 시연 수업 (Direct Instruction)`,badge:`기초 기능 습득`,desc:`교사의 단계적 모델링과 설명 → 학생의 모의 연습(Role-Play) → 실제 현장 즉각 적용 및 피드백으로 이어지는 체계적 기술 습득 방식`}];function c(e){return e===`초등학교`?t.elementary||[]:e===`중학교`?t.middle||[]:t.high||[]}function l(e,t){let n=c(e),r={"loc-mart":[`구매`,`화폐`,`돈`,`소비`,`가게`,`시장`,`시설`,`생활`,`계산`,`숫자`,`말하기`,`인사`,`질서`,`경제`,`수량`,`선택`],"loc-cafe":[`직업`,`진로`,`주문`,`인사`,`대화`,`식생활`,`예절`,`음식`,`소통`,`서비스`,`노동`,`일자리`],"loc-garden":[`식물`,`자연`,`환경`,`계절`,`동물`,`생태`,`감각`,`탐색`,`관찰`,`숲`,`건강`,`안전`,`생명`,`공공`],"loc-museum":[`문화`,`역사`,`관람`,`전시`,`질서`,`체험`,`탐구`,`공공`,`예절`,`유물`,`사회`,`유산`,`기록`],"loc-transit":[`교통`,`안전`,`이동`,`길`,`보행`,`규칙`,`신호`,`예절`,`표지판`,`대중교통`,`승하차`,`공공`,`시설`,`생활`,`질서`],"loc-farm":[`식물`,`수확`,`농업`,`도구`,`자연`,`생태`,`직업`,`환경`,`노동`,`재배`,`생명`,`진로`,`체험`]},i=[`국어`,`공통국어`,`화법`,`독서`,`문학`,`의사소통`,`수학`,`공통수학`,`경제 수학`,`직무 수학`,`실용수학`,`사회`,`통합사회`,`경제`,`한국사`,`역사`,`지리`,`정치`,`도덕`,`윤리`,`진로와 직업`,`진로`,`바른생활`,`슬기로운생활`,`즐거운 생활`],a=r[t]||[`생활`,`참여`,`안전`,`대화`],o=[];for(let e of n){let t=(e.desc+` `+e.title+` `+e.subject).toLowerCase(),n=0;i.some(t=>e.subject.includes(t))&&(n+=5);for(let e of a)t.includes(e)&&(n+=3);n>5&&o.push({item:e,score:n})}if(o.sort((e,t)=>t.score-e.score),o.length>=6)return o.slice(0,8).map(e=>e.item);let s=n.filter(e=>i.some(t=>e.subject.includes(t)));return(s.length>=8?s:n).slice(0,8)}var u=e(n(),1),d=`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`;function f(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&apos;`)}function p(e){if(e&&e.academicYear){let t=parseInt(e.academicYear,10);if(!isNaN(t)&&t>2e3)return t}let t=new Date;return t.getMonth()>=8?t.getFullYear()+1:t.getFullYear()}function m(e,t){let n=p(e),r=e.schoolLevel||`특수학교`,i=`${n}학년도 ${r} 특수학급 현장체험학습 운영 계획(안)`,a=`${r} 특수학급`,o=e.locationName||`현장체험학습지`,s=e.periodCount||10,c=e.difficultyLevel||`기본/적용 수준`,l=e.teachingMethod||`프로젝트 학습`,u=e.theme||`지역사회 탐색 및 자립생활 프로젝트`;return{year:n,schoolLevel:r,docTitle:i,orgName:a,docSummary:`1. 주제: ${u} | 2. 장소: ${o} | 3. 차시: 총 ${s}차시 (${c})`,locationName:o,periodCount:s,difficultyLevel:c,teachingMethod:l,theme:u,bodyParagraphs:[`1. 추진 목적 및 개요`,`  가. 주제: ${u}`,`  나. 장소: ${o} (총 ${s}차시 / ${c})`,`  다. 주요 수업 방식: ${l}`,``,`2. 연계 교육과정 성취기준`,...e.standards&&e.standards.length>0?e.standards.map(e=>`  - ${e.code} ${e.title||e.subject||``}: ${e.desc||``}`):[`  - [공통] 실생활 중심 자립생활 및 지역사회 적응 기술`],``,`3. 체험학습 목표 (3차원 학습 목표)`,`  가. [지식·이해] ${e.goalKnowledge||`${o}의 환경 및 이용 방법을 이해한다.`}`,`  나. [기능·수행] ${e.goalSkill||`필요한 활동을 스스로 선택하고 안전하게 완수한다.`}`,`  다. [가치·태도] ${e.goalAttitude||`자립심과 공공장소 에티켓을 기른다.`}`,``,`4. 학생 맞춤형 지원 및 안전 대책 (개인식별정보 배제)`,...e.functionalNeeds&&e.functionalNeeds.length>0?e.functionalNeeds.map(e=>`  - ${e}`):[`  - 이동 및 안전을 위한 인솔 보조 인력 밀착 지원`],``,`5. 차시별 세부 운영 계획 (사전·현장·사후 로드맵)`,...t&&t.length>0?t.flatMap(e=>[`  [${e.num}차시 / ${e.phaseBadge||`수업`}] ${e.title} (연계: ${(e.standardsCodes||[]).join(`, `)||`공통`})`,`    - 주요 활동: ${e.summary||``}`,`    - 평가 관점: ${e.eval||``}`]):[`  [1차시 / 사전] 사전 안전 지도 및 탐색`],``,`6. 안전지도 및 비상 대책`,`  가. 사전 답사를 통한 배리어 프리(무단차, 경사로, 비상구) 동선 확보`,`  나. 돌발 상황 대비 1:1 보조인력 배치 및 비상연락망 유지`,`  다. 학생 특성별 보완대체의사소통(AAC) 도구 및 비상 명찰 착용`]}}async function h(e,t,n=null){try{let r=null,i=!1;if(n&&n.byteLength>0)try{let e=await u.default.loadAsync(n);e.file(`Contents/section0.xml`)?(r=e,i=!0):console.warn(`등록된 파일에 Contents/section0.xml이 없어 표준 템플릿을 대체 사용합니다.`)}catch(e){console.warn(`커스텀 템플릿 파싱 실패, 표준 템플릿으로 자동 대체됩니다:`,e)}if(!r){let e=atob(d),t=e.length,n=new Uint8Array(t);for(let r=0;r<t;r++)n[r]=e.charCodeAt(r);r=await u.default.loadAsync(n.buffer)}let a=r.file(`Contents/section0.xml`);if(!a)throw Error(`HWPX 템플릿 내에 Contents/section0.xml이 존재하지 않습니다.`);let o=await a.async(`string`),{docTitle:s,orgName:c,docSummary:l,bodyParagraphs:p,locationName:h}=m(e,t),g=/(<hp:fieldBegin\b[^>]*name=["']제목["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;g.test(o)&&(o=o.replace(g,`$1<hp:t>${f(s)}</hp:t>`));let _=/(<hp:fieldBegin\b[^>]*name=["']작성기관["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;_.test(o)&&(o=o.replace(_,`$1<hp:t>${f(c)}</hp:t>`));let v=/(<hp:fieldBegin\b[^>]*name=["']요약설명["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;v.test(o)&&(o=o.replace(v,`$1<hp:t>${f(l)}</hp:t>`));let y=p.map((e,t)=>{let n=f(e);return`<hp:p id="${19e8+t}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>${n}</hp:t></hp:run></hp:p>`}).join(``);o.includes(`</hs:sec>`)?o=o.replace(`</hs:sec>`,`${y}</hs:sec>`):o+=y,r.file(`Contents/section0.xml`,o);let b=`${s}\n${c}\n\n${l}\n\n${p.join(`
`)}`;r.file(`Preview/PrvText.txt`,b);let x=await r.generateAsync({type:`blob`,mimeType:`application/hwp+zip`,compression:`DEFLATE`,compressionOptions:{level:6}}),S=`현장체험학습_계획서_${h.replace(/[\/\\:*?"<>|]/g,`_`).trim()}.hwpx`,C=URL.createObjectURL(x),w=document.createElement(`a`);return w.href=C,w.download=S,document.body.appendChild(w),w.click(),document.body.removeChild(w),setTimeout(()=>{URL.revokeObjectURL(C)},1500),{success:!0,isCustomTemplate:i,fileName:S}}catch(e){throw console.error(`HWPX 생성 및 다운로드 오류:`,e),e}}function g(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}var _=`fieldtrip_plan_session_state`,v=new Date().getFullYear(),y={academicYear:new Date().getMonth()>=8?v+1:v,schoolLevel:`초등학교`,locationId:`loc-mart`,locationName:`대형마트 / 전통시장`,standards:[{id:`std-default-1`,code:`[실생활-자립]`,title:`지역사회 참여 및 자립 생활`,subject:`공통`,desc:`지역사회 환경을 탐색하고 실생활 자립 기능 및 안전 수칙을 익혀 실천한다.`}],customStandardInput:``,standardsSearchKeyword:``,standardsSubjectFilter:`전체`,theme:`나 스스로 고르고 결제하는 슬기로운 마트 장보기`,periodCount:10,difficultyLevel:`기본/적용 수준 (시각적 단서 및 단계적 모델링)`,evalFocusId:`eval-independence`,evalFocusTitle:`독립적 수행도 (자립 생활 역량)`,goalKnowledge:`지역사회 매장의 구조와 물건 구매 및 결제 절차를 이해한다.`,goalSkill:`시각 단서와 AAC를 활용하여 필요한 물건을 찾고 결제 과정을 독립적으로 수행한다.`,goalAttitude:`공공장소 에티켓과 보행 안전 수칙을 지키며 즐겁게 참여한다.`,functionalNeeds:[`휠체어 이동 지원 1명 (무단차 경사로 필요)`,`시각적 단계별 일과표 및 사진 단서 필요 2명`,`소음 민감성 대비 저소음 휴식 쉼터 동선 1명`],teachingMethod:`프로젝트 학습 (PBL)`,uploadedFileName:``,uploadedFileMerged:!1},b={step:1,plan:structuredClone(y),uploadedTemplateBuffer:null,standardsDisplayLimit:20},x={"loc-mart":{preIntro:`방문할 대형마트와 전통시장의 위치와 판매 구역을 알아봅니다.`,preBody:`필요한 물품 사진 카드를 고르고 나만의 쇼핑 목록 및 예산 계획서 작성하기.`,preOutro:`장바구니와 계산 모의 연습을 마치고 체크리스트를 확인합니다.`,fieldIntro:`마트 입구에서 장바구니를 챙기고 이동 동선과 비상구를 확인합니다.`,fieldBody:`진열대에서 목표 물건을 직접 찾고 계산대에서 카드/현금으로 결제 완수하기.`,fieldOutro:`영수증과 구매 물품을 챙기고 계산원에게 감사 인사를 나눕니다.`,postIntro:`영수증 품목과 실제 사 온 물건을 대조하며 정산 활동을 시작합니다.`,postBody:`구매한 물품을 친구들과 나누고 지출 내역 정산 활동지 작성하기.`,postOutro:`스스로 장보기를 해낸 성취감을 나누고 나만의 소감 신문을 완성합니다.`,pptMission:`원하는 물건 1가지 스스로 찾아서 결제하기`,worksheetBasic:`마트 물건 사진 스티커 짝 맞추기 및 영수증 도장 찍기`,worksheetApply:`내가 사고 싶은 물건 2가지 오려 붙이고 가격 적기`,worksheetAdvanced:`정해진 예산(5,000원) 내 물품 목록 및 거스름돈 계산하기`},"loc-cafe":{preIntro:`베이커리 및 카페 공간의 특징과 판매되는 메뉴를 탐색합니다.`,preBody:`음료 및 베이커리 메뉴판 읽기, 키오스크 및 구두 주문 시뮬레이션 연습.`,preOutro:`내가 마시고 싶은 음료 카드와 모의 결제 수단을 준비합니다.`,fieldIntro:`카페에 도착하여 차례대로 줄을 서고 메뉴판을 확인합니다.`,fieldBody:`키오스크 또는 카운터 직원에게 원하는 메뉴를 직접 주문하고 결제하기.`,fieldOutro:`진동벨이 울리면 음료를 안전하게 수령하여 지정된 자리에 착석합니다.`,postIntro:`주문하여 받은 음료와 빵을 감상하며 식음료 에티켓을 되짚어봅니다.`,postBody:`친구들과 간식을 나누어 먹으며 카페 이용 소감과 직업(바리스타) 이야기 나누기.`,postOutro:`음료 잔과 트레이를 퇴식구에 스스로 정리하고 자리를 정돈합니다.`,pptMission:`카운터나 키오스크에서 내 메뉴 직접 주문하고 받아오기`,worksheetBasic:`카페 빵/음료 사진 스티커 붙이기 및 감사 인사 표현하기`,worksheetApply:`주문할 메뉴 픽토그램 선택 및 결제 카드 태그 연습하기`,worksheetAdvanced:`카페 메뉴판 금액 합산하기 및 바리스타 직업 인터뷰 작성`},"loc-garden":{preIntro:`수목원과 생태공원의 계절별 나무와 꽃, 자연환경을 사진으로 만납니다.`,preBody:`숲속 관찰 돋보기와 자연물 채집 봉투를 챙기고 야외 안전 수칙을 익힙니다.`,preOutro:`숲 탐방 지도에서 휠체어 산책로와 쉼터 위치를 확인합니다.`,fieldIntro:`수목원 입구에서 상쾌한 공기를 마시며 숲속 관찰 약속을 다집니다.`,fieldBody:`오감으로 나뭇잎과 꽃의 질감, 향기를 느끼고 떨어진 자연물 관찰 채집하기.`,fieldOutro:`쉼터에 모여 수분 보충을 하고 자연의 소리를 경청하며 휴식합니다.`,postIntro:`채집한 나뭇잎, 솔방울 등 자연물을 책상 위에 펼쳐놓고 관찰합니다.`,postBody:`자연물을 활용한 나만의 액자 만들기 및 숲에서 느낀 감정 나누기.`,postOutro:`친구들의 자연물 작품을 감상하고 환경을 아끼는 마음을 다짐합니다.`,pptMission:`숲길을 따라 안전하게 걸으며 서로 다른 나뭇잎 3종류 찾아보기`,worksheetBasic:`나뭇잎 모양 맞추기 및 초록빛 자연 스티커 붙이기`,worksheetApply:`자연물 프로타주(나뭇잎 탁본) 뜨기 및 질감 낱말 고르기`,worksheetAdvanced:`계절 식물 관찰 일지 작성 및 생태 지도 만들기`},"loc-museum":{preIntro:`박물관과 과학관에 전시된 신기한 유물과 체험 전시물을 탐색합니다.`,preBody:`공공장소 관람 예절(조용히 걷기, 차례 지켜 만지기)과 동선을 숙지합니다.`,preOutro:`전시관 스탬프 투어 용지와 관람 미션 카드를 준비합니다.`,fieldIntro:`전시관 입구에서 안내원의 안내를 듣고 차례를 지켜 입장합니다.`,fieldBody:`체험형 전시물을 조작해보고 안내 표지판을 읽으며 미션 스탬프 찍기.`,fieldOutro:`인원 점검 후 기념 스탬프를 확인하고 질서 있게 퇴장합니다.`,postIntro:`전시관에서 찍은 사진과 완성된 스탬프 투어 지도를 확인합니다.`,postBody:`가장 인상 깊었던 전시물 그림 그리기 및 친구들에게 소개하기.`,postOutro:`전시 관람 매너를 잘 실천한 나를 칭찬하고 수료증을 받습니다.`,pptMission:`조용히 걷는 예절을 지키며 체험 전시물 3가지 완수하기`,worksheetBasic:`전시물 그림 카드 맞추기 및 조용히 걷기 스티커 붙이기`,worksheetApply:`전시물 스탬프 찍기 및 체험 느낌 이모티콘 고르기`,worksheetAdvanced:`내가 큐레이터가 되어 전시물 소개 글 3줄 작성하기`},"loc-transit":{preIntro:`지하철역과 버스터미널의 대중교통 이용 절차를 사진과 영상으로 배웁니다.`,preBody:`교통카드 잔액 확인, 개찰구 카드 태그 및 스크린도어 안전선 지키기 모의 훈련.`,preOutro:`목적지 노선 색깔과 환승역 안내 표지판을 시각 카드로 익힙니다.`,fieldIntro:`역사에 도착하여 유도 블록과 표지판을 보며 승강장으로 이동합니다.`,fieldBody:`교통카드를 태그하고 안전선 안에서 대기 후 질서 있게 승하차 실습하기.`,fieldOutro:`목적지 출구로 안전하게 나와 일행과 함께 다음 행선지를 확인합니다.`,postIntro:`오늘 이용한 교통수단과 승차권을 살펴보며 이동 경험을 되돌아봅니다.`,postBody:`대중교통 안전 수칙 실천 체크리스트를 완성하고 안전 배지 받기.`,postOutro:`혼자서도 안전하게 이동할 수 있다는 자신감을 나누며 일정을 마무리합니다.`,pptMission:`교통카드 스스로 찍고 차례 지켜 승하차하기`,worksheetBasic:`지하철/버스 픽토그램 선 긋기 및 신호등 색칠하기`,worksheetApply:`교통카드 태그 순서 번호 매기기 및 안전선 스티커 붙이기`,worksheetAdvanced:`지하철 노선도에서 출발역-도착역 경로 표시 및 요금 계산`},"loc-farm":{preIntro:`스마트팜과 농촌체험장에서 자라는 친환경 채소와 작물을 알아봅니다.`,preBody:`장갑과 모자 등 수확 복장을 준비하고 안전한 도구 사용법을 익힙니다.`,preOutro:`수확할 작물 사진 카드를 확인하고 바구니를 준비합니다.`,fieldIntro:`농장에 도착하여 농부 선생님의 설명을 듣고 수확 구역으로 이동합니다.`,fieldBody:`익은 열매를 손으로 조심스럽게 따서 바구니에 담고 무게를 재어보기.`,fieldOutro:`수확한 농작물을 상자에 정성스레 포장하고 손을 깨끗이 씻습니다.`,postIntro:`직접 수확해 온 신선한 농작물을 관찰하고 향기를 맡아봅니다.`,postBody:`가족과 친구들에게 선물할 나눔 라벨을 꾸미고 감사 편지 쓰기.`,postOutro:`농부의 노고와 생명의 소중함을 느끼며 오늘의 소감을 나눕니다.`,pptMission:`소중한 농작물 다치지 않게 조심스럽게 수확하기`,worksheetBasic:`채소/과일 실물 사진 스티커 붙이기 및 색칠하기`,worksheetApply:`수확한 열매 개수 세기 및 나눔 상자 이름표 꾸미기`,worksheetAdvanced:`식물의 성장 과정 순서 배열 및 친환경 식물 일기 작성`}};function S(e,t){if(x[e])return x[e];let n=t||`체험학습지`;return{preIntro:`우리가 방문할 ${n}의 시설 환경과 방문 목적을 알아봅니다.`,preBody:`${n}에서 지켜야 할 규칙을 확인하고 나만의 탐험 미션 계획서를 세웁니다.`,preOutro:`개인 준비물과 비상 연락망을 점검하며 안전한 출발을 준비합니다.`,fieldIntro:`${n}에 도착하여 안내 지도를 확인하고 배리어 프리 동선으로 이동합니다.`,fieldBody:`현장에서 계획한 탐험 미션을 친구들과 협력하며 스스로 완수하기.`,fieldOutro:`활동 결과를 정리하고 주변을 정돈한 후 집결지에 모입니다.`,postIntro:`${n}에서 촬영한 활동 사진을 감상하며 배움의 순간을 되짚어봅니다.`,postBody:`활동 결과물을 정리하고 서로의 노력과 성장을 칭찬하는 나눔 활동하기.`,postOutro:`나만의 체험학습 포트폴리오를 완성하고 스스로 해낸 자립심을 기릅니다.`,pptMission:`${n}에서 내 미션 당당하게 완수하기`,worksheetBasic:`${n} 관련 사진 스티커 붙이기 및 참 잘했어요 도장 찍기`,worksheetApply:`내가 참여한 활동 2가지 그림으로 표현하기 및 소감 고르기`,worksheetAdvanced:`${n} 탐험 보고서 작성 및 친구들과 성장 소감 발표하기`}}function C(e,t){switch(e){case 1:return t.schoolLevel?{valid:!0}:{valid:!1,message:`학교급을 선택해 주세요.`};case 2:return!t.locationName||!t.locationName.trim()?{valid:!1,message:`체험학습 장소를 입력하거나 선택해 주세요.`,targetId:`customLocationInput`}:{valid:!0};case 3:return!t.standards||t.standards.length===0?{valid:!1,message:`성취기준을 최소 1개 이상 등록해 주세요.`,targetId:`customStdInputField`}:{valid:!0};case 4:return!t.theme||!t.theme.trim()?{valid:!1,message:`체험학습 주제를 입력해 주세요.`,targetId:`themeInput`}:{valid:!0};case 5:{let e=parseInt(t.periodCount,10);return isNaN(e)||e<1||e>30?{valid:!1,message:`차시 수는 1차시에서 30차시 사이로 입력해 주세요.`,targetId:`periodCountInput`}:{valid:!0}}case 6:return t.evalFocusId?{valid:!0}:{valid:!1,message:`평가 중점을 선택해 주세요.`};case 7:return!t.goalKnowledge?.trim()||!t.goalSkill?.trim()||!t.goalAttitude?.trim()?{valid:!1,message:`3차원 학습 목표(지식·기능·태도)를 모두 입력해 주세요.`}:{valid:!0};default:return{valid:!0}}}function w(){try{let e=sessionStorage.getItem(_);if(!e)return;let t=JSON.parse(e);if(t&&typeof t==`object`&&(Number.isInteger(t.step)&&t.step>=1&&t.step<=11&&(b.step=t.step),t.plan&&typeof t.plan==`object`)){let e=t.plan;b.plan={...y,...e,standards:Array.isArray(e.standards)?e.standards.filter(e=>e&&typeof e==`object`&&e.code):y.standards,functionalNeeds:Array.isArray(e.functionalNeeds)?e.functionalNeeds:y.functionalNeeds,periodCount:Number.isInteger(e.periodCount)&&e.periodCount>=1&&e.periodCount<=30?e.periodCount:10,uploadedFileName:typeof e.uploadedFileName==`string`?e.uploadedFileName:``,uploadedFileMerged:!!e.uploadedFileMerged}}}catch(e){console.warn(`세션 복원 실패, 기본값으로 초기화합니다:`,e),b.step=1,b.plan=structuredClone(y)}}function T(){try{let e={...b.plan};sessionStorage.setItem(_,JSON.stringify({step:b.step,plan:e}))}catch(e){console.warn(`세션 저장 실패:`,e)}}function E(){(!b.plan.standards||b.plan.standards.length===0)&&(b.plan.standards=[{id:`std-default-1`,code:`[실생활-자립]`,title:`지역사회 참여 및 자립 생활`,subject:`공통`,desc:`지역사회 환경을 탐색하고 실생활 자립 기능 및 안전 수칙을 익혀 실천한다.`}])}typeof document<`u`&&document.addEventListener(`DOMContentLoaded`,()=>{w(),E(),P(b.step),D()});function D(){let e=document.getElementById(`prevStepBtn`),t=document.getElementById(`nextStepBtn`),n=document.getElementById(`resetWizardBtn`);e&&e.addEventListener(`click`,()=>{b.step>1&&k(b.step-1)}),t&&t.addEventListener(`click`,()=>{let e=C(b.step,b.plan);if(e.valid)b.step<11?k(b.step+1):O();else if($(e.message,`error`),e.targetId){let t=document.getElementById(e.targetId);t&&t.focus()}}),n&&n.addEventListener(`click`,()=>{O()});let r=document.getElementById(`cardInteractionBox`);r&&(r.addEventListener(`click`,A),r.addEventListener(`input`,j),r.addEventListener(`change`,M),r.addEventListener(`keydown`,N))}function O(){window.confirm(`작성 중인 모든 내용이 초기화됩니다. 처음부터 다시 설계하시겠습니까?`)&&(b.step=1,b.plan=structuredClone(y),b.uploadedTemplateBuffer=null,E(),T(),P(1),$(`1단계로 돌아왔습니다. 새로 설계를 시작합니다.`,`info`))}function k(e){b.step=Math.min(Math.max(e,1),11),T(),P(b.step),window.scrollTo({top:0,behavior:`smooth`}),setTimeout(()=>{let e=document.getElementById(`cardQuestionTitle`);e&&(e.setAttribute(`tabindex`,`-1`),e.focus())},100)}function A(e){let t=e.target.closest(`[data-action]`);if(!t)return;let n=t.getAttribute(`data-action`),r=t.getAttribute(`data-id`),i=t.getAttribute(`data-val`);switch(n){case`select-school-level`:if(b.plan.schoolLevel!==i){let e=b.plan.schoolLevel;b.plan.schoolLevel=i;let t=c(e),n=new Set(t.map(e=>e.code)),r=b.plan.standards.length;b.plan.standards=b.plan.standards.filter(e=>e.code.startsWith(`[직접`)||e.code===`[실생활-자립]`?!0:!n.has(e.code)),b.plan.standards.length===0&&E(),b.plan.standardsSearchKeyword=``,b.plan.standardsSubjectFilter=`전체`,b.standardsDisplayLimit=20,T(),P(1);let a=r-b.plan.standards.length;$(`'${i}' 교육과정으로 설정되었습니다.${a>0?` (이전 학교급 기준 ${a}건 정리)`:``}`,`info`)}break;case`select-location`:{b.plan.locationId=r,b.plan.locationName=i;let e=a[r];e&&e.length>0&&(b.plan.theme=e[0]),T(),P(2),$(`'${i}' 장소가 선택되었습니다.`,`info`);break}case`toggle-standard`:{let e=r,t=c(b.plan.schoolLevel),n=b.plan.standards.findIndex(t=>t.code===e);if(n>=0)b.plan.standards.splice(n,1),$(`성취기준 선택이 해제되었습니다.`,`info`);else{let n=t.find(t=>t.code===e)||{code:e,title:`선택 성취기준`,subject:`공통`,desc:e};b.plan.standards.push({...n,id:`std-pick-${Date.now()}-${Math.random().toString(36).slice(2,6)}`}),$(`성취기준이 추가되었습니다.`,`success`)}T(),P(3);break}case`add-custom-standard`:{let e=document.getElementById(`customStdInputField`),t=(e?e.value:b.plan.customStandardInput).trim();if(!t){$(`성취기준 내용을 입력해 주세요.`,`info`);return}let n=t.split(`
`).map(e=>e.trim()).filter(e=>e.length>0),r=0,i=0;for(let e of b.plan.standards){let t=e.code.match(/^\[직접-(\d+)\]$/);if(t){let e=parseInt(t[1],10);e>i&&(i=e)}}for(let e of n){let t=e.match(/^\[([^\]]+)\]\s*(.*)$/),n,a;t?(n=`[${t[1].trim()}]`,a=t[2].trim()||n):(i++,n=`[직접-${i}]`,a=e);let o=`std-custom-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;b.plan.standards.push({id:o,code:n,title:`직접 입력 성취기준`,subject:`직접입력`,desc:a}),r++}b.plan.customStandardInput=``,e&&(e.value=``),T(),P(3),$(`${r}건의 성취기준이 등록되었습니다.`,`success`);break}case`remove-standard`:{let e=r;b.plan.standards=b.plan.standards.filter(t=>t.id?t.id!==e:t.code!==e),T(),P(3),$(`성취기준이 삭제되었습니다.`,`info`);break}case`filter-standards-subject`:b.plan.standardsSubjectFilter=i,b.standardsDisplayLimit=20,P(3);break;case`load-more-standards`:b.standardsDisplayLimit+=20,R();break;case`select-theme`:b.plan.theme=i,T(),P(4),$(`수업 주제가 선택되었습니다.`,`info`);break;case`select-period-count`:{let e=parseInt(i,10);isNaN(e)||(b.plan.periodCount=e,T(),P(5));break}case`select-difficulty`:b.plan.difficultyLevel=i,T(),P(5),$(`수업 난이도가 설정되었습니다.`,`info`);break;case`select-eval-focus`:{let e=i;b.plan.evalFocusId=r,b.plan.evalFocusTitle=e;let t=b.plan.locationName||`체험 현장`;r===`eval-independence`?(b.plan.goalKnowledge=`${t}의 주요 시설 구조와 이용 절차를 이해한다.`,b.plan.goalSkill=`최소한의 촉진으로 스스로 필요한 활동을 선택하고 결제·이용을 독립적으로 완수한다.`,b.plan.goalAttitude=`스스로 해냈다는 자립 생활의 성취감과 주도적인 자신감을 갖는다.`):r===`eval-communication`?(b.plan.goalKnowledge=`${t}에서 상황에 맞는 인사말과 요구 표현을 이해한다.`,b.plan.goalSkill=`현장 직원이나 동료에게 AAC 도구 또는 구어로 원하는 것을 명확하게 전달한다.`,b.plan.goalAttitude=`상대방의 반응을 경청하고 감사하는 마음을 바른 태도로 표현한다.`):r===`eval-safety`?(b.plan.goalKnowledge=`${t}과 보행 환경에서 지켜야 할 안전 수칙 및 관람 에티켓을 안다.`,b.plan.goalSkill=`차례 지키기, 질서 유지, 표지판 확인 등의 안전 행동을 실천한다.`,b.plan.goalAttitude=`다른 시민을 배려하고 공공질서를 준수하려는 올바른 태도를 지닌다.`):(b.plan.goalKnowledge=`${t}에서 경험할 수 있는 다양한 문화와 활동을 탐색한다.`,b.plan.goalSkill=`자신의 흥미와 선호에 따라 적극적으로 활동에 참여하고 표현한다.`,b.plan.goalAttitude=`배움의 즐거움을 느끼고 친구들과 긍정적인 유대감을 나눈다.`),T(),P(6),$(`평가 중점이 '${e}'(으)로 설정되었습니다.`,`info`);break}case`add-functional-tag`:b.plan.functionalNeeds.includes(i)||(b.plan.functionalNeeds.push(i),T(),P(8),$(`지원 요구 사항이 추가되었습니다.`,`info`));break;case`select-teaching-method`:b.plan.teachingMethod=i,T(),P(9),$(`수업 방식이 '${i}'(으)로 설정되었습니다.`,`info`);break;case`download-hwpx`:Z();break;case`copy-curriculum`:ee();break;case`print-pdf`:te();break;case`reset-all`:O();break;case`trigger-file-upload`:{let e=document.getElementById(`schoolTemplateFileInput`);e&&e.click();break}}}function j(e){let t=e.target.getAttribute(`data-model`);if(!t)return;let n=e.target.value;switch(t){case`academicYear`:{let e=parseInt(n,10);!isNaN(e)&&e>2e3&&(b.plan.academicYear=e,T());break}case`locationName`:{b.plan.locationName=n;let e=i.find(e=>e.name.trim()===n.trim());e?b.plan.locationId=e.id:b.plan.locationId=`loc-custom`,T(),document.querySelectorAll(`.choice-bubble-card[data-action='select-location']`).forEach(e=>{let t=e.getAttribute(`data-id`);b.plan.locationId===t?(e.classList.add(`selected`),e.setAttribute(`aria-pressed`,`true`)):(e.classList.remove(`selected`),e.setAttribute(`aria-pressed`,`false`))});break}case`theme`:b.plan.theme=n,T();break;case`customStandardInput`:b.plan.customStandardInput=n;break;case`standardsSearchKeyword`:b.plan.standardsSearchKeyword=n,b.standardsDisplayLimit=20,R();break;case`periodCount`:{let e=parseInt(n,10);!isNaN(e)&&e>0&&(b.plan.periodCount=Math.min(Math.max(e,1),30),T(),U());break}case`goalKnowledge`:b.plan.goalKnowledge=n,T();break;case`goalSkill`:b.plan.goalSkill=n,T();break;case`goalAttitude`:b.plan.goalAttitude=n,T();break;case`functionalNeeds`:b.plan.functionalNeeds=n.split(`
`).filter(e=>e.trim().length>0),T()}}function M(e){if(e.target.id===`standardsSubjectSelect`)b.plan.standardsSubjectFilter=e.target.value,b.standardsDisplayLimit=20,P(3);else if(e.target.id===`schoolTemplateFileInput`){let t=e.target.files&&e.target.files[0];if(t){if(!t.name.toLowerCase().endsWith(`.hwpx`)){$(`학교 양식은 .hwpx 형식의 파일만 지원됩니다.`,`error`),e.target.value=``;return}let n=new FileReader;n.onload=e=>{b.uploadedTemplateBuffer=e.target.result,b.plan.uploadedFileName=t.name,b.plan.uploadedFileMerged=!0,T(),P(11),$(`'${t.name}' 서식이 등록되었습니다. 한글 기안 시 해당 서식에 실제 합성됩니다.`,`success`)},n.onerror=()=>{$(`파일을 읽는 중 오류가 발생했습니다.`,`error`)},n.readAsArrayBuffer(t)}}}function N(e){if(e.target.id===`customStdInputField`&&e.key===`Enter`&&!e.shiftKey){e.preventDefault();let t=document.querySelector(`[data-action='add-custom-standard']`);t&&t.click()}else if(e.key===`Enter`||e.key===` `){let t=e.target.closest(`.choice-bubble-card, .standard-pick-item, .rec-std-chip, .pill-option-btn, .template-upload-zone`);t&&t.hasAttribute(`data-action`)&&(e.preventDefault(),t.click())}}function P(e){let t=document.getElementById(`stepCounterText`),n=document.getElementById(`stepProgressFill`),r=document.getElementById(`stepProgressTrack`);t&&(t.textContent=`STEP ${String(e).padStart(2,`0`)} / 11`),n&&(n.style.width=`${e/11*100}%`),r&&r.setAttribute(`aria-valuenow`,String(e));let i=document.getElementById(`prevStepBtn`);document.getElementById(`nextStepBtn`);let a=document.getElementById(`nextStepBtnText`);i&&(i.style.visibility=e>1?`visible`:`hidden`),a&&(a.textContent=e===10?`공문서 기안 서식 확인하기 >`:e===11?`처음으로 (다시 설계) >`:`다음 단계 >`);let o=document.getElementById(`cardStepPill`),s=document.getElementById(`cardQuestionTitle`),c=document.getElementById(`cardQuestionSubtitle`),l=document.getElementById(`cardInteractionBox`);switch(e){case 1:F(o,s,c,l);break;case 2:I(o,s,c,l);break;case 3:L(o,s,c,l);break;case 4:z(o,s,c,l);break;case 5:V(o,s,c,l);break;case 6:W(o,s,c,l);break;case 7:G(o,s,c,l);break;case 8:K(o,s,c,l);break;case 9:q(o,s,c,l);break;case 10:J(o,s,c,l);break;case 11:Y(o,s,c,l)}}function F(e,t,n,i){e.textContent=`1단계: 학교급 선택`,t.textContent=`어느 학교급의 체험학습을 설계하시나요?`,n.textContent=`선택하신 학교급에 맞추어 국가 교육과정 성취기준 및 활동 양식을 연결합니다.`,i.innerHTML=`
    <div class="choice-grid-cards">
      ${r.map(e=>`
        <div class="choice-bubble-card ${b.plan.schoolLevel===e.name?`selected`:``}" 
             role="button" tabindex="0" aria-pressed="${b.plan.schoolLevel===e.name}"
             data-action="select-school-level" data-val="${g(e.name)}">
          <div class="choice-card-top">
            <span class="choice-card-badge">${g(e.badge)}</span>
          </div>
          <h2 class="choice-card-title">${g(e.name)}</h2>
          <p class="choice-card-desc">${g(e.desc)}</p>
        </div>
      `).join(``)}
    </div>
  `}function I(e,t,n,r){e.textContent=`2단계: 체험학습 장소`,t.textContent=`이번 체험학습은 어디로 떠나나요?`,n.textContent=`학생들과 함께 배움을 경험할 체험학습 장소를 입력하거나 추천 항목에서 선택해 주세요.`,r.innerHTML=`
    <!-- 장소 직접 입력 -->
    <div class="input-card-box" style="margin-bottom: 1.6rem;">
      <label for="customLocationInput" style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="label-badge">입력</span>
        체험학습 장소명
      </label>
      <input type="text" class="soft-text-input" id="customLocationInput" 
             placeholder="예: 서울숲 곤충식물원, 뚜레쥬르 베이커리 등 직접 입력" 
             value="${g(b.plan.locationName)}" 
             data-model="locationName"
             style="font-size: 1.1rem; padding: 0.95rem 1.2rem;">
      <p style="font-size: 0.82rem; color: #64748b; margin-top: 0.4rem; margin-bottom: 0;">
        * 장소명을 직접 입력하시거나 아래 추천 항목 중 원하는 장소를 클릭하여 선택하세요.
      </p>
    </div>

    <!-- 추천 항목 -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
        <span style="font-family: 'Jua', sans-serif; font-size: 1.1rem; color: var(--text-main);">
          자주 찾는 추천 장소 (클릭 시 자동 반영)
        </span>
        <span style="font-size: 0.8rem; color: #64748b;">
          6가지 주요 테마 공간
        </span>
      </div>
      <div class="choice-grid-cards">
        ${i.map(e=>`
          <div class="choice-bubble-card ${b.plan.locationId===e.id?`selected`:``}" 
               role="button" tabindex="0" aria-pressed="${b.plan.locationId===e.id}"
               data-action="select-location" data-id="${g(e.id)}" data-val="${g(e.name)}">
            <div class="choice-card-top">
              <span class="choice-card-badge">${g(e.icon)}</span>
            </div>
            <h2 class="choice-card-title">${g(e.name)}</h2>
            <p class="choice-card-desc">${g(e.desc)}</p>
          </div>
        `).join(``)}
      </div>
    </div>
  `}function L(e,t,n,r){e.textContent=`3단계: 성취기준 설정`,t.textContent=`체험학습에 반영할 성취기준을 넣어주세요`,n.textContent=`장소 맞춤 추천 성취기준을 확인하거나, 직접 입력 및 국가 교육과정 검색으로 등록할 수 있습니다.`;let i=c(b.plan.schoolLevel),a=b.plan.standards.map(e=>e.code),o=(b.plan.standardsSearchKeyword||``).trim().toLowerCase(),s=b.plan.standardsSubjectFilter||`전체`,u=l(b.plan.schoolLevel,b.plan.locationId),d=[`전체`,...[...new Set(i.map(e=>e.subject))].sort()],f=i.filter(e=>s!==`전체`&&e.subject!==s?!1:!o||e.code.toLowerCase().includes(o)||e.title.toLowerCase().includes(o)||e.desc.toLowerCase().includes(o)||e.subject.toLowerCase().includes(o)),p=f.slice(0,b.standardsDisplayLimit);r.innerHTML=`
    <div class="standards-picker-container">
      <!-- 1) 장소 맞춤 추천 성취기준 쉘프 (P1 #13) -->
      ${u.length>0?`
        <div class="recommended-standards-shelf">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: 'Jua', sans-serif; font-size: 1rem; color: #15803d; display: flex; align-items: center; gap: 0.4rem;">
              <span>💡</span> [${g(b.plan.locationName)}] 연계 추천 성취기준 (클릭하여 추가):
            </span>
            <span style="font-size: 0.78rem; color: #166534;">핵심 성취기준 6~8선</span>
          </div>
          <div class="recommended-standards-grid">
            ${u.map(e=>{let t=a.includes(e.code);return`
                <div class="rec-std-chip ${t?`selected`:``}" 
                     role="button" tabindex="0" aria-pressed="${t}"
                     data-action="toggle-standard" data-id="${g(e.code)}">
                  <div style="font-size: 0.8rem; font-weight: 800; color: #15803d;">${g(e.code)} (${g(e.subject)})</div>
                  <div style="font-size: 0.85rem; color: #1e293b; margin-top: 0.2rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${g(e.desc)}
                  </div>
                  <div style="text-align: right; margin-top: 0.3rem;">
                    <span style="font-size: 0.75rem; color: ${t?`#15803d`:`#64748b`}; font-weight: 700;">
                      ${t?`선택됨 ✓`:`+ 추가`}
                    </span>
                  </div>
                </div>
              `}).join(``)}
          </div>
        </div>
      `:``}

      <!-- 2) 성취기준 직접 입력 / 멀티라인 붙여넣기 (P0 #4) -->
      <div class="input-card-box">
        <label for="customStdInputField" style="font-size: 1rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.6rem;">
          <span style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="label-badge">직접 입력</span>
            성취기준 넣기
          </span>
          <span style="font-size: 0.8rem; color: #64748b; font-weight: 500;">
            Enter 단독: 등록 / Shift+Enter: 줄바꿈
          </span>
        </label>
        <div style="display: flex; gap: 0.6rem; align-items: stretch; flex-wrap: wrap;">
          <textarea class="soft-text-input" id="customStdInputField" style="flex: 1; min-width: 250px; min-height: 52px; resize: vertical;"
                    placeholder="예: [2국01-01] 알맞은 인사말을 주고받는다&#10;여러 줄을 동시에 복사하여 붙여넣을 수도 있습니다." 
                    data-model="customStandardInput">${g(b.plan.customStandardInput)}</textarea>
          <button type="button" class="btn-soft-primary" style="padding: 0.85rem 1.4rem; white-space: nowrap; font-size: 0.95rem; border-radius: 12px; align-self: flex-start;" data-action="add-custom-standard">
            성취기준 등록 (+)
          </button>
        </div>
        <p style="font-size: 0.82rem; color: #64748b; margin-top: 0.5rem; margin-bottom: 0;">
          * 코드가 없는 문장은 [직접-1], [직접-2] 형식으로 번호가 순차 부여되며, 중복 코드 충돌 없이 안전하게 관리됩니다.
        </p>
      </div>

      <!-- 3) 현재 등록된 성취기준 목록 -->
      <div class="std-current-box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
          <span style="font-weight: 800; font-size: 0.98rem; color: #0f172a; display: flex; align-items: center; gap: 0.4rem;">
            <span style="display: inline-block; width: 8px; height: 8px; background: #10b981; border-radius: 50%;"></span>
            현재 등록된 성취기준 (${b.plan.standards.length}개):
          </span>
          <span style="font-size: 0.78rem; color: #64748b;">(최소 1개 이상 등록 필요)</span>
        </div>
        
        ${b.plan.standards.length===0?`
          <div class="empty-state-box">
            등록된 성취기준이 없습니다. 상단에서 성취기준을 입력하거나 아래 추천/교육과정 목록에서 추가해 주세요.
          </div>
        `:`
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${b.plan.standards.map(e=>`
              <div class="std-current-item">
                <div style="display: flex; align-items: baseline; gap: 0.6rem; flex: 1; flex-wrap: wrap;">
                  <span class="std-code-badge">${g(e.code)}</span>
                  <span style="font-weight: 700; font-size: 0.92rem; color: #0f172a;">${g(e.title||e.subject||`성취기준`)}</span>
                  <span style="font-size: 0.88rem; color: #475569; word-break: keep-all;">${g(e.desc)}</span>
                </div>
                <button type="button" class="btn-bubble-tool" style="padding: 0.3rem 0.7rem; font-size: 0.8rem; color: #e11d48; border-color: #fecdd3; background: #fff1f2;" 
                        data-action="remove-standard" data-id="${g(e.id||e.code)}" title="성취기준 삭제">삭제 ×</button>
              </div>
            `).join(``)}
          </div>
        `}
      </div>

      <!-- 4) 국가 교육과정 성취기준 검색 및 전체 과목 선택 (P0 #6) -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; padding: 1.2rem; border-radius: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.4rem;">
          <div>
            <span style="font-family: 'Jua', sans-serif; font-size: 1.05rem; color: var(--text-main);">
              국가 교육과정 성취기준 목록에서 찾기
            </span>
            <span style="font-size: 0.8rem; color: #64748b; margin-left: 0.5rem;">
              ${g(b.plan.schoolLevel)} 교육과정 (${i.length}개 기준)
            </span>
          </div>
          <span id="standardsCurriculumCount" style="font-size: 0.82rem; color: #64748b; font-weight: 600;">
            전체 ${f.length}건 중 ${p.length}건 표시
          </span>
        </div>

        <!-- 검색창 및 전체 과목 드롭다운 (51개 전 과목 접근 가능) -->
        <div style="display: flex; gap: 0.6rem; margin-bottom: 0.8rem; flex-wrap: wrap; align-items: center;">
          <input type="text" class="soft-text-input" id="standardsSearchField" style="flex: 1; min-width: 220px; padding: 0.75rem 1rem; font-size: 0.95rem;"
                 placeholder="성취기준 코드 또는 검색어 입력 (예: 구매, 인사, 안전, 화폐 등)" 
                 value="${g(b.plan.standardsSearchKeyword)}" 
                 data-model="standardsSearchKeyword">
          
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <label for="standardsSubjectSelect" style="font-size: 0.85rem; font-weight: 700; color: #475569; white-space: nowrap;">과목 필터:</label>
            <select id="standardsSubjectSelect" class="standards-subject-select">
              ${d.map(e=>`
                <option value="${g(e)}" ${s===e?`selected`:``}>
                  ${g(e)}
                </option>
              `).join(``)}
            </select>
          </div>
        </div>

        <!-- 주요 과목 빠른 필터 칩 (처음 8개) -->
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.9rem;">
          ${d.slice(0,8).map(e=>`
            <button type="button" class="pill-option-btn ${s===e?`selected`:``}" 
                    style="padding: 0.25rem 0.75rem; font-size: 0.8rem;"
                    data-action="filter-standards-subject" data-val="${g(e)}">
              ${g(e)}
            </button>
          `).join(``)}
        </div>

        <!-- 성취기준 카드 리스트 -->
        <div class="standards-bubble-list" id="standardsCurriculumList">
          ${p.length===0?`
            <div class="empty-state-box">
              일치하는 성취기준이 없습니다. 상단 '성취기준 넣기'를 통해 직접 등록하실 수 있습니다.
            </div>
          `:p.map(e=>{let t=a.includes(e.code);return`
              <div class="standard-pick-item ${t?`selected`:``}" 
                   role="button" tabindex="0" aria-pressed="${t}"
                   data-action="toggle-standard" data-id="${g(e.code)}">
                <div style="display: flex; flex-direction: column; gap: 0.35rem; flex: 1; text-align: left;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <span class="std-code-badge">${g(e.code)}</span>
                    <span style="font-size: 0.78rem; background: #f1f5f9; color: #0f172a; padding: 0.15rem 0.6rem; border-radius: 9999px; font-weight: 700; border: 1px solid #e2e8f0;">${g(e.subject)}</span>
                    <span style="font-weight: 800; font-size: 0.96rem; color: #0f172a;">${g(e.title)}</span>
                  </div>
                  <div style="font-size: 0.92rem; color: #334155; line-height: 1.55; word-break: keep-all;">${g(e.desc)}</div>
                </div>
                <div style="margin-left: 0.8rem;">
                  <span style="font-family: 'Jua', sans-serif; font-size: 0.92rem; color: ${t?`#0f172a`:`#64748b`}; padding: 0.35rem 0.85rem; border-radius: 9999px; background: ${t?`#e2e8f0`:`#f8fafc`}; border: 1px solid ${t?`#cbd5e1`:`#e2e8f0`};">
                    ${t?`선택됨 ✓`:`+ 추가`}
                  </span>
                </div>
              </div>
            `}).join(``)}
        </div>

        <!-- 더 보기 버튼 (P0 #6) -->
        ${f.length>p.length?`
          <button type="button" class="btn-load-more" data-action="load-more-standards">
            성취기준 더 보기 (+20건) — 남은 기준: ${f.length-p.length}건
          </button>
        `:``}
      </div>
    </div>
  `}function R(){let e=document.getElementById(`standardsCurriculumList`),t=document.getElementById(`standardsCurriculumCount`);if(!e)return;let n=c(b.plan.schoolLevel),r=b.plan.standards.map(e=>e.code),i=(b.plan.standardsSearchKeyword||``).trim().toLowerCase(),a=b.plan.standardsSubjectFilter||`전체`,o=n.filter(e=>a!==`전체`&&e.subject!==a?!1:!i||e.code.toLowerCase().includes(i)||e.title.toLowerCase().includes(i)||e.desc.toLowerCase().includes(i)||e.subject.toLowerCase().includes(i)),s=o.slice(0,b.standardsDisplayLimit);if(t&&(t.textContent=`전체 ${o.length}건 중 ${s.length}건 표시`),s.length===0){e.innerHTML=`
      <div class="empty-state-box">
        일치하는 성취기준이 없습니다. 상단 '성취기준 넣기'를 통해 직접 등록하실 수 있습니다.
      </div>
    `;return}e.innerHTML=s.map(e=>{let t=r.includes(e.code);return`
      <div class="standard-pick-item ${t?`selected`:``}" 
           role="button" tabindex="0" aria-pressed="${t}"
           data-action="toggle-standard" data-id="${g(e.code)}">
        <div style="display: flex; flex-direction: column; gap: 0.35rem; flex: 1; text-align: left;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span class="std-code-badge">${g(e.code)}</span>
            <span style="font-size: 0.78rem; background: #f1f5f9; color: #0f172a; padding: 0.15rem 0.6rem; border-radius: 9999px; font-weight: 700; border: 1px solid #e2e8f0;">${g(e.subject)}</span>
            <span style="font-weight: 800; font-size: 0.96rem; color: #0f172a;">${g(e.title)}</span>
          </div>
          <div style="font-size: 0.92rem; color: #334155; line-height: 1.55; word-break: keep-all;">${g(e.desc)}</div>
        </div>
        <div style="margin-left: 0.8rem;">
          <span style="font-family: 'Jua', sans-serif; font-size: 0.92rem; color: ${t?`#0f172a`:`#64748b`}; padding: 0.35rem 0.85rem; border-radius: 9999px; background: ${t?`#e2e8f0`:`#f8fafc`}; border: 1px solid ${t?`#cbd5e1`:`#e2e8f0`};">
            ${t?`선택됨 ✓`:`+ 추가`}
          </span>
        </div>
      </div>
    `}).join(``);let l=e.parentElement.querySelector(`.btn-load-more`);o.length>s.length?(l||(l=document.createElement(`button`),l.type=`button`,l.className=`btn-load-more`,l.setAttribute(`data-action`,`load-more-standards`),e.parentElement.appendChild(l)),l.textContent=`성취기준 더 보기 (+20건) — 남은 기준: ${o.length-s.length}건`):l&&l.remove()}function z(e,t,n,r){e.textContent=`4단계: 체험학습 주제`,t.textContent=`어떤 배움의 주제로 프로젝트를 열어갈까요?`,n.textContent=`선택하신 장소와 성취기준을 연결한 추천 주제입니다. 마음에 드는 주제를 고르거나 직접 다듬어 주세요.`,r.innerHTML=`
    <div class="choice-grid-cards" style="grid-template-columns: 1fr;">
      ${(a[b.plan.locationId]||[`스스로 탐색하고 실천하는 우리 마을 배움 여행`,`공공장소 에티켓과 자립 기능을 기르는 현장 체험`,`친구와 함께 협력하여 미션을 완수하는 배움 원정대`]).map((e,t)=>`
        <div class="choice-bubble-card ${b.plan.theme===e?`selected`:``}" 
             role="button" tabindex="0" aria-pressed="${b.plan.theme===e}"
             data-action="select-theme" data-val="${g(e)}">
          <div class="choice-card-top">
            <span class="choice-card-badge">추천 주제 0${t+1}</span>
          </div>
          <h2 class="choice-card-title">${g(e)}</h2>
          <p class="choice-card-desc">실생활 맥락 중심의 학생 주도형 ${g(b.plan.schoolLevel)} 체험 프로젝트</p>
        </div>
      `).join(``)}
    </div>
    <div class="soft-input-group">
      <label for="themeInput" style="font-size: 0.92rem; font-weight: 700; color: var(--text-muted);">주제 직접 수정하기:</label>
      <input type="text" class="soft-text-input" id="themeInput"
             value="${g(b.plan.theme)}" 
             data-model="theme">
    </div>
  `}function B(e){let t=Math.max(1,parseInt(e,10)||10);if(t===1)return{pre:0,field:1,post:0,total:1};if(t===2)return{pre:1,field:1,post:0,total:2};if(t===3)return{pre:1,field:1,post:1,total:3};let n=Math.round(t*.4),r=Math.round(t*.2),i=t-n-r;for(r<1&&(r=1),n<1&&(n=1),i<1&&(i=1);n+r+i>t;)n>i&&n>r?n--:i>n&&i>r?i--:n>=i?n--:i--;for(;n+r+i<t;)n<=i?n++:i++;return{pre:n,field:r,post:i,total:t}}function V(e,t,n,r){e.textContent=`5단계: 차시 수 및 수업 난이도`,t.textContent=`몇 차시 수업으로 계획하고, 난이도는 어떻게 할까요?`,n.textContent=`사전:현장:사후 4:2:4 비율을 기반으로 최적화된 로드맵을 설계합니다.`,r.innerHTML=`
    <div class="dual-selector-row">
      <!-- 차시 수 직접 입력 및 4:2:4 비율 시각화 영역 -->
      <div class="selector-sub-box">
        <h3 class="sub-box-title">수업 운영 차시 수 (직접 입력 / 빠른 선택):</h3>
        <div style="display: flex; align-items: center; gap: 0.8rem; margin-top: 0.4rem;">
          <input type="number" min="1" max="30" class="soft-text-input" id="periodCountInput"
                 style="width: 110px; font-size: 1.4rem; font-family: 'Jua', sans-serif; text-align: center; padding: 0.6rem;" 
                 value="${g(b.plan.periodCount)}" 
                 data-model="periodCount">
          <span style="font-family: 'Jua', sans-serif; font-size: 1.3rem; color: var(--primary-accent);">차시</span>
        </div>

        <div style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.5rem;">
          자주 사용하는 차시 빠른 선택:
        </div>
        <div class="pill-option-group">
          ${[{count:10,label:`10차시 (추천 4:2:4)`},{count:5,label:`5차시 (압축 4:2:4)`},{count:8,label:`8차시`},{count:3,label:`3차시 (기본)`}].map(e=>`
            <button type="button" class="pill-option-btn ${b.plan.periodCount===e.count?`selected`:``}" 
                    aria-pressed="${b.plan.periodCount===e.count}"
                    data-action="select-period-count" data-val="${e.count}">
              ${g(e.label)}
            </button>
          `).join(``)}
        </div>

        <!-- 4:2:4 비율 시각적 배너 -->
        <div id="ratioBannerContainer">
          ${H(b.plan.periodCount)}
        </div>
      </div>

      <!-- 난이도 선택 영역 -->
      <div class="selector-sub-box">
        <h3 class="sub-box-title">수업 수준 (난이도 및 촉진 지원):</h3>
        <div style="display: flex; flex-direction: column; gap: 0.65rem;">
          ${[{title:`기초/탐색 수준`,desc:`상당한 도움 및 1:1 신체적·언어적 촉진 제공`},{title:`기본/적용 수준`,desc:`시각적 단서 및 단계적 모델링을 통한 협력 수행`},{title:`심화/자립 수준`,desc:`최소한의 안내로 스스로 판단하고 독립적으로 완수`}].map(e=>{let t=b.plan.difficultyLevel.includes(e.title);return`
              <div class="choice-bubble-card ${t?`selected`:``}" 
                   role="button" tabindex="0" aria-pressed="${t}"
                   style="padding: 0.95rem 1.1rem;" 
                   data-action="select-difficulty" data-val="${g(`${e.title} (${e.desc})`)}">
                <span style="font-family: 'Jua', sans-serif; font-size: 1.1rem; color: var(--text-main);">${g(e.title)}</span>
                <span style="font-size: 0.84rem; color: var(--text-muted);">${g(e.desc)}</span>
              </div>
            `}).join(``)}
        </div>
      </div>
    </div>
  `}function H(e){let t=B(e),n=t.total,r=Math.round(t.pre/n*100),i=Math.round(t.field/n*100),a=100-r-i;return`
    <div class="ratio-banner-box" style="margin-top: 0.8rem;">
      <div style="font-family: 'Jua', sans-serif; font-size: 0.96rem; color: var(--text-main); display: flex; justify-content: space-between;">
        <span>🎯 차시 배분 비율: 사전 4 : 현장 2 : 사후 4</span>
        <span style="color: var(--primary-accent); font-weight: 800;">총 ${n}차시</span>
      </div>
      <div class="ratio-bar-wrapper">
        <div class="ratio-bar-segment pre" style="width: ${r}%;"></div>
        <div class="ratio-bar-segment field" style="width: ${i}%;"></div>
        <div class="ratio-bar-segment post" style="width: ${a}%;"></div>
      </div>
      <div class="ratio-legend-row">
        <span style="color: #be123c;">🌸 사전 ${t.pre}차시 (${r}%)</span>
        <span style="color: #0369a1;">🚌 현장 ${t.field}차시 (${i}%)</span>
        <span style="color: #15803d;">🌱 사후 ${t.post}차시 (${a}%)</span>
      </div>
    </div>
  `}function U(){let e=document.getElementById(`ratioBannerContainer`);e&&(e.innerHTML=H(b.plan.periodCount))}function W(e,t,n,r){e.textContent=`6단계: 평가 중점 선택`,t.textContent=`이번 체험학습에서 가장 중요하게 평가할 영역은 무엇인가요?`,n.textContent=`핵심 성취기준 및 학생 특성과 연결된 핵심 평가 관점을 선택해 주세요.`,r.innerHTML=`
    <div class="choice-grid-cards">
      ${o.map(e=>`
        <div class="choice-bubble-card ${b.plan.evalFocusId===e.id?`selected`:``}" 
             role="button" tabindex="0" aria-pressed="${b.plan.evalFocusId===e.id}"
             data-action="select-eval-focus" data-id="${g(e.id)}" data-val="${g(e.title)}">
          <div class="choice-card-top">
            <span class="choice-card-badge">평가 관점</span>
          </div>
          <h2 class="choice-card-title">${g(e.title)}</h2>
          <p class="choice-card-desc">${g(e.desc)}</p>
        </div>
      `).join(``)}
    </div>
  `}function G(e,t,n,r){e.textContent=`7단계: 체험학습 목표 설정`,t.textContent=`설정한 평가 중점에 맞춘 3차원 학습 목표입니다.`,n.textContent=`지식·기능·태도 측면에서 학생들이 도달할 구체적인 수업 목표를 확인하고 필요시 다듬어 주세요.`,r.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="choice-bubble-card selected" style="cursor: default;">
        <label for="goalKnowledgeInput" style="font-family: 'Jua', sans-serif; font-size: 0.95rem; color: var(--primary-accent); display: block; margin-bottom: 0.3rem;">[지식·이해 목표]</label>
        <input type="text" class="soft-text-input" id="goalKnowledgeInput" style="padding: 0.75rem 1rem; font-size: 1rem;" 
               value="${g(b.plan.goalKnowledge)}" 
               data-model="goalKnowledge">
      </div>

      <div class="choice-bubble-card selected" style="cursor: default;">
        <label for="goalSkillInput" style="font-family: 'Jua', sans-serif; font-size: 0.95rem; color: #10b981; display: block; margin-bottom: 0.3rem;">[기능·수행 목표]</label>
        <input type="text" class="soft-text-input" id="goalSkillInput" style="padding: 0.75rem 1rem; font-size: 1rem;" 
               value="${g(b.plan.goalSkill)}" 
               data-model="goalSkill">
      </div>

      <div class="choice-bubble-card selected" style="cursor: default;">
        <label for="goalAttitudeInput" style="font-family: 'Jua', sans-serif; font-size: 0.95rem; color: #a855f7; display: block; margin-bottom: 0.3rem;">[가치·태도 목표]</label>
        <input type="text" class="soft-text-input" id="goalAttitudeInput" style="padding: 0.75rem 1rem; font-size: 1rem;" 
               value="${g(b.plan.goalAttitude)}" 
               data-model="goalAttitude">
      </div>
    </div>
  `}function K(e,t,n,r){e.textContent=`8단계: 장애특성 및 맞춤 지원`,t.textContent=`현장에서 특별히 고려해야 할 장애특성이 있나요?`,n.textContent=`이동 지원(휠체어), 감각 조절, 의사소통 보조 등 안전하고 편안한 배움을 위해 필요한 지원을 적어주세요.`,r.innerHTML=`
    <div class="privacy-notice-bubble">
      <span class="privacy-notice-badge">개인정보 주의</span>
      <span>
        <strong>개인식별정보 입력 절대 금지:</strong> 학생 실명, 전화번호, 주민등록번호는 절대 입력하지 마세요! 
        (예: "휠체어 이동 지원 1명", "시각적 일과표 2명", "소음 민감성 1명" 형태로만 기재)
      </span>
    </div>

    <div style="font-family: 'Jua', sans-serif; font-size: 1rem; color: var(--text-main); margin-bottom: 0.5rem;">
      자주 활용되는 기능적 지원 요구 태그 (클릭 시 추가):
    </div>
    <div class="pill-option-group" style="margin-bottom: 1rem;">
      <button type="button" class="pill-option-btn" data-action="add-functional-tag" data-val="휠체어 이동 지원 1명 (무단차 경사로 필요)">+ 휠체어 이동 지원</button>
      <button type="button" class="pill-option-btn" data-action="add-functional-tag" data-val="시각적 단계별 일과표 및 사진 단서 필요 2명">+ 시각적 일과표</button>
      <button type="button" class="pill-option-btn" data-action="add-functional-tag" data-val="AAC 그림 상징판 및 스마트 보완의사소통 지원 1명">+ AAC 의사소통</button>
      <button type="button" class="pill-option-btn" data-action="add-functional-tag" data-val="소음 민감성 대비 저소음 휴식 쉼터 동선 1명">+ 소음 감각 조절</button>
      <button type="button" class="pill-option-btn" data-action="add-functional-tag" data-val="돌발 이탈 예방 1:1 보조인력 밀착 동행 1명">+ 1:1 안전 동행</button>
    </div>

    <div class="soft-input-group">
      <label for="functionalNeedsArea" style="font-size: 0.92rem; font-weight: 700; color: var(--text-muted);">현재 등록된 맞춤 지원 사항:</label>
      <textarea class="soft-text-input" id="functionalNeedsArea" rows="4" style="line-height: 1.5; resize: none;" 
                data-model="functionalNeeds">${g(b.plan.functionalNeeds.join(`
`))}</textarea>
    </div>
  `}function q(e,t,n,r){e.textContent=`9단계: 수업 방식 확인`,t.textContent=`어떤 수업 방식으로 배움을 이끌어갈까요?`,n.textContent=`프로젝트 학습, 협력학습, 질문식 수업, 직접 시연 수업 중 이번 체험학습의 주요 방식을 선택해 주세요.`,r.innerHTML=`
    <div class="choice-grid-cards">
      ${s.map(e=>`
        <div class="choice-bubble-card ${b.plan.teachingMethod.includes(e.name)?`selected`:``}" 
             role="button" tabindex="0" aria-pressed="${b.plan.teachingMethod.includes(e.name)}"
             data-action="select-teaching-method" data-val="${g(e.name)}">
          <div class="choice-card-top">
            <span class="choice-card-badge">${g(e.badge)}</span>
          </div>
          <h2 class="choice-card-title">${g(e.name)}</h2>
          <p class="choice-card-desc">${g(e.desc)}</p>
        </div>
      `).join(``)}
    </div>
  `}function J(e,t,n,r){e.textContent=`10단계: UDL 최종 교육과정 결과물`,t.textContent=`설계하신 특수교육 현장체험학습 교육과정안입니다.`,n.textContent=`각 차시별 연계 성취기준과 세부 활동을 확인하고, 한글(HWPX) 또는 PDF 파일로 다운로드하세요.`;let i=b.plan,a=X(i),o=m(i,a),s=S(i.locationId,i.locationName);r.innerHTML=`
    <div class="export-action-shelf">
      <button type="button" class="btn-bubble-tool" data-action="copy-curriculum">내용 전체 복사</button>
      <button type="button" class="btn-bubble-tool" style="background: #ffe4e6; color: #e11d48;" data-action="download-hwpx">
        한글(HWPX) 다운로드
      </button>
      <button type="button" class="btn-soft-primary" style="padding: 0.5rem 1.2rem; font-size: 0.88rem;" data-action="print-pdf">
        PDF 인쇄 / 저장
      </button>
    </div>

    <div class="udl-result-scroller" id="udlPrintArea">
      <!-- 1) 프로젝트 개요 -->
      <div class="result-section-box">
        <h2 class="result-section-title">1. 프로젝트 개요</h2>
        <table class="result-table">
          <tbody>
            <tr>
              <th style="width: 25%;">프로젝트명</th>
              <td><strong>${g(o.theme)}</strong></td>
            </tr>
            <tr>
              <th>학교급 및 장소</th>
              <td><strong>${g(o.schoolLevel)}</strong> | ${g(o.locationName)} (총 ${o.periodCount}차시 [사전·현장·사후 4:2:4 비율] / ${g(o.difficultyLevel)})</td>
            </tr>
            <tr>
              <th>수업 방식 및 평가</th>
              <td>${g(o.teachingMethod)} | ${g(i.evalFocusTitle)}</td>
            </tr>
            <tr>
              <th>핵심 질문 (Essential Question)</th>
              <td>"우리 마을 ${g(o.locationName)}에서 나에게 필요한 것을 스스로 찾고 안전하게 참여하려면 어떻게 해야 할까?"</td>
            </tr>
            <tr>
              <th>연계 핵심 성취기준</th>
              <td>${(i.standards||[]).map(e=>`<strong>${g(e.code)}</strong> ${g(e.title||e.subject||``)}`).join(`, `)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 2) 차시별 수업 계획 (전체 로드맵 표) -->
      <div class="result-section-box">
        <h2 class="result-section-title">2. 차시별 수업 계획 (전체 로드맵 - 사전:현장:사후 4:2:4 비율)</h2>
        ${H(i.periodCount)}
        <table class="result-table">
          <thead>
            <tr>
              <th style="width: 12%;">구분/차시</th>
              <th style="width: 25%;">차시 주제</th>
              <th style="width: 20%;">연계 성취기준</th>
              <th style="width: 28%;">주요 교수·학습 활동 내용</th>
              <th style="width: 15%;">UDL 맞춤 평가</th>
            </tr>
          </thead>
          <tbody>
            ${a.map(e=>`
              <tr>
                <td style="text-align: center; font-weight: 800; font-family: 'Jua', sans-serif;">
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.3rem;">
                    <span class="phase-tag ${g(e.phase)}">${g(e.phaseBadge)}</span>
                    <span style="font-size: 1.05rem;">${e.num}차시</span>
                  </div>
                </td>
                <td><strong>${g(e.title)}</strong></td>
                <td>
                  ${e.standardsCodes.map(e=>`<span class="linked-std-pill">${g(e)}</span>`).join(` `)}
                </td>
                <td>${g(e.summary)}</td>
                <td>${g(e.eval)}</td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>

      <!-- 3) 차시별 세부 수업 계획안 -->
      <div class="result-section-box">
        <h2 class="result-section-title">3. 차시별 세부 수업 계획안 (도입-전개-정리 및 발문 예시)</h2>
        ${a.map(e=>{let t={pre:{bg:`#fff8f8`,border:`#fecdd3`,color:`#e11d48`},field:{bg:`#f0f9ff`,border:`#bae6fd`,color:`#0284c7`},post:{bg:`#f0fdf4`,border:`#bbf7d0`,color:`#16a34a`}},n=t[e.phase]||t.pre;return`
          <div style="background: ${n.bg}; border: 2px solid ${n.border}; border-radius: 16px; padding: 1.3rem; margin-bottom: 0.9rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
              <span style="font-family: 'Jua', sans-serif; font-size: 1.25rem; color: ${n.color}; display: flex; align-items: center; gap: 0.5rem;">
                <span class="phase-tag ${g(e.phase)}">${g(e.phaseBadge)}</span>
                <span>${e.num}차시: ${g(e.title)}</span>
              </span>
              <div>
                ${e.standardsCodes.map(e=>`<span class="linked-std-pill">${g(e)}</span>`).join(` `)}
              </div>
            </div>
            <div style="font-size: 0.92rem; line-height: 1.6; color: var(--text-main);">
              <p><strong>[도입]</strong> ${g(e.intro)}</p>
              <p style="margin-top: 0.35rem;"><strong>[전개]</strong> ${g(e.body)}</p>
              <p style="margin-top: 0.35rem;"><strong>[정리]</strong> ${g(e.outro)}</p>
              <p style="margin-top: 0.55rem; color: #0284c7;"><strong>교사 발문 예시:</strong> "${g(e.questionExample)}"</p>
              <p style="margin-top: 0.35rem; color: #16a34a;"><strong>교사 지원 및 맞춤형 피드백 팁:</strong> ${g(e.feedbackTip)}</p>
            </div>
          </div>
        `}).join(``)}
      </div>

      <!-- 4) 교수·학습 자료 제작 지원 -->
      <div class="result-section-box">
        <h2 class="result-section-title">4. 교수·학습 자료 제작 지원 (PPT 슬라이드 및 활동지)</h2>
        <div style="font-family: 'Jua', sans-serif; font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-main);">
          가. 차시별 PPT 슬라이드 구성안:
        </div>
        <div class="ppt-slides-grid">
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 01</div>
            <div class="ppt-slide-title">오늘의 탐험 떠나기</div>
            <ul class="ppt-slide-bullets">
              <li>${g(o.locationName)} 실물 사진 및 영상</li>
              <li>${g(s.pptMission)}</li>
            </ul>
          </div>
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 02</div>
            <div class="ppt-slide-title">시각적 일과표 순서</div>
            <ul class="ppt-slide-bullets">
              <li>이동하기 → 목표 활동 → 정리 및 소감</li>
              <li>단계별 사진 픽토그램 안내</li>
            </ul>
          </div>
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 03</div>
            <div class="ppt-slide-title">약속해요! 안전 규칙</div>
            <ul class="ppt-slide-bullets">
              <li>선생님 시야 안에서 이동하기</li>
              <li>차례대로 줄 서서 기다리기</li>
            </ul>
          </div>
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 04</div>
            <div class="ppt-slide-title">나의 미션 성공 확인</div>
            <ul class="ppt-slide-bullets">
              <li>미션 완료 확인 도장 팡팡</li>
              <li>오늘의 기분 사진 카드 고르기</li>
            </ul>
          </div>
        </div>

        <div style="font-family: 'Jua', sans-serif; font-size: 1.1rem; margin: 1.3rem 0 0.5rem 0; color: var(--text-main);">
          나. 학생용 맞춤 활동지/워크시트 제안:
        </div>
        <div style="background: #f1f5f9; padding: 1.1rem; border-radius: 14px; font-size: 0.92rem; line-height: 1.65;">
          <p>- <strong>기초 수준 워크시트:</strong> ${g(s.worksheetBasic)}</p>
          <p>- <strong>적용 수준 워크시트:</strong> ${g(s.worksheetApply)}</p>
          <p>- <strong>심화 수준 워크시트:</strong> ${g(s.worksheetAdvanced)}</p>
        </div>
      </div>
    </div>
  `}function Y(e,t,n,r){e.textContent=`11단계: 공문서 기안 서식 반영`,t.textContent=`공문서 기안 서식에 설계 내용이 완벽히 반영되었습니다.`,n.textContent=`표준 공문서 양식(.hwpx)에 UDL 교육과정이 자동 합성됩니다. 학교 전용 서식(.hwpx)을 등록하여 그대로 활용할 수도 있습니다.`;let i=b.plan,a=m(i,X(i)),o=!!(b.uploadedTemplateBuffer&&i.uploadedFileName);r.innerHTML=`
    <!-- 업로드 드롭존 (버블링 간섭 없는 단독 카드) -->
    <div class="template-upload-zone" id="templateUploadZone" role="button" tabindex="0" data-action="trigger-file-upload">
      <div class="upload-icon-bubble">HWP</div>
      <div class="upload-title">${o?`학교 서식 등록됨: ${g(i.uploadedFileName)}`:`학교 고유 계획서 양식 추가 등록 (.hwpx)`}</div>
      <div class="upload-desc">
        ${o?`선택하신 학교 고유 .hwpx 서식에 UDL 설계 데이터가 실제 합성됩니다. 클릭하여 다른 서식으로 변경할 수 있습니다.`:`클릭하여 학교 전용 .hwpx 서식을 선택하면 해당 양식에 본문 내용이 직접 주입되어 기안문으로 다운로드됩니다. (미등록 시 교육부 표준 기안 서식 자동 적용)`}
      </div>
    </div>
    <!-- 파일 input은 버블링 간섭 방지를 위해 영역 외부에 단독 배치 -->
    <input type="file" id="schoolTemplateFileInput" style="display: none;" accept=".hwpx">

    <!-- 양식 자동 반영 미리보기 카드 -->
    <div class="merged-plan-card">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-family: 'Jua', sans-serif; font-size: 1.25rem; color: #065f46;">
          [기안 준비 완료] ${g(o?i.uploadedFileName:`교육부 표준 현장체험학습 기안양식.hwpx`)}
        </span>
        <span style="background: ${o?`#dcfce7`:`#d1fae5`}; color: #065f46; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 20px;">
          ${o?`학교 고유 서식 실제 합성 모드`:`표준 기안 서식 자동 합성 모드`}
        </span>
      </div>
      <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.65; background: #f0fdf4; padding: 1.15rem; border-radius: 12px;">
        <p><strong>수신:</strong> 내부결재 | <strong>제목:</strong> ${g(a.docTitle)}</p>
        <p><strong>1. 목적 및 주제:</strong> ${g(a.theme)} (${g(a.teachingMethod)})</p>
        <p><strong>2. 체험 장소:</strong> ${g(a.locationName)} (총 ${a.periodCount}차시 / ${g(a.difficultyLevel)})</p>
        <p><strong>3. 연계 성취기준:</strong> ${(i.standards||[]).map(e=>g(e.code)).join(`, `)}</p>
        <p><strong>4. 맞춤 지원 대책:</strong> ${g((i.functionalNeeds||[]).join(` / `))}</p>
        <p><strong>5. 평가 중점:</strong> ${g(i.evalFocusTitle)} (지식·기능·태도 3차원 평가)</p>
      </div>
      <div style="display: flex; gap: 0.6rem; justify-content: flex-end; margin-top: 1.1rem; flex-wrap: wrap;">
        <button type="button" class="btn-bubble-tool" data-action="reset-all">처음으로 다시 작성</button>
        <button type="button" class="btn-bubble-tool" data-action="copy-curriculum">기안문 텍스트 복사</button>
        <button type="button" class="btn-soft-primary" data-action="download-hwpx">
          ${o?`학교 서식 합성 다운로드 (.hwpx)`:`완성 계획서 다운로드 (.hwpx)`}
        </button>
      </div>
    </div>
  `}function X(e){let t=e.periodCount,n=[],r=(e.standards||[]).map(e=>e.code),i=r.length>0?r[0]:`[실생활-자립]`,a=B(t),o=S(e.locationId,e.locationName),s=[{title:`사전 탐색: ${e.locationName} 탐험 계획 수립 및 가고 싶은 구역 탐색`,summary:`${o.preIntro} 가고 싶은 곳과 관심 품목/전시물 알아보기.`,eval:`체험 장소 사진을 보고 가고 싶은 곳이나 관심 품목을 스스로 선택하고 표현하는지 관찰`,intro:o.preIntro,body:o.preBody,outro:o.preOutro,questionExample:`우리가 갈 ${e.locationName}에서 가장 먼저 찾아보고 싶은 것은 무엇일까요?`,feedbackTip:`실물 사진 카드나 영상을 제시하여 낯선 장소에 대한 불안을 낮추고 흥미를 높입니다.`},{title:`사전 계획: 나의 탐험 계획서(미션 목록) 작성 및 준비물 점검`,summary:`${o.preBody} 나만의 활동 미션 계획서 작성 및 가방 챙기기 연습.`,eval:`시각 단서(사진/픽토그램)를 활용하여 자신의 준비물과 미션 목록을 스스로 구성하는지 점검`,intro:`체험학습에 필요한 가방, 복장, 안전 명찰을 확인합니다.`,body:o.preBody,outro:`내 가방에 준비물이 빠짐없이 들어있는지 체크리스트로 확인하기.`,questionExample:`우리가 내일 챙겨가야 할 가장 중요한 물건은 무엇일까요? 가방에 쏙 넣어볼까요?`,feedbackTip:`글자 쓰기가 어려운 학생은 실물 사진 스티커나 AAC 선택 판을 활용합니다.`},{title:`사전 모의: 교실 모의 체험: 이동, 인사 및 상호작용 롤플레잉`,summary:`${o.preOutro} 교실 내 간이 부스 구성, 모의 상호작용 및 도움 요청 연습.`,eval:`교실 모의 부스에서 단계적 촉진에 따라 상호작용 및 인사 표현을 수행하는지 점검`,intro:`교실에 꾸며진 ${e.locationName} 모의 코너를 둘러보고 역할을 확인합니다.`,body:`직원 역할 교사에게 인사하기, 모의 카드 리더기에 카드 대어 결제하기.`,outro:`성공적으로 미션 수행 후 "감사합니다" 인사하고 영수증/티켓 챙기기.`,questionExample:`현장 직원 선생님을 만났을 때 어떤 인사를 건네면 좋을까요?`,feedbackTip:`반복적인 롤플레잉을 통해 현장에서 발생할 수 있는 낯선 자극을 완화합니다.`},{title:`사전 안전: 안전 수칙 및 공공장소 에티켓 다짐 (시각적 일과표 숙지)`,summary:`보행 안전(신호등, 짝꿍 손잡기), 길을 잃었을 때 대처법(안내데스크/명찰 활용) 다짐.`,eval:`비상 상황 발생 시 도움 요청 행동 및 에티켓 수칙 이해도 평가`,intro:`현장에서 지켜야 할 3대 안전 약속 안내.`,body:`시각적 일과표 순서 숙지, 짝꿍과 손잡고 걷기 연습, 비상 연락처 목걸이 확인.`,outro:`안전 약속 다짐 손도장 찍기 및 현장체험학습 출발 준비 완료 선언.`,questionExample:`만약 선생님이나 친구를 놓쳤을 때는 어떻게 행동해야 할까요?`,feedbackTip:`비상시 대처를 위해 학생의 옷이나 가방에 시각적 긴급 연락처 카드를 부착합니다.`}],c=[{title:`현장 탐색: ${e.locationName} 현장 도착 및 환경 탐색, 안전 이동 실천`,summary:`${o.fieldIntro} 배리어 프리 동선 확인 및 안전 이동 실천.`,eval:`공공장소에서 이동 안전 수칙을 준수하고 안내 표지판을 보고 방향을 탐색하는지 실기 평가`,intro:o.fieldIntro,body:o.fieldBody,outro:o.fieldOutro,questionExample:`우리가 찾던 엘리베이터와 안내 표지판이 어디에 보이나요?`,feedbackTip:`휠체어 이용 학생의 무단차 동선을 확보하고 중간 쉼터를 지정합니다.`},{title:`현장 실전: ${e.locationName} 실전 미션 수행: 직접 선택 및 상호작용 완수`,summary:`${o.fieldBody} 현장 직무 상호작용 및 실전 완수.`,eval:`현장 체크리스트를 바탕으로 목표 미션의 독립적 수행도 실기 평가`,intro:`내가 사전 준비 시간에 작성한 미션 계획서를 꺼내어 확인하기.`,body:o.fieldBody,outro:o.fieldOutro,questionExample:`스스로 선택한 미션을 직접 완수해 볼 수 있을까요?`,feedbackTip:`독립 수행을 장려하되 어려움을 겪을 때는 5초 지연 후 최소한의 제스처 촉진부터 제공합니다.`}],l=[{title:`사후 정산: 체험 결과 확인: 영수증/결과물 대조 및 활동 결과 정산`,summary:`${o.postIntro} ${o.postBody}`,eval:`체험 결과물을 대조하여 확인하고 정산 활동지에 기록할 수 있는지 평가`,intro:o.postIntro,body:o.postBody,outro:o.postOutro,questionExample:`체험 장소에서 가져온 결과물과 내 활동지를 함께 비교해 볼까요?`,feedbackTip:`수 개념이 어려운 학생에게는 1:1 매칭 스티커를 활용합니다.`},{title:`사후 나눔: 배움과 기쁨의 나눔: 친구들과 결과물 나누기 및 협동 활동`,summary:`체험 결과물이나 간식을 친구들과 나누기, 나눔 에티켓 실천 및 칭찬 격려.`,eval:`또래 친구들과 긍정적인 상호작용을 나누고 차례를 지켜 공유하는 태도 관찰`,intro:`친구들과 둥글게 둘러앉아 각자 경험한 활동 소개하기.`,body:`결과물 사이좋게 나누기, 친구에게 "고마워" 긍정적 언어 및 AAC로 표현하기.`,outro:`자리 주변 쓰레기 분리수거 및 정리정돈 스스로 하기.`,questionExample:`내가 경험한 기쁨을 친구들과 어떻게 나누어 볼 수 있을까요?`,feedbackTip:`나눔 과정에서 긍정적 피드백을 풍부하게 제공합니다.`},{title:`사후 포트폴리오: 나만의 배움 포트폴리오: 체험학습 스탬프북 및 추억 신문 제작`,summary:`체험 현장에서 찍은 나의 활동 사진 인화물 부착, 나만의 체험 일기 완성.`,eval:`자신의 체험 경험을 사진 및 다양한 표현 양식을 통해 시각적으로 구성하는지 포트폴리오 평가`,intro:`인쇄된 활동 사진들을 보며 가장 기억에 남는 장면 2~3가지 선택하기.`,body:`스탬프북/신문 양식에 사진 붙이기, 말풍선 스티커 꾸미기, 스스로 해낸 미션에 도장 찍기.`,outro:`완성된 나만의 체험학습 포트폴리오를 파일철에 보관하기.`,questionExample:`이 사진 속에서 나는 무엇을 하고 있었나요? 그때 기분은 어땠나요?`,feedbackTip:`소근육 조작이 어려운 학생에게는 벨크로 사진 카드나 굵은 펜을 제공합니다.`},{title:`사후 성찰: 배움 나눔 및 성찰: 나의 성장 소감 발표회 및 감사 편지 전달`,summary:`감정 카드/AAC/구어로 소감 발표하기, 스스로 해낸 점 칭찬하기, 감사 카드 쓰기.`,eval:`자신의 감정과 배운 점을 자기표현 방식으로 나타내고 경청하는 태도 평가`,intro:`우리 반 체험학습 하이라이트 영상 시청 및 성장 박수 나누기.`,body:`포트폴리오를 들고 한 명씩 앞으로 나와 "내가 혼자 해낸 것" 발표하기.`,outro:`전체 학생에게 '자립 탐험대 수료증' 수여 및 생활 실천 약속하기.`,questionExample:`이번 체험학습을 통해 '나 혼자서도 할 수 있어요!'라고 말할 수 있는 것은 무엇인가요?`,feedbackTip:`언어적 표현이 제한적인 학생도 박수, 태블릿 음성 등을 통해 동등하게 주인공으로 인정받도록 지원합니다.`}];for(let e=1;e<=t;e++){let o=[];o=e===1?[i]:e===t?r.length>1?[r[r.length-1]]:[i]:r.length>1?[r[e%r.length]]:[i];let u,d=`pre`,f=`사전 준비`,p=``;if(e<=a.pre){d=`pre`,f=`사전 준비`;let t=e-1,n=a.pre<=4?t:t%s.length;a.pre>4&&(p=` (${Math.floor(t/4)+1}회차)`),u={...s[Math.min(n,s.length-1)]}}else if(e<=a.pre+a.field){d=`field`,f=`현장 적용`;let t=e-a.pre-1,n=a.field<=2?t:t%c.length;a.field>2&&(p=` (${Math.floor(t/2)+1}회차)`),u={...c[Math.min(n,c.length-1)]}}else{d=`post`,f=`사후 정리`;let t=e-a.pre-a.field-1,n=a.post<=4?t:t%l.length;a.post>4&&(p=` (${Math.floor(t/4)+1}회차)`),u={...l[Math.min(n,l.length-1)]}}n.push({num:e,phase:d,phaseBadge:f,title:`${u.title}${p}`,standardsCodes:o,summary:u.summary,eval:u.eval,intro:u.intro,body:u.body,outro:u.outro,questionExample:u.questionExample,feedbackTip:u.feedbackTip})}return n}async function Z(){try{let e=X(b.plan);$(b.uploadedTemplateBuffer?`학교 고유 서식에 내용을 합성하고 있습니다...`:`한글(HWPX) 공문서 파일을 생성하고 있습니다...`,`info`),$((await h(b.plan,e,b.uploadedTemplateBuffer)).isCustomTemplate?`학교 서식에 합성된 .hwpx 파일이 다운로드되었습니다!`:`한글(HWPX) 표준 서식 파일이 성공적으로 다운로드되었습니다!`,`success`)}catch(e){console.error(`HWPX 다운로드 실패:`,e),$(`HWPX 생성 중 오류가 발생했습니다. 브라우저 콘솔을 확인해 주세요.`,`error`)}}function ee(){let e=b.plan,t=B(e.periodCount),n=X(e),r=m(e,n),i=`[${r.docTitle}]

1. 프로젝트 개요
- 프로젝트명: ${r.theme}
- 학교급 및 장소: ${r.schoolLevel} | ${r.locationName}
- 차시 배분: 총 ${r.periodCount}차시 [사전 ${t.pre}차시 : 현장 ${t.field}차시 : 사후 ${t.post}차시 (4:2:4 비율)] (${r.difficultyLevel})
- 수업 방식: ${r.teachingMethod}
- 핵심 질문: 우리 마을 ${r.locationName}에서 나에게 필요한 것을 스스로 찾고 안전하게 참여하려면 어떻게 해야 할까?

2. 연계 성취기준
${(e.standards||[]).map(e=>`- ${e.code} ${e.title||e.subject||``}: ${e.desc||``}`).join(`
`)}

3. 학습 목표
- [지식] ${e.goalKnowledge}
- [기능] ${e.goalSkill}
- [태도] ${e.goalAttitude}

4. 참가 학생 맞춤 지원 대책 (익명화 완료)
${(e.functionalNeeds||[]).join(`
`)}

5. 차시별 수업 계획 (사전:현장:사후 4:2:4 비율 구성)
${n.map(e=>`[${e.num}차시 / ${e.phaseBadge}] ${e.title} (연계: ${e.standardsCodes.join(`, `)})\n  - 활동: ${e.summary}\n  - 평가: ${e.eval}`).join(`

`)}
`;navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(i).then(()=>{$(`교육과정 전체 내용이 클립보드에 복사되었습니다.`,`success`)}).catch(()=>{Q(i)}):Q(i)}function Q(e){let t=document.createElement(`textarea`);t.value=e,t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();try{document.execCommand(`copy`),$(`교육과정 전체 내용이 클립보드에 복사되었습니다.`,`success`)}catch{$(`클립보드 복사에 실패했습니다.`,`error`)}document.body.removeChild(t)}function te(){let e=document.getElementById(`printContainer`),t=document.getElementById(`udlPrintArea`);e&&t&&(e.innerHTML=t.innerHTML,window.print())}function $(e,t=`info`){let n=document.getElementById(`toastShelf`);if(!n)return;let r=document.createElement(`div`);r.className=`soft-toast ${t===`error`?`toast-error`:t===`success`?`toast-success`:``}`,r.textContent=e,n.appendChild(r),setTimeout(()=>{r.style.opacity=`0`,setTimeout(()=>{r.parentNode&&r.parentNode.removeChild(r)},300)},2400)}