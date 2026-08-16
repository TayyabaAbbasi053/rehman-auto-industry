const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  mobileSidebar.classList.add('active');
  sidebarOverlay.classList.add('active');
}

function closeSidebar() {
  mobileSidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidebar);
if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

// close the sidebar automatically once a nav link is tapped
if (mobileSidebar) {
  const sidebarLinks = mobileSidebar.querySelectorAll('a');
  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', closeSidebar);
  });
}

// close the sidebar on Escape for keyboard users
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeSidebar();
});

// ---------- Sticky header shadow on scroll ----------
const siteHeader = document.querySelector('.site-header');

function updateHeaderOnScroll() {
  if (!siteHeader) return;
  if (window.scrollY > 40) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}

if (siteHeader) {
  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
}

// ---------- Back-to-top button ----------
const backToTopBtn = document.getElementById('backToTop');

function updateBackToTop() {
  if (!backToTopBtn) return;
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

if (backToTopBtn) {
  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}