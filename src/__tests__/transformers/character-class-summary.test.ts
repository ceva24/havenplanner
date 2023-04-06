import { toCharacterClassSummary } from "@/transformers/character-class-summary";
import { createTestCharacterClass } from "@/test/create-test-fixtures";

describe("toCharacterClassSummary", () => {
    it("converts a class to a summary", () => {
        const characterClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        characterClass.imageUrl = "/test";

        const summary: CharacterClassSummary = toCharacterClassSummary(characterClass);

        expect(summary).toEqual({ id: 2, name: "Test Spoiler", imageUrl: "/test" });
    });
});
