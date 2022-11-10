module.exports = {
  ...require('config/eslint-preset'),
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-namespace': 'off',
  },
}
