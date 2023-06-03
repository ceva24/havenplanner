import { render, screen } from "@testing-library/react";
import ClassSelect, {
    findAndSetCharacterClass,
    resetAbilityCardsTabConfig,
} from "@/client/components/profile/class-select";
import {
    createTestSettings,
    createTestCharacter,
    createTestCharacterClass,
    createTestEnhancement,
} from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";
import * as useCharacterClassSummariesHook from "@/client/hooks/data/use-character-class-summaries";
import * as requestService from "@/client/services/request";

const characterClasses: CharacterClass[] = [
    createTestCharacterClass(1, "Test Brute"),
    createTestCharacterClass(2, "Test Skeleton"),
    createTestCharacterClass(3, "Test Bandit"),
];

const character: Character = createTestCharacter({ characterClass: characterClasses[1] });
const setCharacter = jest.fn();

const settings: Settings = createTestSettings();
const setSettings = jest.fn();

jest.mock("@/client/hooks/data/use-character-class-summaries", () => {
    return {
        useCharacterClassSummaries: jest
            .fn()
            .mockReturnValue({ characterClassSummaries: [], isLoading: false, isError: false }),
    };
});

jest.mock("@/client/services/request");

beforeAll(() => {
    settings.gameData.initialCharacterClasses = characterClasses;
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("class select", () => {
    it("renders", () => {
        jest.spyOn(useCharacterClassSummariesHook, "useCharacterClassSummaries").mockReturnValueOnce({
            characterClassSummaries: characterClasses,
            isLoading: false,
            isError: false,
        });

        render(<ClassSelect character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const classSelect = screen.queryByRole("button", { name: "Class" });

        expect(classSelect).toBeInTheDocument();
    });

    it("shows the loading text when character class data is loading", () => {
        jest.spyOn(useCharacterClassSummariesHook, "useCharacterClassSummaries").mockReturnValueOnce({
            characterClassSummaries: [],
            isLoading: true,
            isError: false,
        });

        render(<ClassSelect character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const classSelect = screen.queryByRole("textbox", { name: "Class" });

        expect(classSelect).toBeInTheDocument();
        expect(classSelect).toHaveValue("Loading...");
    });

    it("shows the error text when character class data cannot be retrieved", () => {
        jest.spyOn(useCharacterClassSummariesHook, "useCharacterClassSummaries").mockReturnValueOnce({
            characterClassSummaries: [],
            isLoading: true,
            isError: true,
        });

        render(<ClassSelect character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const classSelect = screen.queryByRole("textbox", { name: "Class" });

        expect(classSelect).toBeInTheDocument();
        expect(classSelect).toHaveValue("Failed to load classes");
    });
});

describe("findAndSetCharacter", () => {
    it("calls the request service to retrieve the full character details", async () => {
        jest.spyOn(requestService, "requestCharacterClass").mockResolvedValueOnce(characterClasses[2]);

        await findAndSetCharacterClass(
            settings.gameData.initialCharacterClasses[2].name,
            characterClasses,
            character,
            setCharacter,
            settings
        );

        expect(requestService.requestCharacterClass).toHaveBeenCalledTimes(1);
        expect(requestService.requestCharacterClass).toHaveBeenCalledWith(
            settings.gameData.game.id,
            characterClasses[2].id
        );
    });

    it("sets the character to the selected value", async () => {
        jest.spyOn(requestService, "requestCharacterClass").mockResolvedValueOnce(characterClasses[2]);

        await findAndSetCharacterClass(
            settings.gameData.initialCharacterClasses[2].name,
            characterClasses,
            character,
            setCharacter,
            settings
        );

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[2],
        });
    });

    it("sets the character details to default values when the selected class does not exist", async () => {
        await findAndSetCharacterClass("Invalid class", characterClasses, character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: settings.gameData.defaultCharacter.characterClass,
        });
    });

    it("clears any existing unlocked ability cards", async () => {
        jest.spyOn(requestService, "requestCharacterClass").mockResolvedValueOnce(characterClasses[0]);

        const character: Character = createTestCharacter();
        character.unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        await findAndSetCharacterClass(
            settings.gameData.initialCharacterClasses[0].name,
            characterClasses,
            character,
            setCharacter,
            settings
        );

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[0],
            unlockedAbilityCards: [],
        });
    });

    it("clears the hand", async () => {
        jest.spyOn(requestService, "requestCharacterClass").mockResolvedValueOnce(characterClasses[0]);

        const character: Character = createTestCharacter();
        character.hand = [character.characterClass.abilityCards[0]];

        await findAndSetCharacterClass(
            settings.gameData.initialCharacterClasses[0].name,
            characterClasses,
            character,
            setCharacter,
            settings
        );

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[0],
            hand: [],
        });
    });

    it("clears the perks", async () => {
        jest.spyOn(requestService, "requestCharacterClass").mockResolvedValueOnce(characterClasses[0]);

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

        await findAndSetCharacterClass(
            settings.gameData.initialCharacterClasses[0].name,
            characterClasses,
            character,
            setCharacter,
            settings
        );

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[0],
            gainedPerks: [],
        });
    });

    it("clears the battle goals", async () => {
        jest.spyOn(requestService, "requestCharacterClass").mockResolvedValueOnce(characterClasses[0]);

        const character: Character = createTestCharacter();
        character.battleGoalCheckmarkGroups[0].checkmarks[0].value = true;

        await findAndSetCharacterClass(
            settings.gameData.initialCharacterClasses[0].name,
            characterClasses,
            character,
            setCharacter,
            settings
        );

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[0],
            battleGoalCheckmarkGroups: settings.gameData.battleGoalCheckmarks.slice(),
        });
    });

    it("clears the gained enhancements", async () => {
        jest.spyOn(requestService, "requestCharacterClass").mockResolvedValueOnce(characterClasses[0]);

        const character: Character = createTestCharacter();

        character.gainedEnhancements = [
            {
                enhancement: createTestEnhancement(1, "Test Fire", ["test-numeric"]),
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
            },
        ];

        await findAndSetCharacterClass(
            settings.gameData.initialCharacterClasses[0].name,
            characterClasses,
            character,
            setCharacter,
            settings
        );

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[0],
            gainedEnhancements: [],
        });
    });
});

describe("resetAbilityCardsTabConfig", () => {
    it("resets the selected ability cards tab index setting", () => {
        const settingsShowHand: Settings = createTestSettings();
        settingsShowHand.userSettings.selectedAbilityCardsTabIndex = 1;

        resetAbilityCardsTabConfig(settingsShowHand, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settingsShowHand,
            userSettings: { ...settingsShowHand.userSettings, selectedAbilityCardsTabIndex: 0 },
        });
    });
});
