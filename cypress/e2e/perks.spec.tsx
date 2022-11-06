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

    it("displays the perks", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.shouldHavePerkWithCheckboxCount("Remove two <-1> cards", 1);
        cy.shouldHavePerkWithCheckboxCount("Replace one <-1> card with one <+1> card", 1);
        cy.shouldHavePerkWithCheckboxCount("Add two <+1> cards", 2);
        cy.shouldHavePerkWithCheckboxCount("Add one <+3> card", 1);
        cy.shouldHavePerkWithCheckboxCount("Add three <chain> PUSH <push> 1 cards", 2);
        cy.shouldHavePerkWithCheckboxCount("Add two <chain> PIERCE <pierce> 3 cards", 1);
        cy.shouldHavePerkWithCheckboxCount("Add one <chain> STUN <stun> card", 2);
        cy.shouldHavePerkWithCheckboxCount(
            "Add one <chain> DISARM <disarm> card and one <chain> MUDDLE <muddle> card",
            1
        );
        cy.shouldHavePerkWithCheckboxCount("Add one <chain> ADD TARGET <target> card", 2);
        cy.shouldHavePerkWithCheckboxCount("Add one <+1> Shield <shield> 1, self card", 1);
        cy.shouldHavePerkWithCheckboxCount("Ignore negative item effects and add one <+1> card", 1);
    });
});
