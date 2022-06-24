import type { NextApiRequest, NextApiResponse } from "next";
import { serializeCharacterData } from "../../data/data-serializer";
import { encodeShareableLinkData } from "../../data/link-codec";

const handler = (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method !== "POST") {
        response.status(405).json({ message: "405 Method Not Allowed" });
        return;
    }

    try {
        const character: Character = request.body as Character;

        console.log(`Received request to encode character '${JSON.stringify(character)}'`);

        const serializedCharacterData = serializeCharacterData(character);

        const encodedCharacterData = encodeShareableLinkData(serializedCharacterData);

        console.log(`Encoded character data as '${encodedCharacterData}'`);

        const responseBody: EncodeCharacterResponse = { encodedCharacterData };

        response.status(200).json(responseBody);
    } catch (error: unknown) {
        console.error(error);

        if (error instanceof TypeError) {
            response.status(400).json({ message: "400 Bad Request" });
        } else {
            response.status(500).json({ message: "500 Internal Server Error" });
        }
    }
};

export default handler;
