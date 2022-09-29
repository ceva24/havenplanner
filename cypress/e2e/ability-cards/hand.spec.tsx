/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("ability cards tab - hand", () => {
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

        cy.clickCloseButton();

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

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findAllByRole("img", { name: "Unselected card" }).should("have.length", 9);
    });

    it("shows no unselected cards when the hand is filled", () => {
        cy.visit("/");

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

    it("removes a card from the hand when locking it", () => {
        cy.visit("/");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Juggernaut").click();

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findActiveAbilityCard("Juggernaut").click();

        cy.clickCloseButton();

        cy.findShowHandSwitch().should("be.checked");

        cy.findByRole("img", { name: "Juggernaut" }).should("exist");

        cy.findShowHandSwitch().uncheck();

        cy.findActiveAbilityCard("Juggernaut").click();

        cy.findShowHandSwitch().check();

        cy.findByRole("img", { name: "Juggernaut" }).should("not.exist");
    });

    it("shows a running counter of the number of cards in hand", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.findCreateHandButton().click();

        cy.findSelectCardDialog().should("be.visible");

        cy.findByText("0 / 10").should("exist");

        cy.findActiveAbilityCard("Trample").click();

        cy.findByText("1 / 10").should("exist");
    });

    it("does not allow any more cards to be added to the hand once the hand size has been reached", () => {
        cy.visit("/");

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

        cy.findByText("10 / 10").should("exist");

        cy.shouldFindDisabledAbilityCard("Skewer");
        cy.shouldFindDisabledAbilityCard("Balanced Measure");
        cy.shouldFindDisabledAbilityCard("Wall of Doom");
    });
});
