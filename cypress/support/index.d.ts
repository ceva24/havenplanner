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

        findPersonalQuestImage(): Chainable<Element>;

        findPersonalQuestAutocomplete(): Chainable<Element>;

        selectPersonalQuest(personalQuestName: string): Chainable<Element>;
    }
}
