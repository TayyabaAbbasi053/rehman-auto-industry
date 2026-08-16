// Scroll-triggered reveal animations.
// Works with elements marked data-reveal="up|down|left|right|fade|zoom"
// and an optional inline style="--reveal-delay:120ms" for stagger timing.
(function () {
  var items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // Skip animation, just show everything immediately.
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    }
  );

  items.forEach(function (el) { observer.observe(el); });
})();

// ---------- Animated stat counters ----------
// Works with elements marked data-counter="500" and optional data-suffix="+"
(function () {
  var counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-counter'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';

    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(runCounter);
    return;
  }

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach(function (el) { counterObserver.observe(el); });
})();

// ---------- Parallax hero image ----------
(function () {
  var heroImg = document.querySelector('.hero-bg-img');
  if (!heroImg) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var hero = document.querySelector('.hero');

  function updateParallax() {
    if (!hero) return;
    var rect = hero.getBoundingClientRect();
    // Only animate while hero is in/near the viewport
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    var offset = rect.top * -0.12;
    heroImg.style.transform = 'translateY(' + offset + 'px) scale(1.08)';
  }

  updateParallax();
  window.addEventListener('scroll', updateParallax, { passive: true });
})();