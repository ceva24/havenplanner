import { items } from "@/loaders/items";
import { hasSpoilers, spoilerSettingsForCharacter } from "@/services/load";
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

    it("sets active item groups matching the character items", () => {
        const character = createTestCharacter({
            items: [{ id: "1", item: items[25] }],
        });

        const spoilerSettings = spoilerSettingsForCharacter(character);

        expect(spoilerSettings.itemGroups).toHaveLength(1);
        expect(spoilerSettings.itemGroups[0].name).toEqual("Random Item Designs");
    });

    it("ignores invalid item groups", () => {
        const item: Item = {
            id: 71,
            name: "Boots of Levitation",
            imageUrl: "/items/gloomhaven/64-151/gh-071b-boots-of-levitation.webp",
            slot: "Legs",
            slotImageUrl: "/equip-slot-icons/gloomhaven/legs.webp",
            group: "Invalid",
        };

        const character = createTestCharacter({
            items: [{ id: "1", item }],
        });

        const spoilerSettings = spoilerSettingsForCharacter(character);

        expect(spoilerSettings.itemGroups).toHaveLength(0);
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

    it("returns true when the character has items in an item group", () => {
        const item: Item = {
            id: 71,
            name: "Boots of Levitation",
            imageUrl: "/items/gloomhaven/64-151/gh-071b-boots-of-levitation.webp",
            slot: "Legs",
            slotImageUrl: "/equip-slot-icons/gloomhaven/legs.webp",
            group: "Random Item Designs",
        };

        const character: Character = createTestCharacter({
            items: [{ id: "1", item }],
        });

        const result = hasSpoilers(character);

        expect(result).toEqual(true);
    });
});
