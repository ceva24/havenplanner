import useSWRImmutable from "swr/immutable"; // eslint-disable-line n/file-extension-in-import
import axios from "axios";
import { fetch, useItems } from "@/client/hooks/data/use-items";
import { createTestItem, createTestSettings } from "@/test/create-test-fixtures";

const settings: Settings = createTestSettings();

jest.mock("swr/immutable", () =>
    jest.fn().mockImplementation(() => ({
        default: jest.fn().mockReturnValue({ data: [], error: undefined }),
    }))
);

jest.mock("axios");
const mockAxios = jest.mocked(axios);

beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.post.mockResolvedValueOnce({ data: { items: [createTestItem(1, "Boots of Test", "1")] } });
});

describe("use items", () => {
    it("uses the url, game id and items spoiler settings as the swr key", () => {
        useItems(settings);

        const expectedKey: string = JSON.stringify([
            "/api/games/0/items",
            settings.gameData.game.id,
            settings.spoilerSettings.items,
        ]);

        expect(useSWRImmutable).toHaveBeenCalledTimes(1);
        expect(useSWRImmutable).toHaveBeenCalledWith(expectedKey, expect.anything(), expect.anything());
    });
});

describe("fetch", () => {
    it("calls the items endpoint", async () => {
        await fetch("/api/games/1/items", settings);

        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith("/api/games/1/items", expect.anything(), expect.anything());
    });

    it("sets the appropriate headers", async () => {
        await fetch("/api/games/1/classes", settings);

        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
            expect.objectContaining({ headers: { "content-type": "application/json", accept: "application/json" } })
        );
    });

    it("passes the spoiler settings", async () => {
        await fetch("/api/games/1/items", settings);

        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({ spoilerSettings: settings.spoilerSettings }),
            expect.anything()
        );
    });

    it("returns the items from the response", async () => {
        const items = await fetch("/api/games/1/items", settings);

        expect(items).toHaveLength(1);
        expect(items[0].name).toEqual("Boots of Test");
    });
});
