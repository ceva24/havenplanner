/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("index page", () => {
    it("redirects to the gloomhaven page", () => {
        cy.visit("/");

        cy.location("pathname").should("eq", "/gloomhaven");
    });
});
