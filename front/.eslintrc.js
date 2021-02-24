module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBufferer: 'readonly',
    test: 'readonly',
    expect: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'arrow-parens': [1, 'as-needed'],
    // 'camelcase': [1, { ignoreDestructuring: true, allow: [] }],
    'no-console': 0,
    'object-curly-newline': 0,
    'no-confusing-arrow': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': [1, { ignorePropertyModificationsFor: [] }],
    'no-unused-vars': [1, { argsIgnorePattern: '^_' }],
    'import/prefer-default-export': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-props-no-spreading': [1, { exceptions: ['Fragment', 'Component'] }],
    'react/state-in-constructor': 0,
  },
};
