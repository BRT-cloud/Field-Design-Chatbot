const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jszip.min-eY43GG6T.js","./rolldown-runtime-W7wSyTde.js"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-W7wSyTde.js";import{t}from"./curriculum-data-R8fr1bWs.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=[{id:`elem`,name:`초등학교`,badge:`초등 1~6학년`,icon:`🎒`,iconBg:`#fef3c7`,iconBorder:`#fde68a`,desc:`성취기준 체크리스트 제공 연계 (국어, 수학, 사회, 바른생활, 슬기로운생활, 즐거운생활)`},{id:`mid`,name:`중학교`,badge:`중학 1~3학년`,icon:`📚`,iconBg:`#e0f2fe`,iconBorder:`#bae6fd`,desc:`2022 개정 중학교 교육과정 연계 (국어, 수학, 사회·역사·도덕, 진로와 직업)`},{id:`high`,name:`고등학교`,badge:`고등 1~3학년`,icon:`🎓`,iconBg:`#ede9fe`,iconBorder:`#ddd6fe`,desc:`2022 개정 고등학교 교육과정 연계 (국어, 수학, 사회·역사·윤리, 진로와 직업)`}],r=[{id:`loc-mart`,name:`대형마트 / 전통시장`,icon:`MARKET`,desc:`물건 구매, 화폐 및 카드 결제, 지역사회 편의시설 이용`},{id:`loc-cafe`,name:`베이커리 / 카페`,icon:`CAFE`,desc:`키오스크 및 구두 주문, 직업 현장 견학, 식음료 에티켓`},{id:`loc-garden`,name:`수목원 / 생태공원`,icon:`NATURE`,desc:`자연 오감 탐색, 계절 식물 관찰, 야외 보행 안전`},{id:`loc-museum`,name:`과학관 / 박물관`,icon:`MUSEUM`,desc:`체험형 전시물 탐색, 공공장소 관람 예절, 질서 지키기`},{id:`loc-transit`,name:`지하철역 / 버스터미널`,icon:`TRANSIT`,desc:`대중교통 승하차, 교통카드 태그, 환승 및 안전 보행`},{id:`loc-farm`,name:`스마트팜 / 농촌체험장`,icon:`FARM`,desc:`농작물 수확, 생태 직업 탐구, 도구 안전 사용`}];function i(e){return e===`초등학교`?t.elementary||[]:e===`중학교`?t.middle||[]:t.high||[]}function a(e,t){let n=i(e),r={"loc-mart":[`구매`,`화폐`,`돈`,`소비`,`가게`,`시장`,`시설`,`생활`,`계산`,`숫자`,`말하기`,`인사`,`질서`,`경제`,`수량`,`선택`],"loc-cafe":[`직업`,`진로`,`주문`,`인사`,`대화`,`식생활`,`예절`,`음식`,`소통`,`서비스`,`노동`,`일자리`],"loc-garden":[`식물`,`자연`,`환경`,`계절`,`동물`,`생태`,`감각`,`탐색`,`관찰`,`숲`,`건강`,`안전`,`생명`,`공공`],"loc-museum":[`문화`,`역사`,`관람`,`전시`,`질서`,`체험`,`탐구`,`공공`,`예절`,`유물`,`사회`,`유산`,`기록`],"loc-transit":[`교통`,`안전`,`이동`,`길`,`보행`,`규칙`,`신호`,`예절`,`표지판`,`대중교통`,`승하차`,`공공`,`시설`,`생활`,`질서`],"loc-farm":[`식물`,`수확`,`농업`,`도구`,`자연`,`생태`,`직업`,`환경`,`노동`,`재배`,`생명`,`진로`,`체험`]},a=[`국어`,`공통국어`,`화법`,`독서`,`문학`,`의사소통`,`수학`,`공통수학`,`경제 수학`,`직무 수학`,`실용수학`,`사회`,`통합사회`,`경제`,`한국사`,`역사`,`지리`,`정치`,`도덕`,`윤리`,`진로와 직업`,`진로`,`바른생활`,`슬기로운생활`,`즐거운 생활`],o=r[t]||[`생활`,`참여`,`안전`,`대화`],s=[];for(let e of n){let t=(e.desc+` `+e.title+` `+e.subject).toLowerCase(),n=0;a.some(t=>e.subject.includes(t))&&(n+=5);for(let e of o)t.includes(e)&&(n+=3);n>5&&s.push({item:e,score:n})}if(s.sort((e,t)=>t.score-e.score),s.length>=6)return s.slice(0,8).map(e=>e.item);let c=n.filter(e=>a.some(t=>e.subject.includes(t)));return(c.length>=8?c:n).slice(0,8)}function o(e,t){if(e&&e!==`loc-custom`){let t={"loc-mart":`mart`,"loc-cafe":`cafe`,"loc-garden":`nature`,"loc-museum":`museum`,"loc-transit":`transit`,"loc-farm":`farm`};if(t[e])return t[e]}let n=(t||``).toLowerCase();return n.trim()?/농장|스마트팜|과수원|목장|텃밭|농촌|체험마을|비닐하우스/.test(n)?`farm`:/공원|수목원|숲|식물원|생태|산책|정원|동물원|호수|자연|휴양림/.test(n)?`nature`:/박물관|과학관|미술관|전시관|기념관|역사관|천문대|갤러리|체험관/.test(n)?`museum`:/지하철|역|터미널|버스|정류장|공항|기차|KTX|승강장/.test(n)?`transit`:/도서관|소방서|경찰서|우체국|주민센터|동사무소|구청|시청|은행/.test(n)?`public`:/영화관|극장|공연장|아쿠아리움|놀이공원|테마파크|키즈카페|롯데월드|에버랜드|cgv|메가박스/.test(n)?`culture`:/카페|베이커리|빵집|제과|커피|디저트|식당|음식점|레스토랑|분식|스타벅스|투썸|이디야/.test(n)?`cafe`:/마트|시장|백화점|슈퍼|다이소|상점|가게|쇼핑|편의점|문구점|홈플러스|이마트|롯데마트|코스트코|노브랜드|하나로마트/.test(n)?`mart`:`general`:`general`}function s(e={}){let t=e.schoolLevel||`초등학교`,n=t.includes(`초등`),r=t.includes(`중학`),i=t.includes(`고등`),a=(e.locationName||``).trim()||`체험 현장`,s=e.locationId||`loc-custom`,c=o(s,a),l=Array.isArray(e.standards)?e.standards:[],u=l.map(e=>`${e.code||``} ${e.title||``} ${e.subject||``} ${e.desc||``}`).join(` `).toLowerCase(),d={economy:0,communication:0,safety:0,nature:0,career:0,math:0,culture:0,selfcare:0,social:0};for(let[e,t]of Object.entries({economy:[`구매`,`화폐`,`돈`,`소비`,`계산`,`거스름돈`,`가격`,`마트`,`시장`,`영수증`,`상점`,`물건`,`구입`],communication:[`인사`,`말하기`,`대화`,`표현`,`언어`,`듣기`,`질문`,`요청`,`의사소통`,`감사`,`소통`,`글자`,`단어`],safety:[`안전`,`규칙`,`질서`,`보행`,`교통`,`신호`,`예절`,`대처`,`위험`,`보호`,`줄서기`,`승하차`],nature:[`식물`,`동물`,`생태`,`환경`,`자연`,`계절`,`숲`,`나무`,`꽃`,`흙`,`생명`,`날씨`,`친환경`],career:[`직업`,`진로`,`일`,`일자리`,`노동`,`탐색`,`바리스타`,`농부`,`직무`,`직업인`,`일터`],math:[`수`,`셈`,`세기`,`숫자`,`더하기`,`빼기`,`양`,`크기`,`길이`,`시간`,`시계`,`분류`,`비교`],culture:[`문화`,`역사`,`유물`,`전통`,`유산`,`전시`,`관람`,`예술`,`미술`,`음악`,`유적`],selfcare:[`자립`,`식생활`,`식사`,`건강`,`옷`,`정리`,`정돈`,`일상`,`독립`,`위생`,`몸`],social:[`협력`,`친구`,`나눔`,`배려`,`참여`,`모둠`,`공동체`,`함께`,`도움`]}))for(let n of t)u.includes(n)&&(d[e]+=2);c===`mart`?(d.economy+=4,d.math+=2):c===`cafe`?(d.communication+=3,d.career+=3):c===`nature`?(d.nature+=5,d.selfcare+=1):c===`museum`?(d.culture+=5,d.safety+=2):c===`transit`?(d.safety+=5,d.selfcare+=3):c===`farm`&&(d.nature+=4,d.career+=3);let f=parseInt(e.periodCount,10)||10,p=f<=3?`short`:f<=7?`mid`:`long`,m=e.difficultyLevel||``,h=m.includes(`기초`)||m.includes(`탐색`),g=m.includes(`기본`)||m.includes(`적용`),_=m.includes(`심화`)||m.includes(`자립`),v=Array.isArray(e.functionalNeeds)?e.functionalNeeds:[],y=v.join(` `),b=/aac|의사소통|상징|말하기/.test(y),x=/휠체어|경사로|무단차|보행/.test(y),S=/소음|감각|휴식|쉼터|시각/.test(y),C=/동행|밀착|이탈|1:1/.test(y);return{schoolLevel:t,isElem:n,isMid:r,isHigh:i,locationName:a,locationId:s,locCategory:c,standards:l,standardsText:u,domainScores:d,periodCount:f,periodBand:p,difficulty:{isBasic:h,isApplied:g,isAdvanced:_,raw:m},needs:{needsAac:b,needsWheelchair:x,needsSensory:S,needsEscort:C,raw:v},evalFocusId:e.evalFocusId||`eval-independence`,currentTheme:e.theme||``,teachingMethod:e.teachingMethod||``}}function c(e,t={}){let{locationName:n,isElem:r,isMid:i,isHigh:a,domainScores:o,locCategory:c}=s(e),l=t.cycleIndex||0,u=Object.entries(o).sort((e,t)=>t[1]-e[1]);u[0]&&u[0][0],u[1]&&u[1][0];let d=[];(c===`mart`||o.economy>0||o.math>0)&&(r?(d.push({theme:`스스로 쏙쏙 고르고 계산하는 ${n} 장보기 탐험대`,reasonBadge:`화폐·구매 성취기준 연계`,domain:`economy`,score:10+o.economy}),d.push({theme:`알뜰살뜰 장바구니! 친구와 함께하는 ${n} 미션`,reasonBadge:`사회성 & 실생활 수학 연계`,domain:`economy`,score:8+o.economy})):a?(d.push({theme:`예산 수립부터 결제·영수증 정산까지, ${n} 자립 소비 프로젝트`,reasonBadge:`고교 실전 자립 경제`,domain:`economy`,score:11+o.economy}),d.push({theme:`${n}에서 실천하는 성인기 대비 자립생활 경제 실무`,reasonBadge:`전환교육 직무수학 연계`,domain:`economy`,score:9+o.economy})):(d.push({theme:`나 스스로 고르고 결제하는 슬기로운 ${n} 장보기`,reasonBadge:`실생활 자립 기능 연계`,domain:`economy`,score:10+o.economy}),d.push({theme:`우리 동네 ${n} 탐험: 필요한 물품 찾기와 현명한 소비`,reasonBadge:`지역사회 참여 연계`,domain:`economy`,score:8+o.economy}))),(c===`cafe`||o.career>0||o.communication>0)&&(r?(d.push({theme:`달콤한 냄새 가득! 내 손으로 주문하고 받아오는 ${n} 나들이`,reasonBadge:`기초 의사소통 연계`,domain:`communication`,score:10+o.communication}),d.push({theme:`안녕! 인사하고 음료를 주문하는 ${n} 에티켓 배움터`,reasonBadge:`공공장소 바른생활 연계`,domain:`communication`,score:8+o.communication})):a?(d.push({theme:`${n} 직무 현장 탐방 및 고객 응대·주문 시뮬레이션 진로 프로젝트`,reasonBadge:`진로와 직업 교과 연계`,domain:`career`,score:11+o.career}),d.push({theme:`성인기 여가 선용과 식음료 매장 독립적 이용 자립 훈련`,reasonBadge:`전환기 자립생활 연계`,domain:`career`,score:9+o.career})):(d.push({theme:`바리스타의 하루와 키오스크 주문 정복! ${n} 진로 체험`,reasonBadge:`직업 탐색 & 디지털 리터러시`,domain:`career`,score:10+o.career}),d.push({theme:`내 목소리로 당당하게 주문하는 ${n} 의사소통 미션`,reasonBadge:`실생활 의사소통 연계`,domain:`communication`,score:9+o.communication}))),(c===`nature`||o.nature>0)&&(r?(d.push({theme:`오감으로 만나는 초록빛 ${n} 생태 보물찾기`,reasonBadge:`오감 탐색 & 즐거운생활 연계`,domain:`nature`,score:10+o.nature}),d.push({theme:`자연물 찰칵! 계절의 변화를 느끼는 ${n} 숲 놀이터`,reasonBadge:`계절 식물 관찰 연계`,domain:`nature`,score:8+o.nature})):(d.push({theme:`자연과 교감하며 심신을 힐링하는 ${n} 생태 탐구 프로젝트`,reasonBadge:`생태 환경 & 정서 안정`,domain:`nature`,score:10+o.nature}),d.push({theme:`자연물 채집과 관찰 기록으로 완성하는 ${n} 생태 지도 만들기`,reasonBadge:`과학 탐구 역량 연계`,domain:`nature`,score:8+o.nature}))),(c===`museum`||o.culture>0)&&(r?(d.push({theme:`보고 만지며 신나게 배우는 ${n} 문화 탐험대`,reasonBadge:`체험형 전시 탐색 연계`,domain:`culture`,score:10+o.culture}),d.push({theme:`쉿! 관람 예절을 지키며 완성하는 ${n} 스탬프 투어`,reasonBadge:`공공장소 질서·에티켓 연계`,domain:`culture`,score:8+o.culture})):(d.push({theme:`스탬프 투어로 우리 역사와 과학을 탐구하는 ${n} 프로젝트`,reasonBadge:`사회·역사·과학 성취기준 연계`,domain:`culture`,score:10+o.culture}),d.push({theme:`공공 문화 시설을 스스로 관람하고 기록하는 ${n} 문화 나들이`,reasonBadge:`지역사회 문화 향유 연계`,domain:`culture`,score:8+o.culture}))),(c===`transit`||o.safety>0)&&(r?d.push({theme:`카드를 삑! 혼자서도 척척 타는 ${n} 안전 원정대`,reasonBadge:`대중교통 안전 보행 연계`,domain:`safety`,score:10+o.safety}):(d.push({theme:`노선도 확인부터 승하차까지, ${n} 대중교통 완전 정복`,reasonBadge:`지역사회 이동 자립 역량 연계`,domain:`safety`,score:10+o.safety}),d.push({theme:`질서와 배려를 실천하며 안전하게 이동하는 ${n} 보행 프로젝트`,reasonBadge:`공공 교통 에티켓 연계`,domain:`safety`,score:8+o.safety}))),c===`farm`&&(d.push({theme:`씨앗에서 수확까지: ${n} 생태 농부 체험과 수확의 기쁨`,reasonBadge:`생태 노작 및 식물 수확`,domain:`nature`,score:10+o.nature}),d.push({theme:`친환경 농작물을 직접 수확하고 나누는 ${n} 나눔 프로젝트`,reasonBadge:`협력 및 사회성 발달 연계`,domain:`career`,score:9+o.career}));let f=[{theme:`우리 마을 ${n}에서 스스로 해보는 자립 생활 미션`,reasonBadge:`자립 생활 & 지역사회 참여`,domain:`selfcare`,score:7},{theme:`친구와 함께 협력하여 미션을 완수하는 ${n} 배움 원정대`,reasonBadge:`또래 협력 & 사회적 기술`,domain:`social`,score:6},{theme:`공공장소 에티켓을 지키며 즐겁게 참여하는 ${n} 현장 체험`,reasonBadge:`공공 에티켓 & 안전 준수`,domain:`safety`,score:6},{theme:`질문하고 직접 경험하며 나만의 배움을 만드는 ${n} 탐방`,reasonBadge:`학생 주도 탐구 학습`,domain:`culture`,score:5}];for(let e of f)d.some(t=>t.theme===e.theme)||d.push(e);let p=[],m=new Set;for(let e of d)m.has(e.theme)||(m.add(e.theme),p.push(e));p.sort((e,t)=>t.score-e.score);let h=p.length,g=l*5%Math.max(1,h),_=p.slice(g,g+5);return _.length<5&&h>=5&&(_=_.concat(p.slice(0,5-_.length))),_}var l=[{id:`eval-independence`,title:`독립적 수행도 (자립 생활 역량)`,category:`selfcare`,baseScore:10},{id:`eval-communication`,title:`의사소통 및 상호작용 (AAC / 구어)`,category:`communication`,baseScore:9},{id:`eval-safety`,title:`안전 수칙 준수 및 공공 에티켓`,category:`safety`,baseScore:9},{id:`eval-participation`,title:`정서적 참여도 및 자기결정 역량`,category:`social`,baseScore:8},{id:`eval-functional-academic`,title:`기능적 학업 기술 적용 (수·화폐·문해)`,category:`economy`,baseScore:7},{id:`eval-career-vocational`,title:`진로·직업 기초 기능 및 직무 태도`,category:`career`,baseScore:6},{id:`eval-social-cooperation`,title:`또래 협력 및 사회적 문제 해결`,category:`social`,baseScore:7},{id:`eval-sensory-regulation`,title:`감각 조절 및 환경 적응성`,category:`sensory`,baseScore:6},{id:`eval-mobility`,title:`지역사회 이동 및 시설 탐색 능력`,category:`mobility`,baseScore:7},{id:`eval-self-advocacy`,title:`자기 표현 및 능동적 도움 요청`,category:`self-advocacy`,baseScore:7}];function u(e){let t=s(e),{locationName:n,domainScores:r,isHigh:i,isElem:a,needs:o,difficulty:c}=t,u=l.map(e=>{let s=e.baseScore,l=`핵심 평가 관점`;e.id===`eval-functional-academic`?(s+=r.economy+r.math,(r.economy>0||r.math>0)&&(l=`성취기준(화폐·수학) 맞춤`)):e.id===`eval-communication`?(s+=r.communication,o.needsAac?(s+=5,l=`AAC 지원 학생 맞춤`):r.communication>0&&(l=`의사소통 성취기준 연계`)):e.id===`eval-career-vocational`?(s+=r.career,i?(s+=6,l=`고교 진로·직무 연계 권장`):r.career>0&&(l=`직업 성취기준 연계`)):e.id===`eval-sensory-regulation`?o.needsSensory&&(s+=7,l=`소음·감각 지원 맞춤`):e.id===`eval-safety`?(s+=r.safety,t.locCategory===`transit`&&(s+=5,l=`교통 시설 안전 최우선`)):e.id===`eval-mobility`?(o.needsWheelchair||t.locCategory===`transit`)&&(s+=5,l=`이동 지원 & 동선 탐색`):e.id===`eval-participation`?a&&(s+=3,l=`초등 긍정 참여 중심`):e.id===`eval-social-cooperation`&&r.social>0&&(s+=3,l=`협력 학습 연계`);let u=``;return u=e.id===`eval-independence`?c.isBasic?`${n} 현장에서 촉진 단계를 점진적으로 줄이며 최소한의 도움으로 과제를 완수하는 수행도 중심 평가`:`${n}의 주요 시설에서 스스로 물품을 선택하거나 결제·이용을 독립적으로 완수하는 자립 역량 중심 평가`:e.id===`eval-communication`?o.needsAac?`${n} 직원 및 또래에게 AAC 상징판이나 보완의사소통 기기를 능동적으로 활용하여 요구와 인사를 전달하는지 평가`:`${n} 현장 직원이나 동료에게 상황에 맞는 인사말과 선택, 감사 표현을 명확하게 전달하는 의사소통 평가`:e.id===`eval-safety`?`${n} 이동 동선과 현장 내 보행 안전 수칙, 질서 지키기, 비상 대처 행동을 올바르게 실천하는지 평가`:e.id===`eval-participation`?`${n} 활동에 자신의 흥미와 선호를 반영하여 능동적으로 참여하고 긍정적인 성취 감정을 표현하는지 평가`:e.id===`eval-functional-academic`?`${n} 현장에서 가격 확인, 예산 계산, 화폐·카드 결제, 수량 파악 등 실생활 기능적 학업 기술을 적용하는지 평가`:e.id===`eval-career-vocational`?`${n}의 직업인 관찰 및 직무 모의 실습 시 작업 태도, 지시 따르기, 책임감 있는 미션 수행 태도 중심 평가`:e.id===`eval-social-cooperation`?`${n} 미션 수행 중 짝꿍과 역할을 분담하고 서로 양보하고 도우며 협력하는 친사회적 행동 중심 평가`:e.id===`eval-sensory-regulation`?`${n}의 낯선 소음과 시각 자극 속에서 안정적으로 감각을 조절하고 휴식 쉼터를 활용하며 적응하는지 평가`:e.id===`eval-mobility`?`${n}에서 안내 표지판과 배리어 프리 동선을 확인하며 목적지까지 안전하고 바르게 이동하는 능력 평가`:`${n}에서 예상치 못한 어려움이나 도움이 필요한 상황 발생 시 당당하게 조력을 요청하는 자기옹호 역량 평가`,{id:e.id,title:e.title,desc:u,score:s,reasonBadge:l}});return u.sort((e,t)=>t.score-e.score),u}function d(e){let{locationName:t,evalFocusId:n,needs:r}=s(e);e.theme||`${t}`;let i=``,a=``,o=``;switch(n){case`eval-functional-academic`:i=`${t}에서 물건의 가격표와 영수증, 금액 표기 등 실생활 수·화폐 정보를 바르게 이해한다.`,a=`정해진 예산 내에서 필요한 물품을 선택하고 카드 또는 현금으로 결제 절차를 직접 완수한다.`,o=`자신의 소비 선택에 만족감을 느끼며 계획적인 경제 습관을 스스로 기른다.`;break;case`eval-communication`:i=`${t}에서 상황에 맞는 적절한 인사말과 도움 요청 발문의 필요성을 이해한다.`,a=r.needsAac?`현장 직원이나 친구에게 AAC 상징 카드나 보완의사소통 도구를 활용하여 원하는 것을 명확하게 전달한다.`:`현장 직원이나 동료에게 구어 또는 시각 단서로 자신의 요구와 선택을 표현하고 감사 인사를 나눈다.`,o=`타인과의 상호작용에 긍정적인 흥미를 느끼고 예의 바르게 소통하는 태도를 지닌다.`;break;case`eval-safety`:i=`${t}의 이동 경로와 시설 내에서 지켜야 할 보행 안전 규칙 및 공공 에티켓을 안다.`,a=`차례 지키기, 질서 유지, 위험 구역 피하기 등 현장 안전 수칙을 스스로 실천한다.`,o=`인솔 교사 및 친구들과 함께 안전 약속을 성실히 지키며 배려하는 마음을 갖는다.`;break;case`eval-career-vocational`:i=`${t}에서 일하는 직업인들의 역할과 서비스 진행 절차를 이해한다.`,a=`지정된 직무 과제를 순서에 맞게 단계별로 성실히 수행하고 결과를 확인한다.`,o=`노동의 가치와 직업에 대한 흥미를 느끼며 책임감 있는 직무 태도를 형성한다.`;break;case`eval-social-cooperation`:i=`친구와 함께 역할을 분담하여 미션을 수행하는 협력의 가치를 안다.`,a=`짝꿍과 함께 안내도를 보고 물품을 찾는 등 상호 협동하여 프로젝트를 해결한다.`,o=`서로를 격려하고 도움을 주고받으며 공동체 유대감을 형성한다.`;break;case`eval-sensory-regulation`:i=`${t}의 다양한 감각 자극(소음, 빛, 인파)에 대처하는 쉼터와 휴식 방법을 안다.`,a=`과도한 자극 시 이어플러그나 쉼터를 능동적으로 활용하여 심리적 안정을 조절한다.`,o=`자신의 신체 신호를 인식하고 편안한 마음으로 배움에 참여하려는 태도를 지닌다.`;break;case`eval-mobility`:i=`${t}의 주요 시설 배치와 배리어 프리 안내 표지판의 의미를 이해한다.`,a=`교통수단 승하차 및 유도 동선을 따라 지정된 장소까지 독립적으로 이동한다.`,o=`스스로 길을 찾아 목적지에 도달하는 보행 자립심과 자신감을 기른다.`;break;case`eval-self-advocacy`:i=`어려움이 생겼을 때 도움을 요청해야 하는 상대와 방법을 바르게 안다.`,a=`안내데스크나 직원에게 명찰 또는 표현 단서를 제시하며 주도적으로 도움을 청한다.`,o=`자신의 권리와 의사를 당당하게 표현하는 자기결정 태도를 기른다.`;break;case`eval-participation`:i=`${t}에서 경험할 수 있는 다양한 문화와 활동 내용을 파악한다.`,a=`자신의 선호와 흥미에 따라 능동적으로 활동을 선택하고 즐겁게 참여한다.`,o=`새로운 배움에 대한 호기심을 갖고 성취의 기쁨을 친구들과 나눈다.`;break;default:i=`${t}의 주요 시설 구조와 이용 절차를 이해한다.`,a=`최소한의 촉진으로 스스로 필요한 활동을 선택하고 이용 절차를 독립적으로 완수한다.`,o=`스스로 해냈다는 자립 생활의 성취감과 주도적인 자신감을 갖는다.`}return{knowledge:i,skill:a,attitude:o}}var f=[{id:`method-project`,name:`프로젝트 학습 (PBL)`,baseBadge:`체험 중심 권장`,baseScore:10},{id:`method-cooperation`,name:`협력 학습 (Cooperative Learning)`,baseBadge:`사회성 촉진`,baseScore:9},{id:`method-question`,name:`질문식 수업 (Inquiry Questioning)`,baseBadge:`사고력 증진`,baseScore:8},{id:`method-direct`,name:`직접교수 및 시연 (Direct Instruction)`,baseBadge:`기초 기능 습득`,baseScore:9},{id:`method-cbi`,name:`지역사회 중심 교수 (CBI)`,baseBadge:`실생활 자립 훈련`,baseScore:10},{id:`method-task-analysis`,name:`과제분석 기반 단계 교수`,baseBadge:`체계적 소단계 습득`,baseScore:8},{id:`method-video-modeling`,name:`비디오 모델링 & 시각 스캐폴딩`,baseBadge:`시각 단서 선행 학습`,baseScore:7},{id:`method-roleplay`,name:`모의 체험 및 시뮬레이션 (Role-Play)`,baseBadge:`사전 롤플레잉`,baseScore:8},{id:`method-play`,name:`놀이 및 감각 탐색 학습`,baseBadge:`오감 중심 배움`,baseScore:7},{id:`method-career`,name:`직무 체험 및 현장 견학`,baseBadge:`진로·직업 특화`,baseScore:6}];function p(e){let{locationName:t,isElem:n,isHigh:r,periodBand:i,difficulty:a,needs:o,evalFocusId:c}=s(e),l=e.theme||`${t} 체험학습`,u=f.map(e=>{let s=e.baseScore,u=e.baseBadge;i===`long`?(e.id===`method-project`&&(s+=4,u=`다차시 PBL 최적화`),e.id===`method-cooperation`&&(s+=2)):i===`short`&&(e.id===`method-direct`&&(s+=4,u=`단기 집중 핵심 습득`),e.id===`method-cbi`&&(s+=3),e.id===`method-project`&&(s-=3)),n?(e.id===`method-play`&&(s+=5,u=`초등 오감 놀이 권장`),e.id===`method-cooperation`&&(s+=2)):r&&(e.id===`method-career`&&(s+=6,u=`고교 진로·직무 최적`),e.id===`method-cbi`&&(s+=4,u=`전환기 지역사회 자립`)),a.isBasic&&(e.id===`method-task-analysis`&&(s+=5,u=`기초 단계별 촉진 맞춤`),e.id===`method-direct`&&(s+=3),e.id===`method-video-modeling`&&(s+=3)),(o.needsAac||o.needsSensory)&&e.id===`method-video-modeling`&&(s+=5,u=`시각·AAC 친화`),c===`eval-communication`?(e.id===`method-roleplay`&&(s+=5,u=`의사소통 평가 최적`),e.id===`method-cooperation`&&(s+=3)):c===`eval-independence`?e.id===`method-cbi`&&(s+=4,u=`자립 수행도 평가 최적`):c===`eval-social-cooperation`?e.id===`method-cooperation`&&(s+=6,u=`또래 협력 평가 최적`):c===`eval-career-vocational`&&e.id===`method-career`&&(s+=6,u=`직무 평가 맞춤`);let d=``;return d=e.id===`method-project`?`실제 삶의 문제(예: ${t}에서 '${l}' 미션 완수하기)를 해결하기 위해 사전 기획부터 현장 실행, 사후 결과물 제작까지 학생 주도로 탐구하는 방식`:e.id===`method-cooperation`?`2~3명의 동료 짝꿍을 이루어 역할을 분담(안내도 확인자, 물품·미션 확인자, 결제·정리 담당자)하고 서로 도움을 주고받으며 ${t} 미션을 완수하는 방식`:e.id===`method-question`?`교사의 구조화된 발문과 시각 단서 질문(예: '${t} 표지판은 무엇을 뜻할까?', '가장 먼저 어디로 가야 할까?')을 통해 학생의 능동적 탐색을 유도하는 방식`:e.id===`method-direct`?`교사의 단계적 모델링과 설명 → 학생의 모의 연습(Role-Play) → ${t} 현장 즉각 적용 및 1:1 피드백으로 이어지는 체계적 기술 습득 방식`:e.id===`method-cbi`?`가상 교실이 아닌 실제 ${t} 자연적 환경에서 자연스러운 단서와 결과를 경험하며 실생활 자립 기능을 직접 훈련하는 지역사회 중심 교수 방식`:e.id===`method-task-analysis`?`${t} 이용 절차(입장-선택-결제-퇴장)를 작은 단위의 세부 행동으로 쪼개어 단계별로 모델링하고 촉진을 점진적으로 줄여가는 교수 방식`:e.id===`method-video-modeling`?`${t}의 현장 동선 및 주문·이용 행동을 영상이나 사진 단서로 사전에 충분히 시청·숙지하여 현장 불안을 줄이고 모방을 돕는 방식`:e.id===`method-roleplay`?`교실에 ${t} 간이 부스를 재현하고 손님과 직원 역할을 번갈아 시뮬레이션하여 현장 돌발 상황 대처 능력과 자신감을 기르는 방식`:e.id===`method-play`?`${t}의 다양한 사물과 자연물을 만지고 느끼는 오감 놀이와 스탬프 보물찾기 게임을 통해 자연스러운 호기심과 즐거움을 이끌어내는 방식`:`${t}의 실제 작업 환경을 둘러보고 직무 체험 활동에 직접 참여하여 미래 직업 생활에 필요한 기본 소양을 익히는 방식`,{id:e.id,name:e.name,badge:u,desc:d,score:s}});return u.sort((e,t)=>t.score-e.score),u}var m=`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`,h=`modulepreload`,g=function(e,t){return new URL(e,t).href},_={},v=function(e){return e.pathname.endsWith(`.css`)},y=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},b=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=g(t,n);let r=s(t),i=v(r);return y(_,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:h,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};async function x(){if(typeof window<`u`&&window.JSZip)return window.JSZip;if(typeof globalThis<`u`&&globalThis.JSZip)return globalThis.JSZip;try{let t=await b(()=>import(`./jszip.min-eY43GG6T.js`).then(t=>e(t.default,1)),__vite__mapDeps([0,1]),import.meta.url);return t.default||t}catch(e){throw Error(`JSZip 라이브러리를 로드할 수 없습니다: `+(e?.message||e))}}function S(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&apos;`)}function C(e){if(e&&e.academicYear){let t=parseInt(e.academicYear,10);if(!isNaN(t)&&t>2e3)return t}let t=new Date;return t.getMonth()>=8?t.getFullYear()+1:t.getFullYear()}function w(e,t){let n=C(e),r=e.schoolLevel||`특수학교`,i=`${n}학년도 ${r} 특수학급 현장체험학습 운영 계획(안)`,a=`${r} 특수학급`,o=e.locationName||`현장체험학습지`,s=e.periodCount||10,c=e.difficultyLevel||`기본/적용 수준`,l=e.teachingMethod||`프로젝트 학습`,u=e.theme||`지역사회 탐색 및 자립생활 프로젝트`;return{year:n,schoolLevel:r,docTitle:i,orgName:a,docSummary:`1. 주제: ${u} | 2. 장소: ${o} | 3. 차시: 총 ${s}차시 (${c})`,locationName:o,periodCount:s,difficultyLevel:c,teachingMethod:l,theme:u,bodyParagraphs:[`1. 추진 목적 및 개요`,`  가. 주제: ${u}`,`  나. 장소: ${o} (총 ${s}차시 / ${c})`,`  다. 주요 수업 방식: ${l}`,``,`2. 연계 교육과정 성취기준`,...e.standards&&e.standards.length>0?e.standards.map(e=>`  - ${e.code} ${e.title||e.subject||``}: ${e.desc||``}`):[`  - [공통] 실생활 중심 자립생활 및 지역사회 적응 기술`],``,`3. 체험학습 목표 (3차원 학습 목표)`,`  가. [지식·이해] ${e.goalKnowledge||`${o}의 환경 및 이용 방법을 이해한다.`}`,`  나. [기능·수행] ${e.goalSkill||`필요한 활동을 스스로 선택하고 안전하게 완수한다.`}`,`  다. [가치·태도] ${e.goalAttitude||`자립심과 공공장소 에티켓을 기른다.`}`,``,`4. 학생 맞춤형 지원 및 안전 대책 (개인식별정보 배제)`,...e.functionalNeeds&&e.functionalNeeds.length>0?e.functionalNeeds.map(e=>`  - ${e}`):[`  - 이동 및 안전을 위한 인솔 보조 인력 밀착 지원`],``,`5. 차시별 세부 운영 계획 (사전·현장·사후 로드맵)`,...t&&t.length>0?t.flatMap(e=>[`  [${e.num}차시 / ${e.phaseBadge||`수업`}] ${e.title} (연계: ${(e.standardsCodes||[]).join(`, `)||`공통`})`,`    - 주요 활동: ${e.summary||``}`,`    - 평가 관점: ${e.eval||``}`]):[`  [1차시 / 사전] 사전 안전 지도 및 탐색`],``,`6. 안전지도 및 비상 대책`,`  가. 사전 답사를 통한 배리어 프리(무단차, 경사로, 비상구) 동선 확보`,`  나. 돌발 상황 대비 1:1 보조인력 배치 및 비상연락망 유지`,`  다. 학생 특성별 보완대체의사소통(AAC) 도구 및 비상 명찰 착용`]}}function T(e,t){let n=w(e,t);return`[${n.docTitle}]\n${n.orgName}\n\n[개요]\n${n.docSummary}\n\n${n.bodyParagraphs.join(`
`)}\n`}function ee(e){if(!e||e.length===0)return``;let t=[6e3,11e3,15e3,8e3],n=[`차시 (구분)`,`수업 주제`,`주요 교수·학습 활동`,`평가 관점`].map((e,n)=>`
    <hp:tc name="" header="1" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="2">
      <hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">
        <hp:p id="0" paraPrIDRef="2" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
          <hp:run charPrIDRef="2"><hp:t>${S(e)}</hp:t></hp:run>
        </hp:p>
      </hp:subList>
      <hp:cellAddr colAddr="${n}" rowAddr="0"/>
      <hp:cellSpan colSpan="1" rowSpan="1"/>
      <hp:cellSz width="${t[n]}" height="1200"/>
      <hp:cellMargin left="141" right="141" top="141" bottom="141"/>
    </hp:tc>
  `).join(``),r=e.length+1,i=[`<hp:tr>${n}</hp:tr>`];return e.forEach((e,n)=>{let r=n+1,a=e.phaseBadge?`\n(${e.phaseBadge})`:``,o=[`${e.num}차시${a}`,e.title||``,e.summary||``,e.eval||``].map((e,n)=>`
      <hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="3">
        <hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">
          <hp:p id="0" paraPrIDRef="${n===0?`2`:`0`}" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
            <hp:run charPrIDRef="0"><hp:t>${S(e)}</hp:t></hp:run>
          </hp:p>
        </hp:subList>
        <hp:cellAddr colAddr="${n}" rowAddr="${r}"/>
        <hp:cellSpan colSpan="1" rowSpan="1"/>
        <hp:cellSz width="${t[n]}" height="1600"/>
        <hp:cellMargin left="141" right="141" top="141" bottom="141"/>
      </hp:tc>
    `).join(``);i.push(`<hp:tr>${o}</hp:tr>`)}),`<hp:p id="1900500000" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:tbl id="1900500001" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="${r}" colCnt="4" cellSpacing="0" borderFillIDRef="3" noAdjust="0"><hp:sz width="40000" widthRelTo="ABSOLUTE" height="${1200+e.length*1600}" heightRelTo="ABSOLUTE" protect="0"/><hp:pos treatAsChar="0" affectLSpacing="0" flowWithText="1" allowOverlap="1" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="COLUMN" vertAlign="TOP" horzAlign="CENTER" vertOffset="0" horzOffset="0"/><hp:outMargin left="0" right="0" top="141" bottom="283"/><hp:inMargin left="141" right="141" top="141" bottom="141"/>${i.join(``)}</hp:tbl><hp:t></hp:t></hp:run></hp:p>`}async function E(e,t,n=null){try{let r=await x(),i=null,a=!1;if(n&&n.byteLength>0){if(n.byteLength>31457280)throw Error(`서식 파일 크기가 30MB를 초과하여 안전상 처리할 수 없습니다.`);let e=new Uint8Array(n.slice(0,4));if(e[0]!==80||e[1]!==75||e[2]!==3||e[3]!==4)throw Error(`올바른 HWPX(Zip 압축) 문서 형식이 아닙니다.`);try{let e=await r.loadAsync(n);e.file(`Contents/section0.xml`)?(i=e,a=!0):console.warn(`등록된 파일에 Contents/section0.xml이 없어 표준 템플릿을 대체 사용합니다.`)}catch(e){console.warn(`커스텀 템플릿 파싱 실패, 표준 템플릿으로 자동 대체됩니다:`,e)}}if(!i){let e=atob(m),t=e.length,n=new Uint8Array(t);for(let r=0;r<t;r++)n[r]=e.charCodeAt(r);i=await r.loadAsync(n.buffer)}let o=i.file(`Contents/section0.xml`);if(!o)throw Error(`HWPX 템플릿 내에 Contents/section0.xml이 존재하지 않습니다.`);let s=await o.async(`string`),{docTitle:c,orgName:l,docSummary:u,bodyParagraphs:d,locationName:f}=w(e,t),p=/(<hp:fieldBegin\b[^>]*name=["']제목["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;p.test(s)&&(s=s.replace(p,`$1<hp:t>${S(c)}</hp:t>`));let h=/(<hp:fieldBegin\b[^>]*name=["']작성기관["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;h.test(s)&&(s=s.replace(h,`$1<hp:t>${S(l)}</hp:t>`));let g=/(<hp:fieldBegin\b[^>]*name=["']요약설명["'][^>]*>[\s\S]*?<\/hp:fieldBegin><\/hp:ctrl>)/;g.test(s)&&(s=s.replace(g,`$1<hp:t>${S(u)}</hp:t>`));let _=ee(t),v=``;d.forEach((e,t)=>{let n=S(e),r=/^\d+\.\s/.test(e),i=r?`1`:`0`,a=r?`2`:`0`;v+=`<hp:p id="${19e8+t}" paraPrIDRef="${i}" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="${a}"><hp:t>${n}</hp:t></hp:run></hp:p>`,e.startsWith(`5. 차시별 세부 운영 계획`)&&_&&(v+=_)}),s.includes(`</hs:sec>`)?s=s.replace(`</hs:sec>`,`${v}</hs:sec>`):s+=v,i.file(`Contents/section0.xml`,s);let y=T(e,t);i.file(`Preview/PrvText.txt`,y);let b=await i.generateAsync({type:`blob`,mimeType:`application/hwp+zip`,compression:`DEFLATE`,compressionOptions:{level:6}}),C=`현장체험학습_계획서_${f.replace(/[\/\\:*?"<>|]/g,`_`).trim()}.hwpx`,E=URL.createObjectURL(b),D=document.createElement(`a`);return D.href=E,D.download=C,document.body.appendChild(D),D.click(),document.body.removeChild(D),setTimeout(()=>{URL.revokeObjectURL(E)},1500),{success:!0,isCustomTemplate:a,fileName:C}}catch(e){throw console.error(`HWPX 생성 및 다운로드 오류:`,e),e}}function D(e,t={}){let n=Math.min(Math.max(Number(e)||1,1),11),r=s(t);switch(t.locationName,t.schoolLevel,n){case 1:return O(t,r);case 2:return te(t,r);case 3:return ne(t,r);case 4:return re(t,r);case 5:return ie(t,r);case 6:return ae(t,r);case 7:return oe(t,r);case 8:return se(t,r);case 9:return ce(t,r);case 10:return le(t,r);case 11:return ue(t,r);default:return O(t,r)}}function O(e,t){let n=e.schoolLevel||`초등학교`,r=[`3단계 성취기준 풀이 2022 개정 특수교육 '${n}' 교육과정(총 ${i(n).length}개 기준)으로 동기화됩니다.`,n.includes(`초등`)?`기초 생활 습관, 친숙한 사물 탐색, 즐거운 놀이 및 오감 중심의 차시 활동이 자동 배정됩니다.`:n.includes(`중학`)?`실생활 자립, 지역사회 시설 독립 이용, 또래 협력 중심의 역동적 활동이 자동 배정됩니다.`:`직무 탐색, 직업 에티켓, 성인기 전환 교육 및 실전 자립 프로젝트가 기본 모델로 채택됩니다.`],a=[];return n!==`중학교`&&a.push({id:`prop-step1-mid`,title:`중학교 교육과정으로 전환`,reason:`자립 생활과 또래 소통 활동을 균형 있게 다루려면 중학교 과정이 적합합니다.`,patch:{changes:{schoolLevel:`중학교`}}}),n!==`고등학교`&&a.push({id:`prop-step1-high`,title:`고등학교(직무·진로)로 전환`,reason:`현장 실전 직무 체험과 성인기 전환 역량을 강화할 수 있습니다.`,patch:{changes:{schoolLevel:`고등학교`}}}),{step:1,summary:`현재 '${n}' 교육과정이 설정되어 있습니다.`,forecasts:r,proposals:a,warnings:[],quickPrompts:[`중학교 교육과정으로 바꾸면 어떻게 달라져?`,`고등학교 직업·진로 연계 기준이 포함돼?`,`초등학교 수준에 최적화된 추천 활동을 알려줘`]}}function te(e,t){let n=e.locationName||`미지정`,r=t.locCategory,i=B(e.locationId,n),a=[`장소 카테고리가 '${{mart:`대형마트/상점 (경제·화폐)`,cafe:`카페/베이커리 (의사소통·직업)`,nature:`자연/수목원 (생태·오감)`,museum:`박물관/전시관 (문화·관람)`,transit:`대중교통/역사 (보행·안전)`,farm:`농장/스마트팜 (노작·자연)`,public:`공공기관/도서관 (질서·이용)`,culture:`문화/여가시설 (여가·에티켓)`,general:`일반 지역사회 시설`}[r]||r}'(으)로 분류되어 3단계에서 관련 핵심 성취기준이 최상위로 추천됩니다.`,`10단계 세부 계획안에 '${n}' 전용 미션("${i.pptMission}")과 맞춤 사전·현장·사후 활동 팩이 결합됩니다.`,`장소 특성에 따라 8단계에서 배리어 프리(무단차, 쉼터 등) 맞춤 안전 전략이 가이드됩니다.`],o=[];e.locationId!==`loc-mart`&&o.push({id:`prop-step2-mart`,title:`대형마트 / 전통시장으로 선택`,reason:`물건 고르기, 가격 계산, 결제 등 자립 필수 기능을 훈련하기 가장 대중적인 장소입니다.`,patch:{changes:{locationId:`loc-mart`,locationName:`대형마트 / 전통시장`}}}),e.locationId!==`loc-cafe`&&o.push({id:`prop-step2-cafe`,title:`베이커리 / 카페로 선택`,reason:`키오스크 주문 및 음료 수령, 직원 대화 등 의사소통 중심 현장 훈련에 최적입니다.`,patch:{changes:{locationId:`loc-cafe`,locationName:`베이커리 / 카페`}}});let s=[];return(!e.locationName||e.locationName.trim().length<2)&&s.push(`구체적인 체험학습 장소명을 2자 이상 입력해 주셔야 맞춤 활동이 원활히 연결됩니다.`),{step:2,summary:`'${n}' 장소가 선택되었습니다.`,forecasts:a,proposals:o,warnings:s,quickPrompts:[`이 장소에서 가장 추천하는 활동은 뭐야?`,`대형마트 대신 카페나 베이커리로 변경해줘`,`휠체어 이동이 편리한 수목원으로 바꿔줘`]}}function ne(e,t){let n=Array.isArray(e.standards)?e.standards:[],r=n.length,i=a(e.schoolLevel,e.locationId),o=[`등록된 ${r}개 성취기준의 키워드 분석을 통해 4단계 추천 주제와 6단계 평가 중점이 조율됩니다.`,`10단계 차시별 세부 지도안에 각 성취기준(${n.map(e=>e.code).slice(0,3).join(`, `)}${r>3?` 외`:``})이 차시별 학습 요소로 자동 분배됩니다.`],s=[],c=i.find(e=>!n.some(t=>t.code===e.code));c&&s.push({id:`prop-step3-add-rec`,title:`추천 기준 추가: ${c.code}`,reason:`'${e.locationName}' 체험에 가장 밀접한 [${c.subject}] 성취기준입니다.`,patch:{changes:{standards:[...n,{...c,id:`std-coach-${Date.now()}`}]}}});let l=[];return r===0?l.push(`성취기준이 최소 1개 이상 등록되어야 10단계 교육과정안이 정상 생성됩니다.`):r>5&&l.push(`성취기준이 6개 이상이면 특수교육 현장체험학습 시 학생의 학습 부담이 커질 수 있습니다. 핵심 2~4개를 권장합니다.`),{step:3,summary:`현재 ${r}개의 국가/직접 성취기준이 등록되어 있습니다.`,forecasts:o,proposals:s,warnings:l,quickPrompts:[`이 장소에 딱 맞는 추천 성취기준 1개 더 추가해줘`,`안전 및 공공질서 관련 성취기준을 넣어줘`,`실생활 자립 중심 성취기준으로 골라줘`]}}function re(e,t){let n=e.theme||``,r=c(e),i=[`설정하신 주제('${n}')를 바탕으로 7단계 3차원 학습 목표의 문맥이 구체화됩니다.`,`10단계 최종 교육과정안 및 11단계 HWPX 공문서 기안문의 공식 프로젝트명으로 자동 등재됩니다.`],a=[];return r.filter(e=>e.theme!==n).slice(0,2).forEach((e,t)=>{a.push({id:`prop-step4-theme-${t}`,title:`주제 변경: ${e.theme}`,reason:`${e.reasonBadge} 중심의 매력적인 배움 프로젝트입니다.`,patch:{changes:{theme:e.theme}}})}),{step:4,summary:`체험 프로젝트 주제: "${n}"`,forecasts:i,proposals:a,warnings:[],quickPrompts:[`더 신나고 학생 친화적인 제목으로 바꿔줘`,`자립 실천과 안전을 강조하는 주제로 추천해줘`,`공문서 기안에 어울리는 공식적인 표현으로 다듬어줘`]}}function ie(e,t){let n=parseInt(e.periodCount,10)||10,r=e.difficultyLevel||`기본/적용 수준`,i=Y(n),a=[`총 ${n}차시가 '사전 ${i.pre}차시 : 현장 ${i.field}차시 : 사후 ${i.post}차시'의 최적 황금 비율(4:2:4)로 분배됩니다.`,`'${r}' 설정에 맞추어 10단계 활동지 난이도(${r.includes(`기초`)?`실물·사진 스티커 중심`:r.includes(`심화`)?`자기주도 미션·계산`:`시각 단서 및 단계적 모델링`})가 연결됩니다.`],o=[];n!==8&&(Y(8),o.push({id:`prop-step5-period-8`,title:`8차시로 조정 (사전 3 : 현장 2 : 사후 3)`,reason:`교실 사전 훈련과 사후 정산을 내실 있게 유지하면서도 부담 없는 컴팩트한 차시입니다.`,patch:{changes:{periodCount:8}}})),r.includes(`기초`)||o.push({id:`prop-step5-diff-basic`,title:`기초/탐색 수준으로 변경`,reason:`시각 단서, 사진 스티커 짝 맞추기 등 지원 요구가 높은 학생들에게 편안한 수업을 제공합니다.`,patch:{changes:{difficultyLevel:`기초/탐색 수준 (상당한 도움 및 1:1 신체적·언어적 촉진 제공)`}}});let s=[];return n<4&&s.push(`차시 수가 4차시 미만이면 사전 모의 훈련이나 사후 정산 활동이 생략될 수 있습니다.`),{step:5,summary:`총 ${n}차시 (사전 ${i.pre} / 현장 ${i.field} / 사후 ${i.post}), ${r}`,forecasts:a,proposals:o,warnings:s,quickPrompts:[`단기 집중형(4~6차시)으로 차시를 줄여줘`,`차시를 10차시로 넉넉하게 늘려줘`,`기초 탐색 수준으로 난이도를 낮춰줘`]}}function ae(e,t){let n=e.evalFocusTitle||`독립적 수행도`,r=u(e),i=[`'${n}'을(를) 기준으로 7단계의 3차원 학습 목표(지식·기능·태도)가 실시간 정렬됩니다.`,`10단계 세부 계획안의 차시별 평가 관점과 관찰 체크리스트 문구가 이 평가 중점을 중심으로 기술됩니다.`],a=[];return r.filter(t=>t.id!==e.evalFocusId).slice(0,2).forEach((e,t)=>{a.push({id:`prop-step6-focus-${t}`,title:`평가 중점 변경: ${e.title}`,reason:`${e.reasonBadge}: ${e.desc}`,patch:{changes:{evalFocusId:e.id,evalFocusTitle:e.title}}})}),{step:6,summary:`선택된 평가 중점: "${n}"`,forecasts:i,proposals:a,warnings:[],quickPrompts:[`의사소통 및 상호작용 중심으로 평가를 맞출래`,`독립적 자립 생활 수행도 평가로 바꿔줘`,`공공장소 안전 및 기본 규칙 평가를 강조해줘`]}}function oe(e,t){let n=d(e),r=[`작성된 지식·기능·태도 3차원 목표는 10단계 프로젝트 개요 및 11단계 HWPX 공문서 "2. 학습 목표" 표에 1:1로 반영됩니다.`,`특수교육 개별화교육계획(IEP)의 단기 교육목표와 직접 연계하여 활용할 수 있습니다.`],i=[{id:`prop-step7-refresh`,title:`평가 중점 최적화 목표로 재설정`,reason:`현재 선택된 평가 중점('${e.evalFocusTitle}') 및 장소에 최적화된 표준 3차원 목표로 갱신합니다.`,patch:{changes:{goalKnowledge:n.goalKnowledge,goalSkill:n.goalSkill,goalAttitude:n.goalAttitude}}}],a=[];return(!e.goalKnowledge||!e.goalSkill||!e.goalAttitude)&&a.push(`지식, 기능, 태도 세 영역의 목표가 모두 채워져야 공문서 양식에 빈칸 없이 반영됩니다.`),{step:7,summary:`지식·기능·태도 3차원 학습 목표 수립 중`,forecasts:r,proposals:i,warnings:a,quickPrompts:[`AAC 상징판을 활용하는 기능 목표로 보완해줘`,`목표 문장을 더 쉽고 직관적으로 다듬어줘`,`현재 목표가 성취기준과 잘 맞는지 검토해줘`]}}function se(e,t){let n=Array.isArray(e.functionalNeeds)?e.functionalNeeds:[],r=n.join(` `),i=[`등록된 지원 사항이 9단계 교수학습 방식(시각 일과표, AAC, 안전 동행) 추천 점수에 가중치를 부여합니다.`,`10단계 UDL 맞춤 지원 전략 및 11단계 HWPX "학생 안전 및 이동 지원 계획" 표에 그대로 삽입됩니다.`],a=[];/휠체어|경사로|무단차/.test(r)||a.push({id:`prop-step8-wheelchair`,title:`+ 휠체어 이동 지원 태그 추가`,reason:`배리어 프리 무단차 경사로 동선 및 엘리베이터 안전 확인이 포함됩니다.`,patch:{changes:{functionalNeeds:[...n,`휠체어 이동 지원 1명 (무단차 경사로 필요)`]}}}),/aac|의사소통|상징/.test(r)||a.push({id:`prop-step8-aac`,title:`+ AAC 의사소통 지원 태그 추가`,reason:`그림 상징판 및 스마트 AAC를 통한 현장 주문/인사 지원이 활성화됩니다.`,patch:{changes:{functionalNeeds:[...n,`AAC 그림 상징판 및 스마트 보완의사소통 지원 1명`]}}});let o=[];return/010-\d{4}-\d{4}|\d{2,3}-\d{3,4}-\d{4}/.test(r)&&o.push(`⚠️ 개인정보 경고: 전화번호가 포함되어 있습니다. 학생 안전을 위해 전화번호는 삭제해 주세요.`),{step:8,summary:`현재 ${n.length}개의 맞춤 지원 요구가 등록되어 있습니다.`,forecasts:i,proposals:a,warnings:o,quickPrompts:[`휠체어 무단차 동선 지원 태그 추가해줘`,`소음 민감 학생을 위한 쉼터 지원 추가해줘`,`돌발 이탈 예방 1:1 안전 동행을 넣어줘`]}}function ce(e,t){let n=e.teachingMethod||`프로젝트 학습 (PBL)`,r=p(e),i=[`'${n}'에 맞추어 10단계 사전·현장·사후 차시의 교수학습 전개 방식(도입-전개-정리)이 특화됩니다.`,`11단계 HWPX 공문서 지도안의 "수업 모형 및 교수학습 방법" 항목에 기술됩니다.`],a=[];return r.filter(e=>!n.includes(e.name)).slice(0,2).forEach((e,t)=>{a.push({id:`prop-step9-method-${t}`,title:`수업 방식 변경: ${e.name}`,reason:`${e.badge}: ${e.desc}`,patch:{changes:{teachingMethod:e.name}}})}),{step:9,summary:`선택된 교수학습 방식: "${n}"`,forecasts:i,proposals:a,warnings:[],quickPrompts:[`상황 모의 훈련(교실 롤플레잉) 중심 방식으로 바꿔줘`,`체험 중심 직접 교수법으로 설정해줘`,`협동 프로젝트 학습(PBL)으로 진행할래`]}}function le(e,t){return{step:10,summary:`UDL 10개 차시별 상세 지도안 생성 완료`,forecasts:[`전체 1~9단계의 모든 선택과 맞춤 데이터가 UDL 차시별 상세 지도안으로 완벽히 통합되었습니다.`,`상단 [한글(HWPX) 다운로드] 버튼을 누르면 표준 한글 양식으로 즉시 내려받을 수 있습니다.`],proposals:[],warnings:[],quickPrompts:[`전체 계획안의 정합성을 검토해줘`,`차시별 활동에 빠진 안전 수칙이 있는지 점검해줘`,`공문서 기안 서식(11단계)으로 이동할게`]}}function ue(e,t){return{step:11,summary:`공문서 기안 서식(.hwpx) 준비 완료`,forecasts:[`설계된 교육과정이 공문서 표준 서식(표, 개조식 번호 체계, 결재선)에 100% 자동 합성되었습니다.`,`학교 고유 서식이 있다면 [학교 전용 서식 등록]을 통해 학교 고유 틀을 그대로 유지하며 내용을 채울 수 있습니다.`],proposals:[],warnings:[],quickPrompts:[`학교 자체 HWPX 양식에 어떻게 적용해?`,`결재 올리기 전 최종 점검할 항목이 뭐야?`,`클립보드에 전체 내용 복사하는 방법 알려줘`]}}function de(e,t,n){if(!n||typeof n!=`string`||!n.trim())return{replyText:`궁금한 점이나 수정하고 싶은 내용을 말씀해 주시면 맞춤 제안을 드릴게요! (예: "8차시로 줄여줘", "더 쉬운 주제로 바꿔줘")`,proposal:null};let r=n.trim().toLowerCase(),i=Number(e)||1,a=r.match(/(\d{1,2})\s*차시/);if(a){let e=parseInt(a[1],10);if(e>=1&&e<=30)return{replyText:`총 차시를 ${e}차시로 변경하는 제안을 준비했습니다. 아래 [적용하기]를 누르시면 사전·현장·사후 황금 비율(4:2:4)로 즉시 재분배됩니다.`,proposal:{id:`intent-period-${Date.now()}`,title:`${e}차시로 변경`,reason:`교사 요청: ${e}차시 재분배`,patch:{changes:{periodCount:e}}}}}if(/차시.*(줄|감소|적게|축소|단기)/.test(r)){let e=parseInt(t.periodCount,10)||10,n=Math.max(e-2,4);return{replyText:`현재 ${e}차시에서 조금 더 집중적인 ${n}차시로 축소하는 제안입니다.`,proposal:{id:`intent-period-reduce-${Date.now()}`,title:`${n}차시로 단축`,reason:`현장 중심 단기 집중형 차시 구성`,patch:{changes:{periodCount:n}}}}}if(/차시.*(늘|확장|길게|많이)/.test(r)){let e=parseInt(t.periodCount,10)||10,n=Math.min(e+2,16);return{replyText:`현재 ${e}차시에서 사전 모의훈련과 사후 나눔을 더 넉넉히 다룰 수 있는 ${n}차시로 확대하는 제안입니다.`,proposal:{id:`intent-period-expand-${Date.now()}`,title:`${n}차시로 확장`,reason:`사전 훈련 및 사후 심화 시간 추가 확보`,patch:{changes:{periodCount:n}}}}}if(/기초|쉬운|하향|낮춰|탐색 수준|실물/.test(r))return{replyText:`실물 및 사진 단서 중심의 "기초/탐색 수준"으로 난이도를 변경합니다. 10단계 활동지에서 실물 스티커 짝 맞추기 및 시각적 안내가 기본으로 제공됩니다.`,proposal:{id:`intent-diff-basic-${Date.now()}`,title:`기초/탐색 수준으로 변경`,reason:`시각적 단서 및 전폭적 촉진 지원`,patch:{changes:{difficultyLevel:`기초/탐색 수준 (상당한 도움 및 1:1 신체적·언어적 촉진 제공)`}}}};if(/심화|높여|상향|자기주도|독립 수행/.test(r))return{replyText:`자기주도 미션 및 계산 역량을 강조하는 "심화/자립 수준"으로 난이도를 변경합니다.`,proposal:{id:`intent-diff-adv-${Date.now()}`,title:`심화/자립 수준으로 변경`,reason:`독립 수행 및 자기주도적 문제해결 중심`,patch:{changes:{difficultyLevel:`심화/자립 수준 (최소한의 안내로 스스로 판단하고 독립적으로 완수)`}}}};if(/초등/.test(r)&&t.schoolLevel!==`초등학교`)return{replyText:`초등학교 교육과정으로 변경합니다. 성취기준과 활동 팩이 초등 특수교육 수준으로 재정렬됩니다.`,proposal:{id:`intent-school-elem-${Date.now()}`,title:`초등학교 교육과정으로 변경`,reason:`초등 특수교육과정 연계`,patch:{changes:{schoolLevel:`초등학교`}}}};if(/중학/.test(r)&&t.schoolLevel!==`중학교`)return{replyText:`중학교 교육과정으로 변경합니다. 실생활 자립 및 시설 이용 중심의 성취기준이 추천됩니다.`,proposal:{id:`intent-school-mid-${Date.now()}`,title:`중학교 교육과정으로 변경`,reason:`중학교 실생활 자립 중심 재구성`,patch:{changes:{schoolLevel:`중학교`}}}};if(/고등|전공과|직업|진로/.test(r)&&t.schoolLevel!==`고등학교`)return{replyText:`고등학교(직무·진로) 교육과정으로 변경합니다. 성인기 전환 및 현장 직무 탐색 활동이 강화됩니다.`,proposal:{id:`intent-school-high-${Date.now()}`,title:`고등학교 교육과정으로 변경`,reason:`직무 탐색 및 성인기 전환 역량 강화`,patch:{changes:{schoolLevel:`고등학교`}}}};if(/의사소통|상호작용|소통|대화|aac/.test(r))return{replyText:`평가 중점을 "의사소통 및 상호작용 (AAC / 구어)"으로 변경합니다. 7단계 학습 목표와 10단계 평가표가 직원·친구와의 대화 및 표현 역량 중심으로 맞춰집니다.`,proposal:{id:`intent-focus-comm-${Date.now()}`,title:`의사소통 및 상호작용 평가로 변경`,reason:`현장 상호작용 및 AAC 의사소통 역량 집중 평가`,patch:{changes:{evalFocusId:`eval-communication`,evalFocusTitle:`의사소통 및 상호작용 (AAC / 구어)`}}}};if(/자립|독립|스스로|생활 기능/.test(r))return{replyText:`평가 중점을 "독립적 수행도 (자립 생활 역량)"으로 변경합니다. 최소한의 촉진으로 스스로 완수하는 과정을 관찰합니다.`,proposal:{id:`intent-focus-indep-${Date.now()}`,title:`독립적 수행도 (자립 생활 역량) 평가로 변경`,reason:`일상생활 자립 및 현장 미션 독립 수행 중심`,patch:{changes:{evalFocusId:`eval-independence`,evalFocusTitle:`독립적 수행도 (자립 생활 역량)`}}}};if(/안전|규칙|질서|보행/.test(r))return{replyText:`평가 중점을 "안전 수칙 준수 및 공공 에티켓"으로 변경합니다. 보행 안전 및 공공장소 에티켓 실천도를 중심으로 관찰 평가가 진행됩니다.`,proposal:{id:`intent-focus-safety-${Date.now()}`,title:`안전 수칙 준수 및 공공 에티켓 평가로 변경`,reason:`보행 안전 및 비상시 대처 수칙 준수 중심`,patch:{changes:{evalFocusId:`eval-safety`,evalFocusTitle:`안전 수칙 준수 및 공공 에티켓`}}}};let o=Array.isArray(t.functionalNeeds)?t.functionalNeeds:[];if(/휠체어|무단차|경사로|승강기|엘리베이터/.test(r)){let e=`휠체어 이동 지원 1명 (무단차 경사로 필요)`;if(!o.includes(e))return{replyText:`휠체어 이동 학생을 위한 맞춤 지원 사항을 추가합니다. 10단계와 11단계 공문서에 무단차 동선 및 승강기 탑승 안전 계획이 명시됩니다.`,proposal:{id:`intent-need-wheelchair-${Date.now()}`,title:`+ 휠체어 무단차 동선 지원 추가`,reason:`배리어 프리 이동 지원 확보`,patch:{changes:{functionalNeeds:[...o,e]}}}}}if(/소음|감각|쉼터|시끄|조용한/.test(r)){let e=`소음 민감성 대비 저소음 휴식 쉼터 동선 1명`;if(!o.includes(e))return{replyText:`청각/감각 민감 학생을 위한 쉼터 동선 지원을 추가합니다. 현장 이동 시 사전 쉼터 위치 파악이 지도안에 포함됩니다.`,proposal:{id:`intent-need-sensory-${Date.now()}`,title:`+ 저소음 쉼터 동선 지원 추가`,reason:`감각 과부하 예방 및 휴식 지원`,patch:{changes:{functionalNeeds:[...o,e]}}}}}if(/이탈|동행|1:1|밀착|돌발/.test(r)){let e=`돌발 이탈 예방 1:1 보조인력 밀착 동행 1명`;if(!o.includes(e))return{replyText:`돌발 이탈 예방을 위한 1:1 보조인력 밀착 동행 지원을 추가합니다. 공문서 안전 관리 계획에 전담 안전 인력 배치가 반영됩니다.`,proposal:{id:`intent-need-escort-${Date.now()}`,title:`+ 1:1 안전 동행 인력 지원 추가`,reason:`현장 돌발 위험 예방 및 밀착 안전 확보`,patch:{changes:{functionalNeeds:[...o,e]}}}}}if(/모의|롤플|역할놀이|시뮬레이션/.test(r))return{replyText:`수업 방식을 "상황 모의 훈련 및 역할놀이"로 변경합니다. 교실에서 사전 모의 부스를 차려 현장 행동을 충분히 연습한 뒤 출발합니다.`,proposal:{id:`intent-method-roleplay-${Date.now()}`,title:`상황 모의 훈련 (역할놀이) 방식으로 변경`,reason:`사전 불안 완화 및 단계적 모델링 훈련`,patch:{changes:{teachingMethod:`상황 모의 훈련 및 역할놀이`}}}};if(/직접 교수|단계적 모델링|설명|시범/.test(r))return{replyText:`수업 방식을 "체험 중심 직접 교수법"으로 변경합니다. 교사의 명확한 시범-안내된 연습-독립 연습 순서로 지도안이 재구성됩니다.`,proposal:{id:`intent-method-direct-${Date.now()}`,title:`체험 중심 직접 교수법으로 변경`,reason:`명시적 시범 및 체계적 단계별 촉진 제공`,patch:{changes:{teachingMethod:`체험 중심 직접 교수법`}}}};if(/주제|프로젝트명|제목|이름/.test(r)){let e=c(t),n=e.find(e=>e.theme!==t.theme)||e[0];if(n)return{replyText:`현재 맥락(${t.locationName}, ${t.schoolLevel})에 맞춘 새로운 주제 후보("${n.theme}")를 제안합니다. 마음에 드시면 적용해 보세요.`,proposal:{id:`intent-theme-alt-${Date.now()}`,title:`주제 변경: ${n.theme}`,reason:`${n.reasonBadge} 중심의 새로운 배움 프로젝트`,patch:{changes:{theme:n.theme}}}}}if(/목표|지식|기능|태도/.test(r)){let e=d(t);return{replyText:`현재 평가 중점("${t.evalFocusTitle}")과 주제에 가장 적합한 3차원 학습 목표(지식·기능·태도) 세트를 새롭게 합성했습니다.`,proposal:{id:`intent-goals-refresh-${Date.now()}`,title:`3차원 학습 목표 일괄 갱신`,reason:`평가 중점 및 장소 연계 최신 목표 합성`,patch:{changes:{goalKnowledge:e.goalKnowledge,goalSkill:e.goalSkill,goalAttitude:e.goalAttitude}}}}}return{replyText:{1:`1단계에서는 지도하실 학생들의 학령기에 맞는 학교급을 선택해 주세요. 초등은 생활체험 중심, 중등은 실생활 자립, 고등은 직무/진로 교육과정이 연결됩니다.`,2:`2단계에서는 방문할 장소를 선택하거나 직접 입력해 주세요. 장소에 맞추어 사전·현장·사후 활동 팩과 추천 성취기준이 자동으로 준비됩니다.`,3:`3단계에서는 이번 체험에서 달성할 성취기준을 2~4개 선택해 주세요. [장소 특화 추천] 항목을 클릭하면 손쉽게 등록할 수 있습니다.`,4:`4단계에서는 체험학습의 주제를 정합니다. 추천 목록에서 하나를 고르거나, 직접 수정 입력란에서 원하는 문구로 다듬을 수 있습니다.`,5:`5단계에서는 수업 차시(권장 8~10차시)와 학생 발달 수준에 맞는 난이도를 선택해 주세요. 황금 비율(4:2:4)로 차시가 자동 배분됩니다.`,6:`6단계에서는 이번 체험에서 가장 중점적으로 관찰·평가할 영역(자립, 의사소통, 안전 등)을 선택해 주세요. 이후 목표와 평가 기준에 반영됩니다.`,7:`7단계에서는 지식·기능·태도 3차원 목표를 확인하고 필요시 어휘를 수정해 주세요. 평가 중점에 맞게 자동 완성되어 있습니다.`,8:`8단계에서는 휠체어 이동, 시각 일과표, AAC 등 학생들의 개별 지원 요구를 선택해 주세요. 개인정보(실명 등)는 기재하지 않도록 주의해 주세요.`,9:`9단계에서는 배움을 이끌 교수학습 방식을 선택합니다. 상황 모의 훈련이나 프로젝트 학습(PBL)이 특수교육 현장에서 널리 활용됩니다.`,10:`10단계에서는 완성된 UDL 10차시 계획안을 검토하고, 한글(HWPX) 또는 PDF로 다운로드할 수 있습니다.`,11:`11단계에서는 공문서 기안 서식에 반영된 최종 문서를 확인하고 학교 표준 서식으로 출력할 수 있습니다.`}[i]||`현재 단계의 설정을 검토 중입니다. 원하시는 조건(차시, 주제, 목표, 지원 요구 등)을 말씀해 주시면 바로 수정 제안을 만들어 드릴게요!`,proposal:null}}var k=new Set([`academicYear`,`schoolLevel`,`locationId`,`locationName`,`standards`,`theme`,`themeManuallyEdited`,`periodCount`,`difficultyLevel`,`evalFocusId`,`evalFocusTitle`,`goalKnowledge`,`goalSkill`,`goalAttitude`,`functionalNeeds`,`teachingMethod`]),A={schoolLevel:`학교급`,locationName:`체험 장소`,theme:`체험 주제`,periodCount:`총 차시`,difficultyLevel:`수업 난이도`,evalFocusTitle:`평가 중점`,goalKnowledge:`지식·이해 목표`,goalSkill:`기능·수행 목표`,goalAttitude:`가치·태도 목표`,functionalNeeds:`맞춤 지원 요구`,teachingMethod:`교수학습 방식`,standards:`연계 성취기준`};function j(e,t){if(!e||typeof e!=`object`)throw Error(`Invalid plan object provided to applyPlanPatch.`);if(!t||typeof t!=`object`||!t.changes||typeof t.changes!=`object`)throw Error(`Invalid patch object provided to applyPlanPatch.`);let n=structuredClone(e);for(let[e,r]of Object.entries(t.changes))if(k.has(e)){if(e===`standards`)Array.isArray(r)&&(n.standards=r.map(e=>({...e})));else if(e===`functionalNeeds`)Array.isArray(r)&&(n.functionalNeeds=r.filter(e=>typeof e==`string`&&e.trim()).map(e=>e.trim()));else if(e===`theme`)n.theme=String(r).trim(),n.themeManuallyEdited=!0;else if(e===`periodCount`){let e=parseInt(r,10);!isNaN(e)&&e>=1&&e<=30&&(n.periodCount=e)}else n[e]=r}return V(n)}function fe(e,t){if(!e||!t)return[];let n=[];for(let r of k){if(r===`themeManuallyEdited`||r===`academicYear`||r===`locationId`||r===`evalFocusId`)continue;let i=e[r],a=t[r];if(r===`standards`){let e=Array.isArray(i)?i.map(e=>e.code).sort().join(`, `):``,t=Array.isArray(a)?a.map(e=>e.code).sort().join(`, `):``;e!==t&&n.push({field:r,label:A[r]||r,oldValue:e||`(없음)`,newValue:t||`(없음)`})}else if(r===`functionalNeeds`){let e=Array.isArray(i)?i.join(`, `):``,t=Array.isArray(a)?a.join(`, `):``;e!==t&&n.push({field:r,label:A[r]||r,oldValue:e||`(없음)`,newValue:t||`(없음)`})}else i!==a&&n.push({field:r,label:A[r]||r,oldValue:i??`(없음)`,newValue:a??`(없음)`})}return n}var M=`fieldtrip_coach_state`,pe=class{constructor(e={}){this.getPlan=e.getPlan||(()=>({})),this.setPlan=e.setPlan||(()=>{}),this.onPlanChanged=e.onPlanChanged||(()=>{}),this.getCurrentStep=e.getCurrentStep||(()=>1),this.showToast=e.showToast||(()=>{}),this.isOpen=!0,this.chatThreads={},this.dismissedProposals=new Set,this.activeForecast=null,this.container=null,this.toggleBtn=null,this.floatingTrigger=null,this.loadState()}loadState(){try{if(typeof sessionStorage>`u`)return;let e=sessionStorage.getItem(M);if(e){let t=JSON.parse(e);t&&typeof t==`object`&&(typeof t.isOpen==`boolean`&&(this.isOpen=t.isOpen),t.chatThreads&&typeof t.chatThreads==`object`&&(this.chatThreads=t.chatThreads))}}catch(e){console.warn(`코치 세션 복원 실패:`,e)}}saveState(){try{if(typeof sessionStorage>`u`)return;sessionStorage.setItem(M,JSON.stringify({isOpen:this.isOpen,chatThreads:this.chatThreads}))}catch(e){console.warn(`코치 세션 저장 실패:`,e)}}mount(){this.container=document.getElementById(`coachSlidePanel`),this.toggleBtn=document.getElementById(`toggleCoachBtn`),this.floatingTrigger=document.getElementById(`floatingCoachTrigger`),this.container&&(this.setupEvents(),this.applyOpenState(),this.refresh())}setupEvents(){this.container&&(this.container.addEventListener(`click`,e=>this.handleClick(e)),this.container.addEventListener(`keydown`,e=>this.handleKeydown(e))),this.toggleBtn&&this.toggleBtn.addEventListener(`click`,()=>this.toggle()),this.floatingTrigger&&this.floatingTrigger.addEventListener(`click`,()=>this.open()),window.addEventListener(`resize`,()=>{window.innerWidth<1024&&this.isOpen})}toggle(){this.isOpen=!this.isOpen,this.applyOpenState(),this.saveState()}open(){this.isOpen=!0,this.applyOpenState(),this.saveState()}close(){this.isOpen=!1,this.applyOpenState(),this.saveState()}applyOpenState(){let e=document.querySelector(`.main-viewport-container`),t=document.getElementById(`coachUnreadBadge`);this.isOpen?(this.container&&this.container.classList.add(`open`),e&&e.classList.add(`coach-open`),this.floatingTrigger&&this.floatingTrigger.classList.add(`hidden`),t&&(t.textContent=`ON`,t.classList.remove(`badge-off`))):(this.container&&this.container.classList.remove(`open`),e&&e.classList.remove(`coach-open`),this.floatingTrigger&&this.floatingTrigger.classList.remove(`hidden`),t&&(t.textContent=`OFF`,t.classList.add(`badge-off`)))}refresh(){if(!this.container)return;let e=this.getCurrentStep(),t=this.getPlan();this.activeForecast=D(e,t),this.render()}render(){if(!this.container||!this.activeForecast)return;let e=this.getCurrentStep(),t=this.activeForecast,n=this.chatThreads[e]||[],r=(t.proposals||[]).filter(e=>!this.dismissedProposals.has(e.id));this.container.innerHTML=`
      <!-- 코치 패널 헤더 -->
      <div class="coach-header">
        <div class="coach-brand">
          <div class="coach-avatar-bubble" aria-hidden="true">
            <span>✨</span>
          </div>
          <div class="coach-title-group">
            <div class="coach-title-row">
              <span class="coach-title">AI 코칭 파트너</span>
              <span class="coach-step-pill">STEP 0${e}</span>
            </div>
            <span class="coach-subtitle">실시간 영향 예측 &amp; 대화형 수정</span>
          </div>
        </div>
        <div class="coach-header-actions">
          <button type="button" class="btn-coach-icon" data-action="coach-close" title="코치 패널 접기" aria-label="코치 패널 닫기">
            ✕
          </button>
        </div>
      </div>

      <!-- 코치 스크롤 본문 -->
      <div class="coach-body" id="coachBody">
        <!-- 1) 다운스트림 예측 카드 -->
        <div class="coach-forecast-card">
          <div class="forecast-card-head">
            <span class="forecast-badge">🔮 실시간 영향 예측</span>
            <span class="forecast-step-info">${N(t.summary)}</span>
          </div>
          <ul class="forecast-list">
            ${t.forecasts.map(e=>`
              <li class="forecast-item">
                <span class="forecast-bullet">•</span>
                <span class="forecast-text">${N(e)}</span>
              </li>
            `).join(``)}
          </ul>

          ${t.warnings.length>0?`
            <div class="coach-warning-box">
              ${t.warnings.map(e=>`
                <div class="coach-warning-item">
                  <span class="warning-icon">⚠️</span>
                  <span>${N(e)}</span>
                </div>
              `).join(``)}
            </div>
          `:``}
        </div>

        <!-- 2) 맞춤 수정 제안 카드 (Active Proposals) -->
        ${r.length>0?`
          <div class="coach-proposals-section">
            <div class="coach-section-label">
              <span>💡 추천 수정 제안 (${r.length})</span>
            </div>
            <div class="coach-proposals-shelf">
              ${r.map(e=>this.renderProposalCard(e)).join(``)}
            </div>
          </div>
        `:``}

        <!-- 3) 대화형 채팅 스레드 -->
        <div class="coach-chat-thread" id="coachChatThread" role="log" aria-live="polite">
          <!-- 웰컴/안내 기본 메시지 -->
          <div class="chat-msg coach-msg">
            <div class="msg-bubble">
              현재 단계(${e}단계)에 맞추어 예상을 제안했습니다. 원하시는 조건(차시, 난이도, 주제, 학생 지원 등)을 편하게 말씀해 주시면 바로 수정해 드릴게요!
            </div>
          </div>

          ${n.map(e=>`
            <div class="chat-msg ${e.sender===`user`?`user-msg`:`coach-msg`}">
              <div class="msg-bubble">
                ${N(e.text)}
              </div>
              ${e.proposal?this.renderProposalCard(e.proposal,!0):``}
            </div>
          `).join(``)}
        </div>
      </div>

      <!-- 4) 추천 빠른 질문 칩 모음 -->
      <div class="coach-quick-prompts-bar">
        ${(t.quickPrompts||[]).slice(0,3).map(e=>`
          <button type="button" class="quick-prompt-chip" data-action="coach-quick-prompt" data-prompt="${N(e)}">
            + ${N(e)}
          </button>
        `).join(``)}
      </div>

      <!-- 5) 하단 채팅 입력창 -->
      <div class="coach-input-bar">
        <label for="coachChatInput" class="sr-only">코치에게 수정 및 질문 입력</label>
        <input type="text" class="coach-text-input" id="coachChatInput" 
               placeholder="예: 8차시로 줄여줘, 의사소통 평가로 바꿔줘" 
               autocomplete="off" />
        <button type="button" class="btn-coach-send" data-action="coach-send" aria-label="메시지 전송">
          <span>전송</span>
        </button>
      </div>
    `,requestAnimationFrame(()=>{let e=document.getElementById(`coachChatThread`);e&&(e.scrollTop=e.scrollHeight)})}renderProposalCard(e,t=!1){let n=this.getPlan(),r=``;if(e.patch&&e.patch.changes)try{let t=fe(n,j(n,e.patch));t.length>0&&(r=t.map(e=>`${e.label}: ${e.oldValue} ➔ ${e.newValue}`).join(`<br>`))}catch{r=``}return`
      <div class="coach-proposal-card ${t?`inline-proposal`:``}" data-prop-id="${N(e.id)}">
        <div class="proposal-card-head">
          <span class="proposal-pill">제안</span>
          <h4 class="proposal-title">${N(e.title)}</h4>
        </div>
        <p class="proposal-reason">${N(e.reason)}</p>
        ${r?`
          <div class="proposal-diff-box">
            <span class="diff-title">변경 예상 내역:</span>
            <div class="diff-content">${r}</div>
          </div>
        `:``}
        <div class="proposal-card-actions">
          <button type="button" class="btn-proposal-apply" data-action="coach-apply-patch" data-prop-id="${N(e.id)}">
            ✓ 지금 적용하기
          </button>
          <button type="button" class="btn-proposal-dismiss" data-action="coach-dismiss-patch" data-prop-id="${N(e.id)}">
            ✕ 건너뛰기
          </button>
        </div>
      </div>
    `}handleClick(e){let t=e.target.closest(`[data-action]`);if(!t)return;let n=t.getAttribute(`data-action`),r=t.getAttribute(`data-prop-id`),i=t.getAttribute(`data-prompt`);switch(n){case`coach-close`:this.close();break;case`coach-quick-prompt`:i&&this.submitMessage(i);break;case`coach-send`:{let e=document.getElementById(`coachChatInput`);if(e&&e.value.trim()){let t=e.value.trim();e.value=``,this.submitMessage(t)}break}case`coach-apply-patch`:r&&this.applyProposalById(r);break;case`coach-dismiss-patch`:r&&(this.dismissedProposals.add(r),this.render(),this.showToast(`제안을 건너뛰었습니다.`,`info`))}}handleKeydown(e){if(e.target&&e.target.id===`coachChatInput`&&e.key===`Enter`){e.preventDefault();let t=e.target.value.trim();t&&(e.target.value=``,this.submitMessage(t))}}submitMessage(e){let t=this.getCurrentStep(),n=this.getPlan();this.chatThreads[t]||(this.chatThreads[t]=[]),this.chatThreads[t].push({sender:`user`,text:e,timestamp:Date.now()});let r=de(t,n,e);this.chatThreads[t].push({sender:`coach`,text:r.replyText,proposal:r.proposal,timestamp:Date.now()}),this.saveState(),this.render()}applyProposalById(e){let t=this.getCurrentStep(),n=this.getPlan(),r=(this.activeForecast?.proposals||[]).find(t=>t.id===e);if(!r&&this.chatThreads[t]){for(let n of this.chatThreads[t])if(n.proposal&&n.proposal.id===e){r=n.proposal;break}}if(!r||!r.patch)this.showToast(`해당 제안을 찾을 수 없습니다.`,`error`);else try{let i=j(n,r.patch);this.dismissedProposals.add(e),this.onPlanChanged(i),this.chatThreads[t]||(this.chatThreads[t]=[]),this.chatThreads[t].push({sender:`coach`,text:`✔️ "${r.title}" 제안을 설계에 성공적으로 반영했습니다!`,timestamp:Date.now()}),this.saveState(),this.refresh(),this.showToast(`'${r.title}' 제안이 반영되었습니다.`,`success`)}catch(e){console.error(`제안 적용 실패:`,e),this.showToast(`제안 적용 중 오류가 발생했습니다.`,`error`)}}};function N(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}var P=`fieldtrip_plan_session_state`,F=new Date().getFullYear(),I={academicYear:new Date().getMonth()>=8?F+1:F,schoolLevel:`초등학교`,locationId:`loc-mart`,locationName:`대형마트 / 전통시장`,standards:[{id:`std-default-1`,code:`[실생활-자립]`,title:`지역사회 참여 및 자립 생활`,subject:`공통`,desc:`지역사회 환경을 탐색하고 실생활 자립 기능 및 안전 수칙을 익혀 실천한다.`}],customStandardInput:``,standardsSearchKeyword:``,standardsSubjectFilter:`전체`,theme:`나 스스로 고르고 결제하는 슬기로운 마트 장보기`,themeManuallyEdited:!1,periodCount:10,difficultyLevel:`기본/적용 수준 (시각적 단서 및 단계적 모델링)`,evalFocusId:`eval-independence`,evalFocusTitle:`독립적 수행도 (자립 생활 역량)`,goalKnowledge:`지역사회 매장의 구조와 물건 구매 및 결제 절차를 이해한다.`,goalSkill:`시각 단서와 AAC를 활용하여 필요한 물건을 찾고 결제 과정을 독립적으로 수행한다.`,goalAttitude:`공공장소 에티켓과 보행 안전 수칙을 지키며 즐겁게 참여한다.`,functionalNeeds:[`휠체어 이동 지원 1명 (무단차 경사로 필요)`,`시각적 단계별 일과표 및 사진 단서 필요 2명`,`소음 민감성 대비 저소음 휴식 쉼터 동선 1명`],teachingMethod:`프로젝트 학습 (PBL)`,uploadedFileName:``,uploadedFileMerged:!1},L={step:1,plan:structuredClone(I),uploadedTemplateBuffer:null,standardsDisplayLimit:20,standardsCurriculumPage:1,standardsPageSize:4,themeCycleIndex:0,showAllEvalFocus:!1,showAllTeachingMethods:!1},R=new pe({getPlan:()=>L.plan,setPlan:e=>{L.plan=e},getCurrentStep:()=>L.step,onPlanChanged:e=>{L.plan=e,H(),q(L.step)},showToast:(e,t)=>$(e,t)}),z={"loc-mart":{preIntro:`방문할 대형마트와 전통시장의 위치와 판매 구역을 알아봅니다.`,preBody:`필요한 물품 사진 카드를 고르고 나만의 쇼핑 목록 및 예산 계획서 작성하기.`,preOutro:`장바구니와 계산 모의 연습을 마치고 체크리스트를 확인합니다.`,fieldIntro:`마트 입구에서 장바구니를 챙기고 이동 동선과 비상구를 확인합니다.`,fieldBody:`진열대에서 목표 물건을 직접 찾고 계산대에서 카드/현금으로 결제 완수하기.`,fieldOutro:`영수증과 구매 물품을 챙기고 계산원에게 감사 인사를 나눕니다.`,postIntro:`영수증 품목과 실제 사 온 물건을 대조하며 정산 활동을 시작합니다.`,postBody:`구매한 물품을 친구들과 나누고 지출 내역 정산 활동지 작성하기.`,postOutro:`스스로 장보기를 해낸 성취감을 나누고 나만의 소감 신문을 완성합니다.`,pptMission:`원하는 물건 1가지 스스로 찾아서 결제하기`,worksheetBasic:`마트 물건 사진 스티커 짝 맞추기 및 영수증 도장 찍기`,worksheetApply:`내가 사고 싶은 물건 2가지 오려 붙이고 가격 적기`,worksheetAdvanced:`정해진 예산(5,000원) 내 물품 목록 및 거스름돈 계산하기`},"loc-cafe":{preIntro:`베이커리 및 카페 공간의 특징과 판매되는 메뉴를 탐색합니다.`,preBody:`음료 및 베이커리 메뉴판 읽기, 키오스크 및 구두 주문 시뮬레이션 연습.`,preOutro:`내가 마시고 싶은 음료 카드와 모의 결제 수단을 준비합니다.`,fieldIntro:`카페에 도착하여 차례대로 줄을 서고 메뉴판을 확인합니다.`,fieldBody:`키오스크 또는 카운터 직원에게 원하는 메뉴를 직접 주문하고 결제하기.`,fieldOutro:`진동벨이 울리면 음료를 안전하게 수령하여 지정된 자리에 착석합니다.`,postIntro:`주문하여 받은 음료와 빵을 감상하며 식음료 에티켓을 되짚어봅니다.`,postBody:`친구들과 간식을 나누어 먹으며 카페 이용 소감과 직업(바리스타) 이야기 나누기.`,postOutro:`음료 잔과 트레이를 퇴식구에 스스로 정리하고 자리를 정돈합니다.`,pptMission:`카운터나 키오스크에서 내 메뉴 직접 주문하고 받아오기`,worksheetBasic:`카페 빵/음료 사진 스티커 붙이기 및 감사 인사 표현하기`,worksheetApply:`주문할 메뉴 픽토그램 선택 및 결제 카드 태그 연습하기`,worksheetAdvanced:`카페 메뉴판 금액 합산하기 및 바리스타 직업 인터뷰 작성`},"loc-garden":{preIntro:`수목원과 생태공원의 계절별 나무와 꽃, 자연환경을 사진으로 만납니다.`,preBody:`숲속 관찰 돋보기와 자연물 채집 봉투를 챙기고 야외 안전 수칙을 익힙니다.`,preOutro:`숲 탐방 지도에서 휠체어 산책로와 쉼터 위치를 확인합니다.`,fieldIntro:`수목원 입구에서 상쾌한 공기를 마시며 숲속 관찰 약속을 다집니다.`,fieldBody:`오감으로 나뭇잎과 꽃의 질감, 향기를 느끼고 떨어진 자연물 관찰 채집하기.`,fieldOutro:`쉼터에 모여 수분 보충을 하고 자연의 소리를 경청하며 휴식합니다.`,postIntro:`채집한 나뭇잎, 솔방울 등 자연물을 책상 위에 펼쳐놓고 관찰합니다.`,postBody:`자연물을 활용한 나만의 액자 만들기 및 숲에서 느낀 감정 나누기.`,postOutro:`친구들의 자연물 작품을 감상하고 환경을 아끼는 마음을 다짐합니다.`,pptMission:`숲길을 따라 안전하게 걸으며 서로 다른 나뭇잎 3종류 찾아보기`,worksheetBasic:`나뭇잎 모양 맞추기 및 초록빛 자연 스티커 붙이기`,worksheetApply:`자연물 프로타주(나뭇잎 탁본) 뜨기 및 질감 낱말 고르기`,worksheetAdvanced:`계절 식물 관찰 일지 작성 및 생태 지도 만들기`},"loc-museum":{preIntro:`박물관과 과학관에 전시된 신기한 유물과 체험 전시물을 탐색합니다.`,preBody:`공공장소 관람 예절(조용히 걷기, 차례 지켜 만지기)과 동선을 숙지합니다.`,preOutro:`전시관 스탬프 투어 용지와 관람 미션 카드를 준비합니다.`,fieldIntro:`전시관 입구에서 안내원의 안내를 듣고 차례를 지켜 입장합니다.`,fieldBody:`체험형 전시물을 조작해보고 안내 표지판을 읽으며 미션 스탬프 찍기.`,fieldOutro:`인원 점검 후 기념 스탬프를 확인하고 질서 있게 퇴장합니다.`,postIntro:`전시관에서 찍은 사진과 완성된 스탬프 투어 지도를 확인합니다.`,postBody:`가장 인상 깊었던 전시물 그림 그리기 및 친구들에게 소개하기.`,postOutro:`전시 관람 매너를 잘 실천한 나를 칭찬하고 수료증을 받습니다.`,pptMission:`조용히 걷는 예절을 지키며 체험 전시물 3가지 완수하기`,worksheetBasic:`전시물 그림 카드 맞추기 및 조용히 걷기 스티커 붙이기`,worksheetApply:`전시물 스탬프 찍기 및 체험 느낌 이모티콘 고르기`,worksheetAdvanced:`내가 큐레이터가 되어 전시물 소개 글 3줄 작성하기`},"loc-transit":{preIntro:`지하철역과 버스터미널의 대중교통 이용 절차를 사진과 영상으로 배웁니다.`,preBody:`교통카드 잔액 확인, 개찰구 카드 태그 및 스크린도어 안전선 지키기 모의 훈련.`,preOutro:`목적지 노선 색깔과 환승역 안내 표지판을 시각 카드로 익힙니다.`,fieldIntro:`역사에 도착하여 유도 블록과 표지판을 보며 승강장으로 이동합니다.`,fieldBody:`교통카드를 태그하고 안전선 안에서 대기 후 질서 있게 승하차 실습하기.`,fieldOutro:`목적지 출구로 안전하게 나와 일행과 함께 다음 행선지를 확인합니다.`,postIntro:`오늘 이용한 교통수단과 승차권을 살펴보며 이동 경험을 되돌아봅니다.`,postBody:`대중교통 안전 수칙 실천 체크리스트를 완성하고 안전 배지 받기.`,postOutro:`혼자서도 안전하게 이동할 수 있다는 자신감을 나누며 일정을 마무리합니다.`,pptMission:`교통카드 스스로 찍고 차례 지켜 승하차하기`,worksheetBasic:`지하철/버스 픽토그램 선 긋기 및 신호등 색칠하기`,worksheetApply:`교통카드 태그 순서 번호 매기기 및 안전선 스티커 붙이기`,worksheetAdvanced:`지하철 노선도에서 출발역-도착역 경로 표시 및 요금 계산`},"loc-farm":{preIntro:`스마트팜과 농촌체험장에서 자라는 친환경 채소와 작물을 알아봅니다.`,preBody:`장갑과 모자 등 수확 복장을 준비하고 안전한 도구 사용법을 익힙니다.`,preOutro:`수확할 작물 사진 카드를 확인하고 바구니를 준비합니다.`,fieldIntro:`농장에 도착하여 농부 선생님의 설명을 듣고 수확 구역으로 이동합니다.`,fieldBody:`익은 열매를 손으로 조심스럽게 따서 바구니에 담고 무게를 재어보기.`,fieldOutro:`수확한 농작물을 상자에 정성스레 포장하고 손을 깨끗이 씻습니다.`,postIntro:`직접 수확해 온 신선한 농작물을 관찰하고 향기를 맡아봅니다.`,postBody:`가족과 친구들에게 선물할 나눔 라벨을 꾸미고 감사 편지 쓰기.`,postOutro:`농부의 노고와 생명의 소중함을 느끼며 오늘의 소감을 나눕니다.`,pptMission:`소중한 농작물 다치지 않게 조심스럽게 수확하기`,worksheetBasic:`채소/과일 실물 사진 스티커 붙이기 및 색칠하기`,worksheetApply:`수확한 열매 개수 세기 및 나눔 상자 이름표 꾸미기`,worksheetAdvanced:`식물의 성장 과정 순서 배열 및 친환경 식물 일기 작성`}};function B(e,t){if(z[e])return z[e];let n=t||`체험학습지`;return{preIntro:`우리가 방문할 ${n}의 시설 환경과 방문 목적을 알아봅니다.`,preBody:`${n}에서 지켜야 할 규칙을 확인하고 나만의 탐험 미션 계획서를 세웁니다.`,preOutro:`개인 준비물과 비상 연락망을 점검하며 안전한 출발을 준비합니다.`,fieldIntro:`${n}에 도착하여 안내 지도를 확인하고 배리어 프리 동선으로 이동합니다.`,fieldBody:`현장에서 계획한 탐험 미션을 친구들과 협력하며 스스로 완수하기.`,fieldOutro:`활동 결과를 정리하고 주변을 정돈한 후 집결지에 모입니다.`,postIntro:`${n}에서 촬영한 활동 사진을 감상하며 배움의 순간을 되짚어봅니다.`,postBody:`활동 결과물을 정리하고 서로의 노력과 성장을 칭찬하는 나눔 활동하기.`,postOutro:`나만의 체험학습 포트폴리오를 완성하고 스스로 해낸 자립심을 기릅니다.`,pptMission:`${n}에서 내 미션 당당하게 완수하기`,worksheetBasic:`${n} 관련 사진 스티커 붙이기 및 참 잘했어요 도장 찍기`,worksheetApply:`내가 참여한 활동 2가지 그림으로 표현하기 및 소감 고르기`,worksheetAdvanced:`${n} 탐험 보고서 작성 및 친구들과 성장 소감 발표하기`}}function me(e,t){switch(e){case 1:return t.schoolLevel?{valid:!0}:{valid:!1,message:`학교급을 선택해 주세요.`};case 2:return!t.locationName||!t.locationName.trim()?{valid:!1,message:`체험학습 장소를 입력하거나 선택해 주세요.`,targetId:`customLocationInput`}:{valid:!0};case 3:return!t.standards||t.standards.length===0?{valid:!1,message:`성취기준을 최소 1개 이상 등록해 주세요.`,targetId:`customStdInputField`}:{valid:!0};case 4:return!t.theme||!t.theme.trim()?{valid:!1,message:`체험학습 주제를 입력해 주세요.`,targetId:`themeInput`}:{valid:!0};case 5:{let e=parseInt(t.periodCount,10);return isNaN(e)||e<1||e>30?{valid:!1,message:`차시 수는 1차시에서 30차시 사이로 입력해 주세요.`,targetId:`periodCountInput`}:{valid:!0}}case 6:return t.evalFocusId?{valid:!0}:{valid:!1,message:`평가 중점을 선택해 주세요.`};case 7:return!t.goalKnowledge?.trim()||!t.goalSkill?.trim()||!t.goalAttitude?.trim()?{valid:!1,message:`3차원 학습 목표(지식·기능·태도)를 모두 입력해 주세요.`}:{valid:!0};default:return{valid:!0}}}function V(e){if(!e||typeof e!=`object`||Array.isArray(e))return structuredClone(I);let t=structuredClone(I);if(typeof e.academicYear==`number`&&e.academicYear>2e3&&e.academicYear<2100&&(t.academicYear=e.academicYear),typeof e.schoolLevel==`string`&&e.schoolLevel.trim()&&(t.schoolLevel=e.schoolLevel.trim()),typeof e.locationId==`string`&&(t.locationId=e.locationId.trim()),typeof e.locationName==`string`&&e.locationName.trim()&&(t.locationName=e.locationName.trim()),Array.isArray(e.standards)){let n=e.standards.filter(e=>e&&typeof e==`object`&&typeof e.code==`string`&&e.code.trim()).map(e=>({id:typeof e.id==`string`?e.id.trim():`std-custom-${Math.random().toString(36).slice(2,7)}`,code:String(e.code).trim(),title:typeof e.title==`string`?e.title.trim():``,subject:typeof e.subject==`string`?e.subject.trim():`공통`,desc:typeof e.desc==`string`?e.desc.trim():``}));n.length>0&&(t.standards=n)}if(typeof e.customStandardInput==`string`&&(t.customStandardInput=e.customStandardInput),typeof e.standardsSearchKeyword==`string`&&(t.standardsSearchKeyword=e.standardsSearchKeyword),typeof e.standardsSubjectFilter==`string`&&(t.standardsSubjectFilter=e.standardsSubjectFilter),typeof e.theme==`string`&&e.theme.trim()&&(t.theme=e.theme.trim()),t.themeManuallyEdited=!!e.themeManuallyEdited,Number.isInteger(e.periodCount)&&e.periodCount>=1&&e.periodCount<=30)t.periodCount=e.periodCount;else if(typeof e.periodCount==`string`){let n=parseInt(e.periodCount,10);!isNaN(n)&&n>=1&&n<=30&&(t.periodCount=n)}return typeof e.difficultyLevel==`string`&&(t.difficultyLevel=e.difficultyLevel.trim()),typeof e.evalFocusId==`string`&&(t.evalFocusId=e.evalFocusId.trim()),typeof e.evalFocusTitle==`string`&&(t.evalFocusTitle=e.evalFocusTitle.trim()),typeof e.goalKnowledge==`string`&&(t.goalKnowledge=e.goalKnowledge.trim()),typeof e.goalSkill==`string`&&(t.goalSkill=e.goalSkill.trim()),typeof e.goalAttitude==`string`&&(t.goalAttitude=e.goalAttitude.trim()),Array.isArray(e.functionalNeeds)&&(t.functionalNeeds=e.functionalNeeds.filter(e=>typeof e==`string`&&e.trim()).map(e=>e.trim())),typeof e.teachingMethod==`string`&&(t.teachingMethod=e.teachingMethod.trim()),typeof e.uploadedFileName==`string`&&(t.uploadedFileName=e.uploadedFileName.trim()),t.uploadedFileMerged=!!e.uploadedFileMerged,t}function he(){try{let e=sessionStorage.getItem(P);if(!e)return;let t=JSON.parse(e);t&&typeof t==`object`&&(Number.isInteger(t.step)&&t.step>=1&&t.step<=11&&(L.step=t.step),t.plan&&typeof t.plan==`object`&&(L.plan=V(t.plan)))}catch(e){console.warn(`세션 복원 실패, 기본값으로 초기화합니다:`,e),L.step=1,L.plan=structuredClone(I)}}function H(){try{let e={...L.plan};sessionStorage.setItem(P,JSON.stringify({step:L.step,plan:e}))}catch(e){console.warn(`세션 저장 실패:`,e)}}function U(){(!L.plan.standards||L.plan.standards.length===0)&&(L.plan.standards=[{id:`std-default-1`,code:`[실생활-자립]`,title:`지역사회 참여 및 자립 생활`,subject:`공통`,desc:`지역사회 환경을 탐색하고 실생활 자립 기능 및 안전 수칙을 익혀 실천한다.`}])}typeof document<`u`&&document.addEventListener(`DOMContentLoaded`,()=>{he(),U(),q(L.step),ge(),R.mount()});function ge(){let e=document.getElementById(`prevStepBtn`),t=document.getElementById(`nextStepBtn`),n=document.getElementById(`resetWizardBtn`);e&&e.addEventListener(`click`,()=>{L.step>1&&K(L.step-1)}),t&&t.addEventListener(`click`,()=>{let e=me(L.step,L.plan);if(e.valid)L.step<11?K(L.step+1):G();else if($(e.message,`error`),e.targetId){let t=document.getElementById(e.targetId);t&&t.focus()}}),n&&n.addEventListener(`click`,()=>{G()});let r=document.getElementById(`cardInteractionBox`);r&&(r.addEventListener(`click`,_e),r.addEventListener(`input`,ve),r.addEventListener(`change`,ye),r.addEventListener(`keydown`,be))}function W(){L.step=1,L.plan=structuredClone(I),L.uploadedTemplateBuffer=null,L.themeCycleIndex=0,L.standardsCurriculumPage=1,L.showAllEvalFocus=!1,L.showAllTeachingMethods=!1,U(),H(),q(1),R&&(R.chatThreads={},R.dismissedProposals.clear(),R.saveState(),R.refresh()),$(`1단계로 돌아왔습니다. 새로 설계를 시작합니다.`,`info`)}function G(){let e=document.getElementById(`resetConfirmDialog`);if(e&&typeof e.showModal==`function`){e.showModal();let t=document.getElementById(`cancelResetBtn`),n=document.getElementById(`confirmResetBtn`),r=()=>{t&&t.removeEventListener(`click`,i),n&&n.removeEventListener(`click`,a),e.removeEventListener(`cancel`,i)},i=()=>{r(),e.close()},a=()=>{r(),e.close(),W()};t&&t.addEventListener(`click`,i,{once:!0}),n&&n.addEventListener(`click`,a,{once:!0}),e.addEventListener(`cancel`,i,{once:!0})}else window.confirm(`작성 중인 모든 내용이 초기화됩니다. 처음부터 다시 설계하시겠습니까?`)&&W()}function K(e){L.step=Math.min(Math.max(e,1),11),H(),q(L.step),window.scrollTo({top:0,behavior:`smooth`}),setTimeout(()=>{let e=document.getElementById(`cardQuestionTitle`);e&&(e.setAttribute(`tabindex`,`-1`),e.focus())},100)}function _e(e){let t=e.target.closest(`[data-action]`);if(!t)return;let n=t.getAttribute(`data-action`),r=t.getAttribute(`data-id`),a=t.getAttribute(`data-val`);switch(n){case`select-school-level`:if(L.plan.schoolLevel!==a){let e=L.plan.schoolLevel;L.plan.schoolLevel=a;let t=i(e),n=new Set(t.map(e=>e.code)),r=L.plan.standards.length;if(L.plan.standards=L.plan.standards.filter(e=>e.code.startsWith(`[직접`)||e.code===`[실생활-자립]`?!0:!n.has(e.code)),L.plan.standards.length===0&&U(),L.plan.standardsSearchKeyword=``,L.plan.standardsSubjectFilter=`전체`,L.standardsCurriculumPage=1,!L.plan.themeManuallyEdited){let e=c(L.plan);e&&e.length>0&&(L.plan.theme=e[0].theme)}H(),q(1);let o=r-L.plan.standards.length;$(`'${a}' 교육과정으로 설정되었습니다.${o>0?` (이전 학교급 기준 ${o}건 정리)`:``}`,`info`)}break;case`select-location`:if(L.plan.locationId=r,L.plan.locationName=a,!L.plan.themeManuallyEdited){let e=c(L.plan);e&&e.length>0&&(L.plan.theme=e[0].theme)}H(),q(2),$(`'${a}' 장소가 선택되었습니다.`,`info`);break;case`toggle-standard`:{let e=r,t=i(L.plan.schoolLevel),n=L.plan.standards.findIndex(t=>t.code===e);if(n>=0)L.plan.standards.splice(n,1),$(`성취기준 선택이 해제되었습니다.`,`info`);else{let n=t.find(t=>t.code===e)||{code:e,title:`선택 성취기준`,subject:`공통`,desc:e};L.plan.standards.push({...n,id:`std-pick-${Date.now()}-${Math.random().toString(36).slice(2,6)}`}),$(`성취기준이 추가되었습니다.`,`success`)}if(!L.plan.themeManuallyEdited){let e=c(L.plan);e&&e.length>0&&(L.plan.theme=e[0].theme)}H(),q(3);break}case`add-custom-standard`:{let e=document.getElementById(`customStdInputField`),t=(e?e.value:L.plan.customStandardInput).trim();if(!t){$(`성취기준 내용을 입력해 주세요.`,`info`);return}let n=t.split(`
`).map(e=>e.trim()).filter(e=>e.length>0),r=0,i=0;for(let e of L.plan.standards){let t=e.code.match(/^\[직접-(\d+)\]$/);if(t){let e=parseInt(t[1],10);e>i&&(i=e)}}for(let e of n){let t=e.match(/^\[([^\]]+)\]\s*(.*)$/),n,a;t?(n=`[${t[1].trim()}]`,a=t[2].trim()||n):(i++,n=`[직접-${i}]`,a=e);let o=`std-custom-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;L.plan.standards.push({id:o,code:n,title:`직접 입력 성취기준`,subject:`직접입력`,desc:a}),r++}if(L.plan.customStandardInput=``,e&&(e.value=``),!L.plan.themeManuallyEdited){let e=c(L.plan);e&&e.length>0&&(L.plan.theme=e[0].theme)}H(),q(3),$(`${r}건의 성취기준이 등록되었습니다.`,`success`);break}case`remove-standard`:{let e=r;L.plan.standards=L.plan.standards.filter(t=>t.id?t.id!==e:t.code!==e),H(),q(3),$(`성취기준이 삭제되었습니다.`,`info`);break}case`filter-standards-subject`:L.plan.standardsSubjectFilter=a,L.standardsCurriculumPage=1,q(3);break;case`page-standards-prev`:L.standardsCurriculumPage>1&&(L.standardsCurriculumPage--,J());break;case`page-standards-next`:L.standardsCurriculumPage++,J();break;case`select-theme`:L.plan.theme=a,L.plan.themeManuallyEdited=!0,H(),q(4),$(`수업 주제가 선택되었습니다.`,`info`);break;case`cycle-themes`:L.themeCycleIndex=(L.themeCycleIndex||0)+1,q(4),$(`새로운 맞춤 추천 주제들을 불러왔습니다.`,`info`);break;case`select-period-count`:{let e=parseInt(a,10);isNaN(e)||(L.plan.periodCount=e,H(),q(5));break}case`select-difficulty`:L.plan.difficultyLevel=a,H(),q(5),$(`수업 난이도가 설정되었습니다.`,`info`);break;case`select-eval-focus`:{let e=a;L.plan.evalFocusId=r,L.plan.evalFocusTitle=e;let t=d(L.plan);L.plan.goalKnowledge=t.knowledge,L.plan.goalSkill=t.skill,L.plan.goalAttitude=t.attitude,H(),q(6),$(`평가 중점이 '${e}'(으)로 설정되었습니다.`,`info`);break}case`toggle-all-eval-focus`:L.showAllEvalFocus=!L.showAllEvalFocus,q(6);break;case`add-functional-tag`:L.plan.functionalNeeds.includes(a)||(L.plan.functionalNeeds.push(a),H(),q(8),$(`지원 요구 사항이 추가되었습니다.`,`info`));break;case`select-teaching-method`:L.plan.teachingMethod=a,H(),q(9),$(`수업 방식이 '${a}'(으)로 설정되었습니다.`,`info`);break;case`toggle-all-teaching-methods`:L.showAllTeachingMethods=!L.showAllTeachingMethods,q(9);break;case`jump-toc-section`:{let e=r,t=document.getElementById(e),n=document.getElementById(`udlPrintArea`);if(t&&n){let e=t.offsetTop-n.offsetTop;n.scrollTo({top:Math.max(0,e-10),behavior:`smooth`})}break}case`download-hwpx`:Ne();break;case`copy-curriculum`:Pe();break;case`print-pdf`:Fe();break;case`reset-all`:G();break;case`trigger-file-upload`:{let e=document.getElementById(`schoolTemplateFileInput`);e&&e.click();break}}}function ve(e){let t=e.target.getAttribute(`data-model`);if(!t)return;let n=e.target.value;switch(t){case`academicYear`:{let e=parseInt(n,10);!isNaN(e)&&e>2e3&&(L.plan.academicYear=e,H());break}case`locationName`:{L.plan.locationName=n;let e=r.find(e=>e.name.trim()===n.trim());if(e?L.plan.locationId=e.id:L.plan.locationId=`loc-custom`,!L.plan.themeManuallyEdited){let e=c(L.plan);e&&e.length>0&&(L.plan.theme=e[0].theme)}H(),document.querySelectorAll(`.choice-bubble-card[data-action='select-location']`).forEach(e=>{let t=e.getAttribute(`data-id`);L.plan.locationId===t?(e.classList.add(`selected`),e.setAttribute(`aria-pressed`,`true`)):(e.classList.remove(`selected`),e.setAttribute(`aria-pressed`,`false`))});break}case`theme`:L.plan.theme=n,L.plan.themeManuallyEdited=!0,H();break;case`customStandardInput`:L.plan.customStandardInput=n;break;case`standardsSearchKeyword`:L.plan.standardsSearchKeyword=n,L.standardsCurriculumPage=1,J();break;case`periodCount`:{let e=parseInt(n,10);!isNaN(e)&&e>0&&(L.plan.periodCount=Math.min(Math.max(e,1),30),H(),Ee());break}case`goalKnowledge`:L.plan.goalKnowledge=n,H();break;case`goalSkill`:L.plan.goalSkill=n,H();break;case`goalAttitude`:L.plan.goalAttitude=n,H();break;case`functionalNeeds`:L.plan.functionalNeeds=n.split(`
`).filter(e=>e.trim().length>0),H()}}function ye(e){if(e.target.id===`standardsSubjectSelect`)L.plan.standardsSubjectFilter=e.target.value,L.standardsCurriculumPage=1,q(3);else if(e.target.id===`schoolTemplateFileInput`){let t=e.target.files&&e.target.files[0];if(t){if(!t.name.toLowerCase().endsWith(`.hwpx`)){$(`학교 양식은 .hwpx 형식의 파일만 지원됩니다.`,`error`),e.target.value=``;return}let n=new FileReader;n.onload=e=>{L.uploadedTemplateBuffer=e.target.result,L.plan.uploadedFileName=t.name,L.plan.uploadedFileMerged=!0,H(),q(11),$(`'${t.name}' 서식이 등록되었습니다. 한글 기안 시 해당 서식에 실제 합성됩니다.`,`success`)},n.onerror=()=>{$(`파일을 읽는 중 오류가 발생했습니다.`,`error`)},n.readAsArrayBuffer(t)}}}function be(e){if(e.target.id===`customStdInputField`&&e.key===`Enter`&&!e.shiftKey){e.preventDefault();let t=document.querySelector(`[data-action='add-custom-standard']`);t&&t.click()}else if(e.key===`Enter`||e.key===` `){let t=e.target.closest(`.choice-bubble-card, .standard-pick-item, .rec-std-chip, .pill-option-btn, .template-upload-zone`);t&&t.hasAttribute(`data-action`)&&(e.preventDefault(),t.click())}}function q(e){let t=document.getElementById(`stepCounterText`),n=document.getElementById(`stepProgressFill`),r=document.getElementById(`stepProgressTrack`);t&&(t.textContent=`STEP ${String(e).padStart(2,`0`)} / 11`),n&&(n.style.width=`${e/11*100}%`),r&&r.setAttribute(`aria-valuenow`,String(e));let i=document.getElementById(`prevStepBtn`);document.getElementById(`nextStepBtn`);let a=document.getElementById(`nextStepBtnText`);i&&(i.style.visibility=e>1?`visible`:`hidden`),a&&(a.textContent=e===10?`공문서 기안 서식 확인하기 >`:e===11?`처음으로 (다시 설계) >`:`다음 단계 >`);let o=document.getElementById(`cardStepPill`),s=document.getElementById(`cardQuestionTitle`),c=document.getElementById(`cardQuestionSubtitle`),l=document.getElementById(`cardInteractionBox`);switch(l&&(e===10?l.setAttribute(`data-layout`,`scroll`):l.setAttribute(`data-layout`,`fit`)),e){case 1:xe(o,s,c,l);break;case 2:Se(o,s,c,l);break;case 3:Ce(o,s,c,l);break;case 4:we(o,s,c,l);break;case 5:Te(o,s,c,l);break;case 6:De(o,s,c,l);break;case 7:Oe(o,s,c,l);break;case 8:ke(o,s,c,l);break;case 9:Ae(o,s,c,l);break;case 10:je(o,s,c,l);break;case 11:Me(o,s,c,l)}l&&e!==10&&requestAnimationFrame(()=>{l.classList.remove(`density-compact`,`density-dense`),l.scrollHeight>l.clientHeight+4&&(l.classList.add(`density-compact`),l.scrollHeight>l.clientHeight+4&&l.classList.add(`density-dense`))}),R!==void 0&&R&&typeof R.refresh==`function`&&R.refresh()}function xe(e,t,r,i){e.textContent=`1단계: 학교급 선택`,t.textContent=`어느 학교급의 체험학습을 설계하시나요?`,r.textContent=`선택하신 학교급에 맞추어 국가 교육과정 성취기준 및 활동 양식을 연결합니다.`,i.innerHTML=`
    <div class="school-level-vertical-list">
      ${n.map(e=>{let t=L.plan.schoolLevel===e.name;return`
          <div class="school-level-row-card ${t?`selected`:``}" 
               role="button" tabindex="0" aria-pressed="${t}"
               data-action="select-school-level" data-val="${N(e.name)}">
            <div class="school-icon-avatar" style="background: ${e.iconBg||`#f1f5f9`}; border: 1.5px solid ${e.iconBorder||`#e2e8f0`};">
              <span>${e.icon||`🏫`}</span>
            </div>
            <div class="school-level-content">
              <div class="school-level-head">
                <h2 class="school-level-title">${N(e.name)}</h2>
                <span class="school-level-badge">${N(e.badge)}</span>
              </div>
              <p class="school-level-desc">${N(e.desc)}</p>
            </div>
            <div class="school-level-indicator">
              <span class="school-check-pill">${t?`선택됨 ✓`:`선택`}</span>
            </div>
          </div>
        `}).join(``)}
    </div>
  `}function Se(e,t,n,i){e.textContent=`2단계: 체험학습 장소`,t.textContent=`이번 체험학습은 어디로 떠나나요?`,n.textContent=`학생들과 함께 배움을 경험할 체험학습 장소를 입력하거나 추천 항목에서 선택해 주세요.`,i.innerHTML=`
    <!-- 장소 직접 입력 -->
    <div class="input-card-box" style="margin-bottom: 0.8rem;">
      <label for="customLocationInput" style="font-size: 0.95rem; font-weight: 800; color: #0f172a; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
        <span class="label-badge" style="font-size: 0.72rem;">입력</span>
        체험학습 장소명 직접 입력
      </label>
      <input type="text" class="soft-text-input" id="customLocationInput" 
             placeholder="예: 서울숲 곤충식물원, 뚜레쥬르 베이커리 등 직접 입력" 
             value="${N(L.plan.locationName)}" 
             data-model="locationName"
             style="font-size: 1rem; padding: 0.7rem 1.1rem;">
    </div>

    <!-- 추천 항목 -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
        <span style="font-family: 'Jua', sans-serif; font-size: 0.98rem; color: var(--text-main);">
          자주 찾는 추천 장소 (클릭 시 자동 반영)
        </span>
        <span style="font-size: 0.78rem; color: #64748b;">
          6가지 주요 테마 공간
        </span>
      </div>
      <div class="choice-grid-cards" data-cols="6">
        ${r.map(e=>`
          <div class="choice-bubble-card ${L.plan.locationId===e.id?`selected`:``}" 
               role="button" tabindex="0" aria-pressed="${L.plan.locationId===e.id}"
               data-action="select-location" data-id="${N(e.id)}" data-val="${N(e.name)}"
               style="padding: 0.75rem 0.95rem;">
            <div class="choice-card-top">
              <span class="choice-card-badge">${N(e.icon)}</span>
            </div>
            <h2 class="choice-card-title" style="font-size: 1.05rem;">${N(e.name)}</h2>
            <p class="choice-card-desc" style="font-size: 0.82rem;">${N(e.desc)}</p>
          </div>
        `).join(``)}
      </div>
    </div>
  `}function Ce(e,t,n,r){e.textContent=`3단계: 성취기준 설정`,t.textContent=`체험학습에 반영할 성취기준을 넣어주세요`,n.textContent=`장소 맞춤 추천 성취기준을 확인하거나, 직접 입력 및 국가 교육과정 검색으로 등록할 수 있습니다.`;let o=i(L.plan.schoolLevel),s=L.plan.standards.map(e=>e.code),c=(L.plan.standardsSearchKeyword||``).trim().toLowerCase(),l=L.plan.standardsSubjectFilter||`전체`,u=a(L.plan.schoolLevel,L.plan.locationId),d=[`전체`,...[...new Set(o.map(e=>e.subject))].sort()],f=o.filter(e=>l!==`전체`&&e.subject!==l?!1:!c||e.code.toLowerCase().includes(c)||e.title.toLowerCase().includes(c)||e.desc.toLowerCase().includes(c)||e.subject.toLowerCase().includes(c)),p=L.standardsPageSize||4,m=Math.max(1,Math.ceil(f.length/p));L.standardsCurriculumPage>m&&(L.standardsCurriculumPage=m);let h=L.standardsCurriculumPage||1,g=(h-1)*p,_=f.slice(g,g+p);r.innerHTML=`
    <div class="standards-two-col-layout">
      <!-- 왼쪽 칼럼: 추천 쉘프 + 직접 입력 + 현재 등록 목록 -->
      <div class="std-col-left">
        <!-- 1) 장소 맞춤 추천 성취기준 쉘프 -->
        ${u.length>0?`
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 0.6rem 0.8rem;">
            <div style="font-family: 'Jua', sans-serif; font-size: 0.9rem; color: #15803d; margin-bottom: 0.35rem; display: flex; align-items: center; justify-content: space-between;">
              <span>💡 [${N(L.plan.locationName)}] 추천 성취기준 (클릭 추가)</span>
              <span style="font-size: 0.72rem; color: #166534;">핵심 4선</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem;">
              ${u.slice(0,4).map(e=>{let t=s.includes(e.code);return`
                  <div class="rec-std-chip ${t?`selected`:``}" 
                       role="button" tabindex="0" aria-pressed="${t}"
                       data-action="toggle-standard" data-id="${N(e.code)}"
                       style="padding: 0.4rem 0.55rem; font-size: 0.78rem;">
                    <div style="font-weight: 800; color: #15803d; font-size: 0.76rem;">${N(e.code)} (${N(e.subject)})</div>
                    <div style="color: #1e293b; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-top: 0.1rem;">
                      ${N(e.desc)}
                    </div>
                  </div>
                `}).join(``)}
            </div>
          </div>
        `:``}

        <!-- 2) 직접 입력 -->
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 0.65rem 0.85rem;">
          <label for="customStdInputField" style="font-size: 0.9rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.3rem;">
            <span class="label-badge" style="font-size: 0.72rem;">직접 입력</span>
            <span style="font-size: 0.74rem; color: #64748b; font-weight: 500;">Enter 단독: 등록</span>
          </label>
          <div style="display: flex; gap: 0.4rem;">
            <input type="text" class="soft-text-input" id="customStdInputField" style="flex: 1; padding: 0.5rem 0.8rem; font-size: 0.88rem;"
                   placeholder="예: [2국01-01] 알맞은 인사말을 주고받는다" 
                   value="${N(L.plan.customStandardInput)}"
                   data-model="customStandardInput">
            <button type="button" class="btn-soft-primary" style="padding: 0.5rem 0.9rem; white-space: nowrap; font-size: 0.85rem; border-radius: 10px;" data-action="add-custom-standard">
              등록 (+)
            </button>
          </div>
        </div>

        <!-- 3) 현재 등록된 성취기준 목록 -->
        <div style="flex: 1; min-height: 0; display: flex; flex-direction: column;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
            <span style="font-weight: 800; font-size: 0.88rem; color: #0f172a; display: flex; align-items: center; gap: 0.35rem;">
              <span style="display: inline-block; width: 7px; height: 7px; background: #10b981; border-radius: 50%;"></span>
              현재 등록된 성취기준 (${L.plan.standards.length}개):
            </span>
            <span style="font-size: 0.74rem; color: #64748b;">(최소 1개 이상)</span>
          </div>
          <div class="std-registered-scrollbox">
            ${L.plan.standards.length===0?`
              <div style="font-size: 0.82rem; color: #94a3b8; text-align: center; padding: 1rem 0;">
                등록된 성취기준이 없습니다. 성취기준을 추가해 주세요.
              </div>
            `:L.plan.standards.map(e=>`
              <div class="std-current-item" style="padding: 0.35rem 0.55rem; font-size: 0.82rem;">
                <div style="display: flex; align-items: baseline; gap: 0.4rem; flex: 1; overflow: hidden;">
                  <span class="std-code-badge" style="font-size: 0.78rem;">${N(e.code)}</span>
                  <span style="font-weight: 700; color: #0f172a; white-space: nowrap;">${N(e.title||e.subject||``)}</span>
                  <span style="color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${N(e.desc)}</span>
                </div>
                <button type="button" style="padding: 0.15rem 0.45rem; font-size: 0.72rem; color: #e11d48; border: 1px solid #fecdd3; background: #fff1f2; border-radius: 6px; cursor: pointer;" 
                        data-action="remove-standard" data-id="${N(e.id||e.code)}">삭제</button>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>

      <!-- 오른쪽 칼럼: 교육과정 검색 및 페이지네이션 목록 -->
      <div class="std-col-right">
        <div class="std-curriculum-panel">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap;">
            <span style="font-family: 'Jua', sans-serif; font-size: 0.94rem; color: var(--text-main);">
              ${N(L.plan.schoolLevel)} 교육과정 검색
            </span>
            <span style="font-size: 0.76rem; color: #64748b;">
              전체 ${f.length}건 중 ${f.length>0?(h-1)*p+1:0}~${Math.min(h*p,f.length)}건
            </span>
          </div>

          <!-- 검색 및 과목 셀렉트 -->
          <div style="display: flex; gap: 0.4rem; margin-bottom: 0.4rem;">
            <input type="text" class="soft-text-input" id="standardsSearchField" style="flex: 1; padding: 0.5rem 0.8rem; font-size: 0.86rem;"
                   placeholder="검색어 (구매, 인사, 안전 등)" 
                   value="${N(L.plan.standardsSearchKeyword)}" 
                   data-model="standardsSearchKeyword">
            <select id="standardsSubjectSelect" class="standards-subject-select" style="padding: 0.45rem 0.7rem; font-size: 0.82rem;">
              ${d.map(e=>`
                <option value="${N(e)}" ${l===e?`selected`:``}>
                  ${N(e)}
                </option>
              `).join(``)}
            </select>
          </div>

          <!-- 성취기준 카드 리스트 (페이지네이션) -->
          <div class="std-curriculum-list-paginated" id="standardsCurriculumList">
            ${_.length===0?`
              <div style="font-size: 0.84rem; color: #94a3b8; text-align: center; padding: 1.5rem 0;">
                일치하는 성취기준이 없습니다.
              </div>
            `:_.map(e=>{let t=s.includes(e.code);return`
                <div class="standard-pick-item ${t?`selected`:``}" 
                     role="button" tabindex="0" aria-pressed="${t}"
                     data-action="toggle-standard" data-id="${N(e.code)}"
                     style="padding: 0.6rem 0.8rem;">
                  <div style="display: flex; flex-direction: column; gap: 0.15rem; flex: 1; text-align: left; overflow: hidden;">
                    <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
                      <span class="std-code-badge" style="font-size: 0.8rem;">${N(e.code)}</span>
                      <span style="font-size: 0.7rem; background: #f1f5f9; color: #0f172a; padding: 0.1rem 0.45rem; border-radius: 9999px; font-weight: 700; border: 1px solid #e2e8f0;">${N(e.subject)}</span>
                      <span style="font-weight: 800; font-size: 0.86rem; color: #0f172a;">${N(e.title)}</span>
                    </div>
                    <div style="font-size: 0.82rem; color: #334155; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${N(e.desc)}</div>
                  </div>
                  <div style="margin-left: 0.4rem;">
                    <span style="font-family: 'Jua', sans-serif; font-size: 0.8rem; color: ${t?`#0f172a`:`#64748b`}; padding: 0.2rem 0.6rem; border-radius: 9999px; background: ${t?`#e2e8f0`:`#f8fafc`}; border: 1px solid ${t?`#cbd5e1`:`#e2e8f0`}; white-space: nowrap;">
                      ${t?`선택됨 ✓`:`+ 추가`}
                    </span>
                  </div>
                </div>
              `}).join(``)}
          </div>

          <!-- 페이지네이션 컨트롤 바 -->
          <div class="std-pagination-bar">
            <button type="button" class="btn-page-step" data-action="page-standards-prev" ${h<=1?`disabled`:``}>
              &lt; 이전
            </button>
            <span style="font-family: 'Jua', sans-serif; font-size: 0.85rem; color: #475569;">
              ${h} / ${m} 페이지
            </span>
            <button type="button" class="btn-page-step" data-action="page-standards-next" ${h>=m?`disabled`:``}>
              다음 &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  `}function J(){let e=document.getElementById(`standardsCurriculumList`);if(!e)return;let t=i(L.plan.schoolLevel),n=L.plan.standards.map(e=>e.code),r=(L.plan.standardsSearchKeyword||``).trim().toLowerCase(),a=L.plan.standardsSubjectFilter||`전체`,o=t.filter(e=>a!==`전체`&&e.subject!==a?!1:!r||e.code.toLowerCase().includes(r)||e.title.toLowerCase().includes(r)||e.desc.toLowerCase().includes(r)||e.subject.toLowerCase().includes(r)),s=L.standardsPageSize||4,c=Math.max(1,Math.ceil(o.length/s));L.standardsCurriculumPage>c&&(L.standardsCurriculumPage=c);let l=L.standardsCurriculumPage||1,u=(l-1)*s,d=o.slice(u,u+s),f=e.closest(`.std-curriculum-panel`);if(f){let e=f.querySelector(`span:nth-child(2)`);e&&(e.textContent=`전체 ${o.length}건 중 ${o.length>0?(l-1)*s+1:0}~${Math.min(l*s,o.length)}건`)}e.innerHTML=d.length===0?`
      <div style="font-size: 0.84rem; color: #94a3b8; text-align: center; padding: 1.5rem 0;">
        일치하는 성취기준이 없습니다.
      </div>
    `:d.map(e=>{let t=n.includes(e.code);return`
        <div class="standard-pick-item ${t?`selected`:``}" 
             role="button" tabindex="0" aria-pressed="${t}"
             data-action="toggle-standard" data-id="${N(e.code)}"
             style="padding: 0.6rem 0.8rem;">
          <div style="display: flex; flex-direction: column; gap: 0.15rem; flex: 1; text-align: left; overflow: hidden;">
            <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
              <span class="std-code-badge" style="font-size: 0.8rem;">${N(e.code)}</span>
              <span style="font-size: 0.7rem; background: #f1f5f9; color: #0f172a; padding: 0.1rem 0.45rem; border-radius: 9999px; font-weight: 700; border: 1px solid #e2e8f0;">${N(e.subject)}</span>
              <span style="font-weight: 800; font-size: 0.86rem; color: #0f172a;">${N(e.title)}</span>
            </div>
            <div style="font-size: 0.82rem; color: #334155; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${N(e.desc)}</div>
          </div>
          <div style="margin-left: 0.4rem;">
            <span style="font-family: 'Jua', sans-serif; font-size: 0.8rem; color: ${t?`#0f172a`:`#64748b`}; padding: 0.2rem 0.6rem; border-radius: 9999px; background: ${t?`#e2e8f0`:`#f8fafc`}; border: 1px solid ${t?`#cbd5e1`:`#e2e8f0`}; white-space: nowrap;">
              ${t?`선택됨 ✓`:`+ 추가`}
            </span>
          </div>
        </div>
      `}).join(``);let p=f?f.querySelector(`.std-pagination-bar`):null;p&&(p.innerHTML=`
      <button type="button" class="btn-page-step" data-action="page-standards-prev" ${l<=1?`disabled`:``}>
        &lt; 이전
      </button>
      <span style="font-family: 'Jua', sans-serif; font-size: 0.85rem; color: #475569;">
        ${l} / ${c} 페이지
      </span>
      <button type="button" class="btn-page-step" data-action="page-standards-next" ${l>=c?`disabled`:``}>
        다음 &gt;
      </button>
    `)}function we(e,t,n,r){e.textContent=`4단계: 체험학습 주제`,t.textContent=`어떤 배움의 주제로 프로젝트를 열어갈까요?`,n.textContent=`선택하신 장소와 성취기준을 연결한 실시간 맞춤 주제입니다. 마음에 드는 주제를 고르거나 직접 수정할 수 있습니다.`,r.innerHTML=`
    <div class="theme-header-row">
      <span style="font-family: 'Jua', sans-serif; font-size: 0.98rem; color: var(--text-main); display: flex; align-items: center; gap: 0.4rem;">
        <span>🎯</span> 맥락 연계 실시간 추천 주제
      </span>
      <button type="button" class="btn-cycle-themes" data-action="cycle-themes" title="다른 추천 후보들을 새로고침합니다">
        <span>🔄</span> 다른 추천 보기
      </button>
    </div>

    <div class="choice-grid-cards" data-cols="2" style="gap: 0.65rem; margin-bottom: 0.6rem;">
      ${c(L.plan,{cycleIndex:L.themeCycleIndex||0}).slice(0,4).map((e,t)=>`
        <div class="choice-bubble-card ${L.plan.theme===e.theme?`selected`:``}" 
             role="button" tabindex="0" aria-pressed="${L.plan.theme===e.theme}"
             data-action="select-theme" data-val="${N(e.theme)}"
             style="padding: 0.8rem 1rem;">
          <div class="choice-card-top">
            <span class="choice-card-badge">추천 0${t+1}</span>
            <span class="theme-reason-tag">${N(e.reasonBadge)}</span>
          </div>
          <h2 class="choice-card-title" style="font-size: 1.05rem;">${N(e.theme)}</h2>
          <p class="choice-card-desc" style="font-size: 0.82rem;">${N(L.plan.schoolLevel)} 실생활 맥락 중심 배움 프로젝트</p>
        </div>
      `).join(``)}
    </div>

    <!-- 주제 직접 수정 -->
    <div class="soft-input-group" style="margin-top: 0.2rem;">
      <label for="themeInput" style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem;">
        <span class="label-badge" style="font-size: 0.72rem;">직접 수정</span>
        주제 직접 수정 및 보완:
      </label>
      <input type="text" class="soft-text-input" id="themeInput"
             value="${N(L.plan.theme)}" 
             data-model="theme"
             style="padding: 0.7rem 1.1rem; font-size: 1rem;">
    </div>
  `}function Y(e){let t=Math.max(1,parseInt(e,10)||10);if(t===1)return{pre:0,field:1,post:0,total:1};if(t===2)return{pre:1,field:1,post:0,total:2};if(t===3)return{pre:1,field:1,post:1,total:3};let n=Math.round(t*.4),r=Math.round(t*.2),i=t-n-r;for(r<1&&(r=1),n<1&&(n=1),i<1&&(i=1);n+r+i>t;)n>i&&n>r?n--:i>n&&i>r?i--:n>=i?n--:i--;for(;n+r+i<t;)n<=i?n++:i++;return{pre:n,field:r,post:i,total:t}}function Te(e,t,n,r){e.textContent=`5단계: 차시 수 및 수업 난이도`,t.textContent=`몇 차시 수업으로 계획하고, 난이도는 어떻게 할까요?`,n.textContent=`사전:현장:사후 4:2:4 비율을 기반으로 최적화된 로드맵을 설계합니다.`,r.innerHTML=`
    <div class="dual-selector-row">
      <!-- 차시 수 직접 입력 및 4:2:4 비율 시각화 영역 -->
      <div class="selector-sub-box">
        <h3 class="sub-box-title">수업 운영 차시 수 (직접 입력 / 빠른 선택):</h3>
        <div style="display: flex; align-items: center; gap: 0.8rem; margin-top: 0.2rem;">
          <input type="number" min="1" max="30" class="soft-text-input" id="periodCountInput"
                 style="width: 110px; font-size: 1.35rem; font-family: 'Jua', sans-serif; text-align: center; padding: 0.5rem;" 
                 value="${N(L.plan.periodCount)}" 
                 data-model="periodCount">
          <span style="font-family: 'Jua', sans-serif; font-size: 1.25rem; color: var(--primary-accent);">차시</span>
        </div>

        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
          자주 사용하는 차시 빠른 선택:
        </div>
        <div class="pill-option-group">
          ${[{count:10,label:`10차시 (추천 4:2:4)`},{count:5,label:`5차시 (압축 4:2:4)`},{count:8,label:`8차시`},{count:3,label:`3차시 (기본)`}].map(e=>`
            <button type="button" class="pill-option-btn ${L.plan.periodCount===e.count?`selected`:``}" 
                    aria-pressed="${L.plan.periodCount===e.count}"
                    style="padding: 0.45rem 0.95rem; font-size: 0.88rem;"
                    data-action="select-period-count" data-val="${e.count}">
              ${N(e.label)}
            </button>
          `).join(``)}
        </div>

        <!-- 4:2:4 비율 시각적 배너 -->
        <div id="ratioBannerContainer">
          ${X(L.plan.periodCount)}
        </div>
      </div>

      <!-- 난이도 선택 영역 -->
      <div class="selector-sub-box">
        <h3 class="sub-box-title">수업 수준 (난이도 및 촉진 지원):</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${[{title:`기초/탐색 수준`,desc:`상당한 도움 및 1:1 신체적·언어적 촉진 제공`},{title:`기본/적용 수준`,desc:`시각적 단서 및 단계적 모델링을 통한 협력 수행`},{title:`심화/자립 수준`,desc:`최소한의 안내로 스스로 판단하고 독립적으로 완수`}].map(e=>{let t=L.plan.difficultyLevel.includes(e.title);return`
              <div class="choice-bubble-card ${t?`selected`:``}" 
                   role="button" tabindex="0" aria-pressed="${t}"
                   style="padding: 0.8rem 1rem;" 
                   data-action="select-difficulty" data-val="${N(`${e.title} (${e.desc})`)}">
                <span style="font-family: 'Jua', sans-serif; font-size: 1.05rem; color: var(--text-main);">${N(e.title)}</span>
                <span style="font-size: 0.82rem; color: var(--text-muted);">${N(e.desc)}</span>
              </div>
            `}).join(``)}
        </div>
      </div>
    </div>
  `}function X(e){let t=Y(e),n=t.total,r=Math.round(t.pre/n*100),i=Math.round(t.field/n*100),a=100-r-i;return`
    <div class="ratio-banner-box" style="margin-top: 0.6rem;">
      <div style="font-family: 'Jua', sans-serif; font-size: 0.92rem; color: var(--text-main); display: flex; justify-content: space-between;">
        <span>🎯 차시 배분 비율: 사전 4 : 현장 2 : 사후 4</span>
        <span style="color: var(--primary-accent); font-weight: 800;">총 ${n}차시</span>
      </div>
      <div class="ratio-bar-wrapper">
        <div class="ratio-bar-segment pre" style="width: ${r}%;"></div>
        <div class="ratio-bar-segment field" style="width: ${i}%;"></div>
        <div class="ratio-bar-segment post" style="width: ${a}%;"></div>
      </div>
      <div class="ratio-legend-row" style="font-size: 0.82rem;">
        <span style="color: #be123c;">🌸 사전 ${t.pre}차시 (${r}%)</span>
        <span style="color: #0369a1;">🚌 현장 ${t.field}차시 (${i}%)</span>
        <span style="color: #15803d;">🌱 사후 ${t.post}차시 (${a}%)</span>
      </div>
    </div>
  `}function Ee(){let e=document.getElementById(`ratioBannerContainer`);e&&(e.innerHTML=X(L.plan.periodCount))}function De(e,t,n,r){e.textContent=`6단계: 평가 중점 선택`,t.textContent=`이번 체험학습에서 가장 중요하게 평가할 영역은 무엇인가요?`,n.textContent=`핵심 성취기준 및 학생 특성과 연결된 평가 관점입니다. 이전 단계 내용이 실시간 반영되었습니다.`;let i=u(L.plan),a=!!L.showAllEvalFocus,o=a?i:i.slice(0,4);if(!a&&!o.some(e=>e.id===L.plan.evalFocusId)){let e=i.find(e=>e.id===L.plan.evalFocusId);e&&(o[3]=e)}r.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
      <span style="font-family: 'Jua', sans-serif; font-size: 0.98rem; color: var(--text-main); display: flex; align-items: center; gap: 0.4rem;">
        <span>🎯</span> 맥락 최적화 평가 관점 (${N(L.plan.locationName)} &amp; ${N(L.plan.schoolLevel)})
      </span>
      <span style="font-size: 0.78rem; color: #64748b;">
        ${a?`전체 10개 평가 관점 표시 중`:`핵심 4선 한눈에 보기`}
      </span>
    </div>

    <div class="choice-grid-cards" data-cols="${a?`3`:`4`}" style="${a?`max-height: 380px; overflow-y: auto;`:``}">
      ${o.map(e=>`
        <div class="choice-bubble-card ${L.plan.evalFocusId===e.id?`selected`:``}" 
             role="button" tabindex="0" aria-pressed="${L.plan.evalFocusId===e.id}"
             data-action="select-eval-focus" data-id="${N(e.id)}" data-val="${N(e.title)}"
             style="padding: 0.8rem 1rem;">
          <div class="choice-card-top">
            <span class="choice-card-badge">${N(e.reasonBadge)}</span>
          </div>
          <h2 class="choice-card-title" style="font-size: 1.05rem;">${N(e.title)}</h2>
          <p class="choice-card-desc" style="font-size: 0.82rem;">${N(e.desc)}</p>
        </div>
      `).join(``)}
    </div>

    <div class="other-options-drawer-bar">
      <span style="font-size: 0.8rem; color: #64748b;">
        * 평가 중점을 선택하면 7단계 학습 목표(지식·기능·태도)가 실시간 자동 작성됩니다.
      </span>
      <button type="button" class="btn-toggle-drawer" data-action="toggle-all-eval-focus">
        ${a?`접기 (추천 4선만 보기)`:`다른 평가 영역 더 보기 (전체 10개) ▾`}
      </button>
    </div>
  `}function Oe(e,t,n,r){e.textContent=`7단계: 체험학습 목표 설정`,t.textContent=`설정한 평가 중점에 맞춘 3차원 학습 목표입니다.`,n.textContent=`지식·기능·태도 측면에서 도달할 구체적인 수업 목표입니다. 실시간 분석으로 자동 완성되었으며 필요시 직접 수정할 수 있습니다.`,r.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <div class="choice-bubble-card selected" style="cursor: default; padding: 0.85rem 1.15rem;">
        <label for="goalKnowledgeInput" style="font-family: 'Jua', sans-serif; font-size: 0.92rem; color: var(--primary-accent); display: block; margin-bottom: 0.25rem;">[지식·이해 목표]</label>
        <input type="text" class="soft-text-input" id="goalKnowledgeInput" style="padding: 0.65rem 0.95rem; font-size: 0.96rem;" 
               value="${N(L.plan.goalKnowledge)}" 
               data-model="goalKnowledge">
      </div>

      <div class="choice-bubble-card selected" style="cursor: default; padding: 0.85rem 1.15rem;">
        <label for="goalSkillInput" style="font-family: 'Jua', sans-serif; font-size: 0.92rem; color: #10b981; display: block; margin-bottom: 0.25rem;">[기능·수행 목표]</label>
        <input type="text" class="soft-text-input" id="goalSkillInput" style="padding: 0.65rem 0.95rem; font-size: 0.96rem;" 
               value="${N(L.plan.goalSkill)}" 
               data-model="goalSkill">
      </div>

      <div class="choice-bubble-card selected" style="cursor: default; padding: 0.85rem 1.15rem;">
        <label for="goalAttitudeInput" style="font-family: 'Jua', sans-serif; font-size: 0.92rem; color: #a855f7; display: block; margin-bottom: 0.25rem;">[가치·태도 목표]</label>
        <input type="text" class="soft-text-input" id="goalAttitudeInput" style="padding: 0.65rem 0.95rem; font-size: 0.96rem;" 
               value="${N(L.plan.goalAttitude)}" 
               data-model="goalAttitude">
      </div>
    </div>
  `}function ke(e,t,n,r){e.textContent=`8단계: 장애특성 및 맞춤 지원`,t.textContent=`현장에서 특별히 고려해야 할 장애특성이 있나요?`,n.textContent=`이동 지원(휠체어), 감각 조절, 의사소통 보조 등 안전하고 편안한 배움을 위해 필요한 지원을 적어주세요.`,r.innerHTML=`
    <div class="privacy-notice-bubble" style="padding: 0.8rem 1.1rem; margin-bottom: 0.65rem;">
      <span class="privacy-notice-badge">개인정보 주의</span>
      <span style="font-size: 0.86rem;">
        <strong>개인식별정보 입력 절대 금지:</strong> 학생 실명, 전화번호는 절대 입력 금지! 
        (예: "휠체어 이동 지원 1명", "시각적 일과표 2명" 형태로만 기재)
      </span>
    </div>

    <div style="font-family: 'Jua', sans-serif; font-size: 0.95rem; color: var(--text-main); margin-bottom: 0.4rem;">
      자주 활용되는 기능적 지원 요구 태그 (클릭 시 추가):
    </div>
    <div class="pill-option-group" style="margin-bottom: 0.8rem;">
      <button type="button" class="pill-option-btn" style="padding: 0.45rem 0.9rem; font-size: 0.88rem;" data-action="add-functional-tag" data-val="휠체어 이동 지원 1명 (무단차 경사로 필요)">+ 휠체어 이동 지원</button>
      <button type="button" class="pill-option-btn" style="padding: 0.45rem 0.9rem; font-size: 0.88rem;" data-action="add-functional-tag" data-val="시각적 단계별 일과표 및 사진 단서 필요 2명">+ 시각적 일과표</button>
      <button type="button" class="pill-option-btn" style="padding: 0.45rem 0.9rem; font-size: 0.88rem;" data-action="add-functional-tag" data-val="AAC 그림 상징판 및 스마트 보완의사소통 지원 1명">+ AAC 의사소통</button>
      <button type="button" class="pill-option-btn" style="padding: 0.45rem 0.9rem; font-size: 0.88rem;" data-action="add-functional-tag" data-val="소음 민감성 대비 저소음 휴식 쉼터 동선 1명">+ 소음 감각 조절</button>
      <button type="button" class="pill-option-btn" style="padding: 0.45rem 0.9rem; font-size: 0.88rem;" data-action="add-functional-tag" data-val="돌발 이탈 예방 1:1 보조인력 밀착 동행 1명">+ 1:1 안전 동행</button>
    </div>

    <div class="soft-input-group" style="margin-top: 0.2rem;">
      <label for="functionalNeedsArea" style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted);">현재 등록된 맞춤 지원 사항:</label>
      <textarea class="soft-text-input" id="functionalNeedsArea" rows="3" style="line-height: 1.45; resize: none; padding: 0.75rem 1rem; font-size: 0.95rem;" 
                data-model="functionalNeeds">${N(L.plan.functionalNeeds.join(`
`))}</textarea>
    </div>
  `}function Ae(e,t,n,r){e.textContent=`9단계: 수업 방식 확인`,t.textContent=`어떤 수업 방식으로 배움을 이끌어갈까요?`,n.textContent=`선택하신 장소, 평가중점, 차시, 학생 요구에 맞춘 최적 수업 방식입니다. 이전 단계 내용이 실시간 반영되었습니다.`;let i=p(L.plan),a=!!L.showAllTeachingMethods,o=a?i:i.slice(0,4);if(!a&&!o.some(e=>L.plan.teachingMethod.includes(e.name))){let e=i.find(e=>L.plan.teachingMethod.includes(e.name));e&&(o[3]=e)}r.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
      <span style="font-family: 'Jua', sans-serif; font-size: 0.98rem; color: var(--text-main); display: flex; align-items: center; gap: 0.4rem;">
        <span>💡</span> 맞춤 추천 수업 방식 (${N(L.plan.locationName)} &amp; ${N(L.plan.evalFocusTitle)})
      </span>
      <span style="font-size: 0.78rem; color: #64748b;">
        ${a?`전체 10개 교수학습 방식 표시 중`:`핵심 4선 한눈에 보기`}
      </span>
    </div>

    <div class="choice-grid-cards" data-cols="${a?`3`:`4`}" style="${a?`max-height: 380px; overflow-y: auto;`:``}">
      ${o.map(e=>`
        <div class="choice-bubble-card ${L.plan.teachingMethod.includes(e.name)?`selected`:``}" 
             role="button" tabindex="0" aria-pressed="${L.plan.teachingMethod.includes(e.name)}"
             data-action="select-teaching-method" data-val="${N(e.name)}"
             style="padding: 0.8rem 1rem;">
          <div class="choice-card-top">
            <span class="choice-card-badge">${N(e.badge)}</span>
          </div>
          <h2 class="choice-card-title" style="font-size: 1.05rem;">${N(e.name)}</h2>
          <p class="choice-card-desc" style="font-size: 0.82rem;">${N(e.desc)}</p>
        </div>
      `).join(``)}
    </div>

    <div class="other-options-drawer-bar">
      <span style="font-size: 0.8rem; color: #64748b;">
        * 실제 현장 장소와 수업 주제가 예시 문구에 생생하게 합성되어 반영됩니다.
      </span>
      <button type="button" class="btn-toggle-drawer" data-action="toggle-all-teaching-methods">
        ${a?`접기 (추천 4선만 보기)`:`다른 수업 방식 더 보기 (전체 10개) ▾`}
      </button>
    </div>
  `}function je(e,t,n,r){e.textContent=`10단계: UDL 최종 교육과정 결과물`,t.textContent=`설계하신 특수교육 현장체험학습 교육과정안입니다.`,n.textContent=`각 차시별 연계 성취기준과 세부 활동을 확인하고, 한글(HWPX) 또는 PDF 파일로 다운로드하세요.`;let i=L.plan,a=Z(i),o=w(i,a),s=B(i.locationId,i.locationName);r.innerHTML=`
    <!-- 10단계 고정 헤더: 목차 바로가기 점프 칩 & 다운로드 도구 모음 -->
    <div class="step10-fixed-header">
      <div class="udl-toc-shelf">
        <span style="font-family: 'Jua', sans-serif; font-size: 0.84rem; color: #64748b; margin-right: 0.1rem;">📌 목차:</span>
        <button type="button" class="toc-chip-btn" data-action="jump-toc-section" data-id="sec-summary">1. 개요</button>
        <button type="button" class="toc-chip-btn" data-action="jump-toc-section" data-id="sec-roadmap">2. 차시계획</button>
        <button type="button" class="toc-chip-btn" data-action="jump-toc-section" data-id="sec-detail">3. 세부계획안</button>
        <button type="button" class="toc-chip-btn" data-action="jump-toc-section" data-id="sec-materials">4. 자료제작</button>
      </div>
      <div class="export-action-shelf">
        <button type="button" class="btn-bubble-tool" data-action="copy-curriculum" style="font-size: 0.84rem; padding: 0.35rem 0.8rem;">내용 복사</button>
        <button type="button" class="btn-bubble-tool" style="background: #ffe4e6; color: #e11d48; font-size: 0.84rem; padding: 0.35rem 0.8rem;" data-action="download-hwpx">
          한글(HWPX) 다운로드
        </button>
        <button type="button" class="btn-soft-primary" style="padding: 0.4rem 1.1rem; font-size: 0.85rem;" data-action="print-pdf">
          PDF 인쇄 / 저장
        </button>
      </div>
    </div>

    <!-- 유일하게 스크롤되는 최종 결과물 뷰어 -->
    <div class="udl-result-scroller" id="udlPrintArea">
      <!-- 1) 프로젝트 개요 -->
      <div class="result-section-box" id="sec-summary">
        <h2 class="result-section-title">1. 프로젝트 개요</h2>
        <table class="result-table">
          <tbody>
            <tr>
              <th style="width: 25%;">프로젝트명</th>
              <td><strong>${N(o.theme)}</strong></td>
            </tr>
            <tr>
              <th>학교급 및 장소</th>
              <td><strong>${N(o.schoolLevel)}</strong> | ${N(o.locationName)} (총 ${o.periodCount}차시 [사전·현장·사후 4:2:4 비율] / ${N(o.difficultyLevel)})</td>
            </tr>
            <tr>
              <th>수업 방식 및 평가</th>
              <td>${N(o.teachingMethod)} | ${N(i.evalFocusTitle)}</td>
            </tr>
            <tr>
              <th>핵심 질문 (Essential Question)</th>
              <td>"우리 마을 ${N(o.locationName)}에서 나에게 필요한 것을 스스로 찾고 안전하게 참여하려면 어떻게 해야 할까?"</td>
            </tr>
            <tr>
              <th>연계 핵심 성취기준</th>
              <td>${(i.standards||[]).map(e=>`<strong>${N(e.code)}</strong> ${N(e.title||e.subject||``)}`).join(`, `)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 2) 차시별 수업 계획 (전체 로드맵 표) -->
      <div class="result-section-box" id="sec-roadmap">
        <h2 class="result-section-title">2. 차시별 수업 계획 (전체 로드맵 - 사전:현장:사후 4:2:4 비율)</h2>
        ${X(i.periodCount)}
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
                    <span class="phase-tag ${N(e.phase)}">${N(e.phaseBadge)}</span>
                    <span style="font-size: 1.05rem;">${e.num}차시</span>
                  </div>
                </td>
                <td><strong>${N(e.title)}</strong></td>
                <td>
                  ${e.standardsCodes.map(e=>`<span class="linked-std-pill">${N(e)}</span>`).join(` `)}
                </td>
                <td>${N(e.summary)}</td>
                <td>${N(e.eval)}</td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>

      <!-- 3) 차시별 세부 수업 계획안 -->
      <div class="result-section-box" id="sec-detail">
        <h2 class="result-section-title">3. 차시별 세부 수업 계획안 (도입-전개-정리 및 발문 예시)</h2>
        ${a.map(e=>{let t={pre:{bg:`#fff8f8`,border:`#fecdd3`,color:`#e11d48`},field:{bg:`#f0f9ff`,border:`#bae6fd`,color:`#0284c7`},post:{bg:`#f0fdf4`,border:`#bbf7d0`,color:`#16a34a`}},n=t[e.phase]||t.pre;return`
          <div style="background: ${n.bg}; border: 2px solid ${n.border}; border-radius: 16px; padding: 1.3rem; margin-bottom: 0.9rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
              <span style="font-family: 'Jua', sans-serif; font-size: 1.25rem; color: ${n.color}; display: flex; align-items: center; gap: 0.5rem;">
                <span class="phase-tag ${N(e.phase)}">${N(e.phaseBadge)}</span>
                <span>${e.num}차시: ${N(e.title)}</span>
              </span>
              <div>
                ${e.standardsCodes.map(e=>`<span class="linked-std-pill">${N(e)}</span>`).join(` `)}
              </div>
            </div>
            <div style="font-size: 0.92rem; line-height: 1.6; color: var(--text-main);">
              <p><strong>[도입]</strong> ${N(e.intro)}</p>
              <p style="margin-top: 0.35rem;"><strong>[전개]</strong> ${N(e.body)}</p>
              <p style="margin-top: 0.35rem;"><strong>[정리]</strong> ${N(e.outro)}</p>
              <p style="margin-top: 0.55rem; color: #0284c7;"><strong>교사 발문 예시:</strong> "${N(e.questionExample)}"</p>
              <p style="margin-top: 0.35rem; color: #16a34a;"><strong>교사 지원 및 맞춤형 피드백 팁:</strong> ${N(e.feedbackTip)}</p>
            </div>
          </div>
        `}).join(``)}
      </div>

      <!-- 4) 교수·학습 자료 제작 지원 -->
      <div class="result-section-box" id="sec-materials">
        <h2 class="result-section-title">4. 교수·학습 자료 제작 지원 (PPT 슬라이드 및 활동지)</h2>
        <div style="font-family: 'Jua', sans-serif; font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-main);">
          가. 차시별 PPT 슬라이드 구성안:
        </div>
        <div class="ppt-slides-grid">
          <div class="ppt-slide-card">
            <div class="ppt-slide-num">슬라이드 01</div>
            <div class="ppt-slide-title">오늘의 탐험 떠나기</div>
            <ul class="ppt-slide-bullets">
              <li>${N(o.locationName)} 실물 사진 및 영상</li>
              <li>${N(s.pptMission)}</li>
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
          <p>- <strong>기초 수준 워크시트:</strong> ${N(s.worksheetBasic)}</p>
          <p>- <strong>적용 수준 워크시트:</strong> ${N(s.worksheetApply)}</p>
          <p>- <strong>심화 수준 워크시트:</strong> ${N(s.worksheetAdvanced)}</p>
        </div>
      </div>
    </div>
  `}function Me(e,t,n,r){e.textContent=`11단계: 공문서 기안 서식 반영`,t.textContent=`공문서 기안 서식에 설계 내용이 완벽히 반영되었습니다.`,n.textContent=`표준 공문서 양식(.hwpx)에 UDL 교육과정이 자동 합성됩니다. 학교 전용 서식(.hwpx)을 등록하여 그대로 활용할 수도 있습니다.`;let i=L.plan,a=w(i,Z(i)),o=!!(L.uploadedTemplateBuffer&&i.uploadedFileName);r.innerHTML=`
    <!-- 업로드 드롭존 (버블링 간섭 없는 단독 카드) -->
    <div class="template-upload-zone" id="templateUploadZone" role="button" tabindex="0" data-action="trigger-file-upload">
      <div class="upload-icon-bubble">HWP</div>
      <div class="upload-title">${o?`학교 서식 등록됨: ${N(i.uploadedFileName)}`:`학교 고유 계획서 양식 추가 등록 (.hwpx)`}</div>
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
          [기안 준비 완료] ${N(o?i.uploadedFileName:`교육부 표준 현장체험학습 기안양식.hwpx`)}
        </span>
        <span style="background: ${o?`#dcfce7`:`#d1fae5`}; color: #065f46; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 20px;">
          ${o?`학교 고유 서식 실제 합성 모드`:`표준 기안 서식 자동 합성 모드`}
        </span>
      </div>
      <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.65; background: #f0fdf4; padding: 1.15rem; border-radius: 12px;">
        <p><strong>수신:</strong> 내부결재 | <strong>제목:</strong> ${N(a.docTitle)}</p>
        <p><strong>1. 목적 및 주제:</strong> ${N(a.theme)} (${N(a.teachingMethod)})</p>
        <p><strong>2. 체험 장소:</strong> ${N(a.locationName)} (총 ${a.periodCount}차시 / ${N(a.difficultyLevel)})</p>
        <p><strong>3. 연계 성취기준:</strong> ${(i.standards||[]).map(e=>N(e.code)).join(`, `)}</p>
        <p><strong>4. 맞춤 지원 대책:</strong> ${N((i.functionalNeeds||[]).join(` / `))}</p>
        <p><strong>5. 평가 중점:</strong> ${N(i.evalFocusTitle)} (지식·기능·태도 3차원 평가)</p>
      </div>
      <div style="display: flex; gap: 0.6rem; justify-content: flex-end; margin-top: 1.1rem; flex-wrap: wrap;">
        <button type="button" class="btn-bubble-tool" data-action="reset-all">처음으로 다시 작성</button>
        <button type="button" class="btn-bubble-tool" data-action="copy-curriculum">기안문 텍스트 복사</button>
        <button type="button" class="btn-soft-primary" data-action="download-hwpx">
          ${o?`학교 서식 합성 다운로드 (.hwpx)`:`완성 계획서 다운로드 (.hwpx)`}
        </button>
      </div>
    </div>
  `}function Z(e){let t=e.periodCount,n=[],r=(e.standards||[]).map(e=>e.code),i=r.length>0?r[0]:`[실생활-자립]`,a=Y(t),o=B(e.locationId,e.locationName),s=[{title:`사전 탐색: ${e.locationName} 탐험 계획 수립 및 가고 싶은 구역 탐색`,summary:`${o.preIntro} 가고 싶은 곳과 관심 품목/전시물 알아보기.`,eval:`체험 장소 사진을 보고 가고 싶은 곳이나 관심 품목을 스스로 선택하고 표현하는지 관찰`,intro:o.preIntro,body:o.preBody,outro:o.preOutro,questionExample:`우리가 갈 ${e.locationName}에서 가장 먼저 찾아보고 싶은 것은 무엇일까요?`,feedbackTip:`실물 사진 카드나 영상을 제시하여 낯선 장소에 대한 불안을 낮추고 흥미를 높입니다.`},{title:`사전 계획: 나의 탐험 계획서(미션 목록) 작성 및 준비물 점검`,summary:`${o.preBody} 나만의 활동 미션 계획서 작성 및 가방 챙기기 연습.`,eval:`시각 단서(사진/픽토그램)를 활용하여 자신의 준비물과 미션 목록을 스스로 구성하는지 점검`,intro:`체험학습에 필요한 가방, 복장, 안전 명찰을 확인합니다.`,body:o.preBody,outro:`내 가방에 준비물이 빠짐없이 들어있는지 체크리스트로 확인하기.`,questionExample:`우리가 내일 챙겨가야 할 가장 중요한 물건은 무엇일까요? 가방에 쏙 넣어볼까요?`,feedbackTip:`글자 쓰기가 어려운 학생은 실물 사진 스티커나 AAC 선택 판을 활용합니다.`},{title:`사전 모의: 교실 모의 체험: 이동, 인사 및 상호작용 롤플레잉`,summary:`${o.preOutro} 교실 내 간이 부스 구성, 모의 상호작용 및 도움 요청 연습.`,eval:`교실 모의 부스에서 단계적 촉진에 따라 상호작용 및 인사 표현을 수행하는지 점검`,intro:`교실에 꾸며진 ${e.locationName} 모의 코너를 둘러보고 역할을 확인합니다.`,body:`직원 역할 교사에게 인사하기, 모의 카드 리더기에 카드 대어 결제하기.`,outro:`성공적으로 미션 수행 후 "감사합니다" 인사하고 영수증/티켓 챙기기.`,questionExample:`현장 직원 선생님을 만났을 때 어떤 인사를 건네면 좋을까요?`,feedbackTip:`반복적인 롤플레잉을 통해 현장에서 발생할 수 있는 낯선 자극을 완화합니다.`},{title:`사전 안전: 안전 수칙 및 공공장소 에티켓 다짐 (시각적 일과표 숙지)`,summary:`보행 안전(신호등, 짝꿍 손잡기), 길을 잃었을 때 대처법(안내데스크/명찰 활용) 다짐.`,eval:`비상 상황 발생 시 도움 요청 행동 및 에티켓 수칙 이해도 평가`,intro:`현장에서 지켜야 할 3대 안전 약속 안내.`,body:`시각적 일과표 순서 숙지, 짝꿍과 손잡고 걷기 연습, 비상 연락처 목걸이 확인.`,outro:`안전 약속 다짐 손도장 찍기 및 현장체험학습 출발 준비 완료 선언.`,questionExample:`만약 선생님이나 친구를 놓쳤을 때는 어떻게 행동해야 할까요?`,feedbackTip:`비상시 대처를 위해 학생의 옷이나 가방에 시각적 긴급 연락처 카드를 부착합니다.`}],c=[{title:`현장 탐색: ${e.locationName} 현장 도착 및 환경 탐색, 안전 이동 실천`,summary:`${o.fieldIntro} 배리어 프리 동선 확인 및 안전 이동 실천.`,eval:`공공장소에서 이동 안전 수칙을 준수하고 안내 표지판을 보고 방향을 탐색하는지 실기 평가`,intro:o.fieldIntro,body:o.fieldBody,outro:o.fieldOutro,questionExample:`우리가 찾던 엘리베이터와 안내 표지판이 어디에 보이나요?`,feedbackTip:`휠체어 이용 학생의 무단차 동선을 확보하고 중간 쉼터를 지정합니다.`},{title:`현장 실전: ${e.locationName} 실전 미션 수행: 직접 선택 및 상호작용 완수`,summary:`${o.fieldBody} 현장 직무 상호작용 및 실전 완수.`,eval:`현장 체크리스트를 바탕으로 목표 미션의 독립적 수행도 실기 평가`,intro:`내가 사전 준비 시간에 작성한 미션 계획서를 꺼내어 확인하기.`,body:o.fieldBody,outro:o.fieldOutro,questionExample:`스스로 선택한 미션을 직접 완수해 볼 수 있을까요?`,feedbackTip:`독립 수행을 장려하되 어려움을 겪을 때는 5초 지연 후 최소한의 제스처 촉진부터 제공합니다.`}],l=[{title:`사후 정산: 체험 결과 확인: 영수증/결과물 대조 및 활동 결과 정산`,summary:`${o.postIntro} ${o.postBody}`,eval:`체험 결과물을 대조하여 확인하고 정산 활동지에 기록할 수 있는지 평가`,intro:o.postIntro,body:o.postBody,outro:o.postOutro,questionExample:`체험 장소에서 가져온 결과물과 내 활동지를 함께 비교해 볼까요?`,feedbackTip:`수 개념이 어려운 학생에게는 1:1 매칭 스티커를 활용합니다.`},{title:`사후 나눔: 배움과 기쁨의 나눔: 친구들과 결과물 나누기 및 협동 활동`,summary:`체험 결과물이나 간식을 친구들과 나누기, 나눔 에티켓 실천 및 칭찬 격려.`,eval:`또래 친구들과 긍정적인 상호작용을 나누고 차례를 지켜 공유하는 태도 관찰`,intro:`친구들과 둥글게 둘러앉아 각자 경험한 활동 소개하기.`,body:`결과물 사이좋게 나누기, 친구에게 "고마워" 긍정적 언어 및 AAC로 표현하기.`,outro:`자리 주변 쓰레기 분리수거 및 정리정돈 스스로 하기.`,questionExample:`내가 경험한 기쁨을 친구들과 어떻게 나누어 볼 수 있을까요?`,feedbackTip:`나눔 과정에서 긍정적 피드백을 풍부하게 제공합니다.`},{title:`사후 포트폴리오: 나만의 배움 포트폴리오: 체험학습 스탬프북 및 추억 신문 제작`,summary:`체험 현장에서 찍은 나의 활동 사진 인화물 부착, 나만의 체험 일기 완성.`,eval:`자신의 체험 경험을 사진 및 다양한 표현 양식을 통해 시각적으로 구성하는지 포트폴리오 평가`,intro:`인쇄된 활동 사진들을 보며 가장 기억에 남는 장면 2~3가지 선택하기.`,body:`스탬프북/신문 양식에 사진 붙이기, 말풍선 스티커 꾸미기, 스스로 해낸 미션에 도장 찍기.`,outro:`완성된 나만의 체험학습 포트폴리오를 파일철에 보관하기.`,questionExample:`이 사진 속에서 나는 무엇을 하고 있었나요? 그때 기분은 어땠나요?`,feedbackTip:`소근육 조작이 어려운 학생에게는 벨크로 사진 카드나 굵은 펜을 제공합니다.`},{title:`사후 성찰: 배움 나눔 및 성찰: 나의 성장 소감 발표회 및 감사 편지 전달`,summary:`감정 카드/AAC/구어로 소감 발표하기, 스스로 해낸 점 칭찬하기, 감사 카드 쓰기.`,eval:`자신의 감정과 배운 점을 자기표현 방식으로 나타내고 경청하는 태도 평가`,intro:`우리 반 체험학습 하이라이트 영상 시청 및 성장 박수 나누기.`,body:`포트폴리오를 들고 한 명씩 앞으로 나와 "내가 혼자 해낸 것" 발표하기.`,outro:`전체 학생에게 '자립 탐험대 수료증' 수여 및 생활 실천 약속하기.`,questionExample:`이번 체험학습을 통해 '나 혼자서도 할 수 있어요!'라고 말할 수 있는 것은 무엇인가요?`,feedbackTip:`언어적 표현이 제한적인 학생도 박수, 태블릿 음성 등을 통해 동등하게 주인공으로 인정받도록 지원합니다.`}];for(let e=1;e<=t;e++){let o=[];o=e===1?[i]:e===t?r.length>1?[r[r.length-1]]:[i]:r.length>1?[r[e%r.length]]:[i];let u,d=`pre`,f=`사전 준비`,p=``;if(e<=a.pre){d=`pre`,f=`사전 준비`;let t=e-1,n=a.pre<=4?t:t%s.length;a.pre>4&&(p=` (${Math.floor(t/4)+1}회차)`),u={...s[Math.min(n,s.length-1)]}}else if(e<=a.pre+a.field){d=`field`,f=`현장 적용`;let t=e-a.pre-1,n=a.field<=2?t:t%c.length;a.field>2&&(p=` (${Math.floor(t/2)+1}회차)`),u={...c[Math.min(n,c.length-1)]}}else{d=`post`,f=`사후 정리`;let t=e-a.pre-a.field-1,n=a.post<=4?t:t%l.length;a.post>4&&(p=` (${Math.floor(t/4)+1}회차)`),u={...l[Math.min(n,l.length-1)]}}n.push({num:e,phase:d,phaseBadge:f,title:`${u.title}${p}`,standardsCodes:o,summary:u.summary,eval:u.eval,intro:u.intro,body:u.body,outro:u.outro,questionExample:u.questionExample,feedbackTip:u.feedbackTip})}return n}async function Ne(){try{let e=Z(L.plan);$(L.uploadedTemplateBuffer?`학교 고유 서식에 내용을 합성하고 있습니다...`:`한글(HWPX) 공문서 파일을 생성하고 있습니다...`,`info`),$((await E(L.plan,e,L.uploadedTemplateBuffer)).isCustomTemplate?`학교 서식에 합성된 .hwpx 파일이 다운로드되었습니다!`:`한글(HWPX) 표준 서식 파일이 성공적으로 다운로드되었습니다!`,`success`)}catch(e){console.error(`HWPX 다운로드 실패:`,e),$(`HWPX 파일 생성 중 문제가 발생했습니다. 입력 정보를 확인하신 후 다시 시도해 주세요.`,`error`)}}function Pe(){let e=L.plan,t=T(e,Z(e));navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t).then(()=>{$(`교육과정 전체 내용이 클립보드에 복사되었습니다.`,`success`)}).catch(()=>{Q(t)}):Q(t)}function Q(e){let t=document.createElement(`textarea`);t.value=e,t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();try{document.execCommand(`copy`),$(`교육과정 전체 내용이 클립보드에 복사되었습니다.`,`success`)}catch{$(`클립보드 복사에 실패했습니다.`,`error`)}document.body.removeChild(t)}function Fe(){let e=document.getElementById(`printContainer`),t=document.getElementById(`udlPrintArea`);e&&t&&(e.innerHTML=t.innerHTML,window.print())}function $(e,t=`info`){let n=document.getElementById(`toastShelf`);if(!n)return;let r=document.createElement(`div`);r.className=`soft-toast ${t===`error`?`toast-error`:t===`success`?`toast-success`:``}`,r.setAttribute(`role`,t===`error`?`alert`:`status`),r.tabIndex=0,r.textContent=e,n.appendChild(r);let i=t===`error`?5e3:3200,a=null,o=!1,s=e=>{a=setTimeout(()=>{r.style.opacity=`0`,setTimeout(()=>{r.parentNode&&r.parentNode.removeChild(r)},300)},e)};s(i),r.addEventListener(`mouseenter`,()=>{clearTimeout(a),o=!0}),r.addEventListener(`mouseleave`,()=>{o&&(o=!1,s(1500))}),r.addEventListener(`focusin`,()=>{clearTimeout(a),o=!0}),r.addEventListener(`focusout`,()=>{o&&(o=!1,s(1500))})}