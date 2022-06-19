declare namespace Cypress {
    interface Chainable {
        selectClass(className: string): Chainable<Element>;

        findCharacterDetailsForm(): Chainable<Element>;

        findNameField(): Chainable<Element>;

        findExperienceField(): Chainable<Element>;

        findLevelField(): Chainable<Element>;

        findGoldField(): Chainable<Element>;
    }
}
