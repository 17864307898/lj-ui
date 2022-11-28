module.exports = {
  parser: 'vue-eslint-parser',
  rules: {
    "no-use-before-define": 'off',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    allowImportExportEverywhere: true, // 不限制eslint对import使用位置
    ecmaFeatures: {
      modules: true,
      legacyDecorators: true,
      jsx: true,
    }
  },
}