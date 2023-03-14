/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("settings dialog - classes", () => {
    it("shows the classes", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findByRole("region", { name: "Class Spoilers" }).findByRole("checkbox", { name: "Eclipse" }).should("exist");
    });

    it("allows locked classes to be unlocked and selected", () => {
        cy.visit("/");

        cy.spoilAll();

        cy.selectClass("Nightshroud");

        cy.findByRole("button", { name: "Class" }).should("have.text", "Nightshroud");
    });

    it("removes unlocked classes from the class select when they are locked again", () => {
        cy.visit("/");

        cy.spoilAll();

        cy.findSelectClassButton().click();

        cy.findByRole("listbox", { name: "Class" }).findByRole("option", { name: "Nightshroud" }).should("exist");

        cy.get("body").click(0, 0);

        cy.unspoilAll();

        cy.findSelectClassButton().click();

        cy.findByRole("listbox", { name: "Class" }).findByRole("option", { name: "Nightshroud" }).should("not.exist");
    });

    it("resets the class to default when locking the selected class", () => {
        cy.visit("/");

        cy.spoilAll();

        cy.selectClass("Nightshroud");

        cy.unspoilAll();

        cy.findByRole("button", { name: "Class" }).should("have.text", "Brute");
    });

    it("does not reset the class when locking and immediately unlocking the selected class again", () => {
        cy.visit("/");

        cy.spoilAll();

        cy.selectClass("Nightshroud");

        cy.openSettings();

        cy.unspoilAll();

        cy.spoilAll();

        cy.clickCloseButton();

        cy.findByRole("button", { name: "Class" }).should("have.text", "Nightshroud");
    });

    it("does reset the class to default when toggling off and immediately toggling on spoil all in the header", () => {
        cy.visit("/");

        cy.spoilAll();

        cy.selectClass("Nightshroud");

        cy.unspoilAll();

        cy.spoilAll();

        cy.findByRole("button", { name: "Class" }).should("have.text", "Brute");
    });

    it("shows the spoiler hint in the class select when no locked classes are spoiled", () => {
        cy.visit("/");

        cy.findSelectClassButton().click();

        cy.findByRole("listbox", { name: "Class" })
            .findByRole("option", { name: "Change your spoiler settings to see more classes..." })
            .should("exist");
    });

    it("does not show the spoiler hint in the class select when all locked classes are spoiled", () => {
        cy.visit("/");

        cy.openSettings();

        cy.findByRole("region", { name: "Class Spoilers" }).findAllByRole("checkbox").click();

        cy.clickCloseButton();

        cy.findSelectClassButton().click();

        cy.findByRole("listbox", { name: "Class" })
            .findByRole("option", { name: "Change your spoiler settings to see more classes..." })
            .should("not.exist");
    });
});
