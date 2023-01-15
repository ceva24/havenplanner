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
});
