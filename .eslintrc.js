module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'no-empty-pattern': 'warn',
    'no-dupe-keys': 'warn'
  },
  env: {
    node: true,
    browser: true,
    es6: true
  }
};
