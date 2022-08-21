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

    it("loads character details from the query string", () => {
        cy.visit(
            "/?character=uDriterisSrisdtcjRrisEriuA2LsKMI2ItX2IsQxHDtUxaDsetifjkuBxcDtT2NsL2Gtg2GsNLxbDtZ2ItLsREOENEJ2C2YsJKtN2UtlxUDsP2MsPM2DsP2DsQtNuF"
        );

        cy.findSelectClassButton().should("have.text", "Spellweaver");
        cy.findNameField().should("have.value", "Elsa");
    });

    it("clears the query string after loading character details from it", () => {
        cy.visit(
            "/?character=uDriterisSrisdtcjRrisEriuA2LsKMI2ItX2IsQxHDtUxaDsetifjkuBxcDtT2NsL2Gtg2GsNLxbDtZ2ItLsREOENEJ2C2YsJKtN2UtlxUDsP2MsPM2DsP2DsQtNuF"
        );

        cy.location("search").should("equal", "");
    });

    it("hides the personal quest by default when loading a character with one set", () => {
        cy.visit(
            "/?character=uDriterisSrisdtcjRrisEriuA2LsKMI2ItX2IsQxHDtUxaDsetifjkuBxcDtT2NsL2Gtg2GsNLxbDtZ2ItLsREOENEJ2C2YsJKtN2UtlxUDsP2MsPM2DsP2DsQtNuF"
        );

        cy.findPersonalQuestSwitch().should("not.be.checked");
    });
});
