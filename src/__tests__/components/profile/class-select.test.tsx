import { render, screen } from "@testing-library/react";
import ClassSelect, { findAndSetCharacterClass, resetAbilityCardsTabConfig } from "@/components/profile/class-select";
import {
    createTestSettings,
    createTestCharacter,
    createTestCharacterClass,
    createTestEnhancement,
} from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const character: Character = createTestCharacter();
const setCharacter = jest.fn();

const settings: Settings = createTestSettings();
const setSettings = jest.fn();

beforeAll(() => {
    settings.gameData.characterClasses = [
        createTestCharacterClass(1, "Test Skeleton"),
        createTestCharacterClass(2, "Test Bandit"),
    ];
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("class select", () => {
    it("renders", () => {
        render(<ClassSelect character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const classSelect = screen.queryByRole("button", { name: "Class" });

        expect(classSelect).toBeInTheDocument();
    });
});

describe("findAndSetCharacter", () => {
    it("sets the character to the selected value", () => {
        findAndSetCharacterClass(settings.gameData.characterClasses[0].name, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: settings.gameData.characterClasses[0],
        });
    });

    it("sets the character details to default values when the selected class does not exist", () => {
        findAndSetCharacterClass("Invalid class", character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: settings.gameData.defaultCharacter.characterClass,
        });
    });

    it("clears any existing unlocked ability cards", () => {
        const character: Character = createTestCharacter();
        character.unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        findAndSetCharacterClass(settings.gameData.characterClasses[0].name, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: settings.gameData.characterClasses[0],
            unlockedAbilityCards: [],
        });
    });

    it("clears the hand", () => {
        const character: Character = createTestCharacter();
        character.hand = [character.characterClass.abilityCards[0]];

        findAndSetCharacterClass(settings.gameData.characterClasses[0].name, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: settings.gameData.characterClasses[0],
            hand: [],
        });
    });

    it("clears the perks", () => {
        const character: Character = createTestCharacter();

        const perk: Perk = {
            id: 0,
            name: "Remove two {-1} cards",
            count: 1,
            add: [],
            remove: [],
        };

        character.characterClass.perks = [perk];
        character.gainedPerks = [{ perk, checkboxIndex: 0 }];

        findAndSetCharacterClass(settings.gameData.characterClasses[0].name, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: settings.gameData.characterClasses[0],
            gainedPerks: [],
        });
    });

    it("clears the battle goals", () => {
        const character: Character = createTestCharacter();
        character.battleGoalCheckmarkGroups[0].checkmarks[0].value = true;

        findAndSetCharacterClass(settings.gameData.characterClasses[0].name, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: settings.gameData.characterClasses[0],
            battleGoalCheckmarkGroups: settings.gameData.battleGoalCheckmarks.slice(),
        });
    });

    it("clears the gained enhancements", () => {
        const character: Character = createTestCharacter();

        character.gainedEnhancements = [
            {
                enhancement: createTestEnhancement(1, "Test Fire", ["test-numeric"]),
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
            },
        ];

        findAndSetCharacterClass(settings.gameData.characterClasses[0].name, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: settings.gameData.characterClasses[0],
            gainedEnhancements: [],
        });
    });
});

describe("resetAbilityCardsTabConfig", () => {
    it("resets the selected ability cards tab index app setting", () => {
        const settingsShowHand: Settings = { ...settings, selectedAbilityCardsTabIndex: 1 };

        resetAbilityCardsTabConfig(settingsShowHand, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settings,
            selectedAbilityCardsTabIndex: 0,
        });
    });
});
