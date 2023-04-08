import { filterCharacterClasses, isUnlocked } from "@/server/services/character-classes";
import { createTestCharacterClass, createTestSettings } from "@/test/create-test-fixtures";

describe("getCharacterClasses", () => {
    it("returns character classes not hidden by spoiler settings", () => {
        const initialClass: CharacterClass = createTestCharacterClass(1, "Test Brute");
        initialClass.initiallyLocked = false;

        const spoilerClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        spoilerClass.initiallyLocked = true;

        const settings: Settings = createTestSettings();
        settings.gameData.initialCharacterClasses.push(spoilerClass);

        const characterClasses: CharacterClass[] = filterCharacterClasses(
            [initialClass, spoilerClass],
            settings.spoilerSettings
        );

        expect(characterClasses).toHaveLength(1);
        expect(characterClasses[0].name).toEqual("Test Brute");
    });
});

describe("isUnlocked", () => {
    it("returns true when the character class is unlocked", () => {
        const spoilerClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        spoilerClass.initiallyLocked = true;

        const settings: Settings = createTestSettings();
        settings.gameData.initialCharacterClasses.push(spoilerClass);
        settings.spoilerSettings.classes = [{ id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" }];

        const result = isUnlocked(spoilerClass, settings.spoilerSettings);

        expect(result).toEqual(true);
    });

    it("returns false when the character class is locked", () => {
        const spoilerClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        spoilerClass.initiallyLocked = true;

        const settings: Settings = createTestSettings();
        settings.gameData.initialCharacterClasses.push(spoilerClass);

        const result = isUnlocked(spoilerClass, settings.spoilerSettings);

        expect(result).toEqual(false);
    });

    it("returns true when the character class is a starter class", () => {
        const characterClass: CharacterClass = createTestCharacterClass(1, "Test Brute");
        characterClass.initiallyLocked = false;

        const settings: Settings = createTestSettings();

        const result = isUnlocked(characterClass, settings.spoilerSettings);

        expect(result).toEqual(true);
    });
});
