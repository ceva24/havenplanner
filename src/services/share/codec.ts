import { compress, decompress } from "lzbase62";
import { getGameDataById } from "@/services/games/game";
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

    return { character: deserialize(characterData, gameData), gameData };
};

export { encode, decode, type SaveData };
