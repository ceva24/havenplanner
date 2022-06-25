import { deserialize, serialize } from "@/utils/data-serializer";
import { decode, encode } from "@/utils/link-codec";

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
