/* eslint-disable import/no-unassigned-import */
import "@testing-library/cypress/add-commands";
import "@/support/commands";

describe("perks tab", () => {
    it("displays the base attack modifier deck", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.findAttackModifierCardWithCount("2x", 1).should("exist");
        cy.findAttackModifierCardWithCount("+2", 1).should("exist");
        cy.findAttackModifierCardWithCount("+1", 5).should("exist");
        cy.findAttackModifierCardWithCount("+0", 6).should("exist");
        cy.findAttackModifierCardWithCount("-1", 5).should("exist");
        cy.findAttackModifierCardWithCount("-2", 1).should("exist");
        cy.findAttackModifierCardWithCount("Miss", 1).should("exist");
    });

    it("displays the perks", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.shouldHavePerkWithCheckboxCount("Remove two {-1} cards", 1);
        cy.shouldHavePerkWithCheckboxCount("Replace one {-1} card with one {+1} card", 1);
        cy.shouldHavePerkWithCheckboxCount("Add two {+1} cards", 2);
        cy.shouldHavePerkWithCheckboxCount("Add one {+3} card", 1);
        cy.shouldHavePerkWithCheckboxCount("Add three {chain} PUSH {push} 1 cards", 2);
        cy.shouldHavePerkWithCheckboxCount("Add two {chain} PIERCE {pierce} 3 cards", 1);
        cy.shouldHavePerkWithCheckboxCount("Add one {chain} STUN {stun} card", 2);
        cy.shouldHavePerkWithCheckboxCount(
            "Add one {chain} DISARM {disarm} card and one {chain} MUDDLE {muddle} card",
            1
        );
        cy.shouldHavePerkWithCheckboxCount("Add one {chain} ADD TARGET {target} card", 2);
        cy.shouldHavePerkWithCheckboxCount("Add one {+1} Shield {shield} 1, self card", 1);
        cy.shouldHavePerkWithCheckboxCount("Ignore negative item effects and add one {+1} card", 1);
    });

    it("allows a perk to be gained and updates the attack modifier count", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Remove two {-1} cards", 0);

        cy.findAttackModifierCardWithCount("-1", 3).should("exist");
    });

    it("allows perks to be removed and updates the attack modifier count", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Remove two {-1} cards", 0);

        cy.removePerk("Remove two {-1} cards", 0);

        cy.findAttackModifierCardWithCount("-1", 5).should("exist");
    });

    it("retains gained perks when moving between tabs", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Remove two {-1} cards", 0);

        cy.selectTab("Profile");

        cy.selectTab("Perks");

        cy.findByRole("checkbox", { name: "Remove two {-1} cards" }).should("be.checked");
    });

    it("allows the second checkbox of a perk to be gained", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Add two {+1} cards", 0);
        cy.gainPerk("Add two {+1} cards", 1);

        cy.findAttackModifierCardWithCount("+1", 9).should("exist");
    });

    it("shows a new attack modifier card when gaining a perk that adds it", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Add one {+3} card", 0);

        cy.findAttackModifierCardWithCount("+3", 1).should("exist");
    });

    it("removes an attack modifier card when gaining a perk that removes the last copy of it", () => {
        cy.visit("/");

        cy.selectClass("Tinkerer");

        cy.selectTab("Perks");

        cy.gainPerk("Replace one {-2} card with one {+0} card", 0);

        cy.findByRole("img", { name: "-2 card" }).should("not.exist");
    });

    it("orders class attack modifier cards in the order that they first appear in the perks", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Add one {chain} DISARM {disarm} card and one {chain} MUDDLE {muddle} card", 0);
        cy.gainPerk("Add two {chain} PIERCE {pierce} 3 cards", 0);

        cy.findAllByRole("img").eq(-3).should("have.attr", "alt", "chain pierce 3 card");
        cy.findAllByRole("img").eq(-2).should("have.attr", "alt", "chain disarm card");
        cy.findAllByRole("img").eq(-1).should("have.attr", "alt", "chain muddle card");
    });

    it("displays perk icons", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.findByRole("img", { name: "shield icon" }).should("be.visible");
    });

    it("gains a perk when clicking on the perk description", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.clickPerkDescription("Remove two {-1} cards");

        cy.findByRole("checkbox", { name: "Remove two {-1} cards" }).should("be.checked");
    });

    it("gains the second perk when clicking on the perk description", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Add two {+1} cards", 0);

        cy.findByRole("checkbox", { name: "Add two {+1} cards" }).should("be.checked");
        cy.findByRole("checkbox", { name: "Add two {+1} cards 2" }).should("not.be.checked");

        cy.clickPerkDescription("Add two {+1} cards");

        cy.findByRole("checkbox", { name: "Add two {+1} cards" }).should("be.checked");
        cy.findByRole("checkbox", { name: "Add two {+1} cards 2" }).should("be.checked");
    });

    it("gains the next ungained perk when clicking on the perk description", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Add two {+1} cards", 1);

        cy.findByRole("checkbox", { name: "Add two {+1} cards" }).should("not.be.checked");
        cy.findByRole("checkbox", { name: "Add two {+1} cards 2" }).should("be.checked");

        cy.clickPerkDescription("Add two {+1} cards");

        cy.findByRole("checkbox", { name: "Add two {+1} cards" }).should("be.checked");
        cy.findByRole("checkbox", { name: "Add two {+1} cards 2" }).should("be.checked");
    });

    it("removes all perks of that type when clicking on the perk description for a perk that is fully gained", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainPerk("Add two {+1} cards", 0);
        cy.gainPerk("Add two {+1} cards", 1);

        cy.clickPerkDescription("Add two {+1} cards");

        cy.findByRole("checkbox", { name: "Add two {+1} cards" }).should("not.be.checked");
        cy.findByRole("checkbox", { name: "Add two {+1} cards 2" }).should("not.be.checked");
    });

    it("shows the battle goal perks", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.findByRole("region", { name: "Battle Goal Progress" }).findAllByRole("checkbox").should("have.length", 18);
    });

    it("allows battle goals perks to be gained", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainBattleGoalCheckmark(1, 0);

        cy.findByRole("region", { name: "Battle Goal Perk 1" }).findAllByRole("checkbox").eq(0).should("be.checked");
    });

    it("allows battle goals perks to be lost", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainBattleGoalCheckmark(1, 0);

        cy.findByRole("region", { name: "Battle Goal Perk 1" }).findAllByRole("checkbox").eq(0).should("be.checked");

        cy.loseBattleGoalCheckmark(1, 0);

        cy.findByRole("region", { name: "Battle Goal Perk 1" })
            .findAllByRole("checkbox")
            .eq(0)
            .should("not.be.checked");
    });

    it("gains a battle goal checkmark when clicking on the label for a group", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.clickBattleGoalGroupLabel(1);

        cy.findByRole("checkbox", { name: "Battle Goal Perk 1 Checkmark" }).should("be.checked");
        cy.findByRole("checkbox", { name: "Battle Goal Perk 1 Checkmark 2" }).should("not.be.checked");
        cy.findByRole("checkbox", { name: "Battle Goal Perk 1 Checkmark 3" }).should("not.be.checked");
    });

    it("gains the next ungained battle goal checkmark when clicking on the label for a group", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainBattleGoalCheckmark(1, 0);
        cy.gainBattleGoalCheckmark(1, 2);

        cy.clickBattleGoalGroupLabel(1);

        cy.findByRole("region", { name: "Battle Goal Perk 1" }).findAllByRole("checkbox").should("be.checked");
    });

    it("removes all checkmarks from a group when clicking on the label for a group that is complete", () => {
        cy.visit("/");

        cy.selectTab("Perks");

        cy.gainBattleGoalCheckmark(1, 0);
        cy.gainBattleGoalCheckmark(1, 1);
        cy.gainBattleGoalCheckmark(1, 2);

        cy.clickBattleGoalGroupLabel(1);

        cy.findByRole("region", { name: "Battle Goal Perk 1" }).findAllByRole("checkbox").should("not.be.checked");
    });
});
