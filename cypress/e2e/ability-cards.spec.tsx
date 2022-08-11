/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("ability cards tab", () => {
    it("renders a card", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("region", { name: "Level 1 Ability Cards" })
            .findByRole("img", { name: "Trample" })
            .should("have.attr", "src")
            .should("include", "gh-trample");
    });

    it("renders level 1 cards", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("region", { name: "Level 1 Ability Cards" }).findAllByRole("img").should("have.length", 10);
    });

    it("renders level X cards", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("region", { name: "Level X Ability Cards" }).findAllByRole("img").should("have.length", 3);
    });
});
