module.exports = {
  ...require('@quanty/config/eslint-dashboard'),
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
}
