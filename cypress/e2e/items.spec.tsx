/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("items tab", () => {
    it("allows items to be added", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Piercing Bow 009");
        cy.addItem("Eagle Eye Goggles 006");

        cy.findByRole("img", { name: "Piercing Bow" }).should("be.visible");
        cy.findByRole("img", { name: "Eagle Eye Goggles" }).should("be.visible");
    });

    it("allows items to be deleted", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Boots of Striding 001");
        cy.addItem("Minor Healing Potion 012");

        cy.findByRole("img", { name: "Boots of Striding" }).should("be.visible");
        cy.findByRole("img", { name: "Minor Healing Potion" }).should("be.visible");

        cy.findByRole("button", { name: "Delete Boots of Striding" }).click();

        cy.findByRole("img", { name: "Boots of Striding" }).should("not.exist");
        cy.findByRole("img", { name: "Minor Healing Potion" }).should("be.visible");
    });

    it("allows items to be deleted by pressing space", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Boots of Striding 001");

        cy.findByRole("img", { name: "Boots of Striding" }).should("be.visible");

        cy.findByRole("button", { name: "Delete Boots of Striding" }).focus().type(" ");

        cy.findByRole("img", { name: "Boots of Striding" }).should("not.exist");
    });

    it("allows items to be deleted by pressing enter", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Boots of Striding 001");

        cy.findByRole("img", { name: "Boots of Striding" }).should("be.visible");

        cy.findByRole("button", { name: "Delete Boots of Striding" }).focus().type("{enter}");

        cy.findByRole("img", { name: "Boots of Striding" }).should("not.exist");
    });

    it("orders items by slot and then name", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Boots of Striding 001");
        cy.addItem("Minor Power Potion 014");
        cy.addItem("Piercing Bow 009");
        cy.addItem("Minor Healing Potion 012");

        cy.findAllByRole("img").then((items) => {
            cy.wrap(items[0]).should("have.property", "alt", "Piercing Bow");
            cy.wrap(items[1]).should("have.property", "alt", "Boots of Striding");
            cy.wrap(items[2]).should("have.property", "alt", "Minor Healing Potion");
            cy.wrap(items[3]).should("have.property", "alt", "Minor Power Potion");
        });
    });

    it("shows the equip slot icon in the items autocomplete menu items", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findItemsAutocomplete().click();

        cy.findByRole("option", { name: "Piercing Bow 009" })
            .find("img")
            .should("have.attr", "src")
            .should("include", "equip-slot-icons/gloomhaven/two-hand");
    });

    it("shows the browse items dialog when pressing the browse items button", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findBrowseItemsButton().click();

        cy.findBrowseItemsDialog().should("be.visible");
    });

    it("allows the browse items dialog to be closed", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findBrowseItemsButton().click();

        cy.findBrowseItemsDialog().should("be.visible");

        cy.clickCloseButton();

        cy.findBrowseItemsDialog().should("not.be.visible");
    });

    it("shows items in the browse items dialog", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findBrowseItemsButton().click();

        cy.findBrowseItemsDialog().should("be.visible");

        cy.findByRole("button", { name: "Piercing Bow" }).should("exist");
        cy.findByRole("button", { name: "Boots of Striding" }).should("exist");
    });

    it("shows item groups in the browse items dialog", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findBrowseItemsButton().click();

        cy.findBrowseItemsDialog().should("be.visible");

        cy.findByRole("region", { name: "Prosperity 1" }).findByRole("button", { name: "Boots of Striding" });
    });

    it("adds an item from the browse items dialog when clicking on it", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findBrowseItemsButton().click();

        cy.findBrowseItemsDialog().should("be.visible");

        cy.findByRole("button", { name: "Piercing Bow" }).click();

        cy.findBrowseItemsDialog().should("not.be.visible");

        cy.findByRole("img", { name: "Piercing Bow" }).should("be.visible");
    });

    it("adds an item from the browse items dialog when pressing enter", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findBrowseItemsButton().click();

        cy.findBrowseItemsDialog().should("be.visible");

        cy.findByRole("button", { name: "Piercing Bow" }).focus().type("{enter}");

        cy.findBrowseItemsDialog().should("not.be.visible");

        cy.findByRole("img", { name: "Piercing Bow" }).should("exist");
    });

    it("adds an item from the browse items dialog when pressing space", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findBrowseItemsButton().click();

        cy.findBrowseItemsDialog().should("be.visible");

        cy.findByRole("button", { name: "Piercing Bow" }).focus().type(" ");

        cy.findBrowseItemsDialog().should("not.be.visible");

        cy.findByRole("img", { name: "Piercing Bow" }).should("exist");
    });

    it("does not show higher prosperity items in the items autocomplete when the prosperity level spoiler setting is at default", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findItemsAutocomplete().click();

        cy.findByRole("option", { name: "Stun Powder 021" }).should("not.exist");
    });

    it("shows higher prosperity items in the items autocomplete when the prosperity level spoiler setting has been raised", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.findItemsAutocomplete().click();

        cy.findByRole("option", { name: "Stun Powder 021" }).should("exist");
    });

    it("does not show higher prosperity items in the browse items dialog when the prosperity level spoiler setting is at default", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findBrowseItemsButton().click();

        cy.findBrowseItemsDialog().should("be.visible");

        cy.findByRole("button", { name: "Stun Powder" }).should("not.exist");
    });

    it("shows higher prosperity items in the browse items dialog when the prosperity level spoiler setting has been raised", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.findBrowseItemsButton().click();

        cy.findBrowseItemsDialog().should("be.visible");

        cy.findByRole("button", { name: "Stun Powder" }).should("exist");
    });

    it("shows items from an item group in the items autocomplete when the item group's spoiler setting has been checked", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setItemGroupActive("Random Item Designs");

        cy.findItemsAutocomplete().click();

        cy.findByRole("option", { name: "Circlet of Elements 075" }).should("exist");
    });

    it("shows items from an item group in the browse items dialog when the item group's spoiler setting has been checked", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setItemGroupActive("Random Item Designs");

        cy.findBrowseItemsButton().click();

        cy.findBrowseItemsDialog().should("be.visible");

        cy.findByRole("button", { name: "Circlet of Elements" }).should("exist");
    });

    it("allows higher prosperity items to be added", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.addItem("Stun Powder 021");

        cy.findByRole("img", { name: "Stun Powder" }).should("be.visible");
    });

    it("allows item group items to be added", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setItemGroupActive("Random Item Designs");

        cy.addItem("Circlet of Elements 075");

        cy.findByRole("img", { name: "Circlet of Elements" }).should("be.visible");
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
});
