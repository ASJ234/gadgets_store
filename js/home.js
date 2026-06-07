document.addEventListener('DOMContentLoaded', async () => {
  const featuredContainer = document.getElementById('featured-products');
  const categoryContainer = document.getElementById('category-tiles');
  if (!featuredContainer || !categoryContainer) return;

  try {
    const [featured, categories] = await Promise.all([getFeatured(), getCategories()]);
    renderProductGrid(featured, featuredContainer);
    renderCategoryTiles(categories, categoryContainer);
  } catch (err) {
    featuredContainer.innerHTML = '<p class="loading">Unable to load products. Please try again later.</p>';
    console.error(err);
  }
});
