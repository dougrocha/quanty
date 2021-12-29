module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', '@next/eslint-plugin-next'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
  },
}
