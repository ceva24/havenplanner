/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("app page", () => {
    it("shows the profile tab content by default", () => {
        cy.visit("/gloomhaven");

        cy.findCharacterDetailsForm().should("be.visible");
    });

    it("sets the page title", () => {
        cy.visit("/gloomhaven");

        cy.title().should("equal", "Gloomhaven Character Planner - HavenPlanner");
    });

    it("renders the header", () => {
        cy.visit("/gloomhaven");

        cy.get("header").should("exist");
    });

    it("renders a spoil all toggle in the header", () => {
        cy.visit("/gloomhaven");

        cy.get("header").findByRole("checkbox", { name: "Spoil all" }).should("exist");
    });

    it("renders the page content in the main region", () => {
        cy.visit("/gloomhaven");

        cy.get("main").findCharacterDetailsForm().should("exist");
    });

    it("clears the query string after loading character details from it", () => {
        cy.visit("/?character=abc");

        cy.location("search").should("equal", "");
    });

    it("does not set the x-robots-tag header", () => {
        cy.request("/gloomhaven").then((response: Cypress.Response<string>) => {
            expect(response.headers).not.to.have.property("x-robots-tag");
        });
    });
});
