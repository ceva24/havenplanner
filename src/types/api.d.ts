interface GameDataRequest {
    spoilerSettings: SpoilerSettings;
}

interface ClassSummariesDataResponse {
    classes: CharacterClassSummary[];
}

interface ClassDataResponse {
    class: CharacterClass;
}

interface ItemDataResponse {
    items: Item[];
}

interface ErrorResponse {
    error: string | Pick<ZodError, "issues">;
}
