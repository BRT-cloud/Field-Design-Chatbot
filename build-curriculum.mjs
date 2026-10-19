import fs from 'fs';

// 1. Load standard-texts.json
const rawTexts = JSON.parse(fs.readFileSync('korean-secondary-learning-map-mcp-main/data/kr/standard-texts.json', 'utf8'));
const textsMap = new Map();
for (const item of rawTexts.texts) {
  if (item.key) textsMap.set(item.key, item.text);
  if (item.code && !textsMap.has(item.code)) {
    textsMap.set(item.code, item.text);
  }
}
console.log('textsMap loaded:', textsMap.size);

// 2. Load curriculum-standards.json
const rawStds = JSON.parse(fs.readFileSync('korean-secondary-learning-map-mcp-main/data/kr/curriculum-standards.json', 'utf8'));
const courses = rawStds.curricula || rawStds;

function isAllowedMiddle(c) {
  const subj = c.subjectKorean;
  // 중학교: 국어, 수학, 사회 (역사, 도덕 포함), 진로
  return ['국어', '수학', '사회', '역사', '도덕', '진로와 직업'].includes(subj);
}

function isAllowedHigh(c) {
  const subj = c.subjectKorean;
  const grp = c.subjectGroupKorean;

  // 배제 과목군 (외국어, 한문, 과학, 예술, 체육 등)
  if (['영어', '제2외국어', '한문', '과학', '과학 계열', '예술 계열', '미술', '음악', '체육', '체육 계열'].includes(grp)) {
    return false;
  }
  if (subj.includes('영어') || subj.includes('중국어') || subj.includes('일본어') || subj.includes('외국어') || subj.includes('영미')) {
    return false;
  }

  // 1. 국어과
  if (grp === '국어' || subj.includes('국어') || ['독서와 작문', '문학', '화법과 언어', '매체 의사소통', '직무 의사소통', '독서 토론과 글쓰기', '주제 탐구 독서', '문학과 매체', '언어생활 탐구'].includes(subj)) {
    return true;
  }

  // 2. 수학과
  if (grp === '수학' || subj.includes('수학') || ['대수', '기하', '미적분Ⅰ', '미적분Ⅱ', '확률과 통계', '실용 통계'].includes(subj)) {
    return true;
  }

  // 3. 사회과 (역사, 지리, 경제, 정치, 도덕/윤리 포함)
  if (grp === '사회(역사 포함)' || grp === '도덕' || subj.includes('사회') || subj.includes('한국사') || subj.includes('지리') || subj.includes('경제') || subj.includes('윤리') || subj.includes('정치') || subj.includes('세계사')) {
    return true;
  }

  // 4. 진로과
  if (subj.includes('진로')) {
    return true;
  }

  return false;
}

const middleList = [];
const highList = [];
const middleSeen = new Set();
const highSeen = new Set();

for (const c of courses) {
  const level = c.schoolLevel;
  if (level === 'middle' && isAllowedMiddle(c)) {
    const subj = c.subjectKorean;
    for (const s of (c.standards || [])) {
      const rawCode = s.code ? s.code.trim() : '';
      if (!rawCode || rawCode === '[]') continue;
      const code = rawCode.startsWith('[') ? rawCode : `[${rawCode}]`;
      if (middleSeen.has(code)) continue;
      middleSeen.add(code);

      const fullText = textsMap.get(s.key) || textsMap.get(code) || s.summary || '';
      const title = s.domainKorean ? `${subj} (${s.domainKorean})` : subj;

      middleList.push({
        code,
        subject: subj,
        schoolLevel: '중학교',
        title,
        desc: fullText.trim()
      });
    }
  } else if (level === 'high' && isAllowedHigh(c)) {
    const subj = c.subjectKorean;
    for (const s of (c.standards || [])) {
      const rawCode = s.code ? s.code.trim() : '';
      if (!rawCode || rawCode === '[]') continue;
      const code = rawCode.startsWith('[') ? rawCode : `[${rawCode}]`;
      if (highSeen.has(code)) continue;
      highSeen.add(code);

      const fullText = textsMap.get(s.key) || textsMap.get(code) || s.summary || '';
      const title = s.domainKorean ? `${subj} (${s.domainKorean})` : subj;

      highList.push({
        code,
        subject: subj,
        schoolLevel: '고등학교',
        title,
        desc: fullText.trim()
      });
    }
  }
}
console.log('Middle standards (국어/수학/사회/진로):', middleList.length);
console.log('High standards (국어/수학/사회/진로):', highList.length);

// 3. Load Elementary standards from elementary-standards.json (초등 성취기준 체크리스트 순정 내용)
const elemRaw = JSON.parse(fs.readFileSync('elementary-standards.json', 'utf8'));
const elemSeen = new Set();
const elemList = [];

for (const item of elemRaw) {
  const code = item.code.trim();
  const rawCodeNum = code.replace('[', '');
  // 초등학교 성취기준 코드 확인: 2 (1~2학년), 4 (3~4학년), 6 (5~6학년)
  if (!rawCodeNum.startsWith('2') && !rawCodeNum.startsWith('4') && !rawCodeNum.startsWith('6')) {
    continue;
  }

  if (!elemSeen.has(code)) {
    elemSeen.add(code);
    let desc = item.desc || '';
    desc = desc.replace(/(중학교|고등학교|초등학교|1-2학년|3-4학년|5-6학년)$/g, '').trim();
    elemList.push({
      code,
      subject: item.subject,
      schoolLevel: '초등학교',
      title: `${item.subject} (${code})`,
      desc
    });
  }
}
console.log('Elementary standards (체크리스트 제공 내용):', elemList.length);

// 4. Output unified curriculum-data.js
const result = {
  elementary: elemList,
  middle: middleList,
  high: highList
};

const outputContent = `// Auto-generated unified curriculum standards for 초등학교, 중학교, 고등학교\n// 초등학교: 성취기준 체크리스트 제공 내용 (국어, 수학, 사회, 바른생활, 슬기로운생활, 즐거운생활)\n// 중학교/고등학교: 2022 개정 국어, 수학, 사회, 진로 관련 교과\nexport const curriculumAll = ${JSON.stringify(result, null, 2)};\n`;
fs.writeFileSync('curriculum-data.js', outputContent, 'utf8');
console.log('Successfully written curriculum-data.js!');

