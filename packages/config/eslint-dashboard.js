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
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/no-named-default': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'index',
          'sibling',
          'parent',
        ],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
  },
}
