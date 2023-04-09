import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { getCharacterClassesByGameId } from "@/server/services/games/game";
import { gameDataSchema } from "@/server/schemas/game-data";
import { filterCharacterClasses } from "@/server/services/character-classes";
import { toCharacterClassSummary } from "@/server/transformers/character-class-summary";

const handler = (request: NextApiRequest, response: NextApiResponse<ClassSummariesDataResponse | ErrorResponse>) => {
    try {
        const gameId: number = Number.parseInt(request.query.gameId as string, 10);

        const requestData: GameDataRequest = gameDataSchema.parse(request.body);

        const classes: CharacterClass[] = getCharacterClassesByGameId(gameId);

        const filteredClasses: CharacterClass[] = filterCharacterClasses(classes, requestData.spoilerSettings);

        const classSummaries = filteredClasses.map((characterClass: CharacterClass) =>
            toCharacterClassSummary(characterClass)
        );

        response.status(200).json({ classes: classSummaries });
    } catch (error) {
        if (error instanceof ZodError) {
            response.status(500).json({ error: { issues: error.issues } });
        } else {
            response.status(500).json({ error: (error as Error).message });
        }
    }
};

export default handler;
