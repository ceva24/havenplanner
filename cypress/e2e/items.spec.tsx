/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("items tab", () => {
    it("allows items to be added", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findItemsAutocomplete().click();

        cy.findByRole("option", { name: "Piercing Bow" }).click();

        cy.findItemsAutocomplete().click();

        cy.findByRole("option", { name: "Eagle Eye Goggles" }).click();

        cy.findByRole("img", { name: "Piercing Bow" }).should("be.visible");
        cy.findByRole("img", { name: "Eagle Eye Goggles" }).should("be.visible");
    });

    it("allows items to be deleted", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findItemsAutocomplete().click();

        cy.findByRole("option", { name: "Boots of Striding" }).click();

        cy.findItemsAutocomplete().click();

        cy.findByRole("option", { name: "Minor Healing Potion" }).click();

        cy.findByRole("img", { name: "Boots of Striding" }).should("be.visible");
        cy.findByRole("img", { name: "Minor Healing Potion" }).should("be.visible");

        cy.findByRole("button", { name: "Delete item 1 - Boots of Striding" }).click();

        cy.findByRole("img", { name: "Boots of Striding" }).should("not.exist");
        cy.findByRole("img", { name: "Minor Healing Potion" }).should("be.visible");
    });
});
