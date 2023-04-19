import type { NextApiRequest, NextApiResponse } from "next";
import HttpMethod from "http-method-enum";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ZodError } from "zod";
import { getItemsByGameId } from "@/server/services/games/game";
import { filterItems } from "@/server/services/items";
import { gameDataSchema } from "@/server/schemas/game-data";

const handler = (request: NextApiRequest, response: NextApiResponse<ItemDataResponse | ErrorResponse>) => {
    if (request.method !== HttpMethod.POST) {
        response.status(StatusCodes.METHOD_NOT_ALLOWED).json({ error: ReasonPhrases.METHOD_NOT_ALLOWED });
        return;
    }

    try {
        const gameId: number = Number.parseInt(request.query.gameId as string, 10);

        const requestData: GameDataRequest = gameDataSchema.parse(request.body);

        const items: Item[] = getItemsByGameId(gameId);

        const filteredItems: Item[] = filterItems(items, requestData.spoilerSettings);

        response.status(StatusCodes.OK).json({ items: filteredItems });
    } catch (error) {
        if (error instanceof ZodError) {
            response.status(StatusCodes.BAD_REQUEST).json({ error: { issues: error.issues } });
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
        }
    }
};

export default handler;
