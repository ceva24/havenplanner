import { decompress } from "lzbase62";
import { getCharacterClassesByGameId, getGameDataById, getItemsByGameId } from "@/server/services/games/game";
import { deserialize } from "@/server/services/load/deserializer";

const decode = (data: string): SaveData => {
    const serializedData: string = decompress(data);

    const characterData = JSON.parse(serializedData) as SerializedCharacter;

    const gameData: GameData = getGameDataById(characterData.a);
    const characterClasses: CharacterClass[] = getCharacterClassesByGameId(characterData.a);
    const items: Item[] = getItemsByGameId(characterData.a);

    return { character: deserialize(characterData, gameData, characterClasses, items), gameData };
};

export { decode };
