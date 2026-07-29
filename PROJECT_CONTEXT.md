# CKD 홈페이지 현재 상태

마지막 업데이트: 2026-07-29

## 구현 완료

- **hero_ani 스크롤 인터랙션** — 스크롤에 따라 hero가 축소·소멸하고 bell이 등장, 이어서 hyojong이 확대되며 화면을 채움
- 전체 메뉴 (`2398:49`)
  - Desktop: GNB 각 항목 hover 시 LNB 드롭다운 패널 노출 (6개 패널)
  - Tablet / Mobile: 햄버거 버튼 → 302px 우측 드로어 + 아코디언 하위 메뉴
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

## 검수 반영 (2026-07-29)

- **header 글자색 구간 전환** — `platform`, `quick_menu`, `global`, `new_area` 위를 지날 때 `.header.is_dark_text` 부여. gnb는 `--color_blue01`, right(채용공고/KOR)는 `--color_blue04`(#415A78, 이번에 신규 추가된 토큰). `history`는 배경이 짙은 남색이라 **제외**(사용자 확정).
- **전체 메뉴 열림 중 header 숨김** — `.header.is_hidden`(opacity 0 + visibility hidden). 드로어에 자체 X 버튼이 있어 햄버거가 가려져도 닫을 수 있음.

## 확정된 UX 정책

- 태블릿 breakpoint는 **834px** 사용 (PRD의 768px 대신 Figma iPad 프레임 실측값. 사용자 확인 완료)
- **hero_ani 인터랙션**
  - `hero_ani`를 ScrollTrigger로 pin하고, 스크롤 거리 `viewport 높이 × 1.6` 동안 scrub(0.8) 진행
  - 진행 0~1: hero `scale 1 → 0.32`, `border-radius 0 → 60px`
  - 진행 0.5~0.85: hero `opacity 1 → 0`
  - 진행 0.45~0.95: bell `scale 0.35 → 1`, `opacity 0 → 1` (`back.out(1.5)`)
  - bell은 hero 위에 절대배치로 겹쳐 두고 중앙 정렬은 `margin`으로 처리 (GSAP이 `transform`을 쓰므로 `translate(-50%)` 사용 불가)
  - bell의 초기 상태는 GSAP `set`이 부여하므로, 스크립트 미실행 시 bell은 hero 중앙에 그대로 노출됨
  - `end`를 함수로 두고 `invalidateOnRefresh`를 켜 리사이즈 시 스크롤 거리 재계산
- **hyojong 등장 인터랙션**
  - hero pin이 끝나는 지점부터 뷰포트 1개 높이 동안 `scale 0.5 → 1`, `opacity 0.15 → 1`, `border-radius 80px → 0` (`power1.out`, scrub 0.8)
  - 트리거는 `start: "top bottom"` / `end: "top top"`. hyojong의 상단이 pin-spacer 바로 아래에 있어 **pin 종료 지점과 시작 지점이 정확히 일치**함 (별도 오프셋 계산 불필요)
  - hyojong은 DOM 순서를 유지한 일반 흐름 요소로 두었다. 무대에 겹쳐 올리지 않았으므로 브레이크포인트별 hyojong 레이아웃(모바일 이미지 없음 등)이 그대로 유지된다
  - 초기 상태를 CSS가 아닌 GSAP `fromTo`가 부여하므로 스크립트 미실행 시 hyojong은 정상 크기로 노출됨
- **전체 메뉴 노출 방식**
  - 1280px 이상: GNB 항목 hover 시 드롭다운(LNB). CSS `:hover` / `:focus-within`이 표시를 담당하고 JS는 `aria-expanded`와 Escape만 처리
  - 1280px 미만: 햄버거 → 302px 우측 드로어. 하위 메뉴는 아코디언이며 **한 번에 하나만** 펼쳐짐
  - 드로어를 닫으면 펼쳐둔 아코디언은 모두 초기화됨
  - 드로어는 dim 클릭 / X 버튼 / Escape / 링크 클릭으로 닫힘
  - `고객센터/CCM`은 하위 메뉴가 없어 드롭다운·아코디언 없이 링크로만 동작 (Figma 동일)
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
- **Lenis 1.1.13**: 부드러운 스크롤. GSAP `ticker`에 물려 스크롤과 ScrollTrigger가 같은 프레임에 갱신되도록 연동 (`lagSmoothing(0)`)
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
| GNB 드롭다운 (1280px+) | 7개 항목 중 6개에 패널 노출. 링크 수 7/3/5/3/2/0/10로 Figma와 일치. 패널 220px, 헤더 바로 아래 정렬 |
| GNB 드롭다운 표시/해제 | `:focus-within` 기준 visibility hidden→visible, opacity 0→1, transform 복귀 확인. 포커스 해제 시 원복 확인 |
| 드로어 열기/닫기 | 햄버거·X·dim·Escape 모두 정상. `aria-expanded`·body 스크롤 잠금·버튼 레이블 갱신 확인 |
| 드로어 아코디언 | 펼침/접힘, 다른 항목 열면 이전 항목 자동 닫힘, 드로어 닫으면 전체 초기화 확인 |
| 드로어 열림 중 가로 스크롤 | 없음 (360px에서 docW 360 유지, 드로어 폭 302px) |
| hero pin 생성 | `hero_ani` pin, start 0 / end = 뷰포트 높이 × 1.6 (800px 뷰포트 기준 1280) |
| hero 인터랙션 구간별 값 | 진행 0 → 0.25 → 0.5 → 0.75 → 1 에서 hero scale 1 → 0.96 → 0.83 → 0.62 → 0.32, opacity 1 → 1 → 1 → 0.29 → 0, radius 0 → 4 → 15 → 34 → 60px |
| bell 등장 | 같은 구간에서 scale 0.35 → 0.35 → 0.61 → 1.05 → 1, opacity 0 → 0 → 0.39 → 1 → 1 |
| bell 위치 | 진행 중 뷰포트 정중앙 유지 확인 (오차 30px 이내) |
| pin 지오메트리 | pin 중 `hero_ani`가 `position: fixed`, top 0 / left 0 / 뷰포트 크기와 일치. `position: fixed`를 깨뜨리는 조상 요소 없음 |
| pin 이후 섹션 흐름 | pin-spacer 다음에 `hyojong`이 빈틈 없이 이어짐 |
| hero → hyojong 연결 | hero pin 종료(1280) = hyojong 트리거 시작(1280). 차이 0px |
| hyojong 확대 구간별 값 | 진행 0 → 0.25 → 0.5 → 0.75 → 1 에서 scale 0.50 → 0.72 → 0.88 → 0.97 → 1.00, opacity 0.15 → 0.52 → 0.79 → 0.95 → 1, radius 80 → 45 → 20 → 5 → 0px |
| 리사이즈 대응 | 뷰포트 변경 후 `refresh()` 시 end 값 재계산 확인 |

- 확인 화면: 360px, 834px, 1280px, 1440px
- 확인하지 못한 부분:
  - `prefers-reduced-motion` 실제 동작 (CSS·JS 구현 및 규칙 존재는 확인, OS 설정 전환 테스트 불가)
  - Edge / Safari (프리뷰가 Chromium 단일 엔진)
  - Lighthouse 성능·접근성 점수 (측정 도구 미실행)
  - GNB 드롭다운의 **실제 마우스 hover** — 프리뷰가 도구 호출 간 hover 상태를 유지하지 못해, 동일 CSS 규칙을 공유하는 `:focus-within`으로 검증했습니다. 시각적으로 패널이 열린 스크린샷은 확인했습니다.
  - **hero 인터랙션 진행 중의 시각 캡처** — 프리뷰 창이 pin으로 `position: fixed`가 된 요소를 렌더링하지 못해 중간 프레임 스크린샷이 비어 나옵니다. 스크롤 최상단(핀 시작 전) 화면은 정상 렌더링을 확인했고, 진행 중 상태는 요소의 위치·크기·투명도를 수치로 검증했습니다. 실제 브라우저에서 육안 확인이 필요합니다.
