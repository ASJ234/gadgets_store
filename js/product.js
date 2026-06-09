document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('product-detail');
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) {
    container.innerHTML =
      '<div class="empty-state">' +
      '<p>No product specified.</p>' +
      '<a href="catalog.html" class="btn btn-outline">Browse catalog</a>' +
      '</div>';
    return;
  }

  try {
    const product = await getById(id);
    if (!product) {
      container.innerHTML =
        '<div class="empty-state">' +
        '<p>Product not found.</p>' +
        '<a href="catalog.html" class="btn btn-outline">Browse catalog</a>' +
        '</div>';
      return;
    }

    document.title = product.name + " — King's Haven Store";

    const brandLine =
      product.brand && product.brand !== 'accessory'
        ? '<p class="product-detail-brand">' + escapeHtml(getBrandLabel(product.brand)) + '</p>'
        : '';

    const specsRows = Object.entries(product.specs)
      .map(([key, value]) => '<tr><th>' + escapeHtml(key) + '</th><td>' + escapeHtml(value) + '</td></tr>')
      .join('');

    container.innerHTML =
      '<div class="product-detail">' +
      '<div class="product-detail-gallery">' +
      '<div class="product-detail-image">' +
      '<img src="' + assetUrl(product.image) + '" alt="' + escapeHtml(product.name) + '">' +
      '</div>' +
      '</div>' +
      '<div class="product-detail-info">' +
      '<p class="product-detail-category">' + escapeHtml(getCategoryLabel(product.category)) + '</p>' +
      brandLine +
      '<h1 class="product-detail-name">' + escapeHtml(product.name) + '</h1>' +
      '<div class="product-detail-rating">' + renderStars(product.rating) + ' <span>(' + product.rating + ')</span></div>' +
      '<p class="product-detail-price">' + formatPrice(product.price) + '</p>' +
      '<p class="product-detail-description">' + escapeHtml(product.description) + '</p>' +
      '<table class="specs-table"><tbody>' + specsRows + '</tbody></table>' +
      '<a href="catalog.html?category=' + encodeURIComponent(product.category) + '" class="btn btn-outline">More ' + escapeHtml(getCategoryLabel(product.category)) + '</a>' +
      '</div>' +
      '</div>';
  } catch (err) {
    container.innerHTML = '<p class="loading">Unable to load product. Please try again later.</p>';
    console.error(err);
  }
});
