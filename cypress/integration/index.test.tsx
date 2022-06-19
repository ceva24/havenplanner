/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";
import "../support/commands";

describe("index page", () => {
    it("renders", () => {
        cy.visit("/");

        cy.percySnapshot();
    });
    it("shows the character details and character mat after select a class", () => {
        cy.visit("/");

        cy.selectClass("Spellweaver");

        cy.findByRole("img", { name: "Character mat" }).should("be.visible");
        cy.findNameField().should("be.visible");
        cy.findExperienceField().should("be.visible");
        cy.findLevelField().should("be.visible");
        cy.findGoldField().should("be.visible");

        cy.percySnapshot();
    });
});
