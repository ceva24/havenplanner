/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("ability cards tab", () => {
    it("renders a card", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("region", { name: "Level 1 Ability Cards" })
            .findByRole("img", { name: "Trample" })
            .should("have.attr", "src")
            .should("include", "gh-trample");
    });

    it("renders level 1 cards", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("region", { name: "Level 1 Ability Cards" }).findAllByRole("img").should("have.length", 10);
    });

    it("renders level X cards", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("region", { name: "Level X Ability Cards" }).findAllByRole("img").should("have.length", 3);
    });

    it("renders level 2-9 cards", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findByRole("region", { name: "Level 2 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 3 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 4 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 5 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 6 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 7 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 8 Ability Cards" }).findAllByRole("img").should("have.length", 2);
        cy.findByRole("region", { name: "Level 9 Ability Cards" }).findAllByRole("img").should("have.length", 2);
    });

    it("renders active cards as locked by default", () => {
        cy.visit("/");

        cy.findExperienceField().type("500");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").should("have.attr", "aria-checked", "false");
    });

    it("unlocks an active card when clicking on it", () => {
        cy.visit("/");

        cy.findExperienceField().type("500");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").click().should("have.attr", "aria-checked", "true");
    });

    it("unlocks an active card when pressing space", () => {
        cy.visit("/");

        cy.findExperienceField().type("500");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").focus().type(" ").should("have.attr", "aria-checked", "true");
    });

    it("unlocks an active card when pressing enter", () => {
        cy.visit("/");

        cy.findExperienceField().type("500");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").focus().type("{enter}").should("have.attr", "aria-checked", "true");
    });

    it("does not allow the unlocking of an ability card that is a higher level than the character", () => {
        cy.visit("/");

        cy.findExperienceField().type("55");

        cy.selectTab("Ability Cards");

        cy.shouldFindDisabledAbilityCard("Brute Force");
    });

    it("does not allow the unlocking of ability cards when the maximum number have already been unlocked", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Juggernaut").click();
        cy.findActiveAbilityCard("Hook and Chain").click();

        cy.shouldFindDisabledAbilityCard("Brute Force");
    });

    it("does not allow the unlocking of an ability card of the same level as the character when the other card at that level has already been unlocked", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Brute Force").click();

        cy.shouldFindDisabledAbilityCard("Hook and Chain");
    });

    it("allows ability card unlocks to be modified when loading a character", () => {
        cy.visit("/");

        cy.findExperienceField().type("50");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Juggernaut").click().should("have.attr", "aria-checked", "true");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Juggernaut").should("have.attr", "aria-checked", "true");

        cy.findActiveAbilityCard("Juggernaut").click().should("have.attr", "aria-checked", "false");
    });

    it("displays the hand and show hand switch when pressing the create hand button", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findShowHandSwitch().should("be.checked");

        cy.findAddCardButton().should("be.visible");
    });

    it("retains the state of the show hand switch when toggled on", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.selectTab("Profile");

        cy.selectTab("Ability Cards");

        cy.findShowHandSwitch().should("be.checked");
    });

    it("shows the create hand button again when toggling back to the deck and reloading the tab", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findShowHandSwitch().uncheck();

        cy.selectTab("Profile");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().should("be.visible");
    });

    it("shows a dialog when adding a card to the hand", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findShowHandSwitch().should("be.checked");

        cy.findAddCardButton().click();

        cy.findSelectCardDialog().should("be.visible");
    });

    it("shows a dialog when pressing enter to a card to the hand", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findShowHandSwitch().should("be.checked");

        cy.findAddCardButton().focus().type("{enter}");

        cy.findSelectCardDialog().should("be.visible");
    });

    it("shows a dialog when pressing space to a card to the hand", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findShowHandSwitch().should("be.checked");

        cy.findAddCardButton().focus().type(" ");

        cy.findSelectCardDialog().should("be.visible");
    });

    it("hides the select card dialog when clicking on the close button", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findShowHandSwitch().should("be.checked");

        cy.findAddCardButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findByRole("button", { name: "Close" }).click();

        cy.findSelectCardDialog().not("should.be.visible");
    });

    it("only shows level 1 and level X in the select card dialog", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findAddCardButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findByRole("button", { name: "Provoking Roar" }).should("exist");

        cy.findByRole("button", { name: "Skewer" }).should("exist");

        cy.findByRole("button", { name: "Juggernaut" }).should("not.exist");

        cy.findByRole("button", { name: "Fatal Advance" }).should("not.exist");
    });

    it("shows level 2 or higher cards in the select card dialog when they have been unlocked", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Juggernaut").click();

        cy.findCreateHandButton().click();

        cy.findAddCardButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findByRole("button", { name: "Juggernaut" }).should("exist");
    });
});
