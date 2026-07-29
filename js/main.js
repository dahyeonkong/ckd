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
      if (btnLabel) {
        btnLabel.textContent = isOpen ? "전체 메뉴 닫기" : "전체 메뉴 열기";
      }
      if (!isOpen) closeAllLnb();
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
        btnHammenu.focus();
      }
    }

    btnHammenu.addEventListener("click", function () {
      setMenuState(!mobileMenu.classList.contains("is_open"));
    });

    if (btnClose) {
      btnClose.addEventListener("click", function () {
        setMenuState(false);
        btnHammenu.focus();
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
  function initRevealAnimation() {
    document.querySelectorAll(".js_reveal").forEach(function (item) {
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

    if (isReducedMotion || !hasGsap || !hasScrollTrigger) return;

    window.gsap.registerPlugin(window.ScrollTrigger);
    initSmoothScroll();
    initHeroAnimation();
    initHyojongAnimation();
    initRevealAnimation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
