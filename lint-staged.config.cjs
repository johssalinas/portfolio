module.exports = {
  '*.{ts,tsx}': [
    'pnpm typecheck',
    'pnpm format',
    'pnpm lint:fix'
  ],
  '*.{js,jsx,astro,css,md,json}': [
    'pnpm format',
    'pnpm lint:fix'
  ]
};
