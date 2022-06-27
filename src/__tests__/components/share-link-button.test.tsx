import { render, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import ShareLinkButton, { retrieveAndSetShareableLink } from "@/components/share-link-button";
import { EncodeCharacterApiResponse } from "@/pages/api/encode-character";
import { characterClasses } from "@/utils/constants";

const character: Character = {
    name: "Test character",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: characterClasses[0],
};

const setShareableLink = jest.fn();
const setEncodeCharacterError = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("share link button", () => {
    it("renders", () => {
        render(<ShareLinkButton character={character} />);

        const sharelinkButton = screen.queryByRole("button", { name: "Share" });

        expect(sharelinkButton).toBeInTheDocument();
    });
});

describe("retrieve and set the shareable link", () => {
    it("retrieves and displays the encoded character data", async () => {
        const response: EncodeCharacterApiResponse = { encodedCharacterData: "abcde" };
        fetchMock.mockResponseOnce(JSON.stringify(response));

        await retrieveAndSetShareableLink(character, "", setShareableLink, setEncodeCharacterError);

        expect(fetchMock).toHaveBeenCalledTimes(1);

        expect(setShareableLink).toHaveBeenCalledTimes(1);
        expect(setShareableLink.mock.calls[0][0]).toMatch(/\?character=abcde/);
    });

    it("does not retrieve the encoded character data if the shareable link is still populated from before", async () => {
        await retrieveAndSetShareableLink(character, "abcde", setShareableLink, setEncodeCharacterError);

        expect(fetchMock).not.toHaveBeenCalled();

        expect(setShareableLink).not.toHaveBeenCalled();
        expect(setEncodeCharacterError).not.toHaveBeenCalled();
    });

    it("sets an encode character error when the API response is not 200 OK", async () => {
        fetchMock.mockRejectOnce();

        await retrieveAndSetShareableLink(character, "", setShareableLink, setEncodeCharacterError);

        expect(fetchMock).toHaveBeenCalledTimes(1);

        expect(setShareableLink).not.toHaveBeenCalled();

        expect(setEncodeCharacterError).toHaveBeenCalledTimes(1);
        expect(setEncodeCharacterError).toHaveBeenCalledWith(true);
    });

    it("sets an encode character error when there is no valid encoded character data in the API response", async () => {
        const response: EncodeCharacterApiResponse = { encodedCharacterData: "" };
        fetchMock.mockResponseOnce(JSON.stringify(response));

        await retrieveAndSetShareableLink(character, "", setShareableLink, setEncodeCharacterError);

        expect(fetchMock).toHaveBeenCalledTimes(1);

        expect(setShareableLink).not.toHaveBeenCalled();

        expect(setEncodeCharacterError).toHaveBeenCalledTimes(1);
        expect(setEncodeCharacterError).toHaveBeenCalledWith(true);
    });

    it("sets an encode character when an unexpected error occurs", async () => {
        fetchMock.mockImplementationOnce(() => {
            throw new Error("Error");
        });

        await retrieveAndSetShareableLink(character, "", setShareableLink, setEncodeCharacterError);

        expect(fetchMock).toHaveBeenCalledTimes(1);

        expect(setShareableLink).not.toHaveBeenCalled();

        expect(setEncodeCharacterError).toHaveBeenCalledTimes(1);
        expect(setEncodeCharacterError).toHaveBeenCalledWith(true);
    });
});
