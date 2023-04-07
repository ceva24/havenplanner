import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { getCharacterClassByIdAndGameId } from "@/services/games/game";

const handler = (request: NextApiRequest, response: NextApiResponse<ClassDataResponse | ErrorResponse>) => {
    try {
        const gameId: number = Number.parseInt(request.query.gameId as string, 10);
        const classId: number = Number.parseInt(request.query.classId as string, 10);

        const characterClass: CharacterClass = getCharacterClassByIdAndGameId(classId, gameId);

        response.status(200).json({ class: characterClass });
    } catch (error) {
        if (error instanceof ZodError) {
            response.status(500).json({ error: { issues: error.issues } });
        } else {
            response.status(500).json({ error: (error as Error).message });
        }
    }
};

export default handler;
