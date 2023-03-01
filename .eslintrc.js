module.exports = {
  root: true,

  env: {
    node: true
  },

  // 解决eslint中BMap报错
  // globals: {
  //   BMap: true,
  //   wx: true
  // },

  extends: [
    '@vue/standard',
    'plugin:vue/vue3-essential',
    '@vue/typescript',
    'eslint:recommended',
    // '@vue/typescript/recommended',
    '@vue/prettier',
    'plugin:prettier/recommended',
    // '@vue/prettier/@typescript-eslint',
    'prettier'
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020
  },

  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'generator-star-spacing': 'off',
    'vue/no-unused-vars': 0,
    'vue/require-v-for-key': 0,
    quotes: ['error', 'single'],
    'vue/multi-word-component-names': 0,
    'vue/no-mutating-props': 0,
    'no-unused-vars': 0,
    'eslint-disable-next-line': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
