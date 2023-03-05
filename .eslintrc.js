/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ['next/core-web-vitals', 'eslint:recommended'],
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
      },
      rules: {
        'no-unused-vars': 'off',
        '@next/next/no-html-link-for-pages': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        // '@typescript-eslint/no-unsafe-assignment': 'off',
        // '@typescript-eslint/no-unsafe-argument': 'off',
        // '@typescript-eslint/no-unsafe-call': 'off',
      },
    },
  ],
  settings: {
    next: {
      rootDir: 'apps/web/',
    },
  },
  reportUnusedDisableDirectives: true,
  ignorePatterns: [
    '.eslintrc.js',
    '**/*.config.js',
    '**/*.config.cjs',
    'packages/config/**',
  ],
}

module.exports = config
