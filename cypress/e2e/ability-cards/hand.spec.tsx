/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("ability cards tab - hand", () => {
    it("shows a hand of unselected cards", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findAllByRole("img", { name: "Unselected card" }).should("have.length", 10);
    });

    it("retains the state of the ability cards tabs", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.selectTab("Profile");

        cy.selectTab("Ability Cards");

        cy.findEditHandButton().should("be.visible");
    });

    it("shows the edit hand dialog when pressing the edit hand button", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");
    });

    it("allows the edit hand dialog to be closed", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

        cy.clickCloseButton();

        cy.findEditHandButton().should("be.visible");
    });

    it("only shows level 1 and level X in the edit hand dialog", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

        cy.findByRole("checkbox", { name: "Provoking Roar" }).should("exist");

        cy.findByRole("checkbox", { name: "Skewer" }).should("exist");

        cy.findByRole("checkbox", { name: "Juggernaut" }).should("not.exist");

        cy.findByRole("checkbox", { name: "Fatal Advance" }).should("not.exist");
    });

    it("shows level 2 or higher cards in the edit hand dialog when they have been unlocked", () => {
        cy.visit("/gloomhaven");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Juggernaut").click();

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

        cy.findByRole("checkbox", { name: "Juggernaut" }).should("exist");
    });

    it("allows ability cards to be added to the hand", () => {
        cy.visit("/gloomhaven");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("exist");
    });

    it("allows ability cards to be added to the hand by pressing enter", () => {
        cy.visit("/gloomhaven");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").focus().type("{enter}");

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("exist");
    });

    it("allows ability cards to be added to the hand by pressing space", () => {
        cy.visit("/gloomhaven");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").focus().type(" ");

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("exist");
    });

    it("allows ability cards to be removed from the hand", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("exist");

        cy.findEditHandButton().click();

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("not.exist");
    });

    it("shows unselected cards equal to the remaining spaces in the hand", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findAllByRole("img", { name: "Unselected card" }).should("have.length", 9);
    });

    it("shows no unselected cards when the hand is filled", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

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

    it("removes a card from the hand when locking it", () => {
        cy.visit("/gloomhaven");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Juggernaut").click();

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

        cy.findActiveAbilityCard("Juggernaut").click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Juggernaut" }).should("exist");

        cy.selectTab("Deck");

        cy.findActiveAbilityCard("Juggernaut").click();

        cy.selectTab("Hand");

        cy.findByRole("img", { name: "Juggernaut" }).should("not.exist");
    });

    it("shows a running counter of the number of cards in hand", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

        cy.contains("0 / 10");

        cy.findActiveAbilityCard("Trample").click();

        cy.contains("1 / 10");
    });

    it("does not allow any more cards to be added to the hand once the hand size has been reached", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findEditHandDialog().should("be.visible");

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

        cy.contains("10 / 10");

        cy.shouldFindDisabledAbilityCard("Skewer");
        cy.shouldFindDisabledAbilityCard("Balanced Measure");
        cy.shouldFindDisabledAbilityCard("Wall of Doom");
    });
});
