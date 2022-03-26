module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    semi: [2, 'never'],
    'space-before-function-paren': 0,
    'multiline-ternary': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
