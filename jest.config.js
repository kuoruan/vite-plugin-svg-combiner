/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  roots: ["<rootDir>/tests/"],
  testRegex: [".*\\.(spec|test)\\.tsx?$"],
};
