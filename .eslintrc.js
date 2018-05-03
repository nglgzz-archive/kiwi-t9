module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  env: { browser: true },
  rules: { 'react/react-in-jsx-scope': ['off'] },
};
