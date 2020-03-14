module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    describe: true,
    test: true,
    expect: true,
    beforeEach: true,
    afterEach: true,
    afterAll: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-param-reassign": 0
  },
};
