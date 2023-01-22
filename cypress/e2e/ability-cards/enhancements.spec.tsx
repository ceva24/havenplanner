/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("ability cards tab - enhancements", () => {
    it("renders a card", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findByRole("img", { name: "Trample" }).should("have.attr", "src").should("include", "gh-trample");
    });

    it("renders the enhancements autocompletes for a card", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findByRole("region", { name: "Trample Enhancements" }).findAllByRole("combobox").should("have.length", 5);
    });

    it("allows enhancements to be selected", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).click();

        cy.findByRole("option", { name: "POISON" }).click();

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).should("have.value", "POISON");
    });

    it("shows the enhancement icon in the autocomplete drop-down", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).click();

        cy.findByRole("option", { name: "POISON" })
            .find("img")
            .should("have.attr", "src")
            .should("include", "enhancement-icons/gloomhaven/poison");
    });

    it("shows the enhancement icon next to selected enhancements", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).click();

        cy.findByRole("option", { name: "POISON" }).click();

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1)
            .parent()
            .find("img")
            .should("have.attr", "src")
            .should("include", "enhancement-icons/gloomhaven/poison");
    });

    it("updates the ability card image to show the enhanced card when selecting enhancements", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 0).click();
        cy.findByRole("option", { name: "POISON" }).click();

        cy.findEnhancementsAutocomplete("Trample", "PIERCE", 0).click();
        cy.findByRole("option", { name: "+1" }).click();

        cy.findEnhancementsAutocomplete("Trample", "Move", 0).click();
        cy.findByRole("option", { name: "Jump" }).click();

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).click();
        cy.findByRole("option", { name: "Fire" }).click();

        cy.findByRole("img", { name: "Trample" })
            .should("have.attr", "src")
            .should("include", "/gh-trample/poison-plus-one-jump-fire-none");
    });

    it("shows enhanced ability card images in the deck", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 0).click();
        cy.findByRole("option", { name: "POISON" }).click();

        cy.selectTab("Deck");

        cy.findByRole("img", { name: "Trample" })
            .should("have.attr", "src")
            .should("include", "/gh-trample/poison-none-none-none-none");
    });

    it("shows enhanced ability card images in the deck for locked cards", () => {
        cy.visit("/");

        cy.findExperienceField().type("120");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Fatal Advance", "Move", 0).click();
        cy.findByRole("option", { name: "+1" }).click();

        cy.selectTab("Deck");

        cy.findByRole("img", { name: "Fatal Advance" })
            .should("have.attr", "src")
            .should("include", "/gh-fatal-advance/plus-one");
    });

    it("shows enhanced ability card images in the deck for disabled cards", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Fatal Advance", "Move", 0).click();
        cy.findByRole("option", { name: "+1" }).click();

        cy.selectTab("Deck");

        cy.findByRole("img", { name: "Fatal Advance" })
            .should("have.attr", "src")
            .should("include", "/gh-fatal-advance/plus-one");
    });

    it("shows enhanced ability card images in the edit hand dialog", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 0).click();
        cy.findByRole("option", { name: "POISON" }).click();

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findByRole("img", { name: "Trample" })
            .should("have.attr", "src")
            .should("include", "/gh-trample/poison-none-none-none-none");
    });

    it("shows enhanced ability card images in the hand", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 0).click();
        cy.findByRole("option", { name: "POISON" }).click();

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" })
            .should("have.attr", "src")
            .should("include", "/gh-trample/poison-none-none-none-none");
    });
});
