(function () {
  "use strict";

  var isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  var hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
  var hasLenis = typeof window.Lenis !== "undefined";

  /* ---------------------------------------------------------
     부드러운 스크롤 (Lenis)
     --------------------------------------------------------- */
  function initSmoothScroll() {
    if (!hasLenis || isReducedMotion) return null;

    var lenis = new window.Lenis({
      duration: 1.1,
      smoothWheel: true
    });

    /* GSAP ticker에 Lenis를 물려 스크롤과 ScrollTrigger가 같은 프레임에서 갱신되게 한다 */
    if (hasGsap && hasScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      })();
    }

    return lenis;
  }

  /* ---------------------------------------------------------
     모바일 / 태블릿 전체 메뉴 (드로어 + 아코디언)
     --------------------------------------------------------- */
  function initMobileMenu() {
    var btnHammenu = document.getElementById("btn_hammenu");
    var mobileMenu = document.getElementById("mobile_menu");
    var menuDim = document.getElementById("menu_dim");
    var btnClose = document.getElementById("btn_menu_close");
    if (!btnHammenu || !mobileMenu) return;

    var header = document.getElementById("header");
    var btnLabel = btnHammenu.querySelector(".blind");
    var accordionBtns = mobileMenu.querySelectorAll(".mobile_menu_btn");

    function closeAllLnb() {
      accordionBtns.forEach(function (btn) {
        btn.setAttribute("aria-expanded", "false");
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        if (panel) panel.hidden = true;
      });
    }

    function setMenuState(isOpen) {
      mobileMenu.classList.toggle("is_open", isOpen);
      btnHammenu.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
      if (menuDim) menuDim.hidden = !isOpen;
      if (header) header.classList.toggle("is_hidden", isOpen);
      if (btnLabel) {
        btnLabel.textContent = isOpen ? "전체 메뉴 닫기" : "전체 메뉴 열기";
      }
      if (!isOpen) closeAllLnb();

      /* header가 숨으므로 포커스가 보이지 않는 곳에 남지 않도록 옮긴다.
         드로어는 transition 이 끝나야 visibility 가 visible 이 되므로 그때 포커스한다. */
      if (isOpen && btnClose) {
        mobileMenu.addEventListener("transitionend", function handleOpenEnd() {
          mobileMenu.removeEventListener("transitionend", handleOpenEnd);
          if (mobileMenu.classList.contains("is_open")) btnClose.focus();
        });
      }
    }

    /* 한 번에 하나의 하위 메뉴만 펼친다 */
    function handleAccordionClick(event) {
      var btn = event.currentTarget;
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;

      var willOpen = panel.hidden;
      closeAllLnb();

      if (willOpen) {
        btn.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    }

    function handleMenuClick(event) {
      if (event.target.closest("a")) setMenuState(false);
    }

    function handleKeydown(event) {
      if (event.key === "Escape" && mobileMenu.classList.contains("is_open")) {
        setMenuState(false);
        focusHammenu();
      }
    }

    /* header도 transition 이 끝나야 다시 focus 가능하다 */
    function focusHammenu() {
      if (!header) {
        btnHammenu.focus();
        return;
      }
      header.addEventListener("transitionend", function handleShowEnd() {
        header.removeEventListener("transitionend", handleShowEnd);
        btnHammenu.focus();
      });
    }

    btnHammenu.addEventListener("click", function () {
      setMenuState(!mobileMenu.classList.contains("is_open"));
    });

    if (btnClose) {
      btnClose.addEventListener("click", function () {
        setMenuState(false);
        focusHammenu();
      });
    }

    if (menuDim) {
      menuDim.addEventListener("click", function () {
        setMenuState(false);
      });
    }

    accordionBtns.forEach(function (btn) {
      btn.addEventListener("click", handleAccordionClick);
    });

    mobileMenu.addEventListener("click", handleMenuClick);
    document.addEventListener("keydown", handleKeydown);
  }

  /* ---------------------------------------------------------
     모바일 global 카드 순환.
     트랙을 한 벌 복제해 두면 -50% 지점이 시작점과 같아져 끊김 없이 반복된다.
     태블릿 이상은 절대배치로 바뀌므로 복제본을 걷어낸다.
     --------------------------------------------------------- */
  function initGlobalMarquee() {
    var track = document.getElementById("global_cards_track");
    if (!track) return;

    var mobileQuery = window.matchMedia("(max-width: 833px)");
    var originals = Array.prototype.slice.call(track.children);

    /* 카드 한 세트 폭(카드 + 뒤따르는 gap)을 재서 이동 거리로 넘긴다 */
    function setShiftDistance() {
      var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      var shift = originals.reduce(function (total, card) {
        return total + card.getBoundingClientRect().width + gap;
      }, 0);
      track.style.setProperty("--marquee_shift", shift + "px");
    }

    function syncClones() {
      var clones = track.querySelectorAll(".is_clone");

      if (!mobileQuery.matches) {
        clones.forEach(function (clone) {
          clone.remove();
        });
        return;
      }

      if (clones.length) {
        setShiftDistance();
        return;
      }

      originals.forEach(function (card) {
        /* 순환 중에는 원본과 복제본이 같아 보여야 하므로 등장 애니메이션은 뺀다 */
        card.classList.remove("js_reveal");

        var clone = card.cloneNode(true);
        clone.classList.add("is_clone");
        clone.classList.remove("js_reveal");
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });

      setShiftDistance();
    }

    syncClones();
    mobileQuery.addEventListener("change", syncClones);
    window.addEventListener("resize", syncClones);
  }

  /* ---------------------------------------------------------
     platform_item 을 화면에 들어오면 on, 지나가면 다시 off 로 되돌린다.
     --------------------------------------------------------- */
  function initPlatformItems() {
    var items = Array.prototype.slice.call(
      document.querySelectorAll(".platform_item")
    );
    if (!items.length) return;

    /* 데스크톱은 항목을 절대배치하므로 두 개가 동시에 on 이면 겹친다.
       그래서 데스크톱에서만 한 번에 하나만 켠다. */
    var desktopQuery = window.matchMedia("(min-width: 1280px)");

    items.forEach(function (item) {
      window.ScrollTrigger.create({
        trigger: item,
        start: "top 40%",
        end: "bottom 20%",
        invalidateOnRefresh: true,
        onToggle: function (self) {
          if (self.isActive && desktopQuery.matches) {
            items.forEach(function (other) {
              other.classList.toggle("is_active", other === item);
            });
            return;
          }
          item.classList.toggle("is_active", self.isActive);
        }
      });
    });
  }

  /* ---------------------------------------------------------
     global 이 sticky 로 고정돼 있는 동안, 페이지 스크롤을 그대로
     카드 목록의 이동량으로 옮긴다. 별도 스크롤 영역을 만들지 않는다.
     --------------------------------------------------------- */
  function initGlobalScroll() {
    var section = document.getElementById("global");
    var cards = document.getElementById("global_cards");
    if (!section || !cards) return;

    window.ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: function (self) {
        var maxScroll = cards.scrollHeight - cards.clientHeight;
        /* 모바일은 가로 마퀴라 넘치는 세로 영역이 없다 */
        if (maxScroll <= 0) return;
        cards.scrollTop = maxScroll * self.progress;
      }
    });
  }

  /* ---------------------------------------------------------
     밝은 섹션 위를 지날 때 header 글자색을 어둡게 전환한다.
     history는 배경이 짙은 남색이라 대상에서 제외한다.
     --------------------------------------------------------- */
  function initHeaderTheme() {
    var header = document.getElementById("header");
    if (!header) return;

    var lightSectionIds = ["platform", "quick_menu", "global", "new_area"];
    var triggers = [];

    function syncHeaderTheme() {
      var isOverLight = triggers.some(function (trigger) {
        return trigger.isActive;
      });
      header.classList.toggle("is_dark_text", isOverLight);
    }

    lightSectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (!section) return;

      triggers.push(
        window.ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          onToggle: syncHeaderTheme,
          onRefresh: syncHeaderTheme
        })
      );
    });
  }

  /* ---------------------------------------------------------
     데스크톱 GNB 드롭다운
     hover는 CSS가 담당하고, 여기서는 키보드 접근과 aria 상태만 처리한다.
     --------------------------------------------------------- */
  function initGnb() {
    var gnb = document.getElementById("gnb");
    if (!gnb) return;

    gnb.querySelectorAll(".gnb_item").forEach(function (item) {
      var link = item.querySelector(".gnb_link");
      var lnb = item.querySelector(".lnb");
      if (!link || !lnb) return;

      function setExpanded(isExpanded) {
        link.setAttribute("aria-expanded", String(isExpanded));
      }

      item.addEventListener("mouseenter", function () {
        setExpanded(true);
      });
      item.addEventListener("mouseleave", function () {
        setExpanded(false);
      });
      item.addEventListener("focusin", function () {
        setExpanded(true);
      });
      item.addEventListener("focusout", function (event) {
        if (!item.contains(event.relatedTarget)) setExpanded(false);
      });
      item.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          setExpanded(false);
          link.focus();
        }
      });
    });
  }

  /* ---------------------------------------------------------
     footer family site 선택 박스
     --------------------------------------------------------- */
  function initSelectBox() {
    var selectBtn = document.getElementById("select_btn");
    var selectList = document.getElementById("select_list");
    if (!selectBtn || !selectList) return;

    function setSelectState(isOpen) {
      selectList.hidden = !isOpen;
      selectBtn.setAttribute("aria-expanded", String(isOpen));
    }

    function handleSelectClick(event) {
      event.stopPropagation();
      setSelectState(selectList.hidden);
    }

    function handleOutsideClick(event) {
      if (!selectList.hidden && !event.target.closest(".select_box")) {
        setSelectState(false);
      }
    }

    function handleKeydown(event) {
      if (event.key === "Escape" && !selectList.hidden) {
        setSelectState(false);
        selectBtn.focus();
      }
    }

    selectBtn.addEventListener("click", handleSelectClick);
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleKeydown);
  }

  /* ---------------------------------------------------------
     Hero 축소 + Bell 등장 (ScrollTrigger)
     --------------------------------------------------------- */
  /* 스크롤에 따라 hero가 축소되며 사라지고, 그 자리에 bell이 등장한다. */
  function initHeroAnimation() {
    var heroAni = document.getElementById("hero_ani");
    var hero = document.getElementById("hero");
    var bell = document.getElementById("bell");
    if (!heroAni || !hero || !bell) return;

    var heroTxt = hero.querySelector(".hero_txt");

    if (heroTxt) {
      window.gsap.from(heroTxt.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
      });
    }

    window.gsap.set(bell, { scale: 0.35, opacity: 0 });

    var heroTl = window.gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: heroAni,
        start: "top top",
        end: function () {
          return "+=" + window.innerHeight * 1.6;
        },
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    heroTl
      /* hero 축소 후 소멸 */
      .to(hero, { scale: 0.32, borderRadius: 60, duration: 1, ease: "power1.in" }, 0)
      .to(hero, { opacity: 0, duration: 0.35 }, 0.5)
      /* bell 등장 */
      .to(bell, { scale: 1, opacity: 1, ease: "back.out(1.5)", duration: 0.5 }, 0.45);
  }

  /* bell 모션이 끝난 직후, 다음 섹션이 확대되며 화면을 채운다.
     hero pin이 풀리는 지점과 hyojong 진입 지점이 맞물리도록 트리거를 잡는다. */
  function initHyojongAnimation() {
    var hyojong = document.getElementById("hyojong");
    if (!hyojong) return;

    window.gsap.fromTo(
      hyojong,
      { scale: 0.2, opacity: 0.15, borderRadius: 80 },
      {
        scale: 1,
        opacity: 1,
        borderRadius: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: hyojong,
          start: "top bottom",
          end: "top top",
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      }
    );
  }

  /* ---------------------------------------------------------
     섹션 콘텐츠 순차 등장
     --------------------------------------------------------- */
  /* 초기 상태는 GSAP이 직접 관리한다.
     CSS로 숨기지 않으므로 스크립트가 없거나 실패해도 콘텐츠는 항상 노출된다. */
  /* ---------------------------------------------------------
     Advancing Medicine 카드 스택
     834px 이상에서만 목록을 고정하고, 마지막에는 두 장만 겹쳐 보인다.
     --------------------------------------------------------- */
  function initProductStack() {
    var section = document.getElementById("new_area");
    var productList = section && section.querySelector(".product_list");
    if (!section || !productList) return;

    var cards = Array.prototype.slice.call(
      productList.querySelectorAll(".product_card")
    );
    if (cards.length < 3) return;

    var media = window.gsap.matchMedia();
    var stackHold = { progress: 0 };

    media.add("(min-width: 834px)", function () {
      productList.classList.add("is_product_stack");

      var cardHeight = cards[0].getBoundingClientRect().height;
      var cardGap = parseFloat(window.getComputedStyle(productList).rowGap) || 0;
      var cardStep = cardHeight + cardGap;

      cards.forEach(function (card, index) {
        window.gsap.set(card, {
          xPercent: -50,
          y: index * cardStep,
          zIndex: index + 1
        });
      });

      var stackTimeline = window.gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: productList,
          start: "top 15%",
          end: function () {
            return "+=" + window.innerHeight * 2;
          },
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      stackTimeline
        .to(cards[0], { y: 0, duration: 0.55 }, 0)
        .to(cards[1], { y: 40, duration: 0.55 }, 0.2)
        .to(cards[2], { y: 80, duration: 0.55 }, 0.45)
        .to(stackHold, { progress: 1, duration: 0.6 });

      return function () {
        productList.classList.remove("is_product_stack");
        window.gsap.set(cards, { clearProps: "transform,opacity,zIndex" });
      };
    });
  }

  function initRevealAnimation() {
    document.querySelectorAll(".js_reveal").forEach(function (item) {
      if (item.classList.contains("product_card") &&
        item.closest(".product_list").classList.contains("is_product_stack")) {
        return;
      }

      window.gsap.from(item, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
          once: true
        }
      });
    });

    document.querySelectorAll(".con_title").forEach(function (title) {
      window.gsap.from(title, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          once: true
        }
      });
    });
  }

  /* ---------------------------------------------------------
     init
     --------------------------------------------------------- */
  function init() {
    initMobileMenu();
    initGnb();
    initSelectBox();
    initGlobalMarquee();

    if (!hasGsap || !hasScrollTrigger) return;

    window.gsap.registerPlugin(window.ScrollTrigger);

    if (!isReducedMotion) {
      initSmoothScroll();
      initHeroAnimation();
      initHyojongAnimation();
      initProductStack();
      initRevealAnimation();
    }

    /* hero pin이 만든 여백까지 반영되도록 pin 트리거보다 뒤에 만든다.
       상태 전환은 모션이 아니므로 prefers-reduced-motion 에서도 적용한다. */
    initPlatformItems();
    initGlobalScroll();
    initHeaderTheme();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
