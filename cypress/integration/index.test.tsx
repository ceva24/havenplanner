/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";
import "../support/commands";

describe("index page", () => {
    it("shows the character details and character mat", () => {
        cy.visit("/");

        cy.findCharacterDetailsForm().should("be.visible");

        cy.findByRole("img", { name: "Class icon" })
        .should("be.visible")
        .and(($img) => {
            expect(
                ($img[0] as HTMLImageElement).naturalWidth
            ).to.be.greaterThan(0);
        });

        cy.findByRole("img", { name: "Character mat" })
        .should("be.visible")
        .and(($img) => {
            expect(
                ($img[0] as HTMLImageElement).naturalWidth
            ).to.be.greaterThan(0);
        });

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
});
