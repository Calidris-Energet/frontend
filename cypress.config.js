import { allureCypress } from "allure-cypress/reporter";
import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000",
        setupNodeEvents(on, config) {
            allureCypress(on, config, {
                resultsDir: "allure-results",
            });
            return config;
        },
        reporter: "mochawesome",
        reporterOptions: {
            reportDir: "cypress/results",
            overwrite: false,
            html: false,
            json: true,
        },
    },
});
