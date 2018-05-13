module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],

  env: {
    browser: true,
    jest: true,
  },

  rules: {
    'react/react-in-jsx-scope': ['off'],
    'import/no-named-as-default': ['off'],
    'react/prop-types': ['off', { ignore: ['dispatch'] }],
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
};
