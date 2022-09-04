Cypress.Commands.add("findCharacterDetailsForm", () => {
    cy.findByRole("form", {
        name: "Character details form",
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

Cypress.Commands.add("selectClass", (name) => {
    cy.findSelectClassButton().click();

    cy.findByRole("listbox", { name: "Class" }).findByRole("option", { name }).click();
});

Cypress.Commands.add("findPersonalQuestSwitch", () => {
    cy.findByRole("checkbox", { name: "Show personal quest" });
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

Cypress.Commands.add("findShowHandSwitch", () => {
    cy.findByRole("checkbox", { name: "Show hand" });
});

Cypress.Commands.add("findActiveAbilityCard", (name: string) => {
    cy.findByRole("checkbox", { name });
});

Cypress.Commands.add("shouldFindDisabledAbilityCard", (name: string) => {
    cy.findByRole("img", { name }).parent().parent().should("have.attr", "aria-disabled", "true");
});

Cypress.Commands.add("findItemsAutocomplete", () => {
    cy.findByRole("combobox", { name: "Add item" });
});

Cypress.Commands.add("addItem", (name: string) => {
    cy.findItemsAutocomplete().click();
    cy.findByRole("option", { name }).click();
});
