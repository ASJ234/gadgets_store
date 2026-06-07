document.addEventListener('DOMContentLoaded', async () => {
  const gridContainer = document.getElementById('catalog-grid');
  const pillsContainer = document.getElementById('filter-pills');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const resultsCount = document.getElementById('results-count');
  if (!gridContainer || !pillsContainer) return;

  let allProducts = [];
  let activeCategory = new URLSearchParams(window.location.search).get('category') || 'all';

  try {
    allProducts = await getAll();
    renderFilterPills(pillsContainer, activeCategory);
    applyFilters();
  } catch (err) {
    gridContainer.innerHTML = '<p class="loading">Unable to load products. Please try again later.</p>';
    console.error(err);
    return;
  }

  searchInput?.addEventListener('input', applyFilters);
  sortSelect?.addEventListener('change', applyFilters);

  function renderFilterPills(container, selected) {
    const categories = ['all', ...new Set(allProducts.map((p) => p.category))];
    container.innerHTML = '';
    categories.forEach((cat) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'filter-pill' + (cat === selected ? ' active' : '');
      pill.textContent = cat === 'all' ? 'All' : getCategoryLabel(cat);
      pill.dataset.category = cat;
      pill.addEventListener('click', () => {
        activeCategory = cat;
        container.querySelectorAll('.filter-pill').forEach((p) => {
          p.classList.toggle('active', p.dataset.category === cat);
        });
        const url = new URL(window.location);
        if (cat === 'all') {
          url.searchParams.delete('category');
        } else {
          url.searchParams.set('category', cat);
        }
        window.history.replaceState({}, '', url);
        applyFilters();
      });
      container.appendChild(pill);
    });
  }

  function applyFilters() {
    let filtered = [...allProducts];

    if (activeCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    const query = searchInput?.value.trim().toLowerCase() || '';
    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          getCategoryLabel(p.category).toLowerCase().includes(query)
      );
    }

    const sort = sortSelect?.value || 'name-asc';
    filtered.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    if (resultsCount) {
      resultsCount.textContent =
        filtered.length + ' product' + (filtered.length !== 1 ? 's' : '') + ' found';
    }

    renderProductGrid(filtered, gridContainer);
  }
});
