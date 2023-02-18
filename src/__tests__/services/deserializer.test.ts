import { deserialize } from "@/services/deserializer";
import { characterClasses } from "@/loaders/character-classes";
import { items } from "@/loaders/items";
import { personalQuests } from "@/loaders/personal-quests";
import { defaultCharacter } from "@/constants";
import { enhancements } from "@/loaders/enhancements";

jest.mock("uuid", () => {
    return {
        v4: jest.fn().mockReturnValue("123"),
    };
});

describe("deserialize", () => {
    it("deserializes character data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"q":518,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.name).toEqual("Test Character");
        expect(character.experience).toEqual(240);
        expect(character.gold).toEqual(75);
        expect(character.notes).toEqual("It's a test");
        expect(character.characterClass).toEqual(characterClasses[2]);
        expect(character.personalQuest).toEqual(personalQuests[8]);
    });

    it("deserializes item data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[],"h":[],"e":[],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(2);
        expect(character.items[0].item).toEqual(items[1]);
        expect(character.items[1].item).toEqual(items[7]);
    });

    it("sets new uuids on character items", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[],"h":[],"e":[],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(2);
        expect(character.items[0].id).toEqual("123");
        expect(character.items[1].id).toEqual("123");
    });

    it("omits item data that is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,-1],"u":[],"h":[],"e":[],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(1);
        expect(character.items[0].item).toEqual(items[1]);
    });

    it("sets the default character class when the id is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":-1,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.characterClass).toEqual(defaultCharacter.characterClass);
    });

    it("omits the personal quest property when deserializing a character with no personal quest id", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":1,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character).not.toHaveProperty("personalQuest");
    });

    it("deserializes unlocked ability card data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[73,74],"h":[],"e":[],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.unlockedAbilityCards).toHaveLength(2);
        expect(character.unlockedAbilityCards[0]).toEqual(characterClasses[2].abilityCards[12]);
        expect(character.unlockedAbilityCards[1]).toEqual(characterClasses[2].abilityCards[13]);
    });

    it("omits unlocked ability card that is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[73,15,-2],"h":[],"e":[],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.unlockedAbilityCards).toHaveLength(1);
        expect(character.unlockedAbilityCards[0]).toEqual(characterClasses[2].abilityCards[12]);
    });

    it("deserializes hand data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[73,74],"e":[],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.hand).toHaveLength(2);
        expect(character.hand[0]).toEqual(characterClasses[2].abilityCards[12]);
        expect(character.hand[1]).toEqual(characterClasses[2].abilityCards[13]);
    });

    it("omits hand that is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[73,15,-2],"e":[],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.hand).toHaveLength(1);
        expect(character.hand[0]).toEqual(characterClasses[2].abilityCards[12]);
    });

    it("deserializes gained enhancement data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"e":[[61,0,1],[62,1,0]],"p":[],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.gainedEnhancements).toHaveLength(2);

        expect(character.gainedEnhancements[0]).toEqual({
            abilityCard: character.characterClass.abilityCards[0],
            enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
            enhancement: enhancements[1],
        });
        expect(character.gainedEnhancements[1]).toEqual({
            abilityCard: character.characterClass.abilityCards[1],
            enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[1],
            enhancement: enhancements[0],
        });
    });

    it("deserializes gained perk data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"e":[],"p":[[0,0],[1,1]],"b":[]}`;

        const character: Character = deserialize(data);

        expect(character.gainedPerks).toHaveLength(2);
        expect(character.gainedPerks[0]).toEqual({ perk: character.characterClass.perks[0], checkboxIndex: 0 });
        expect(character.gainedPerks[1]).toEqual({ perk: character.characterClass.perks[1], checkboxIndex: 1 });
    });

    it("deserializes battle goal progress", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[[true,true,true],[true,false,false]]}`;

        const character: Character = deserialize(data);

        expect(character.battleGoalCheckmarkGroups).toHaveLength(2);
        expect(character.battleGoalCheckmarkGroups[0].checkmarks[0]).toEqual({ id: 0, value: true });
        expect(character.battleGoalCheckmarkGroups[0].checkmarks[1]).toEqual({ id: 1, value: true });
        expect(character.battleGoalCheckmarkGroups[0].checkmarks[2]).toEqual({ id: 2, value: true });
        expect(character.battleGoalCheckmarkGroups[1].checkmarks[0]).toEqual({ id: 0, value: true });
        expect(character.battleGoalCheckmarkGroups[1].checkmarks[1]).toEqual({ id: 1, value: false });
        expect(character.battleGoalCheckmarkGroups[1].checkmarks[2]).toEqual({ id: 2, value: false });
    });
});
