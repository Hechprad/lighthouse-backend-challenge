export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  globalTeardown: "./jest.teardown.ts",
  globalSetup: "./jest.setup.ts",
};
