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

        selectClass(name: string): Chainable<Element>;

        findPersonalQuestSwitch(): Chainable<Element>;

        findDefaultPersonalQuestImage(): Chainable<Element>;

        findPersonalQuestImage(name: string): Chainable<Element>;

        findPersonalQuestAutocomplete(): Chainable<Element>;

        selectTab(name: string): Chainable<Element>;

        findShowHandSwitch(): Chainable<Element>;

        findActiveAbilityCard(name: string): Chainable<Element>;

        shouldFindDisabledAbilityCard(name: string): Chainable<Element>;

        findItemsAutocomplete(): Chainable<Element>;

        addItem(name: string): Chainable<Element>;
    }
}
