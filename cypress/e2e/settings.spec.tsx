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
});
