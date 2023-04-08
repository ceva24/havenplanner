import axios, { type AxiosResponse } from "axios";

const characterClassCache: Map<string, CharacterClass> = new Map<string, CharacterClass>();

const requestCharacterClass = async (gameId: number, characterClassId: number): Promise<CharacterClass> => {
    const cacheKey: string = JSON.stringify({ gameId, characterClassId });

    const cachedData: CharacterClass | undefined = characterClassCache.get(cacheKey);

    if (cachedData) return cachedData;

    const characterClass: CharacterClass = await makeCharacterClassRequest(gameId, characterClassId);

    characterClassCache.set(cacheKey, characterClass);

    return characterClass;
};

const makeCharacterClassRequest = async (gameId: number, characterClassId: number): Promise<CharacterClass> => {
    const url = `/api/games/${gameId}/classes/${characterClassId}`;

    const response: AxiosResponse<ClassDataResponse> = await axios.get<ClassDataResponse>(url);

    return response.data.class;
};

export { requestCharacterClass, characterClassCache };
