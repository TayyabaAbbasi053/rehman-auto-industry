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