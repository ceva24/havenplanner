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
            .should("have.value", "http://localhost:3000?character=uDriterisSriisEriuA2HsI2GtXxGFtUxTGtTxNFtZ2GtLNuF");
    });

    it("captures the character details in a shareable link", () => {
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

    it("hides the share link dialog when clicking on the close button", () => {
        cy.visit("/");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().should("be.visible");

        cy.findByRole("button", { name: "Close" }).click();

        cy.findShareLinkDialog().not("should.be.visible");
    });

    it("captures the personal quest in a shareable link", () => {
        cy.visit("/");

        cy.findPersonalQuestButton().click();

        cy.findPersonalQuestAutocomplete().click();

        cy.findByRole("option", { name: "Augmented Abilities" }).click();

        cy.findByRole("button", { name: "Close" }).click();

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findPersonalQuestButton().click();

        cy.findPersonalQuestImage("Augmented Abilities").should("have.attr", "src").should("include", "gh-pq-530.png");
    });

    it("captures item data in a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.findItemsAutocomplete().click();

        cy.findByRole("option", { name: "Piercing Bow" }).click();

        cy.findItemsAutocomplete().click();

        cy.findByRole("option", { name: "Eagle Eye Goggles" }).click();

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Items");

        cy.findByRole("img", { name: "Piercing Bow" }).should("be.visible");
        cy.findByRole("img", { name: "Eagle Eye Goggles" }).should("be.visible");
    });
});
