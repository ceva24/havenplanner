import type { SelectChangeEvent } from "@mui/material";
import { render, screen } from "@testing-library/react";
import ClassSelect, { findAndSetCharacter, resetAbilityCardsTabConfig } from "@/components/profile/class-select";
import { characterClasses } from "@/loaders/character-classes";
import { defaultCharacter } from "@/constants";
import { createTestCharacter } from "@/testutils";
import AppSettingsProvider from "@/hooks/app-settings";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

const appSettings: AppSettings = {
    showPersonalQuestButton: false,
    showPersonalQuest: false,
    selectedAbilityCardsTabIndex: 0,
};

const setAppSettings = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("class select", () => {
    it("renders", () => {
        render(
            <AppSettingsProvider character={character}>
                <ClassSelect character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const classSelect = screen.queryByRole("button", { name: "Class" });

        expect(classSelect).toBeInTheDocument();
    });

    it("renders the class icon", () => {
        render(
            <AppSettingsProvider character={character}>
                <ClassSelect character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const classIcon = screen.queryByRole("img", {
            name: "Class icon",
        });

        expect(classIcon).toBeInTheDocument();
    });
});

describe("findAndSetCharacter", () => {
    it("sets the character to the selected value", () => {
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter);

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

        findAndSetCharacter(event, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: defaultCharacter.characterClass,
        });
    });

    it("clears any existing unlocked ability cards", () => {
        const character: Character = createTestCharacter();
        character.unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter);

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

        findAndSetCharacter(event, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[3],
            hand: [],
        });
    });
});

describe("resetAbilityCardsTabConfig", () => {
    it("resets the selected ability cards tab index app setting", () => {
        const appSettingsShowHand: AppSettings = { ...appSettings, selectedAbilityCardsTabIndex: 1 };

        resetAbilityCardsTabConfig(appSettingsShowHand, setAppSettings);

        expect(setAppSettings).toHaveBeenCalledTimes(1);
        expect(setAppSettings).toHaveBeenCalledWith({
            ...appSettings,
            selectedAbilityCardsTabIndex: 0,
        });
    });
});
