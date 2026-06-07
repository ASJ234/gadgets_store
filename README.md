# KingHaven Store

A static gadgets catalog website built with plain HTML, CSS, and vanilla JavaScript. No database or backend required.

## Features

- **Product catalog** with category filtering, search, and sort
- **Product detail pages** with specs and descriptions
- **Location page** with store info and embedded Google Maps
- **Mobile-first responsive design** with hamburger navigation
- **15 sample products** across 5 categories

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Catalog | `catalog.html` |
| Product detail | `product.html?id=product-id` |
| Location | `location.html` |
| About | `about.html` |

## Run Locally

A local server is required because the site loads product data via `fetch()`.

```bash
cd kinghavenstore
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Project Structure

```
kinghavenstore/
├── index.html
├── catalog.html
├── product.html
├── location.html
├── about.html
├── css/
├── js/
├── data/
│   ├── products.json
│   └── store.json
└── assets/images/
```

## Customization

### Products

Edit [`data/products.json`](data/products.json) to add, remove, or update products.

### Store Location

Edit [`data/store.json`](data/store.json) with your real address, hours, and Google Maps embed URL.

To get a new embed URL: open [Google Maps](https://www.google.com/maps), search your address, click **Share → Embed a map**, and copy the iframe `src` into `mapEmbedUrl`.

## Deploy

This site can be deployed to any static host:

- **Netlify** — drag and drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages** — push to a repo and enable Pages in Settings
- **Vercel, Cloudflare Pages** — connect your repo or upload the folder

No build step is needed.

## License

MIT
