import { compress, decompress } from "lzbase62";
import { serialize } from "@/services/serializer";
import { deserialize } from "@/services/deserializer";

const encode = (character: Character): string => {
    const serializedData: string = serialize(character);

    return compress(serializedData);
};

const decode = (data: string): Character => {
    const serializedData: string = decompress(data);

    return deserialize(serializedData);
};

export { encode, decode };
