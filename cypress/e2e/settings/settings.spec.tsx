/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("settings dialog", () => {
    it("opens the settings dialog when pressing the settings button", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findSettingsDialog().should("exist");
    });

    it("closes the settings dialog when pressing the close button", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findSettingsDialog().clickCloseButton();

        cy.findSettingsDialog().should("not.exist");
    });

    it("sets item spoiler settings to max when toggling spoil all on in the settings dialog", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findByRole("dialog", { name: "Settings" }).spoilAll();

        cy.shouldHaveProsperityLevel(9);

        cy.findSettingsDialog().findAllByRole("checkbox").should("be.checked");
    });

    it("sets the header spoil all switch checked when when toggling spoil all on in the settings dialog", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findSettingsDialog().spoilAll();

        cy.clickCloseButton();

        cy.get("header").findByRole("checkbox", { name: "Spoil all" }).should("be.checked");
    });

    it("sets partial spoiler settings to max when toggling spoil all on in the settings dialog", () => {
        cy.visit("/");

        cy.setProsperityLevel(3);

        cy.setSpoilerActive("Random Item Designs");

        cy.openSettings();

        cy.findSettingsDialog().spoilAll();

        cy.shouldHaveProsperityLevel(9);

        cy.findSettingsDialog().findAllByRole("checkbox").should("be.checked");
    });

    it("sets the spoil all toggle value to true when individually settings all spoiler settings to max", () => {
        cy.visit("/");

        cy.setProsperityLevel(9);

        cy.openSettings();

        cy.findByRole("region", { name: "Class Spoilers" }).findAllByRole("checkbox").check();

        cy.findByRole("region", { name: "Item Spoilers" }).findAllByRole("checkbox").check();

        cy.findSettingsDialog().findByRole("checkbox", { name: "Spoil all" }).should("be.checked");
    });

    it("sets full spoiler settings to min when toggling spoil all off in the settings dialog", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findSettingsDialog().spoilAll();

        cy.findSettingsDialog().unspoilAll();

        cy.shouldHaveProsperityLevel(1);

        cy.findSettingsDialog().findAllByRole("checkbox").should("not.be.checked");
    });

    it("sets spoiler settings to max when toggling spoil all on in the header", () => {
        cy.visit("/");

        cy.get("header").spoilAll();

        cy.openSettings();

        cy.shouldHaveProsperityLevel(9);

        cy.findSettingsDialog().findAllByRole("checkbox").should("be.checked");
    });

    it("sets partial spoiler settings to max when toggling spoil all on in the header", () => {
        cy.visit("/");

        cy.setProsperityLevel(3);

        cy.setSpoilerActive("Random Item Designs");

        cy.get("header").spoilAll();

        cy.openSettings();

        cy.shouldHaveProsperityLevel(9);

        cy.findSettingsDialog().findAllByRole("checkbox").should("be.checked");
    });

    it("sets full spoiler settings to min when toggling spoil all off in the header", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findSettingsDialog().spoilAll();

        cy.clickCloseButton();

        cy.get("header").findByRole("checkbox", { name: "Spoil all" }).should("be.checked");

        cy.get("header").unspoilAll();

        cy.openSettings();

        cy.shouldHaveProsperityLevel(1);

        cy.findSettingsDialog().findAllByRole("checkbox").should("not.be.checked");
    });
});
