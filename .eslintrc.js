module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  env: { browser: true, node: true, mocha: true },
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': ['error', { functions: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-unused-prop-types': 0, //false positives
    'no-unused-prop-types': 0,
    'linebreak-style': 0,
    'arrow-parens': [1, 'as-needed'],
    'prettier/prettier': [
      "error",
      {
        'trailingComma': 'es5',
        'singleQuote': true,
      }
    ]
  },
};