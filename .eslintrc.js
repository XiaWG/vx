module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential'
  ],
  globals: {
    'process.env': true
  },
  rules: {
    'object-curly-spacing': ['error', 'never', {
      'objectsInObjects': false,
      'arraysInObjects': false
    }],
    'vue/no-side-effects-in-computed-properties': 'never',
    'vue/no-use-v-if-with-v-for': 'never',
    'vue/no-unused-components': ["error", {
      'ignoreWhenBindingPresent': true
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 'off',
    'no-multi-spaces': ['error', {
      'ignoreEOLComments': true
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
