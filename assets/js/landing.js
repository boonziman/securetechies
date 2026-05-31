/* ============================================================
   Secure Techies — Landing Page JS
   Self-contained module for conversion landing pages.
   Includes: hero particle field, scroll reveals, animated
   stat counters, FAQ accordion, and the mobile sticky CTA.
   Mirrors the homepage animation system but scoped to landing
   pages so the homepage is never touched.
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. HERO PARTICLE FIELD (canvas) ---------- */
  /* Initializes every particle canvas on the page (hero + final CTA),
     so multiple animated backgrounds work, not just one. */
  function initParticlesAll() {
    var canvases = document.querySelectorAll(".st-particles-canvas, #st-particles");
    Array.prototype.forEach.call(canvases, function (c) {
      initParticles(c);
    });
  }
  function initParticles(c) {
    if (!c || prefersReduced) return;
    var ctx = c.getContext("2d");
    var isMobile = window.innerWidth < 768;
    var pts = [],
      N = isMobile ? 22 : 60;
    var hero = c.closest("section") || c.parentElement;
    var raf = null;

    function spawn() {
      pts = [];
      for (var i = 0; i < N; i++) {
        pts.push({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          r: Math.random() * 1.8 + 0.7,
          o: Math.random() * 0.7 + 0.25,
        });
      }
    }

    function resize() {
      var r = hero.getBoundingClientRect();
      var w = Math.round(r.width) || window.innerWidth;
      var h = Math.round(r.height) || window.innerHeight;
      var changed = Math.abs(w - c.width) > 2;
      c.width = w;
      c.height = h;
      if (changed || pts.length === 0) spawn();
    }

    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);
      for (var i = 0; i < N; i++) {
        var p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = c.width;
        if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height;
        if (p.y > c.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96,165,250," + p.o + ")";
        ctx.fill();
        for (var j = i + 1; j < N; j++) {
          var q = pts[j],
            dx = p.x - q.x,
            dy = p.y - q.y,
            d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(96,165,250," + 0.25 * (1 - d / 140) + ")";
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              if (!raf) draw();
            } else if (raf) {
              cancelAnimationFrame(raf);
              raf = null;
            }
          });
        },
        { threshold: 0 }
      );
      obs.observe(hero);
    } else {
      draw();
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      } else if (!raf) {
        draw();
      }
    });
  }

  /* ---------- 2. SCROLL REVEALS ---------- */
  function initReveals() {
    var els = document.querySelectorAll(".st-reveal, .st-reveal-right");
    if (!els.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("st-visible");
      });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("st-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) {
      obs.observe(el);
    });
    // Fail-safe: if anything is still hidden after 4s (observer edge cases,
    // print, etc.), reveal it so content is never stuck invisible.
    setTimeout(function () {
      document
        .querySelectorAll(".st-reveal:not(.st-visible), .st-reveal-right:not(.st-visible)")
        .forEach(function (el) {
          el.classList.add("st-visible");
        });
    }, 4000);
  }

  /* ---------- 3. ANIMATED STAT COUNTERS ---------- */
  function initCounters() {
    var nums = document.querySelectorAll(".st-stat-num[data-target]");
    if (!nums.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      nums.forEach(function (el) {
        finalize(el);
      });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate(e.target);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    nums.forEach(function (el) {
      obs.observe(el);
    });

    function finalize(el) {
      var t = parseFloat(el.getAttribute("data-target")) || 0;
      el.textContent =
        (el.getAttribute("data-prefix") || "") +
        formatNum(t) +
        (el.getAttribute("data-suffix") || "");
    }
    function formatNum(v) {
      return Number.isInteger(v) ? v.toString() : v.toFixed(1);
    }
    function animate(el) {
      var target = parseFloat(el.getAttribute("data-target")) || 0;
      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = Math.min(2200, Math.max(600, target * 12));
      var start = performance.now();
      function tick(now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        el.textContent = prefix + formatNum(val) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + formatNum(target) + suffix;
      }
      requestAnimationFrame(tick);
    }
  }

  /* ---------- 4. FAQ ACCORDION ---------- */
  function initFaq() {
    var items = document.querySelectorAll(".st-faq-item");
    if (!items.length) return;
    items.forEach(function (item) {
      var btn = item.querySelector(".st-faq-q");
      var ans = item.querySelector(".st-faq-a");
      if (!btn || !ans) return;
      btn.addEventListener("click", function () {
        var open = item.classList.contains("is-open");
        // close siblings for a clean single-open accordion
        items.forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            var ob = other.querySelector(".st-faq-q");
            var oa = other.querySelector(".st-faq-a");
            if (ob) ob.setAttribute("aria-expanded", "false");
            if (oa) oa.style.maxHeight = null;
          }
        });
        if (open) {
          item.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
          ans.style.maxHeight = null;
        } else {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          ans.style.maxHeight = ans.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- 5. SCROLL-TRIGGERED ACCENT LINES ---------- */
  /* The hero accent line animates on load; lines deeper in the page (e.g. the
     final CTA) should grow only when scrolled into view, mirroring the hero. */
  function initScrollLines() {
    var lines = document.querySelectorAll(".st-l-line-scroll");
    if (!lines.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      lines.forEach(function (el) {
        el.classList.add("is-grown");
      });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-grown");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    lines.forEach(function (el) {
      obs.observe(el);
    });
  }

  /* ---------- 6. MOBILE STICKY CTA ---------- */
  function initStickyCta() {
    var bar = document.getElementById("st-sticky-cta");
    if (!bar) return;
    var hero = document.querySelector(".st-hero");
    var footer = document.getElementById("st-landing-final");
    function toggle() {
      var pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.pageYOffset > 500;
      // hide once the final CTA/form section is in view (avoid covering it)
      var atForm = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      bar.classList.toggle("show", pastHero && !atForm);
    }
    window.addEventListener("scroll", toggle, { passive: true });
    window.addEventListener("resize", toggle, { passive: true });
    toggle();
  }

  /* ---------- INIT ---------- */
  function start() {
    initReveals();
    initCounters();
    initFaq();
    initScrollLines();
    initStickyCta();
    if (document.readyState === "complete") {
      requestAnimationFrame(initParticlesAll);
    } else {
      window.addEventListener("load", function () {
        requestAnimationFrame(initParticlesAll);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
