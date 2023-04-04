import type { NextApiRequest, NextApiResponse } from "next";
import { z as zod, ZodError } from "zod";
import { spoilerSettingsSchema } from "src/schemas/spoiler-settings";
import { getItemsByGameId } from "@/services/games/game";
import { filterItems } from "@/services/items";

const schema: zod.ZodType<ItemsRequestData> = zod.object({
    gameId: zod.number(),
    spoilerSettings: spoilerSettingsSchema,
});

const handler = (request: NextApiRequest, response: NextApiResponse<ItemsResponseData | ErrorResponseData>) => {
    try {
        const requestData: ItemsRequestData = schema.parse(request.body);

        const items: Item[] = getItemsByGameId(requestData.gameId);

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
