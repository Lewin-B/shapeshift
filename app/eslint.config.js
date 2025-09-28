// @ts-check
const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname
  // allPaths: [path.join(__dirname, '../node_modules')] // optional: default is `true`
});

module.exports = [
  // ...compat.extends(
  //   'eslint:recommended',
  //   'plugin:@typescript-eslint/recommended'
  // ),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: ['node_modules', '.next', '**/dist/**']
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      // next: require('@next/eslint-plugin-next')
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }
      ]
      // 'no-console': 'warn',
      // 'no-unused-vars': 'warn',
    }
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react/no-unescaped-entities': 'off'
    }
  },
  {
    ignores: ['**/.eslintrc*', '**/next.config.js']
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn'
    }
  }
  // ...compat.extends('next/core-web-vitals')
];
