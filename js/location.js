document.addEventListener('DOMContentLoaded', async () => {
  const infoContainer = document.getElementById('store-info');
  const mapContainer = document.getElementById('store-map');
  if (!infoContainer || !mapContainer) return;

  try {
    const store = await loadStoreInfo();
    renderStoreInfo(store, infoContainer);
    renderMap(store, mapContainer);
  } catch (err) {
    infoContainer.innerHTML = '<p class="loading">Unable to load store information.</p>';
    console.error(err);
  }
});
