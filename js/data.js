let productsCache = null;

async function loadProducts() {
  if (productsCache) return productsCache;
  const response = await fetch('data/products.json');
  if (!response.ok) throw new Error('Failed to load products');
  productsCache = await response.json();
  return productsCache;
}

async function getAll() {
  return loadProducts();
}

async function getById(id) {
  const products = await loadProducts();
  return products.find((p) => p.id === id) || null;
}

async function getFeatured() {
  const products = await loadProducts();
  return products.filter((p) => p.featured);
}

async function getByCategory(category) {
  const products = await loadProducts();
  if (!category || category === 'all') return products;
  return products.filter((p) => p.category === category);
}

async function getCategories() {
  const products = await loadProducts();
  const categories = [...new Set(products.map((p) => p.category))];
  return categories.sort();
}

const CATEGORY_LABELS = {
  phones: 'Phones',
  laptops: 'Laptops',
  tablets: 'Tablets',
  wearables: 'Wearables',
  accessories: 'Accessories',
};

const CATEGORY_ICONS = {
  phones: '📱',
  laptops: '💻',
  tablets: '📟',
  wearables: '⌚',
  accessories: '🎧',
};

function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}

function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || '📦';
}
