module.exports = {
  '*.{js,jsx,ts,tsx,astro,css,md,json}': [
    'pnpm format',
    'pnpm lint:fix'
  ]
};
