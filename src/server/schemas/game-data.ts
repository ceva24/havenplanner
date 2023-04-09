import { z as zod } from "zod";

const unlockableCharacterClassSummarySchema: zod.ZodType<UnlockableCharacterClassSummary> = zod.object({
    id: zod.number(),
    imageUrl: zod.string(),
    spoilerSafeName: zod.string(),
});

const itemSpoilerSettingsSchema: zod.ZodType<ItemSpoilerSettings> = zod.object({
    prosperity: zod.number(),
    itemGroups: zod.array(zod.object({ id: zod.number(), name: zod.string() })),
});

const spoilerSettingsSchema: zod.ZodType<SpoilerSettings> = zod.object({
    classes: zod.array(unlockableCharacterClassSummarySchema),
    items: itemSpoilerSettingsSchema,
});

const gameDataSchema: zod.ZodType<GameDataRequest> = zod.object({
    spoilerSettings: spoilerSettingsSchema,
});

export { gameDataSchema };
