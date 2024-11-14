const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      'no-extra-boolean-cast': ['off'],
      'prefer-spread': ['off'],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: ['element', 'attribute'],
          prefix: 'bfPc',
          style: 'camelCase',
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: ['element', 'attribute'],
          prefix: 'bf-pc',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: [
            'methods'
          ]
        }
      ]
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
