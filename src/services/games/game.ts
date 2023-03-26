import { getGloomhavenGameData, getGloomhavenItemData } from "@/services/games/gloomhaven";

const gameDataList: GameData[] = [getGloomhavenGameData()];
const itemDataList: ItemData[] = [getGloomhavenItemData()];

const getGameDataById = (id: number): GameData => {
    const gameData: GameData | undefined = gameDataList.find((gameData: GameData) => gameData.game.id === id);

    if (!gameData) throw new Error(`Game with id '${id}' not found`);

    return gameData;
};

const getItemsByGameId = (gameId: number): Item[] => {
    const itemData: ItemData | undefined = itemDataList.find((data: ItemData) => data.game.id === gameId);

    if (!itemData) throw new Error(`Item data for game with id '${gameId}' not found`);

    return itemData.items;
};

export { getGameDataById, getItemsByGameId };
