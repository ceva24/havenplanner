import { filterCharacterClasses } from "@/server/services/character-classes";
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
            settings.spoilerSettings,
        );

        expect(characterClasses).toHaveLength(1);
        expect(characterClasses[0].name).toEqual("Test Brute");
    });
});
