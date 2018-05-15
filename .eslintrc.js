module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  env: { browser: true },

  rules: {
    'react/react-in-jsx-scope': ['off'],
    'react/prop-types': ['off', { ignore: ['dispatch'] }],
    'import/no-named-as-default': ['off'],
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': ['client/__test__/**', 'tweets/**'] }],
  },

  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },

  settings: {
    'import/resolver': {
      webpack: { config: 'webpack.config.js' },
    },
  },

  overrides: [
    {
      // Allow using console.log on server and tweets folders.
      files: ['tweets/**', 'server/**'],
      rules: { 'no-console': ['off'] },
    },
    {
      // Override env and globals on test files.
      files: ['client/__test__/**', 'server/__test__/**'],
      env: { jest: true },
      globals: {
        shallow: true,
        mockDate: true,
        restoreDate: true,
      },
    },
  ],
};
