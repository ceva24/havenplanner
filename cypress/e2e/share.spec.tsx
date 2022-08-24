/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("header", () => {
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
                "http://localhost:3000?character=uDriterisSriisEriuA2HsI2GtXxGFtUxTGtT2HsJ2GtZ2GtLN2HtlxHEuF"
            );
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

        cy.findPersonalQuestAutocomplete().click();

        cy.findByRole("option", { name: "Augmented Abilities" }).click();

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findPersonalQuestSwitch().check();

        cy.findPersonalQuestImage("Augmented Abilities").should("exist");
    });

    it("captures item data in a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Piercing Bow");
        cy.addItem("Eagle Eye Goggles");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Items");

        cy.findByRole("img", { name: "Piercing Bow" }).should("be.visible");
        cy.findByRole("img", { name: "Eagle Eye Goggles" }).should("be.visible");
    });

    it("captures unlocked ability card data in a shareable link", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").click();
        cy.findActiveAbilityCard("Brute Force").click();

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").should("have.attr", "aria-checked", "true");
        cy.findActiveAbilityCard("Brute Force").should("have.attr", "aria-checked", "true");
    });
});
