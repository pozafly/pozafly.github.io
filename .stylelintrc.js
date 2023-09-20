const { propertyGroups } = require('stylelint-config-clean-order');

const propertiesOrder = propertyGroups.map((properties) => ({
  noEmptyLineBetween: true,
  emptyLineBefore: 'never',
  properties,
}));

module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-clean-order/error'],
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
  rules: {
    'order/properties-order': [
      propertiesOrder,
      {
        severity: 'error',
        unspecified: 'bottomAlphabetical',
      },
    ],
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
    'unit-no-unknown': true,
    'no-irregular-whitespace': true,
    'length-zero-no-unit': true,
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
      },
    ],
    'function-name-case': ['lower'],
    'value-keyword-case': ['lower'],
    'function-calc-no-unspaced-operator': true,
    'annotation-no-unknown': true,
    'at-rule-empty-line-before': ['always'],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
      },
    ],
    'alpha-value-notation': ['number'],
    'color-function-notation': ['modern'],
    'color-hex-length': ['short'],
    'font-weight-notation': ['numeric'],
    'hue-degree-notation': ['number'],
    'import-notation': ['string'],
    'keyframe-selector-notation': ['keyword'],
    'selector-pseudo-element-colon-notation': ['single'],
    'declaration-block-no-redundant-longhand-properties': true,
    'shorthand-property-no-redundant-values': true,
  },
};
