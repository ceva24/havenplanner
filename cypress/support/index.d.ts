declare namespace Cypress {
    interface Chainable {
        findCharacterDetailsForm(): Chainable<Element>;

        findSelectClassButton(): Chainable<Element>;

        findNameField(): Chainable<Element>;

        findExperienceField(): Chainable<Element>;

        findLevelField(): Chainable<Element>;

        findGoldField(): Chainable<Element>;

        findNotesField(): Chainable<Element>;

        selectClass(className: string): Chainable<Element>;
    }
}
