# [ckd] 디자인 분석표

## 확인한 자료

- 디자인 원본: https://www.figma.com/design/qjEzl9rpEPOOrDusVulpoh/%EC%A0%95%EB%8B%A4%ED%98%84?node-id=2372-737&m=dev
- 확인한 화면:
  - ckd_home
  - ipad
  - iphone
- 실제 에셋 위치: asset

---

## 화면 목록

| 화면 | 목적 | 주요 행동 | 필요한 상태 |
|------|------|-----------|-------------|
| Home | 브랜드 철학과 주요 콘텐츠 소개 | 스크롤, Hover, 메뉴 이동 | 기본 |
| Hero | 브랜드 첫인상 전달 | 스크롤 | 기본, 영상 로딩 |
| Brand Symbol | 브랜드 심볼 강조 | 스크롤 | 기본 |
| Research Campus | 연구소 소개 | 스크롤 | 기본 |
| Platform Technologies | 핵심 플랫폼 기술 소개 | Hover, Click | 기본, Hover |
| Pioneering Firsts | 최초의 성과 소개 | 스크롤 | 기본 |
| Quick Navigation | R&D / IR 이동 | Hover, Click | 기본 |
| Innovation Beyond Borders | 글로벌 협력 소개 | Hover | 기본 |
| Advancing Medicine | 대표 제품 소개 | Hover | 기본 |
| Footer | 기업 정보 제공 | 링크 이동 | 기본 |

---

## 공통 영역

### 헤더

- 좌측 종근당 로고
- 우측 GNB 메뉴
- Hero 영역에서는 투명 배경 위에 노출
- 스크롤 시 고정(Fixed Header)
- 현재 페이지 Active 상태 제공
- 모바일에서는 Hamburger Menu 사용

---

### 푸터

- 회사 정보
- Sitemap
- Family Site 선택 영역
- Copyright 정보
- 고객센터 및 기업 정보 제공

---

### 공통 버튼

#### 상태

| 상태 | 동작 |
|--------|--------|
| Default | 기본 상태 |
| Hover | 1.2배 확대 |
| Focus | 접근성 Focus 표시 필요 |
| Disabled | 확인 필요 |

#### 구현 기준

```css
.button {
  transition: transform .4s ease;
}

.button:hover {
  transform: scale(1.2);
}
```

---

### 공통 카드

- 이미지 + 텍스트 구조
- Hover 상태 존재
- 동일한 Radius 규칙 사용
- 반복 가능한 카드 컴포넌트 구조
- Platform Technologies, Product, Quick Navigation 영역에서 재사용

---

## 디자인 토큰

### 색상

#### Blue Palette

| Token | Hex |
|---------|---------|
| color/blue00 | #071021 |
| color/blue01 | #071B36 |
| color/blue02 | #0F2147 |
| color/blue03 | #2C3A67 |
| color/blue05 | #1B263A |
| color/blue06 | #324154 |

#### Gray Palette

| Token | Hex |
|---------|---------|
| color/gray00 | #FFFFFF |
| color/gray01 | #F8F8F8 |
| color/gray02 | #F5F5F5 |
| color/gray03 | #F8F9FD |
| color/gray04 | #E2E8F0 |
| color/gray05 | #C0C7D1 |
| color/gray06 | #94A3B8 |
| color/gray07 | #9BA1AD |
| color/gray08 | #999999 |

#### Background Gradient

```css
--color-bg_grdiant:
radial-gradient(
  51.93% 51.93% at 50% 48.07%,
  #FFFFFF 0%,
  #FFFFFF 40.87%,
  #D3E5F1 100%
);
```

### 배경색

- color/bg_grdiant
- color/gray00
- color/blue01
- color/blue02

### 본문색

- color/gray00
- color/blue01
- color/blue02
- color/gray08

### 강조색

- color/blue02
- color/blue03

---

### Typography

#### Hero Title

| Token | 값 |
|---------|---------|
| 이름 | hero_title_80 |
| Font | Pretendard |
| Size | 80px |
| Weight | 700 |
| Line Height | 110% |
| Letter Spacing | 0px |

#### Content Title

| Token | 값 |
|---------|---------|
| 이름 | con_title_64 |
| Font | Poppins |
| Size | 64px |
| Weight | 700 |
| Line Height | 100% |
| Letter Spacing | 0px |

#### Sub Title

| Token | 값 |
|---------|---------|
| 이름 | sub_title_32 |
| Font | Pretendard |
| Size | 32px |
| Weight | 500 |
| Line Height | 100% |
| Letter Spacing | 0px |

#### Body Text

| Token | 값 |
|---------|---------|
| 이름 | pre_16 |
| Font | Pretendard |
| Size | 16px |
| Weight | 400 |
| Line Height | 100% |
| Letter Spacing | 0px |

---

### 레이아웃 규칙

확인된 Auto Layout 정보

```css
display: flex;
flex-direction: column;
align-items: center;
gap: 360px;
padding-bottom: 160px;
```

| 항목 | 값 |
|--------|--------|
| Desktop Width | 1920px |
| Layout | Auto Layout |
| Direction | Column |
| Alignment | Center |
| Section Gap | 360px |
| Bottom Padding | 160px |

---

### 기본 간격

- Section Gap: 360px
- Section Bottom Padding: 160px
- 기타 Spacing Token은 확인 필요

---

### 라운드

- 버튼 Radius: 확인 필요
- 카드 Radius: 확인 필요
- Pill Button 사용 확인

---

### 그림자

- 카드 Hover 시 사용
- 정확한 Shadow 값 확인 필요

---

## 반응형

### 402px

- Single Column Layout
- Mobile Navigation Drawer 사용
- 텍스트 크기 축소
- 일부 Grid → 1열 배치

### 834px

- Tablet 최적화 레이아웃
- 카드 영역 2열 배치
- 여백 축소

### 1280px 이상

- Desktop 레이아웃
- 1920px 디자인 기준
- 넓은 White Space 유지
- 다중 컬럼 구성

---

## 인터랙션

### 메뉴

- Active 상태 제공
- Mobile Drawer Open / Close
- 현재 위치 표시

---

### 버튼

| 상태 | 동작 |
|--------|--------|
| Hover | 1.2배 확대 |
| Focus | 접근성 표시 |
| Disabled | 확인 필요 |

---

### 스크롤

- Hero 영상 기반 진입
- Section Reveal
- Fade In
- Timeline 등장
- 콘텐츠 순차 노출

---

### 애니메이션

#### Hero

목적
- 브랜드 철학을 시각적으로 전달
- 다음 섹션으로 자연스럽게 연결

Trigger
- Scroll

초기 상태
- Hero Video 전체 화면 노출
- 헤더와 브랜드 카피 노출

진행 상태
1. 사용자가 스크롤한다.
2. Hero 영역이 점진적으로 축소된다.
3. Bell 오브젝트가 등장한다.
4. Bell 오브젝트에 모션이 적용된다.
5. 다음 섹션이 확대되며 화면을 채운다.

종료 상태
- Hero 영역이 화면 밖으로 이동
- Brand Symbol 섹션이 활성화

구현 방식
- GSAP ScrollTrigger 사용 예정

#### Brand Symbol

- 심볼 등장 애니메이션

#### Platform Technologies

- Hover 시 Variant 변경

##### platform1

- Mouse Leave
- Change To

##### platform2

- Mouse Enter
- Change To

#### Pioneering Firsts

- Timeline Reveal

#### Innovation Beyond Borders

- Globe 기반 모션 사용 예정

#### Product

- Hover Interaction

---

## 에셋

### 로고

- asset/logo (파일명 확인 필요)

### 이미지

- asset/images (세부 경로 확인 필요)

### 영상

- Hero Video
  - mp4
  - 1920 × 1080

### 아이콘

- 프로젝트 전용 SVG 사용 추정
- 실제 경로 확인 필요

### 폰트

- Pretendard
- Poppins

---

## 확인된 사실

- Desktop 기준 1920px로 설계되었다.
- Auto Layout 기반으로 제작되었다.
- Flex Column 구조를 사용한다.
- Section 간격은 360px이다.
- Section 하단 여백은 160px이다.
- Hero 영역에 mp4 영상(1920×1080)을 사용한다.
- Hero는 스크롤 기반 인터랙션의 시작 지점이다.
- 스크롤 진행에 따라 Hero가 축소되고 Bell 오브젝트가 등장한다.
- Bell 모션 이후 다음 섹션이 확대되며 진입한다.
- Hero는 Scroll Storytelling 구조로 설계되었다.
- 종(Bell)을 브랜드 상징으로 활용한다.
- Platform Technologies 영역은 Hover Variant 기반 인터랙션을 사용한다.
- 버튼 Hover 시 1.2배 확대된다.
- Poppins와 Pretendard를 함께 사용한다.
- Dark Navy 기반 Color System을 구축하였다.
- Gray Palette가 별도 정의되어 있다.
- Radial Gradient 배경 토큰(color/bg_grdiant)을 사용한다.
- Desktop / Tablet / Mobile 시안이 모두 존재한다.

---

## 아직 확인하지 못한 내용

- Grid System (12 Column 여부)
- Gutter 값
- Container Width
- 버튼 Radius
- 카드 Radius
- Shadow 값
- Focus Style
- Disabled Style
- Header Scroll 상태 디자인
- Mobile Menu 상세 동작
- Typography 전체 토큰(H1~Caption)
- Spacing Token 체계
- 실제 SVG 파일명
- 실제 이미지 파일명
- Assets 폴더 구조
- 모든 Variant 상태
- Prototype Transition Duration
- Prototype Easing 값