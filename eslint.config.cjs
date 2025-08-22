const tsPlugin = require('@typescript-eslint/eslint-plugin');
const astroPlugin = require('eslint-plugin-astro');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'public/**',
      '*.png',
      '*.jpg',
      '*.jpeg',
      '*.webp',
      '*.svg',
      'pnpm-lock.yaml',
      '**/*.d.ts',
      '.astro/**/*.d.ts'
    ]
  },
  // TypeScript/JS: solo reglas recomendadas y Prettier
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: Object.assign(
      {},
      (tsPlugin.configs['strict-type-checked'] && tsPlugin.configs['strict-type-checked'].rules) || {},
      (tsPlugin.configs['stylistic-type-checked'] && tsPlugin.configs['stylistic-type-checked'].rules) || {},
      (prettier && prettier.rules) || {},
      {
        'no-console': 'error',
        'no-debugger': 'error',
        'eqeqeq': ['error', 'always'],
        'curly': 'error',
        'no-implicit-coercion': 'error',
        'prefer-const': 'error',
        'consistent-return': 'error',
        'no-var': 'error',
        'no-empty-function': 'error',
        'no-magic-numbers': ['warn', { ignore: [0,1,-1], ignoreArrayIndexes: true, enforceConst: true }],
        'complexity': ['warn', 10],
        'max-depth': ['warn', 4],
        'max-lines': ['warn', 300],
        'max-params': ['warn', 4],
        'max-statements': ['warn', 20],
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'error',
        '@typescript-eslint/prefer-readonly': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface']
      }
    )
  },
  // Astro: solo reglas recomendadas
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: require('astro-eslint-parser'),
      parserOptions: {
        parser: require('@typescript-eslint/parser'),
        extraFileExtensions: ['.astro']
      }
    },
    plugins: {
      astro: astroPlugin
    },
    rules: Object.assign(
      {},
      (astroPlugin.configs['strict'] && astroPlugin.configs['strict'].rules) || {},
      {
        'no-unused-vars': 'error',
        'no-console': 'error',
        'no-debugger': 'error',
        'eqeqeq': ['error', 'always'],
        'curly': 'error',
        'prefer-const': 'error',
        'consistent-return': 'error',
        'no-var': 'error',
        'no-empty-function': 'error',
        'max-lines': ['warn', 300],
        'max-params': ['warn', 4],
        'max-statements': ['warn', 20]
      }
    )
  }
];
