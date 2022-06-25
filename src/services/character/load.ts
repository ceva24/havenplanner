import { deserialize } from "@/utils/data-serializer";
import { decode } from "@/utils/link-codec";

const loadCharacter = (data: string): Character => {
    const decodedData: string = decode(data);

    return deserialize(decodedData);
};

export { loadCharacter };
