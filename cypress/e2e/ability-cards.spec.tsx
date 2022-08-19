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

        cy.findExperienceField().type("50");

        cy.selectTab("Ability Cards");

        cy.findActiveAbilityCard("Juggernaut").click();

        cy.shouldFindDisabledAbilityCard("Fatal Advance");
    });
});
