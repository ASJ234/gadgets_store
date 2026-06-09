document.addEventListener('DOMContentLoaded', async () => {
  const gridContainer = document.getElementById('catalog-grid');
  const pillsContainer = document.getElementById('filter-pills');
  const brandPillsContainer = document.getElementById('brand-pills');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const resultsCount = document.getElementById('results-count');
  if (!gridContainer || !pillsContainer) return;

  const params = new URLSearchParams(window.location.search);
  let allProducts = [];
  let activeCategory = params.get('category') || 'all';
  let activeBrand = params.get('brand') || 'all';

  try {
    allProducts = await getAll();
    renderFilterPills(pillsContainer, activeCategory);
    if (brandPillsContainer) renderBrandPills(brandPillsContainer, activeBrand);
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
        if (cat === 'accessories') activeBrand = 'all';
        container.querySelectorAll('.filter-pill').forEach((p) => {
          p.classList.toggle('active', p.dataset.category === cat);
        });
        updateUrl();
        if (brandPillsContainer) {
          renderBrandPills(brandPillsContainer, activeBrand);
        }
        applyFilters();
      });
      container.appendChild(pill);
    });
  }

  function renderBrandPills(container, selected) {
    const showBrands = activeCategory === 'all' || activeCategory === 'phones';
    if (!showBrands) {
      container.innerHTML = '';
      container.hidden = true;
      return;
    }
    container.hidden = false;
    const brands = ['all', 'apple', 'samsung'];
    container.innerHTML = '';
    brands.forEach((brand) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'filter-pill filter-pill--brand' + (brand === selected ? ' active' : '');
      pill.textContent = brand === 'all' ? 'All brands' : getBrandLabel(brand);
      pill.dataset.brand = brand;
      pill.addEventListener('click', () => {
        activeBrand = brand;
        container.querySelectorAll('.filter-pill').forEach((p) => {
          p.classList.toggle('active', p.dataset.brand === brand);
        });
        updateUrl();
        applyFilters();
      });
      container.appendChild(pill);
    });
  }

  function updateUrl() {
    const url = new URL(window.location);
    if (activeCategory === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', activeCategory);
    }
    if (activeBrand === 'all' || activeCategory === 'accessories') {
      url.searchParams.delete('brand');
    } else {
      url.searchParams.set('brand', activeBrand);
    }
    window.history.replaceState({}, '', url);
  }

  function applyFilters() {
    let filtered = [...allProducts];

    if (activeCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (activeBrand !== 'all' && activeCategory !== 'accessories') {
      filtered = filtered.filter((p) => p.brand === activeBrand);
    }

    const query = searchInput?.value.trim().toLowerCase() || '';
    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          getCategoryLabel(p.category).toLowerCase().includes(query) ||
          getBrandLabel(p.brand).toLowerCase().includes(query)
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
