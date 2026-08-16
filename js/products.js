// ---------- Product search filter ----------
(function () {
  var input = document.getElementById('productSearch');
  var clearBtn = document.getElementById('searchClear');
  var searchBar = input ? input.closest('.search-bar') : null;
  var emptyMsg = document.getElementById('searchEmpty');
  var categories = document.querySelectorAll('.product-category');

  if (!input) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hideCard(card) {
    if (card.classList.contains('is-hidden')) return;

    if (reduceMotion) {
      card.classList.add('is-hidden');
      return;
    }

    card.classList.add('is-fading');

    var handled = false;
    function onEnd(e) {
      if (e.propertyName !== 'opacity' || handled) return;
      handled = true;
      card.classList.add('is-hidden');
      card.removeEventListener('transitionend', onEnd);
    }
    card.addEventListener('transitionend', onEnd);
  }

  function showCard(card) {
    var wasHidden = card.classList.contains('is-hidden') || card.classList.contains('is-fading');
    if (!wasHidden) return;

    card.classList.remove('is-hidden');

    if (reduceMotion) {
      card.classList.remove('is-fading');
      return;
    }

    card.classList.add('is-fading');
    void card.offsetWidth; // force reflow so the fade-in actually transitions
    requestAnimationFrame(function () {
      card.classList.remove('is-fading');
    });
  }

  function runFilter() {
    var query = input.value.trim().toLowerCase();
    var anyVisible = false;

    if (searchBar) {
      searchBar.classList.toggle('has-value', query.length > 0);
    }

    categories.forEach(function (category) {
      var cards = category.querySelectorAll('.product-card');
      var visibleInCategory = 0;

      cards.forEach(function (card) {
        var name = card.querySelector('h4');
        var text = name ? name.textContent.toLowerCase() : '';
        var matches = query === '' || text.indexOf(query) !== -1;

        if (matches) {
          showCard(card);
          visibleInCategory++;
        } else {
          hideCard(card);
        }
      });

      var categoryHidden = query !== '' && visibleInCategory === 0;
      category.classList.toggle('is-hidden', categoryHidden);
      if (!categoryHidden) anyVisible = true;
    });

    if (emptyMsg) emptyMsg.hidden = anyVisible;
  }

  input.addEventListener('input', runFilter);

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      input.value = '';
      input.focus();
      runFilter();
    });
  }
})();

// ---------- Category quick-nav: active link on scroll ----------
(function () {
  var links = document.querySelectorAll('.qn-link');
  var toolbar = document.querySelector('.product-toolbar');
  var quicknav = document.querySelector('.category-quicknav');
  var pill = quicknav ? quicknav.querySelector('.qn-pill') : null;
  var sections = document.querySelectorAll('.product-category');
  if (!links.length || !sections.length) return;

  var linkMap = {};
  links.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    linkMap[id] = link;
  });

  function movePill(link) {
    if (!pill || !link) return;
    pill.style.left = link.offsetLeft + 'px';
    pill.style.width = link.offsetWidth + 'px';
    pill.classList.add('is-ready');
  }

  function setActive(id) {
    links.forEach(function (link) { link.classList.remove('active'); });
    if (linkMap[id]) {
      linkMap[id].classList.add('active');
      movePill(linkMap[id]);
    }
  }

  // Highlight the first category by default so the pill has a home
  // before the user has scrolled or clicked anything.
  setActive(links[0].getAttribute('href').replace('#', ''));

  if ('IntersectionObserver' in window) {
    var toolbarHeight = toolbar ? toolbar.offsetHeight : 0;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-' + (toolbarHeight + 20) + 'px 0px -70% 0px', threshold: 0 }
    );
    sections.forEach(function (section) { observer.observe(section); });
  }

  links.forEach(function (link) {
    link.addEventListener('click', function () {
      setActive(link.getAttribute('href').replace('#', ''));
    });
  });

  window.addEventListener('resize', function () {
    var current = quicknav ? quicknav.querySelector('.qn-link.active') : null;
    if (current) movePill(current);
  }, { passive: true });
})();

// ---------- Sticky toolbar shadow ----------
(function () {
  var toolbar = document.querySelector('.product-toolbar');
  if (!toolbar) return;

  function updateStuck() {
    if (window.scrollY > 4) {
      toolbar.classList.add('is-stuck');
    } else {
      toolbar.classList.remove('is-stuck');
    }
  }

  updateStuck();
  window.addEventListener('scroll', updateStuck, { passive: true });
})();