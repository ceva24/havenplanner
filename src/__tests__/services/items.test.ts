import { getItemsForSpoilerSettings } from "@/services/items";

describe("getItemsForSpoilerSettings", () => {
    it("returns prosperity one items for prosperity level one", () => {
        const items = getItemsForSpoilerSettings(1);

        expect(items).toHaveLength(14);
        expect(items[0].name).toEqual("Boots of Striding");
        expect(items[13].name).toEqual("Minor Power Potion");
    });

    it("returns prosperity level one and two items for prosperity level two", () => {
        const items = getItemsForSpoilerSettings(2);

        expect(items).toHaveLength(21);
        expect(items[0].name).toEqual("Boots of Striding");
        expect(items[20].name).toEqual("Stun Powder");
    });
});
