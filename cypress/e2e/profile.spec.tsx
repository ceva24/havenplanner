/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

const characterClasses = ["Brute", "Scoundrel", "Spellweaver", "Tinkerer", "Mindthief", "Cragheart"];

describe("profile tab", () => {
    it("shows a list of classes in the class select list", () => {
        cy.visit("/");

        cy.findSelectClassButton().click();

        cy.findByRole("listbox", { name: "Class" }).findAllByRole("option").should("have.length", 6);

        cy.findByRole("listbox", { name: "Class" })
            .findAllByRole("option")
            .each((characterClass, index) => {
                cy.wrap(characterClass).should("have.text", characterClasses[index]);
            });
    });

    it("shows the character details", () => {
        cy.visit("/");

        cy.findCharacterDetailsForm().should("be.visible");
    });

    it("has the first class selected on page load", () => {
        cy.visit("/");

        cy.findByRole("button", { name: "Class" }).should("have.text", characterClasses[0]);
    });

    it("allows a name to be entered", () => {
        cy.visit("/");

        cy.findNameField().type("Elsa");

        cy.should("have.value", "Elsa");
    });

    it("shows the class icon", () => {
        cy.visit("/");

        cy.findCharacterDetailsForm().findByRole("img", { name: "Class icon" }).should("be.visible");
    });

    it("allows numerical characters to be entered in the experience text field", () => {
        cy.visit("/");

        cy.findExperienceField().type("123");

        cy.should("have.value", "123");
    });

    it("doesn't allow non-numerical characters to be entered in the experience text field", () => {
        cy.visit("/");

        cy.findExperienceField().type("hello");

        cy.should("have.value", "");
    });

    it("changes the level when changing the experience value", () => {
        cy.visit("/");

        cy.findLevelField().should("have.value", "1");

        cy.findExperienceField().type("50");

        cy.findLevelField().should("have.value", "2");
    });

    it("allows numerical characters to be entered in the gold text field", () => {
        cy.visit("/");

        cy.findGoldField().type("123");

        cy.should("have.value", "123");
    });

    it("doesn't allow non-numerical characters to be entered in the gold text field", () => {
        cy.visit("/");

        cy.findGoldField().type("hello");

        cy.should("have.value", "");
    });

    it("allows notes to be entered", () => {
        cy.visit("/");

        cy.findNotesField().type("Loves cold weather");

        cy.should("have.value", "Loves cold weather");
    });

    it("retains the character details when changing the class", () => {
        cy.visit("/");

        cy.findNameField().type("Elsa").should("have.value", "Elsa");
        cy.findExperienceField().type("123").should("have.value", "123");
        cy.findGoldField().type("123").should("have.value", "123");

        cy.selectClass("Spellweaver");

        cy.findNameField().should("have.value", "Elsa");
        cy.findExperienceField().should("have.value", "123");
        cy.findGoldField().should("have.value", "123");
    });

    it("shows the front of character mat", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat front" })
            .parentsUntil("flippy-cardContainer")
            .should("not.have.class", "isActive");
    });

    it("rotates the character mat when clicking on it", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat front" })
            .click()
            .closest(".flippy-cardContainer")
            .should("have.class", "isActive");
    });

    it("rotates the character mat when pressing space", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat front" })
            .closest(".flippy-container")
            .focus()
            .type(" ")
            .find(".flippy-cardContainer")
            .should("have.class", "isActive");
    });

    it("rotates the character mat when pressing enter", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat front" })
            .closest(".flippy-container")
            .focus()
            .type("{enter}")
            .find(".flippy-cardContainer")
            .should("have.class", "isActive");
    });

    it("shows the personal quest card back when no personal quest has been selected", () => {
        cy.visit("/");

        cy.findDefaultPersonalQuestImage().should("have.attr", "src").should("include", "gh-pq-back");
    });

    it("allows a personal quest to be selected and updates the card image", () => {
        cy.visit("/");

        cy.findPersonalQuestAutocomplete().click();

        cy.findByRole("option", { name: "Augmented Abilities" }).click();

        cy.findPersonalQuestImage("Augmented Abilities").should("have.attr", "src").should("include", "gh-pq-530");
    });

    it("resets unlocked ability cards when changing the class", () => {
        cy.visit("/");

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
        cy.visit("/");

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
        cy.visit("/");

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
        cy.visit("/");

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
        cy.visit("/");

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
        cy.visit("/");

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
        cy.visit("/");

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
        cy.visit("/");

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
        cy.visit("/");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).click();

        cy.findByRole("option", { name: "POISON" }).click();

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).should("have.value", "POISON");

        cy.selectTab("Profile");

        cy.selectClass("Spellweaver");

        cy.selectClass("Brute");

        cy.selectTab("Ability Cards");

        cy.selectTab("Enhancements");

        cy.findEnhancementsAutocomplete("Trample", "Attack", 1).should("have.value", "");
    });
});
