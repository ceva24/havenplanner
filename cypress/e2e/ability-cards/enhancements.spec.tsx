/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("ability cards tab - enhancements", () => {
    it("renders a card", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findByRole("img", { name: "Trample" }).should("have.attr", "src").should("include", "gh-trample");
    });
});
