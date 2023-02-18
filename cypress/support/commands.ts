Cypress.Commands.add("findCharacterDetailsForm", () => {
    cy.findByRole("form", {
        name: "Character Details",
    });
});

Cypress.Commands.add("findSelectClassButton", () => {
    cy.findByRole("button", { name: "Class" });
});

Cypress.Commands.add("findNameField", () => {
    cy.findCharacterDetailsForm().findByRole("textbox", { name: "Name" });
});

Cypress.Commands.add("findExperienceField", () => {
    cy.findCharacterDetailsForm().findByRole("textbox", { name: "Experience" });
});

Cypress.Commands.add("findLevelField", () => {
    cy.findCharacterDetailsForm().findByRole("textbox", { name: "Level" });
});

Cypress.Commands.add("findGoldField", () => {
    cy.findCharacterDetailsForm().findByRole("textbox", { name: "Gold" });
});

Cypress.Commands.add("findNotesField", () => {
    cy.findCharacterDetailsForm().findByRole("textbox", { name: "Notes" });
});

Cypress.Commands.add("findShareLinkButton", () => {
    cy.findByRole("button", { name: "Share" });
});

Cypress.Commands.add("findShareLinkDialog", () => {
    cy.findByRole("dialog", { name: "Share" });
});

Cypress.Commands.add("findShareLinkTextBox", () => {
    cy.findShareLinkDialog().findByRole("textbox", { name: "Link" });
});

Cypress.Commands.add("clickCloseButton", () => {
    cy.findByRole("button", { name: "Close" }).click();
});

Cypress.Commands.add("selectClass", (name) => {
    cy.findSelectClassButton().click();

    cy.findByRole("listbox", { name: "Class" }).findByRole("option", { name }).click();
});

Cypress.Commands.add("findPersonalQuestSwitch", () => {
    cy.findByRole("checkbox", { name: "Hide personal quest" });
});

Cypress.Commands.add("findDefaultPersonalQuestImage", () => {
    cy.findByRole("img", { name: "Personal quest" });
});

Cypress.Commands.add("findPersonalQuestImage", (name: string) => {
    cy.findByRole("img", { name: `Personal quest ${name}` });
});

Cypress.Commands.add("findPersonalQuestAutocomplete", () => {
    cy.findByRole("combobox");
});

Cypress.Commands.add("selectTab", (name: string) => {
    cy.findByRole("tab", { name }).click();
});

Cypress.Commands.add("findActiveAbilityCard", (name: string) => {
    cy.findByRole("checkbox", { name });
});

Cypress.Commands.add("shouldFindDisabledAbilityCard", (name: string) => {
    cy.findByRole("img", { name }).parent().parent().should("have.attr", "aria-disabled", "true");
});

Cypress.Commands.add("findEditHandButton", () => {
    cy.findByRole("button", { name: "Edit hand" });
});

Cypress.Commands.add("findEditHandDialog", () => {
    cy.findByRole("dialog", { name: "Select ability cards" });
});

Cypress.Commands.add("findEnhancementsSelect", (cardName: string, name: string, index: number) => {
    cy.findByRole("region", { name: `${cardName} Enhancements` })
        .findAllByRole("button", { name })
        .eq(index);
});

Cypress.Commands.add("findAttackModifierCardWithCount", (name: string, count: number) => {
    cy.findByRole("img", { name: `${name} card` })
        .closest("[id^=attack-modifier-card-details-]")
        .findByText(`${count} x`);
});

Cypress.Commands.add("shouldHavePerkWithCheckboxCount", (name: string, count: number) => {
    cy.findByRole("checkbox", { name })
        .should("exist")
        .parent()
        .parent()
        .findAllByRole("checkbox")
        .should("have.length", count);
});

Cypress.Commands.add("gainPerk", (name: string, checkboxIndex: number) => {
    if (checkboxIndex === 0) {
        cy.findByRole("checkbox", { name }).check();
    } else {
        cy.findByRole("checkbox", { name }).parent().parent().findAllByRole("checkbox").eq(checkboxIndex).check();
    }
});

Cypress.Commands.add("removePerk", (name: string, checkboxIndex: number) => {
    if (checkboxIndex === 0) cy.findByRole("checkbox", { name }).uncheck();
    else {
        cy.findByRole("checkbox", { name })
            .should("exist")
            .parent()
            .parent()
            .findAllByRole("checkbox")
            .eq(checkboxIndex)
            .should("exist")
            .uncheck();
    }
});

Cypress.Commands.add("clickPerkDescription", (name: string) => {
    cy.findByRole("checkbox", { name }).parent().parent().children("label").click();
});

Cypress.Commands.add("gainBattleGoalCheckmark", (battleGoalPerk: number, checkboxIndex: number) => {
    cy.findByRole("region", { name: `Battle Goal Perk ${battleGoalPerk}` })
        .findAllByRole("checkbox")
        .eq(checkboxIndex)
        .check();
});

Cypress.Commands.add("loseBattleGoalCheckmark", (battleGoalPerk: number, checkboxIndex: number) => {
    cy.findByRole("region", { name: `Battle Goal Perk ${battleGoalPerk}` })
        .findAllByRole("checkbox")
        .eq(checkboxIndex)
        .uncheck();
});

Cypress.Commands.add("clickBattleGoalGroupLabel", (battleGoalPerk: number) => {
    cy.findByRole("region", { name: `Battle Goal Perk ${battleGoalPerk}` })
        .children("label")
        .click();
});

Cypress.Commands.add("findItemsAutocomplete", () => {
    cy.findByRole("combobox", { name: "Add item" });
});

Cypress.Commands.add("addItem", (name: string) => {
    cy.findItemsAutocomplete().click();
    cy.findByRole("option", { name }).click();
});

Cypress.Commands.add("findBrowseItemsButton", () => {
    cy.findByRole("button", { name: "Browse Items" });
});

Cypress.Commands.add("findBrowseItemsDialog", () => {
    cy.findByRole("dialog", { name: "Browse items" });
});

Cypress.Commands.add("openSettings", () => {
    cy.findByRole("button", { name: "Settings" }).click();
});

Cypress.Commands.add("findSettingsDrawer", () => {
    cy.findByRole("presentation", { name: "Settings" });
});

Cypress.Commands.add("shouldHaveProsperityLevel", (level: number) => {
    cy.findByRole("slider", { name: "Prosperity" }).should("have.value", level);
});

Cypress.Commands.add("setProsperityLevel", (level: number) => {
    cy.openSettings();

    cy.findByRole("region", { name: "Item Spoilers" }).find("#prosperity-slider").findByText(level).click();

    cy.clickCloseButton();
});
