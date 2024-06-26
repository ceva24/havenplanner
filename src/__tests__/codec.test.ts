import { encode } from "@/client/services/share/encoder";
import { decode } from "@/server/services/load/decoder";
import * as gameService from "@/server/services/games/game";
import {
    createTestAbilityCard,
    createTestCharacter,
    createTestCharacterClass,
    createTestEnhancement,
    createTestItem,
    createTestSettings,
} from "@/test/create-test-fixtures";

jest.mock("@/server/services/games/game");

beforeEach(() => {
    jest.resetAllMocks();
});

const settings: Settings = createTestSettings();

describe("codec", () => {
    it("serializes and deserializes character data", () => {
        const character: Character = createTestCharacter({
            name: "My Gloomy Char",
            experience: 10,
            gold: 8,
            notes: "Hello decode haven",
            characterClass: createTestCharacterClass(1, "Test Brute"),
        });

        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([character.characterClass]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        expect(data).toMatch(/\w{100,}/);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
    });

    it("serializes and deserializes game data", () => {
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);

        const character: Character = createTestCharacter();

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        expect(data).toMatch(/\w{100,}/);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.gameData).toEqual(saveData.gameData);
    });

    it("serializes and deserializes character data with unicode characters", () => {
        const character: Character = createTestCharacter({
            name: "テストキャラクター",
            experience: 10,
            gold: 8,
            notes: "テスト",
            characterClass: createTestCharacterClass(1, "Test Brute"),
        });

        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([character.characterClass]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        expect(data).toMatch(/\w{100,}/);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
    });

    it("serializes and deserializes character data with items", () => {
        const settings: Settings = createTestSettings();
        const items: Item[] = [createTestItem(2, "Boots of Test", "1"), createTestItem(8, "Cloak of Test", "1")];

        const character: Character = createTestCharacter({
            items: [
                { id: "abc", item: items[0], showAlternativeImage: false },
                { id: "def", item: items[1], showAlternativeImage: false },
            ],
        });

        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([character.characterClass]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce(items);

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        const decodedSaveData: SaveData = decode(data);

        const characterItems: Item[] = decodedSaveData.character.items.map(
            (characterItem: CharacterItem) => characterItem.item,
        );

        expect(characterItems).toHaveLength(character.items.length);
        expect(characterItems).toContain(character.items[0].item);
        expect(characterItems).toContain(character.items[1].item);
    });

    it("serializes and deserializes character data with spoiler items", () => {
        const settings: Settings = createTestSettings();
        const items: Item[] = [createTestItem(1, "Boots of Test", "Random Item Designs")];

        const character: Character = createTestCharacter({
            items: [{ id: "abc", item: items[0], showAlternativeImage: false }],
        });

        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([character.characterClass]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce(items);

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        expect(data).toMatch(/\w{100,}/);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character.items).toHaveLength(character.items.length);
        expect(decodedSaveData.character.items[0].item).toEqual(character.items[0].item);
    });

    it("serializes and deserializes character data with unlocked ability cards", () => {
        const character: Character = createTestCharacter();
        character.unlockedAbilityCards = [
            character.characterClass.abilityCards[2],
            character.characterClass.abilityCards[3],
        ];

        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([character.characterClass]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        expect(data).toMatch(/\w{100,}/);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
        expect(decodedSaveData.character.unlockedAbilityCards).toHaveLength(2);
        expect(decodedSaveData.character.unlockedAbilityCards[0]).toBeTruthy();
        expect(decodedSaveData.character.unlockedAbilityCards[1]).toBeTruthy();
    });

    it("serializes and deserializes character data with a hand", () => {
        const character: Character = createTestCharacter();
        character.hand = [character.characterClass.abilityCards[0], character.characterClass.abilityCards[1]];

        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([character.characterClass]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        expect(data).toMatch(/\w{100,}/);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
        expect(decodedSaveData.character.hand).toHaveLength(2);
        expect(decodedSaveData.character.hand[0]).toBeTruthy();
        expect(decodedSaveData.character.hand[1]).toBeTruthy();
    });

    it("serializes and deserializes character data with gained enhancements", () => {
        const enhancement: Enhancement = createTestEnhancement(1, "Test +1", ["test-numeric"]);

        const settings: Settings = createTestSettings();
        settings.gameData.enhancements = [enhancement];

        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);

        const character: Character = createTestCharacter();
        character.characterClass.abilityCards = [
            createTestAbilityCard(
                1,
                "1",
                "Trample",
                [
                    {
                        id: 0,
                        name: "Attack",
                        types: ["test-numeric"],
                    },
                ],
                "/gloomhaven/BR/gh-trample.webp",
            ),
        ];

        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([character.characterClass]);

        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement,
            },
        ];

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        expect(data).toMatch(/\w{100,}/);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
        expect(decodedSaveData.character.gainedEnhancements).toHaveLength(1);
        expect(decodedSaveData.character.gainedEnhancements[0]).toBeTruthy();
    });

    it("serializes and deserializes character data with gained perks", () => {
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);

        const character: Character = createTestCharacter();
        character.gainedPerks = [{ perk: character.characterClass.perks[0], checkboxIndex: 0 }];

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        expect(data).toMatch(/\w{100,}/);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
        expect(decodedSaveData.character.gainedPerks).toHaveLength(1);
        expect(decodedSaveData.character.gainedPerks[0]).toBeTruthy();
    });

    it("serializes and deserializes character data with battle goal checkmarks", () => {
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);

        const character: Character = createTestCharacter();
        character.battleGoalCheckmarkGroups = [
            {
                id: 0,
                checkmarks: [
                    { id: 0, value: true },
                    { id: 1, value: true },
                ],
            },
        ];

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        expect(data).toMatch(/\w{100,}/);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
        expect(decodedSaveData.character.battleGoalCheckmarkGroups).toHaveLength(1);
        expect(decodedSaveData.character.battleGoalCheckmarkGroups[0]).toBeTruthy();
    });

    it("serializes and deserializes character data for items with alternative images", () => {
        const settings: Settings = createTestSettings();
        const items: Item[] = [createTestItem(1, "Boots of Test", "Random Item Designs", "Legs", "url", "alt-url")];

        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce(items);

        const character: Character = createTestCharacter({
            items: [{ id: "abc", item: items[0], showAlternativeImage: true }],
        });

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        expect(data).toMatch(/\w{100,}/);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character.items).toHaveLength(character.items.length);
        expect(decodedSaveData.character.items[0].showAlternativeImage).toEqual(true);
    });
});
