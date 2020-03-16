module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    jest: true,
    describe: true,
    test: true,
    expect: true,
    beforeEach: true,
    beforeAll: true,
    afterEach: true,
    afterAll: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-param-reassign': 0
  },
};
