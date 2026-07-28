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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (hasScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
    }

    return lenis;
  }

  /* ---------------------------------------------------------
     모바일 전체 메뉴
     --------------------------------------------------------- */
  function initMobileMenu() {
    var btnHammenu = document.getElementById("btn_hammenu");
    var mobileMenu = document.getElementById("mobile_menu");
    if (!btnHammenu || !mobileMenu) return;

    var btnLabel = btnHammenu.querySelector(".blind");

    function setMenuState(isOpen) {
      mobileMenu.classList.toggle("is_open", isOpen);
      btnHammenu.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
      if (btnLabel) {
        btnLabel.textContent = isOpen ? "전체 메뉴 닫기" : "전체 메뉴 열기";
      }
    }

    function handleHammenuClick() {
      setMenuState(!mobileMenu.classList.contains("is_open"));
    }

    function handleMenuLinkClick(event) {
      if (event.target.closest("a")) setMenuState(false);
    }

    function handleKeydown(event) {
      if (event.key === "Escape" && mobileMenu.classList.contains("is_open")) {
        setMenuState(false);
        btnHammenu.focus();
      }
    }

    btnHammenu.addEventListener("click", handleHammenuClick);
    mobileMenu.addEventListener("click", handleMenuLinkClick);
    document.addEventListener("keydown", handleKeydown);
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
  function initHeroAnimation() {
    var hero = document.getElementById("hero");
    var bell = document.getElementById("bell");
    if (!hero || !bell) return;

    var videoBox = hero.querySelector(".hero_video_box");
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

    if (videoBox && window.matchMedia("(min-width: 1280px)").matches) {
      window.gsap.to(videoBox, {
        scale: 0.86,
        borderRadius: "40px",
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    window.gsap.from(bell, {
      scale: 0.6,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.6)",
      scrollTrigger: {
        trigger: bell,
        start: "top 85%"
      }
    });
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
    initSelectBox();

    if (isReducedMotion || !hasGsap || !hasScrollTrigger) return;

    window.gsap.registerPlugin(window.ScrollTrigger);
    initSmoothScroll();
    initHeroAnimation();
    initRevealAnimation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
