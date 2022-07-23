import { deserialize, serialize } from "@/services/serializer";
import { decode, encode } from "@/services/codec";

const encodeCharacter = (character: Character): string => {
    const serializedData: string = serialize(character);

    return encode(serializedData);
};

export { encodeCharacter };

const loadCharacter = (data: string): Character => {
    const serializedData: string = decode(data);

    return deserialize(serializedData);
};

export { loadCharacter };
