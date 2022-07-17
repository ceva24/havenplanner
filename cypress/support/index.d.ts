declare namespace Cypress {
    interface Chainable {
        findCharacterDetailsForm(): Chainable<Element>;

        findSelectClassButton(): Chainable<Element>;

        findNameField(): Chainable<Element>;

        findExperienceField(): Chainable<Element>;

        findLevelField(): Chainable<Element>;

        findGoldField(): Chainable<Element>;

        findNotesField(): Chainable<Element>;

        findShareLinkButton(): Chainable<Element>;

        findShareLinkDialog(): Chainable<Element>;

        findShareLinkTextBox(): Chainable<Element>;

        selectClass(className: string): Chainable<Element>;

        findPersonalQuestButton(): Chainable<Element>;

        findPersonalQuestDialog(): Chainable<Element>;

        findPersonalQuestImage(personalQuestName: string): Chainable<Element>;

        findPersonalQuestAutocomplete(): Chainable<Element>;

        selectTab(name: string): Chainable<Element>;

        findItemsAutocomplete(): Chainable<Element>;
    }
}
