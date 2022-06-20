Cypress.Commands.add("selectClass", (characterClassName) => {
    cy.findByRole("button", { name: "Class" }).click();

    cy.findByRole("listbox", { name: "Class" })
        .findByRole("option", { name: characterClassName })
        .click();
});

Cypress.Commands.add("findCharacterDetailsForm", () => {
    cy.findByRole("form", {
        name: "Character details form",
    });
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
