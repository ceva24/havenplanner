/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";

describe("index page", () => {
    it("renders", () => {
        cy.visit("/");

        cy.percySnapshot();
    });

    it("has the correct page title", () => {
        cy.visit("/");

        cy.title().should("equal", "Gloomhaven Character Planner");
    });
});
