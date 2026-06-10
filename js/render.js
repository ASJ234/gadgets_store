function assetUrl(path) {
  return encodeURI(path);
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '<span class="stars" aria-label="' + rating + ' out of 5 stars">';
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      html += '★';
    } else if (i === full && half) {
      html += '★';
    } else {
      html += '<span style="opacity:0.3">★</span>';
    }
  }
  html += '</span>';
  return html;
}

function renderProductCard(product) {
  const card = document.createElement('a');
  card.href = 'product.html?id=' + encodeURIComponent(product.id);
  card.className = 'product-card';

  const brandBadge =
    product.brand && product.brand !== 'accessory'
      ? '<span class="product-card-brand product-card-brand--' + product.brand + '">' + escapeHtml(getBrandLabel(product.brand)) + '</span>'
      : '';

  card.innerHTML =
    '<div class="product-card-image">' +
    brandBadge +
    '<img src="' + assetUrl(product.image) + '" alt="' + escapeHtml(product.name) + '" loading="lazy">' +
    '</div>' +
    '<div class="product-card-body">' +
    '<span class="product-card-category">' + escapeHtml(getCategoryLabel(product.category)) + '</span>' +
    '<h3 class="product-card-name">' + escapeHtml(product.name) + '</h3>' +
    '<div class="product-card-rating">' + renderStars(product.rating) + ' <span>(' + product.rating + ')</span></div>' + '</p>' +
    '</div>';
  return card;
}

function renderProductGrid(products, container) {
  container.innerHTML = '';
  if (products.length === 0) {
    container.innerHTML =
      '<div class="empty-state">' +
      '<p>No products found matching your criteria.</p>' +
      '<a href="catalog.html" class="btn btn-outline">View all products</a>' +
      '</div>';
    return;
  }
  const grid = document.createElement('div');
  grid.className = 'product-grid';
  products.forEach((product) => {
    grid.appendChild(renderProductCard(product));
  });
  container.appendChild(grid);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderCategoryTiles(categories, container) {
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'category-grid category-grid--home';

  categories.forEach((category) => {
    const tile = document.createElement('a');
    tile.href = 'catalog.html?category=' + encodeURIComponent(category);
    tile.className = 'category-tile category-tile--image';
    const image = getCategoryImage(category);

    tile.innerHTML =
      '<div class="category-tile-media">' +
      '<img src="' + assetUrl(image) + '" alt="' + escapeHtml(getCategoryLabel(category)) + '" loading="lazy">' +
      '<span class="category-tile-overlay"></span>' +
      '</div>' +
      '<div class="category-tile-content">' +
      '<span class="category-tile-label">' + escapeHtml(getCategoryLabel(category)) + '</span>' +
      '<span class="category-tile-desc">' + escapeHtml(getCategoryDescription(category)) + '</span>' +
      '<span class="category-tile-cta">Browse &rarr;</span>' +
      '</div>';
    grid.appendChild(tile);
  });

  container.appendChild(grid);
}
