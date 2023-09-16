module.exports = {
  extends: ['stylelint-config-recommended-scss'],
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
  rules: {
    'declaration-property-value-no-unknown': true,
    'function-no-unknown': true,
    'unit-no-unknown': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-duplicate-custom-properties': true,
    'font-family-no-duplicate-names': true,
    'keyframe-block-no-duplicate-selectors': true,
    'no-duplicate-selectors': true,
    'no-duplicate-at-import-rules': true,
    'block-no-empty': true,
    'function-calc-no-unspaced-operator': true,
    'annotation-no-unknown': true,
    'at-rule-empty-line-before': ['always'],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
      },
    ],
  },
};
