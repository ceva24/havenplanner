/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";
import "../support/commands";

describe("index page", () => {
    it("renders", () => {
        cy.visit("/");

        cy.percySnapshot();
    });

    it("sets the page title", () => {
        cy.visit("/");

        cy.title().should("equal", "Gloomhaven Character Planner");
    });

    it("renders the header", () => {
        cy.visit("/");

        cy.get("header").should("exist");
    });
    it("renders the page content in the main region", () => {
        cy.visit("/");

        cy.get("main").findCharacterDetailsForm().should("exist");
    });

    it("renders the footer", () => {
        cy.visit("/");

        cy.get("footer").should("exist");
    });

    it("shows the character details and character mat", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat" }).should("be.visible");
        cy.findNameField().should("be.visible");
        cy.findExperienceField().should("be.visible");
        cy.findLevelField().should("be.visible");
        cy.findGoldField().should("be.visible");

        cy.percySnapshot();
    });
});
