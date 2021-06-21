module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb/hooks',
    'plugin:jest/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    // core
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-void': 'off',

    // prettier
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',

    // import
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.{test}.js',
          'src/setupTests.js',
          'src/testUtils.js',
        ],
      },
    ],
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',

    // jsx-a11y
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-redundant-roles': 'warn',

    // react
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'warn',
    'react/require-default-props': 'off',
    'react/state-in-constructor': 'off',

    // react-hooks
    'react-hooks/exhaustive-deps': 'warn',

    // unicorn
    'unicorn/filename-case': [
      'warn',
      {
        cases: {
          camelCase: false,
          kebabCase: true,
          snakeCase: false,
          pascalCase: true,
        },
        ignore: [/setupTests\.js$/, /testUtils\.js$/],
      },
    ],
    'unicorn/consistent-destructuring': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/prefer-dom-node-text-content': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};
