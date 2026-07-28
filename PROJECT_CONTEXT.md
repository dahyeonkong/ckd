# CKD 홈페이지 현재 상태

마지막 업데이트: 2026-07-28

## 구현 완료

- `ckd_home` 메인 화면 전체 (Desktop / Tablet / Mobile)
  - Header (GNB ↔ 햄버거 메뉴 분기)
  - Hero (영상 + 브랜드 카피 + Bell 심볼)
  - 효종연구소
  - Platform Technologies (HDAC6 / Liquistal Crystal)
  - Pioneering Firsts (연혁 story 3종)
  - Quick Navigation (R&D / Investors, 배경 영상)
  - Innovation Beyond Borders (지구본 + 글로벌 파트너 카드 3종)
  - Advancing Medicine (제품 카드 3종)
  - Footer (기업정보 + family site select)

## 구현 중

- 없음

## 확정된 UX 정책

- 태블릿 breakpoint는 **834px** 사용 (PRD의 768px 대신 Figma iPad 프레임 실측값. 사용자 확인 완료)
- 모바일 전체 메뉴는 닫힌 상태로 시작하며, 링크 클릭 또는 Escape로 닫힘
- family site select는 닫힌 상태로 시작하며, 외부 클릭 또는 Escape로 닫힘
- 스크롤 등장 애니메이션의 초기 상태는 GSAP이 관리한다. CSS로 숨기지 않으므로 스크립트가 실패해도 콘텐츠는 항상 노출된다
- hover 효과는 `@media (hover: hover)` 안에만 둔다 (터치 기기에서 hover 잔상 방지)
- Quick Navigation 배경은 `flask.mp4`(R&D) / `investor.mp4`(Investors) 영상 사용 (사용자 확인 완료)
- 디자인에 정의가 없는 상태(Disabled)는 구현하지 않는다

## 사용 중인 라이브러리

모두 CDN으로 연결합니다. 로컬 설치 및 `package.json` 없음.

- **Pretendard Variable** (jsdelivr): 본문 기본 폰트
- **Poppins** (Google Fonts): 영문 섹션 타이틀 (`.con_title`), footer 워터마크
- **GSAP 3.12.5**: Hero 카피 등장, Bell 등장, 섹션 reveal
- **ScrollTrigger 3.12.5**: 스크롤 연동 트리거 (총 14개 생성)
- **Lenis 1.1.13**: 부드러운 스크롤
- **Swiper**: 사용하지 않음. 모바일 global 카드는 CSS `overflow-x: auto` + `scroll-snap`으로 처리

## 저장 데이터

- 없음 (localStorage 미사용)

## 알려진 문제

- `earth.gif` 14.9MB, `hyojong.png` 3.1MB, `history_bg.png` 2.4MB, `wing.png` 1.2MB로 용량이 큽니다. 초기 로딩 성능에 영향이 있어 최적화 검토가 필요합니다.
- 브라우저가 영상 자동재생을 차단하면 Hero와 Quick Navigation은 배경색만 노출됩니다. 디자인에 대체 이미지가 없어 별도 fallback을 만들지 않았습니다.
- GNB 7개 메뉴는 하위 페이지가 없어 모두 현재 페이지 섹션 앵커로 연결되어 있습니다. 실제 IA 확정 시 교체가 필요합니다.

## 확인이 필요한 디자인 판단

1. **Platform Technologies 카드 구성** — Desktop 프레임은 HDAC6만, Tablet 프레임은 Liquistal Crystal만 이미지·설명·버튼을 갖고 있습니다. hover variant의 서로 다른 상태를 캡처한 것으로 보여, Mobile 프레임(둘 다 전체 구성)을 기준으로 통일했습니다.
2. **"CKD PHARM" 워터마크 농도** — Figma 코드값은 `opacity: 0.6`이나 실제 렌더 스크린샷과 대조 시 훨씬 옅어 `0.18`로 조정했습니다. 토큰과 다른 값입니다.
3. **Desktop Pioneering Firsts 콘텐츠** — Desktop은 "World First / Korea's First" 라벨만, Tablet/Mobile은 실제 연혁 문구를 갖고 있습니다. 정보량이 많은 연혁 문구로 전 브레이크포인트를 통일했습니다.

## 그 외 주요 구현 판단

- **Figma `glass` 이펙트 재현**: 코드 변환 시 `bg-[rgba(0,0,0,0)]`(투명)으로 떨어져 global 카드 텍스트가 지구본 위에서 읽히지 않았습니다. 원본 렌더와 대조해 `rgba(255,255,255,0.35)` + `blur(16px)` + 흰색 반투명 보더로 재현했습니다.
- **로고 크롭**: `logo_main.png` 원본에 심볼과 워드마크가 함께 있어 심볼이 중복 노출됐습니다. Figma가 좌측 33%를 잘라 쓰는 것과 동일하게 `object-fit: cover; object-position: right center`로 처리했습니다.
- **제품 카드 폭**: Figma 모바일(402px)의 170px 고정 폭 2열이 360px에서 넘쳐, `calc((100% - 20px) / 2)` + `max-width: 170px`로 변경해 360px에서도 2열을 유지합니다.
- **에셋 매핑**: 이미지를 직접 열어 `tech1.png`(DNA 나선) → HDAC6, `tech2.png`(주사제) → Liquistal Crystal로 확정했습니다.

## 다음 작업

1. 확인이 필요한 디자인 판단 3건에 대한 디자이너 확인
2. 대용량 에셋 최적화 (`earth.gif` → webm/webp, PNG 압축)
3. Edge / Safari 실기기 확인 (특히 `backdrop-filter`)
4. Lighthouse 성능·접근성 측정
5. GNB 하위 페이지 IA 확정 후 링크 교체

## 마지막 검증 결과

- 실행 방법: 브라우저에서 `index.html` 직접 실행 (빌드 도구 없음)
- 결과: 통과

| 항목 | 결과 |
|---|---|
| 360px 가로 스크롤 | 없음 (scrollWidth 360 = innerWidth 360) |
| 834px 가로 스크롤 | 없음 (819 < 834) |
| 1280px 가로 스크롤 | 없음 (1265 < 1280) |
| 콘솔 오류 | 0건 |
| 라이브러리 로드 | GSAP 3.12.5 / ScrollTrigger 3.12.5 / Lenis 정상 |
| ScrollTrigger 생성 | 14개 (bell 1 + reveal 9 + 타이틀 4) |
| 스크롤 reveal | 스크롤 시 opacity 0 → 1 복원 확인 |
| 햄버거 메뉴 | 열림/닫힘, aria-expanded 갱신, body 스크롤 잠금, Escape 닫기 정상 |
| family site select | 열림/닫힘, aria-expanded 갱신, Escape 닫기 정상 |
| img alt 누락 | 0건 |
| :focus-visible | 포커스 시 아웃라인 렌더 확인 |
| Figma 시각 대조 | 모바일 history / global / product 섹션 대조 후 라운드 방향·glass 배경·2열 배치 수정 |

- 확인 화면: 360px, 834px, 1280px
- 확인하지 못한 부분:
  - `prefers-reduced-motion` 실제 동작 (CSS·JS 구현 및 규칙 존재는 확인, OS 설정 전환 테스트 불가)
  - Edge / Safari (프리뷰가 Chromium 단일 엔진)
  - Lighthouse 성능·접근성 점수 (측정 도구 미실행)
