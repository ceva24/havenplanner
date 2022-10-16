/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("perks tab", () => {
    it("displays the base attack modifier deck", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.findAttackModifierCardWithCount("2x", 1).should("exist");
        cy.findAttackModifierCardWithCount("+2", 1).should("exist");
        cy.findAttackModifierCardWithCount("+1", 5).should("exist");
        cy.findAttackModifierCardWithCount("+0", 6).should("exist");
        cy.findAttackModifierCardWithCount("-1", 5).should("exist");
        cy.findAttackModifierCardWithCount("-2", 1).should("exist");
        cy.findAttackModifierCardWithCount("Miss", 1).should("exist");
    });
});
