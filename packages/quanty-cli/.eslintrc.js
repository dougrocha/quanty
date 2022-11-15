module.exports = {
  ...require('@quanty/config/eslint-preset'),
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
}

