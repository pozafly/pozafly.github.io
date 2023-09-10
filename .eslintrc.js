module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'prettier', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import'],
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
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        allowSeparatedGroups: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'gatsby**',
            group: 'builtin',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroupsExcludedImportTypes: [],
      },
    ],
    'no-else-return': 'error',
    'no-console': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
