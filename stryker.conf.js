/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  comment:
    'This config was generated using a preset. Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/react.md#react',
  mutate: ['src/utils/*.js?(x)', '!src/**/*@(.test|.spec|Spec).js?(x)'],
  mutator: 'javascript',
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  coverageAnalysis: 'off',
  jest: {
    projectType: 'create-react-app'
  }
};
