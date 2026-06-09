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

async function getByBrand(brand) {
  const products = await loadProducts();
  if (!brand || brand === 'all') return products;
  return products.filter((p) => p.brand === brand);
}

async function getCategories() {
  return ['phones', 'accessories'];
}

const CATEGORY_LABELS = {
  phones: 'Phones',
  accessories: 'Accessories',
};

const CATEGORY_DESCRIPTIONS = {
  phones: 'iPhone & Samsung — brand new, sealed',
  accessories: 'Cables, cases, chargers & more',
};

const CATEGORY_IMAGES = {
  phones: 'assets/images/cool phones.jpeg',
  accessories: 'assets/images/store.jpeg',
};

const BRAND_LABELS = {
  apple: 'iPhone',
  samsung: 'Samsung',
  accessory: 'Accessory',
};

function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}

function getCategoryDescription(category) {
  return CATEGORY_DESCRIPTIONS[category] || '';
}

function getCategoryImage(category) {
  return CATEGORY_IMAGES[category] || '';
}

function getBrandLabel(brand) {
  return BRAND_LABELS[brand] || brand;
}
