// eslint.config.js
import next from "@next/eslint-plugin-next";
import eslint from "eslint";

const reactRules = {
  'react/display-name': 'off',
  'react/jsx-key': 'off',
  'react/prop-types': 'off'
};

/** @type {import('eslint').Linter.ConfigSchema['rules']} */
const nextRules = {
  '@next/next/no-html-link-for-pages': 'off'
};

const commonRules = {
  'no-unused-vars': 'warn',
  'no-console': 'warn',
  'no-shadow': 'off',
  'no-undef': 'warn'
};

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      '@next/next': next
    },
    rules: {
      ...commonRules,
      ...nextRules,
      ...reactRules
    },
    settings: {
      next: {
        rootDir: __dirname
      }
    }
  }
];
