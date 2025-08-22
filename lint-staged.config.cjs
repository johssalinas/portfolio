module.exports = {
  '*.{js,jsx,ts,tsx,astro,css,md,json}': [
    'prettier --write',
    'eslint --fix'
  ]
};
