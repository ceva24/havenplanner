import { compress, decompress } from "lzbase62";
import { deserialize, serialize } from "@/services/serializer";

const encode = (character: Character): string => {
    const serializedData: string = serialize(character);

    return compress(serializedData);
};

const decode = (data: string): Character => {
    const serializedData: string = decompress(data);

    return deserialize(serializedData);
};

export { encode, decode };
