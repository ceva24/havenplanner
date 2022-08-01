/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

const characterClasses = ["Brute", "Scoundrel", "Spellweaver", "Tinkerer", "Mindthief", "Cragheart"];

describe("profile tab", () => {
    it("shows a list of classes in the class select list", () => {
        cy.visit("/");

        cy.findSelectClassButton().click();

        cy.findByRole("listbox", { name: "Class" }).findAllByRole("option").should("have.length", 6);

        cy.findByRole("listbox", { name: "Class" })
            .findAllByRole("option")
            .each((characterClass, index) => {
                cy.wrap(characterClass).should("have.text", characterClasses[index]);
            });
    });

    it("shows the character details", () => {
        cy.visit("/");

        cy.findCharacterDetailsForm().should("be.visible");
    });

    it("has the first class selected on page load", () => {
        cy.visit("/");

        cy.findByRole("button", { name: "Class" }).should("have.text", characterClasses[0]);
    });

    it("allows a name to be entered", () => {
        cy.visit("/");

        cy.findNameField().type("Elsa");

        cy.should("have.value", "Elsa");
    });

    it("shows the class icon", () => {
        cy.visit("/");

        cy.findCharacterDetailsForm().findByRole("img", { name: "Class icon" }).should("be.visible");
    });

    it("allows numerical characters to be entered in the experience text field", () => {
        cy.visit("/");

        cy.findExperienceField().type("123");

        cy.should("have.value", "123");
    });

    it("doesn't allow non-numerical characters to be entered in the experience text field", () => {
        cy.visit("/");

        cy.findExperienceField().type("hello");

        cy.should("have.value", "");
    });

    it("changes the level when changing the experience value", () => {
        cy.visit("/");

        cy.findLevelField().should("have.value", "1");

        cy.findExperienceField().type("50");

        cy.findLevelField().should("have.value", "2");
    });

    it("allows numerical characters to be entered in the gold text field", () => {
        cy.visit("/");

        cy.findGoldField().type("123");

        cy.should("have.value", "123");
    });

    it("doesn't allow non-numerical characters to be entered in the gold text field", () => {
        cy.visit("/");

        cy.findGoldField().type("hello");

        cy.should("have.value", "");
    });

    it("allows notes to be entered", () => {
        cy.visit("/");

        cy.findNotesField().type("Loves cold weather");

        cy.should("have.value", "Loves cold weather");
    });

    it("retains the character details when changing the class", () => {
        cy.visit("/");

        cy.findNameField().type("Elsa").should("have.value", "Elsa");
        cy.findExperienceField().type("123").should("have.value", "123");
        cy.findGoldField().type("123").should("have.value", "123");

        cy.selectClass("Spellweaver");

        cy.findNameField().should("have.value", "Elsa");
        cy.findExperienceField().should("have.value", "123");
        cy.findGoldField().should("have.value", "123");
    });

    it("shows the front of character mat", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat front" })
            .parentsUntil("flippy-cardContainer")
            .should("not.have.class", "isActive");
    });

    it("rotates the character mat when clicking on it", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat front" })
            .click()
            .parentsUntil("flippy-cardContainer")
            .should("have.class", "isActive");
    });

    it("shows the personal quest card back when no personal quest has been selected", () => {
        cy.visit("/");

        cy.findDefaultPersonalQuestImage().should("have.attr", "src").should("include", "gh-pq-back");
    });

    it("allows a personal quest to be selected and updates the card image", () => {
        cy.visit("/");

        cy.findPersonalQuestAutocomplete().click();

        cy.findByRole("option", { name: "Augmented Abilities" }).click();

        cy.findPersonalQuestImage("Augmented Abilities").should("have.attr", "src").should("include", "gh-pq-530");

        cy.findPersonalQuestSwitch().should("be.checked");
    });

    it("hides the personal quest when the switch is set to off", () => {
        cy.visit("/");

        cy.findPersonalQuestAutocomplete().click();

        cy.findByRole("option", { name: "Augmented Abilities" }).click();

        cy.findPersonalQuestImage("Augmented Abilities").should("have.attr", "src").should("include", "gh-pq-530");

        cy.findPersonalQuestSwitch().uncheck();

        cy.findDefaultPersonalQuestImage().should("exist");

        cy.findPersonalQuestImage("Augmented Abilities").should("not.exist");
    });

    it("hides the personal quest autocomplete when the switch is set to off", () => {
        cy.visit("/");

        cy.findPersonalQuestSwitch().uncheck();

        cy.findPersonalQuestSwitch().should("not.be.checked");

        cy.findPersonalQuestAutocomplete().should("not.exist");
    });
});
