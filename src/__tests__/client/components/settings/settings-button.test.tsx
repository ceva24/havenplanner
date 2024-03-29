import { render, screen } from "@testing-library/react";
import SettingsButton, {
    updateCharacterAfterChangingSpoilerSettings,
} from "@/client/components/settings/settings-button";
import {
    createTestSettings,
    createTestCharacter,
    createTestSettingsWithItemSpoilers,
    createTestItem,
    createTestCharacterClass,
} from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const setCharacter = jest.fn();

const settings: Settings = createTestSettings();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("settings button", () => {
    it("renders", () => {
        render(<SettingsButton character={createTestCharacter()} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const settingsButton = screen.queryByRole("button", { name: "Settings" });

        expect(settingsButton).toBeInTheDocument();
    });
});

describe("updateCharacterAfterChangingSpoilerSettings", () => {
    it("removes an item higher than the current prosperity level", async () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "9"), showAlternativeImage: false }],
        });

        await updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [],
        });
    });

    it("does not remove an item equal to the current prosperity level", async () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false }],
        });

        await updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });

    it("does not remove an item lower than the current prosperity level", async () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false }],
        });

        const prosperityTwoSettings = createTestSettingsWithItemSpoilers(2, []);

        await updateCharacterAfterChangingSpoilerSettings(character, setCharacter, prosperityTwoSettings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });

    it("removes items higher than the current prosperity level and does not remove items lower than the current prosperity level", async () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false },
                { id: "2", item: createTestItem(2, "Boots of Super Test", "9"), showAlternativeImage: false },
            ],
        });

        await updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [{ id: "1", item: character.items[0].item, showAlternativeImage: false }],
        });
    });

    it("removes items not in the active item groups", async () => {
        const character: Character = createTestCharacter({
            items: [
                {
                    id: "1",
                    item: createTestItem(1, "Secret Boots of Test", "Random Item Designs"),
                    showAlternativeImage: false,
                },
            ],
        });

        await updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [],
        });
    });

    it("does not remove items in the active item groups", async () => {
        const item = createTestItem(1, "Secret Boots of Test", "Random Item Designs");

        const character: Character = createTestCharacter({
            items: [{ id: "1", item, showAlternativeImage: false }],
        });

        const settings: Settings = createTestSettingsWithItemSpoilers(2, [{ id: 1, name: item.group }]);

        await updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });

    it("resets the character class to default when it is a locked class that is not active", async () => {
        const spoilerCharacterClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        spoilerCharacterClass.initiallyLocked = true;

        const settings: Settings = createTestSettings();
        settings.gameData.initialCharacterClasses.concat(spoilerCharacterClass);

        const character: Character = createTestCharacter({ characterClass: spoilerCharacterClass });

        await updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: settings.gameData.defaultCharacter.characterClass,
        });
    });

    it("does not reset the character class to default when it is a starter class", async () => {
        const spoilerCharacterClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        spoilerCharacterClass.initiallyLocked = true;

        const settings: Settings = createTestSettings();
        settings.gameData.initialCharacterClasses.concat(spoilerCharacterClass);

        const character: Character = createTestCharacter();

        await updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });
});
