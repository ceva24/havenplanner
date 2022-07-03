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

/*
        FindPersonalQuestButton(): Chainable<Element>;

        findPersonalQuestDialog(): Chainable<Element>;

        findPersonalQuestImage(): Chainable<Element>;

        selectPersonalQuest(personalQuestName: string): Chainable<Element>;

        <div class="MuiFormControl-root css-tzsjye"><div class="MuiAutocomplete-root MuiAutocomplete-hasClearIcon MuiAutocomplete-hasPopupIcon css-1l6di18"><div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-feqhe6"><label class="MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-root MuiFormLabel-colorPrimary css-dorrcy" data-shrink="false" for=":r0:" id=":r0:-label">Personal quest</label><div class="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-adornedEnd MuiAutocomplete-inputRoot css-30kwf7"><input aria-invalid="false" autocomplete="off" id=":r0:" type="text" class="MuiOutlinedInput-input MuiInputBase-input MuiInputBase-inputAdornedEnd MuiAutocomplete-input MuiAutocomplete-inputFocused css-putrnr" aria-autocomplete="list" aria-expanded="false" autocapitalize="none" spellcheck="false" role="combobox" value=""><div class="MuiAutocomplete-endAdornment css-2iz2x6"><button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator css-zvo6a0" tabindex="-1" type="button" aria-label="Clear" title="Clear"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg><span class="MuiTouchRipple-root css-w0pj6f"></span></button><button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-popupIndicator css-1rq9o8u" tabindex="-1" type="button" aria-label="Open" title="Open"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon"><path d="M7 10l5 5 5-5z"></path></svg><span class="MuiTouchRipple-root css-w0pj6f"></span></button></div><fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-nqlg3w"><legend class="css-1ftyaf0"><span>Personal quest</span></legend></fieldset></div></div></div></div>
        */

Cypress.Commands.add("findPersonalQuestButton", () => {
    cy.findByRole("button", { name: "Personal quest" });
});

Cypress.Commands.add("findPersonalQuestDialog", () => {
    cy.findByRole("dialog", { name: "Personal quest" });
});

Cypress.Commands.add("findPersonalQuestImage", () => {
    cy.findByRole("img", { name: "Personal quest" });
});

Cypress.Commands.add("findPersonalQuestAutocomplete", () => {
    cy.findByRole("combobox");
});

Cypress.Commands.add("selectPersonalQuest", (personalQuestName: string) => {
    cy.findByRole("combobox").findByRole("option", { name: personalQuestName }).click();
});
