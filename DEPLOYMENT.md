# Deployment Guide

This project is ready to deploy as a static frontend app.

## Option 1: Vercel

1. Push the repository to GitHub.
2. Go to https://vercel.com/new.
3. Import the GitHub repository.
4. Use these settings:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Click **Deploy**.
6. Copy the live URL into the README and your GitHub repo website field.

CLI alternative:

```bash
npm install
npm run build
npx vercel --prod
```

## Option 2: Netlify

1. Push the repository to GitHub.
2. Go to https://app.netlify.com/start.
3. Import the repository.
4. Netlify will read `netlify.toml` automatically.
5. Click **Deploy**.

CLI alternative:

```bash
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

## Option 3: GitHub Pages

For GitHub Pages, update `vite.config.ts` with your repository base path:

```ts
export default defineConfig({
  base: '/business-analytics-dashboard/',
  plugins: [react()]
});
```

Then build and publish the `dist` folder using GitHub Actions or your preferred Pages workflow.

## After deployment

- Add the live URL to the GitHub repository **Website** field.
- Replace the README demo placeholder with the deployed URL.
- Pin the repository on your GitHub profile.
- Add 2–3 screenshots or a short GIF if you want more visual proof.
