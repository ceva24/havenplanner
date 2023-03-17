/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("profile tab", () => {
    it("shows a list of classes in the class select list", () => {
        cy.visit("/");

        cy.findSelectClassButton().click();

        cy.findByRole("listbox", { name: "Class" }).findAllByRole("option").should("have.length", 7);
    });

    it("shows the character details", () => {
        cy.visit("/");

        cy.findCharacterDetailsForm().should("be.visible");
    });

    it("has the first class selected on page load", () => {
        cy.visit("/");

        cy.findByRole("button", { name: "Class" }).should("have.text", "Brute");
    });

    it("allows a name to be entered", () => {
        cy.visit("/");

        cy.findNameField().type("Elsa");

        cy.should("have.value", "Elsa");
    });

    it("shows the class icon in the class select", () => {
        cy.visit("/");

        cy.findCharacterDetailsForm().findSelectClassButton().click();

        cy.findByRole("option", { name: "Brute" })
            .find("img")
            .should("have.attr", "src")
            .should("include", "character-icons/gloomhaven/gh-brute");
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
            .closest(".flippy-cardContainer")
            .should("have.class", "isActive");
    });

    it("rotates the character mat when pressing space", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat front" })
            .closest(".flippy-container")
            .focus()
            .type(" ")
            .find(".flippy-cardContainer")
            .should("have.class", "isActive");
    });

    it("rotates the character mat when pressing enter", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat front" })
            .closest(".flippy-container")
            .focus()
            .type("{enter}")
            .find(".flippy-cardContainer")
            .should("have.class", "isActive");
    });

    it("hides the character mat and shows the personal quest when checking the personal quest switch", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat front" }).should("exist");

        cy.findPersonalQuestAutocomplete().should("not.exist");

        cy.findPersonalQuestSwitch().check();

        cy.findByRole("img", { name: "Character mat front" }).should("not.exist");

        cy.findPersonalQuestAutocomplete().should("exist");
    });

    it("shows the personal quest card back when no personal quest has been selected", () => {
        cy.visit("/");

        cy.findPersonalQuestSwitch().check();

        cy.findDefaultPersonalQuestImage().should("have.attr", "src").should("include", "gh-pq-back");
    });

    it("allows a personal quest to be selected and updates the card image", () => {
        cy.visit("/");

        cy.findPersonalQuestSwitch().check();

        cy.findPersonalQuestAutocomplete().click();

        cy.findByRole("option", { name: "Augmented Abilities" }).click();

        cy.findPersonalQuestImage("Augmented Abilities").should("have.attr", "src").should("include", "gh-pq-530");
    });
});
