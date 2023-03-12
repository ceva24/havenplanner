import { getCharacterClasses, isUnlocked } from "@/services/character-classes";
import { createTestCharacterClass, createTestSettings } from "@/test/create-test-fixtures";

describe("getCharacterClasses", () => {
    it("returns character classes not hidden by spoiler settings", () => {
        const spoilerClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        spoilerClass.initiallyLocked = true;

        const settings: Settings = createTestSettings();
        settings.gameData.characterClasses.push(spoilerClass);

        const characterClasses: CharacterClass[] = getCharacterClasses(settings);

        expect(characterClasses).toHaveLength(1);
        expect(characterClasses[0].name).toEqual("Test Brute");
    });
});

describe("isUnlocked", () => {
    it("returns true when the character class is unlocked", () => {
        const spoilerClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        spoilerClass.initiallyLocked = true;

        const settings: Settings = createTestSettings();
        settings.gameData.characterClasses.push(spoilerClass);
        settings.spoilerSettings.classes = [{ id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" }];

        const result = isUnlocked(spoilerClass, settings);

        expect(result).toEqual(true);
    });

    it("returns false when the character class is locked", () => {
        const spoilerClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        spoilerClass.initiallyLocked = true;

        const settings: Settings = createTestSettings();
        settings.gameData.characterClasses.push(spoilerClass);

        const result = isUnlocked(spoilerClass, settings);

        expect(result).toEqual(false);
    });

    it("returns true when the character class is a starter class", () => {
        const settings: Settings = createTestSettings();

        const result = isUnlocked(settings.gameData.characterClasses[0], settings);

        expect(result).toEqual(true);
    });
});
