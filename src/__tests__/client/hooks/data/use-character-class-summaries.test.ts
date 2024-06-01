import useSWRImmutable from "swr/immutable";
import axios from "axios";
import { fetch, useCharacterClassSummaries } from "@/client/hooks/data/use-character-class-summaries";
import { createTestCharacterClass, createTestSettings } from "@/test/create-test-fixtures";

const settings: Settings = createTestSettings();

jest.mock("swr/immutable", () =>
    jest.fn().mockImplementation(() => ({
        default: jest.fn().mockReturnValue({ data: [], error: undefined }),
    })),
);

jest.mock("axios");
const mockAxios = jest.mocked(axios);

beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.post.mockResolvedValueOnce({ data: { classes: [createTestCharacterClass(1, "Test Brute")] } });
});

describe("use character class summaries", () => {
    it("uses the url, game id and classes spoiler settings as the swr key", () => {
        useCharacterClassSummaries(settings);

        const expectedKey: string = JSON.stringify([
            "/api/games/0/classes",
            settings.gameData.game.id,
            settings.spoilerSettings.classes,
        ]);

        expect(useSWRImmutable).toHaveBeenCalledTimes(1);
        expect(useSWRImmutable).toHaveBeenCalledWith(expectedKey, expect.anything(), expect.anything());
    });
});

describe("fetch", () => {
    it("calls the classes endpoint", async () => {
        await fetch("/api/games/1/classes", settings);

        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith("/api/games/1/classes", expect.anything(), expect.anything());
    });

    it("sets the appropriate headers", async () => {
        await fetch("/api/games/1/classes", settings);

        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
            expect.objectContaining({ headers: { "content-type": "application/json", accept: "application/json" } }),
        );
    });

    it("passes the spoiler settings", async () => {
        await fetch("/api/games/1/classes", settings);

        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({ spoilerSettings: settings.spoilerSettings }),
            expect.anything(),
        );
    });

    it("returns the classes from the response", async () => {
        const classes = await fetch("/api/games/1/classes", settings);

        expect(classes).toHaveLength(1);
        expect(classes[0].name).toEqual("Test Brute");
    });
});
