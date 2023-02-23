import { compress, decompress } from "lzbase62";
import { serialize } from "@/services/share/serializer";
import { deserialize } from "@/services/share/deserializer";

const encode = (character: Character): string => {
    const serializedData: string = serialize(character);

    return compress(serializedData);
};

const decode = (data: string): Character => {
    const serializedData: string = decompress(data);

    return deserialize(serializedData);
};

export { encode, decode };
