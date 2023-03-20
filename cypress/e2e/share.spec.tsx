/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("share", () => {
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

    it("hides the share link dialog when clicking on the close button", () => {
        cy.visit("/");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().should("be.visible");

        cy.clickCloseButton();

        cy.findShareLinkDialog().not("should.be.visible");
    });

    it("loads the default character when character data is invalid", () => {
        cy.visit("/?character=abc");

        cy.findSelectClassButton().should("have.text", "Brute");
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

    it("captures the personal quest in a shareable link", () => {
        cy.visit("/");

        cy.findPersonalQuestSwitch().check();

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

        cy.addItem("Piercing Bow 009");
        cy.addItem("Eagle Eye Goggles 006");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Items");

        cy.findByRole("img", { name: "Piercing Bow" }).should("be.visible");
        cy.findByRole("img", { name: "Eagle Eye Goggles" }).should("be.visible");
    });

    it("retains item ordering when loading data from a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.addItem("Piercing Bow 009");
        cy.addItem("Eagle Eye Goggles 006");

        cy.findByRole("region", { name: "Item Grid" })
            .findAllByRole("img")
            .eq(0)
            .should("have.attr", "alt", "Piercing Bow");
        cy.findByRole("region", { name: "Item Grid" })
            .findAllByRole("img")
            .eq(1)
            .should("have.attr", "alt", "Eagle Eye Goggles");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Items");

        cy.findByRole("region", { name: "Item Grid" })
            .findAllByRole("img")
            .eq(0)
            .should("have.attr", "alt", "Piercing Bow");
        cy.findByRole("region", { name: "Item Grid" })
            .findAllByRole("img")
            .eq(1)
            .should("have.attr", "alt", "Eagle Eye Goggles");
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

    it("captures gained enhancements in a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsSelect("Trample", "Attack", 1).click();
        cy.findByRole("option", { name: "POISON" }).click();

        cy.findEnhancementsSelect("Trample", "Attack", 1).should("have.text", "POISON");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsSelect("Trample", "Attack", 1).should("have.text", "POISON");
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

    it("shows the load character dialog when loading a character with spoilers", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.addItem("Stun Powder 021");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findLoadCharacterDialog().should("exist");
    });

    it("shows the prosperity and item groups in the load character dialog when loading a character with item spoilers", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.setSpoilerActive("Random Item Designs");

        cy.addItem("Stun Powder 021");

        cy.addItem("Circlet of Elements 075");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findLoadCharacterDialog().findByText("Prosperity 2").should("exist");

        cy.findLoadCharacterDialog().findByText("Random Item Designs").should("exist");
    });

    it("shows the class in the load character dialog when loading a character with class spoilers", () => {
        cy.visit("/");

        cy.spoilAll();

        cy.selectClass("Nightshroud");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findLoadCharacterDialog().findByText("Eclipse").should("exist");
    });

    it("loads the character when confirming the load character dialog", () => {
        cy.visit("/");

        cy.selectClass("Spellweaver");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.addItem("Stun Powder 021");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.confirmLoadCharacter();

        cy.findSelectClassButton().should("have.text", "Spellweaver");
    });

    it("does not load the character when cancelling the load character dialog", () => {
        cy.visit("/");

        cy.selectClass("Spellweaver");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.addItem("Stun Powder 021");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findLoadCharacterDialog().findByRole("button", { name: "Cancel" }).click();

        cy.findSelectClassButton().should("not.have.text", "Spellweaver");

        cy.findSelectClassButton().should("have.text", "Brute");
    });

    it("retains the character data in the url when cancelling the load character dialog", () => {
        cy.visit("/");

        cy.selectClass("Spellweaver");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.addItem("Stun Powder 021");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.findLoadCharacterDialog().findByRole("button", { name: "Cancel" }).click();

        cy.location("search").should("match", /character=\w{10,}/);
    });

    it("captures higher prosperity item data in a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.addItem("Stun Powder 021");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.confirmLoadCharacter();

        cy.selectTab("Items");

        cy.findByRole("img", { name: "Stun Powder" }).should("be.visible");
    });

    it("sets the prosperity level spoiler setting to the level of the character's highest prosperity item", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setProsperityLevel(2);

        cy.addItem("Stun Powder 021");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.confirmLoadCharacter();

        cy.openSettings();

        cy.shouldHaveProsperityLevel(2);
    });

    it("captures item group item data in a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setSpoilerActive("Random Item Designs");

        cy.addItem("Circlet of Elements 075");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.confirmLoadCharacter();

        cy.selectTab("Items");

        cy.findByRole("img", { name: "Circlet of Elements" }).should("be.visible");
    });

    it("sets the active item groups based on the character's items", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setSpoilerActive("Random Item Designs");

        cy.addItem("Circlet of Elements 075");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.confirmLoadCharacter();

        cy.openSettings();

        cy.shouldHaveActiveSpoiler("Random Item Designs");
    });

    it("a loaded active item group can be toggled", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setSpoilerActive("Random Item Designs");

        cy.addItem("Circlet of Elements 075");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.confirmLoadCharacter();

        cy.openSettings();

        cy.shouldHaveActiveSpoiler("Random Item Designs");

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Random Item Designs" })
            .uncheck();

        cy.findByRole("region", { name: "Item Spoilers" })
            .findByRole("checkbox", { name: "Random Item Designs" })
            .should("not.be.checked");
    });

    it("captures locked class data in a shareable link", () => {
        cy.visit("/");

        cy.spoilAll();

        cy.selectClass("Nightshroud");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.confirmLoadCharacter();

        cy.findByRole("button", { name: "Class" }).should("have.text", "Nightshroud");
    });

    it("sets the unlocked class based on the character's class", () => {
        cy.visit("/");

        cy.spoilAll();

        cy.selectClass("Nightshroud");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.confirmLoadCharacter();

        cy.openSettings();

        cy.shouldHaveActiveSpoiler("Eclipse");
    });

    it("a loaded class can be toggled", () => {
        cy.visit("/");

        cy.spoilAll();

        cy.selectClass("Nightshroud");

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.confirmLoadCharacter();

        cy.openSettings();

        cy.shouldHaveActiveSpoiler("Eclipse");

        cy.findByRole("region", { name: "Class Spoilers" }).findByRole("checkbox", { name: "Eclipse" }).uncheck();

        cy.findByRole("region", { name: "Class Spoilers" })
            .findByRole("checkbox", { name: "Eclipse" })
            .should("not.be.checked");
    });

    it("captures item alternative image status in a shareable link", () => {
        cy.visit("/");

        cy.selectTab("Items");

        cy.setSpoilerActive("Random Item Designs");

        cy.addItem("Circlet of Elements 075");

        cy.findByRole("button", { name: "Toggle Alternative Image for Circlet of Elements" }).click();

        cy.findShareLinkButton().click();

        cy.findShareLinkDialog().findShareLinkTextBox().should("not.have.value", "").invoke("val").then(cy.visit);

        cy.confirmLoadCharacter();

        cy.selectTab("Items");

        cy.findByRole("img", { name: "Circlet of Elements" }).should("be.visible");

        cy.findByRole("img", { name: "Circlet of Elements" })
            .should("have.attr", "src")
            .should("include", "gh-075a-circlet-of-elements");
    });
});
