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

        clickCloseButton(): Chainable<Element>;

        selectClass(name: string): Chainable<Element>;

        findPersonalQuestSwitch(): Chainable<Element>;

        findDefaultPersonalQuestImage(): Chainable<Element>;

        findPersonalQuestImage(name: string): Chainable<Element>;

        findPersonalQuestAutocomplete(): Chainable<Element>;

        selectTab(name: string): Chainable<Element>;

        findActiveAbilityCard(name: string): Chainable<Element>;

        shouldFindDisabledAbilityCard(name: string): Chainable<Element>;

        findEditHandButton(): Chainable<Element>;

        findEditHandDialog(): Chainable<Element>;

        findEnhancementsSelect(cardName: string, name: string, index: number): Chainable<Element>;

        findAttackModifierCardWithCount(name: string, count: number): Chainable<Element>;

        shouldHavePerkWithCheckboxCount(name: string, count: number): Chainable<Element>;

        gainPerk(name: string, checkboxIndex: number): Chainable<Element>;

        removePerk(name: string, checkboxIndex: number): Chainable<Element>;

        clickPerkDescription(name: string): Chainable<Element>;

        gainBattleGoalCheckmark(battleGoalPerk: number, checkboxIndex: number): Chainable<Element>;

        loseBattleGoalCheckmark(battleGoalPerk: number, checkboxIndex: number): Chainable<Element>;

        clickBattleGoalGroupLabel(battleGoalPerk: number): Chainable<Element>;

        findItemsAutocomplete(): Chainable<Element>;

        addItem(name: string): Chainable<Element>;

        openSettings(): Chainable<Element>;

        findSettingsDrawer(): Chainable<Element>;
    }
}
