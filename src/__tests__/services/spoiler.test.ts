import { items } from "@/loaders/items";
import { hasSpoilers, spoilerSettingsForCharacter } from "@/services/spoiler";
import { createTestCharacter } from "@/testutils";

describe("spoilerSettingsForCharacter", () => {
    it("sets prosperity to 1 when the character has no items", () => {
        const character = createTestCharacter();

        const spoilerSettings = spoilerSettingsForCharacter(character);

        expect(spoilerSettings.prosperity).toEqual(1);
    });

    it("sets prosperity to 1 when the character has prosperity 1 items", () => {
        const character = createTestCharacter({ items: [{ id: "1", item: items[0] }] });

        const spoilerSettings = spoilerSettingsForCharacter(character);

        expect(spoilerSettings.prosperity).toEqual(1);
    });

    it("sets prosperity to the level of the highest prosperity item", () => {
        const character = createTestCharacter({
            items: [
                { id: "1", item: items[0] },
                { id: "2", item: items[20] },
            ],
        });

        const spoilerSettings = spoilerSettingsForCharacter(character);

        expect(spoilerSettings.prosperity).toEqual(2);
    });
});

describe("hasSpoilers", () => {
    it("returns true when the character has items above prosperity level 1", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: items[20] }],
        });

        const result = hasSpoilers(character);

        expect(result).toEqual(true);
    });

    it("returns false when the character has items of prosperity level 1 only", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: items[0] }],
        });

        const result = hasSpoilers(character);

        expect(result).toEqual(false);
    });
});
