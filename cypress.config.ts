import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "zbs72n",
    fixturesFolder: false,
    video: false,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    e2e: {
        baseUrl: "http://localhost:3000",
        supportFile: false,
        specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    },
});
