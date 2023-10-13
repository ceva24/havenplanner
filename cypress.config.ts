import { defineConfig } from "cypress";
import cypressSplit from "cypress-split";

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
        setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
            cypressSplit(on, config);
            return config;
        },
    },
    retries: 2,
});
