// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    // Add more setup options before each test is run
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ["node_modules", "<rootDir>/"],
    setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup-jest.ts"],
    testEnvironment: "jest-environment-jsdom",
    testPathIgnorePatterns: [
        "<rootDir>/cypress",
        "<rootDir>/src/__tests__/setup-jest.ts",
        "<rootDir>/src/__tests__/utils.ts",
    ],
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/**"],
    coveragePathIgnorePatterns: [".*__snapshots__/.*"],
    moduleNameMapper: {
        "@/components/(.*)": "<rootDir>/src/components/$1",
        "@/hooks/(.*)": "<rootDir>/src/hooks/$1",
        "@/loaders/(.*)": "<rootDir>/src/loaders/$1",
        "@/pages/(.*)": "<rootDir>/src/pages/$1",
        "@/services/(.*)": "<rootDir>/src/services/$1",
        "@/types/(.*)": "<rootDir>/src/types/$1",
        "@/data/(.*)": "<rootDir>/data/$1",
        "@/constants": "<rootDir>/src/constants",
        "@/theme": "<rootDir>/src/theme",
        "@/utils": "<rootDir>/src/utils",
        "@/test/(.*)": "<rootDir>/src/__tests__/$1",
    },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => {
    const config = await createJestConfig(customJestConfig)();

    // Override the node_modules transform ignore pattern to transform required modules
    config.transformIgnorePatterns[0] = "/node_modules/(?!uuid)/";

    return config;
};
