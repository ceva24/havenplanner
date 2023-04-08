import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { getItemsByGameId } from "@/server/services/games/game";
import { filterItems } from "@/client/services/items";
import { gameDataSchema } from "@/server/schemas/game-data";

const handler = (request: NextApiRequest, response: NextApiResponse<ItemDataResponse | ErrorResponse>) => {
    try {
        const gameId: number = Number.parseInt(request.query.gameId as string, 10);

        const requestData: GameDataRequest = gameDataSchema.parse(request.body);

        const items: Item[] = getItemsByGameId(gameId);

        const filteredItems: Item[] = filterItems(items, requestData.spoilerSettings);

        response.status(200).json({ items: filteredItems });
    } catch (error) {
        if (error instanceof ZodError) {
            response.status(500).json({ error: { issues: error.issues } });
        } else {
            response.status(500).json({ error: (error as Error).message });
        }
    }
};

export default handler;
