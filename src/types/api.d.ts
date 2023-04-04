interface ItemsRequestData {
    gameId: number;
    spoilerSettings: SpoilerSettings;
}

interface ItemsResponseData {
    items: Item[];
}

interface ErrorResponseData {
    error: string | Pick<ZodError, "issues">;
}
