import { toUnlockableCharacterClassSummary } from "@/transformers/unlockable-character-class-summary";
import { createTestCharacterClass } from "@/test/create-test-fixtures";

describe("toUnlockableCharacterClassSummary", () => {
    it("converts a class to a spoiler safe summary", () => {
        const characterClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        characterClass.imageUrl = "/test";
        characterClass.spoilerSafeName = "Test Spoilery";

        const summary: UnlockableCharacterClassSummary = toUnlockableCharacterClassSummary(characterClass);

        expect(summary).toEqual({ id: 2, spoilerSafeName: "Test Spoilery", imageUrl: "/test" });
    });
});
