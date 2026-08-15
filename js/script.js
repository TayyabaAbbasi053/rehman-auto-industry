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