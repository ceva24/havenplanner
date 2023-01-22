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
            .should("not.have.value", "")
            .invoke("val")
            .should("match", /http:\/\/localhost:3000\?character=\w{10,}/);
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

        cy.clickCloseButton();

        cy.findShareLinkDialog().not("should.be.visible");
    });

    it("shows the personal quest switch when loading a character with a personal quest", () => {
        cy.visit("/");

        cy.findPersonalQuestAutocomplete().click();

        cy.findByRole("option", { name: "Augmented Abilities" }).click();

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findPersonalQuestSwitch().should("exist");
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

    it("does not show the personal quest switch when loading a character without a personal quest", () => {
        cy.visit("/");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findPersonalQuestSwitch().should("not.exist");
    });

    it("hides the personal quest by default when loading a character with one set", () => {
        cy.visit("/");

        cy.findPersonalQuestAutocomplete().click();

        cy.findByRole("option", { name: "Augmented Abilities" }).click();

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findDefaultPersonalQuestImage().should("exist");
    });

    it("hides the personal quest when the switch is set to off", () => {
        cy.visit("/");

        cy.findPersonalQuestAutocomplete().click();

        cy.findByRole("option", { name: "Augmented Abilities" }).click();

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findDefaultPersonalQuestImage().should("exist");

        cy.findPersonalQuestImage("Augmented Abilities").should("not.exist");

        cy.findPersonalQuestSwitch().check();

        cy.findPersonalQuestImage("Augmented Abilities").should("exist");
    });

    it("hides the personal quest autocomplete when the switch is set to off", () => {
        cy.visit("/");

        cy.findPersonalQuestAutocomplete().click();

        cy.findByRole("option", { name: "Augmented Abilities" }).click();

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findPersonalQuestSwitch().should("not.be.checked");

        cy.findPersonalQuestAutocomplete().should("not.exist");
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

    it("captures the hand data in a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findActiveAbilityCard("Trample").click();
        cy.findActiveAbilityCard("Skewer").click();

        cy.clickCloseButton();

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findByRole("img", { name: "Trample" }).should("exist");
        cy.findByRole("img", { name: "Skewer" }).should("exist");

        cy.findEditHandButton().click();

        cy.findActiveAbilityCard("Trample").should("have.attr", "aria-checked", "true");
        cy.findActiveAbilityCard("Skewer").should("have.attr", "aria-checked", "true");
    });

    it.only("captures gained enhancements in a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).click();
        cy.findByRole("option", { name: "POISON" }).click();

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).should("have.value", "POISON");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).should("have.value", "POISON");
    });

    it("captures gained perks in a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Remove two {-1} cards", 0);
        cy.gainPerk("Add two {+1} cards", 0);
        cy.gainPerk("Add three {chain} PUSH {push} 1 cards", 1);
        cy.gainPerk("Add one {chain} STUN {stun} card", 0);
        cy.gainPerk("Add one {chain} STUN {stun} card", 1);

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Perks");

        cy.findByRole("checkbox", { name: "Remove two {-1} cards" }).should("be.checked");
        cy.findByRole("checkbox", { name: "Add two {+1} cards" }).should("be.checked");
        cy.findByRole("checkbox", { name: "Add three {chain} PUSH {push} 1 cards 2" }).should("be.checked");
        cy.findByRole("checkbox", { name: "Add one {chain} STUN {stun} card" }).should("be.checked");
        cy.findByRole("checkbox", { name: "Add one {chain} STUN {stun} card 2" }).should("be.checked");
    });

    it("allows gained perks to be modified when loading a character", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Add two {+1} cards", 1);

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Perks");

        cy.clickPerkDescription("Add two {+1} cards");
        cy.clickPerkDescription("Add two {+1} cards");

        cy.findByRole("checkbox", { name: "Add two {+1} cards" }).should("not.be.checked");
        cy.findByRole("checkbox", { name: "Add two {+1} cards 2" }).should("not.be.checked");
    });

    it("captures battle goal progress in a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainBattleGoalCheckmark(1, 0);
        cy.gainBattleGoalCheckmark(1, 1);
        cy.gainBattleGoalCheckmark(1, 2);

        cy.gainBattleGoalCheckmark(2, 0);

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Perks");

        cy.findByRole("region", { name: "Battle Goal Perk 1" }).findAllByRole("checkbox").should("be.checked");

        cy.findByRole("checkbox", { name: "Battle Goal Perk 2 Checkmark" }).should("be.checked");
        cy.findByRole("checkbox", { name: "Battle Goal Perk 2 Checkmark 2" }).should("not.be.checked");
        cy.findByRole("checkbox", { name: "Battle Goal Perk 2 Checkmark 3" }).should("not.be.checked");
    });

    it("allows battle goal progress to be modified when loading a character", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainBattleGoalCheckmark(1, 0);
        cy.gainBattleGoalCheckmark(1, 1);
        cy.gainBattleGoalCheckmark(1, 2);

        cy.gainBattleGoalCheckmark(2, 0);

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Perks");

        cy.clickBattleGoalGroupLabel(1);
        cy.loseBattleGoalCheckmark(2, 0);

        cy.findByRole("region", { name: "Battle Goal Progress" }).findAllByRole("checkbox").should("not.be.checked");
    });
});
