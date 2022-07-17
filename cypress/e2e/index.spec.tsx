/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("index page", () => {
    it("shows the profile tab content by default", () => {
        cy.visit("/");

        cy.findCharacterDetailsForm().should("be.visible");
    });

    it("sets the page title", () => {
        cy.visit("/");

        cy.title().should("equal", "Gloomhaven Character Planner");
    });

    it("renders the header", () => {
        cy.visit("/");

        cy.get("header").should("exist");
    });
    it("renders the page content in the main region", () => {
        cy.visit("/");

        cy.get("main").findCharacterDetailsForm().should("exist");
    });

    it("renders the footer", () => {
        cy.visit("/");

        cy.get("footer").should("exist");
    });

    it("loads character details from the query string", () => {
        cy.visit("/?character=GzUA%2BI3UYs0Z7oTgttSXH85bFZOCWMyCWCw64JDTb6EEYIEn1MoD9lHonqMwMp7FNWkxjTAsdlv%2F");

        cy.findSelectClassButton().should("have.text", "Spellweaver");
        cy.findNameField().should("have.value", "Test Character");
    });

    it("clears the query string after loading character details from it", () => {
        cy.visit("/?character=GzUA%2BI3UYs0Z7oTgttSXH85bFZOCWMyCWCw64JDTb6EEYIEn1MoD9lHonqMwMp7FNWkxjTAsdlv%2F");

        cy.location("search").should("equal", "");
    });
});
