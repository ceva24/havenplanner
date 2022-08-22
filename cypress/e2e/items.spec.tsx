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
});
