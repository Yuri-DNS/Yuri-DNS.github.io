/**
 * Template Name: SnapFolio
 * Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
 * Updated: Jul 21 2025 with Bootstrap v5.3.7
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  // Seleciona todos os elementos .bg-circle
  const circles = document.querySelectorAll(
    ".hero .background-elements .bg-circle"
  );

  // Função auxiliar para gerar valores aleatórios
  const rand = (min, max) => Math.random() * (max - min) + min;

  // Armazena estado de cada círculo (posição, velocidade, etc.)
  const circleStates = Array.from(circles).map(() => ({
    x: 0,
    y: 0,
    rot: 0,
    scl: 1,
    skx: 0,
    sky: 0,
    vx: rand(-1, 1),
    vy: rand(-1, 1),
    vrot: rand(-0.5, 0.5),
    vscl: rand(-0.0025, 0.0025),
    vskx: rand(-0.05, 0.05),
    vsky: rand(-0.05, 0.05),
  }));

  function update() {
    circles.forEach((circle, index) => {
      const state = circleStates[index];

      // Atualiza posições e transformações com velocidades
      state.x += state.vx;
      state.y += state.vy;
      state.rot += state.vrot;
      state.skx += state.vskx;
      state.sky += state.vsky;

      // Limita bounds (rebate se atingir bordas do container)
      const maxX = 600;
      const maxY = 600;
      if (Math.abs(state.x) > maxX) state.vx = -state.vx * 0.8;
      if (Math.abs(state.y) > maxY) state.vy = -state.vy * 0.8;
      state.scl = Math.max(0.7, Math.min(1.3, state.scl));
      state.skx = Math.max(-15, Math.min(15, state.skx));
      state.sky = Math.max(-15, Math.min(15, state.sky));

      // Muda velocidades aleatoriamente (mantido 1% de chance por frame)
      if (Math.random() < 0.01) {
        state.vx = rand(-1, 1);
        state.vy = rand(-1, 1);
        state.vrot = rand(-0.5, 0.5);
        state.vscl = rand(-0.0025, 0.0025);
        state.vskx = rand(-0.05, 0.05);
        state.vsky = rand(-0.05, 0.05);
      }

      // Aplica transformação
      circle.style.transform = `translate(${state.x}px, ${state.y}px) rotate(${state.rot}deg) scale(${state.scl}) skew(${state.skx}deg, ${state.sky}deg)`;
    });

    requestAnimationFrame(update); // Continua a animação
  }

  // Inicia a animação
  update();
})();
