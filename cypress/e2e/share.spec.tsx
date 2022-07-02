/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("share link", () => {
    it("shows the share link button", () => {
        cy.visit("/");

        cy.findShareLinkButton().should("be.visible");
    });

    it("shows a dialog when clicking the share link button", () => {
        cy.visit("/");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().should("be.visible");
    });

    it("populates the link field with the shareable link", () => {
        cy.visit("/");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog()
            .findShareLinkTextBox()
            .should(
                "have.value",
                "http://localhost:3000?character=CxCAeyJuIjoiIiwieCI6MCwiZyI6MCwiZCI6IiIsImMiOjB9Aw%3D%3D"
            );
    });

    it("creates a valid shareable link", () => {
        cy.visit("/");

        cy.selectClass("Spellweaver");

        cy.findNameField().type("Elsa");
        cy.findExperienceField().type("240");
        cy.findGoldField().type("100");
        cy.findNotesField().type("Test");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findCharacterDetailsForm().should("be.visible");

        cy.findSelectClassButton().should("have.text", "Spellweaver");
        cy.findNameField().should("have.value", "Elsa");
        cy.findExperienceField().should("have.value", "240");
        cy.findGoldField().should("have.value", "100");
        cy.findNotesField().should("have.value", "Test");
    });

    it("hides the share link dialog when clicking on the background", () => {
        cy.visit("/");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().should("be.visible");

        cy.findAllByRole("presentation").first().click("left");

        cy.findShareLinkDialog().not("should.be.visible");
    });
});
