/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "../support/commands";

describe("character mat", () => {
    it("shows the character mat", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat" }).should("be.visible");
    });
});
