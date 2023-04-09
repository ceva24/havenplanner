/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("profile tab - character updates", () => {
    it("retains the character details when changing the class", () => {
        cy.visit("/gloomhaven");

        cy.findNameField().type("Elsa").should("have.value", "Elsa");
        cy.findExperienceField().type("123").should("have.value", "123");
        cy.findGoldField().type("123").should("have.value", "123");

        cy.selectClass("Spellweaver");

        cy.findNameField().should("have.value", "Elsa");
        cy.findExperienceField().should("have.value", "123");
        cy.findGoldField().should("have.value", "123");
    });

    it("resets unlocked ability cards when changing the class", () => {
        cy.visit("/gloomhaven");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").click();

        cy.selectTab("Profile");

        cy.selectClass("Spellweaver");
        cy.selectClass("Brute");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").should("have.attr", "aria-checked", "false");
    });

    it("removes an unlocked ability card for a higher level when the character level decreases", () => {
        cy.visit("/gloomhaven");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").click();
        cy.findActiveAbilityCard("Hook and Chain").click();

        cy.selectTab("Profile");

        cy.findExperienceField().clear().type("55");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").should("have.attr", "aria-checked", "true");
        cy.shouldFindDisabledAbilityCard("Hook and Chain");
    });

    it("removes an unlocked ability card for a higher level when the character level decreases", () => {
        cy.visit("/gloomhaven");

        cy.findExperienceField().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").click();
        cy.findActiveAbilityCard("Hook and Chain").click();

        cy.selectTab("Profile");

        cy.findExperienceField().clear().type("55");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").should("have.attr", "aria-checked", "true");

        cy.shouldFindDisabledAbilityCard("Hook and Chain");
    });

    it("removes higher level cards, removes new current level unlocks and then removes recently selected cards exceeding the maximum number of unlocks when decreasing character level by a significant amount", () => {
        cy.visit("/gloomhaven");

        cy.findExperienceField().type("400");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Crippling Offensive").click();
        cy.findActiveAbilityCard("Brute Force").click();
        cy.findActiveAbilityCard("Quietus").click();
        cy.findActiveAbilityCard("Juggernaut").click();
        cy.findActiveAbilityCard("Hook and Chain").click();
        cy.findActiveAbilityCard("Fatal Advance").click();

        cy.selectTab("Profile");

        cy.findExperienceField().clear().type("100");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Brute Force").should("have.attr", "aria-checked", "true");
        cy.findActiveAbilityCard("Juggernaut").should("have.attr", "aria-checked", "true");

        cy.shouldFindDisabledAbilityCard("Crippling Offensive");
        cy.shouldFindDisabledAbilityCard("Quietus");
        cy.shouldFindDisabledAbilityCard("Hook and Chain");
        cy.shouldFindDisabledAbilityCard("Fatal Advance");
    });

    it("resets the hand when changing the class", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findActiveAbilityCard("Trample").click();

        cy.clickCloseButton();

        cy.findByRole("img", { name: "Trample" }).should("exist");

        cy.selectTab("Profile");

        cy.selectClass("Spellweaver");

        cy.selectClass("Brute");

        cy.selectTab("Ability Cards");

        cy.selectTab("Hand");

        cy.findByRole("img", { name: "Trample" }).should("not.exist");
    });

    it("removes higher level cards from the hand when changing level", () => {
        cy.visit("/gloomhaven");

        cy.findExperienceField().type("400");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Fatal Advance").click();
        cy.findActiveAbilityCard("Juggernaut").click();
        cy.findActiveAbilityCard("Hook and Chain").click();
        cy.findActiveAbilityCard("Brute Force").click();
        cy.findActiveAbilityCard("Quietus").click();
        cy.findActiveAbilityCard("Crippling Offensive").click();

        cy.selectTab("Hand");

        cy.findEditHandButton().click();

        cy.findActiveAbilityCard("Trample").click();
        cy.findActiveAbilityCard("Skewer").click();

        cy.findActiveAbilityCard("Fatal Advance").click();
        cy.findActiveAbilityCard("Juggernaut").click();
        cy.findActiveAbilityCard("Hook and Chain").click();
        cy.findActiveAbilityCard("Brute Force").click();
        cy.findActiveAbilityCard("Quietus").click();
        cy.findActiveAbilityCard("Crippling Offensive").click();

        cy.clickCloseButton();

        cy.selectTab("Profile");

        cy.findExperienceField().clear();

        cy.selectTab("Ability Cards");

        cy.findByRole("img", { name: "Trample" }).should("exist");
        cy.findByRole("img", { name: "Skewer" }).should("exist");

        cy.findByRole("img", { name: "Fatal Advance" }).should("not.exist");
        cy.findByRole("img", { name: "Juggernaut" }).should("not.exist");
        cy.findByRole("img", { name: "Hook and Chain" }).should("not.exist");
        cy.findByRole("img", { name: "Brute Force" }).should("not.exist");
        cy.findByRole("img", { name: "Quietus" }).should("not.exist");
        cy.findByRole("img", { name: "Crippling Offensive" }).should("not.exist");
    });

    it("resets gained perks when changing the class", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Perks");

        cy.gainPerk("Remove two {-1} cards", 0);

        cy.findByRole("checkbox", { name: "Remove two {-1} cards" }).should("be.checked");

        cy.selectTab("Profile");

        cy.selectClass("Spellweaver");

        cy.selectClass("Brute");

        cy.selectTab("Perks");

        cy.findByRole("checkbox", { name: "Remove two {-1} cards" }).should("not.be.checked");
    });

    it("resets gained battle goals when changing the class", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Perks");

        cy.gainBattleGoalCheckmark(1, 0);

        cy.findByRole("region", { name: "Battle Goal Perk 1" }).findAllByRole("checkbox").eq(0).should("be.checked");

        cy.selectTab("Profile");

        cy.selectClass("Spellweaver");

        cy.selectClass("Brute");

        cy.selectTab("Perks");

        cy.findByRole("region", { name: "Battle Goal Perk 1" })
            .findAllByRole("checkbox")
            .eq(0)
            .should("not.be.checked");
    });

    it("resets gained enhancements when changing the class", () => {
        cy.visit("/gloomhaven");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsSelect("Trample", "Attack", 1).click();

        cy.findByRole("option", { name: "POISON" }).click();

        cy.findEnhancementsSelect("Trample", "Attack", 1).should("have.text", "POISON");

        cy.selectTab("Profile");

        cy.selectClass("Spellweaver");

        cy.selectClass("Brute");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsSelect("Trample", "Attack", 1).should("not.have.text");
    });
});
