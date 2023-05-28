import type { NextApiRequest, NextApiResponse } from "next";
import HttpMethod from "http-method-enum";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getCharacterClassByIdAndGameId } from "@/server/services/games/game";

const handler = (request: NextApiRequest, response: NextApiResponse<ClassDataResponse | ErrorResponse>) => {
    if (request.method !== HttpMethod.GET) {
        response.status(StatusCodes.METHOD_NOT_ALLOWED).json({ error: ReasonPhrases.METHOD_NOT_ALLOWED });
        return;
    }

    try {
        const gameId: number = Number.parseInt(request.query.gameId as string, 10);
        const classId: number = Number.parseInt(request.query.classId as string, 10);

        const characterClass: CharacterClass = getCharacterClassByIdAndGameId(classId, gameId);

        response.status(StatusCodes.OK).json({ class: characterClass });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
};

export default handler;
