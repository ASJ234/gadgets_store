document.addEventListener('DOMContentLoaded', async () => {
  const categoryContainer = document.getElementById('category-tiles');
  const iphoneContainer = document.getElementById('iphone-products');
  const samsungContainer = document.getElementById('samsung-products');
  const accessoryContainer = document.getElementById('accessory-products');

  if (!categoryContainer) return;

  try {
    const products = await getAll();
    const categories = await getCategories();

    renderCategoryTiles(categories, categoryContainer);

    if (iphoneContainer) {
      const iphones = products.filter((p) => p.brand === 'apple').slice(0, 4);
      renderProductGrid(iphones, iphoneContainer);
    }

    if (samsungContainer) {
      const samsung = products.filter((p) => p.brand === 'samsung').slice(0, 4);
      renderProductGrid(samsung, samsungContainer);
    }

    if (accessoryContainer) {
      const accessories = products.filter((p) => p.category === 'accessories').slice(0, 4);
      renderProductGrid(accessories, accessoryContainer);
    }
  } catch (err) {
    categoryContainer.innerHTML = '<p class="loading">Unable to load products. Please try again later.</p>';
    console.error(err);
  }
});
