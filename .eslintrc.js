module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        // patterns: ['.*'],
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: "import React from 'react' makes bundle size larger.",
          },
        ],
      },
    ],
    'no-else-return': 'error',
    'no-console': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
