
module.exports = {
  preset: "amex-jest-preset",
  projects: [
    {
      displayName: 'client',
      testMatch: ['<rootDir>/__test__/static/**/*[sS]pec.js'],
      setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
      snapshotSerializers: ['enzyme-to-json/serializer'],
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|scss)$':
          '<rootDir>/src/utils/empty-module.js',
        '^.+\\.(css|less|scss)$': 'babel-jest',
      },
    },
    // {
    //   displayName: 'server',
    //   testMatch: ['<rootDir>/__test__/server/**/*[sS]pec.js'],
    //   testEnvironment: 'node',
    //   setupFiles: ['dotenv/config'],
    // },
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/server/**/!(*.spec).js',
    '<rootDir>/src/static/**/!(*.spec).js',
  ],
  coverageReporters: ["clover", "lcov"],
  coverageThreshold: {
    './src/static': {
      branches: 25,
      functions: 25,
      lines: 25,
      statements: 25,
    }
  },
  testTimeout: 30000
}