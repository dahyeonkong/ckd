# CKD Pharmaceutical Website Redesign PRD

## 1. 제품 개요

종근당의 브랜드 철학과 연구개발 역량을 직관적인 인터랙션과 콘텐츠 중심의 경험으로 전달하는 기업 홈페이지를 구축합니다.

---

## 2. 문제 정의

- 기존 홈페이지는 정보 전달 중심으로 구성되어 브랜드 경험이 부족합니다.
- 기업의 역사와 연구개발 성과를 효과적으로 전달하지 못합니다.
- 콘텐츠의 계층 구조가 복잡하여 원하는 정보를 빠르게 찾기 어렵습니다.
- 인터랙션이 제한적이어서 사용자의 몰입도가 낮습니다.
- 글로벌 제약기업으로서의 이미지를 충분히 표현하지 못합니다.

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

- 종근당 브랜드 아이덴티티를 효과적으로 전달할 수 있어야 합니다.
- 기업의 역사와 연구개발 역량을 스토리텔링 방식으로 경험할 수 있어야 합니다.
- 사용자가 필요한 정보를 직관적으로 탐색할 수 있어야 합니다.
- 인터랙션을 통해 기업의 혁신성과 미래지향적인 이미지를 표현해야 합니다.
- Figma 디자인을 높은 수준으로 구현해야 합니다.

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

- 제공된 Figma 디자인을 기준으로 구현합니다.
- 새로운 레이아웃을 임의로 추가하지 않습니다.
- 제공된 이미지와 영상을 우선 사용합니다.
- Primary Color는 Deep Navy 계열을 유지합니다.
- White Space 중심의 레이아웃을 유지합니다.
- Typography, Radius, Spacing을 디자인 기준으로 구현합니다.

---

## 7. 핵심 기능

- Hero Section
    - 브랜드 메시지 전달
    - Hero Scroll Animation

- About CKD
    - 기업 상징 소개
    - Bell Symbol Animation

- Research Campus
    - 기업 연구소 소개
    - Parallax 효과

- Platform Technologies
    - 연구 플랫폼 소개
    - Hover Interaction

- Pioneering Firsts
    - 세계 최초 및 국내 최초 업적 소개
    - Scroll Animation

- Quick Navigation
    - Research & Development
    - Investors

- Innovation Beyond Borders
    - 글로벌 협력 네트워크 소개
    - Interactive Globe Animation

- Advancing Medicine
    - 대표 제품 소개
    - Product Slider

- Footer
    - 기업 정보
    - Sitemap

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

1. 사용자가 홈페이지에 접속합니다.
2. Hero 영상과 브랜드 메시지를 확인합니다.
3. 스크롤을 통해 기업의 철학과 연구개발 역량을 탐색합니다.
4. Platform Technology를 확인합니다.
5. 기업의 주요 성과를 확인합니다.
6. 글로벌 네트워크를 확인합니다.
7. 대표 제품을 탐색합니다.
8. 필요한 메뉴로 이동합니다.

---

## 10. 화면 상태

- 기본 상태
    - 디자인 시안과 동일한 콘텐츠 표시

- 로딩 상태
    - Hero 영상 및 이미지 Lazy Loading

- 빈 상태
    - 콘텐츠 준비 중 표시

- 오류 상태
    - 이미지 로드 실패 시 Placeholder 표시

- 비활성 상태
    - 현재 페이지 메뉴 Active 유지

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

- Mobile : 360px
- Tablet : 768px
- Desktop : 1440px 기준 제작
- Ultra Wide 대응
- Horizontal Scroll 금지

---

## 15. 접근성

- button과 a를 목적에 맞게 사용합니다.
- 이미지에 alt를 제공합니다.
- focus-visible을 지원합니다.
- 명도 대비를 확보합니다.
- prefers-reduced-motion을 지원합니다.

---

## 16. 인터랙션 라이브러리

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