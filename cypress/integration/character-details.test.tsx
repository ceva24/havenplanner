/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";
import "../support/commands";

describe("character details pane", () => {
    it("shows a list of classes in the class select list", () => {
        const characterClasses = [
            "None",
            "Brute",
            "Scoundrel",
            "Spellweaver",
            "Tinkerer",
            "Mindthief",
            "Cragheart",
        ];

        cy.visit("/");

        cy.findByRole("button", { name: "Class" }).click();

        cy.findByRole("listbox", { name: "Class" })
            .findAllByRole("option")
            .should("have.length", 7);

        cy.findByRole("listbox", { name: "Class" })
            .findAllByRole("option")
            .each((characterClass, index) => {
                cy.wrap(characterClass).should(
                    "have.text",
                    characterClasses[index]
                );
            });
    });

    it("shows the character details after selecting a class", () => {
        cy.visit("/");

        cy.findNameField().should("not.exist");
        cy.findExperienceField().should("not.exist");
        cy.findLevelField().should("not.exist");
        cy.findGoldField().should("not.exist");

        cy.selectClass("Spellweaver");

        cy.findCharacterDetailsForm().should("be.visible");
    });

    it("allows a name to be entered", () => {
        cy.visit("/");
        cy.selectClass("Spellweaver");

        cy.findNameField().type("Elsa");

        cy.should("have.value", "Elsa");
    });

    it("allows numerical characters to be entered in the experience text field", () => {
        cy.visit("/");
        cy.selectClass("Spellweaver");

        cy.findExperienceField().type("123");

        cy.should("have.value", "123");
    });

    it("doesn't allow non-numerical characters to be entered in the experience text field", () => {
        cy.visit("/");
        cy.selectClass("Spellweaver");

        cy.findExperienceField().type("hello");

        cy.should("have.value", "");
    });

    it("changes the level when changing the experience value", () => {
        cy.visit("/");
        cy.selectClass("Spellweaver");

        cy.findLevelField().should("have.value", "1");

        cy.findExperienceField().type("50");

        cy.findLevelField().should("have.value", "2");
    });

    it("allows numerical characters to be entered in the gold text field", () => {
        cy.visit("/");
        cy.selectClass("Spellweaver");

        cy.findGoldField().type("123");

        cy.should("have.value", "123");
    });

    it("doesn't allow non-numerical characters to be entered in the gold text field", () => {
        cy.visit("/");
        cy.selectClass("Spellweaver");

        cy.findGoldField().type("hello");

        cy.should("have.value", "");
    });

    it("resets the character details when clearing the class", () => {
        cy.visit("/");
        cy.selectClass("Spellweaver");

        cy.findNameField().type("Elsa").should("have.value", "Elsa");
        cy.findExperienceField().type("123").should("have.value", "123");
        cy.findGoldField().type("123").should("have.value", "123");

        cy.selectClass("None").selectClass("Mindthief");

        cy.findNameField().should("have.value", "");
        cy.findExperienceField().should("have.value", "");
        cy.findGoldField().should("have.value", "");
    });
});
