module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  testEnvironment: 'node',
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)" ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  collectCoverageFrom: [
    './src/utils',
  ]
};
