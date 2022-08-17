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

    it("renders level 2-9 cards", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("region", { name: "Level 2 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 3 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 4 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 5 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 6 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 7 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 8 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 9 Ability Cards" }).findAllByRole("img").should("have.length", 2);
    });

    it("renders cards as locked by default", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("checkbox", { name: "Fatal Advance" }).should("have.attr", "aria-checked", "false");
    });

    it("unlocks a card when clicking on it", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("checkbox", { name: "Fatal Advance" }).click().should("have.attr", "aria-checked", "true");
    });

    it("unlocks a card when pressing space", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("checkbox", { name: "Fatal Advance" })
            .focus()
            .type(" ")
            .should("have.attr", "aria-checked", "true");
    });

    it("unlocks a card when pressing enter", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("checkbox", { name: "Fatal Advance" })
            .focus()
            .type("{enter}")
            .should("have.attr", "aria-checked", "true");
    });
});
