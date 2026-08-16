// ---------- Product search filter ----------
(function () {
  var input = document.getElementById('productSearch');
  var clearBtn = document.getElementById('searchClear');
  var searchBar = input ? input.closest('.search-bar') : null;
  var emptyMsg = document.getElementById('searchEmpty');
  var categories = document.querySelectorAll('.product-category');

  if (!input) return;

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
        card.classList.toggle('is-hidden', !matches);
        if (matches) visibleInCategory++;
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
  var sections = document.querySelectorAll('.product-category');
  if (!links.length || !sections.length) return;

  var linkMap = {};
  links.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    linkMap[id] = link;
  });

  function setActive(id) {
    links.forEach(function (link) { link.classList.remove('active'); });
    if (linkMap[id]) linkMap[id].classList.add('active');
  }

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