const sortImportsPlugin = require('@ianvs/prettier-plugin-sort-imports')
const prettierTailwindPlugin = require('prettier-plugin-tailwindcss')

/**
 * @refs  https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31#issuecomment-1195411734
 */
/** @type {import("prettier").Parser} */
const bothParser = {
  ...sortImportsPlugin.parsers.typescript,
  parse: prettierTailwindPlugin.parsers.typescript.parse,
}
/** @type {import("prettier").Plugin}  */
const mixedPlugin = {
  parsers: {
    typescript: bothParser,
  },
}

/** @type {import("prettier").Config} */
module.exports = {
  // plugins: [mixedPlugin],
  arrowParens: 'avoid',
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: false,
  semi: false,
  trailingComma: 'all',
  tabWidth: 2,
  // tailwindConfig: './packages/config/tailwind.config.js',
  // importOrder: [
  //   '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
  //   '^(next/(.*)$)|^(next$)',
  //   '^(expo(.*)$)|^(expo$)',
  //   '<THIRD_PARTY_MODULES>',
  //   '^@quanty/(.*)$',
  //   '',
  //   '^~/utils/(.*)$',
  //   '^~/components/(.*)$',
  //   '^~/styles/(.*)$',
  //   '^~/(.*)$',
  //   '^[./]',
  // ],
  // importOrderSeparation: false,
  // importOrderSortSpecifiers: true,
  // importOrderBuiltinModulesToTop: true,
  // importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  // importOrderMergeDuplicateImports: true,
  // importOrderCombineTypeAndValueImports: true,
}
