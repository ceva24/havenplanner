import { deserialize, serialize } from "@/services/serializer";
import { decode, encode } from "@/services/codec";

const encodeCharacter = (character: Character): string => {
    const encodedData: string = serialize(character);

    return encode(encodedData);
};

export { encodeCharacter };

const loadCharacter = (data: string): Character => {
    const decodedData: string = decode(data);

    return deserialize(decodedData);
};

export { loadCharacter };
