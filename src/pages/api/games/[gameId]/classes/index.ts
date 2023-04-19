import type { NextApiRequest, NextApiResponse } from "next";
import HttpMethod from "http-method-enum";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { getCharacterClassesByGameId } from "@/server/services/games/game";
import { gameDataSchema } from "@/server/schemas/game-data";
import { filterCharacterClasses } from "@/server/services/character-classes";
import { toCharacterClassSummary } from "@/server/transformers/character-class-summary";

const handler = (request: NextApiRequest, response: NextApiResponse<ClassSummariesDataResponse | ErrorResponse>) => {
    if (request.method !== HttpMethod.POST) {
        response.status(StatusCodes.METHOD_NOT_ALLOWED).json({ error: ReasonPhrases.METHOD_NOT_ALLOWED });
        return;
    }

    try {
        const gameId: number = Number.parseInt(request.query.gameId as string, 10);

        const requestData: GameDataRequest = gameDataSchema.parse(request.body);

        const classes: CharacterClass[] = getCharacterClassesByGameId(gameId);

        const filteredClasses: CharacterClass[] = filterCharacterClasses(classes, requestData.spoilerSettings);

        const classSummaries = filteredClasses.map((characterClass: CharacterClass) =>
            toCharacterClassSummary(characterClass)
        );

        response.status(StatusCodes.OK).json({ classes: classSummaries });
    } catch (error) {
        if (error instanceof ZodError) {
            response.status(StatusCodes.BAD_REQUEST).json({ error: { issues: error.issues } });
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
        }
    }
};

export default handler;
