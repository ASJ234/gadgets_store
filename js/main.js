document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  setActiveNavLink();
});

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  });
}

function setActiveNavLink() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll('.main-nav a[data-nav]').forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add('active');
    }
  });
}

async function loadStoreInfo() {
  const response = await fetch('data/store.json');
  if (!response.ok) throw new Error('Failed to load store info');
  return response.json();
}

function renderStoreInfo(store, container) {
  const hoursHtml = Object.entries(store.hours)
    .map(([day, time]) => '<li><span>' + day + '</span><span>' + time + '</span></li>')
    .join('');

  container.innerHTML =
    '<div class="store-info-card">' +
    '<h2>' + escapeHtml(store.name) + '</h2>' +
    '<div class="store-info-item">' +
    '<p class="store-info-label">Address</p>' +
    '<p class="store-info-value">' + escapeHtml(store.address) + '</p>' +
    '</div>' +
    '<div class="store-info-item">' +
    '<p class="store-info-label">Phone</p>' +
    '<p class="store-info-value"><a href="tel:' + store.phone.replace(/\D/g, '') + '">' + escapeHtml(store.phone) + '</a>' +
    (store.phoneAlt ? '<br><a href="tel:' + store.phoneAlt.replace(/\D/g, '') + '">' + escapeHtml(store.phoneAlt) + '</a>' : '') +
    '</p>' +
    '</div>' +
    '<div class="store-info-item">' +
    '<p class="store-info-label">Email</p>' +
    '<p class="store-info-value"><a href="mailto:' + store.email + '">' + escapeHtml(store.email) + '</a></p>' +
    '</div>' +
    '<div class="store-info-item">' +
    '<p class="store-info-label">Hours</p>' +
    '<ul class="hours-list">' + hoursHtml + '</ul>' +
    '</div>' +
    '<a href="' + store.directionsUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width:100%;margin-top:1rem">Get Directions</a>' +
    '</div>';
}

function renderMap(store, container) {
  container.innerHTML =
    '<div class="map-embed">' +
    '<iframe src="' + store.mapEmbedUrl + '" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="KingHaven Store location on Google Maps"></iframe>' +
    '</div>';
}
