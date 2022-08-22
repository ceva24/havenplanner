/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("items tab", () => {
    it("allows items to be added", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Piercing Bow");
        cy.addItem("Eagle Eye Goggles");

        cy.findByRole("img", { name: "Piercing Bow" }).should("be.visible");
        cy.findByRole("img", { name: "Eagle Eye Goggles" }).should("be.visible");
    });

    it("allows items to be deleted", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Boots of Striding");
        cy.addItem("Minor Healing Potion");

        cy.findByRole("img", { name: "Boots of Striding" }).should("be.visible");
        cy.findByRole("img", { name: "Minor Healing Potion" }).should("be.visible");

        cy.findByRole("button", { name: "Delete Boots of Striding" }).click();

        cy.findByRole("img", { name: "Boots of Striding" }).should("not.exist");
        cy.findByRole("img", { name: "Minor Healing Potion" }).should("be.visible");
    });

    it("allows items to be deleted by pressing space", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Boots of Striding");

        cy.findByRole("img", { name: "Boots of Striding" }).should("be.visible");

        cy.findByRole("button", { name: "Delete Boots of Striding" }).focus().type(" ");

        cy.findByRole("img", { name: "Boots of Striding" }).should("not.exist");
    });

    it("allows items to be deleted by pressing enter", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Boots of Striding");

        cy.findByRole("img", { name: "Boots of Striding" }).should("be.visible");

        cy.findByRole("button", { name: "Delete Boots of Striding" }).focus().type("{enter}");

        cy.findByRole("img", { name: "Boots of Striding" }).should("not.exist");
    });

    it("orders items by slot and then name", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Boots of Striding");
        cy.addItem("Minor Power Potion");
        cy.addItem("Piercing Bow");
        cy.addItem("Minor Healing Potion");

        cy.findAllByRole("img").then((items) => {
            cy.wrap(items[0]).should("have.property", "alt", "Piercing Bow");
            cy.wrap(items[1]).should("have.property", "alt", "Boots of Striding");
            cy.wrap(items[2]).should("have.property", "alt", "Minor Healing Potion");
            cy.wrap(items[3]).should("have.property", "alt", "Minor Power Potion");
        });
    });
});
