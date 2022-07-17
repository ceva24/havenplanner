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

Cypress.Commands.add("selectClass", (characterClassName) => {
    cy.findSelectClassButton().click();

    cy.findByRole("listbox", { name: "Class" }).findByRole("option", { name: characterClassName }).click();
});

Cypress.Commands.add("findPersonalQuestButton", () => {
    cy.findByRole("button", { name: "Personal quest" });
});

Cypress.Commands.add("findPersonalQuestDialog", () => {
    cy.findByRole("dialog", { name: "Personal quest" });
});

Cypress.Commands.add("findPersonalQuestImage", (personalQuestName: string) => {
    cy.findByRole("img", { name: personalQuestName });
});

Cypress.Commands.add("findPersonalQuestAutocomplete", () => {
    cy.findByRole("combobox");
});

Cypress.Commands.add("selectTab", (name: string) => {
    cy.findByRole("tab", { name }).click();
});

Cypress.Commands.add("findItemsAutocomplete", () => {
    cy.findByRole("combobox", { name: "Add item" });
});
