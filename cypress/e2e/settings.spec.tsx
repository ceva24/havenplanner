/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("settings", () => {
    it("opens the settings drawer when pressing the settings button", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findSettingsDialog().should("exist");
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

    it("shows the item groups", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Random Item Designs" })
            .should("exist");
        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Other Items" })
            .should("exist");
        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Solo Scenario Items" })
            .should("exist");
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

        cy.findByRole("img", { name: "Stun Powder" }).should("exist");

        cy.setProsperityLevel(1);

        cy.findByRole("img", { name: "Stun Powder" }).should("not.exist");
    });

    it("removes items from an item group when marking that item group inactive", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setItemGroupActive("Random Item Designs");

        cy.addItem("Circlet of Elements 075");

        cy.findByRole("img", { name: "Circlet of Elements" }).should("exist");

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

        cy.findByRole("img", { name: "Circlet of Elements" }).should("exist");

        cy.setProsperityLevel(1);

        cy.findByRole("img", { name: "Circlet of Elements" }).should("exist");
    });

    it("does not remove higher prosperity items when marking an item group inactive", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.setItemGroupActive("Random Item Designs");

        cy.addItem("Stun Powder 021");

        cy.addItem("Circlet of Elements 075");

        cy.findByRole("img", { name: "Stun Powder" }).should("exist");

        cy.setItemGroupInactive("Random Item Designs");

        cy.findByRole("img", { name: "Stun Powder" }).should("exist");
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

        cy.findByRole("img", { name: "Stun Powder" }).should("exist");
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

        cy.findByRole("img", { name: "Circlet of Elements" }).should("exist");
    });

    it("sets item spoiler settings to max when toggling spoil all on in the settings dialog", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findByRole("dialog", { name: "Settings" }).spoilAll();

        cy.shouldHaveProsperityLevel(9);

        cy.shouldHaveActiveItemGroup("Random Item Designs");
        cy.shouldHaveActiveItemGroup("Other Items");
        cy.shouldHaveActiveItemGroup("Solo Scenario Items");
    });

    it("sets the header spoil all switch checked when when toggling spoil all on in the settings dialog", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findByRole("dialog", { name: "Settings" }).spoilAll();

        cy.clickCloseButton();

        cy.get("header").findByRole("checkbox", { name: "Spoil all" }).should("be.checked");
    });

    it("sets partial spoiler settings to max when toggling spoil all on in the settings dialog", () => {
        cy.visit("/");

        cy.setProsperityLevel(3);

        cy.setItemGroupActive("Random Item Designs");

        cy.openSettings();

        cy.findByRole("dialog", { name: "Settings" }).spoilAll();

        cy.shouldHaveProsperityLevel(9);

        cy.shouldHaveActiveItemGroup("Random Item Designs");

        cy.shouldHaveActiveItemGroup("Other Items");

        cy.shouldHaveActiveItemGroup("Solo Scenario Items");
    });

    it("sets the spoil all toggle value to true when individually settings all spoiler settings to max", () => {
        cy.visit("/");

        cy.setProsperityLevel(9);

        cy.setItemGroupActive("Random Item Designs");
        cy.setItemGroupActive("Other Items");
        cy.setItemGroupActive("Solo Scenario Items");

        cy.openSettings();

        cy.findByRole("dialog", { name: "Settings" })
            .findByRole("checkbox", { name: "Spoil all" })
            .should("be.checked");
    });

    it("sets full spoiler settings to min when toggling spoil all off in the settings dialog", () => {
        cy.visit("/");

        cy.setProsperityLevel(9);

        cy.setItemGroupActive("Random Item Designs");
        cy.setItemGroupActive("Other Items");
        cy.setItemGroupActive("Solo Scenario Items");

        cy.openSettings();

        cy.findByRole("dialog", { name: "Settings" }).unspoilAll();

        cy.shouldHaveProsperityLevel(1);

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Random Item Designs" })
            .should("not.be.checked");

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Other Items" })
            .should("not.be.checked");

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Solo Scenario Items" })
            .should("not.be.checked");
    });

    it("sets spoiler settings to max when toggling spoil all on in the header", () => {
        cy.visit("/");

        cy.get("header").spoilAll();

        cy.openSettings();

        cy.shouldHaveProsperityLevel(9);

        cy.shouldHaveActiveItemGroup("Random Item Designs");

        cy.shouldHaveActiveItemGroup("Other Items");

        cy.shouldHaveActiveItemGroup("Solo Scenario Items");
    });

    it("sets partial spoiler settings to max when toggling spoil all on in the header", () => {
        cy.visit("/");

        cy.setProsperityLevel(3);

        cy.setItemGroupActive("Random Item Designs");

        cy.get("header").spoilAll();

        cy.openSettings();

        cy.shouldHaveProsperityLevel(9);

        cy.shouldHaveActiveItemGroup("Random Item Designs");

        cy.shouldHaveActiveItemGroup("Other Items");

        cy.shouldHaveActiveItemGroup("Solo Scenario Items");
    });

    it("sets full spoiler settings to min when toggling spoil all off in the header", () => {
        cy.visit("/");

        cy.setProsperityLevel(9);

        cy.setItemGroupActive("Random Item Designs");
        cy.setItemGroupActive("Other Items");
        cy.setItemGroupActive("Solo Scenario Items");

        cy.get("header").unspoilAll();

        cy.openSettings();

        cy.shouldHaveProsperityLevel(1);

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Random Item Designs" })
            .should("not.be.checked");

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Other Items" })
            .should("not.be.checked");

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Solo Scenario Items" })
            .should("not.be.checked");
    });

    it("does not remove items from item groups when toggling off and immediately toggling on spoil all in the settings dialog", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.openSettings();

        cy.findByRole("dialog", { name: "Settings" }).spoilAll();

        cy.clickCloseButton();

        cy.addItem("Circlet of Elements 075");

        cy.openSettings();

        cy.findByRole("dialog", { name: "Settings" }).unspoilAll();

        cy.findByRole("dialog", { name: "Settings" }).spoilAll();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Circlet of Elements" }).should("exist");
    });

    it("does remove items from item groups when toggling off and immediately toggling on spoil all in the header", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.get("header").spoilAll();

        cy.addItem("Circlet of Elements 075");

        cy.get("header").unspoilAll();

        cy.get("header").spoilAll();

        cy.findByRole("img", { name: "Circlet of Elements" }).should("not.exist");
    });

    it("shows the spoiler hint in the items autocomplete when the prosperity level is < 9", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findItemsAutocomplete().type("Not an item");

        cy.findByText("No options - check your spoiler settings").should("exist");
    });

    it("shows the spoiler hint in the items autocomplete when the prosperity level is 9 but there are inactive item groups", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(9);

        cy.findItemsAutocomplete().type("Not an item");

        cy.findByText("No options - check your spoiler settings").should("exist");
    });

    it("does not show the spoiler hint in the items autocomplete when everything is spoiled", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.spoilAll();

        cy.findItemsAutocomplete().type("Not an item");

        cy.findByText("No options").should("exist");
    });

    it("does not show the spoiler hint in the classes autocomplete when everything is spoiled", () => {
        cy.visit("/");

        cy.spoilAll();

        cy.findSelectClassButton().click();

        cy.findByRole("listbox", { name: "Class" })
            .findByRole("option", { name: "Change your spoiler settings to see more classes..." })
            .should("not.exist");
    });
});
