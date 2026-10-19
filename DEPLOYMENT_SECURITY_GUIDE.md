# 🚀 현장체험학습 챗봇 배포 계획 및 보안 가이드 (Deployment & Security Guide)

본 문서는 **특수교육 현장체험학습 교육과정 재구성 챗봇 및 HWPX 공문서 기안기**의 프로덕션 배포 전략, 보안 아키텍처 및 운영 체크리스트를 정의합니다.

---

## 1. 애플리케이션 아키텍처 및 보안 특성

| 항목 | 아키텍처 특성 | 보안 이점 |
|---|---|---|
| **실행 환경** | 100% 브라우저 클라이언트 사이드 (Zero-Backend SPA) | 서버 데이터베이스 침해 및 데이터 유출 원천 차단 |
| **개인정보 처리** | 학생 특성 및 교육과정 데이터 로컬 메모리 처리 | 외부 API/LLM 서버로 학생 민감 정보 전송 일체 없음 |
| **문서 생성** | 브라우저 내 JSZip 기반 순수 클라이언트 HWPX 바이너리 조합 | 서버 경유 없이 사용자 로컬 브라우저에서 직접 파일 다운로드 |
| **외부 의존성** | Google Fonts 외 외부 서드파티 스크립트 없음 | 서드파티 공급망 공격(Supply Chain Attack) 위험 최소화 |

---

## 2. 배포 옵션 및 단계별 가이드 (Deployment Options)

### 옵션 A: Vercel (권장 - 1분 자동 배포 및 글로벌 보안 CDN)
- **장점**: 사전 구성된 [`vercel.json`](file:///c:/Users/Baerae/Desktop/agentic/체험학습%20챗봇/vercel.json)을 통해 강력한 보안 헤더(CSP, HSTS, X-Frame-Options) 자동 적용, 전 세계 무료 HTTPS 제공.
- **배포 방법**:
  ```bash
  # Vercel CLI 사용 시
  npx vercel --prod
  ```
  또는 [Vercel 대시보드](https://vercel.com)에서 GitHub 저장소를 연결하면 `main` 브랜치 푸시 시 자동 배포됩니다.

---

### 옵션 B: Cloudflare Pages (강력 추천 - 무료 무제한 트래픽)
- **장점**: [`public/_headers`](file:///c:/Users/Baerae/Desktop/agentic/체험학습%20챗봇/public/_headers)를 통해 엄격한 보안 헤더가 자동 적용되며 디도스(DDoS) 방어가 기본 활성화됩니다.
- **배포 설정**:
  - Build command: `npm run build`
  - Build output directory: `dist`

---

### 옵션 C: GitHub Pages (무료 정적 웹 호스팅)
- **장점**: 별도 계정 없이 GitHub 저장소만으로 배포 가능.
- **자동화**: [`.github/workflows/deploy.yml`](file:///c:/Users/Baerae/Desktop/agentic/체험학습%20챗봇/.github/workflows/deploy.yml) 워크플로우가 구성되어 있어, GitHub에 푸시하면 의존성 보안 검사(`npm audit`) 후 자동으로 배포됩니다.
- **GitHub 저장소 설정**:
  1. `Settings` > `Pages` 이동
  2. `Source`를 **GitHub Actions**로 설정

---

### 옵션 D: 교육청 인트라넷 / 학교 내부망 독립 배포 (망분리 환경)
- **장점**: 교육망/나이스(NEIS) 내부망에서 인터넷 연결 없이도 완벽 작동.
- **배포 방법**:
  1. `npm run build` 명령으로 `dist/` 폴더를 생성합니다.
  2. `dist/` 폴더의 정적 파일들을 학교 내부 웹 서버(Apache, Nginx, IIS 또는 Docker)에 복사합니다.
  - **Nginx 샘플 설정**:
    ```nginx
    server {
        listen 80;
        server_name special-fieldtrip.school.kr;
        root /var/www/fieldtrip/dist;
        index index.html;

        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "DENY" always;
        add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self' blob:; worker-src 'self' blob:;" always;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
    ```

---

## 3. 적용된 보안 조치 내역 (Implemented Security Measures)

1. **콘텐츠 보안 정책 (CSP: Content-Security-Policy) & 이벤트 위임 아키텍처**
   - 스크립트 실행을 오직 자체 출처(`'self'`)로 제한하여 악의적인 XSS(크로스 사이트 스크립팅) 공격 방어.
   - 인라인 이벤트 핸들러(`onclick`, `oninput` 등)를 일체 사용하지 않고, 100% 최신 자바스크립트 이벤트 위임(Event Delegation) 아키텍처로 구현하여 완벽한 CSP 준수.
   - 폰트 및 스타일은 승인된 Google Fonts 및 Pretendard CDN(`https://cdn.jsdelivr.net`) 도메인과 자체 리소스만 허용.
   - HWPX 파일 생성을 위한 `blob:` 스킴만 안전하게 인가.

2. **클릭재킹 방어 (Clickjacking Defense)**
   - `X-Frame-Options: DENY` 및 CSP `frame-ancestors 'none'` 적용으로 외부 iframe 내 삽입 원천 차단.

3. **MIME 스니핑 방어**
   - `X-Content-Type-Options: nosniff` 적용으로 브라우저가 파일 형식을 임의 변조 해석하지 못하도록 차단.

4. **HTTPS 강제 및 전송 보안**
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` 적용으로 암호화되지 않은 HTTP 연결 차단.

5. **브라우저 기능 격리 (Permissions-Policy)**
   - 카메라, 마이크, 결제 모듈, 위치 정보 등 불필요한 하드웨어 접근 권한을 선제적으로 비활성화(`camera=(), microphone=(), geolocation=()`).

6. **개인정보보호법 및 교육 데이터 안전성**
   - 학생 이름이나 장애 특성 등 민감한 정보가 외부 서버 로그나 분석 도구로 유출되지 않도록 전송 로직 자체를 배제한 완전한 클라이언트 단독 처리 구조.
   - [`index.html`](file:///c:/Users/Baerae/Desktop/agentic/체험학습%20챗봇/index.html) 및 [`hwpx-generator.js`](file:///c:/Users/Baerae/Desktop/agentic/체험학습%20챗봇/hwpx-generator.js)에서 입력값의 안전한 XML 이스케이핑(`escapeXml`) 완료.

---

## 4. 운영 및 배포 전 검증 체크리스트

- [x] `npm test` 자동화 단위 테스트 전건(15/15) 통과 검증 완료
- [x] `npm run build` 프로덕션 빌드 정상 완료 (Vite 청크 분할로 메인 JS 96kB 경량화 달성, 500kB 초과 경고 0건)
- [x] `npm audit` 취약점 검사 0건 확인
- [x] CSP 및 보안 헤더 세팅 (`index.html`, `vercel.json`, `public/_headers`)
- [x] 학교 고유 .hwpx 서식 메모리 버퍼 실제 단락 및 필드 합성 기능 검증 완료
- [x] 단계별 입력 유효성 검증(`validateStep`) 및 세션 스토리지 방어적 복원 로직 탑재
- [x] 성취기준 멀티라인 붙여넣기 및 `[직접-N]` 고유 ID 충돌 방지 로직 적용
- [x] 고등학교 51개 전 교과목 드롭다운 필터 및 검색 결과 페이징 적용
- [x] 소스코드 및 데이터 파이프라인(`build-curriculum.mjs`) 추적 구성 완료
- [x] GitHub Pages 자동 배포 CI/CD 워크플로우에 단위 테스트 및 빌드 검증 반영 완료
