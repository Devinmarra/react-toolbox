const {defaults} = require('jest-config');
module.exports = {
  // ...
  moduleNameMapper: {
    ...defaults.moduleNameMapper,
    '^@src/(.*)$': '<rootDir>/src/$1',

  }
  // ...
};