/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("settings", () => {
    it("opens the settings drawer when pressing the settings button", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findSettingsDialog().should("be.visible");
    });

    it("closes the settings drawer when pressing the close button", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findSettingsDialog().clickCloseButton();

        cy.findSettingsDialog().should("not.exist");
    });

    it("allows the item spoiler prosperity level to be set", () => {
        cy.visit("/");

        cy.setProsperityLevel(2);

        cy.openSettings();

        cy.shouldHaveProsperityLevel(2);
    });

    it("allows item groups to be set", () => {
        cy.visit("/");

        cy.setItemGroupActive("Random Item Designs");

        cy.openSettings();

        cy.shouldHaveActiveItemGroup("Random Item Designs");
    });

    it("removes higher prosperity items when lowering the item spoiler prosperity level", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.addItem("Stun Powder 021");

        cy.findByRole("img", { name: "Stun Powder" }).should("be.visible");

        cy.setProsperityLevel(1);

        cy.findByRole("img", { name: "Stun Powder" }).should("not.exist");
    });

    it("removes items from an item group when marking that item group inactive", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setItemGroupActive("Random Item Designs");

        cy.addItem("Circlet of Elements 075");

        cy.findByRole("img", { name: "Circlet of Elements" }).should("be.visible");

        cy.setItemGroupInactive("Random Item Designs");

        cy.findByRole("img", { name: "Circlet of Elements" }).should("not.exist");
    });

    it("does not remove items from an item group when lowering the item prosperity level", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.setItemGroupActive("Random Item Designs");

        cy.addItem("Stun Powder 021");

        cy.addItem("Circlet of Elements 075");

        cy.findByRole("img", { name: "Circlet of Elements" }).should("be.visible");

        cy.setProsperityLevel(1);

        cy.findByRole("img", { name: "Circlet of Elements" }).should("be.visible");
    });

    it("does not remove higher prosperity items when marking an item group inactive", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.setItemGroupActive("Random Item Designs");

        cy.addItem("Stun Powder 021");

        cy.addItem("Circlet of Elements 075");

        cy.findByRole("img", { name: "Stun Powder" }).should("be.visible");

        cy.setItemGroupInactive("Random Item Designs");

        cy.findByRole("img", { name: "Stun Powder" }).should("be.visible");
    });

    it("does not remove higher prosperity items when lowering and immediately raising the item prosperity again", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.addItem("Stun Powder 021");

        cy.openSettings();

        cy.findByRole("region", { name: "Item Spoilers" }).find("#prosperity-slider").findByText(1).click();

        cy.findByRole("region", { name: "Item Spoilers" }).find("#prosperity-slider").findByText(2).click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Stun Powder" }).should("be.visible");
    });

    it("does not remove items from item groups when deactivating and immediately reactivating the item group again", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setItemGroupActive("Random Item Designs");

        cy.addItem("Circlet of Elements 075");

        cy.openSettings();

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Random Item Designs" })
            .uncheck();

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Random Item Designs" })
            .check();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Circlet of Elements" }).should("be.visible");
    });
});
