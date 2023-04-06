import {
    getGloomhavenGameData,
    getGloomhavenCharacterClassData,
    getGloomhavenItemData,
} from "@/services/games/gloomhaven";

const gameDataList: GameData[] = [getGloomhavenGameData()];
const classDataList: CharacterClassData[] = [getGloomhavenCharacterClassData()];
const itemDataList: ItemData[] = [getGloomhavenItemData()];

const getGameDataById = (id: number): GameData => {
    const gameData: GameData | undefined = gameDataList.find((gameData: GameData) => gameData.game.id === id);

    if (!gameData) throw new Error(`Game with id '${id}' not found`);

    return gameData;
};

const getClassesByGameId = (gameId: number): CharacterClass[] => {
    const classData: CharacterClassData | undefined = classDataList.find(
        (data: CharacterClassData) => data.game.id === gameId
    );

    if (!classData) throw new Error(`Character class data for game with id '${gameId}' not found`);

    return classData.classes;
};

const getItemsByGameId = (gameId: number): Item[] => {
    const itemData: ItemData | undefined = itemDataList.find((data: ItemData) => data.game.id === gameId);

    if (!itemData) throw new Error(`Item data for game with id '${gameId}' not found`);

    return itemData.items;
};

export { getGameDataById, getClassesByGameId, getItemsByGameId };
