import { getGloomhavenGameData } from "@/services/games/gloomhaven";

const gameDataList: GameData[] = [getGloomhavenGameData()];

const getGameDataById = (id: number): GameData => {
    const gameData: GameData | undefined = gameDataList.find((gameData: GameData) => gameData.game.id === id);

    if (!gameData) throw new Error(`Game with id '${id}' not found`);

    return gameData;
};

export { getGameDataById };
