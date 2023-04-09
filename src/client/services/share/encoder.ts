import { compress } from "lzbase62";
import { serialize } from "@/client/services/share/serializer";

const encode = ({ character, gameData }: SaveData): string => {
    const serializedData: string = serialize(character, gameData);

    return compress(serializedData);
};

export { encode };
