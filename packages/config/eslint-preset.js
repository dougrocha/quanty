module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  root: true,
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  rules: {
    'capitalized-comments': [
      'error',
      'always',
      { ignoreConsecutiveComments: true },
    ],
    '@typescript-eslint/no-floating-promises': [
      'warn',
      {
        ignoreVoid: true,
        ignoreIIFE: false,
      },
    ],
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
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
