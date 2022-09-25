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

    it("displays the select card dialog when pressing the create hand button", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");
    });

    it("hides the select card dialog when clicking on the close button", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.clickCloseButton();

        cy.findSelectCardDialog().not("should.be.visible");
    });

    it("shows the hand and show hand switch after closing the select card dialog", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.clickCloseButton();

        cy.findShowHandSwitch().should("be.checked");

        cy.findEditHandButton().should("be.visible");
    });

    it("shows a hand of unselected cards", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findByRole("button", { name: "Close" }).click();

        cy.findAllByRole("img", { name: "Unselected card" }).should("have.length", 10);
    });

    it("retains the state of the show hand switch when toggled on", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.clickCloseButton();

        cy.selectTab("Profile");

        cy.selectTab("Ability Cards");

        cy.findShowHandSwitch().should("be.checked");
    });

    it("shows the create hand button again when toggling back to the deck and reloading the tab", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.clickCloseButton();

        cy.findShowHandSwitch().uncheck();

        cy.selectTab("Profile");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().should("be.visible");
    });

    it("only shows level 1 and level X in the select card dialog", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findByRole("checkbox", { name: "Provoking Roar" }).should("exist");

        cy.findByRole("checkbox", { name: "Skewer" }).should("exist");

        cy.findByRole("checkbox", { name: "Juggernaut" }).should("not.exist");

        cy.findByRole("checkbox", { name: "Fatal Advance" }).should("not.exist");
    });

    it("shows level 2 or higher cards in the select card dialog when they have been unlocked", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Juggernaut").click();

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findByRole("checkbox", { name: "Juggernaut" }).should("exist");
    });

    it("allows ability cards to be added to the hand", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("exist");
    });

    it("allows ability cards to be added to the hand by pressing enter", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").focus().type("{enter}");

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("exist");
    });

    it("allows ability cards to be added to the hand by pressing space", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").focus().type(" ");

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("exist");
    });

    it("allows ability cards to be removed from the hand", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("exist");

        cy.findEditHandButton().click();

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("not.exist");
    });

    it("shows unselected cards equal to the remaining spaces in the hand", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findAllByRole("img", { name: "Unselected card" }).should("have.length", 9);
    });

    it("shows no unselected cards when the hand is filled", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").click();
        cy.findActiveAbilityCard("Eye for an Eye").click();
        cy.findActiveAbilityCard("Sweeping Blow").click();
        cy.findActiveAbilityCard("Provoking Roar").click();
        cy.findActiveAbilityCard("Overwhelming Assault").click();
        cy.findActiveAbilityCard("Grab and Go").click();
        cy.findActiveAbilityCard("Warding Strength").click();
        cy.findActiveAbilityCard("Shield Bash").click();
        cy.findActiveAbilityCard("Leaping Cleave").click();
        cy.findActiveAbilityCard("Spare Dagger").click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Unselected card" }).should("not.exist");
    });
});
