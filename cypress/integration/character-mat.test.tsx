/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "../support/commands";

describe("character mat", () => {
    it("shows the character mat after selecting a class", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat" }).should("not.exist");

        cy.selectClass("Spellweaver");

        cy.findByRole("img", { name: "Character mat" }).should("be.visible");
    });
});
