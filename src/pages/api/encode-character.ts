import type { NextApiRequest, NextApiResponse } from "next";
import { encode } from "@/services/encoder";

interface EncodeCharacterApiResponse {
    encodedCharacterData: string;
}

const handler = (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method !== "POST") {
        response.status(405).json({ message: "405 Method Not Allowed" });
        return;
    }

    try {
        const character: Character = request.body as Character;

        const encodedCharacterData = encode(character);

        const responseBody: EncodeCharacterApiResponse = { encodedCharacterData };

        response.status(200).json(responseBody);
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            response.status(400).json({ message: "400 Bad Request" });
        } else {
            response.status(500).json({ message: "500 Internal Server Error" });
        }
    }
};

export default handler;
export type { EncodeCharacterApiResponse };
