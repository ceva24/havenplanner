/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("settings", () => {
    it("opens the settings drawer when pressing the settings button", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findSettingsDrawer().should("be.visible");
    });

    it("closes the settings drawer when pressing the close button", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findSettingsDrawer().clickCloseButton();

        cy.findSettingsDrawer().should("not.exist");
    });

    it("allows the item spoiler prosperity level to be set", () => {
        cy.visit("/");

        cy.setProsperityLevel(7);

        cy.openSettings();

        cy.hasProsperityLevel(7);
    });

    it.only("removes higher prosperity items when lowering the item spoiler prosperity level", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.addItem("Stun Powder 021");

        cy.findByRole("img", { name: "Stun Powder" }).should("be.visible");

        cy.setProsperityLevel(1);

        cy.findByRole("img", { name: "Stun Powder" }).should("not.exist");
    });
});
