import { compress, decompress } from "lzbase62";
import { getClassesByGameId, getGameDataById, getItemsByGameId } from "@/services/games/game";
import { serialize } from "@/services/share/serializer";
import { deserialize } from "@/services/share/deserializer";

interface SaveData {
    character: Character;
    gameData: GameData;
}

const encode = ({ character, gameData }: SaveData): string => {
    const serializedData: string = serialize(character, gameData);

    return compress(serializedData);
};

const decode = (data: string): SaveData => {
    const serializedData: string = decompress(data);

    const characterData = JSON.parse(serializedData) as SerializedCharacter;

    const gameData: GameData = getGameDataById(characterData.a);
    const classes: CharacterClass[] = getClassesByGameId(characterData.a);
    const items: Item[] = getItemsByGameId(characterData.a);

    return { character: deserialize(characterData, gameData, classes, items), gameData };
};

export { encode, decode, type SaveData };
