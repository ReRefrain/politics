# 8values Political Test

A modern, responsive clone of the 8values data and logic, rebuilt with React, Vite, and TailwindCSS.

## How to Run Locally

1. Install Node.js.
2. Open a terminal in this folder.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the server.
5. Open `http://localhost:5173`.

## How to Deploy to GitHub Pages

1. Create a new repository on GitHub.
2. Push this entire folder to your repository.
3. Go to your repository **Settings** -> **Pages**.
4. Source: `GitHub Actions` (Recommended for Vite) OR `Deploy from branch`.
   
   **Option A: Deploy using gh-pages branch (Simpler)**
   1. Run `npm run build` locally.
   2. This creates a `dist` folder.
   3. Force push the `dist` folder to a `gh-pages` branch (or use a helper package like `gh-pages`).
   
   **Option B: Automated Workflow (Best)**
   1. Create a file `.github/workflows/deploy.yml`.
   2. Copy the [Vite GitHub Pages Workflow](https://vitejs.dev/guide/static-deploy.html#github-pages) content into it.

## Quickest Manual Deploy
If you just want to drag-and-drop:
1. Run `npm run build`.
2. Locate the `dist` folder created in this directory.
3. Upload the *contents* of the `dist` folder to any static host (Netlify Drop, GitHub Pages manually, etc.).
