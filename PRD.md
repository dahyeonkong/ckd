# CKD Pharmaceutical Website Redesign PRD

## 1. 제품 개요

종근당의 브랜드 철학과 연구개발 역량을 직관적인 인터랙션과 콘텐츠 중심의 경험으로 전달하는 기업 홈페이지를 구축합니다.

---

## 2. 문제 정의

- 기존 종근당 홈페이지는 기업의 연구개발 역량과 글로벌 경쟁력을 효과적으로 전달하지 못한다.
- 브랜드 상징인 종(Bell)의 의미가 사용자 경험에 충분히 반영되지 않는다.
- 콘텐츠가 단순 나열되어 있어 기업 스토리와 기술력을 직관적으로 이해하기 어렵다.
- 모바일 환경에서 브랜드 경험의 일관성이 부족하다.

---

## 3. 목표 사용자

- 주요 사용자
    - 일반 방문자
    - 투자자(IR)
    - 의료진 및 연구 관계자
    - 채용 지원자
    - 글로벌 파트너

- 사용 환경
    - Desktop 우선
    - Tablet
    - Mobile

---

## 4. 제품 목표

- 사용자가 종근당의 브랜드 철학과 연구개발 역량을 자연스럽게 이해할 수 있어야 한다.
- 스크롤 기반 스토리텔링을 통해 콘텐츠를 순차적으로 경험할 수 있어야 한다.
- 브랜드 상징인 종(Bell)을 핵심 인터랙션 요소로 활용해야 한다.
- Desktop, Tablet, Mobile 환경에서 동일한 브랜드 경험을 제공해야 한다.
- Figma 디자인과 동일한 시각적 결과물을 구현해야 한다.
---

## 5. 제외 범위

- 로그인
- 회원가입
- 관리자 페이지
- 실제 검색 기능
- 실제 뉴스 API
- 실제 IR 데이터 연동
- CMS
- 서버 개발
- 데이터베이스 구축

---

## 6. 디자인 기준

- 제공된 Figma 파일을 기준으로 구현한다.
- Desktop 디자인 기준 폭은 1920px이다.
- Auto Layout 구조를 유지한다.
- Pretendard와 Poppins를 사용한다.
- Color Token을 우선 사용한다.
- 디자인에 없는 UI, 아이콘, 이미지를 임의로 추가하지 않는다.
- Hover, Scroll Interaction은 디자인 의도를 유지하여 구현한다.
---

## 7. 핵심 기능

- Hero Scroll Storytelling: 스크롤에 따라 Hero가 축소되고 다음 콘텐츠가 등장한다.
- Platform Technologies Hover: 카드 Hover 시 상태가 변경된다.
- Quick Navigation: R&D, Investors 페이지 이동
- Pioneering Firsts Timeline: 스크롤 기반 콘텐츠 노출
- Global Partnership Showcase: 글로벌 협력 사례 노출
- Product Showcase: 대표 제품 정보 제공
- Responsive Layout: Desktop, Tablet, Mobile 대응

---

## 8. 화면 목록과 목적

### Hero

- 목적
    - 첫 화면에서 브랜드 철학 전달

- 주요 행동
    - 스크롤

- 필요한 정보
    - 브랜드 슬로건
    - Hero 영상

- 이동 경로
    - Landing → About

---

### About

- 목적
    - 종근당의 상징 소개

- 주요 행동
    - 스크롤

- 필요한 정보
    - Bell Symbol

---

### Research Campus

- 목적
    - 연구개발 인프라 소개

- 주요 행동
    - 스크롤

---

### Platform Technologies

- 목적
    - 핵심 연구 플랫폼 소개

- 주요 행동
    - Hover
    - Click

- 필요한 정보
    - HDAC6
    - Liquistal Crystal

---

### Pioneering Firsts

- 목적
    - 종근당의 혁신 역사 전달

- 주요 행동
    - Scroll
    - Timeline 탐색

---

### Quick Navigation

- 목적
    - 주요 서비스 이동

- 주요 행동
    - Hover
    - Click

---

### Innovation Beyond Borders

- 목적
    - 글로벌 협력 네트워크 소개

- 주요 행동
    - Hover
    - Scroll

---

### Advancing Medicine

- 목적
    - 대표 의약품 소개

- 주요 행동
    - Slide
    - Hover

---

### Footer

- 목적
    - 회사 정보 제공

---

## 9. 사용자 흐름

1. 사용자가 홈페이지에 진입한다.
2. Hero Video와 브랜드 메시지를 확인한다.
3. 스크롤을 진행하면 Hero 영역이 축소된다.
4. Bell 오브젝트가 등장하며 브랜드 스토리를 전달한다.
5. 사용자는 연구개발, 플랫폼 기술, 글로벌 협력, 제품 정보를 순차적으로 탐색한다.
6. 사용자는 R&D 또는 Investors 페이지로 이동한다.

---

## 10. 화면 상태

- 기본 상태: Hero Video 및 콘텐츠 노출
- 로딩 상태: 영상 및 이미지 로딩
- 빈 상태: 해당 없음
- 오류 상태: 이미지 또는 영상 로딩 실패
- 비활성 상태: Disabled 버튼 사용 시
- Hover 상태: 버튼, 카드 상태 변경
- Scroll 상태: Hero 및 콘텐츠 Reveal 애니메이션 진행

---

## 11. 데이터와 저장

- 데이터 출처
    - 정적 JSON
    - 로컬 이미지
    - 로컬 영상

- 브라우저 저장
    - 없음

- 저장하지 않는 정보
    - 개인정보
    - 사용자 입력

---

## 12. 개발 조건

- HTML
- CSS
- JavaScript
- GSAP
- ScrollTrigger
- Lenis
- Swiper (필요한 영역만)

React, Vue, TypeScript는 사용하지 않습니다.

---

## 13. 명명 규칙

- CSS Class : snake_case
- State : is_active
- State : is_open
- State : is_hover
- JavaScript : camelCase
- Boolean : is / has / can
- Event : handleXxx()

---

## 14. 반응형 기준

- 모바일: 402px
- 태블릿: 834px
- 데스크톱: 1280px 이상
- 디자인 원본 기준 폭: 1920px
- 모바일은 단일 컬럼 레이아웃을 사용한다.
- 태블릿은 2열 레이아웃을 사용한다.
- 모든 해상도에서 가로 스크롤이 발생하지 않아야 한다.

---

## 15. 접근성

- button과 a를 목적에 맞게 사용합니다.
- 이미지에 alt를 제공합니다.
- focus-visible을 지원합니다.
- 명도 대비를 확보합니다.
- prefers-reduced-motion을 지원합니다.

---

## 16. 인터랙션 라이브러리

- Hover Animation은 CSS Transition을 우선 사용한다.
- Hero Scroll Animation은 GSAP + ScrollTrigger를 사용한다.
- Section Reveal Animation은 GSAP + ScrollTrigger를 사용한다.
- Platform Technologies Hover는 CSS 또는 GSAP을 사용한다.
- Lenis를 사용하여 부드러운 스크롤을 제공한다.
- Swiper는 제품 슬라이드가 필요한 경우에만 사용한다.

### GSAP

- Hero 등장 애니메이션
- Section Reveal
- Text Animation

### ScrollTrigger

- Hero 축소
- Bell 등장
- Timeline
- Global Network
- Product Reveal

### Lenis

- 부드러운 스크롤

### Swiper

- Product 영역

---

## 17. 검증 방법

- Figma와 픽셀 단위 비교
- Chrome / Edge / Safari 테스트
- Mobile / Tablet / Desktop 확인
- 모든 Hover 확인
- Scroll Animation 확인
- Console Error 제거
- Lighthouse 접근성 점검

---

## 18. 완료 조건

- 디자인과 동일한 UI 구현
- Hero Animation 정상 동작
- Scroll Animation 정상 동작
- Platform Hover 정상 동작
- Product Interaction 정상 동작
- 모든 링크 정상 연결
- 반응형 대응 완료
- 접근성 검증 완료
- Console Error 없음
- Lighthouse Performance 및 Accessibility 기준 충족

## 검증과 결과 보고

### 검증

- Desktop(1280px 이상)에서 디자인 시안과 비교합니다.
- Tablet(768px)에서 레이아웃을 확인합니다.
- Mobile(360px)에서 레이아웃을 확인합니다.
- 페이지 전체에 가로 스크롤이 없는지 확인합니다.
- 모든 링크와 버튼을 실제로 클릭하여 확인합니다.
- Hover 인터랙션을 확인합니다.
- Hero Scroll Animation을 확인합니다.
- Platform Technologies Hover 상태를 확인합니다.
- Console Error가 없는지 확인합니다.
- prefers-reduced-motion 동작을 확인합니다.

### 결과 보고

- 변경 파일
- 구현 내용
- 주요 판단
- 검증 결과
- 확인하지 못한 부분

을 구분하여 작성합니다.b

## 브랜드 경험 목표

- 종(Bell)을 브랜드 상징으로 활용한다.
- "기다리는 것이 아니라 만드는 것입니다." 메시지를 중심으로 경험을 설계한다.
- 브랜드 철학 → 연구개발 → 플랫폼 기술 → 최초의 성과 → 글로벌 협력 → 제품 소개 순으로 스토리텔링을 구성한다.
- 사용자가 스크롤만으로 브랜드 가치를 자연스럽게 이해할 수 있어야 한다.