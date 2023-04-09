import { isInitialOrUnlockedClass } from "@/shared/services/character-classes";
import { createTestCharacterClass, createTestSettings } from "@/test/create-test-fixtures";

describe("isInitialOrUnlockedClass", () => {
    it("returns true when the character class is unlocked", () => {
        const spoilerClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        spoilerClass.initiallyLocked = true;

        const settings: Settings = createTestSettings();
        settings.gameData.initialCharacterClasses.push(spoilerClass);
        settings.spoilerSettings.classes = [{ id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" }];

        const result = isInitialOrUnlockedClass(spoilerClass, settings.spoilerSettings);

        expect(result).toEqual(true);
    });

    it("returns false when the character class is locked", () => {
        const spoilerClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        spoilerClass.initiallyLocked = true;

        const settings: Settings = createTestSettings();
        settings.gameData.initialCharacterClasses.push(spoilerClass);

        const result = isInitialOrUnlockedClass(spoilerClass, settings.spoilerSettings);

        expect(result).toEqual(false);
    });

    it("returns true when the character class is a starter class", () => {
        const characterClass: CharacterClass = createTestCharacterClass(1, "Test Brute");
        characterClass.initiallyLocked = false;

        const settings: Settings = createTestSettings();

        const result = isInitialOrUnlockedClass(characterClass, settings.spoilerSettings);

        expect(result).toEqual(true);
    });
});
