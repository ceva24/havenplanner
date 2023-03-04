import type { SelectChangeEvent } from "@mui/material";
import { render, screen } from "@testing-library/react";
import ClassSelect, { findAndSetCharacter, resetAbilityCardsTabConfig } from "@/components/profile/class-select";
import { characterClasses } from "@/loaders/character-classes";
import { enhancements } from "@/loaders/enhancements";
import { createTestSettings, createTestCharacter } from "@/test/test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const character: Character = createTestCharacter();
const setCharacter = jest.fn();

const settings: Settings = createTestSettings();
const setSettings = jest.fn();

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
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[3],
        });
    });

    it("sets the character details to default values when the selected class does not exist", () => {
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: "Invalid class" },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: settings.gameData.defaultCharacter.characterClass,
        });
    });

    it("clears any existing unlocked ability cards", () => {
        const character: Character = createTestCharacter();
        character.unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[3],
            unlockedAbilityCards: [],
        });
    });

    it("clears the hand", () => {
        const character: Character = createTestCharacter();
        character.hand = [character.characterClass.abilityCards[0]];

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[3],
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

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[3],
            gainedPerks: [],
        });
    });

    it("clears the battle goals", () => {
        const character: Character = createTestCharacter();
        character.battleGoalCheckmarkGroups[0].checkmarks[0].value = true;

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[3],
            battleGoalCheckmarkGroups: createDefaultBattleGoals(),
        });
    });

    it("clears the gained enhancements", () => {
        const character: Character = createTestCharacter();

        character.gainedEnhancements = [
            {
                enhancement: enhancements[0],
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
            },
        ];

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[3],
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
