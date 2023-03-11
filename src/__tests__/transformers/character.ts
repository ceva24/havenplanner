import { createTestCharacterClass } from "../create-test-fixtures";
import { toUnlockableCharacterClassSummary } from "@/transformers/character";

describe("toUnlockableCharacterClassSummary", () => {
    it("converts a class to a spoiler safe summary", () => {
        const characterClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        characterClass.imageUrl = "/test";
        characterClass.spoilerSafeName = "Test Spoilery";

        const summary: UnlockableCharacterClassSummary = toUnlockableCharacterClassSummary(characterClass);

        expect(summary).toEqual({ id: 2, imageUrl: "/test", spoilerSafeName: "Test Spoilery" });
    });
});
