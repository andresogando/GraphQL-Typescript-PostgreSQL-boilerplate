/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@server/connection": "<rootDir>/src/config/startServer.ts",
    "@resolvers": "<rootDir>/src/graphql/resolvers/index.ts",
    "@database": "<rootDir>/src/config/database.connection.ts",
  },
};
